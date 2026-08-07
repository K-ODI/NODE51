// Hash de mot de passe admin. Web Crypto (PBKDF2-SHA256) — dispo à la fois
// dans le middleware Edge et dans les server actions Node, sans dépendance.
// Jamais de mot de passe en clair : on stocke "saltHex:hashHex".
const ITER = 100_000
const KEYLEN = 32
const enc = new TextEncoder()
const hex = (u8: Uint8Array) => [...u8].map((b) => b.toString(16).padStart(2, "0")).join("")
const unhex = (s: string) => new Uint8Array(s.match(/.{2}/g)!.map((h) => parseInt(h, 16)))

async function derive(password: string, salt: Uint8Array): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"])
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations: ITER },
    key,
    KEYLEN * 8,
  )
  return hex(new Uint8Array(bits))
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return `${hex(salt)}:${await derive(password, salt)}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":")
  if (!saltHex || !hashHex) return false
  const got = await derive(password, unhex(saltHex))
  return constEq(got, hashHex)
}

// ---------- Session signée (cookie) ----------
// Jeton "payload.signature" — payload = {u, exp} base64url, signature = HMAC-SHA256.
// Web Crypto -> vérifiable dans le middleware Edge sans appel DB.
const SESSION_TTL = 60 * 60 * 8 // 8 h
const sessionSecret = () => process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const b64url = (u8: Uint8Array) =>
  btoa(String.fromCharCode(...u8)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
const b64urlDec = (s: string) =>
  new Uint8Array([...atob(s.replace(/-/g, "+").replace(/_/g, "/"))].map((c) => c.charCodeAt(0)))

async function hmac(msg: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(msg)))
}

const constEq = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function signSession(username: string): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ u: username, exp: Math.floor(Date.now() / 1000) + SESSION_TTL })))
  return `${payload}.${b64url(await hmac(payload))}`
}

export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token || !sessionSecret()) return false
  const [payload, sig] = token.split(".")
  if (!payload || !sig || !constEq(sig, b64url(await hmac(payload)))) return false
  try {
    const { exp } = JSON.parse(new TextDecoder().decode(b64urlDec(payload)))
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

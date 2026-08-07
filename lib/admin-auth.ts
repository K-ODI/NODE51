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
  // comparaison à temps constant (sur le hash, pas sur le secret)
  if (got.length !== hashHex.length) return false
  let diff = 0
  for (let i = 0; i < got.length; i++) diff |= got.charCodeAt(i) ^ hashHex.charCodeAt(i)
  return diff === 0
}

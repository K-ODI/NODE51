import { createHmac, timingSafeEqual } from "crypto"

// Jeton de désinscription : HMAC-SHA256 de l'email (minuscule).
// Empêche l'énumération/abus — impossible de désinscrire un email sans le lien signé.
// Secret serveur uniquement (NEWSLETTER_SECRET, sinon la clé service_role qui n'est jamais exposée).
function secret(): string {
  return process.env.NEWSLETTER_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ""
}

export function unsubscribeToken(email: string): string {
  return createHmac("sha256", secret()).update(email.trim().toLowerCase()).digest("hex")
}

export function verifyUnsubscribe(email: string, token: string): boolean {
  if (!secret() || !token) return false
  const expected = Buffer.from(unsubscribeToken(email))
  const got = Buffer.from(token)
  return expected.length === got.length && timingSafeEqual(expected, got)
}

// Lien à insérer dans les emails newsletter (footer). base = URL publique du site.
export function unsubscribeUrl(email: string, base: string): string {
  const e = email.trim().toLowerCase()
  return `${base}/desinscription?e=${encodeURIComponent(e)}&t=${unsubscribeToken(e)}`
}

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Client Supabase côté serveur (clé service_role — ne JAMAIS importer côté client).
// Renvoie null si le backend n'est pas configuré, pour une dégradation propre.
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
}

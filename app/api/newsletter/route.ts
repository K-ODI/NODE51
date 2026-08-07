import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { z } from "zod"

const schema = z.object({
  email: z.string().trim().email("Email invalide").max(320),
  source: z.string().trim().max(50).optional().default("footer"),
})

export async function POST(req: Request) {
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 })
  }

  const parsed = schema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors.email?.[0] ?? "Email invalide." }, { status: 400 })
  }
  const { email, source } = parsed.data

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Backend non configuré (Supabase)." }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })

  // Idempotent : si l'email existe déjà, on ne fait rien mais on renvoie un succès.
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email: email.toLowerCase(), source }, { onConflict: "email", ignoreDuplicates: true })

  if (error) {
    console.error("[newsletter] Supabase error:", error.message)
    return NextResponse.json({ error: "Erreur lors de l'inscription." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

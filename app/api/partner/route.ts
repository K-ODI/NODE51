import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { z } from "zod"

const schema = z.object({
  tier: z.string().trim().max(50).optional().default(""),
  name: z.string().trim().min(1, "Nom requis").max(200),
  email: z.string().trim().email("Email invalide").max(320),
  company: z.string().trim().max(200).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
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
    return NextResponse.json(
      { error: "Champs invalides.", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Backend non configuré (Supabase)." }, { status: 503 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })

  const { error: dbError } = await supabase.from("partner_submissions").insert({
    tier: data.tier || null,
    name: data.name,
    email: data.email,
    company: data.company || null,
    message: data.message || null,
  })

  if (dbError) {
    console.error("[partner] Supabase insert error:", dbError.message)
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 })
  }

  // Notification prioritaire (best-effort)
  const resendKey = process.env.RESEND_API_KEY
  const notifyTo = process.env.CONTACT_NOTIFICATION_EMAIL
  const from = process.env.RESEND_FROM_EMAIL
  if (resendKey && notifyTo && from) {
    try {
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from,
        to: notifyTo,
        replyTo: data.email,
        subject: `🤝 NODE 51 — Demande partenariat${data.tier ? ` ${data.tier}` : ""} : ${data.name}`,
        text: [
          `Offre     : ${data.tier || "—"}`,
          `Nom       : ${data.name}`,
          `Email     : ${data.email}`,
          `Entreprise: ${data.company || "—"}`,
          "",
          "Message :",
          data.message || "—",
        ].join("\n"),
      })
    } catch (e) {
      console.error("[partner] Resend error:", e)
    }
  }

  return NextResponse.json({ ok: true })
}

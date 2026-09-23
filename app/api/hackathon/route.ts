import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { z } from "zod"

const schema = z.object({
  hackathon: z.string().trim().min(1, "Sélectionne une étape").max(120),
  name: z.string().trim().min(1, "Nom requis").max(200),
  email: z.string().trim().email("Email invalide").max(320),
  team_name: z.string().trim().max(200).optional().default(""),
  profile: z.string().trim().max(50).optional().default(""),
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

  const { error: dbError } = await supabase.from("hackathon_registrations").insert({
    hackathon: data.hackathon,
    name: data.name,
    email: data.email,
    team_name: data.team_name || null,
    profile: data.profile || null,
    message: data.message || null,
  })

  if (dbError) {
    console.error("[hackathon] Supabase insert error:", dbError.message)
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 })
  }

  // Notification interne (best-effort)
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
        subject: `💻 NODE51 — Inscription Hackathon : ${data.name}`,
        text: [
          `Étape     : ${data.hackathon}`,
          `Nom       : ${data.name}`,
          `Email     : ${data.email}`,
          `Équipe    : ${data.team_name || "—"}`,
          `Profil    : ${data.profile || "—"}`,
          "",
          "Message :",
          data.message || "—",
        ].join("\n"),
      })
    } catch (e) {
      console.error("[hackathon] Resend error:", e)
    }
  }

  return NextResponse.json({ ok: true })
}

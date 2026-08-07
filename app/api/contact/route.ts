import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(200),
  email: z.string().trim().email("Email invalide").max(320),
  company: z.string().trim().max(200).optional().default(""),
  interest: z.string().trim().max(50).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
})

export async function POST(req: Request) {
  // 1. Parse + validate
  let json: unknown
  try {
    json = await req.json()
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Champs invalides.", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }
  const data = parsed.data

  // 2. Persist to Supabase
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Backend non configuré (Supabase). Renseigne les variables d'environnement." },
      { status: 503 },
    )
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false },
  })

  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    interest: data.interest || null,
    message: data.message || null,
  })

  if (dbError) {
    console.error("[contact] Supabase insert error:", dbError.message)
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 })
  }

  // 3. Notify by email (best-effort — la soumission est déjà enregistrée)
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
        subject: `NODE 51 — Nouveau contact : ${data.name}${data.interest ? ` (${data.interest})` : ""}`,
        text: [
          `Nom       : ${data.name}`,
          `Email     : ${data.email}`,
          `Entreprise: ${data.company || "—"}`,
          `Intérêt   : ${data.interest || "—"}`,
          "",
          "Message :",
          data.message || "—",
        ].join("\n"),
      })
    } catch (e) {
      console.error("[contact] Resend error:", e)
      // On ne fait pas échouer la requête : la soumission est sauvegardée.
    }
  }

  return NextResponse.json({ ok: true })
}

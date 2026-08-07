import Link from "next/link"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { verifyUnsubscribe } from "@/lib/newsletter-token"

export const dynamic = "force-dynamic"

export default async function DesinscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string }>
}) {
  const { e = "", t = "" } = await searchParams
  const email = e.trim().toLowerCase()

  let title = "Lien invalide"
  let message = "Ce lien de désinscription est invalide ou incomplet."

  if (email && verifyUnsubscribe(email, t)) {
    const supabase = getSupabaseAdmin()
    if (!supabase) {
      title = "Indisponible"
      message = "Le service est momentanément indisponible. Réessaie plus tard."
    } else {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed" })
        .eq("email", email)
      if (error) {
        title = "Erreur"
        message = "Impossible de traiter ta désinscription. Réessaie plus tard."
      } else {
        title = "Désinscription confirmée"
        message = `${email} ne recevra plus la newsletter NODE 51.`
      }
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-display font-black">{title}</h1>
        <p className="text-muted-foreground">{message}</p>
        <Link href="/" className="inline-block font-mono text-sm text-primary hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
    </main>
  )
}

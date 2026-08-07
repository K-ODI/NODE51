import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import Link from "next/link"

export const dynamic = "force-dynamic"

interface PressRelease {
  id: string
  published_at: string | null
  title: string
  excerpt: string | null
  pdf_url: string | null
}

interface MediaContact {
  id: string
  name: string
  email: string
}

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }) : ""

export default async function PressePage() {
  const supabase = getSupabaseAdmin()
  let releases: PressRelease[] = []
  let contacts: MediaContact[] = []

  if (supabase) {
    const [relRes, conRes] = await Promise.all([
      supabase
        .from("press_releases")
        .select("id,published_at,title,excerpt,pdf_url")
        .eq("published", true)
        .order("published_at", { ascending: false }),
      supabase.from("media_contacts").select("id,name,email").order("sort", { ascending: true }),
    ])
    releases = relRes.data ?? []
    contacts = conRes.data ?? []
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <PageHeader
        title="ESPACE PRESSE"
        subtitle="Toutes les ressources pour couvrir NODE 51. Communiqués, visuels haute définition et contacts dédiés."
        breadcrumb="PRESSE"
      />

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Press releases */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl font-black text-stroke text-primary">CP</span>
              <h2 className="text-2xl font-black text-foreground">COMMUNIQUÉS</h2>
            </div>

            {releases.length > 0 ? (
              <div className="space-y-6">
                {releases.map((release) => (
                  <article
                    key={release.id}
                    className="group border-l-2 border-border hover:border-primary pl-6 py-4 transition-colors"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{fmtDate(release.published_at)}</span>
                    <h3 className="text-xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    {release.excerpt && <p className="text-muted-foreground mt-2 leading-relaxed">{release.excerpt}</p>}
                    {release.pdf_url ? (
                      <a
                        href={release.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-xs text-primary mt-4 hover:underline"
                      >
                        TÉLÉCHARGER PDF →
                      </a>
                    ) : (
                      <span className="inline-block font-mono text-xs text-muted-foreground/60 mt-4">
                        PDF À VENIR
                      </span>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucun communiqué pour le moment.</p>
            )}
          </div>

          {/* Media kit & contacts */}
          <div className="space-y-12">
            <div className="bg-card border border-border p-8">
              <h3 className="text-xl font-black text-foreground mb-4">KIT MÉDIA</h3>
              <p className="text-muted-foreground mb-6">
                Logos, photos officielles, visuels pour la presse et guidelines de la marque NODE 51.
              </p>
              <button className="w-full py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider hover:bg-primary/90 transition-colors">
                TÉLÉCHARGER LE KIT COMPLET
              </button>
            </div>

            {contacts.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-foreground mb-6">CONTACTS PRESSE</h3>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between py-4 border-b border-border">
                      <span className="text-foreground font-medium">{contact.name}</span>
                      <a href={`mailto:${contact.email}`} className="font-mono text-sm text-primary hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-secondary p-8">
              <h3 className="text-lg font-black text-foreground mb-4">ACCRÉDITATION JOURNALISTES</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Vous êtes journaliste et souhaitez couvrir NODE 51 ? Demandez votre accréditation.
              </p>
              <Link
                href="/#contact"
                className="inline-block px-6 py-3 border border-foreground text-foreground font-mono text-xs tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                DEMANDER UNE ACCRÉDITATION
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

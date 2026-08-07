import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import Link from "next/link"

export const dynamic = "force-dynamic"

const CATEGORIES = ["IA & DATA", "BLOCKCHAIN", "GREENTECH", "WOMEN IN TECH", "QUANTUM & IoT"]

interface Speaker {
  id: string
  name: string
  role: string | null
  company: string | null
  category: string | null
  photo_url: string | null
}

export default async function SpeakersPage() {
  const supabase = getSupabaseAdmin()
  let speakers: Speaker[] = []
  if (supabase) {
    const { data } = await supabase
      .from("speakers")
      .select("id,name,role,company,category,photo_url")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("sort", { ascending: true })
      .order("created_at", { ascending: true })
    speakers = data ?? []
  }

  const countFor = (cat: string) => speakers.filter((s) => s.category === cat).length

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <PageHeader
        title="NOS SPEAKERS"
        subtitle="150+ leaders, innovateurs et visionnaires africains réunis pour façonner l'avenir technologique du continent."
        breadcrumb="SPEAKERS"
      />

      {/* Category filters */}
      <section className="px-6 lg:px-12 py-8 border-b border-border overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map((cat) => {
            const n = countFor(cat)
            return (
              <span
                key={cat}
                className="px-4 py-2 font-mono text-xs tracking-wider bg-secondary text-muted-foreground"
              >
                {cat}
                {n > 0 && <span className="ml-2 text-primary">{n}</span>}
              </span>
            )
          })}
        </div>
      </section>

      {/* Speakers */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-7xl font-black text-stroke text-primary">★</span>
          <h2 className="text-2xl font-black text-foreground">SPEAKERS CONFIRMÉS</h2>
        </div>

        {speakers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((s) => (
              <Link key={s.id} href={`/speakers/${s.id}`} className="group relative block">
                <div className="aspect-[3/4] overflow-hidden bg-card border border-border mb-4 relative group-hover:border-primary/50 transition-colors">
                  {s.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.photo_url}
                      alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-black text-muted-foreground/20">
                        {s.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {s.category && (
                    <span className="absolute top-3 left-3 font-mono text-[10px] tracking-widest bg-background/80 text-primary px-2 py-1">
                      {s.category}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                  {s.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {[s.role, s.company].filter(Boolean).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <>
            {/* Empty state — programmation à venir */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <article key={i} className="group relative">
                  <div className="aspect-[3/4] overflow-hidden bg-card border border-border mb-4 relative flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 border-2 border-dashed border-border rounded-full flex items-center justify-center">
                        <span className="text-3xl font-black text-muted-foreground/30">?</span>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground/50 tracking-wider">À RÉVÉLER</p>
                    </div>
                  </div>
                  <div className="h-4 w-2/3 bg-card border border-border mb-2" />
                  <div className="h-3 w-1/2 bg-card border border-border" />
                </article>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="inline-block p-8 border border-primary bg-primary/5">
                <span className="font-mono text-xs text-primary tracking-widest block mb-2">PROGRAMMATION</span>
                <p className="text-2xl font-black text-foreground mb-2">ANNONCE JANVIER 2027</p>
                <p className="text-muted-foreground text-sm">Les speakers seront révélés progressivement</p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Call for speakers */}
      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-foreground mb-6">
            APPEL À<br />
            <span className="text-stroke text-primary">SPEAKERS</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Vous êtes expert, chercheur ou entrepreneur dans la tech africaine ? Partagez votre vision et inspirez la
            prochaine génération d'innovateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              SOUMETTRE UNE CANDIDATURE
            </Link>
            <button className="px-8 py-4 border border-foreground text-foreground font-mono text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors">
              TÉLÉCHARGER LE GUIDE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

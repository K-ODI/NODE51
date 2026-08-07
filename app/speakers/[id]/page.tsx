import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

const fmtDay = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : ""

interface Speaker {
  id: string
  name: string
  role: string | null
  company: string | null
  category: string | null
  photo_url: string | null
  bio: string | null
}

interface Session {
  id: string
  title: string
  day: string | null
  start_time: string | null
  end_time: string | null
  stage: string | null
  format: string | null
}

export default async function SpeakerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = getSupabaseAdmin()
  if (!supabase) notFound()

  const { data: speaker } = await supabase
    .from("speakers")
    .select("id,name,role,company,category,photo_url,bio")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle<Speaker>()

  if (!speaker) notFound()

  const { data: sessionsData } = await supabase
    .from("sessions")
    .select("id,title,day,start_time,end_time,stage,format")
    .eq("speaker_id", id)
    .eq("published", true)
    .order("day", { ascending: true })
    .order("start_time", { ascending: true })
  const sessions = (sessionsData as Session[]) ?? []

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <Link
          href="/speakers"
          className="inline-block font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          ← TOUS LES SPEAKERS
        </Link>

        <div className="grid lg:grid-cols-[360px_1fr] gap-10 lg:gap-16">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-card border border-border">
              {speaker.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={speaker.photo_url} alt={speaker.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-8xl font-black text-muted-foreground/20">{speaker.name.charAt(0)}</span>
                </div>
              )}
            </div>
            {speaker.category && (
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-widest bg-background/80 text-primary px-3 py-1.5">
                {speaker.category}
              </span>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-black text-foreground tracking-tight mb-3">{speaker.name}</h1>
            <p className="text-lg text-primary mb-8">{[speaker.role, speaker.company].filter(Boolean).join(" · ")}</p>

            {speaker.bio ? (
              <div className="max-w-2xl text-muted-foreground leading-relaxed whitespace-pre-wrap">{speaker.bio}</div>
            ) : (
              <p className="text-muted-foreground">Biographie à venir.</p>
            )}

            {sessions.length > 0 && (
              <div className="mt-12">
                <h2 className="font-mono text-xs tracking-widest text-primary mb-6">INTERVENTIONS</h2>
                <div className="space-y-px bg-border border border-border max-w-2xl">
                  {sessions.map((s) => (
                    <div key={s.id} className="bg-background p-5 hover:bg-card/40 transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {s.format && (
                          <span className="font-mono text-[10px] tracking-widest bg-primary/10 text-primary px-2 py-0.5">
                            {s.format}
                          </span>
                        )}
                        {s.stage && (
                          <span className="font-mono text-[10px] tracking-widest bg-secondary text-muted-foreground px-2 py-0.5">
                            {s.stage}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-foreground">{s.title}</h3>
                      <p className="font-mono text-xs text-muted-foreground mt-1 capitalize">
                        {fmtDay(s.day)}
                        {s.start_time && ` · ${s.start_time}`}
                        {s.end_time && ` – ${s.end_time}`}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href="/programme" className="inline-block font-mono text-xs text-primary mt-4 hover:underline">
                  VOIR LE PROGRAMME COMPLET →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

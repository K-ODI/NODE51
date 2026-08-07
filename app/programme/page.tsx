import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const metadata = { title: "Programme | NODE 51" }

const DAYS = [
  { date: "2027-02-09", label: "Jour 1 — Mardi 9 février 2027" },
  { date: "2027-02-10", label: "Jour 2 — Mercredi 10 février 2027" },
]

interface Session {
  id: string
  title: string
  description: string | null
  day: string | null
  start_time: string | null
  end_time: string | null
  stage: string | null
  format: string | null
  speaker_id: string | null
  speakers: { id: string; name: string } | null
}

export default async function ProgrammePage() {
  const supabase = getSupabaseAdmin()
  let sessions: Session[] = []
  if (supabase) {
    const { data } = await supabase
      .from("sessions")
      .select("id,title,description,day,start_time,end_time,stage,format,speaker_id,speakers(id,name)")
      .eq("published", true)
      .order("day", { ascending: true })
      .order("start_time", { ascending: true })
      .order("sort", { ascending: true })
    sessions = (data as unknown as Session[]) ?? []
  }

  const hasProgram = sessions.length > 0

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PageHeader
        title="PROGRAMME"
        subtitle="Deux jours de keynotes, panels, pitchs et masterclasses. 9 & 10 février 2027, CICAD, Dakar."
        breadcrumb="PROGRAMME"
      />

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        {!hasProgram ? (
          <div className="max-w-4xl">
            <div className="inline-block p-8 border border-primary bg-primary/5">
              <span className="font-mono text-xs text-primary tracking-widest block mb-2">PROGRAMMATION</span>
              <p className="text-2xl font-black text-foreground mb-2">DÉVOILÉ PROCHAINEMENT</p>
              <p className="text-muted-foreground text-sm">
                Le programme détaillé sera publié progressivement. Inscris-toi à la newsletter pour être informé·e.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {DAYS.map((d) => {
              const daySessions = sessions.filter((s) => s.day === d.date)
              if (daySessions.length === 0) return null
              return (
                <div key={d.date}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-px bg-primary" />
                    <h2 className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">{d.label}</h2>
                  </div>

                  <div className="space-y-px bg-border border border-border">
                    {daySessions.map((s) => (
                      <div
                        key={s.id}
                        className="bg-background grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 p-5 lg:p-6 hover:bg-card/40 transition-colors"
                      >
                        <div className="font-mono text-primary text-sm whitespace-nowrap">
                          {s.start_time || "—"}
                          {s.end_time && <span className="text-muted-foreground"> – {s.end_time}</span>}
                        </div>
                        <div>
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
                          <h3 className="text-lg lg:text-xl font-black text-foreground">{s.title}</h3>
                          {s.speakers && (
                            <Link
                              href={`/speakers/${s.speakers.id}`}
                              className="inline-block font-mono text-xs text-primary mt-1 hover:underline"
                            >
                              {s.speakers.name} →
                            </Link>
                          )}
                          {s.description && (
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{s.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}

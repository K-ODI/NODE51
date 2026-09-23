"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"
import { HackathonModal, HACKATHON_OPTIONS } from "@/components/hackathon-modal"

const EASE = [0.22, 1, 0.36, 1] as const

const tracks = [
  {
    title: "AI FOR AFRICA",
    desc: "Solutions IA adaptées aux réalités africaines.",
    topics: ["Apprentissage automatique", "Éthique de l'IA", "IA générative africaine"],
  },
  {
    title: "BLOCKCHAIN FOR AFRICA",
    desc: "Outils d'inclusion financière pour les populations non bancarisées.",
    topics: ["DeFi", "Identité financière", "Traçabilité"],
  },
  {
    title: "TECH FOR GOOD",
    desc: "Innovation pour un développement durable.",
    topics: ["AgriTech", "Énergies renouvelables", "Mobilité durable"],
  },
]

const calendar = [
  {
    date: "26 Oct. 2026",
    place: "Dakar, Sénégal",
    venue: "Africa Outsourcing — Cité Keur Gorgui",
    format: "Présentiel",
    themes: "IA for Africa · Blockchain for Africa · Tech for Good",
  },
  {
    date: "28 Oct. 2026",
    place: "Kaolack, Sénégal",
    venue: "Mairie de Kaolack",
    format: "Présentiel",
    themes: "IA & Agriculture · IA & Santé · Tech for Good",
  },
  { date: "Nov. 2026", place: "Maroc", venue: null, format: "En ligne", themes: "IA & Mobilité · Smart City africaine · GreenTech" },
  { date: "Nov. 2026", place: "Bénin", venue: null, format: "En ligne", themes: "IA & Éducation · Blockchain · Tech for Good" },
  {
    date: "Déc. 2026",
    place: "Côte d'Ivoire",
    venue: null,
    format: "En ligne",
    themes: "IA & Fintech · Inclusion financière · Women in Tech",
  },
  {
    date: "Déc. 2026",
    place: "Belgique",
    venue: null,
    format: "En ligne",
    themes: "IA & Données · Éthique de l'IA · Souveraineté numérique",
  },
  { date: "Jan. 2027", place: "Suisse", venue: null, format: "En ligne", themes: "Blockchain & DeFi · IA & Finance · Smart contracts" },
  {
    date: "23 Fév. 2027",
    place: "Dakar, Sénégal",
    venue: "Grande Finale",
    format: "Finale",
    themes: "Toutes thématiques · Équipes qualifiées · Prix internationaux",
    finale: true,
  },
]

export function InnovationTour() {
  const [openHackathon, setOpenHackathon] = useState<string | null>(null)

  return (
    <section id="innovation-tour" className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            05
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">INNOVATION TOUR</span>
          </div>
        </Reveal>

        {/* Heading + intro */}
        <Reveal delay={0.1}>
          <h2 className="text-3xl lg:text-7xl font-black text-foreground mb-6">
            UN CYCLE DE HACKATHONS
            <br />
            <span className="text-stroke text-primary">INTERNATIONAUX</span>
          </h2>
          <div className="max-w-3xl space-y-4 text-base lg:text-lg text-muted-foreground leading-relaxed">
            <p>
              En amont du sommet, NODE51 déploie un cycle de hackathons internationaux réunissant développeurs,
              designers et entrepreneurs autour de défis tech africains concrets.
            </p>
            <p>
              Les équipes lauréates de chaque édition se qualifient pour la grande finale lors du Sommet NODE51 à Dakar.
            </p>
          </div>
        </Reveal>

        {/* 3 tracks */}
        <div className="mt-12 lg:mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs lg:text-sm tracking-[0.3em] text-muted-foreground">LES 3 TRACKS</span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {tracks.map((track, i) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-card p-6 hover:bg-secondary transition-colors"
              >
                <span className="font-mono text-[10px] tracking-widest text-primary bg-primary/10 px-2 py-1">
                  0{i + 1}
                </span>
                <h3 className="text-lg lg:text-xl font-black text-foreground mt-4">{track.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{track.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {track.topics.map((topic) => (
                    <span key={topic} className="font-mono text-[11px] text-foreground/80 bg-secondary px-2 py-1">
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-12 lg:mt-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-primary" />
            <span className="font-mono text-xs lg:text-sm tracking-[0.3em] text-muted-foreground">
              CALENDRIER 2026 – 2027
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {calendar.map((row, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ duration: 0.45, ease: EASE, delay: (i % 3) * 0.08 }}
                className={`group flex flex-col rounded-2xl overflow-hidden border transition-colors ${
                  row.finale ? "border-primary/50 bg-primary/[0.06]" : "border-border bg-card/40 hover:border-primary/40"
                }`}
              >
                {/* Visuel */}
                <div className="relative h-44 lg:h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/node51-hackathon-${(i % 3) + 1}.jpg`}
                    alt={`Hackathon NODE51 — ${row.place}`}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <span
                    className={`absolute top-3 left-3 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full ${
                      row.finale
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/70 backdrop-blur-sm text-foreground border border-white/10"
                    }`}
                  >
                    {row.finale ? "GRANDE FINALE" : row.format}
                  </span>
                  <span className="absolute bottom-3 left-3 font-mono text-xs font-bold text-primary bg-background/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                    {row.date}
                  </span>
                </div>

                {/* Contenu */}
                <div className="flex flex-col flex-1 p-5">
                  <h4 className="text-lg font-black text-foreground">{row.place}</h4>
                  {row.venue && !row.finale && (
                    <p className="text-xs text-muted-foreground mt-0.5">{row.venue}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-3 mb-5 leading-relaxed">{row.themes}</p>
                  {!row.finale && (
                    <button
                      type="button"
                      onClick={() => setOpenHackathon(HACKATHON_OPTIONS[i])}
                      className="group/btn mt-auto inline-flex items-center justify-center gap-2 w-full font-mono text-xs tracking-widest rounded-lg py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      S'INSCRIRE
                      <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                    </button>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <HackathonModal hackathon={openHackathon} onClose={() => setOpenHackathon(null)} />
    </section>
  )
}

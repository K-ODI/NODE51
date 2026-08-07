"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"

const zones = [
  {
    id: "ai",
    number: "01",
    title: "AI & DATA ETHICS",
    subtitle: "HALL",
    accent: "#22d3ee", // cyan
    description:
      "L'intelligence artificielle représente une opportunité majeure pour l'Afrique de développer des solutions adaptées à ses réalités.",
    topics: [
      "Machine Learning appliqué aux défis africains",
      "Éthique et régulation de l'IA",
      "Souveraineté des données",
      "IA générative africaine",
    ],
  },
  {
    id: "blockchain",
    number: "02",
    title: "BLOCKCHAIN & WEB3",
    subtitle: "ARENA",
    accent: "#f59e0b", // amber
    description:
      "La révolution blockchain offre à l'Afrique l'opportunité de construire des systèmes financiers inclusifs et transparents.",
    topics: [
      "DeFi et inclusion financière",
      "Tokenisation d'actifs africains",
      "Identité numérique souveraine",
      "Smart contracts agriculture",
    ],
  },
  {
    id: "greentech",
    number: "03",
    title: "GREENTECH & CLIMATE",
    subtitle: "ZONE",
    accent: "#4ade80", // green
    description:
      "Face aux défis climatiques, l'Afrique possède les ressources pour devenir leader mondial des technologies vertes.",
    topics: [
      "Solutions solaires et énergies propres",
      "Mobilité électrique durable",
      "AgriTech intelligente",
      "Gestion de l'eau",
    ],
  },
  {
    id: "iot",
    number: "04",
    title: "IOT & QUANTUM",
    subtitle: "FUTURE LAB",
    accent: "#a78bfa", // violet
    description: "Les technologies émergentes représentent le prochain saut quantique du développement africain.",
    topics: ["Smart Cities connectées", "Computing quantique appliqué", "Infrastructure 5G/6G", "Métavers africain"],
  },
  {
    id: "women",
    number: "05",
    title: "WOMEN IN TECH",
    subtitle: "AFRICA DISTRICT",
    accent: "#f472b6", // rose
    description:
      "L'inclusion des femmes dans la tech n'est pas qu'une question d'équité : c'est un impératif économique.",
    topics: [
      "Mentorship et formation ciblée",
      "Accès au financement",
      "Réseau femmes leaders tech",
      "Initiatives de parité",
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function Zones() {
  const [activeZone, setActiveZone] = useState(zones[0])

  return (
    <section id="zones" className="relative py-16 lg:py-24 bg-background">
      <div className="px-6 lg:px-12">
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            02
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">ZONES THÉMATIQUES</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl lg:text-7xl font-black text-foreground mb-4">
            5 UNIVERS
            <br />
            <span className="text-stroke text-primary">IMMERSIFS</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mb-10 lg:mb-16">
            Chaque zone est conçue comme un écosystème complet avec conférences, démonstrations, ateliers pratiques et
            networking.
          </p>
        </Reveal>

        {/* Zone selector */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Zone list */}
          <div className="lg:col-span-4 space-y-1">
            {zones.map((zone) => {
              const isActive = activeZone.id === zone.id
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone)}
                  style={{ borderColor: isActive ? zone.accent : undefined }}
                  className={`w-full text-left p-4 border-l-2 transition-all ${
                    isActive ? "bg-secondary" : "border-transparent hover:border-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-lg font-display font-black text-transparent transition-opacity"
                      style={{ WebkitTextStroke: `1px ${zone.accent}`, opacity: isActive ? 1 : 0.5 }}
                    >
                      {zone.number}
                    </span>
                    <div>
                      <span className="font-black text-foreground">{zone.title}</span>
                      <span className="block text-xs text-muted-foreground">{zone.subtitle}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Right: Active zone detail (animated on change) */}
          <div className="lg:col-span-8">
            <div className="relative border border-border bg-background overflow-hidden min-h-[420px] lg:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZone.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative p-6 lg:p-10"
                >
                  {/* Accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 origin-left"
                    style={{ background: activeZone.accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />

                  {/* Watermark number in the zone's colour */}
                  <span
                    className="absolute top-4 right-4 text-[120px] font-display font-black text-transparent leading-none select-none"
                    style={{ WebkitTextStroke: `1px ${activeZone.accent}`, opacity: 0.18 }}
                  >
                    {activeZone.number}
                  </span>

                  <div className="relative z-10">
                    <h3 className="text-2xl lg:text-4xl font-black text-foreground mb-2">{activeZone.title}</h3>
                    <span className="font-mono text-sm" style={{ color: activeZone.accent }}>
                      {activeZone.subtitle}
                    </span>

                    <p className="mt-4 lg:mt-6 text-muted-foreground leading-relaxed max-w-xl">
                      {activeZone.description}
                    </p>

                    <div className="mt-6 grid sm:grid-cols-2 gap-3">
                      {activeZone.topics.map((topic, i) => (
                        <motion.div
                          key={topic}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, ease: EASE, delay: 0.1 + i * 0.06 }}
                          className="flex items-center gap-3 p-3 bg-secondary"
                        >
                          <span className="w-2 h-2 rounded-full" style={{ background: activeZone.accent }} />
                          <span className="text-sm text-foreground">{topic}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

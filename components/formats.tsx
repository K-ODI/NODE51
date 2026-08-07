"use client"

import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"

const EASE = [0.22, 1, 0.36, 1] as const

export function Formats() {
  const formats = [
    {
      title: "MAIN STAGE",
      subtitle: "VISION",
      time: "45 MIN",
      desc: "Keynotes inspirants des leaders mondiaux de la tech, ministres africains et PDG de licornes.",
      highlight: true,
    },
    {
      title: "PITCH BATTLE",
      subtitle: "STARTUPS",
      time: "5 MIN/PITCH",
      desc: "50 startups africaines pitchent devant un jury d'investisseurs. Prix cash et accompagnement.",
      highlight: false,
    },
    {
      title: "HACKATHONS",
      subtitle: "24H",
      time: "NON-STOP",
      desc: "Marathons de création où développeurs et designers s'affrontent sur des défis concrets.",
      highlight: false,
    },
    {
      title: "MASTERCLASSES",
      subtitle: "PREMIUM",
      time: "2H",
      desc: "Sessions intensives animées par des experts internationaux. Certificats délivrés.",
      highlight: false,
    },
    {
      title: "JOB & SKILL",
      subtitle: "FAIR",
      time: "ALL DAY",
      desc: "200+ entreprises, 5000+ opportunités d'emploi et de stage pour les talents africains.",
      highlight: false,
    },
    {
      title: "GALA VIP",
      subtitle: "& AWARDS",
      time: "EVENING",
      desc: "Soirée prestigieuse et remise des NODE 51 Awards dans 10 catégories d'excellence.",
      highlight: true,
    },
  ]

  return (
    <section id="formats" className="py-16 lg:py-24 bg-background">
      <div className="px-6 lg:px-12">
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            03
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">FORMATS D'ENGAGEMENT</span>
          </div>
        </Reveal>

        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-16" delay={0.1}>
          <h2 className="text-3xl lg:text-7xl font-black text-foreground">
            AU-DELÀ DE LA
            <br />
            <span className="text-stroke text-primary">CONFÉRENCE</span>
          </h2>
          <p className="text-muted-foreground max-w-md lg:text-right">
            Une semaine d'expériences uniques conçues pour maximiser l'engagement et générer des résultats concrets.
          </p>
        </Reveal>

        {/* Formats grid - asymmetric bento style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {formats.map((format, i) => (
            <motion.div
              key={format.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative p-6 transition-colors ${
                format.highlight ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
              } ${i === 0 ? "lg:row-span-2" : ""}`}
            >
              {/* Time badge */}
              <span
                className={`inline-block font-mono text-[10px] tracking-widest px-2 py-1 mb-4 ${
                  format.highlight ? "bg-primary-foreground/20" : "bg-secondary"
                }`}
              >
                {format.time}
              </span>

              <h3
                className={`text-xl lg:text-2xl font-black ${format.highlight ? "text-primary-foreground" : "text-foreground"}`}
              >
                {format.title}
              </h3>
              <span
                className={`block text-sm font-light ${format.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {format.subtitle}
              </span>

              <p
                className={`mt-3 text-sm leading-relaxed ${format.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}
              >
                {format.desc}
              </p>

              {/* Corner accent */}
              <div
                className={`absolute bottom-0 right-0 w-8 h-8 ${
                  format.highlight ? "bg-primary-foreground/10" : "bg-primary/10"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

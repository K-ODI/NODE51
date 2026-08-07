"use client"

import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/reveal"

const EASE = [0.22, 1, 0.36, 1] as const

export function Audience() {
  const audiences = [
    {
      code: "ENT",
      title: "ENTREPRISES",
      desc: "Multinationales, ETI et PME africaines en quête de talents et de partenariats stratégiques",
      count: "200+",
    },
    {
      code: "GOV",
      title: "GOUVERNEMENTS",
      desc: "Ministères et institutions publiques façonnant les politiques digitales du continent",
      count: "15+",
    },
    {
      code: "EDU",
      title: "UNIVERSITÉS",
      desc: "Établissements d'enseignement supérieur et centres de recherche formant les talents de demain",
      count: "40+",
    },
    {
      code: "STR",
      title: "STARTUPS",
      desc: "Entrepreneurs développant les solutions technologiques qui transforment l'Afrique",
      count: "500+",
    },
    {
      code: "INV",
      title: "INVESTISSEURS",
      desc: "VC, fonds d'investissement et business angels cherchant les prochaines licornes",
      count: "50+",
    },
    {
      code: "NGO",
      title: "ONG & FONDATIONS",
      desc: "Organisations engagées dans le développement des compétences et l'inclusion numérique",
      count: "30+",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden">
      <div className="px-6 lg:px-12">
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            04
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">AUDIENCE</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl lg:text-7xl font-black text-foreground mb-4">
            L'ÉLITE TECH
            <br />
            <span className="text-stroke text-primary">AFRICAINE</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mb-10 lg:mb-16">
            NODE 51 réunit la crème de l'écosystème tech continental et international autour d'une vision commune.
          </p>
        </Reveal>

        {/* Audience grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {audiences.map((item, i) => (
            <motion.div
              key={item.code}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className="bg-background p-6 group hover:bg-secondary transition-colors relative"
            >
              {/* Code badge */}
              <span className="font-mono text-[10px] tracking-widest text-primary bg-primary/10 px-2 py-1">
                {item.code}
              </span>

              <h3 className="text-lg lg:text-xl font-black text-foreground mt-4 mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>

              {/* Count */}
              <div className="absolute bottom-4 right-4">
                <span className="text-3xl font-display font-black text-foreground/10 group-hover:text-primary/20 transition-colors">
                  {item.count}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling ticker */}
        <div className="mt-10 py-4 border-y border-border overflow-hidden">
          <div className="marquee flex gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12">
                {[
                  "10 000 VISITEURS",
                  "150 SPEAKERS",
                  "20 PAYS AFRICAINS",
                  "50 VCs",
                  "200 ENTREPRISES",
                  "500 STARTUPS",
                  "5000 OPPORTUNITÉS",
                ].map((text) => (
                  <span key={text} className="flex items-center gap-4">
                    <span className="w-2 h-2 bg-primary" />
                    <span className="font-mono text-sm tracking-wider text-muted-foreground">{text}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

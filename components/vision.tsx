"use client"

import { useRef } from "react"
import { Reveal } from "@/components/ui/reveal"

export function Vision() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="vision" className="relative py-16 lg:py-24 overflow-hidden" ref={containerRef}>
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card clip-diagonal hidden md:block" />

      <div className="relative z-10 px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            01
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">VISION</span>
          </div>
        </Reveal>

        {/* Main quote */}
        <Reveal delay={0.1}>
          <blockquote className="relative">
            <span className="absolute -left-4 -top-8 text-8xl font-black text-primary/20">"</span>
            <p className="text-2xl sm:text-3xl lg:text-[clamp(1rem,2vw,2.4rem)] lg:whitespace-nowrap font-black leading-[1.1] tracking-tight text-foreground">
              Faire de l'Afrique un{" "}
              <span className="relative inline-block">
                <span className="relative z-10">producteur global</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/30 -z-0" />
              </span>{" "}
              de technologies, et plus qu'un simple consommateur.
            </p>
          </blockquote>
        </Reveal>

        {/* Vision pillars */}
        <div className="grid lg:grid-cols-3 gap-px bg-border mt-12 lg:mt-20">
          {[
            {
              number: "I",
              title: "SOUVERAINETÉ",
              subtitle: "NUMÉRIQUE",
              desc: "Construire une infrastructure technologique africaine indépendante et résiliente.",
            },
            {
              number: "II",
              title: "EXCELLENCE",
              subtitle: "CONTINENTALE",
              desc: "Positionner l'Afrique comme hub d'innovation reconnu mondialement.",
            },
            {
              number: "III",
              title: "IMPACT",
              subtitle: "MESURABLE",
              desc: "Transformer les idées en actions concrètes avec des résultats quantifiables.",
            },
          ].map((pillar) => (
            <div key={pillar.number} className="bg-background p-6 lg:p-10 group hover:bg-card transition-colors">
              <span className="font-mono text-5xl font-thin text-primary/50 group-hover:text-primary transition-colors">
                {pillar.number}
              </span>
              <h3 className="mt-6 mb-2">
                <span className="block text-xl lg:text-2xl font-black text-foreground">{pillar.title}</span>
                <span className="block text-lg font-light text-muted-foreground">{pillar.subtitle}</span>
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Market opportunity */}
        <div className="mt-12 lg:mt-20 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h3 className="font-mono text-xs tracking-widest text-primary mb-6">L'OPPORTUNITÉ AFRICAINE</h3>
            <p className="text-lg lg:text-2xl text-foreground leading-relaxed">
              D'ici 2030, le marché tech africain atteindra{" "}
              <span className="font-black text-primary">180 milliards $</span>. L'Afrique compte{" "}
              <span className="font-black text-primary">700+ hubs tech</span> et a généré{" "}
              <span className="font-black text-primary">5 milliards $</span> de financement startup en 2022.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              { value: "180B$", label: "Marché 2030" },
              { value: "700+", label: "Tech Hubs" },
              { value: "5B$", label: "VC 2022" },
              { value: "1M", label: "Talents à former" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card p-4 lg:p-6 text-center">
                <div className="text-2xl lg:text-3xl font-display font-black text-primary">{stat.value}</div>
                <div className="font-mono text-[10px] tracking-wider text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

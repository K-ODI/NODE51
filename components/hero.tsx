"use client"

import { motion } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 grain pointer-events-none" />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(74, 222, 128, 0.3) 0%, rgba(74, 222, 128, 0.15) 30%, rgba(74, 222, 128, 0.03) 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-6 lg:px-12 pt-4 lg:pt-0 pb-48 lg:pb-32">
        <div className="flex flex-row items-center gap-6 md:gap-8 lg:gap-16">
          {/* LEFT BLOCK - NODE 51 */}
          <motion.div
            className="flex flex-col flex-shrink-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <div className="hidden md:inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-6 pl-1">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary flex-shrink-0" />
              <span className="font-mono text-[7px] md:text-xs tracking-widest text-muted-foreground uppercase">
                African Tech, Innovation & Sovereignty Week
              </span>
            </div>

            <h1 className="flex flex-col">
              <span className="text-[18vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter text-foreground">
                NODE
              </span>
              <span className="text-[18vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--primary)] md:[-webkit-text-stroke:2px_var(--primary)]">
                51
              </span>
            </h1>
          </motion.div>

          {/* RIGHT BLOCK - Dates & Lieu */}
          <motion.div
            className="flex-shrink-0 lg:mt-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
          >
            <div className="border border-primary/40 bg-background/50 backdrop-blur-sm">
              <div className="p-3 md:p-6 lg:p-10 text-center">
                <div className="font-mono text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-1 md:mb-4">
                  DATES
                </div>
                <div className="text-2xl md:text-4xl lg:text-6xl font-black text-foreground leading-none tracking-tight">
                  9—10
                </div>
                <div className="font-mono text-[10px] md:text-base lg:text-xl text-primary mt-1 md:mt-3 tracking-[0.1em] md:tracking-[0.2em]">
                  FÉV 2027
                </div>
              </div>
              <div className="border-t border-primary/40 p-3 md:p-6 lg:p-10 text-center">
                <div className="font-mono text-[7px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] text-muted-foreground mb-1 md:mb-4">
                  LIEU
                </div>
                <div className="text-xl md:text-2xl lg:text-4xl font-black text-foreground tracking-tight">DAKAR</div>
                <div className="font-mono text-[8px] md:text-sm text-muted-foreground mt-1 md:mt-2 tracking-wider">
                  SÉNÉGAL
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar - absolute bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10K+", label: "VISITEURS" },
              { value: "150+", label: "SPEAKERS" },
              { value: "200+", label: "ENTREPRISES" },
              { value: "20+", label: "PAYS AFRICAINS" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`py-5 md:py-6 px-4 md:px-4 lg:px-6 text-center ${
                  i % 2 === 0 ? "border-r border-border" : ""
                } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i < 3 ? "lg:border-r" : ""} lg:text-left`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.08 }}
              >
                <div className="text-2xl md:text-2xl lg:text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="font-mono text-[9px] md:text-[9px] lg:text-[10px] tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

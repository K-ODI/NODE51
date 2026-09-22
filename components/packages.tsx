"use client"

import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { PartnerModal } from "@/components/partner-modal"

interface Package {
  tier: string
  price: string
  tagline: string
  featured: boolean
  benefits: string[]
}

const packages: Package[] = [
  {
    tier: "FONDATEUR",
    price: "150 000",
    tagline: "Pilier Fondateur de NODE 51",
    featured: false,
    benefits: [
      "Naming exclusif de l'événement",
      "Keynote Scène Principale (45 min)",
      "Stand Premium 30 m²",
      "20 Invitations VIP",
      "Présence sur tous les hackathons",
      "Accès institutionnel aux ministres",
    ],
  },
  {
    tier: "PLATINUM",
    price: "100 000",
    tagline: "Statut de Fondateur Institutionnel",
    featured: true,
    benefits: [
      "Naming Exclusif sur toute la communication",
      "Keynote Grande Scène (30 min)",
      "Stand Premium 36 m²",
      "20 Invitations VIP",
      "Accès Institutionnel aux ministres",
      "Base données 500+ startups",
      "Programme ELEVATE 2030",
    ],
  },
  {
    tier: "CALIFORNIUM",
    price: "100 000",
    tagline: "Partenaire Clé du Sommet",
    featured: false,
    benefits: [
      "Panel Grande Scène (15 min)",
      "Stand Premium 30 m²",
      "Branding Gold",
      "10 Invitations VIP + Gala",
      "Interview NODE 51 TALKS",
      "Présence 3 hackathons",
    ],
  },
  {
    tier: "DIAMANT ROUGE",
    price: "75 000",
    tagline: "Visibilité Premium & Masterclass",
    featured: false,
    benefits: [
      "Panel Grande Scène (15 min)",
      "Stand 18 m²",
      "Masterclass Dédiée (90 min)",
      "10 Invitations VIP",
      "Présence 2 hackathons",
    ],
  },
  {
    tier: "GOLD",
    price: "50 000",
    tagline: "Leadership Visible et Impact Stratégique",
    featured: false,
    benefits: [
      "Panel Grande Scène (15 min)",
      "Stand Premium 36 m²",
      "Branding Gold",
      "10 Invitations VIP + Gala",
      "Interview NODE 51 TALKS",
    ],
  },
  {
    tier: "TRITIUM",
    price: "50 000",
    tagline: "Présence Solide et Networking",
    featured: false,
    benefits: ["Stand 18 m²", "Branding Premium + Gala", "5 Invitations VIP", "Présence 1 hackathon"],
  },
  {
    tier: "SILVER",
    price: "25 000",
    tagline: "Visibilité Qualifiée et Accès Privilégié",
    featured: false,
    benefits: ["Stand 18 m²", "Masterclass Dédiée (90 min)", "Branding Silver", "5 Invitations VIP", "Job & Skill Fair"],
  },
  {
    tier: "BRONZE",
    price: "10 000",
    tagline: "Présence Stratégique et Networking",
    featured: false,
    benefits: ["Visibilité Digitale", "Logo sur les supports", "2 Invitations VIP", "Accès réseaux entreprises"],
  },
  {
    tier: "STARTUP",
    price: "3 000",
    tagline: "Tremplin pour Entrepreneurs",
    featured: false,
    benefits: ["Mini Stand 3m²", "Pitch Stage (5 min)", "Catalogue startups", "3 sessions mentoring"],
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Packages() {
  const [openTier, setOpenTier] = useState<string | null>(null)

  return (
    <section id="partenaires" className="relative py-16 lg:py-24 bg-background overflow-hidden">
      {/* Green aurora background */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none" aria-hidden="true">
        <div className="partners-aurora-bg">
          <div className="partners-shape-1" />
          <div className="partners-shape-2" />
        </div>
      </div>
      <style>{`
        .partners-aurora-bg { position: absolute; inset: 0; filter: blur(110px); }
        .partners-shape-1, .partners-shape-2 { position: absolute; border-radius: 9999px; }
        .partners-shape-1 { width: 620px; height: 620px; background-color: rgba(0, 172, 152, 0.45); top: 0%; left: 8%; animation: partnersAuroraA 22s infinite alternate ease-in-out; }
        .partners-shape-2 { width: 520px; height: 520px; background-color: rgba(16, 185, 129, 0.4); bottom: 0%; right: 8%; animation: partnersAuroraB 26s infinite alternate ease-in-out; }
        @keyframes partnersAuroraA { from { transform: translate(0,0) rotate(0deg); } to { transform: translate(120px,60px) rotate(180deg); } }
        @keyframes partnersAuroraB { from { transform: translate(0,0) rotate(0deg); } to { transform: translate(-120px,-60px) rotate(-180deg); } }
      `}</style>

      <div className="relative z-10 px-6 lg:px-12">
        {/* Section header (consistent with the rest of the site) */}
        <Reveal className="flex items-center gap-4 lg:gap-6 mb-10 lg:mb-16">
          <span className="text-6xl lg:text-8xl font-display font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] select-none">
            05
          </span>
          <div className="flex flex-col">
            <div className="w-12 h-px bg-primary mb-2" />
            <span className="font-mono text-sm lg:text-base tracking-[0.3em] text-primary">PARTENARIATS</span>
          </div>
        </Reveal>

        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-16" delay={0.1}>
          <h2 className="text-3xl lg:text-7xl font-black text-foreground">
            INVESTISSEZ DANS
            <br />
            <span className="text-stroke text-primary">L'AVENIR</span>
          </h2>
          <p className="text-muted-foreground max-w-md lg:text-right">
            Devenir partenaire de NODE 51, c'est s'associer à un mouvement historique qui repositionne l'Afrique sur
            l'échiquier technologique mondial.
          </p>
        </Reveal>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.tier}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              whileHover={{ y: -8 }}
              className={`group relative p-6 rounded-2xl border overflow-hidden ${
                pkg.featured
                  ? "border-primary/40 bg-primary/[0.06]"
                  : "border-border bg-card/40 backdrop-blur-sm"
              }`}
            >
              {/* Card aurora glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25"
                style={{
                  background: "linear-gradient(45deg, #00AC98, #10b981)",
                  filter: "blur(50px)",
                }}
              />

              {pkg.featured && (
                <div className="absolute top-0 right-0 text-[10px] font-mono font-bold tracking-widest text-primary-foreground bg-primary px-4 py-1.5 rounded-bl-lg">
                  RECOMMANDÉ
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-2xl font-display font-black text-foreground">{pkg.tier}</h3>
                <p className="text-sm text-muted-foreground mt-2">{pkg.tagline}</p>

                <div className="flex items-baseline mt-6 whitespace-nowrap">
                  <span className="text-3xl lg:text-4xl font-display font-black tracking-tight text-primary">
                    {pkg.price}
                  </span>
                  <span className="font-mono text-base text-muted-foreground ml-1.5">€</span>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {pkg.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-sm text-foreground/90">
                      <CheckCircle className="h-4 w-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => setOpenTier(pkg.tier)}
                  className={`w-full mt-8 font-mono text-xs tracking-widest rounded-lg py-3 transition-colors ${
                    pkg.featured
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  DEVENIR PARTENAIRE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PartnerModal tier={openTier} onClose={() => setOpenTier(null)} />
    </section>
  )
}

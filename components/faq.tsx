"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// NOTE: dépose ton image (enfant casque VR / drapeau du Sénégal) dans public/
// sous le nom faq-vr-senegal.png puis remplace la ligne FAQ_IMAGE ci-dessous.
const FAQ_IMAGE = "/node51-hero.jpg" // PLACEHOLDER → remplacer par "/faq-vr-senegal.png"

const faqs = [
  {
    question: "Pourquoi le nom NODE 51 ?",
    answer:
      "NODE 51 symbolise le nœud de connexion entre l'Afrique et le monde. Le 5 représente les 5 régions du continent — Afrique du Nord, de l'Ouest, Centrale, de l'Est et Australe. Le 1 représente le reste du monde. 5 + 1 = 51 : le point de convergence où l'Afrique s'unit pour dialoguer avec le monde.",
  },
  {
    question: "Quand et où se déroule NODE 51 ?",
    answer:
      "NODE 51 se tiendra le 23 février 2027 au CICAD (Centre International de Conférences Abdou Diouf) à Diamniadio, Dakar, Sénégal.",
  },
  {
    question: "Qui peut participer ?",
    answer:
      "NODE 51 s'adresse aux fondateurs de startups, investisseurs, décideurs politiques, développeurs, chercheurs, entreprises tech et toute personne passionnée par l'innovation technologique en Afrique.",
  },
  {
    question: "Comment devenir partenaire ?",
    answer:
      "Plusieurs formules de partenariat sont disponibles : Platinum, Gold, Silver, Bronze et Startup. Contactez-nous via le formulaire de contact ou à partenariats@node51.io pour discuter de la formule adaptée à vos objectifs.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image block (adapté au thème : halo vert + fondu des bords, casque/drapeau conservés) */}
          <div className="relative order-first">
            {/* Green glow behind */}
            <div className="absolute inset-0 bg-primary/15 blur-[90px] rounded-full pointer-events-none" aria-hidden="true" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FAQ_IMAGE}
              alt="Jeune Sénégalais portant un casque VR affichant le drapeau du Sénégal"
              className="relative z-10 w-full object-contain [mask-image:radial-gradient(125%_125%_at_50%_45%,#000_58%,transparent_100%)] [-webkit-mask-image:radial-gradient(125%_125%_at_50%_45%,#000_58%,transparent_100%)]"
            />
            {/* Brand accent line echoing the image's green border */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 h-1 w-24 bg-primary rounded-full" aria-hidden="true" />
          </div>

          {/* FAQ block */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8 lg:mb-10">
              <span
                className="text-[64px] md:text-[96px] font-display font-black leading-none"
                style={{
                  WebkitTextStroke: "1.5px var(--primary)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-wider">FAQ</h2>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-primary/30 px-6 py-2 rounded-none"
                >
                  <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}

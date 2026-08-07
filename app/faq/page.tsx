"use client"

import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import Link from "next/link"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqCategories = [
    {
      title: "GÉNÉRAL",
      questions: [
        {
          q: "Qu'est-ce que NODE 51 ?",
          a: "NODE 51 est le premier sommet panafricain dédié à la Tech, l'Innovation et la Souveraineté Numérique. L'événement réunit 10 000+ participants de 20 pays africains autour de 5 zones thématiques : IA, Blockchain, GreenTech, IoT/Quantum et Women in Tech.",
        },
        {
          q: "Pourquoi le nom « NODE 51 » ?",
          a: "NODE 51 symbolise le nœud de connexion entre l'Afrique et le monde. Le « 5 » représente les 5 grandes régions africaines : Afrique du Nord, de l'Ouest, Centrale, de l'Est et Australe. Le « 1 », c'est le reste du monde. « 5 » & « 1 » → « 51 » — le point de convergence où l'Afrique entière se connecte au monde.",
        },
        {
          q: "Quand et où se déroule l'événement ?",
          a: "NODE 51 se tiendra les 9 et 10 février 2027 au CICAD (Centre International de Conférences Abdou Diouf) à Diamniadio, Dakar, Sénégal.",
        },
      ],
    },
    {
      title: "BILLETTERIE",
      questions: [
        {
          q: "Comment obtenir mon badge visiteur ?",
          a: "Les inscriptions ouvriront à l'automne 2026. Inscrivez-vous à notre newsletter pour être informé en priorité. Différentes formules seront disponibles : pass journée, pass 2 jours, et pass VIP.",
        },
        {
          q: "Quels sont les tarifs prévus ?",
          a: "Les tarifs seront annoncés à l'automne 2026. Des tarifs préférentiels seront proposés aux étudiants, startups africaines et aux inscriptions anticipées (early bird).",
        },
        {
          q: "Y a-t-il des réductions pour les groupes ?",
          a: "Oui, des tarifs dégressifs sont prévus pour les délégations d'entreprises (5+ personnes) et les groupes universitaires. Contactez-nous pour un devis personnalisé.",
        },
      ],
    },
    {
      title: "LIEU & ACCÈS",
      questions: [
        {
          q: "Comment se rendre au CICAD ?",
          a: "Le CICAD est situé à Diamniadio, à 30km de Dakar. Accessible par le Train Express Régional (TER) depuis Dakar (30 min), navettes officielles depuis l'aéroport AIBD, ou en voiture via l'autoroute à péage.",
        },
        {
          q: "Y a-t-il un parking sur place ?",
          a: "Oui, le CICAD dispose d'un parking de 200 places. Des parkings supplémentaires avec navettes seront mis en place pour l'événement.",
        },
        {
          q: "Quels hôtels recommandez-vous ?",
          a: "Nous avons négocié des tarifs préférentiels avec plusieurs hôtels à Diamniadio et Dakar. La liste des hébergements partenaires sera disponible lors de l'ouverture des inscriptions.",
        },
      ],
    },
    {
      title: "PARTENARIATS",
      questions: [
        {
          q: "Comment devenir partenaire de NODE 51 ?",
          a: "Consultez notre page Partenaires pour découvrir les différentes formules (Platinum, Gold, Silver, Bronze, Startup). Contactez notre équipe partenariats à partners@node51.io pour une proposition personnalisée.",
        },
        {
          q: "Proposez-vous des partenariats médias ?",
          a: "Oui, nous recherchons des partenaires médias africains et internationaux. Contactez press@node51.io pour discuter des opportunités de collaboration.",
        },
        {
          q: "Quels sont les avantages des partenaires ?",
          a: "Selon votre formule, vous bénéficiez de visibilité sur scène, stands premium, invitations VIP, accès aux données participants, et bien plus. Chaque package est conçu pour maximiser votre impact et votre retour sur investissement.",
        },
      ],
    },
  ]

  let globalIndex = 0

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <PageHeader
        title="QUESTIONS FRÉQUENTES"
        subtitle="Tout ce que vous devez savoir sur NODE 51. Une question non listée ? Contactez-nous."
        breadcrumb="FAQ"
      />

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-black text-stroke text-primary">
                  {String(catIndex + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl font-black text-foreground">{category.title}</h2>
              </div>

              <div className="space-y-2">
                {category.questions.map((item, qIndex) => {
                  const currentGlobalIndex = globalIndex++
                  const isOpen = openIndex === currentGlobalIndex

                  return (
                    <div
                      key={qIndex}
                      className={`border transition-colors ${isOpen ? "border-primary bg-primary/5" : "border-border"}`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : currentGlobalIndex)}
                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                      >
                        <span className={`font-bold transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                          {item.q}
                        </span>
                        <span
                          className={`text-2xl transition-transform ${isOpen ? "rotate-45 text-primary" : "text-muted-foreground"}`}
                        >
                          +
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-card border border-border text-center">
          <h3 className="text-2xl font-black text-foreground mb-4">
            VOUS N'AVEZ PAS TROUVÉ
            <br />
            VOTRE RÉPONSE ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Notre équipe est disponible pour répondre à toutes vos questions.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider hover:bg-primary/90 transition-colors"
          >
            NOUS CONTACTER
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}

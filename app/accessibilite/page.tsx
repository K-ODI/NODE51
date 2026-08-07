import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function AccessibilitePage() {
  const accessFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="8" r="4" />
          <path d="M16 14v6M12 28l4-8 4 8M8 20h16" />
        </svg>
      ),
      title: "MOBILITÉ RÉDUITE",
      features: [
        "Rampes d'accès à toutes les entrées",
        "Ascenseurs panoramiques",
        "Places PMR réservées en salle plénière",
        "Toilettes adaptées à chaque niveau",
        "Parking PMR proche des entrées",
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="16" r="10" />
          <circle cx="16" cy="16" r="4" />
          <path d="M16 2v4M16 26v4M2 16h4M26 16h4" />
        </svg>
      ),
      title: "DÉFICIENCE VISUELLE",
      features: [
        "Signalétique en braille",
        "Bandes podotactiles",
        "Application audio-description",
        "Accompagnateurs sur demande",
        "Documents en gros caractères",
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 12c0-5.5 4.5-10 10-10s10 4.5 10 10v2c0 2-1 4-3 5l-3 2v3H12v-3l-3-2c-2-1-3-3-3-5v-2z" />
          <path d="M12 26h8v4H12z" />
          <path d="M10 14h2M20 14h2" />
        </svg>
      ),
      title: "DÉFICIENCE AUDITIVE",
      features: [
        "Boucles magnétiques en salles",
        "Interprètes LSF sur les keynotes",
        "Sous-titrage en temps réel",
        "Alertes visuelles",
        "Personnel formé",
      ],
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="16" cy="16" r="12" />
          <path d="M16 8v4M12 20h8M10 14l2 2M20 14l-2 2" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      ),
      title: "NEURODIVERSITÉ",
      features: [
        "Espaces calmes dédiés",
        "Programme en format simplifié",
        "Signalétique claire et pictogrammes",
        "Casques anti-bruit disponibles",
        "Parcours balisés",
      ],
    },
  ]

  const transportModes = [
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="8" width="24" height="16" rx="2" />
          <path d="M4 14h24M10 20v4M22 20v4M8 12h4M20 12h4" />
        </svg>
      ),
      title: "TER",
      description: "Train Express Régional depuis Dakar. Station Diamniadio à 5 min à pied du CICAD.",
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 4l12 8-4 14H8L4 12l12-8z" />
          <circle cx="16" cy="14" r="3" />
          <path d="M14 20h4v4h-4z" />
        </svg>
      ),
      title: "AÉROPORT",
      description: "AIBD à 20 min. Navettes officielles NODE 51 et taxis disponibles.",
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 20h20v4H6z" />
          <path d="M8 14h16l2 6H6l2-6z" />
          <circle cx="10" cy="26" r="2" />
          <circle cx="22" cy="26" r="2" />
          <path d="M12 14v-4h8v4" />
        </svg>
      ),
      title: "VOITURE",
      description: "Autoroute à péage Dakar-AIBD. 30 km du centre-ville. Parking 200 places.",
    },
  ]

  const venueInfo = {
    name: "CICAD",
    fullName: "Centre International de Conférences Abdou Diouf",
    location: "Diamniadio, Dakar, Sénégal",
    surface: "14 700 m²",
    capacity: "1 500 places",
    parking: "200 places",
    restaurants: "470 couverts",
    features: [
      "8 cabines de traduction simultanée",
      "6 salons VIP de 100m²",
      "Centre média 120 places",
      "Technologie audio/vidéo dernière génération",
      "Climatisation intégrale",
      "Wifi haut débit dans tout le complexe",
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <PageHeader
        title="ACCESSIBILITÉ"
        subtitle="NODE 51 s'engage pour un événement inclusif et accessible à tous. Découvrez nos dispositifs."
        breadcrumb="ACCESSIBILITÉ"
      />

      {/* Venue info */}
      <section className="px-6 lg:px-12 py-16 lg:py-24 border-b border-border">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl font-black text-stroke text-primary">◉</span>
              <div>
                <h2 className="text-2xl font-black text-foreground">{venueInfo.name}</h2>
                <p className="text-sm text-muted-foreground">{venueInfo.fullName}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Inauguré en 2014, le CICAD est l'un des centres de conférences les plus modernes d'Afrique de l'Ouest.
              Construit selon les normes internationales d'accessibilité, il offre un environnement adapté à tous les
              visiteurs.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-card border border-border">
                <span className="font-mono text-xs text-muted-foreground">SURFACE</span>
                <p className="text-xl font-black text-foreground">{venueInfo.surface}</p>
              </div>
              <div className="p-4 bg-card border border-border">
                <span className="font-mono text-xs text-muted-foreground">CAPACITÉ</span>
                <p className="text-xl font-black text-foreground">{venueInfo.capacity}</p>
              </div>
              <div className="p-4 bg-card border border-border">
                <span className="font-mono text-xs text-muted-foreground">PARKING</span>
                <p className="text-xl font-black text-foreground">{venueInfo.parking}</p>
              </div>
              <div className="p-4 bg-card border border-border">
                <span className="font-mono text-xs text-muted-foreground">RESTAURATION</span>
                <p className="text-xl font-black text-foreground">{venueInfo.restaurants}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-8">
            <h3 className="text-lg font-black text-foreground mb-6">ÉQUIPEMENTS DU CICAD</h3>
            <ul className="space-y-3">
              {venueInfo.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Access features */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-black text-foreground mb-12 text-center">
          DISPOSITIFS
          <br />
          <span className="text-stroke text-primary">D'ACCESSIBILITÉ</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {accessFeatures.map((category, i) => (
            <div key={i} className="border border-border p-8 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 border border-primary flex items-center justify-center text-primary">
                  {category.icon}
                </div>
                <h3 className="text-lg font-black text-foreground">{category.title}</h3>
              </div>

              <ul className="space-y-3">
                {category.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1 h-1 bg-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Transport */}
      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-foreground mb-8 text-center">
            ACCÈS AU <span className="text-stroke text-primary">CICAD</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {transportModes.map((mode, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 border border-primary flex items-center justify-center text-primary">
                  {mode.icon}
                </div>
                <h3 className="font-black text-foreground mb-2">{mode.title}</h3>
                <p className="text-sm text-muted-foreground">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special needs contact */}
      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-foreground mb-6">BESOINS SPÉCIFIQUES ?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Notre équipe accessibilité est à votre disposition pour organiser votre venue et répondre à vos besoins
            particuliers. N'hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:accessibilite@node51.io"
              className="px-8 py-4 bg-primary text-primary-foreground font-mono text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              accessibilite@node51.io
            </a>
            <Link
              href="/#contact"
              className="px-8 py-4 border border-foreground text-foreground font-mono text-sm tracking-wider hover:bg-foreground hover:text-background transition-colors"
            >
              FORMULAIRE DE CONTACT
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

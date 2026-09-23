import { Navigation } from "@/components/navigation"
import { LandingHero } from "@/components/landing-hero"
import { Vision } from "@/components/vision"
import { Zones } from "@/components/zones"
import { Formats } from "@/components/formats"
import { Audience } from "@/components/audience"
import { InnovationTour } from "@/components/innovation-tour"
import { Packages } from "@/components/packages"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <LandingHero />
      <Vision />
      <Zones />
      <Formats />
      <Audience />
      <InnovationTour />
      <Packages />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

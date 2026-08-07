import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Mentions légales | NODE 51",
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-xs tracking-widest text-primary mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PageHeader
        title="MENTIONS LÉGALES"
        subtitle="Informations légales relatives au site node51.io et à son éditeur."
        breadcrumb="MENTIONS LÉGALES"
      />

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <Block title="ÉDITEUR DU SITE">
            <p>
              Le site <strong className="text-foreground">node51.io</strong> est édité par{" "}
              <span className="text-foreground">[RAISON SOCIALE À COMPLÉTER]</span>, [forme juridique — ex. SAS], au
              capital de [montant] €, immatriculée sous le numéro [SIRET/RCCM], dont le siège social est situé [adresse
              complète].
            </p>
            <p>
              Email :{" "}
              <a href="mailto:contact@node51.io" className="text-primary hover:underline">
                contact@node51.io
              </a>
              {" · "}Téléphone : +221 33 XXX XX XX
            </p>
          </Block>

          <Block title="DIRECTEUR DE LA PUBLICATION">
            <p>[NOM DU DIRECTEUR DE LA PUBLICATION À COMPLÉTER].</p>
          </Block>

          <Block title="HÉBERGEMENT">
            <p>
              Le site est hébergé par <strong className="text-foreground">Vercel Inc.</strong>, 340 S Lemon Ave #4133,
              Walnut, CA 91789, États-Unis —{" "}
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                vercel.com
              </a>
              .
            </p>
            <p>
              Les données des formulaires sont hébergées par <strong className="text-foreground">Supabase</strong>{" "}
              (infrastructure Union Européenne) et les emails transactionnels acheminés par{" "}
              <strong className="text-foreground">Resend</strong>.
            </p>
          </Block>

          <Block title="PROPRIÉTÉ INTELLECTUELLE">
            <p>
              L'ensemble des contenus présents sur ce site (textes, logos, identité visuelle « NODE 51 », graphismes,
              typographies, animations) sont la propriété exclusive de l'éditeur ou de ses partenaires, sauf mention
              contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite
              préalable, est interdite et constitue une contrefaçon.
            </p>
          </Block>

          <Block title="RESPONSABILITÉ">
            <p>
              L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées, sans garantie
              d'exhaustivité. Les dates, tarifs, speakers et programmes annoncés sont susceptibles d'évoluer. L'éditeur
              ne saurait être tenu responsable des erreurs, d'une indisponibilité du site, ou de dommages résultant de
              son utilisation.
            </p>
          </Block>

          <Block title="LIENS EXTERNES">
            <p>
              Le site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et
              décline toute responsabilité quant à leur contenu.
            </p>
          </Block>

          <Block title="DONNÉES PERSONNELLES & COOKIES">
            <p>
              Le traitement de vos données personnelles est détaillé dans notre{" "}
              <a href="/confidentialite" className="text-primary hover:underline">
                politique de confidentialité
              </a>
              .
            </p>
          </Block>

          <Block title="DROIT APPLICABLE">
            <p>
              Les présentes mentions sont régies par le droit sénégalais. Tout litige relève de la compétence des
              tribunaux de Dakar, sous réserve des dispositions légales impératives applicables.
            </p>
          </Block>

          <p className="font-mono text-xs text-muted-foreground/60 mt-12">
            Dernière mise à jour : [DATE À COMPLÉTER].
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}

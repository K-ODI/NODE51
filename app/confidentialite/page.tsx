import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/page-header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Politique de confidentialité | NODE 51",
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-mono text-xs tracking-widest text-primary mb-3">{title}</h2>
      <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <PageHeader
        title="CONFIDENTIALITÉ"
        subtitle="Comment NODE 51 collecte, utilise et protège vos données personnelles."
        breadcrumb="CONFIDENTIALITÉ"
      />

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl">
          <Block title="RESPONSABLE DU TRAITEMENT">
            <p>
              Le responsable du traitement des données est{" "}
              <span className="text-foreground">[RAISON SOCIALE À COMPLÉTER]</span>, éditeur du site node51.io.
              Pour toute question :{" "}
              <a href="mailto:contact@node51.io" className="text-primary hover:underline">
                contact@node51.io
              </a>
              .
            </p>
          </Block>

          <Block title="DONNÉES COLLECTÉES">
            <p>Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground">Formulaire de contact</strong> : nom, email, entreprise, sujet
                d'intérêt, message.
              </li>
              <li>
                <strong className="text-foreground">Devenir partenaire</strong> : nom, email, entreprise, message, offre
                sélectionnée.
              </li>
              <li>
                <strong className="text-foreground">Newsletter</strong> : adresse email.
              </li>
            </ul>
            <p>
              Des données techniques de mesure d'audience (pages vues, appareil) peuvent être collectées de façon
              anonymisée via Vercel Analytics.
            </p>
          </Block>

          <Block title="FINALITÉS & BASE LÉGALE">
            <ul className="list-disc pl-5 space-y-1">
              <li>Répondre à vos demandes de contact et de partenariat (intérêt légitime / mesures précontractuelles).</li>
              <li>Vous envoyer notre newsletter et les actualités de l'événement (consentement).</li>
              <li>Améliorer et sécuriser le site (intérêt légitime).</li>
            </ul>
          </Block>

          <Block title="DESTINATAIRES & SOUS-TRAITANTS">
            <p>Vos données ne sont jamais vendues. Elles sont accessibles à l'équipe NODE 51 et à nos sous-traitants techniques :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-foreground">Supabase</strong> — hébergement de la base de données (Union
                Européenne).
              </li>
              <li>
                <strong className="text-foreground">Resend</strong> — acheminement des emails.
              </li>
              <li>
                <strong className="text-foreground">Vercel</strong> — hébergement du site et mesure d'audience.
              </li>
            </ul>
          </Block>

          <Block title="DURÉE DE CONSERVATION">
            <p>
              Les demandes de contact et de partenariat sont conservées jusqu'à 3 ans après le dernier échange. Les
              inscriptions à la newsletter sont conservées jusqu'à votre désinscription.
            </p>
          </Block>

          <Block title="VOS DROITS">
            <p>
              Conformément au RGPD et à la loi sénégalaise n° 2008-12 sur la protection des données personnelles, vous
              disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité
              de vos données.
            </p>
            <p>
              Pour exercer ces droits, écrivez à{" "}
              <a href="mailto:contact@node51.io" className="text-primary hover:underline">
                contact@node51.io
              </a>
              . Vous pouvez également introduire une réclamation auprès de l'autorité de contrôle compétente (CDP au
              Sénégal, CNIL en France).
            </p>
          </Block>

          <Block title="COOKIES">
            <p>
              Le site n'utilise pas de cookies publicitaires. Seuls des outils de mesure d'audience respectueux de la vie
              privée (Vercel Analytics, sans cookie tiers) peuvent être employés.
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

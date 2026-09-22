import Link from "next/link"
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer"
import { NewsletterForm } from "@/components/newsletter-form"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const infoLinks = [
    { href: "/programme", label: "Programme" },
    { href: "/speakers", label: "Speakers" },
    { href: "/presse", label: "Presse" },
    { href: "/faq", label: "FAQ" },
    { href: "/accessibilite", label: "Accessibilité" },
  ]

  const socialLinks = [
    { label: "X", href: "https://x.com/node51africa" },
    { label: "IN", href: "https://linkedin.com/company/node51" },
    { label: "YT", href: "https://youtube.com/@node51africa" },
    { label: "IG", href: "https://instagram.com/node51africa" },
  ]

  return (
    <footer className="relative bg-background overflow-hidden">
      <FooterBackgroundGradient />

      {/* Main footer content */}
      <div className="relative z-10 px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-black text-2xl">51</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-16 h-16 border border-primary group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tighter text-foreground">NODE</span>
                <span className="block text-xs font-mono text-muted-foreground tracking-widest">DAKAR 2027</span>
              </div>
            </Link>

            <p className="text-muted-foreground max-w-sm mb-6">
              African Tech, Innovation & Sovereignty Day. Le catalyseur de la transformation technologique africaine.
            </p>

            <div className="max-w-sm mb-8">
              <NewsletterForm />
            </div>

            <div className="flex gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary hover:bg-primary flex items-center justify-center transition-colors group"
                >
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary-foreground">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-mono text-xs tracking-widest text-primary mb-6">NAVIGATION</h3>
              <ul className="space-y-3">
                {[
                  { href: "/#vision", label: "Vision" },
                  { href: "/#zones", label: "Zones" },
                  { href: "/#formats", label: "Formats" },
                  { href: "/#partenaires", label: "Partenaires" },
                  { href: "/#contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-widest text-primary mb-6">INFORMATIONS</h3>
              <ul className="space-y-3">
                {infoLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs tracking-widest text-primary mb-6">CONTACT</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="mailto:contact@node51.io"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    contact@node51.io
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.node51.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    www.node51.io
                  </a>
                </li>
                <li>
                  <a href="tel:+33783821150" className="text-muted-foreground hover:text-foreground transition-colors">
                    France : +33 7 83 82 11 50
                  </a>
                </li>
                <li>
                  <a href="tel:+221772880336" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sénégal : +221 77 2 88 03 36
                  </a>
                </li>
                <li className="text-muted-foreground">Dakar, Sénégal</li>
              </ul>

              <div className="mt-8 p-4 bg-white/5 border-l-2 border-primary">
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">DATES</span>
                <p className="text-foreground font-black">23 FÉV 2027</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted-foreground">© {currentYear} NODE 51. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8 font-mono text-xs text-muted-foreground">
            <Link href="/mentions-legales" className="hover:text-foreground transition-colors">
              MENTIONS LÉGALES
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground transition-colors">
              CONFIDENTIALITÉ
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive hover text (desktop) */}
      <div className="relative hidden lg:flex h-[24rem] -mt-24 -mb-24 items-center justify-center overflow-hidden">
        <TextHoverEffect text="NODE 51" />
      </div>

      {/* Static wordmark (mobile) */}
      <div className="lg:hidden relative overflow-hidden py-8 bg-background">
        <div className="flex whitespace-nowrap">
          <span className="text-[15vw] font-black text-foreground/[0.03] leading-none tracking-tighter">
            NODE 51 • DAKAR 2027 • SOUVERAINETÉ TECH •
          </span>
        </div>
      </div>
    </footer>
  )
}

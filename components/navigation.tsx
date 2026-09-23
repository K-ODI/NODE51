"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const mainLinks = [
    { href: isHome ? "#vision" : "/#vision", label: "VISION" },
    { href: isHome ? "#zones" : "/#zones", label: "ZONES" },
    { href: isHome ? "#formats" : "/#formats", label: "FORMATS" },
    { href: isHome ? "#partenaires" : "/#partenaires", label: "PARTENAIRES" },
  ]

  const infoLinks = [
    { href: "/programme", label: "PROGRAMME" },
    { href: "/speakers", label: "SPEAKERS" },
    { href: "/presse", label: "PRESSE" },
    { href: "/faq", label: "FAQ" },
    { href: "/accessibilite", label: "ACCESSIBILITÉ" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || isOpen ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"}`}
      >
        <div className="flex items-center justify-between px-6 lg:px-12 h-20">
          <Link href="/" className="flex items-center group" aria-label="NODE 51 — Accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/node51-logo.png"
              alt="NODE 51"
              className="h-8 lg:h-9 w-auto group-hover:opacity-90 transition-opacity"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                {link.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setInfoOpen(true)}
              onMouseLeave={() => setInfoOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setInfoOpen(false)
              }}
            >
              <button
                className="px-4 py-2 text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-2"
                onClick={() => setInfoOpen((v) => !v)}
                aria-expanded={infoOpen}
                aria-haspopup="true"
              >
                INFOS
                <svg
                  className={`w-3 h-3 transition-transform ${infoOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {infoOpen && (
                <div className="absolute top-full left-0 mt-0 bg-card border border-border min-w-[180px]">
                  {infoLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground hover:bg-secondary transition-all border-b border-border last:border-b-0"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={isHome ? "#partenaires" : "/#partenaires"}
              className="ml-4 px-6 py-3 bg-primary text-primary-foreground text-xs font-mono tracking-wider hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,172,152,0.35)] active:translate-y-0 transition-all duration-300"
            >
              DEVENIR PARTENAIRE
            </Link>
          </div>

          <button
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 group relative z-[60]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-background z-[55] overflow-y-auto">
          <div className="flex items-center justify-between px-6 h-20 border-b border-border">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center" aria-label="NODE 51 — Accueil">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/node51-logo.png" alt="NODE 51" className="h-8 w-auto" />
            </Link>

            <button
              className="w-12 h-12 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le menu"
            >
              <svg
                className="w-8 h-8 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="square" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col p-6 gap-2">
            {mainLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-4 border-b border-border text-2xl font-black tracking-tight text-foreground hover:text-primary transition-colors flex items-center justify-between group"
              >
                {link.label}
                <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
              </Link>
            ))}

            <div className="py-4 border-b border-border">
              <span className="text-sm font-mono text-primary tracking-widest">INFORMATIONS</span>
            </div>
            {infoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 pl-4 border-b border-border text-lg font-bold tracking-tight text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={isHome ? "#partenaires" : "/#partenaires"}
              onClick={() => setIsOpen(false)}
              className="mt-8 py-4 bg-primary text-primary-foreground text-center font-mono text-sm tracking-wider"
            >
              DEVENIR PARTENAIRE
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

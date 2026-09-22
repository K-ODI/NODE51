"use client"

import type React from "react"
import { useState } from "react"
import { Reveal } from "@/components/ui/reveal"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Une erreur est survenue. Réessaie.")
      }
      setStatus("success")
      setFormData({ name: "", email: "", company: "", interest: "", message: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue. Réessaie.")
    }
  }

  const interests = [
    { value: "partner", label: "Partenariat" },
    { value: "speaker", label: "Speaker" },
    { value: "exhibitor", label: "Exposant" },
    { value: "visitor", label: "Visiteur" },
    { value: "media", label: "Média" },
  ]

  return (
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="px-6 lg:px-12">
        {/* Section label */}
        <Reveal className="flex items-center gap-4 mb-10 lg:mb-16">
          <span className="font-mono text-sm lg:text-base tracking-widest text-muted-foreground">06</span>
          <div className="w-12 h-px bg-primary" />
          <span className="font-mono text-sm lg:text-base tracking-widest text-primary">CONTACT</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left side - CTA */}
          <div>
            <h2 className="text-3xl lg:text-7xl font-black text-foreground mb-4">
              REJOIGNEZ LE
              <br />
              <span className="text-stroke text-primary">MOUVEMENT</span>
            </h2>

            <p className="text-base lg:text-lg text-muted-foreground mb-8 max-w-md">
              NODE 51 n'est pas qu'un événement : c'est le catalyseur d'une transformation historique. Écrivons ensemble
              une page de l'histoire de l'innovation africaine.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary-foreground">@</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">EMAIL</span>
                  <p className="text-foreground font-medium text-sm lg:text-base">contact@node51.io</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary-foreground">
                    WEB
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">SITE WEB</span>
                  <p className="text-foreground font-medium text-sm lg:text-base">www.node51.io</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary-foreground">
                    TEL
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">TÉLÉPHONE</span>
                  <a
                    href="tel:+33783821150"
                    className="block text-foreground font-medium text-sm lg:text-base hover:text-primary transition-colors"
                  >
                    France : +33 7 83 82 11 50
                  </a>
                  <a
                    href="tel:+221772880336"
                    className="block text-foreground font-medium text-sm lg:text-base hover:text-primary transition-colors"
                  >
                    Sénégal : +221 77 2 88 03 36
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-primary-foreground">
                    LOC
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground">LIEU</span>
                  <p className="text-foreground font-medium text-sm lg:text-base">Dakar, Sénégal</p>
                  <p className="text-sm text-muted-foreground">23 Février 2027</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-primary/20" />
            <form onSubmit={handleSubmit} className="relative bg-background border border-border p-6 lg:p-10">
              <div className="space-y-5">
                {/* Name & Email row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all font-mono text-xs tracking-widest ${
                        focused === "name" || formData.name ? "-top-5 text-primary" : "top-3 text-muted-foreground"
                      }`}
                    >
                      NOM
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <label
                      className={`absolute left-0 transition-all font-mono text-xs tracking-widest ${
                        focused === "email" || formData.email ? "-top-5 text-primary" : "top-3 text-muted-foreground"
                      }`}
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="relative">
                  <label
                    className={`absolute left-0 transition-all font-mono text-xs tracking-widest ${
                      focused === "company" || formData.company ? "-top-5 text-primary" : "top-3 text-muted-foreground"
                    }`}
                  >
                    ENTREPRISE
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Interest selector */}
                <div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground mb-3 block">
                    JE SUIS INTÉRESSÉ PAR
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, interest: interest.value })}
                        className={`px-4 py-2 text-sm transition-colors ${
                          formData.interest === interest.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {interest.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    className={`absolute left-0 transition-all font-mono text-xs tracking-widest ${
                      focused === "message" || formData.message ? "-top-5 text-primary" : "top-3 text-muted-foreground"
                    }`}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-primary-foreground py-3 lg:py-4 font-mono text-sm tracking-wider hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "ENVOI…" : "ENVOYER"}
                  {status !== "loading" && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                </button>

                {/* Status message */}
                {status === "success" && (
                  <p className="font-mono text-sm text-primary" role="status">
                    ✓ Message envoyé. Nous te répondrons rapidement.
                  </p>
                )}
                {status === "error" && (
                  <p className="font-mono text-sm text-destructive" role="alert">
                    {errorMsg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

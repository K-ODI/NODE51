"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PartnerModalProps {
  tier: string | null
  onClose: () => void
}

export function PartnerModal({ tier, onClose }: PartnerModalProps) {
  const open = tier !== null
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  // Reset state each time a new tier opens; lock body scroll; close on Escape.
  useEffect(() => {
    if (!open) return
    setForm({ name: "", email: "", company: "", message: "" })
    setStatus("idle")
    setErrorMsg("")
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open, tier, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tier: tier ?? "" }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Une erreur est survenue.")
      }
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Devenir partenaire ${tier ?? ""}`}
            className="relative z-10 w-full max-w-lg bg-card border border-primary/30 p-6 lg:p-8 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="square" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="text-4xl mb-4 text-primary">✓</div>
                <h3 className="text-2xl font-display font-black text-foreground mb-2">Demande envoyée</h3>
                <p className="text-muted-foreground mb-6">
                  Merci ! Notre équipe partenariats te recontacte rapidement au sujet de l'offre{" "}
                  <span className="text-primary font-bold">{tier}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="font-mono text-xs tracking-widest bg-primary text-primary-foreground px-6 py-3 hover:bg-primary/90 transition-colors"
                >
                  FERMER
                </button>
              </div>
            ) : (
              <>
                <span className="font-mono text-xs tracking-widest text-primary">PARTENARIAT</span>
                <h3 className="text-2xl lg:text-3xl font-display font-black text-foreground mt-1 mb-1">
                  Devenir partenaire{" "}
                  {tier && <span className="text-primary">{tier}</span>}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Laisse-nous tes coordonnées, on revient vers toi avec une proposition adaptée.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Nom complet *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email professionnel *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Entreprise / Organisation"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                  <textarea
                    rows={3}
                    placeholder="Message (optionnel)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "ENVOI…" : "ENVOYER MA DEMANDE"}
                  </button>

                  {status === "error" && (
                    <p className="font-mono text-sm text-destructive" role="alert">
                      {errorMsg}
                    </p>
                  )}
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

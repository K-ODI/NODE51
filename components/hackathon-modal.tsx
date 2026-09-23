"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Étapes du cycle — ordre identique au calendrier de la section Innovation Tour.
export const HACKATHON_OPTIONS = [
  "26 Oct. 2026 — Dakar, Sénégal",
  "28 Oct. 2026 — Kaolack, Sénégal",
  "Nov. 2026 — Maroc (en ligne)",
  "Nov. 2026 — Bénin (en ligne)",
  "Déc. 2026 — Côte d'Ivoire (en ligne)",
  "Déc. 2026 — Belgique (en ligne)",
  "Jan. 2027 — Suisse (en ligne)",
  "23 Fév. 2027 — Grande Finale, Dakar",
]

const PROFILES = ["Développeur", "Designer", "Entrepreneur", "Étudiant", "Autre"]

const INPUT =
  "w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"

interface Props {
  hackathon: string | null
  onClose: () => void
}

export function HackathonModal({ hackathon, onClose }: Props) {
  const open = hackathon !== null
  const [form, setForm] = useState({ hackathon: "", name: "", email: "", team_name: "", profile: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    if (!open) return
    setForm({ hackathon: hackathon ?? "", name: "", email: "", team_name: "", profile: "", message: "" })
    setStatus("idle")
    setErrorMsg("")
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [open, hackathon, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/hackathon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Inscription Hackathon NODE51"
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
                <h3 className="text-2xl font-display font-black text-foreground mb-2">Inscription envoyée</h3>
                <p className="text-muted-foreground mb-6">
                  Merci ! On te recontacte rapidement avec les détails de l'étape{" "}
                  <span className="text-primary font-bold">{form.hackathon}</span>.
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
                <span className="font-mono text-xs tracking-widest text-primary">INNOVATION TOUR</span>
                <h3 className="text-2xl lg:text-3xl font-display font-black text-foreground mt-1 mb-1">
                  Inscription Hackathon
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Choisis l'étape et laisse-nous tes coordonnées. Participation individuelle ou en équipe.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-muted-foreground">HACKATHON & VILLE *</label>
                    <select
                      required
                      value={form.hackathon}
                      onChange={(e) => setForm({ ...form, hackathon: e.target.value })}
                      className={`${INPUT} mt-1`}
                    >
                      <option value="" disabled>
                        Sélectionne une étape…
                      </option>
                      {HACKATHON_OPTIONS.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Nom complet *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={INPUT}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={INPUT}
                  />
                  <input
                    type="text"
                    placeholder="Nom de l'équipe (optionnel)"
                    value={form.team_name}
                    onChange={(e) => setForm({ ...form, team_name: e.target.value })}
                    className={INPUT}
                  />
                  <select
                    value={form.profile}
                    onChange={(e) => setForm({ ...form, profile: e.target.value })}
                    className={INPUT}
                  >
                    <option value="">Profil (optionnel)…</option>
                    {PROFILES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <textarea
                    rows={3}
                    placeholder="Message (optionnel)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${INPUT} resize-none`}
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary text-primary-foreground py-3 font-mono text-sm tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "ENVOI…" : "S'INSCRIRE"}
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

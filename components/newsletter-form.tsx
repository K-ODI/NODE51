"use client"

import { useState } from "react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || "Une erreur est survenue.")
      }
      setStatus("success")
      setMessage("✓ Merci, tu es inscrit·e.")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Une erreur est survenue.")
    }
  }

  return (
    <div>
      <h4 className="font-mono text-[10px] tracking-widest text-primary mb-3">NEWSLETTER</h4>
      <form onSubmit={handleSubmit} className="flex items-center border-b border-border focus-within:border-primary transition-colors">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          aria-label="Adresse email"
          className="flex-1 min-w-0 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="S'inscrire à la newsletter"
          className="ml-2 shrink-0 font-mono text-xs tracking-wider text-primary hover:text-foreground transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "…" : "S'INSCRIRE →"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 font-mono text-xs ${status === "error" ? "text-destructive" : "text-primary"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </div>
  )
}

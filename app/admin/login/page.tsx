"use client"

import { useActionState } from "react"
import { login } from "./actions"

const INPUT =
  "w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null)

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-primary flex items-center justify-center font-display font-black text-primary-foreground">
            51
          </div>
          <div className="leading-none">
            <div className="font-display font-black text-sm">NODE 51</div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-widest mt-1">ADMIN</div>
          </div>
        </div>

        <h1 className="text-2xl font-display font-black mb-6">Connexion</h1>

        <form action={action} className="space-y-3">
          <input name="username" required autoFocus placeholder="Identifiant" className={INPUT} autoComplete="username" />
          <input
            name="password"
            type="password"
            required
            placeholder="Mot de passe"
            className={INPUT}
            autoComplete="current-password"
          />
          {state?.error && <p className="text-sm text-destructive font-mono">{state.error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full font-mono text-[11px] tracking-widest px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {pending ? "CONNEXION…" : "SE CONNECTER"}
          </button>
        </form>
      </div>
    </main>
  )
}

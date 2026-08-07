import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyPassword } from "@/lib/admin-auth"

// Basic Auth pour /admin. Deux sources d'identifiants :
//  1. env ADMIN_USER/ADMIN_PASSWORD — bootstrap, sert à créer le premier compte.
//  2. table admin_users (gérée depuis le back-office) — hash PBKDF2.
// Fail-closed : rien de valide -> 401.
// Déconnexion Basic Auth : renvoyer 401 à une requête qui porte les identifiants
// fait oublier au navigateur le couple en cache. Pas de WWW-Authenticate ->
// pas de re-prompt, on affiche simplement la page « Déconnecté ».
const LOGOUT_HTML = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Déconnecté</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a0a0a;color:#e5e5e5;font-family:ui-sans-serif,system-ui,sans-serif}
.b{text-align:center}.b h1{font-weight:800}.b a{display:inline-block;margin-top:1rem;color:#22c55e;text-decoration:none;font-family:ui-monospace,monospace;font-size:.9rem}</style>
</head><body><div class="b"><h1>Déconnecté</h1><p>Ta session admin a été fermée.</p>
<a href="/admin">← Se reconnecter</a></div></body></html>`

export async function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/logout") {
    return new NextResponse(LOGOUT_HTML, {
      status: 401,
      headers: { "content-type": "text/html; charset=utf-8" },
    })
  }

  const header = req.headers.get("authorization")
  if (header?.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6))
      const i = decoded.indexOf(":")
      const user = decoded.slice(0, i)
      const pass = decoded.slice(i + 1)
      if (user && (await isValid(user, pass))) return NextResponse.next()
    } catch {
      // décodage invalide -> 401 ci-dessous
    }
  }

  return new NextResponse("Authentification requise.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="NODE 51 Admin", charset="UTF-8"' },
  })
}

async function isValid(user: string, pass: string): Promise<boolean> {
  // 1. Bootstrap via env
  const envUser = process.env.ADMIN_USER || "admin"
  const envPass = process.env.ADMIN_PASSWORD
  if (envPass && user === envUser && pass === envPass) return true

  // 2. Utilisateurs en base (service_role bypass la RLS)
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return false
  // ponytail: 1 requête Supabase par accès /admin. OK pour un back-office peu sollicité ;
  // cacher (KV/edge) si le trafic admin explose.
  const res = await fetch(
    `${url}/rest/v1/admin_users?select=pw&username=eq.${encodeURIComponent(user)}`,
    { headers: { apikey: key, authorization: `Bearer ${key}` }, cache: "no-store" },
  )
  if (!res.ok) return false
  const rows = (await res.json()) as { pw: string }[]
  if (!rows[0]?.pw) return false
  return verifyPassword(pass, rows[0].pw)
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

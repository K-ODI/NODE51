import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "@/lib/admin-auth"

// Auth /admin par session : cookie signé (posé par /admin/login).
// Le middleware ne fait qu'une vérif de signature — aucun appel DB par requête.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Déconnexion : on vide le cookie et on renvoie vers le login.
  if (pathname === "/admin/logout") {
    const res = NextResponse.redirect(new URL("/admin/login", req.url))
    res.cookies.set("admin_session", "", { path: "/admin", maxAge: 0 })
    return res
  }

  // Page de login : accessible sans session.
  if (pathname === "/admin/login") return NextResponse.next()

  if (await verifySession(req.cookies.get("admin_session")?.value)) return NextResponse.next()

  const url = new URL("/admin/login", req.url)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

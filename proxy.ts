import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Basic Auth pour /admin. Fail-closed : sans ADMIN_PASSWORD, l'accès est refusé.
export function proxy(req: NextRequest) {
  const expectedUser = process.env.ADMIN_USER || "admin"
  const expectedPass = process.env.ADMIN_PASSWORD

  if (expectedPass) {
    const header = req.headers.get("authorization")
    if (header?.startsWith("Basic ")) {
      try {
        const [user, pass] = atob(header.slice(6)).split(":")
        if (user === expectedUser && pass === expectedPass) {
          return NextResponse.next()
        }
      } catch {
        // décodage invalide -> tombe sur le 401 ci-dessous
      }
    }
  }

  return new NextResponse("Authentification requise.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="NODE 51 Admin", charset="UTF-8"' },
  })
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}

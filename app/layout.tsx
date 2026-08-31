import type React from "react"
import type { Metadata } from "next"
import { Sora, Inter } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { MotionProvider } from "@/components/motion-provider"
import "./globals.css"

// Display / headings
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})
// Body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
// Monospace labels — self-hosted (Fontsource Space Mono, subset latin)
const spaceMono = localFont({
  src: [
    { path: "./fonts/space-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-mono-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/space-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "./fonts/space-mono-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NODE 51 | Dakar 2027",
  description:
    "African Tech, Innovation & Sovereignty Day. 23 Février 2027, Dakar, Sénégal. Le catalyseur de la transformation technologique africaine.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className={`font-sans antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}

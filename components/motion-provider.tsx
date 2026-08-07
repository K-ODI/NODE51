"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

// Global animation settings. reducedMotion="user" makes framer-motion skip
// transform-based motion (only opacity animates) whenever the visitor has
// "prefers-reduced-motion" enabled — mirrors the CSS guard in globals.css.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

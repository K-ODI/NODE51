"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds */
  delay?: number
  /** Vertical travel in px (default 24) */
  y?: number
}

// Scroll-triggered reveal: subtle fade + slide-up, fires once when the element
// enters the viewport. Sharp easing (no bounce) to fit the brutalist direction.
// Respects prefers-reduced-motion — no transform, content is shown immediately.
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

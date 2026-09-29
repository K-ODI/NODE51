"use client";

/**
 * NODE 51 — Hero background slideshow (Framer Motion)
 * ----------------------------------------------------
 * Drop-in background for the hero section of node51.io.
 *
 * Install:  npm i framer-motion
 * Assets:   copy /public/slides/*.webp into your Next.js /public/slides folder
 * Fonts:    add Big Shoulders Display, Hanken Grotesk and IBM Plex Mono
 *           (next/font/google) or keep the fallbacks below.
 *
 * Usage:
 *   <section className="relative h-[100svh] overflow-hidden">
 *     <Node51HeroSlideshow />
 *     ...your nav / CTAs on top (z-10+)
 *   </section>
 *
 * Behaviour:
 *   - 5 slides, 7s each, crossfade + slow Ken Burns on the portrait
 *   - background colour morphs to match each photo's studio teal
 *   - headline revealed word-by-word, cyan rim-light "halo" breathes behind the subject
 *   - pauses on hover / when the tab is hidden, arrow keys navigate
 *   - respects prefers-reduced-motion (no zoom, no stagger, plain fade)
 */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Slide = {
  id: string;
  src: string;
  eyebrow: string;
  title: string[]; // one entry per line
  accentLine: number; // index of the line painted in cyan
  body: string;
  stat?: { value: string; label: string };
  bg: string; // matches the photo's studio backdrop
  focus: string; // object-position for the portrait
};

export const SLIDES: Slide[] = [
  {
    id: "mouvement",
    src: "/slides/mouvement.webp",
    eyebrow: "Rejoignez le mouvement",
    title: ["Écrivons", "l'histoire", "ensemble"],
    accentLine: 1,
    body: "NODE 51 n'est pas qu'un événement : c'est le catalyseur d'une transformation historique.",
    stat: { value: "23.02.27", label: "Dakar, Sénégal" },
    bg: "#0c3042",
    focus: "40% 30%",
  },
  {
    id: "excellence",
    src: "/slides/excellence.webp",
    eyebrow: "II · Excellence continentale",
    title: ["Le hub", "d'innovation", "du monde"],
    accentLine: 1,
    body: "Positionner l'Afrique comme hub d'innovation reconnu mondialement.",
    bg: "#013640",
    focus: "72% 30%",
  },
  {
    id: "souverainete",
    src: "/slides/souverainete.webp",
    eyebrow: "I · Souveraineté numérique",
    title: ["Notre", "infrastructure,", "nos règles"],
    accentLine: 1,
    body: "Construire une infrastructure technologique africaine indépendante et résiliente.",
    bg: "#1d4c5c",
    focus: "80% 40%",
  },
  {
    id: "talents",
    src: "/slides/talents.webp",
    eyebrow: "III · Impact mesurable",
    title: ["Des idées", "aux résultats", "concrets"],
    accentLine: 2,
    body: "Transformer les idées en actions concrètes, avec des résultats quantifiables.",
    stat: { value: "1M", label: "talents à former" },
    bg: "#094654",
    focus: "85% 40%",
  },
  {
    id: "vision",
    src: "/slides/vision.webp",
    eyebrow: "Vision · Dakar 2027",
    title: ["Producteur", "global de", "technologies"],
    accentLine: 0,
    body: "Faire de l'Afrique un producteur global de technologies, et plus qu'un simple consommateur.",
    bg: "#043846",
    focus: "45% 35%",
  },
];

const DURATION = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

const FONT_DISPLAY = '"Big Shoulders Display", "Oswald", "Arial Narrow", sans-serif';
const FONT_BODY = '"Hanken Grotesk", "Helvetica Neue", Arial, sans-serif';
const FONT_MONO = '"IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace';
const CYAN = "#3fe6da";

export default function Node51HeroSlideshow({
  slides = SLIDES,
  interval = DURATION,
  showCopy = true,
}: {
  slides?: Slide[];
  interval?: number;
  /** set false to use it as a pure image background behind your own hero copy */
  showCopy?: boolean;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + slides.length) % slides.length),
    [slides.length]
  );

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), interval);
    return () => clearTimeout(t);
  }, [index, paused, interval, go]);

  // pause when the tab is hidden, arrows navigate
  useEffect(() => {
    const vis = () => setPaused(document.hidden);
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("visibilitychange", vis);
    window.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("visibilitychange", vis);
      window.removeEventListener("keydown", key);
    };
  }, [go]);

  // preload
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [slides]);

  return (
    <motion.div
      aria-roledescription="carousel"
      aria-label="NODE 51 — messages"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      animate={{ backgroundColor: slide.bg }}
      transition={{ duration: 1.4, ease: EASE }}
      style={{ position: "absolute", inset: 0, overflow: "hidden", isolation: "isolate", color: "#eef7f6" }}
    >
      {/* ——— ambient layer: slow drifting cyan light + grain ——— */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: ["-6%", "4%", "-6%"], y: ["0%", "-5%", "0%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-20%",
          background: `radial-gradient(40% 35% at 70% 40%, ${CYAN}22, transparent 70%),
                       radial-gradient(30% 30% at 15% 85%, #00000066, transparent 70%)`,
          zIndex: 0,
        }}
      />

      {/* ——— portrait ——— */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="n51-portrait"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.4 : 1.4, ease: EASE }}
          style={{ position: "absolute", top: 0, bottom: 0, right: 0, zIndex: 1 }}
        >
          <motion.img
            src={slide.src}
            alt=""
            initial={reduce ? false : { scale: 1.12, x: 30 }}
            animate={{ scale: 1.02, x: 0 }}
            transition={{ duration: interval / 1000 + 1.5, ease: "linear" }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: slide.focus,
              display: "block",
            }}
          />
          {/* halo that breathes like the cyan rim-light in the photos */}
          <motion.div
            aria-hidden
            animate={reduce ? { opacity: 0.35 } : { opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              mixBlendMode: "screen",
              background: `radial-gradient(45% 40% at 60% 35%, ${CYAN}33, transparent 70%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* scrim that melts the photo into the page colour */}
      <motion.div
        aria-hidden
        className="n51-scrim"
        animate={{ ["--bg" as string]: slide.bg }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      />

      {/* ——— copy ——— */}
      {showCopy && (
        <div className="n51-copy" style={{ position: "absolute", zIndex: 3 }}>
          <AnimatePresence mode="wait">
            <motion.div key={slide.id} exit={{ opacity: 0, y: -16, transition: { duration: 0.45 } }}>
              <motion.p
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: CYAN,
                  margin: "0 0 1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  style={{ width: 36, height: 1, background: CYAN, transformOrigin: "left", display: "inline-block" }}
                />
                {slide.eyebrow}
              </motion.p>

              <h2
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  fontSize: "clamp(2.6rem, 6.4vw, 6.2rem)",
                  lineHeight: 0.88,
                  letterSpacing: "-0.01em",
                  margin: 0,
                }}
              >
                {slide.title.map((line, li) => (
                  <span key={li} style={{ display: "block", clipPath: "inset(-60% -60% 0 -60%)", paddingBottom: "0.06em" }}>
                    <motion.span
                      initial={reduce ? { opacity: 0 } : { y: "105%" }}
                      animate={reduce ? { opacity: 1 } : { y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.15 + li * 0.11, ease: EASE }}
                      style={{
                        display: "block",
                        color: li === slide.accentLine ? "transparent" : "inherit",
                        WebkitTextStroke: li === slide.accentLine ? `1.5px ${CYAN}` : undefined,
                        textShadow: li === slide.accentLine ? `0 0 28px ${CYAN}55` : undefined,
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: "clamp(1rem, 1.25vw, 1.2rem)",
                  lineHeight: 1.55,
                  maxWidth: "34ch",
                  margin: "1.6rem 0 0",
                  color: "#cfe3e1",
                }}
              >
                {slide.body}
              </motion.p>

              {slide.stat && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
                  style={{ marginTop: "1.6rem", display: "flex", alignItems: "baseline", gap: "0.8rem" }}
                >
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: "2.6rem", color: CYAN, lineHeight: 1 }}>
                    {slide.stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#9fbfbc",
                    }}
                  >
                    {slide.stat.label}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ——— progress rail ——— */}
      <nav className="n51-rail" aria-label="Choisir un message" style={{ position: "absolute", zIndex: 4 }}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            aria-label={`Message ${i + 1} : ${s.eyebrow}`}
            aria-current={i === index}
            className="n51-dot"
          >
            <span className="n51-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="n51-track">
              {i === index && (
                <motion.span
                  key={`${s.id}-${paused}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: paused ? 0.2 : interval / 1000, ease: "linear" }}
                  className="n51-fill"
                />
              )}
              {i < index && <span className="n51-fill" style={{ transform: "scaleX(1)", opacity: 0.35 }} />}
            </span>
          </button>
        ))}
      </nav>

      <style>{CSS}</style>
    </motion.div>
  );
}

const CSS = `
.n51-portrait{ width:min(62%, 980px); }
.n51-scrim{
  --bg:#043846;
  background:
    linear-gradient(90deg, var(--bg) 30%, color-mix(in srgb, var(--bg) 70%, transparent) 46%, transparent 68%),
    linear-gradient(0deg, color-mix(in srgb, var(--bg) 85%, transparent) 0%, transparent 28%);
}
.n51-copy{ left:clamp(16px, 6vw, 96px); bottom:clamp(96px, 16vh, 180px); max-width:min(640px, 88vw); }
.n51-rail{ left:clamp(16px, 6vw, 96px); right:clamp(16px, 6vw, 96px); bottom:clamp(28px, 5vh, 56px);
  display:flex; gap:12px; }
.n51-dot{ flex:1; max-width:140px; background:none; border:0; padding:8px 0; cursor:pointer; text-align:left;
  display:flex; flex-direction:column; gap:8px; color:#9fbfbc; font:500 11px/1 ${FONT_MONO}; letter-spacing:.14em; }
.n51-dot[aria-current="true"]{ color:#eef7f6; }
.n51-dot:focus-visible{ outline:1px solid ${CYAN}; outline-offset:4px; }
.n51-track{ position:relative; display:block; height:2px; background:rgba(238,247,246,.18); overflow:hidden; }
.n51-fill{ position:absolute; inset:0; background:${CYAN}; transform-origin:left; display:block; }
@media (max-width: 760px){
  .n51-portrait{ width:100%; }
  .n51-scrim{ background:
    linear-gradient(0deg, var(--bg) 18%, color-mix(in srgb, var(--bg) 75%, transparent) 45%, transparent 70%); }
  .n51-copy{ bottom:92px; }
  .n51-num{ display:none; }
}
`;

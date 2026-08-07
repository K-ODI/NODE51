"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const HERO_IMAGE = "/node51-hero.jpg"

// Flowing green shader, tuned to the neutral/emerald theme (no navy/cyan).
const FRAG = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
varying vec2 v_texCoord;
void main() {
  vec2 uv = v_texCoord;
  vec2 center = uv - 0.5;
  center.x *= u_resolution.x / u_resolution.y;
  float time = u_time * 0.3;
  float pattern = 0.0;
  for (float i = 1.0; i < 4.0; i++) {
    pattern += sin(center.x * 3.0 * i + time) * cos(center.y * 2.0 * i - time * 0.5);
  }
  vec3 color1 = vec3(0.035, 0.035, 0.043); // #09090b background
  vec3 color2 = vec3(0.290, 0.871, 0.502); // #4ade80 primary green
  vec3 color3 = vec3(0.050, 1.000, 0.550); // vibrant green accent
  float mask = smoothstep(-1.0, 1.0, pattern);
  vec3 finalColor = mix(color1, color2, mask * 0.28);
  finalColor = mix(finalColor, color3, pow(mask, 3.0) * 0.10);
  float dist = length(center);
  finalColor *= smoothstep(1.5, 0.2, dist);
  float glow = 0.05 / (dist + 0.1);
  finalColor += color2 * glow * 0.18;
  gl_FragColor = vec4(finalColor, 1.0);
}`

const VERT = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

export function LandingHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null
    if (!gl) return

    const syncSize = () => {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }
    syncSize()

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes = gl.getUniformLocation(prog, "u_resolution")

    const draw = (t: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, t * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncSize) : null
    ro?.observe(canvas)

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    if (reduce) {
      draw(0)
    } else {
      const loop = (t: number) => {
        draw(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background">
      {/* WebGL animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/80 via-transparent to-background pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-5 md:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="flex flex-col items-start">
          <div className="inline-block px-3 py-1 border border-primary/30 bg-primary/10 rounded-full mb-8">
            <span className="font-mono text-primary text-xs tracking-widest">DAKAR 2027</span>
          </div>

          <h1 className="animate-fade-up text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-none mb-6 tracking-tight max-w-4xl">
            L'ÉLITE TECH
            <br />
            <span className="text-transparent [-webkit-text-stroke:1px_var(--primary)]">AFRICAINE</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            African Tech, Innovation &amp; Sovereignty Week. Le catalyseur de la transformation technologique africaine,
            réunissant les leaders mondiaux pour façonner l'avenir du continent.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link
              href="#vision"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform duration-300 font-mono text-sm tracking-widest px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(74,222,128,0.3)]"
            >
              DÉCOUVRIR L'ÉVÉNEMENT
            </Link>
            <Link
              href="#partenaires"
              className="border border-primary/30 text-primary hover:bg-primary/10 hover:scale-105 transition-transform duration-300 font-mono text-sm tracking-widest px-8 py-4 rounded-lg"
            >
              DEVENIR PARTENAIRE
            </Link>
          </div>
        </div>

        {/* Floating framed image */}
        <div className="hidden lg:flex justify-end items-center relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full z-0 animate-float opacity-50" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="NODE 51 — élite tech africaine"
            className="relative z-10 w-full max-w-lg object-contain animate-float rounded-2xl shadow-2xl border border-white/10"
            src={HERO_IMAGE}
            loading="eager"
          />
        </div>
      </div>

      {/* Scroll cue */}
      <Link
        href="#vision"
        aria-label="Défiler vers le contenu"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-primary/60 hover:text-primary transition-colors animate-bounce z-20"
      >
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="square" d="M6 9l6 6 6-6" />
          <path strokeLinecap="square" d="M6 4l6 6 6-6" opacity="0.5" />
        </svg>
      </Link>
    </section>
  )
}

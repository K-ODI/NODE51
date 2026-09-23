"use client"

import { useState, Fragment } from "react"
import {
  LayoutDashboard,
  Handshake,
  MessageSquare,
  Mail,
  Mic,
  Newspaper,
  AtSign,
  CalendarDays,
  Trash2,
  Plus,
  Pencil,
  X,
  Users,
  LogOut,
  Code2,
  type LucideIcon,
} from "lucide-react"
import {
  addAdminUser,
  deleteAdminUser,
  addSpeaker,
  updateSpeaker,
  toggleSpeakerPublished,
  deleteSpeaker,
  addPressRelease,
  togglePressPublished,
  deletePressRelease,
  addMediaContact,
  deleteMediaContact,
  addSession,
  updateSession,
  toggleSessionPublished,
  deleteSession,
} from "@/app/admin/actions"

const CATEGORIES = ["IA & DATA", "BLOCKCHAIN", "GREENTECH", "WOMEN IN TECH", "QUANTUM & IoT"]

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : ""
const fmtDate = (d: string | null) => (d ? new Date(d).toLocaleDateString("fr-FR") : "")

export interface AdminData {
  contacts: Record<string, string | null>[]
  subs: Record<string, string | null>[]
  partners: Record<string, string | null>[]
  speakers: Record<string, string | boolean | null>[]
  press: Record<string, string | boolean | null>[]
  media: Record<string, string | null>[]
  sessions: (Record<string, string | boolean | null> & { speakers?: { name: string } | null })[]
  admins: Record<string, string | null>[]
  hackathon: Record<string, string | null>[]
}

const INPUT =
  "bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
const BTN_ADD =
  "inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
const TH = "px-4 py-3 font-mono text-[11px] tracking-widest text-muted-foreground uppercase whitespace-nowrap text-left"
const TD = "px-4 py-3 text-foreground/90 align-top whitespace-pre-wrap max-w-xs break-words"

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-card border border-border rounded-2xl ${className}`}>{children}</div>
}

function DataTable({ columns, rows }: { columns: string[]; rows: (string | null)[][] }) {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground px-1 py-8">Aucune entrée.</p>
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/40 border-b border-border">
              {columns.map((c) => (
                <th key={c} className={TH}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-secondary/20 transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className={TD}>
                    {cell || <span className="text-muted-foreground">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function KpiCard({ label, value, Icon }: { label: string; value: number; Icon: LucideIcon }) {
  return (
    <div className="group relative overflow-hidden bg-card border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors">
      <div
        className="pointer-events-none absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="text-3xl font-display font-black text-foreground tabular-nums">{value}</div>
      <div className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mt-1">{label}</div>
    </div>
  )
}

function SectionTitle({ children, count }: { children: string; count?: number }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-2xl font-display font-black text-foreground">{children}</h2>
      {count !== undefined && <span className="font-mono text-sm text-primary">{count}</span>}
    </div>
  )
}

const pill = (published: boolean | string | null) =>
  published ? (
    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-mono bg-primary/15 text-primary">Publié</span>
  ) : (
    <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-mono bg-secondary text-muted-foreground">
      Brouillon
    </span>
  )

const BTN_ICON =
  "w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary hover:text-primary transition-colors"

export function AdminDashboard({ data }: { data: AdminData }) {
  const [active, setActive] = useState<string>("overview")
  // Ligne en cours d'édition (id uuid, unique toutes tables ; une seule section visible à la fois).
  const [editingId, setEditingId] = useState<string | null>(null)

  const nav: { id: string; label: string; icon: LucideIcon; count?: number }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
    { id: "partners", label: "Partenariats", icon: Handshake, count: data.partners.length },
    { id: "contacts", label: "Contacts", icon: MessageSquare, count: data.contacts.length },
    { id: "newsletter", label: "Newsletter", icon: Mail, count: data.subs.length },
    { id: "hackathon", label: "Hackathon", icon: Code2, count: data.hackathon.length },
    { id: "speakers", label: "Speakers", icon: Mic, count: data.speakers.length },
    { id: "sessions", label: "Programme", icon: CalendarDays, count: data.sessions.length },
    { id: "press", label: "Communiqués", icon: Newspaper, count: data.press.length },
    { id: "media", label: "Contacts presse", icon: AtSign, count: data.media.length },
    { id: "users", label: "Utilisateurs", icon: Users, count: data.admins.length },
  ]

  const kpis: { label: string; value: number; Icon: LucideIcon }[] = [
    { label: "Partenaires", value: data.partners.length, Icon: Handshake },
    { label: "Contacts", value: data.contacts.length, Icon: MessageSquare },
    { label: "Abonnés", value: data.subs.length, Icon: Mail },
    { label: "Hackathon", value: data.hackathon.length, Icon: Code2 },
    { label: "Speakers", value: data.speakers.length, Icon: Mic },
    { label: "Sessions", value: data.sessions.length, Icon: CalendarDays },
    { label: "Communiqués", value: data.press.length, Icon: Newspaper },
  ]

  const recent = [
    ...data.partners.map((p) => ({ type: "Partenariat", label: `${p.name}${p.tier ? ` · ${p.tier}` : ""}`, date: p.created_at })),
    ...data.contacts.map((c) => ({ type: "Contact", label: String(c.name), date: c.created_at })),
    ...data.subs.map((s) => ({ type: "Newsletter", label: String(s.email), date: s.created_at })),
    ...data.hackathon.map((h) => ({ type: "Hackathon", label: `${h.name} · ${h.hackathon}`, date: h.created_at })),
  ]
    .filter((r) => r.date)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, 8)

  const activeLabel = nav.find((n) => n.id === active)?.label ?? ""

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border sticky top-0 h-screen">
        <div className="flex items-center gap-3 px-6 h-20 border-b border-border">
          <div className="w-9 h-9 bg-primary flex items-center justify-center font-display font-black text-primary-foreground">
            51
          </div>
          <div className="leading-none">
            <div className="font-display font-black text-sm">NODE 51</div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-widest mt-1">ADMIN</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const isActive = active === item.id
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== undefined && (
                  <span className={`font-mono text-[11px] ${isActive ? "text-primary" : "text-muted-foreground/70"}`}>
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <a
            href="/admin/logout"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Se déconnecter</span>
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile nav */}
        <div className="lg:hidden flex gap-1 overflow-x-auto p-3 border-b border-border sticky top-0 bg-background/90 backdrop-blur z-20">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`shrink-0 px-3 py-2 rounded-lg text-xs font-mono tracking-wider transition-colors ${
                active === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <a
            href="/admin/logout"
            className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono tracking-wider text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </a>
        </div>

        {/* Topbar */}
        <header className="hidden lg:flex items-center justify-between px-8 h-20 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
          <h1 className="text-xl font-display font-black">{active === "overview" ? "Tableau de bord" : activeLabel}</h1>
          <span className="font-mono text-xs text-muted-foreground">NODE 51 — Dakar 2027</span>
        </header>

        <div className="p-5 lg:p-8">
          {/* ===== Overview ===== */}
          {active === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpis.map((k) => (
                  <KpiCard key={k.label} label={k.label} value={k.value} Icon={k.Icon} />
                ))}
              </div>

              <div>
                <SectionTitle>Activité récente</SectionTitle>
                <Card className="overflow-hidden">
                  {recent.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-6">Aucune activité pour le moment.</p>
                  ) : (
                    <ul>
                      {recent.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 px-5 py-4 border-b border-border/60 last:border-0 hover:bg-secondary/20 transition-colors"
                        >
                          <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded bg-secondary text-muted-foreground shrink-0 w-28 text-center">
                            {r.type}
                          </span>
                          <span className="flex-1 text-sm text-foreground truncate">{r.label}</span>
                          <span className="font-mono text-xs text-muted-foreground shrink-0">{fmt(r.date)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            </div>
          )}

          {/* ===== Partenariats ===== */}
          {active === "partners" && (
            <div>
              <SectionTitle count={data.partners.length}>Partenariats</SectionTitle>
              <DataTable
                columns={["Date", "Offre", "Nom", "Email", "Entreprise", "Message"]}
                rows={data.partners.map((r) => [fmt(r.created_at), r.tier, r.name, r.email, r.company, r.message])}
              />
            </div>
          )}

          {/* ===== Contacts ===== */}
          {active === "contacts" && (
            <div>
              <SectionTitle count={data.contacts.length}>Contacts</SectionTitle>
              <DataTable
                columns={["Date", "Nom", "Email", "Entreprise", "Intérêt", "Message"]}
                rows={data.contacts.map((r) => [fmt(r.created_at), r.name, r.email, r.company, r.interest, r.message])}
              />
            </div>
          )}

          {/* ===== Newsletter ===== */}
          {active === "newsletter" && (
            <div>
              <SectionTitle count={data.subs.length}>Newsletter</SectionTitle>
              <DataTable
                columns={["Date", "Email", "Source", "Statut"]}
                rows={data.subs.map((r) => [fmt(r.created_at), r.email, r.source, r.status])}
              />
            </div>
          )}

          {/* ===== Hackathon ===== */}
          {active === "hackathon" && (
            <div>
              <SectionTitle count={data.hackathon.length}>Inscriptions Hackathon</SectionTitle>
              <DataTable
                columns={["Date", "Étape", "Nom", "Email", "Équipe", "Profil", "Message"]}
                rows={data.hackathon.map((r) => [
                  fmt(r.created_at),
                  r.hackathon,
                  r.name,
                  r.email,
                  r.team_name,
                  r.profile,
                  r.message,
                ])}
              />
            </div>
          )}

          {/* ===== Speakers (éditable) ===== */}
          {active === "speakers" && (
            <div>
              <SectionTitle count={data.speakers.length}>Speakers</SectionTitle>
              <Card className="p-4 mb-5">
                <form action={addSpeaker} className="flex flex-wrap gap-2 items-center">
                  <input name="name" required placeholder="Nom *" className={INPUT} />
                  <input name="role" placeholder="Rôle" className={INPUT} />
                  <input name="company" placeholder="Entreprise" className={INPUT} />
                  <select name="category" defaultValue="" className={INPUT}>
                    <option value="">Catégorie…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <input name="photo_url" placeholder="URL photo" className={`${INPUT} min-w-[180px]`} />
                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <input type="checkbox" name="featured" className="accent-primary" /> Featured
                  </label>
                  <textarea name="bio" placeholder="Biographie" rows={2} className={`${INPUT} w-full`} />
                  <button type="submit" className={BTN_ADD}>
                    <Plus className="w-3.5 h-3.5" /> AJOUTER
                  </button>
                </form>
              </Card>

              {data.speakers.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun speaker. Ajoute le premier ci-dessus.</p>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border">
                          {["Nom", "Rôle", "Entreprise", "Catégorie", "Featured", "Statut", "Actions"].map((c) => (
                            <th key={c} className={TH}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.speakers.map((r) => (
                          <Fragment key={String(r.id)}>
                          <tr className="border-b border-border/60 last:border-0 hover:bg-secondary/20">
                            <td className={TD}>{r.name}</td>
                            <td className={TD}>{r.role || "—"}</td>
                            <td className={TD}>{r.company || "—"}</td>
                            <td className={TD}>{r.category || "—"}</td>
                            <td className={TD}>{r.featured ? "★" : "—"}</td>
                            <td className={TD}>{pill(r.published)}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  aria-label="Éditer"
                                  onClick={() => setEditingId(editingId === String(r.id) ? null : String(r.id))}
                                  className={BTN_ICON}
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <form action={toggleSpeakerPublished}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <input type="hidden" name="published" value={String(r.published)} />
                                  <button className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                                    {r.published ? "Dépublier" : "Publier"}
                                  </button>
                                </form>
                                <form action={deleteSpeaker}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <button
                                    aria-label="Supprimer"
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </div>
                            </td>
                          </tr>
                          {editingId === String(r.id) && (
                            <tr className="bg-secondary/20 border-b border-border/60">
                              <td colSpan={7} className="p-4">
                                <form action={updateSpeaker} onSubmit={() => setEditingId(null)} className="flex flex-wrap gap-2 items-center">
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <input name="name" required defaultValue={String(r.name ?? "")} placeholder="Nom *" className={INPUT} />
                                  <input name="role" defaultValue={String(r.role ?? "")} placeholder="Rôle" className={INPUT} />
                                  <input name="company" defaultValue={String(r.company ?? "")} placeholder="Entreprise" className={INPUT} />
                                  <select name="category" defaultValue={String(r.category ?? "")} className={INPUT}>
                                    <option value="">Catégorie…</option>
                                    {CATEGORIES.map((c) => (
                                      <option key={c} value={c}>
                                        {c}
                                      </option>
                                    ))}
                                  </select>
                                  <input name="photo_url" defaultValue={String(r.photo_url ?? "")} placeholder="URL photo" className={`${INPUT} min-w-[180px]`} />
                                  <label className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                    <input type="checkbox" name="featured" defaultChecked={Boolean(r.featured)} className="accent-primary" /> Featured
                                  </label>
                                  <textarea name="bio" defaultValue={String(r.bio ?? "")} placeholder="Biographie" rows={2} className={`${INPUT} w-full`} />
                                  <button type="submit" className={BTN_ADD}>Enregistrer</button>
                                  <button type="button" onClick={() => setEditingId(null)} className={BTN_ICON} aria-label="Annuler">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </td>
                            </tr>
                          )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ===== Programme / Sessions (éditable) ===== */}
          {active === "sessions" && (
            <div>
              <SectionTitle count={data.sessions.length}>Programme</SectionTitle>
              <Card className="p-4 mb-5">
                <form action={addSession} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 items-center">
                  <input name="title" required placeholder="Titre *" className={`${INPUT} sm:col-span-2`} />
                  <input name="day" type="date" className={INPUT} />
                  <select name="speaker_id" defaultValue="" className={INPUT}>
                    <option value="">Speaker…</option>
                    {data.speakers.map((sp) => (
                      <option key={String(sp.id)} value={String(sp.id)}>
                        {String(sp.name)}
                      </option>
                    ))}
                  </select>
                  <input name="start_time" type="time" className={INPUT} />
                  <input name="end_time" type="time" className={INPUT} />
                  <input name="stage" placeholder="Scène" className={INPUT} />
                  <input name="format" placeholder="Format" className={INPUT} />
                  <input name="description" placeholder="Description" className={`${INPUT} sm:col-span-3`} />
                  <button type="submit" className={`${BTN_ADD} justify-center`}>
                    <Plus className="w-3.5 h-3.5" /> AJOUTER
                  </button>
                </form>
              </Card>

              {data.sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune session. Ajoute la première ci-dessus.</p>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border">
                          {["Jour", "Horaire", "Titre", "Format", "Scène", "Speaker", "Statut", "Actions"].map((c) => (
                            <th key={c} className={TH}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.sessions.map((r) => (
                          <Fragment key={String(r.id)}>
                          <tr className="border-b border-border/60 last:border-0 hover:bg-secondary/20">
                            <td className={`${TD} whitespace-nowrap`}>{fmtDate(r.day as string) || "—"}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              {(r.start_time as string) || "—"}
                              {r.end_time ? `–${r.end_time}` : ""}
                            </td>
                            <td className={TD}>{r.title}</td>
                            <td className={TD}>{r.format || "—"}</td>
                            <td className={TD}>{r.stage || "—"}</td>
                            <td className={TD}>{r.speakers?.name || "—"}</td>
                            <td className={TD}>{pill(r.published)}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  aria-label="Éditer"
                                  onClick={() => setEditingId(editingId === String(r.id) ? null : String(r.id))}
                                  className={BTN_ICON}
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <form action={toggleSessionPublished}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <input type="hidden" name="published" value={String(r.published)} />
                                  <button className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                                    {r.published ? "Dépublier" : "Publier"}
                                  </button>
                                </form>
                                <form action={deleteSession}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <button
                                    aria-label="Supprimer"
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </div>
                            </td>
                          </tr>
                          {editingId === String(r.id) && (
                            <tr className="bg-secondary/20 border-b border-border/60">
                              <td colSpan={8} className="p-4">
                                <form action={updateSession} onSubmit={() => setEditingId(null)} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 items-center">
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <input name="title" required defaultValue={String(r.title ?? "")} placeholder="Titre *" className={`${INPUT} sm:col-span-2`} />
                                  <input name="day" type="date" defaultValue={String(r.day ?? "")} className={INPUT} />
                                  <select name="speaker_id" defaultValue={String(r.speaker_id ?? "")} className={INPUT}>
                                    <option value="">Speaker…</option>
                                    {data.speakers.map((sp) => (
                                      <option key={String(sp.id)} value={String(sp.id)}>
                                        {String(sp.name)}
                                      </option>
                                    ))}
                                  </select>
                                  <input name="start_time" type="time" defaultValue={String(r.start_time ?? "")} className={INPUT} />
                                  <input name="end_time" type="time" defaultValue={String(r.end_time ?? "")} className={INPUT} />
                                  <input name="stage" defaultValue={String(r.stage ?? "")} placeholder="Scène" className={INPUT} />
                                  <input name="format" defaultValue={String(r.format ?? "")} placeholder="Format" className={INPUT} />
                                  <input name="description" defaultValue={String(r.description ?? "")} placeholder="Description" className={`${INPUT} sm:col-span-3`} />
                                  <div className="flex gap-2">
                                    <button type="submit" className={`${BTN_ADD} justify-center`}>Enregistrer</button>
                                    <button type="button" onClick={() => setEditingId(null)} className={BTN_ICON} aria-label="Annuler">
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </form>
                              </td>
                            </tr>
                          )}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ===== Communiqués (éditable) ===== */}
          {active === "press" && (
            <div>
              <SectionTitle count={data.press.length}>Communiqués</SectionTitle>
              <Card className="p-4 mb-5">
                <form action={addPressRelease} className="flex flex-wrap gap-2 items-center">
                  <input type="date" name="published_at" className={INPUT} />
                  <input name="title" required placeholder="Titre *" className={`${INPUT} min-w-[200px]`} />
                  <input name="excerpt" placeholder="Extrait" className={`${INPUT} min-w-[220px]`} />
                  <input name="pdf_url" placeholder="URL PDF" className={INPUT} />
                  <button type="submit" className={BTN_ADD}>
                    <Plus className="w-3.5 h-3.5" /> AJOUTER
                  </button>
                </form>
              </Card>

              {data.press.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun communiqué.</p>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border">
                          {["Date", "Titre", "Extrait", "PDF", "Statut", "Actions"].map((c) => (
                            <th key={c} className={TH}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.press.map((r) => (
                          <tr key={String(r.id)} className="border-b border-border/60 last:border-0 hover:bg-secondary/20">
                            <td className={`${TD} whitespace-nowrap`}>{fmtDate(r.published_at as string) || "—"}</td>
                            <td className={TD}>{r.title}</td>
                            <td className={TD}>{r.excerpt || "—"}</td>
                            <td className={TD}>{r.pdf_url ? "oui" : "—"}</td>
                            <td className={TD}>{pill(r.published)}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              <div className="flex gap-2">
                                <form action={togglePressPublished}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <input type="hidden" name="published" value={String(r.published)} />
                                  <button className="font-mono text-[11px] px-3 py-1.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-colors">
                                    {r.published ? "Dépublier" : "Publier"}
                                  </button>
                                </form>
                                <form action={deletePressRelease}>
                                  <input type="hidden" name="id" value={String(r.id)} />
                                  <button
                                    aria-label="Supprimer"
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </form>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ===== Contacts presse (éditable) ===== */}
          {active === "media" && (
            <div>
              <SectionTitle count={data.media.length}>Contacts presse</SectionTitle>
              <Card className="p-4 mb-5">
                <form action={addMediaContact} className="flex flex-wrap gap-2 items-center">
                  <input name="name" required placeholder="Nom *" className={INPUT} />
                  <input name="email" type="email" required placeholder="Email *" className={INPUT} />
                  <button type="submit" className={BTN_ADD}>
                    <Plus className="w-3.5 h-3.5" /> AJOUTER
                  </button>
                </form>
              </Card>

              {data.media.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun contact presse.</p>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border">
                          {["Nom", "Email", "Actions"].map((c) => (
                            <th key={c} className={TH}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.media.map((r) => (
                          <tr key={String(r.id)} className="border-b border-border/60 last:border-0 hover:bg-secondary/20">
                            <td className={TD}>{r.name}</td>
                            <td className={TD}>{r.email}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              <form action={deleteMediaContact}>
                                <input type="hidden" name="id" value={String(r.id)} />
                                <button
                                  aria-label="Supprimer"
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* ===== Utilisateurs admin ===== */}
          {active === "users" && (
            <div>
              <SectionTitle count={data.admins.length}>Utilisateurs</SectionTitle>
              <Card className="p-4 mb-5">
                <form action={addAdminUser} className="flex flex-wrap gap-2 items-center">
                  <input name="username" required placeholder="Identifiant *" className={INPUT} />
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={8}
                    placeholder="Mot de passe (8+ car.) *"
                    className={INPUT}
                  />
                  <button type="submit" className={BTN_ADD}>
                    <Plus className="w-3.5 h-3.5" /> AJOUTER
                  </button>
                </form>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  Les mots de passe sont hachés (PBKDF2), jamais stockés en clair. Pour changer un mot de passe :
                  supprime l'utilisateur et recrée-le.
                </p>
              </Card>

              {data.admins.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucun utilisateur en base. L'accès reste possible via les identifiants d'environnement (bootstrap).
                </p>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border">
                          {["Identifiant", "Créé le", "Actions"].map((c) => (
                            <th key={c} className={TH}>
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.admins.map((r) => (
                          <tr key={String(r.id)} className="border-b border-border/60 last:border-0 hover:bg-secondary/20">
                            <td className={TD}>{r.username}</td>
                            <td className={`${TD} whitespace-nowrap`}>{fmt(r.created_at)}</td>
                            <td className={`${TD} whitespace-nowrap`}>
                              <form action={deleteAdminUser}>
                                <input type="hidden" name="id" value={String(r.id)} />
                                <button
                                  aria-label="Supprimer"
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-destructive/40 text-destructive hover:bg-destructive/10 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

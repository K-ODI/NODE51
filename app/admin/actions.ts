"use server"

import { revalidatePath } from "next/cache"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim()

function refresh(...paths: string[]) {
  for (const p of paths) revalidatePath(p)
}

// ---------- Speakers ----------
export async function addSpeaker(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const name = s(formData, "name")
  if (!name) return
  await supabase.from("speakers").insert({
    name,
    role: s(formData, "role") || null,
    company: s(formData, "company") || null,
    category: s(formData, "category") || null,
    photo_url: s(formData, "photo_url") || null,
    bio: s(formData, "bio") || null,
    featured: formData.get("featured") === "on",
    published: true,
  })
  refresh("/admin", "/speakers")
}

export async function updateSpeaker(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  const name = s(formData, "name")
  if (!id || !name) return
  await supabase
    .from("speakers")
    .update({
      name,
      role: s(formData, "role") || null,
      company: s(formData, "company") || null,
      category: s(formData, "category") || null,
      photo_url: s(formData, "photo_url") || null,
      bio: s(formData, "bio") || null,
      featured: formData.get("featured") === "on",
    })
    .eq("id", id)
  refresh("/admin", "/speakers", "/speakers/" + id)
}

export async function toggleSpeakerPublished(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  const published = s(formData, "published") === "true"
  if (!id) return
  await supabase.from("speakers").update({ published: !published }).eq("id", id)
  refresh("/admin", "/speakers")
}

export async function deleteSpeaker(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  if (!id) return
  await supabase.from("speakers").delete().eq("id", id)
  refresh("/admin", "/speakers")
}

// ---------- Communiqués ----------
export async function addPressRelease(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const title = s(formData, "title")
  if (!title) return
  await supabase.from("press_releases").insert({
    title,
    published_at: s(formData, "published_at") || null,
    excerpt: s(formData, "excerpt") || null,
    pdf_url: s(formData, "pdf_url") || null,
    published: true,
  })
  refresh("/admin", "/presse")
}

export async function togglePressPublished(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  const published = s(formData, "published") === "true"
  if (!id) return
  await supabase.from("press_releases").update({ published: !published }).eq("id", id)
  refresh("/admin", "/presse")
}

export async function deletePressRelease(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  if (!id) return
  await supabase.from("press_releases").delete().eq("id", id)
  refresh("/admin", "/presse")
}

// ---------- Contacts presse ----------
export async function addMediaContact(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const name = s(formData, "name")
  const email = s(formData, "email")
  if (!name || !email) return
  await supabase.from("media_contacts").insert({ name, email })
  refresh("/admin", "/presse")
}

export async function deleteMediaContact(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  if (!id) return
  await supabase.from("media_contacts").delete().eq("id", id)
  refresh("/admin", "/presse")
}

// ---------- Programme / Sessions ----------
export async function addSession(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const title = s(formData, "title")
  if (!title) return
  await supabase.from("sessions").insert({
    title,
    day: s(formData, "day") || null,
    start_time: s(formData, "start_time") || null,
    end_time: s(formData, "end_time") || null,
    stage: s(formData, "stage") || null,
    format: s(formData, "format") || null,
    speaker_id: s(formData, "speaker_id") || null,
    description: s(formData, "description") || null,
    published: true,
  })
  refresh("/admin", "/programme")
}

export async function updateSession(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  const title = s(formData, "title")
  if (!id || !title) return
  await supabase
    .from("sessions")
    .update({
      title,
      day: s(formData, "day") || null,
      start_time: s(formData, "start_time") || null,
      end_time: s(formData, "end_time") || null,
      stage: s(formData, "stage") || null,
      format: s(formData, "format") || null,
      speaker_id: s(formData, "speaker_id") || null,
      description: s(formData, "description") || null,
    })
    .eq("id", id)
  refresh("/admin", "/programme")
}

export async function toggleSessionPublished(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  const published = s(formData, "published") === "true"
  if (!id) return
  await supabase.from("sessions").update({ published: !published }).eq("id", id)
  refresh("/admin", "/programme")
}

export async function deleteSession(formData: FormData) {
  const supabase = getSupabaseAdmin()
  if (!supabase) return
  const id = s(formData, "id")
  if (!id) return
  await supabase.from("sessions").delete().eq("id", id)
  refresh("/admin", "/programme")
}

"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { verifyPassword, signSession } from "@/lib/admin-auth"

async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (!username || !password) return false
  // 1. Bootstrap via env
  if (process.env.ADMIN_PASSWORD && username === (process.env.ADMIN_USER || "admin") && password === process.env.ADMIN_PASSWORD)
    return true
  // 2. Utilisateurs en base
  const supabase = getSupabaseAdmin()
  if (!supabase) return false
  const { data } = await supabase.from("admin_users").select("pw").eq("username", username).maybeSingle()
  if (!data?.pw) return false
  return verifyPassword(password, data.pw)
}

export async function login(_prev: { error?: string } | null, formData: FormData): Promise<{ error?: string }> {
  const username = String(formData.get("username") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  if (!(await verifyCredentials(username, password))) return { error: "Identifiants invalides." }

  const token = await signSession(username)
  ;(await cookies()).set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  })
  redirect("/admin")
}

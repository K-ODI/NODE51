import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { AdminDashboard, type AdminData } from "@/components/admin/admin-dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return (
      <main className="min-h-screen bg-background text-foreground p-8">
        <p className="text-destructive font-mono">Backend non configuré (Supabase).</p>
      </main>
    )
  }

  const [contactsRes, subsRes, partnersRes, speakersRes, pressRes, mediaRes, sessionsRes, adminsRes, hackathonRes] = await Promise.all([
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(200),
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }).limit(500),
    supabase.from("partner_submissions").select("*").order("created_at", { ascending: false }).limit(200),
    supabase.from("speakers").select("*").order("sort", { ascending: true }).limit(300),
    supabase.from("press_releases").select("*").order("published_at", { ascending: false }).limit(200),
    supabase.from("media_contacts").select("*").order("sort", { ascending: true }).limit(100),
    supabase
      .from("sessions")
      .select("id,title,day,start_time,end_time,stage,format,description,published,speaker_id,speakers(name)")
      .order("day", { ascending: true })
      .order("start_time", { ascending: true })
      .limit(300),
    supabase.from("admin_users").select("id,username,created_at").order("created_at", { ascending: true }).limit(100),
    supabase.from("hackathon_registrations").select("*").order("created_at", { ascending: false }).limit(500),
  ])

  const data: AdminData = {
    contacts: contactsRes.data ?? [],
    subs: subsRes.data ?? [],
    partners: partnersRes.data ?? [],
    speakers: speakersRes.data ?? [],
    press: pressRes.data ?? [],
    media: mediaRes.data ?? [],
    sessions: (sessionsRes.data as unknown as AdminData["sessions"]) ?? [],
    admins: adminsRes.data ?? [],
    hackathon: hackathonRes.data ?? [],
  }

  return <AdminDashboard data={data} />
}

-- NODE 51 — schéma Supabase pour les soumissions du formulaire de contact.
-- À exécuter dans le SQL Editor de ton projet Supabase (ou via la CLI).

create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  company     text,
  interest    text,
  message     text
);

-- Row Level Security : personne ne peut lire/écrire via l'API publique.
-- La route serveur utilise la clé service_role qui bypass la RLS.
alter table public.contact_submissions enable row level security;

-- (Optionnel) index pour trier/filtrer rapidement dans le dashboard.
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);


-- ============================================================
-- Newsletter
-- ============================================================
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text not null unique,
  source      text,                                  -- ex: "footer"
  status      text not null default 'subscribed'     -- subscribed | unsubscribed
);

alter table public.newsletter_subscribers enable row level security;

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);


-- ============================================================
-- Demandes de partenariat
-- ============================================================
create table if not exists public.partner_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  tier        text,                 -- PLATINUM | GOLD | SILVER | BRONZE | STARTUP
  name        text not null,
  email       text not null,
  company     text,
  message     text
);

alter table public.partner_submissions enable row level security;

create index if not exists partner_submissions_created_at_idx
  on public.partner_submissions (created_at desc);


-- ============================================================
-- Contenu éditable : Speakers, Communiqués de presse, Contacts presse
-- ============================================================
create table if not exists public.speakers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  role        text,
  company     text,
  category    text,        -- IA & DATA | BLOCKCHAIN | GREENTECH | WOMEN IN TECH | QUANTUM & IoT
  photo_url   text,
  bio         text,
  featured    boolean not null default false,
  published   boolean not null default true,
  sort        int not null default 0
);
alter table public.speakers enable row level security;
create index if not exists speakers_sort_idx on public.speakers (sort, created_at);

create table if not exists public.press_releases (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  published_at  date,
  title         text not null,
  excerpt       text,
  pdf_url       text,
  published     boolean not null default true
);
alter table public.press_releases enable row level security;
create index if not exists press_releases_date_idx on public.press_releases (published_at desc);

create table if not exists public.media_contacts (
  id      uuid primary key default gen_random_uuid(),
  name    text not null,
  email   text not null,
  sort    int not null default 0
);
alter table public.media_contacts enable row level security;


-- ============================================================
-- Programme / Agenda
-- ============================================================
create table if not exists public.sessions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  description text,
  day         date,                                  -- 2027-02-09 | 2027-02-10
  start_time  text,                                  -- "09:00"
  end_time    text,                                  -- "09:45"
  stage       text,                                  -- Main Stage | Arena | Future Lab...
  format      text,                                  -- Keynote | Panel | Pitch | Masterclass...
  speaker_id  uuid references public.speakers(id) on delete set null,
  published   boolean not null default true,
  sort        int not null default 0
);
alter table public.sessions enable row level security;
create index if not exists sessions_day_idx on public.sessions (day, start_time, sort);

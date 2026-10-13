-- ============================================================
--  Novialili Dress · Supabase — Reseñas en vivo
--  Ejecutar en: Supabase Dashboard → SQL Editor → New query
--  Luego copiar el URL del proyecto y la anon key en .env
--  (PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY) y rebuild.
-- ============================================================

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 60),
  rating integer not null check (rating between 1 and 5),
  comment text not null check (char_length(comment) between 2 and 500),
  created_at timestamptz not null default now()
);

-- Índice para ordenar por fecha de creación (más recientes primero)
create index if not exists reviews_created_at_idx on public.reviews (created_at desc);

alter table public.reviews enable row level security;

-- Permitir leer las reseñas de forma anónima (la página es pública)
create policy "reviews_anon_select" on public.reviews
  for select to anon using (true);

-- Permitir publicar una reseña sin login, validando longitud mínima
create policy "reviews_anon_insert" on public.reviews
  for insert to anon
  with check (
    char_length(name) between 1 and 60 and
    char_length(comment) between 2 and 500
  );

-- Nota: las reseñas no se pueden editar ni borrar vía anon (solo desde el
-- dashboard o con una policy adicional autenticada).

-- ============================================================
--  Perfiles de novia/quinceañera (captura de leads)
--  Solo se puede INSERTAR de forma anónima; la lectura es privada
--  (la dueña consulta los datos desde el dashboard).
-- ============================================================

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  event text not null,
  month text,
  year text,
  whatsapp text not null check (char_length(whatsapp) between 7 and 20),
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "leads_anon_insert" on public.leads
  for insert to anon
  with check (char_length(name) >= 1 and char_length(whatsapp) >= 7);
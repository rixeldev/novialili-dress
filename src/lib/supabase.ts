/**
 * Cliente de Supabase ultraligero (PostgREST vía fetch) para reseñas
 * y captura de leads (perfil de novia/quinceañera).
 *
 * Configuración (build-time, variables públicas de Astro):
 *   PUBLIC_SUPABASE_URL       → https://<ref>.supabase.co
 *   PUBLIC_SUPABASE_ANON_KEY  → anon key del proyecto
 *
 * El schema + políticas RLS viven en supabase/schema.sql.
 */
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined

export const SUPABASE_CONFIGURED = Boolean(url && anonKey)

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  created_at: string
}

const TABLE = "reviews"
const LEADS_TABLE = "leads"

async function request(path: string, init: RequestInit = {}) {
  const res = await fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: anonKey as string,
      Authorization: `Bearer ${anonKey as string}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}`)
  }
  return res
}

export async function fetchReviews(limit = 6): Promise<Review[]> {
  const res = await request(
    `/rest/v1/${TABLE}?select=id,name,rating,comment,created_at&order=created_at.desc&limit=${limit}`,
  )
  return (await res.json()) as Review[]
}

export async function submitReview(input: {
  name: string
  rating: number
  comment: string
}): Promise<void> {
  await request(`/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(input),
  })
}

export async function submitLead(input: {
  name: string
  event: string
  month: string
  year: string
  whatsapp: string
}): Promise<void> {
  await request(`/rest/v1/${LEADS_TABLE}`, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify(input),
  })
}

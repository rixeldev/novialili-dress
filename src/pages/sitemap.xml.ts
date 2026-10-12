import type { APIRoute } from "astro"

export const GET: APIRoute = ({ site }) => {
  const origin = site?.origin ?? "https://www.novialilidress.com"
  const pages = [
    { loc: `${origin}/`, lastmod: "2026-10-12", priority: "1.0", changefreq: "monthly" },
    { loc: `${origin}/en/`, lastmod: "2026-10-12", priority: "0.9", changefreq: "monthly" },
  ]

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join("\n")

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}

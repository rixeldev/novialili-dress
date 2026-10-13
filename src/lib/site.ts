/**
 * Verified brand data from www.novialilidress.com (fetched at build time of
 * this site). Keep contact details and catalog links in sync with the brand.
 */
export const SITE = {
  name: "Novialili Dress",
  phoneDisplay: "829-566-0664",
  // Same link format the reference site uses for "AGENDA TU CITA".
  phoneHref: "tel:829-566-0664",
  whatsappHref: "https://api.whatsapp.com/send?phone=8295660664",
  email: "info@novialilidress.com",
  address: "Próximo al parque del estudiante, callejón de Los Mota, La Vega 41000",
  instagram: "https://www.instagram.com/novialilidress/",
  pinterest: "https://es.pinterest.com/NOVIALILIDRESS/",
  youtube: "https://youtube.com/@NOVIALILIDRESS8",
  tiktok: "https://tiktok.com/@NOVIALILI8",
  googleReviews: "https://www.google.com/maps/place/Novialili+Dress/@19.220928,-70.5254279,517m/data=!3m1!1e3!4m8!3m7!1s0x8eb02bdbc3a7f0b9:0x6bfd204982609c9!8m2!3d19.2208495!4d-70.5258838!9m1!1b1!16s%2Fg%2F11k_r9gxyn?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
} as const

/** Real online catalogs (Canva) linked from the reference /catalogos page. */
export const CATALOG_URLS = {
  novias: "https://www.canva.com/design/DAGZSWoZSUs/95dz9oM4bVR5GhEdkeprhw/view",
  quinceaneras: "https://www.canva.com/design/DAGiR59piUE/0VbGWnVRCsIQEHBqX_wwYQ/view",
  caballeros: "https://www.canva.com/design/DAFxWXewT78/FnIyvbXXbuG2ppJmfhwATg/view",
  embarazadas: "https://www.canva.com/design/DAGgEtst3i4/xQFXpPrf2VsXO4VMi0fTTg/view",
  largas: "https://www.canva.com/design/DAGfltbTiOA/ci1LUMOctvEkNkqjlTiB-A/view",
  comunion: "https://canva.link/zpe6qatau9yj58d",
  viewAll: "https://www.novialilidress.com/catalogos",
} as const

<div align="center">

![Novialili Dress](public/images/logo-name.webp)

# Novialili Dress

### Landing bilingüe del atelier de novias · La Vega, República Dominicana

Vestidos de novia, quinceañeras y ocasiones especiales, con accesorios y ajustes a tu medida.

[![Astro 7](https://img.shields.io/badge/Astro_7-FF5D01?logo=astro&logoColor=white&style=for-the-badge)](https://astro.build)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white&style=for-the-badge)](https://pnpm.io)
[![ES · EN](https://img.shields.io/badge/idiomas-ES_·_EN-8a7a6a?style=for-the-badge)](#-internacionalización)

</div>

---

## ✨ De un vistazo

Landing de una sola página con estética editorial de atelier: serif Cormorant Garamond, retículas asimétricas de 12 columnas y una paleta rosa marfil / tinta de la marca.

- 🇪🇸 **Español en `/`** y 🇬🇧 **Inglés en `/en/`** — sin JavaScript de traducción en cliente (i18next en build time).
- 🎬 **Video de la fundadora** con fachada <kbd>lite-youtube</kbd>: el iframe de YouTube solo se carga al hacer clic (youtube-nocookie).
- 🖼 **Imágenes en `public/images/`** con `width`/`height` reales (CLS-safe), `loading="lazy"` y `fetchpriority` en el hero.
- 🎨 **Scroll-reveal** con IntersectionObserver que respeta `prefers-reduced-motion` (sin JS todo es visible).
- 🧭 **Navegación pegajosa**, botón *volver arriba*, SEO completo (canonical, hreflang, OG, sitemap, robots).

## 🧭 Stack tecnológico

| Capa | Tecnología |
| ---- | ---------- |
| Framework | [Astro 7](https://astro.build) (estático, 2 páginas) + TypeScript |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com) (CSS-first, sin `tailwind.config`) + `tailwind-animations` |
| Traducciones | [i18next](https://www.i18next.com) — instancias por locale, resueltas en build |
| Video | [`lite-youtube-embed`](https://github.com/justinribeiro/lite-youtube-embed) (facade con poster WebP) |
| Paquetes | [pnpm](https://pnpm.io) ≥ 9 · Node ≥ 22.12 |

## 🚀 Empezar

```bash
# 1. Instalar dependencias (solo pnpm)
pnpm install

# 2. Servidor de desarrollo en http://localhost:4321
pnpm dev

# 3. Build de producción → dist/
pnpm build

# 4. Previsualizar el build
pnpm preview
```

> El dev server Se auto-ejecuta en segundo plano cuando lo lanza un agente (`astro dev` detecta la ejecución):
> `pnpm exec astro dev status` · `pnpm exec astro dev logs --follow` · `pnpm exec astro dev stop`.

## 🗂 Estructura del proyecto

```text
novialili-dress/
├── public/
│   ├── images/              # Media: hero, historia, catálogo, tiara, og.jpg, logo
│   ├── favicon.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/          # Secciones de la landing + utilidades
│   │   ├── LandingPage.astro    # Arma la página (header → hero → … → footer)
│   │   ├── HeroSection.astro    # Hero con swash dibujado + scroll cue
│   │   ├── CollectionGrid.astro # Catálogo con enlaces de la tienda
│   │   ├── StorySection.astro   # Historia + video <lite-youtube>
│   │   ├── AppointmentCTA.astro # CTA de contacto/cita
│   │   ├── BackToTop.astro      # Botón volver-arriba
│   │   ├── Reveal.astro         # Scroll-reveal (IntersectionObserver)
│   │   └── Icon.astro           # Sprite SVG inline
│   ├── i18n/
│   │   ├── index.ts             # ui(locale) → { t }
│   │   └── locales/
│   │       ├── es/translation.json
│   │       └── en/translation.json
│   ├── layouts/
│   │   └── BaseLayout.astro     # <head>, fuentes, global.css, header/footer
│   ├── lib/
│   │   └── site.ts              # Datos de marca verificados (teléfono, redes, catálogo)
│   ├── pages/
│   │   ├── index.astro          # Ruta `/` (es)
│   │   ├── en/index.astro       # Ruta `/en/`
│   │   └── sitemap.xml.ts
│   └── styles/
│       └── global.css           # @import "tailwindcss" + tokens de marca
├── astro.config.mjs             # site, i18n {es, en}, plugin de Tailwind v4
├── tsconfig.json                # Alias @/* → ./src/*
└── package.json
```

## 🌐 Internacionalización

`astro.config.mjs` define `i18n: { locales: ['es', 'en'], defaultLocale: 'es', routing: { prefixDefaultLocale: false } }`.

- Todo el copy vive en `src/i18n/locales/{es,en}/translation.json`.
- Los componentes consumen traducciones con `ui(Astro.currentLocale).t('seccion.clave')` — resolvidas en build, cero i18n en el cliente.
- El selector de idioma es un enlace a la ruta del otro locale.

## 🎨 Diseño

- **Tipografía**: Cormorant Garamond (serif + cursivas) y DM Sans, vía Google Fonts.
- **Paleta**: tokens `@theme` en `global.css` (rose / ivory / ink).
- **Hero**: titular de dos partes con *flourish* SVG que se dibuja (`@keyframes swash-draw`), flecha de "Descubre más" con rebote lento (`@keyframes bounce-down`).
- **Video**: `<lite-youtube class="youtube-bride">` — play button a la marca, ocupa fila completa del grid y `min(80vw, 72rem)` en desktop.

## 🛠 Comandos útiles

| Comando | Acción |
| ------- | ------ |
| `pnpm install` | Instala dependencias |
| `pnpm dev` | Dev server en `localhost:4321` |
| `pnpm build` | Build de producción → `dist/` |
| `pnpm preview` | Previsualiza `dist/` localmente |
| `pnpm exec prettier --write .` | Formatea todo (no hay script de format) |
| `pnpm exec astro dev status` | Estado del dev server en background |

> ⚠️ No hay scripts de lint/test (eslint.config.mjs es un copy-paste de un proyecto Next.js; no funciona con las dependencias actuales). No ejecutarlo.

## 🔧 Notas de mantenimiento

- **Dominio**: `site` está fijo a `https://www.novialilidress.com` (canonical, hreflang, OG, sitemap, robots). Cambiarlo en `astro.config.mjs` antes de desplegar en otro lado.
- **Datos del negocio**: teléfono, WhatsApp, redes, direcciones y enlaces de catálogo viven centralizados en `src/lib/site.ts` — mantener ese archivo sincronizado con la marca, no el copy de los componentes.
- **Video**: el videoid (`0iYmeAZv7Nk`) está en `StorySection.astro`; el estilo de marca del player en `global.css` (`.youtube-bride`).
- **Assets**: viven en `public/images/` a propósito (decisión de la dueña) — no hay `astro:assets`/`<Image>`, así que no hay optimización de build: mantener los archivos razonablemente optimizados.

---

<div align="center">

Hecho con 🤍 para **Novialili Dress** · La Vega, República Dominicana

</div>
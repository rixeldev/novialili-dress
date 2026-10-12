# AGENTS.md

Astro 7 + Tailwind CSS v4 site (pnpm). Bilingual landing page for the Novialili Dress bridal atelier: Spanish at `/` (default locale), English at `/en/`. Built from `docs/implementation.md`; no tests, no CI.

## Commands

- Install with `pnpm install` only (repo has `pnpm-lock.yaml`; Node >= 22.12). Dependencies: `i18next` (translations), `tailwind-animations` (CSS-only animation utilities), `lite-youtube-embed` (facade YouTube player in the story section). `sharp` is still installed but unused (no `astro:assets` `<Image>`s remain).
- Start the dev server in background mode: `pnpm exec astro dev --background` (or `pnpm dev -- --background`). Manage it with `pnpm exec astro dev stop`, `astro dev status`, and `astro dev logs [--follow]`.
- `astro dev` auto-backgrounds when run by an agent (`isRunByAgent` detection in Astro 7.3+), so the server won't block your shell; query it with `astro dev status`.
- `pnpm build` / `pnpm preview` for production builds. **There are no `lint`, `format`, `test`, or `check` scripts.**

## Lint / format gotchas

- `eslint.config.mjs` is a copy-paste from a Next.js project: it imports `eslint-config-next`, which is not a dependency, so eslint currently errors on load. Don't run or trust it. `eslint-plugin-astro` and `astro-eslint-parser` are installed but not wired into the config.
- Formatting is Prettier (`.prettierrc`): no semicolons, double quotes, printWidth 100, `prettier-plugin-tailwindcss` sorts utility classes. Run it directly since there is no script: `pnpm exec prettier --write .`

## Architecture

- Routes: `src/pages/index.astro` (es, `/`) and `src/pages/en/index.astro` (`/en/`), both rendered through `src/components/LandingPage.astro`. Also `src/pages/sitemap.xml.ts` + `public/robots.txt` (referencing the site domain).
- i18n: `astro.config.mjs` sets `site` and `i18n: { locales: ['es','en'], defaultLocale: 'es', routing: { prefixDefaultLocale: false } }`. All copy lives in `src/i18n/locales/{es,en}/translation.json`; components get translations via `ui(Astro.currentLocale)` from `src/i18n/index.ts` (i18next instances created per locale, used at build time — zero client translation code). The language switcher is just a link to the other locale's route.
- Tailwind v4 is CSS-first: attached as a Vite plugin in `astro.config.mjs`, with **no `tailwind.config` file**. The stylesheet entry is `src/styles/global.css`: `@import "tailwindcss"` + `@import "tailwind-animations"` (plugin utilities: `animate-fade-in`, `animate-slide-in-bottom`, `animate-delay-*`, `animate-duration-*` — no `delay-450` variant) + brand `@theme` tokens (rose/ivory/ink). `global.css` is imported once in `src/layouts/BaseLayout.astro`; every page goes through that layout.
- Images: all media lives in `public/images/` (deliberate: assets were moved out of `src/assets/` per the owner). Components reference them with plain `<img src="/images/...">` + explicit `width`/`height` attrs (real pixel dimensions, CLS-safe) and `loading="lazy"` (hero is `eager` + `fetchpriority="high"`). There is no `astro:assets`/`<Image>` usage, so no build-time optimization/srcset — keep source files reasonably optimized. The story image in `StorySection` stretches to the row's full height (`flex flex-col` + `flex-1` + `object-cover object-center` at `lg`). `public/` also holds `favicon.png`, `robots.txt`, `images/og.jpg` (must stay a public file for absolute URLs in meta tags) and `images/logo-name.webp` (footer watermark).
- Video: the founder-story YouTube video is embedded as a `<lite-youtube>` facade (`videoid="0iYmeAZv7Nk`, `youtube-bride` brand styling in `global.css`) inside `StorySection.astro`. Imported via `lite-youtube-embed` (JS + CSS); the real `youtube-nocookie.com` iframe only loads on click. The video spans a full grid row on desktop (`lg:col-span-12`) and sizes to `min(80vw, 72rem)`.
- Design: editorial bridal aesthetic — Cormorant Garamond (serif, incl. italics) + DM Sans (Google Fonts `<link>`), asymmetric 12-col grids, scroll-reveal via IntersectionObserver (`src/components/Reveal.astro` — JS adds `.reveal-init`, so no-JS users see everything), reduced-motion respected. Header is fixed and transparent over the hero, switching to a solid blurred bar past `scrollY > 24` (`.site-header.is-scrolled`, CSS in `global.css`). A back-to-top button (`BackToTop.astro`) fades in past `scrollY > 560`.
- Import alias `@/*` → `./src/*` (tsconfig). Components use relative imports (`../i18n`, `./Icon.astro`, etc.); there are no media imports to update.

## Repo quirks

- `.gitignore` lists `.vscode/`, `docs/`, and `.agents/`, but `.vscode/extensions.json` and `.vscode/launch.json` were committed before the ignore rules — changes to them are tracked.
- Agent skills are pinned in `skills-lock.json` and installed into the gitignored `.agents/skills/` directory.
- `site` is hardcoded to `https://www.novialilidress.com` (the live brand domain): canonicals, hreflang, OG URLs, sitemap, and robots all use it. Change `site` in `astro.config.mjs` before deploying elsewhere.
- Brand facts (phone, WhatsApp, socials, addresses, catalog links) are verified against the live site and centralized in `src/lib/site.ts` — keep that file in sync with the brand, not the component copy.
- Astro 7 inlines `<script>` blocks from components into the page HTML as inline modules (no external JS files in `dist/`).
- `CLAUDE.md` is a hardlink to `AGENTS.md` (same file, two names): editing one edits both. Do not try to keep them independently.

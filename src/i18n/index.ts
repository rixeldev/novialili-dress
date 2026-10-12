import i18next, { type i18n, type Resource } from "i18next"
import es from "./locales/es/translation.json"
import en from "./locales/en/translation.json"

export const locales = ["es", "en"] as const
export type Locale = (typeof locales)[number]

const instances = new Map<Locale, i18n>()

function getInstance(locale: Locale): i18n {
  let inst = instances.get(locale)
  if (!inst) {
    inst = i18next.createInstance()
    // init() is async; translations are static JSON so calling t() right after
    // is safe at build/SSR time.
    void inst.init({
      lng: locale,
      fallbackLng: "es",
      resources: {
        // The JSON literal types don't satisfy i18next's Resource index
        // signature; the shapes match at runtime.
        es: { translation: es as unknown as Resource },
        en: { translation: en as unknown as Resource },
      },
      interpolation: { escapeValue: false },
    })
    instances.set(locale, inst)
  }
  return inst
}

/**
 * Per-render translation helper for Astro pages/components.
 * Locale-aware: "es" (default, no prefix) or "en" (under /en/).
 */
export function ui(locale?: string) {
  const active: Locale = locale === "en" ? "en" : "es"
  const inst = getInstance(active)
  return {
    locale: active,
    lang: active === "es" ? "es" : "en",
    t: inst.t.bind(inst),
  }
}

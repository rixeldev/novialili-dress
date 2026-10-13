// @ts-check
import { defineConfig } from "astro/config"

import tailwindcss from "@tailwindcss/vite"
import viteConfig from "./vite.config.js"

// https://astro.build/config
export default defineConfig({
  site: "https://www.novialilidress.com",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  server: {
    host: true,
    allowedHosts: [
      "murky-extrovert-cabbie.ngrok-free.dev", 
      "*.ngrok.io",
    ],
  },
  vite: {
    plugins: [...(viteConfig.plugins ?? []), tailwindcss()],
  },
})

// Configuración de Vite del proyecto.
//
// IMPORTANTE: Astro 7 no lee vite.config.js por sí solo (usa `configFile: false`).
// Este archivo se consume desde `astro.config.mjs` (campo `vite.plugins`).
import ngrok from "@ngrok/ngrok"

/**
 * Plugin de Vite que abre un túnel ngrok hacia el dev server al arrancar.
 *
 * -          Requires NGROK_AUTHTOKEN (gratis en https://dashboard.ngrok.com)
 * - Opcional: NGROK_DOMAIN para usar un dominio estático reservado.
 */
function ngrokTunnel() {
  return {
    name: "ngrok-tunnel",
    apply: "serve", // solo en `astro dev`, nunca en build
    configureServer(server) {
      const openTunnel = async () => {
        if (!process.env.NGROK_AUTHTOKEN) {
          server.config.logger.warn(
            "[ngrok] NGROK_AUTHTOKEN no está definida. Obtén una gratis en https://dashboard.ngrok.com, defínela y reinicia el dev server para abrir el túnel."
          )
          return
        }
        try {
          const listener = await ngrok.forward({
            addr: `http://localhost:${process.env.PORT || 4321}`,
            authtoken_from_env: true,
            ...(process.env.NGROK_DOMAIN ? { domain: process.env.NGROK_DOMAIN } : {}),
          })
          server.config.logger.info(`[ngrok] Tu sitio está en línea: ${listener.url()}`)
        } catch (error) {
          server.config.logger.error(`[ngrok] No se pudo abrir el túnel: ${error.message}`)
        }
      }
      const allowed = typeof server.allowedHosts?.add === "function" ? server.allowedHosts : null
      if (allowed) {
        // Permitir Hosts de túneles ngrok en el dev server (Vite 8: allowedHosts es un Set)
        if (process.env.NGROK_DOMAIN) allowed.add(process.env.NGROK_DOMAIN)
        allowed.add(".ngrok.app")
        allowed.add(".ngrok-free.dev")
      }
      server.httpServer?.once("listening", openTunnel)
    },
  }
}

export default {
  plugins: [ngrokTunnel()],
}
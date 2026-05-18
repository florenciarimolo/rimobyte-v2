/**
 * URLs del sitemap de producción (may/2026) sin página equivalente en v2.
 * Redirigen a la URL temática más cercana (o `/`).
 *
 * Las claves coinciden con URLs antiguas indexadas (sin barra final).
 */
export const legacySitemapRedirects = {
  '/desarrolladora-wordpress-freelance': '/',
  '/migrar-web-agencia-freelance': '/blog/tu-web-debe-ser-tuya/',
  '/rescate-wordpress-urgente': '/servicios/mantenimiento-web/',
  '/precios-desarrollo-web': '/blog/cuanto-cuesta-una-pagina-web/',
  '/rediseno-web-wordpress': '/servicios/web-corporativa/',
  '/desarrollo-tienda-online': '/servicios/tienda-online/',
  '/optimizacion-velocidad-wordpress': '/servicios/mantenimiento-web/',
  '/desarrollo-vue-nuxt-astro': '/',
  '/blog/cuando-redisenar-web': '/blog/tu-web-debe-ser-tuya/',
  '/blog/cuanto-cuesta-mantener-wordpress': '/blog/cuanto-cuesta-una-pagina-web/',
  '/blog/vue-vs-react': '/blog/',
  '/blog/wordpress-hackeado': '/servicios/mantenimiento-web/',
  '/blog/wordpress-vs-wix': '/blog/cuanto-cuesta-una-pagina-web/',
} as const satisfies Record<string, string>;

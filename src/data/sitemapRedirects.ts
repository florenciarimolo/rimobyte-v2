/**
 * Rutas públicas de rimobyte-v2 (coinciden con el sitemap generado en build).
 * Referencia del sitemap anterior en producción: https://rimobyte.com/sitemap.xml
 */

/** Rutas indexables del sitio actual — mantener alineadas con `pnpm build` / sitemap. */
export const publicRoutes = [
  '/',
  '/blog',
  '/blog/cuanto-cuesta-una-pagina-web',
  '/blog/tu-web-debe-ser-tuya',
  '/blog/web-o-instagram',
  '/contacto',
  '/politica-cookies',
  '/politica-privacidad',
  '/proyectos',
  '/proyectos/ariadna-vilalta',
  '/proyectos/de-cos',
  '/proyectos/fenix-internacional-360',
  '/proyectos/jlg-ki',
  '/proyectos/juancar-garma-reset7',
  '/proyectos/lucia-nails-art',
  '/proyectos/rock-zone-camp',
  '/proyectos/supercapaces',
  '/proyectos/vila-i-lancis',
  '/servicios/mantenimiento-web',
  '/servicios/tienda-online',
  '/servicios/web-corporativa',
  '/sobre-mi',
] as const;

/**
 * URLs del sitemap de producción (may/2026) sin página equivalente en v2.
 * Redirigen a / para no devolver 404 en enlaces indexados.
 */
export const legacySitemapRedirects = {
  '/desarrolladora-wordpress-freelance': '/',
  '/migrar-web-agencia-freelance': '/',
  '/rescate-wordpress-urgente': '/',
  '/precios-desarrollo-web': '/',
  '/rediseno-web-wordpress': '/',
  '/desarrollo-tienda-online': '/',
  '/optimizacion-velocidad-wordpress': '/',
  '/desarrollo-vue-nuxt-astro': '/',
  '/blog/cuando-redisenar-web': '/',
  '/blog/cuanto-cuesta-mantener-wordpress': '/',
  '/blog/vue-vs-react': '/',
  '/blog/wordpress-hackeado': '/',
  '/blog/wordpress-vs-wix': '/',
} as const satisfies Record<string, string>;

export const publicRouteSet = new Set<string>(publicRoutes);

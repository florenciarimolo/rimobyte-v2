# Auditoría SEO — rimobyte.com (RimoByte v2)

**Fecha:** 23 de junio de 2026 (actualización post-corrección integral)  
**Auditoría inicial:** 19 de junio de 2026  
**Alcance:** Código fuente del repositorio `rimobyte-v2` (Astro 6, despliegue Vercel)  
**Dominio de producción:** `https://rimobyte.com`  
**Método:** Revisión estática de implementación técnica, metadatos, datos estructurados, arquitectura de URLs y contenido indexable. No incluye mediciones en vivo (Core Web Vitals, Search Console, backlinks).

---

## Actualización — corrección SEO integral (junio 2026)

Intervención aplicada en código para unificar posicionamiento, metadatos y schema:

| Hallazgo resuelto | Acción |
|-------------------|--------|
| OG desincronizadas respecto al HTML | Fuente única `src/data/staticPageSeo.ts` + `scripts/generate-og-images.ts` refactorizado |
| Posicionamiento mixto diseño vs desarrollo | Defaults en `Base.astro`, home/servicios/sobre-mi alineados a «desarrollo web WordPress» |
| Precios inconsistentes (tienda 1.500€, cursos sin schema) | Tienda desde 1.200€, cursos desde 1.000€ en FAQ, copy y `sector.offer` |
| Schema sectorial con precios hardcodeados | Helper `src/lib/seo/sector-ld.ts` (`buildSectorLdGraph`) en las 7 landings |
| Shopify en copy de tienda online | Eliminado de `services.ts`; solo WooCommerce |
| FAQPage ausente en `/servicios/` y `/contacto/` | JSON-LD añadido desde `hubFaqs` y `contactFaqEntries` |
| Title sobre-mi demasiado largo | Acortado en `staticPageSeo` (~60 caracteres) |
| Alt vacío en avatar de artículos | `HeroArticulo.astro`: alt descriptivo |
| Fallback Maps genérico en testimonios | `PUBLIC_GBP_URL` o búsqueda de marca |

**Inventario actualizado:** 5 artículos de blog, 7 landings sectoriales (`web-para-*`), 3 fichas de servicio, hub `/servicios/`.

**Pendiente operativo (no código):** regenerar OG en CI (`pnpm images:og`), configurar `PUBLIC_LINKEDIN_URL` / `PUBLIC_GBP_URL` en Vercel, Search Console y medición CWV en producción.

---

## Resumen ejecutivo

RimoByte v2 tiene una **base SEO técnica sólida** para un sitio de servicios profesional: metadatos centralizados, canonical y Open Graph en todas las páginas, sitemap XML automático, redirecciones 301 desde URLs legacy, datos estructurados amplios (Person, LocalBusiness, Service, FAQPage, BlogPosting, BreadcrumbList) y buenas prácticas de accesibilidad que también benefician al SEO (un solo `<h1>`, `lang="es"`, skip link).

Los principales puntos de mejora son de **consistencia y oportunidad**, no de fallos graves:

| Prioridad | Hallazgo |
|-----------|----------|
| Alta | Inconsistencia `trailingSlash: 'ignore'` vs enlaces internos y documentación con barra final |
| Media | Títulos demasiado largos o demasiado cortos en algunas páginas clave |
| Media | Página sectorial `/web-para-restaurantes/` poco enlazada desde la arquitectura principal |
| Media | Sitemap sin fechas `lastmod` |
| Baja | Imágenes de tarjetas de proyecto sin `width`/`height` (riesgo CLS) |
| Baja | Breadcrumb JSON-LD de servicios apunta a ancla `/#servicios` en lugar de URL dedicada |

**Valoración global estimada:** 8/10 en SEO técnico on-site. El techo actual lo marcan factores externos (autoridad, backlinks, datos de Search Console) y la profundidad del blog (4 artículos).

---

## 1. ¿Qué cubre una auditoría SEO?

Una auditoría SEO completa analiza todos los factores que influyen en **rastreo, indexación, relevancia y experiencia de página** ante buscadores. No se limita a “tener meta description”.

### 1.1 Áreas habituales

| Área | Qué se evalúa | Aplicable a este proyecto |
|------|---------------|---------------------------|
| **SEO técnico** | HTTPS, robots.txt, sitemap, canonical, redirecciones, URLs, indexabilidad, errores 4xx/5xx | ✓ Revisado en código |
| **On-page** | `<title>`, meta description, jerarquía H1–H6, densidad semántica, contenido único | ✓ Revisado |
| **Datos estructurados** | JSON-LD (Schema.org), elegibilidad para rich results | ✓ Revisado |
| **Imágenes** | Alt, formato, peso, dimensiones, lazy load | ✓ Revisado |
| **Enlaces internos** | Arquitectura, anchor text, páginas huérfanas, breadcrumbs | ✓ Revisado |
| **Internacional** | `hreflang`, `lang`, mercado objetivo | ✓ Sitio monolingüe ES |
| **Mobile** | Viewport, responsive, tap targets | ✓ Parcial (código) |
| **Page experience** | Core Web Vitals (LCP, INP, CLS), rendimiento | ⚠ Requiere medición en producción |
| **Off-page** | Backlinks, menciones, autoridad de dominio | ✗ Fuera de alcance |
| **Contenido** | Calidad, intención de búsqueda, frescura, cobertura temática | ✓ Revisión cualitativa |
| **Monitorización** | Search Console, Analytics, errores de rastreo | ⚠ Requiere acceso a cuentas |

### 1.2 Criterios de priorización usados en este informe

- **Crítico:** Impide indexación o genera contenido duplicado grave.
- **Alta:** Reduce visibilidad en SERP o diluye señales en páginas money.
- **Media:** Mejora incremental con buen retorno.
- **Baja:** Pulido o validación externa recomendada.

---

## 2. Inventario indexable

Tras `pnpm build`, el sitemap (`sitemap-index.xml` → `sitemap-0.xml`) incluye **24 URLs**:

| Tipo | URLs |
|------|------|
| Home | `/` |
| Servicios | `/servicios/web-corporativa/`, `/servicios/tienda-online/`, `/servicios/mantenimiento-web/` |
| Sector | 7 landings: restaurantes, peluquerías, asesorías, entrenadores, cursos, psicólogos, inmobiliarias |
| Proyectos | `/proyectos/` + 9 casos |
| Blog | `/blog/` + 5 artículos |
| Institucional | `/sobre-mi/`, `/contacto/` |
| Legal | `/politica-privacidad/`, `/politica-cookies/` |

**Excluidas correctamente del sitemap:** `/404`, `/api/contact`, `/og.png` (ruta dinámica OG).

**Redirecciones 301 legacy** (14 rutas en `vercel.json` + `src/middleware.ts`): cubren URLs antiguas del sitemap de producción anterior y evitan pérdida de equity al migrar a v2.

---

## 3. SEO técnico

### 3.1 Fortalezas

| Elemento | Estado | Implementación |
|----------|--------|----------------|
| HTTPS | ✓ | `site: 'https://rimobyte.com'` en `astro.config.mjs` |
| robots.txt | ✓ | `Allow: /` + referencia a `sitemap-index.xml` |
| Sitemap XML | ✓ | `@astrojs/sitemap` genera índice en build |
| Canonical | ✓ | `<link rel="canonical">` en `Base.astro` |
| Meta robots | ✓ | `index, follow, max-image-preview:large` por defecto |
| 404 | ✓ | `noindex, nofollow` en `404.astro` |
| Redirecciones SEO | ✓ | 301 para URLs legacy indexadas |
| Prerender estático | ✓ | Páginas de contenido pre-renderizadas; solo API/formulario en serverless |

### 3.2 Hallazgos

#### Alta — Trailing slash (implementado jun 2026)

- **Config:** `trailingSlash: 'ignore'` en `astro.config.mjs`.
- **Redirect:** middleware 301 en [`src/middleware.ts`](../src/middleware.ts) (`needsTrailingSlashRedirect`).
- **Canonical:** normalizada con barra en [`src/lib/url.ts`](../src/lib/url.ts) + [`Base.astro`](../src/layouts/Base.astro).

#### Media — Sitemap sin `lastmod`

El sitemap generado solo incluye `<loc>`. No hay `<lastmod>`, lo que dificulta a Google priorizar recrawls tras actualizaciones de blog o proyectos.

**Recomendación:** Configurar `@astrojs/sitemap` con `serialize` o `lastmod` derivado de fechas de contenido (blog `updatedDate`, proyectos `date`).

#### Baja — robots.txt no bloquea `/api/`

No es un problema grave (la API no está en el sitemap), pero es buena práctica añadir `Disallow: /api/` para evitar rastreo innecesario.

#### Baja — Cabeceras de seguridad

No hay `headers` en `vercel.json` (HSTS, `X-Content-Type-Options`, etc.). Vercel aplica HTTPS, pero cabeceras explícitas refuerzan señales de confianza.

---

## 4. On-page SEO

### 4.1 Metadatos por página

Todos los layouts y páginas pasan `title` y `description` únicos a `Base.astro`. Valores por defecto razonables si faltan props.

| Página | Title (car.) | Description (car.) | Valoración |
|--------|--------------|-------------------|------------|
| Home | 57 | 136 | ✓ Buen equilibrio |
| Sobre mí | **73** | 164 | ⚠ Title puede truncarse (~60) |
| Web corporativa | 48 | 157 | ✓ |
| Tienda online | ~45 | ~150 | ✓ |
| Mantenimiento | ~45 | ~150 | ✓ |
| Blog índice | 46 | 137 | ✓ |
| Proyectos índice | ~48 | variable | ✓ |
| Contacto | **19** | 112 | ⚠ Title muy corto; poca keyword |
| Web restaurantes | ~48 | ~150 | ✓ |
| Artículos blog | título + `· RimoByte` | del frontmatter | ✓ |
| Casos proyecto | nombre + `— Caso de éxito · RimoByte` | generada | ✓ |
| 404 | — | — | ✓ noindex |

**Recomendaciones:**

- **Sobre mí:** Acortar title (~55–60 car.), p. ej. `Flor Rímolo — Diseñadora web freelance · RimoByte`.
- **Contacto:** Enriquecer title, p. ej. `Contacto — Presupuesto web para negocios locales · RimoByte`.

### 4.2 Jerarquía de encabezados

| Página | H1 | Notas |
|--------|-----|-------|
| Home | `Hero.astro` | ✓ Un solo H1 |
| Servicios | `HeroServicio.astro` | ✓ |
| Blog post | `HeroArticulo.astro` | ✓; contenido MD usa H2+ |
| Proyecto | `HeroProyecto.astro` | ✓ |
| Contacto | `ContactForm` con `headingLevel={1}` | ✓ |
| 404 | H1 propio | ✓ |
| Legal | `LegalDocument.astro` | ✓ |

Las FAQ usan `<details>/<summary>` sin H2/H3. Aceptable para UX; el contenido de preguntas está cubierto por JSON-LD `FAQPage`.

### 4.3 Open Graph y Twitter Cards

Implementados en `Base.astro`:

- `og:type`, `og:title`, `og:description`, `og:image` (1200×630), `og:locale` (`es_ES`), `og:url`
- Artículos: `article:published_time` y `article:modified_time`
- Twitter: `summary_large_image`

**OG images:** `resolveOgImage()` sirve PNG pre-generados en `/assets/og/` para páginas con imagen por defecto; blog y proyectos usan imágenes propias. Ruta dinámica `/og.png` existe como fallback serverless.

**Mejora opcional:** Añadir `twitter:site` o `twitter:creator` si hay cuenta activa de marca.

---

## 5. Datos estructurados (JSON-LD)

### 5.1 Cobertura actual

| Tipo | Dónde |
|------|-------|
| `Person` + `LocalBusiness` | Home y `/sobre-mi/` (con `aggregateRating` si hay API Google Places) |
| `WebSite` | Resto de páginas vía `Base.astro` |
| `FAQPage` | Home, 3 servicios, `/web-para-restaurantes/` |
| `Service` + `Offer` | Páginas de servicio y sector restaurantes |
| `BreadcrumbList` | Servicios, sector, blog, proyectos |
| `BlogPosting` | Artículos del blog |
| `Article` | Casos de proyecto |
| `ContactPage` | `/contacto/` |

### 5.2 Fortalezas

- Uso consistente de `@graph` donde hay múltiples entidades.
- Blog con `wordCount`, `keywords`, autor, publisher con logo.
- Precios en `Offer` alineados con copy comercial (desde 600€ / 1.200€).

### 5.3 Hallazgos

| Prioridad | Hallazgo | Detalle |
|-----------|----------|---------|
| Media | Breadcrumb “Servicios” | Apunta a `https://rimobyte.com/#servicios` (ancla en home). Google prefiere URLs reales; no existe `/servicios/` como hub. |
| Media | `aggregateRating` condicional | Solo si `GOOGLE_PLACES_API_KEY` y `GOOGLE_PLACES_PLACE_ID` están configurados en build. Sin ellas, se pierde rich result de estrellas en home/sobre-mi. |
| Baja | `sameAs` vacío sin env | `PUBLIC_INSTAGRAM_URL`, `PUBLIC_LINKEDIN_URL`, `PUBLIC_GBP_URL` opcionales. Recomendable configurarlos en producción. |
| Baja | Testimonios sin `Review` | Las reseñas en UI no tienen schema `Review` individual; solo agregado vía Places cuando hay API. |

**Validación recomendada:** [Rich Results Test](https://search.google.com/test/rich-results) y [Schema Validator](https://validator.schema.org/) por URL representativa (home, un servicio, un artículo, un proyecto).

---

## 6. Arquitectura de URLs y enlazado interno

### 6.1 Fortalezas

- URLs legibles, en minúsculas, con guiones: `/servicios/web-corporativa/`, `/blog/cuanto-cuesta-una-pagina-web/`.
- Slugs alineados con keywords objetivo del negocio.
- Blog enlaza a servicios y landing sectorial con anchor descriptivo.
- Navbar y footer enlazan a hubs principales (proyectos, blog, sobre mí, contacto).
- Posts relacionados (`relatedSlugs`) y casos vinculados desde servicios.

### 6.2 Hallazgos

#### Media — Landing sectorial poco visible

`/web-para-restaurantes/` está en el sitemap y enlazada desde el artículo de nicho, pero **no aparece en navbar ni footer**. Para una página money de sector, conviene al menos un enlace contextual desde servicios, home o footer (“Sectores” / “Restaurantes”).

#### Baja — Sin hub `/servicios/`

Los tres servicios existen como páginas independientes; el breadcrumb schema usa ancla en home. Valorar una página índice `/servicios/` a futuro si crece la oferta sectorial.

---

## 7. Imágenes y multimedia

### 7.1 Fortalezas

- Formato WebP en brand, proyectos y blog.
- Scripts `pnpm images:blog` y `pnpm images:projects` generan variantes responsive.
- `alt` descriptivos en componentes principales (hero, tarjetas, blog).
- `loading="lazy"` en imágenes below-the-fold; `fetchpriority="high"` en hero de artículos.
- `width`/`height` en muchos componentes (blog hero, service cards, sobre-mi).

### 7.2 Hallazgos

| Prioridad | Hallazgo |
|-----------|----------|
| Media | `ProjectCard.astro`: `<img>` sin `width` ni `height` → posible CLS |
| Baja | Algunas capturas de proyecto comparten ratio variable; conviene fijar dimensiones intrínsecas o `aspect-ratio` en CSS |

---

## 8. Contenido y estrategia

### 8.1 Estado actual

- **5 artículos** con frontmatter SEO (`keywords`, `type`, `description`, CTAs a servicios).
- Temas alineados con funnel: precio, propiedad de la web, Instagram vs web, restaurantes, asesorías.
- Copy en español, tono conversacional, E-E-A-T reforzado en `/sobre-mi/`.

### 8.2 Oportunidades (fuera de código)

| Área | Recomendación |
|------|---------------|
| Profundidad | Ampliar blog con guías long-tail (mantenimiento, WooCommerce, sectores adicionales) |
| Intención local | Reforzar “Barcelona / España” donde sea natural sin keyword stuffing |
| Frescura | Usar `updatedDate` en posts revisados y reflejarlo en sitemap `lastmod` |
| Conversión SEO | Mantener CTAs internos hacia `/contacto/` y páginas de servicio |

---

## 9. Mobile e internacional

| Elemento | Estado |
|----------|--------|
| `<meta name="viewport">` | ✓ `width=device-width, initial-scale=1.0` |
| `<html lang="es">` | ✓ |
| `og:locale` | ✓ `es_ES` |
| `hreflang` | N/A — sitio monolingüe |
| PWA manifest | ✓ `site.webmanifest` (favicons; `display: browser`) |

Responsive vía Tailwind; tap targets razonables en navegación y botones CTA.

---

## 10. Page experience (pendiente de medición)

No se ejecutó Lighthouse ni PageSpeed Insights en esta auditoría. El stack (Astro estático, fuentes autohospedadas, preload de Clash Grotesk, lazy load) es favorable, pero hay que **verificar en producción**:

- **LCP:** Hero e imágenes above-the-fold
- **INP:** Islands React (FAQ, formulario contacto)
- **CLS:** Tarjetas de proyecto sin dimensiones; fuentes web

**Acción:** Ejecutar [PageSpeed Insights](https://pagespeed.web.dev/) y Lighthouse (pestaña SEO) en home, un servicio y un artículo.

---

## 11. Monitorización y off-page (fuera de código)

| Tarea | Estado |
|-------|--------|
| Google Search Console verificado | No comprobable desde repo |
| Sitemap enviado en GSC | Recomendado post-deploy |
| Monitorizar cobertura e indexación | Continuo |
| Perfil Google Business + reseñas | API opcional ya integrada |
| Backlinks y menciones | Estrategia de contenido + casos de éxito |

---

## 12. Checklist consolidado

### Crítico
- [x] HTTPS en dominio de producción
- [x] robots.txt permite rastreo
- [x] Páginas importantes sin `noindex`
- [x] Title único por página
- [x] Un solo `<h1>` por página

### Alta prioridad
- [x] Meta descriptions presentes
- [x] **Trailing slash unificado** (middleware 301 + canonical en `Base.astro`)
- [x] Canonical en todas las páginas
- [x] Sitemap generado
- [ ] **Search Console + envío de sitemap** (operativo — post-deploy)
- [ ] **Core Web Vitals medidos en producción** (post-deploy)

### Media prioridad
- [x] Datos estructurados implementados
- [x] Ajustar titles de sobre-mi y contacto
- [x] Enlazar `/web-para-restaurantes/` desde footer
- [x] Añadir `lastmod` al sitemap
- [x] Alt text en imágenes principales
- [x] Dimensiones en `ProjectCard`

### Baja prioridad
- [x] `Disallow: /api/` en robots.txt
- [x] Cabeceras de seguridad en Vercel
- [ ] `twitter:site` / perfiles `sameAs` en producción (env en Vercel)
- [x] Hub `/servicios/` + breadcrumb con URL real
- [ ] Schema `Review` para testimonios individuales

---

## 13. Plan de acción sugerido (orden)

1. **Unificar trailing slash** — cambio de config + verificación de canonical en staging.
2. **Ajustar titles** de contacto y sobre-mi.
3. **Enlazar landing de restaurantes** desde footer o bloque “Sectores” en servicios.
4. **Configurar variables** `PUBLIC_*` y Google Places en producción para `sameAs` y `aggregateRating`.
5. **Añadir `width`/`height`** a imágenes de `ProjectCard`.
6. **Extender sitemap** con `lastmod`.
7. **Validar** rich results y ejecutar Lighthouse en URLs clave.
8. **Registrar** sitemap en Search Console y revisar cobertura a las 2–4 semanas.

---

## 14. Referencias

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- Skill interno: [`.agents/skills/seo/SKILL.md`](../.agents/skills/seo/SKILL.md)
- Guía del proyecto: [`AGENTS.md`](../AGENTS.md) (SEO, sitemap, trailing slash)
- Implementación base: [`src/layouts/Base.astro`](../src/layouts/Base.astro)

---

*Auditoría generada a partir del estado del repositorio en junio de 2026. Los hallazgos de rendimiento y indexación en vivo deben contrastarse con herramientas externas tras cada despliegue significativo.*

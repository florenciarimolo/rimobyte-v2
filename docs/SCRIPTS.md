# Scripts del proyecto

Referencia de los comandos definidos en [`package.json`](../package.json): qué hace cada uno, cuándo ejecutarlo y qué archivos genera o modifica.

Los scripts Node personalizados viven en [`scripts/`](../scripts/).

## Índice

- [Desarrollo y build](#desarrollo-y-build)
- [Lint de clases Tailwind](#lint-de-clases-tailwind)
- [Imágenes del portfolio](#imágenes-del-portfolio)
- [Imágenes del blog](#imágenes-del-blog)
- [Favicons](#favicons)
- [Open Graph estáticas](#open-graph-estáticas)
- [Resumen rápido](#resumen-rápido)

---

## Desarrollo y build

| Comando | Cuándo | Qué hace |
|---------|--------|----------|
| `pnpm dev` | Trabajo diario en el sitio | Servidor local con recarga (por defecto `http://localhost:4321`). |
| `pnpm build` | Antes de deploy o para validar producción | Ejecuta `prebuild` (favicons, imágenes proyecto/blog, OG PNG) y genera el sitio en `dist/`. |
| `pnpm preview` | Tras `pnpm build` | Sirve `dist/` como en producción. |
| `pnpm check` | Antes de un PR o tras cambios de tipos | `astro check`: errores TypeScript y de componentes `.astro`. |
| `pnpm astro` | Casos puntuales de CLI | Acceso directo al binario de Astro (p. ej. `pnpm astro add …`). |

El hook **`prebuild`** de `pnpm build` ejecuta en orden: `pnpm images:favicons` → `images:projects` → `images:blog` → `images:og`. Para iterar rápido solo en Astro puedes usar `pnpm astro build` (sin regenerar assets); en CI y antes de deploy usa `pnpm build`.

No hace falta volver a ejecutar `dev` o `build` solo porque hayas regenerado imágenes: basta con commitear los `.webp` nuevos. Sí conviene `pnpm check` si tocaste código además de assets.

---

## Lint de clases Tailwind

**Comando:** `pnpm lint:classes`  
**Script:** [`scripts/lint-tailwind-classes.mjs`](../scripts/lint-tailwind-classes.mjs)

### Cuándo ejecutarlo

- Antes de abrir un pull request.
- Al editar clases en archivos `.astro` o `.tsx`.
- Si el editor (Tailwind CSS IntelliSense) marca clases como `text-(--color-text-secondary)` en lugar de utilidades del tema.

### Qué hace

- Recorre `src/**/*.astro` y `src/**/*.tsx`.
- Falla (código de salida `1`) si encuentra clases con sintaxis arbitraria de token: `text-(--…`, `bg-(--…`, `border-(--…`, `font-(--…`.
- Espera utilidades generadas desde `@theme` en `src/styles/global.css`, por ejemplo `text-text-secondary`, `bg-bg-base`, `font-display`.

**No modifica archivos** — solo lista infracciones.

Convención completa en [`AGENTS.md`](../AGENTS.md) (sección Tailwind) y [`docs/DESIGN.md`](DESIGN.md).

---

## Imágenes del portfolio

**Comando:** `pnpm images:projects`  
**Script:** [`scripts/generate-project-images.mjs`](../scripts/generate-project-images.mjs)  
**Dependencia:** [sharp](https://sharp.pixelplumbing.com/)

### Cuándo ejecutarlo

- Después de añadir o sustituir una captura en `public/assets/projects/{nombre}.webp`.
- Al dar de alta un **proyecto nuevo**: el `{nombre}` debe estar en la lista `bases` del script **y** en [`src/data/projectImages.ts`](../src/data/projectImages.ts) (`projectImageBaseBySlug`).

### Entrada y salida

**Entrada:** `public/assets/projects/{nombre}.webp` (una imagen maestra por proyecto).

**Salida** en `public/assets/projects/generated/`:

| Archivo | Uso en el sitio |
|---------|-----------------|
| `{nombre}-w400.webp` | Srcset en tarjetas (viewport pequeño) |
| `{nombre}-w800.webp` | Srcset en tarjetas (viewport grande) |

Parámetros: WebP calidad 82, redimensionado sin ampliar por encima del original (`withoutEnlargement: true`).

### Después del script

1. Commitear el `.webp` maestro si cambió.
2. Commitear los archivos nuevos o actualizados en `generated/`.
3. El sitio resuelve rutas vía `projectImages.ts` y los componentes de portfolio/home.

---

## Imágenes del blog

**Comando:** `pnpm images:blog`  
**Script:** [`scripts/generate-blog-images.mjs`](../scripts/generate-blog-images.mjs)  
**Dependencia:** sharp

### Cuándo ejecutarlo

- Al crear un post con portada: coloca la imagen fuente en `public/assets/blog/` con el **mismo slug** que el archivo en `src/content/blog/` (p. ej. `cuanto-cuesta-una-pagina-web.jpg`).
- Al cambiar la portada de un post ya publicado.

### Comandos

```bash
# Procesa todas las fuentes en public/assets/blog/
pnpm images:blog

# Solo un post
pnpm images:blog -- --slug=cuanto-cuesta-una-pagina-web
```

### Entrada

- `public/assets/blog/{slug}.jpg`, `.jpeg` o `.png` (recomendado para fotos nuevas).
- También acepta `{slug}.webp` como fuente (no borra el original en ese caso). El script lee el archivo en memoria antes de escribir el maestro `{slug}.webp`, para poder sobrescribir WebP→WebP sin conflicto en sharp.

### Salida (por slug)

| Archivo | Uso |
|---------|-----|
| `public/assets/blog/{slug}.webp` | Campo `coverImage` en el frontmatter del post |
| `generated/{slug}-card-w400.webp` | Card del índice de blog (recorte 16:10) |
| `generated/{slug}-card-w800.webp` | Card del índice (mayor densidad) |
| `generated/{slug}-hero-w1600.webp` | Fondo del hero del artículo |
| `generated/{slug}-og.webp` | Imagen Open Graph 1200×630 |

El script aplica la rotación EXIF. Si la fuente era JPG o PNG, **elimina el original** tras generar los WebP.

### Después del script

1. En el Markdown del post, asegurar:
   ```yaml
   coverImage: "/assets/blog/{slug}.webp"
   ```
2. Commitear `{slug}.webp` y todo `public/assets/blog/generated/` de ese slug.
3. Rutas tipadas en [`src/data/blogImages.ts`](../src/data/blogImages.ts) (`blogCoverPath`, `blogCardSrcset`, `blogHeroPath`, `blogOgPath`).

---

## Favicons

**Comando:** `pnpm images:favicons`  
**Script:** [`scripts/generate-favicons.mjs`](../scripts/generate-favicons.mjs)  
**Dependencias:** [sharp](https://sharp.pixelplumbing.com/), [png-to-ico](https://www.npmjs.com/package/png-to-ico)

### Cuándo ejecutarlo

- Parte del `prebuild` en cada `pnpm build`.
- Manualmente si cambias [`public/favicon.svg`](../public/favicon.svg).

### Salida en `public/` (gitignored salvo `favicon.svg`)

`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`. Referenciados desde [`src/layouts/Base.astro`](../src/layouts/Base.astro) y [`public/site.webmanifest`](../public/site.webmanifest).

---

## Open Graph estáticas

**Comando:** `pnpm images:og`  
**Script:** [`scripts/generate-og-images.ts`](../scripts/generate-og-images.ts) (ejecutar con `tsx`)  
**Dependencias:** sharp, satori (vía [`src/lib/og/generate.ts`](../src/lib/og/generate.ts))

### Cuándo ejecutarlo

- Parte del `prebuild` en cada `pnpm build`.
- Manualmente tras cambiar título/description SEO de páginas que usan la imagen OG por defecto (no posts ni fichas de proyecto, que llevan `.webp` propios).

### Salida

PNG 1200×630 en `public/assets/og/{basename}.png` (lista en el propio script). El basename coincide con [`pathnameToOgBasename`](../src/lib/og/url.ts). Rutas indexables del blog y proyectos **no** generan PNG aquí (usan capturas/portadas).

La ruta dinámica [`src/pages/og.png.ts`](../src/pages/og.png.ts) sigue disponible como respaldo en desarrollo.

---

## Resumen rápido

| Necesitas… | Ejecuta |
|------------|---------|
| Desarrollar el sitio | `pnpm dev` |
| Validar tipos y Astro | `pnpm check` |
| Revisar clases Tailwind vs tokens del tema | `pnpm lint:classes` |
| Nueva o cambiada captura de proyecto | `pnpm images:projects` |
| Nueva o cambiada portada de blog | `pnpm images:blog` (opcional `--slug=…`) |
| Regenerar favicons desde `favicon.svg` | `pnpm images:favicons` |
| Regenerar carteles OG (páginas con retrato por defecto) | `pnpm images:og` |
| Probar build de producción completo | `pnpm build` → `pnpm preview` |

## Assets relacionados

| Carpeta | Script | Documentación de diseño |
|---------|--------|-------------------------|
| `public/assets/projects/` | `images:projects` | [`AGENTS.md`](../AGENTS.md) |
| `public/assets/blog/` | `images:blog` | [`AGENTS.md`](../AGENTS.md) |
| `public/assets/og/` | `images:og` | [`src/lib/og/url.ts`](../src/lib/og/url.ts) |
| `public/assets/fonts/clash-grotesk/` | — (woff2 versionados en repo; licencia Fontshare) | [`docs/DESIGN.md`](DESIGN.md), [`src/styles/global.css`](../src/styles/global.css) |
| Raíz `public/` (favicons PNG/ICO) | `images:favicons` | Este doc |
| `public/assets/brand/` | — (manual) | [`docs/DESIGN.md`](DESIGN.md) |

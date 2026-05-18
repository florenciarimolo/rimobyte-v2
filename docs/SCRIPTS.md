# Scripts del proyecto

Referencia de los comandos definidos en [`package.json`](../package.json): qué hace cada uno, cuándo ejecutarlo y qué archivos genera o modifica.

Los scripts Node personalizados viven en [`scripts/`](../scripts/).

## Índice

- [Desarrollo y build](#desarrollo-y-build)
- [Lint de clases Tailwind](#lint-de-clases-tailwind)
- [Imágenes del portfolio](#imágenes-del-portfolio)
- [Imágenes del blog](#imágenes-del-blog)
- [Resumen rápido](#resumen-rápido)

---

## Desarrollo y build

| Comando | Cuándo | Qué hace |
|---------|--------|----------|
| `pnpm dev` | Trabajo diario en el sitio | Servidor local con recarga (por defecto `http://localhost:4321`). |
| `pnpm build` | Antes de deploy o para validar producción | Genera el sitio en `dist/`. |
| `pnpm preview` | Tras `pnpm build` | Sirve `dist/` como en producción. |
| `pnpm check` | Antes de un PR o tras cambios de tipos | `astro check`: errores TypeScript y de componentes `.astro`. |
| `pnpm astro` | Casos puntuales de CLI | Acceso directo al binario de Astro (p. ej. `pnpm astro add …`). |

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
- También acepta `{slug}.webp` como fuente (no borra el original en ese caso).

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

## Resumen rápido

| Necesitas… | Ejecuta |
|------------|---------|
| Desarrollar el sitio | `pnpm dev` |
| Validar tipos y Astro | `pnpm check` |
| Revisar clases Tailwind vs tokens del tema | `pnpm lint:classes` |
| Nueva o cambiada captura de proyecto | `pnpm images:projects` |
| Nueva o cambiada portada de blog | `pnpm images:blog` (opcional `--slug=…`) |
| Probar build de producción | `pnpm build` → `pnpm preview` |

## Assets relacionados

| Carpeta | Script | Documentación de diseño |
|---------|--------|-------------------------|
| `public/assets/projects/` | `images:projects` | [`AGENTS.md`](../AGENTS.md) |
| `public/assets/blog/` | `images:blog` | [`AGENTS.md`](../AGENTS.md) |
| `public/assets/brand/` | — (manual) | [`docs/DESIGN.md`](DESIGN.md) |

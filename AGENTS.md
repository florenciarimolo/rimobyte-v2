# RimoByte v2 — Guía para agentes

Sitio de **Flor Rímolo** (rimobyte.com): Astro 6 + Tailwind 4 + React islands (FAQ, formulario de contacto).

## Jerarquía de fuentes

1. [`docs/DESIGN.md`](docs/DESIGN.md) — diseño visual, tokens, componentes
2. Código en `src/` — implementación actual
3. [`.agents/skills/`](.agents/skills/) — checklists técnicos (SEO, a11y, rendimiento, API)

No contradigas `DESIGN.md` sin motivo explícito del usuario.

## Comandos

```bash
pnpm dev              # servidor de desarrollo (Astro)
pnpm build            # build de producción
pnpm check            # TypeScript + comprobación Astro
pnpm preview          # sirve el build local
pnpm lint:classes     # lint de clases Tailwind
pnpm images:projects  # variantes WebP del portfolio
pnpm images:blog      # variantes WebP del blog
```

Detalle de cuándo y cómo ejecutar cada script: [`docs/SCRIPTS.md`](docs/SCRIPTS.md).

## Stack

- **Astro 6** + `@astrojs/vercel` (API `/api/contact` con `prerender = false`)
- **Tailwind 4** vía `@tailwindcss/vite` (tokens en `src/styles/global.css`, sin `tailwind.config.js`)
- **React 19** solo en islands interactivos
- **TypeScript** estricto
- **pnpm** — Node `>=22.12.0`
- `site`: `https://rimobyte.com` en `astro.config.mjs`

## Convenciones

### Assets estáticos (`public/`)

Todo el media va bajo `public/assets/` (no usar `public/img/`):

| Ruta | Contenido |
|------|-----------|
| `assets/brand/` | Imágenes de marca y retratos (ej. `flor-rimobyte.webp`) |
| `assets/projects/` | Capturas de portfolio; variantes en `generated/` vía `pnpm images:projects` |
| `assets/blog/` | Portadas de posts; fuente JPG/PNG o WebP; variantes en `generated/` vía `pnpm images:blog` |

Favicons y `robots.txt` permanecen en la raíz de `public/`.

### Tailwind 4 (`@theme` en `global.css`)

Los tokens `--color-*` y `--font-*` generan utilidades automáticas. **No uses** sintaxis arbitraria en `class`:

| Evitar | Usar |
|--------|------|
| `text-(--color-text-secondary)` | `text-text-secondary` |
| `text-(--color-text-muted)` | `text-text-muted` |
| `text-(--color-blue)` | `text-blue` |
| `bg-(--color-bg-base)` | `bg-bg-base` |
| `border-(--color-border-default)` | `border-border-default` |
| `font-(--font-display)` | `font-display` |

En estilos inline de React (`style={{ color: 'var(--color-blue)' }}`) sí usa `var()`.

**Ver todos los avisos:** extensión [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) en Cursor (subraya clases mejorables). **CI/local:** `pnpm lint:classes`.

- Componentes de sección en `src/components/sections/` (`.astro` por defecto)
- UI reutilizable en `src/components/ui/`
- React solo cuando hace falta interactividad (`FAQ`, `ContactForm`)
- Islands React: `client:load` (FAQ, ContactForm); no usar `client:visible` hasta resolver hidratación React 19 en dev
- Datos estáticos o fetch en frontmatter de `.astro`, no en cliente salvo formularios
- Copia y UI en **español**
- No commitear `.env`

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `RESEND_API_KEY` | Envío de emails en `src/pages/api/contact.ts` |
| `RECAPTCHA_SITE_KEY` | Clave pública reCAPTCHA v3 (formulario de contacto) |
| `RECAPTCHA_SECRET_KEY` | Verificación servidor en `/api/contact` |
| `GOOGLE_PLACES_API_KEY` | Reseñas en `src/lib/google-reviews.ts` |

## Cuándo leer cada skill

| Tarea | Skill |
|-------|--------|
| Páginas, layouts, islands, build Astro | [`.agents/skills/astro/SKILL.md`](.agents/skills/astro/SKILL.md) |
| Meta tags, sitemap, structured data | [`.agents/skills/seo/SKILL.md`](.agents/skills/seo/SKILL.md) |
| Formularios, teclado, ARIA, WCAG | [`.agents/skills/accessibility/SKILL.md`](.agents/skills/accessibility/SKILL.md) |
| Estilos Tailwind, responsive | [`.agents/skills/tailwind-css-patterns/SKILL.md`](.agents/skills/tailwind-css-patterns/SKILL.md) |
| Islands React, hidratación, rendimiento | [`.agents/skills/react-best-practices/SKILL.md`](.agents/skills/react-best-practices/SKILL.md) |
| API routes, validación, seguridad | [`.agents/skills/nodejs-backend-patterns/SKILL.md`](.agents/skills/nodejs-backend-patterns/SKILL.md) |
| Deploy / Vercel | [`.agents/skills/deploy-to-vercel/SKILL.md`](.agents/skills/deploy-to-vercel/SKILL.md) |
| Refactor de APIs de componentes React | [`.agents/skills/composition-patterns/SKILL.md`](.agents/skills/composition-patterns/SKILL.md) |

Skills versionados en [`skills-lock.json`](skills-lock.json).

## Reglas Cursor

Ver [`.cursor/rules/`](.cursor/rules/) para reglas activas por tipo de archivo.

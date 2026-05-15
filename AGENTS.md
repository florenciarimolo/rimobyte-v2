# RimoByte v2 — Guía para agentes

Sitio de **Flor Rímolo** (rimobyte.com): Astro 6 + Tailwind 4 + React islands (FAQ, formulario de contacto).

## Jerarquía de fuentes

1. [`docs/DESIGN.md`](docs/DESIGN.md) — diseño visual, tokens, componentes
2. Código en `src/` — implementación actual
3. [`.agents/skills/`](.agents/skills/) — checklists técnicos (SEO, a11y, rendimiento, API)

No contradigas `DESIGN.md` sin motivo explícito del usuario.

## Comandos

```bash
pnpm dev      # astro dev
pnpm build    # astro build
pnpm check    # astro check
pnpm preview  # vista previa de producción
```

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

Favicons y `robots.txt` permanecen en la raíz de `public/`.

- Componentes de sección en `src/components/sections/` (`.astro` por defecto)
- UI reutilizable en `src/components/ui/`
- React solo cuando hace falta interactividad (`FAQ`, `ContactForm`)
- Islands below-the-fold: preferir `client:visible` sobre `client:load`
- Datos estáticos o fetch en frontmatter de `.astro`, no en cliente salvo formularios
- Copia y UI en **español**
- No commitear `.env`

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `RESEND_API_KEY` | Envío de emails en `src/pages/api/contact.ts` |
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

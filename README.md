# RimoByte v2

Sitio web de [rimobyte.com](https://rimobyte.com) — portfolio y servicios de **Flor Rímolo** (diseño y desarrollo web para negocios locales).

## Stack

- [Astro 6](https://astro.build) — páginas estáticas + API serverless en Vercel
- [Tailwind CSS 4](https://tailwindcss.com) — tokens en `src/styles/global.css` (`@theme`, sin `tailwind.config.js`)
- [React 19](https://react.dev) — islands mínimos (FAQ, formulario de contacto)
- TypeScript estricto · **pnpm** · Node `>=22.12.0`

## Requisitos

- Node.js 22.12 o superior
- [pnpm](https://pnpm.io)

## Desarrollo local

```bash
pnpm install
cp .env.example .env   # rellenar con claves reales (ver tabla inferior)
pnpm dev
```

El servidor de desarrollo arranca en `http://localhost:4321`.

## Scripts

| Comando | Descripción |
| :------ | :---------- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción en `./dist/` |
| `pnpm preview` | Vista previa del build |
| `pnpm check` | Comprobación TypeScript + Astro |
| `pnpm lint:classes` | Lint de clases Tailwind (evitar `text-(--color-*)`) |
| `pnpm images:projects` | Genera variantes WebP del portfolio en `public/assets/projects/generated/` |
| `pnpm images:blog` | Genera variantes WebP de imágenes del blog |

Cuándo ejecutar cada uno, entradas/salidas y flujos de imágenes: **[`docs/SCRIPTS.md`](docs/SCRIPTS.md)**.

## Variables de entorno

Crear un `.env` en la raíz (no commitear). Variables usadas en runtime:

| Variable | Uso |
| :------- | :-- |
| `RESEND_API_KEY` | Envío de emails (`/api/contact`) |
| `RECAPTCHA_SITE_KEY` | reCAPTCHA v3 (formulario de contacto) |
| `RECAPTCHA_SECRET_KEY` | Verificación servidor en `/api/contact` |
| `GOOGLE_PLACES_API_KEY` | Reseñas de Google (`src/lib/google-reviews.ts`) |
| `GOOGLE_PLACES_PLACE_ID` | ID del negocio en Google Places |

## Estructura del proyecto

```text
/
├── public/
│   ├── assets/brand/      # Marca y retratos
│   ├── assets/projects/   # Capturas de portfolio
│   └── …                  # Favicons, robots.txt
├── src/
│   ├── components/
│   │   ├── sections/      # Secciones de página (.astro)
│   │   └── ui/            # Componentes reutilizables
│   ├── content/blog/      # Artículos (Markdown)
│   ├── data/              # Proyectos, servicios, FAQ, etc.
│   ├── layouts/           # Base.astro, BlogPost.astro
│   ├── lib/               # OG images, reCAPTCHA, reseñas…
│   ├── pages/             # Rutas y API
│   └── styles/global.css  # Tokens de diseño (@theme)
├── docs/DESIGN.md         # Sistema de diseño
├── docs/SCRIPTS.md        # Comandos pnpm y scripts de imágenes
└── AGENTS.md              # Guía para agentes y convenciones
```

### Rutas principales

| Ruta | Contenido |
| :--- | :-------- |
| `/` | Inicio |
| `/sobre-mi` | Sobre Flor |
| `/proyectos` | Portfolio |
| `/servicios/*` | Web corporativa, tienda online, mantenimiento |
| `/blog` | Blog |
| `/contacto` | Formulario de contacto |
| `/api/contact` | API de contacto (serverless, `prerender = false`) |

## Convenciones rápidas

- **UI y copy en español.**
- React solo donde hace falta interactividad; el resto en `.astro`.
- Media estático en `public/assets/` (no usar `public/img/`).
- Clases Tailwind: usar utilidades del tema (`text-text-secondary`, `bg-bg-base`) — no `text-(--color-*)`.
- Islands React con `client:load` (FAQ, ContactForm).

Detalle completo en [`AGENTS.md`](AGENTS.md), [`docs/DESIGN.md`](docs/DESIGN.md) y [`docs/SCRIPTS.md`](docs/SCRIPTS.md).

## Despliegue

Desplegado en [Vercel](https://vercel.com) con el adaptador `@astrojs/vercel`. El sitio de producción es `https://rimobyte.com` (`site` en `astro.config.mjs`).

```bash
pnpm build
```

## Licencia

Proyecto privado — © Flor Rímolo / RimoByte.

# Cursor Prompt — RimoByte v2
## Setup completo + Home

---

## CONTEXTO

Estás construyendo **rimobyte.com**, el sitio web de Flor Rímolo — ingeniera informática freelance especializada en webs para negocios locales.

El archivo `DESIGN.md` adjunto es la fuente de verdad para todas las decisiones de diseño. Léelo antes de escribir cualquier línea de código.

**Stack:**
- Astro 5 (última versión estable)
- Tailwind CSS 4 via `@tailwindcss/vite` (NO usar `@astrojs/tailwind` — está deprecated)
- React via `@astrojs/react` (solo para islands interactivos: FAQ acordeón, navbar mobile, formulario)
- TypeScript
- pnpm como gestor de paquetes

---

## FASE 1 — REPOSITORIO Y SETUP

### 1.1 Crear repositorio GitHub

```bash
gh repo create rimobyte-v2 --public --description "rimobyte.com — Flor Rímolo, ingeniera web freelance" --clone
cd rimobyte-v2
```

### 1.2 Crear proyecto Astro

```bash
pnpm create astro@latest . --template minimal --typescript strict --no-install --no-git
pnpm install
```

### 1.3 Instalar dependencias

```bash
# Tailwind 4 — vite plugin (NO @astrojs/tailwind)
pnpm add -D tailwindcss @tailwindcss/vite

# React integration
pnpm astro add react

# Tipografías (Fontsource — no CDN, mejor rendimiento)
pnpm add @fontsource-variable/inter

# Utilidades
pnpm add -D prettier prettier-plugin-astro

# Resend — envío de emails del formulario de contacto
pnpm add resend

# Vercel adapter (hybrid: sitio estático + API route serverless para Resend)
pnpm add @astrojs/vercel
```

> Nota sobre Clash Grotesk: Clash Grotesk no está en Fontsource. Se carga desde Fontshare CDN en el layout base. Inter sí se instala via Fontsource para el bundle local.

### 1.4 Configurar `astro.config.mjs`

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // output: 'static' es el default en Astro 6 — output: 'hybrid' fue eliminado en Astro 6
  // Páginas con prerender=false son serverless automáticamente cuando hay adapter
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://rimobyte.com',
});
```

### 1.5 Variables de entorno

Crea `.env` en la raíz del proyecto con tu API key de Resend:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

Asegúrate de que `.env` está en `.gitignore` — nunca subas la API key al repositorio.

En Vercel, añade `RESEND_API_KEY` como variable de entorno en el dashboard del proyecto (Settings → Environment Variables).

---

### 1.6 Guardar `DESIGN.md`

Coloca el archivo `DESIGN.md` adjunto en:

```
docs/DESIGN.md
```

Este archivo es la fuente de verdad del proyecto. Cursor debe referenciarlo siempre.

---

## FASE 2 — DESIGN TOKENS EN TAILWIND 4

Crea `src/styles/global.css`. En Tailwind 4 el `@theme` **reemplaza** al `tailwind.config.js` — toda la paleta, tipografías y espaciados van aquí.

```css
/* src/styles/global.css */
@import "tailwindcss";

/* ─── Fuentes ─── */
@import "@fontsource-variable/inter";

/* ─── Design tokens — RimoByte ─── */
@theme {

  /* Backgrounds */
  --color-bg-base:     #0A0A12;
  --color-bg-elevated: #0F0F1A;
  --color-bg-surface:  #16162A;
  --color-bg-subtle:   #1C1C35;

  /* Text */
  --color-text-primary:   #F0F0F8;
  --color-text-secondary: rgba(240,240,248,0.6);
  --color-text-muted:     rgba(240,240,248,0.35);

  /* Blue — único color de acción */
  --color-blue:        #2B47EC;
  --color-blue-hover:  #1E35D4;
  --color-blue-subtle: rgba(43,71,236,0.12);
  --color-blue-border: rgba(43,71,236,0.25);

  /* Borders */
  --color-border-default: rgba(240,240,248,0.07);
  --color-border-hover:   rgba(240,240,248,0.14);
  --color-border-blue:    rgba(43,71,236,0.3);

  /* Logo gradient — solo para "Byte" y el símbolo */
  --gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);

  /* Tipografías */
  --font-display: 'Clash Grotesk', -apple-system, sans-serif;
  --font-body:    'Inter Variable', -apple-system, sans-serif;
  --font-mono:    'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;

  /* Transiciones */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ─── Base styles ─── */
*, *::before, *::after { box-sizing: border-box; }

html {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body { margin: 0; }

/* Scroll reveal — animación de entrada */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s var(--ease-spring), transform 0.55s var(--ease-spring);
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.reveal:nth-child(2) { transition-delay: 60ms; }
.reveal:nth-child(3) { transition-delay: 120ms; }
.reveal:nth-child(4) { transition-delay: 180ms; }
.reveal:nth-child(5) { transition-delay: 240ms; }

/* Logo gradient text — requiere CSS raw: -webkit-text-fill-color no tiene utilidad Tailwind */
.text-gradient-logo {
  background: var(--gradient-logo);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Eyebrow — componente Tailwind reutilizable */
@layer components {
  .eyebrow {
    @apply inline-flex items-center gap-2 font-[--font-mono] text-[0.7rem] tracking-[0.12em] uppercase text-[--color-blue];
  }
}
```

---

## FASE 3 — ESTRUCTURA DE ARCHIVOS

Crea esta estructura completa antes de escribir código:

```
src/
  components/
    ui/
      Eyebrow.astro
      Button.astro
    sections/
      Navbar.astro
      Hero.astro
      FeaturedCase.astro
      ProjectsStrip.astro
      Stats.astro
      Features.astro
      FeaturedProjects.astro
      Testimonials.astro
      Services.astro
      AboutSnippet.astro
      FAQ.tsx          ← React island (estado)
      ContactForm.tsx  ← React island (estado)
      Footer.astro
  layouts/
    Base.astro
  pages/
    index.astro
    api/
      contact.ts       ← endpoint serverless (Resend); prerender = false
  styles/
    global.css
docs/
  DESIGN.md
public/
  favicon.png
.env                   ← RESEND_API_KEY (no subir al repo)
```

---

## FASE 4 — COMPONENTES BASE

### `src/layouts/Base.astro`

```astro
---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'RimoByte — Diseño web para negocios locales',
  description = 'Flor Rímolo, ingeniera informática freelance. Webs para negocios locales con acompañamiento real y sin letra pequeña.',
} = Astro.props;
---
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title}</title>
  <link rel="icon" type="image/png" href="/favicon.png" />

  <!-- Clash Grotesk via Fontshare (no disponible en Fontsource) -->
  <link rel="preconnect" href="https://api.fontshare.com" />
  <link
    href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap"
    rel="stylesheet"
  />

  <link rel="stylesheet" href="/src/styles/global.css" />
</head>
<body class="bg-[--color-bg-base] text-[--color-text-primary]">
  <slot />

  <!-- Scroll reveal observer -->
  <script>
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  </script>
</body>
</html>
```

### `src/components/ui/Eyebrow.astro`

```astro
---
interface Props {
  text: string;
  class?: string;
}
const { text, class: className = '' } = Astro.props;
---
<span class:list={['eyebrow flex items-center gap-2', className]}>
  <span class="text-[0.5rem] opacity-70">●</span>
  {text}
</span>
```

### `src/components/ui/Button.astro`

```astro
---
interface Props {
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  class?: string;
}
const { href, variant = 'primary', class: className = '' } = Astro.props;

const base = 'inline-flex items-center gap-2 font-[--font-body] text-[0.9375rem] font-semibold rounded-lg cursor-pointer no-underline transition-all duration-200 whitespace-nowrap';

const variants = {
  primary: 'bg-[--color-blue] text-white px-7 py-3.5 border-0 hover:bg-[--color-blue-hover] hover:-translate-y-px active:translate-y-0',
  outline: 'bg-transparent text-[--color-text-primary] px-7 py-3.5 border border-[--color-border-hover] hover:border-[--color-blue-border] hover:bg-[--color-blue-subtle]',
  ghost: 'bg-transparent text-[--color-blue] p-0 border-0 hover:gap-3',
};
---
{href
  ? <a href={href} class:list={[base, variants[variant], className]}><slot /></a>
  : <button class:list={[base, variants[variant], className]}><slot /></button>
}
```

---

## FASE 5 — HOME COMPLETA (`src/pages/index.astro`)

La home tiene 11 secciones + navbar + footer. Construye cada sección como componente independiente e impórtalos en `index.astro`.

### `src/components/sections/Navbar.astro`

Navbar fija con comportamiento scroll:

```astro
---
import Button from '../ui/Button.astro';
---
<header
  id="navbar"
  class="fixed top-0 left-0 right-0 z-50 py-5 transition-all duration-300 border-b border-transparent"
>
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)] flex items-center justify-between">

    <!-- Logo -->
    <a href="/" class="font-[--font-display] font-bold text-[1.375rem] tracking-[-0.03em] no-underline">
      <span class="text-[--color-text-primary]">Rimo</span><span class="text-gradient-logo">Byte</span>
    </a>

    <!-- Nav links (desktop) -->
    <nav class="hidden md:flex items-center gap-8">
      {['Proyectos', 'Servicios', 'Sobre mí', 'Blog'].map((item) => (
        <a
          href={`/${item.toLowerCase().replace(' ', '-').replace('í', 'i')}`}
          class="font-[--font-body] text-sm font-medium text-[--color-text-secondary] no-underline hover:text-[--color-text-primary] transition-colors duration-200"
        >
          {item}
        </a>
      ))}
    </nav>

    <!-- CTA -->
    <Button href="/contacto" variant="primary" class="hidden md:inline-flex">
      Empezar mi web
    </Button>

    <!-- Mobile hamburger (React island) -->
    <button
      id="menu-toggle"
      class="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
      aria-label="Abrir menú"
    >
      <span class="block w-6 h-px bg-[--color-text-primary] transition-all duration-200"></span>
      <span class="block w-6 h-px bg-[--color-text-primary] transition-all duration-200"></span>
      <span class="block w-4 h-px bg-[--color-text-primary] transition-all duration-200"></span>
    </button>
  </div>
</header>

<!-- Mobile menu -->
<div
  id="mobile-menu"
  class="fixed inset-0 z-40 bg-[--color-bg-base] flex flex-col items-center justify-center gap-8 translate-x-full transition-transform duration-300"
>
  {['Proyectos', 'Servicios', 'Sobre mí', 'Blog', 'Contacto'].map((item) => (
    <a
      href={`/${item.toLowerCase().replace(' ', '-').replace('í', 'i')}`}
      class="font-[--font-display] text-3xl font-semibold text-[--color-text-primary] no-underline"
    >
      {item}
    </a>
  ))}
</div>

<script>
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  let open = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('bg-[rgba(10,10,18,0.85)]', 'backdrop-blur-md', 'border-[--color-border-default]');
    } else {
      navbar?.classList.remove('bg-[rgba(10,10,18,0.85)]', 'backdrop-blur-md', 'border-[--color-border-default]');
    }
  });

  toggle?.addEventListener('click', () => {
    open = !open;
    menu?.classList.toggle('translate-x-full', !open);
    menu?.classList.toggle('translate-x-0', open);
  });
</script>
```

---

### SECCIÓN 1 · HERO (`src/components/sections/Hero.astro`)

```astro
---
import Eyebrow from '../ui/Eyebrow.astro';
import Button from '../ui/Button.astro';
---
<section class="relative min-h-screen flex items-center bg-[--color-bg-base] pt-24 pb-20">

  <!-- Textura de fondo: grid de puntos muy sutil -->
  <div
    class="absolute inset-0 pointer-events-none opacity-[0.03]"
    style="background-image: radial-gradient(circle, #F0F0F8 1px, transparent 1px); background-size: 32px 32px;"
    aria-hidden="true"
  ></div>

  <div class="relative max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
    <div class="max-w-[720px]">

      <div class="reveal mb-6">
        <Eyebrow text="DISEÑO WEB · DESARROLLO · ESPAÑA" />
      </div>

      <h1 class="reveal font-[--font-display] font-bold text-[clamp(2.75rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.03em] text-[--color-text-primary] mb-6">
        Muchos negocios acaban pagando por una web que no controlan.
      </h1>

      <p class="reveal font-[--font-body] text-[clamp(1rem,2vw,1.2rem)] leading-[1.75] text-[--color-text-secondary] mb-10 max-w-[600px]">
        Soy Flor, ingeniera informática especializada en desarrollo web. Creo webs para negocios locales con acompañamiento real y sin letra pequeña — tuya desde el primer día.
      </p>

      <div class="reveal flex flex-wrap gap-4 mb-10">
        <Button href="/contacto" variant="primary">Quiero empezar mi web</Button>
        <Button href="#contacto" variant="outline">Tengo dudas, cuéntame más</Button>
      </div>

      <ul class="reveal flex flex-wrap gap-x-6 gap-y-2 list-none p-0 m-0">
        {['Tu web, tu propiedad', 'Sin sorpresas', 'Soporte continuo'].map((item) => (
          <li class="flex items-center gap-2 text-sm text-[--color-text-secondary]">
            <span class="w-1.5 h-1.5 rounded-full bg-[--color-blue] opacity-70 shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>

    </div>
  </div>
</section>
```

---

### SECCIÓN 2 · CASO DESTACADO (`src/components/sections/FeaturedCase.astro`)

```astro
---
import Button from '../ui/Button.astro';
---
<section class="bg-[--color-bg-elevated] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="reveal border-l-[3px] border-[--color-blue] pl-8 md:pl-12 max-w-[800px]">

      <blockquote class="font-[--font-display] font-semibold text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.02em] text-[--color-text-primary] mb-6 m-0">
        "Tengo toda la agenda llena."
      </blockquote>

      <div class="flex flex-col md:flex-row md:items-start gap-6">
        <div class="flex-1">
          <p class="text-base leading-[1.75] text-[--color-text-secondary] mb-4">
            Lucía tenía un centro de manicura en Esparreguera sin presencia online. Hoy sus clientas la encuentran en Google, reservan por la web y su agenda no tiene huecos.
          </p>
          <p class="eyebrow text-[--color-text-muted] mb-6">
            Lucía Martínez · Lucía Nails Art · lucianailsart.com
          </p>
          <Button href="/proyectos/lucia-nails-art" variant="ghost">
            Ver el proyecto <span aria-hidden="true">→</span>
          </Button>
        </div>
      </div>

    </div>
  </div>
</section>
```

---

### SECCIÓN 3 · FRANJA DE PROYECTOS (`src/components/sections/ProjectsStrip.astro`)

```astro
---
const projects = [
  { name: 'Vila i Lancis',         sector: 'Asesoría',          slug: 'vila-i-lancis' },
  { name: 'Lucía Nails Art',       sector: 'Estética',          slug: 'lucia-nails-art' },
  { name: 'SuperCapaces',          sector: 'Plataforma cursos', slug: 'supercapaces' },
  { name: 'Rock Zone Camp',        sector: 'Música',            slug: 'rock-zone-camp' },
  { name: 'Ariadna Vilalta',       sector: 'Ciberpsicóloga',    slug: 'ariadna-vilalta' },
  { name: 'JLG KI',                sector: 'Corporativo',       slug: 'jlg-ki' },
  { name: 'Juancar Garma / RESET7',sector: 'Landing ventas',    slug: 'reset7' },
  { name: 'de Cos',                sector: 'Tienda online',     slug: 'de-cos' },
];
---
<section class="bg-[--color-bg-base] py-[clamp(2.5rem,5vw,4rem)] overflow-hidden">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
      {projects.map((p, i) => (
        <a
          href={`/proyectos/${p.slug}`}
          class="reveal group block rounded-xl bg-[--color-bg-elevated] border border-[--color-border-default] overflow-hidden no-underline hover:border-[--color-border-blue] hover:-translate-y-1 transition-all duration-200"
          style={`transition-delay: ${i * 40}ms`}
        >
          <!-- Placeholder thumb -->
          <div class="aspect-[16/10] bg-[--color-bg-surface] flex items-center justify-center p-4">
            <!-- TODO: reemplazar con captura real del proyecto -->
            <span class="eyebrow text-[--color-text-muted] text-center text-[0.6rem]">{p.name}</span>
          </div>
          <div class="p-3">
            <p class="eyebrow text-[0.6rem] text-[--color-blue] mb-1">{p.sector}</p>
            <p class="font-[--font-display] text-sm font-semibold text-[--color-text-primary] leading-tight">{p.name}</p>
          </div>
        </a>
      ))}
    </div>

  </div>
</section>
```

---

### SECCIÓN 4 · MÉTRICAS (`src/components/sections/Stats.astro`)

```astro
---
const stats = [
  { value: '7',    label: 'Proyectos entregados' },
  { value: '5',    label: 'Sectores distintos' },
  { value: '7 ★', label: 'Reseñas Google' },
  { value: '100%', label: 'Clientes con acceso total' },
];
---
<section class="bg-[--color-bg-elevated] py-[clamp(3rem,6vw,5rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[--color-border-default]">
      {stats.map((s) => (
        <div class="reveal text-center px-6 py-4 md:py-0">
          <p class="font-[--font-display] font-bold text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.03em] text-[--color-text-primary] mb-2">
            {s.value}
          </p>
          <p class="eyebrow text-[--color-text-muted] text-[0.65rem]">
            {s.label.toUpperCase()}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
```

---

### SECCIÓN 5 · DIFERENCIADORES (`src/components/sections/Features.astro`)

```astro
---
import Eyebrow from '../ui/Eyebrow.astro';

const features = [
  {
    num: '01',
    title: 'Hablas conmigo, siempre',
    body: 'No hay intermediarios ni equipos que rotan. Desde el primer mensaje hasta la entrega, soy yo quien diseña, desarrolla y responde. Tú sabes con quién hablas en cada momento.',
  },
  {
    num: '02',
    title: 'Tu web es tuya, sin condiciones',
    body: 'El dominio, el hosting y todos los accesos van a tu nombre desde el primer día. Si decides trabajar con otra persona, puedes hacerlo sin depender de mí para nada.',
  },
  {
    num: '03',
    title: 'Sigo aquí cuando la web ya está',
    body: 'Entrego la web y no desaparezco. Mantenimiento y soporte continuo para que no te preocupes por actualizaciones, seguridad ni problemas técnicos.',
  },
  {
    num: '04',
    title: 'Ingeniera, no diseñadora reconvertida',
    body: 'Graduada en 2019. Cuando hay un problema técnico complejo, lo resuelvo. Tu web está construida con criterio de ingeniería, no solo de estética.',
  },
];
---
<section class="bg-[--color-bg-base] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="mb-12">
      <Eyebrow text="POR QUÉ RIMOBYTE" class="mb-5" />
      <h2 class="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary] max-w-[500px]">
        Lo que me diferencia de una agencia.
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((f) => (
        <div class="reveal group rounded-2xl bg-[--color-bg-elevated] border border-[--color-border-default] p-7 hover:border-[--color-border-blue] hover:bg-[--color-bg-surface] transition-all duration-200">
          <p class="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-[--color-blue] mb-5">
            {f.num}
          </p>
          <h3 class="font-[--font-display] text-lg font-semibold leading-[1.3] tracking-[-0.01em] text-[--color-text-primary] mb-3">
            {f.title}
          </h3>
          <p class="text-[0.9375rem] leading-[1.75] text-[--color-text-secondary]">
            {f.body}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
```

---

### SECCIÓN 6 · PROYECTOS SELECCIONADOS (`src/components/sections/FeaturedProjects.astro`)

```astro
---
import Eyebrow from '../ui/Eyebrow.astro';
import Button from '../ui/Button.astro';

const projects = [
  { name: 'Vila i Lancis',   sector: 'Asesoría',      desc: 'Rediseño completo y recuperación de accesos.', slug: 'vila-i-lancis' },
  { name: 'Lucía Nails Art', sector: 'Estética',      desc: 'Web desde cero con SEO local — primera en Google en su área.', slug: 'lucia-nails-art' },
  { name: 'de Cos',          sector: 'Tienda online', desc: 'Rescate y rediseño — de 10 a 25 ventas mensuales.', slug: 'de-cos' },
];
---
<section class="bg-[--color-bg-base] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <Eyebrow text="PORTFOLIO · 8 PROYECTOS" class="mb-5" />
        <h2 class="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary]">
          Proyectos reales para negocios reales.
        </h2>
      </div>
      <Button href="/proyectos" variant="ghost" class="shrink-0">
        Ver todos <span aria-hidden="true">→</span>
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((p) => (
        <a
          href={`/proyectos/${p.slug}`}
          class="reveal group block rounded-2xl bg-[--color-bg-elevated] border border-[--color-border-default] overflow-hidden no-underline hover:border-[--color-border-blue] hover:-translate-y-1 transition-all duration-300"
        >
          <!-- TODO: reemplazar con captura real -->
          <div class="aspect-[16/10] bg-[--color-bg-surface] flex items-center justify-center">
            <span class="eyebrow text-[--color-text-muted] text-[0.6rem]">{p.name}</span>
          </div>
          <div class="p-5">
            <p class="eyebrow text-[0.65rem] text-[--color-blue] mb-2">{p.sector.toUpperCase()}</p>
            <h3 class="font-[--font-display] text-base font-semibold tracking-[-0.01em] text-[--color-text-primary] mb-2">{p.name}</h3>
            <p class="text-sm text-[--color-text-secondary] leading-relaxed">{p.desc}</p>
          </div>
        </a>
      ))}
    </div>

  </div>
</section>
```

---

### SECCIÓN 7 · TESTIMONIOS (`src/components/sections/Testimonials.astro`)

```astro
---
import Eyebrow from '../ui/Eyebrow.astro';
---
<section class="bg-[--color-bg-elevated] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <Eyebrow text="LO QUE DICEN" class="mb-5" />
    <h2 class="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary] mb-12">
      Lo que dicen quienes ya han trabajado conmigo.
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <!-- Testimonio principal (2 columnas) -->
      <div class="reveal md:col-span-2 relative rounded-2xl bg-[--color-bg-surface] border border-[--color-border-default] p-8">
        <span class="absolute top-4 left-7 font-[--font-display] text-[5rem] font-bold text-[--color-blue] opacity-10 leading-none select-none">"</span>
        <blockquote class="text-base leading-[1.75] text-[--color-text-primary] italic mb-6 m-0">
          "Trabajar con Flor es de las mejores decisiones que he podido hacer, ya no solo por lo profesional y perfeccionista que es… sino por su forma de ser. Siempre estuvo ahí para hacer cualquier videollamada."
        </blockquote>
        <p class="text-sm font-semibold text-[--color-text-primary]">Juan Carlos García</p>
        <p class="eyebrow text-[0.65rem] text-[--color-text-muted] mt-1">ENTRENADOR PERSONAL · JUANCARGARMA.COM</p>
        <div class="flex items-center gap-1 mt-4">
          {Array(5).fill(null).map(() => (
            <span class="text-[--color-blue] text-sm">★</span>
          ))}
          <span class="eyebrow text-[0.65rem] text-[--color-text-muted] ml-2">7 RESEÑAS EN GOOGLE</span>
        </div>
      </div>

      <!-- Testimonio secundario -->
      <div class="reveal relative rounded-2xl bg-[--color-bg-surface] border border-[--color-border-default] p-7">
        <span class="absolute top-4 left-6 font-[--font-display] text-[4rem] font-bold text-[--color-blue] opacity-10 leading-none select-none">"</span>
        <blockquote class="text-sm leading-[1.75] text-[--color-text-primary] italic mb-5 m-0">
          "RimoByte consiguió lo que parecía imposible: que alguien entendiera qué quiero comunicar y lo haga de una forma que me represente."
        </blockquote>
        <p class="text-sm font-semibold text-[--color-text-primary]">Ariadna Vilalta</p>
        <p class="eyebrow text-[0.65rem] text-[--color-text-muted] mt-1">CIBERPSICÓLOGA · ARIADNAVILALTA.COM</p>
      </div>

    </div>
  </div>
</section>
```

---

### SECCIÓN 8 · SERVICIOS (`src/components/sections/Services.astro`)

```astro
---
import Eyebrow from '../ui/Eyebrow.astro';
import Button from '../ui/Button.astro';

const services = [
  {
    title: 'Web corporativa',
    desc: 'Para negocios que quieren existir profesionalmente en internet. Tus clientes te encuentran, entienden lo que ofreces y te contactan.',
    price: 'Desde 600€',
    href: '/servicios/web-corporativa',
  },
  {
    title: 'Tienda online',
    desc: 'Para negocios que quieren vender mientras duermen. Una tienda que funciona las 24 horas, acepta pagos y gestiona pedidos.',
    price: 'Desde 1.200€',
    href: '/servicios/tienda-online',
  },
  {
    title: 'Mantenimiento',
    desc: 'Para quienes no quieren preocuparse por lo técnico. Actualizaciones, seguridad y soporte cuando lo necesitas. Sin permanencia.',
    price: 'Desde 50€/mes',
    href: '/servicios/mantenimiento-web',
  },
];
---
<section class="bg-[--color-bg-base] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <Eyebrow text="SERVICIOS" class="mb-5" />
    <h2 class="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary] mb-12">
      Lo que hago, y lo que te consigue.
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      {services.map((s) => (
        <div class="reveal flex flex-col rounded-2xl bg-[--color-bg-elevated] border border-[--color-border-default] p-7 hover:border-[--color-border-blue] transition-colors duration-200">
          <h3 class="font-[--font-display] text-xl font-semibold tracking-[-0.01em] text-[--color-text-primary] mb-3">{s.title}</h3>
          <p class="text-[0.9375rem] leading-[1.75] text-[--color-text-secondary] flex-1 mb-6">{s.desc}</p>
          <div class="flex items-center justify-between mt-auto">
            <span class="font-[--font-display] font-semibold text-[--color-text-primary]">{s.price}</span>
            <Button href={s.href} variant="ghost">Saber más <span aria-hidden="true">→</span></Button>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
```

---

### SECCIÓN 9 · SOBRE MÍ BREVE (`src/components/sections/AboutSnippet.astro`)

```astro
---
import Button from '../ui/Button.astro';
---
<section class="bg-[--color-bg-elevated] py-[clamp(4rem,8vw,7rem)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      <!-- Foto placeholder -->
      <div class="reveal order-2 md:order-1">
        <!-- TODO: reemplazar con foto real de Flor -->
        <div class="aspect-[4/5] max-w-[380px] mx-auto md:mx-0 rounded-2xl bg-[--color-bg-surface] border border-[--color-border-default] flex items-center justify-center overflow-hidden">
          <div class="text-center">
            <div
              class="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center font-[--font-display] font-bold text-xl text-white"
              style="background: var(--gradient-logo)"
            >
              FR
            </div>
            <p class="eyebrow text-[--color-text-muted] text-[0.6rem]">FOTO DE FLOR</p>
          </div>
        </div>
      </div>

      <!-- Texto -->
      <div class="reveal order-1 md:order-2">
        <p class="text-base leading-[1.75] text-[--color-text-secondary] mb-6">
          Hola, soy Flor. Ingeniera informática graduada en 2019, especializada en desarrollo web. Me hice autónoma porque quería trabajar de otra forma: directamente con el cliente, sin intermediarios, con tiempo para hacer las cosas bien.
        </p>
        <p class="font-[--font-display] text-xl font-medium tracking-[-0.01em] text-[--color-text-primary] mb-8 leading-[1.4]">
          "Me implico en cada proyecto como si fuera mío. Porque mientras trabajamos juntos, lo es."
        </p>
        <Button href="/sobre-mi" variant="ghost">
          Conocerme mejor <span aria-hidden="true">→</span>
        </Button>
      </div>

    </div>
  </div>
</section>
```

---

### SECCIÓN 10 · FAQ (`src/components/sections/FAQ.tsx`)

React island para el acordeón interactivo:

```tsx
// src/components/sections/FAQ.tsx
import { useState } from 'react';

const faqs = [
  {
    q: '¿Cuánto cuesta una web?',
    a: 'Web corporativa desde 600€, tienda online desde 1.200€. Siempre con presupuesto claro antes de empezar — sin sorpresas ni costes ocultos.',
  },
  {
    q: '¿Cuánto tarda en estar lista?',
    a: 'Web corporativa 3-4 semanas, tienda online 4-6 semanas. Depende también del contenido — te guío desde el principio.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'Para nada. Me encargo de todo lo técnico y te explico solo lo que necesitas saber para gestionar tu web del día a día.',
  },
  {
    q: '¿Qué pasa si ya tengo una web?',
    a: 'Puedo renovarla, migrarla o mejorarla. Primero la reviso y te digo honestamente qué tiene sentido hacer — sin venderte nada que no necesites.',
  },
  {
    q: '¿Y si después necesito cambiar algo?',
    a: 'Te enseño a hacer los cambios básicos tú mismo. Y si necesitas algo más complejo, aquí estoy. Con o sin contrato de mantenimiento.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[--color-bg-base] py-[clamp(4rem,8vw,7rem)]">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">

        <p className="eyebrow mb-5">
          <span className="text-[0.5rem] opacity-70">●</span>{' '}PREGUNTAS FRECUENTES
        </p>

        <h2 className="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary] mb-12">
          Dudas habituales antes de empezar.
        </h2>

        <div className="max-w-[720px] divide-y divide-[--color-border-default] border-t border-b border-[--color-border-default]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-0 cursor-pointer"
              >
                <span className="font-[--font-display] font-medium text-base text-[--color-text-primary] leading-[1.4]">
                  {faq.q}
                </span>
                <span className="text-[--color-blue] text-xl leading-none shrink-0">
                  {open === i ? '−' : '+'}
                </span>
              </button>

              {/* max-height como valor dinámico — inline style inevitable para animación JS */}
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: open === i ? '200px' : '0' }}
              >
                <p className="text-[0.9375rem] leading-[1.75] text-[--color-text-secondary] pb-5">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
```

---

### SECCIÓN 11 · FORMULARIO (`src/components/sections/ContactForm.tsx`)

```tsx
// src/components/sections/ContactForm.tsx
import { useState } from 'react';

const inputClass =
  'font-[--font-body] text-[0.9375rem] text-[--color-text-primary] bg-[--color-bg-surface] ' +
  'border border-[--color-border-default] rounded-lg px-4 py-3.5 outline-none w-full ' +
  'transition-[border-color,background] duration-200 ' +
  'focus:border-[--color-blue-border] focus:bg-[--color-bg-subtle] ' +
  'focus:shadow-[0_0_0_3px_rgba(43,71,236,0.08)] ' +
  'placeholder:text-[--color-text-muted]';

const labelClass =
  'font-[--font-mono] text-[0.65rem] tracking-[0.1em] uppercase text-[--color-text-muted] mb-2 block';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-[--color-bg-elevated] py-[clamp(4rem,8vw,7rem)]">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Texto izquierda */}
          <div>
            <p className="eyebrow mb-5">
              <span className="text-[0.5rem] opacity-70">●</span>{' '}HABLEMOS
            </p>
            <h2 className="font-[--font-display] font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[--color-text-primary] mb-6">
              ¿Hablamos?
            </h2>
            <p className="text-base leading-[1.75] text-[--color-text-secondary]">
              Sin compromiso y sin tecnicismos. Cuéntame qué necesitas y en menos de 24 horas te respondo con ideas concretas, no con una plantilla de presupuesto.
            </p>
          </div>

          {/* Formulario derecha */}
          {sent ? (
            <div className="text-center py-12">
              <p className="font-[--font-display] text-2xl font-semibold text-[--color-text-primary] mb-3">
                ¡Mensaje enviado!
              </p>
              <p className="text-[--color-text-secondary]">
                Te respondo en menos de 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label className={labelClass}>Nombre</label>
                <input name="nombre" type="text" required placeholder="Tu nombre" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input name="email" type="email" required placeholder="tu@email.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Tipo de negocio</label>
                <select name="negocio" required className={inputClass}>
                  <option value="">Selecciona...</option>
                  {['Restaurante / Hostelería','Peluquería / Estética','Asesoría / Gestoría','Entrenador personal','Tienda / Comercio local','Clínica / Salud','Psicólogo / Terapeuta','Otro'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>¿Qué necesitas?</label>
                <select name="servicio" required className={inputClass}>
                  <option value="">Selecciona...</option>
                  {['Web nueva desde cero','Renovar web existente','Tienda online','Mantenimiento','No lo sé aún'].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Cuéntame más <span className="opacity-50">(opcional)</span>
                </label>
                <textarea name="mensaje" rows={4} placeholder="Describe brevemente tu proyecto..." className={`${inputClass} resize-y`} />
              </div>

              {error && (
                <p className="text-sm text-red-400">
                  Hubo un error al enviar. Inténtalo de nuevo o escríbeme a info@rimobyte.com.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[--color-blue] text-white font-[--font-body] text-[0.9375rem] font-semibold py-3.5 px-7 rounded-lg border-0 cursor-pointer w-full transition-colors duration-200 hover:bg-[--color-blue-hover] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando…' : 'Enviar mensaje →'}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
```

---

---

### API ROUTE · RESEND (`src/pages/api/contact.ts`)

Endpoint serverless que recibe el formulario y envía el email vía Resend. Al ser una ruta dentro de `pages/`, Astro la trata como una función serverless en Vercel gracias al adapter y `prerender = false`.

```ts
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nombre, email, negocio, servicio, mensaje } = await request.json();

    if (!nombre || !email || !negocio || !servicio) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await resend.emails.send({
      from: 'RimoByte <no-reply@rimobyte.com>',
      to: 'info@rimobyte.com',
      replyTo: email,
      subject: `Nuevo contacto: ${nombre} — ${servicio}`,
      html: `
        <h2 style="font-family:sans-serif">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Tipo de negocio:</strong> ${negocio}</p>
        <p><strong>Qué necesita:</strong> ${servicio}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error Resend:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

> **Nota:** el dominio `rimobyte.com` debe estar verificado en el dashboard de Resend antes de usarlo como `from`. Hasta entonces puedes usar `onboarding@resend.dev` para pruebas.

---

### FOOTER (`src/components/sections/Footer.astro`)

```astro
---
const year = new Date().getFullYear();
---
<footer class="bg-[--color-bg-elevated] border-t border-[--color-border-default] py-10">
  <div class="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">

      <a href="/" class="font-[--font-display] font-bold text-[1.25rem] tracking-[-0.03em] no-underline">
        <span class="text-[--color-text-primary]">Rimo</span><span class="text-gradient-logo">Byte</span>
      </a>

      <nav class="flex flex-wrap items-center justify-center gap-6">
        {['Proyectos', 'Servicios', 'Sobre mí', 'Blog', 'Contacto'].map((item) => (
          <a
            href={`/${item.toLowerCase().replace(' ', '-').replace('í', 'i')}`}
            class="text-sm text-[--color-text-secondary] no-underline hover:text-[--color-text-primary] transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <a href="mailto:info@rimobyte.com" class="text-sm text-[--color-text-secondary] no-underline hover:text-[--color-text-primary] transition-colors">
        info@rimobyte.com
      </a>

    </div>

    <div class="mt-8 pt-6 border-t border-[--color-border-default] text-center">
      <p class="font-mono text-[0.65rem] tracking-[0.08em] uppercase text-[--color-text-muted]">
        © {year} RimoByte · Flor Rímolo
      </p>
    </div>
  </div>
</footer>
```

---

### `src/pages/index.astro` — Ensamblaje final

```astro
---
import Base from '../layouts/Base.astro';
import Navbar from '../components/sections/Navbar.astro';
import Hero from '../components/sections/Hero.astro';
import FeaturedCase from '../components/sections/FeaturedCase.astro';
import ProjectsStrip from '../components/sections/ProjectsStrip.astro';
import Stats from '../components/sections/Stats.astro';
import Features from '../components/sections/Features.astro';
import FeaturedProjects from '../components/sections/FeaturedProjects.astro';
import Testimonials from '../components/sections/Testimonials.astro';
import Services from '../components/sections/Services.astro';
import AboutSnippet from '../components/sections/AboutSnippet.astro';
import FAQ from '../components/sections/FAQ.tsx';
import ContactForm from '../components/sections/ContactForm.tsx';
import Footer from '../components/sections/Footer.astro';
---
<Base>
  <Navbar />
  <main>
    <Hero />
    <FeaturedCase />
    <ProjectsStrip />
    <Stats />
    <Features />
    <FeaturedProjects />
    <Testimonials />
    <Services />
    <AboutSnippet />
    <FAQ client:load />
    <ContactForm client:load />
  </main>
  <Footer />
</Base>
```

---

## FASE 6 — VERIFICACIÓN FINAL

Cuando todo esté creado, ejecuta:

```bash
pnpm run build
pnpm run preview
```

Comprueba:
- [ ] Navbar se vuelve opaca al hacer scroll
- [ ] Scroll reveal funciona en todas las secciones
- [ ] FAQ acordeón abre y cierra con animación
- [ ] Formulario valida campos requeridos
- [ ] Formulario llama a `/api/contact` y muestra estado de éxito/error
- [ ] Email llega a `info@rimobyte.com` al enviar el formulario (requiere `RESEND_API_KEY` en `.env`)
- [ ] Logo "Byte" muestra el degradado correctamente
- [ ] Eyebrows en monospace uppercase en todas las secciones
- [ ] Ninguna sección tiene fondo blanco o gris claro
- [ ] Solo azul `#2B47EC` como color de acción (sin ámbar)
- [ ] Mobile responsive en todas las secciones
- [ ] Build sin errores de TypeScript
- [ ] Sin `style={}` inline en los React islands (salvo `maxHeight` dinámico del FAQ)

---

## NOTAS IMPORTANTES PARA CURSOR

1. **Clash Grotesk no está en Fontsource** — se carga solo via Fontshare CDN en `Base.astro`. No intentes instalarlo con pnpm.

2. **Tailwind 4 — sin `tailwind.config.js`** — toda la configuración va en `@theme` dentro de `global.css`. No crear `tailwind.config.js`.

3. **Política Tailwind-first** — usar clases Tailwind para todo lo posible. Solo tres excepciones justificadas para CSS raw:
   - `.reveal` / `.reveal.is-visible` — animación controlada por JS vía IntersectionObserver; los estilos deben vivir en CSS para que el toggle de clase funcione correctamente.
   - `.text-gradient-logo` — usa `-webkit-text-fill-color: transparent` que no tiene equivalente directo en Tailwind.
   - El único `style={}` permitido en React es `maxHeight` dinámico del acordeón FAQ (valor calculado en runtime). Todo lo demás va en `className`.

4. **CSS custom properties en Tailwind 4** — para referenciar variables del `@theme` en utilidades usa **paréntesis** (Tailwind expande a `var(...)`): `bg-(--color-bg-base)`, `text-(--color-text-primary)`, `font-(--font-display)`, `border-(--color-border-default)`. **No** uses corchetes tipo `bg-[--color-bg-base]`: el CSS resultante queda sin `var()` y el navegador ignora color y tipografía (la página se ve en blanco y negro / sin marca). No usar `style="..."` para valores que ya tienen clase Tailwind disponible.

5. **React islands** — FAQ y ContactForm usan `client:load`. El resto de secciones son `.astro` puro (sin JS en cliente).

6. **Resend — envío de emails:**
   - La API key se lee desde `import.meta.env.RESEND_API_KEY` (definida en `.env`).
   - En Vercel: Settings → Environment Variables → añadir `RESEND_API_KEY`.
   - El dominio `rimobyte.com` debe estar verificado en Resend antes de usarlo como `from`. Para pruebas locales usar `onboarding@resend.dev`.
   - El endpoint `/api/contact` tiene `export const prerender = false` — imprescindible para que Astro lo trate como función serverless y no intente generarlo como HTML estático.

7. **`docs/DESIGN.md`** — es la fuente de verdad de diseño. Ante cualquier duda de color, tipografía o espaciado, consultarlo antes de escribir código.

8. **GitHub push final:**
```bash
git add .
git commit -m "feat: setup inicial + home completa"
git push origin main
```

# DESIGN.md — RimoByte

> Sistema de diseño para rimobyte.com  
> Stack: **Astro 6** + Tailwind 4 + React islands  
> Versión: **6.0** · Junio 2026

Este documento describe el diseño **tal como está implementado** en el código. Ante cualquier duda, contrastar con `src/styles/global.css`, `src/styles/glass-system.css` y los componentes en `src/components/`.

**Estado de adopción:** la **home** usa el sistema v6 completo (Glass / Aurora). Páginas internas (servicios, proyectos, blog, sectores) conservan patrones legacy (Eyebrow mono, secciones oscuras planas) hasta migrarlas.

---

## 1. Filosofía y personalidad

RimoByte es Flor Rímolo — ingeniera informática que trabaja directamente con negocios locales. La web debe sentirse **técnicamente impecable, directa, cercana y luminosa**.

El sistema v6 (**Glass / Aurora**) sustituye el dark Kodex-style anterior: fondo claro `#FAFAFC`, blobs de color difuminados, cards de cristal y tipografía **Inter** en todo el peso visual.

**Tensión creativa:**  
Precisión técnica (grids exactos, jerarquía clara, pill UI) + calidez (foto real, copy directa, aurora suave).

**Principios irrompibles (v6 — home y nuevas páginas):**

- Fondo claro con **aurora fija** (`Base.astro` → `.aurora-bg`). Sin grain ni cursor glow en v6.
- Headlines en **tinta sólida** `#0A0A12`. El degradado de marca **solo** en `.gradient-text` / `text-gradient-logo`.
- **Inter Variable** para display, cuerpo y utilidades en home v6.
- Botones **pill** (`border-radius: 999px`): primario con degradado, outline/ghost con cristal.
- Cards con **glass** (`.glass-card`): fondo blanco semitransparente, blur, borde `--color-border-default`, radio `24px`.
- Profundidad por **capas de cristal y sombras suaves**, no por secciones oscuras planas.
- Degradado logo (`#196BEE → #6535E5 → #E715D1`) en acentos de marca, estrellas, iconos decorativos y CTAs primarios — **no** como fondo de sección entera.

### Patrones de layout (v6)

| Elemento | Patrón |
|----------|--------|
| Fondo global | `.aurora-bg` + `.aurora-blob` (fixed, z-index 0) |
| Secciones home | `SectionShell` con `transparent` + `padding="home"` (`.home-section`) |
| Contenedor | `SiteWrap` → `max-w-layout` (1240px) + `px-8` / `max-[980px]:px-5` |
| Cabecera H2 | `SectionHead` → clase `.section-head-v6` + `Pill` + título sólido + `<span class="gradient-text">` |
| Nav home | `Navbar` → `site-nav--float`: pill de cristal dentro de `SiteWrap` |
| CSS de layout | Tokens en `@theme` (`global.css`) + utilidades en `glass-system.css` |

---

## 2. Colores

### Superficies

```css
--color-bg-base:     #FAFAFC;   /* fondo de página */
--color-bg-elevated: #F2F2F7;   /* placeholders, chips secundarios */
--color-bg-surface:  rgba(255, 255, 255, 0.85);
--color-bg-subtle:   #F2F2F7;
--color-ink:         #0A0A12;   /* bloques oscuros (about, CTA) */
```

### Texto

```css
--color-text-primary:   #0A0A12;
--color-text-secondary: #2C2C38;   /* cuerpo, lede */
--color-text-muted:     #545462;   /* labels, metadata */
```

### Marca y acción

```css
--color-blue:        #196BEE;
--color-blue-hover:  #1458C8;
--color-purple:      #6535E5;
--color-magenta:     #E715D1;
--color-blue-subtle: rgba(25, 107, 238, 0.1);
```

### Bordes

```css
--color-border-default: rgba(10, 10, 18, 0.08);   /* --line en mockup */
--color-border-hover:   rgba(10, 10, 18, 0.14);
--color-border-blue:    rgba(25, 107, 238, 0.32);
```

### Cristal

```css
--color-surface-card:        rgba(255, 255, 255, 0.85);
--color-surface-card-hover:  rgba(255, 255, 255, 0.92);
--color-surface-strong:      rgba(255, 255, 255, 0.85);   /* nav pill, stats */
--color-nav-glass:           rgba(255, 255, 255, 0.88);
```

### Degradados

```css
--gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);
--gradient-soft: linear-gradient(135deg, rgba(25,107,238,.12) 0%, rgba(101,53,229,.12) 50%, rgba(231,21,209,.12) 100%);
```

**Uso del degradado logo:** `.gradient-text`, botón primario, favicon, estrellas testimonios, bordes hover en `.glass-card--hover`. **No** en fondos de sección ni párrafos largos.

### Hero stats — separadores

Grid con `gap: 1px`:

- **Borde exterior:** `rgba(10, 10, 18, 0.08)` (`--line`)
- **Líneas interiores:** color de fondo `--color-bg-base` (no `--line` — más claras)
- **Celdas:** `rgba(255, 255, 255, 0.85)` + `backdrop-filter: blur(12px)`

---

## 3. Tipografía

### Familias (v6 home)

| Token | Familia | Uso |
|-------|---------|-----|
| `--font-display` | Inter Variable | H1, H2, H3, números en stats |
| `--font-body` | Inter Variable | Cuerpo, nav, botones, formularios |
| `--font-mono` | Inter Variable | (reservado; legacy usaba Space Mono) |

**Carga:** Inter Variable vía `@fontsource-variable/inter`. Clash Grotesk y Space Mono siguen en el bundle para páginas internas legacy.

### Escala (home v6)

| Uso | Peso | Tamaño típico |
|-----|------|---------------|
| Hero H1 | 700 | `clamp(3rem, 7vw, 5.75rem)` |
| Sección H2 | 700 | `clamp(2.5rem, 5.2vw, 4.25rem)` |
| Hero lede | 400 | `1.25rem` |
| Section subtitle | 400 | `clamp(1rem, 1.2vw, 1.1875rem)` |
| Pill / nav links | 500 | `13px` / `14px` |
| Botones | 500 | `14px` |
| Cuerpo cards | 400–500 | `14px`–`15.5px` |

### Headlines — tinta + acento degradado

Títulos en `--color-text-primary`. Solo el fragmento destacado lleva degradado:

```html
<h2>Dudas habituales antes de <span class="gradient-text">empezar.</span></h2>
```

Componente: `SectionHead.astro` (clase `.section-head-v6`).

### Pill (sustituye Eyebrow en home)

Etiqueta superior de sección — cristal con punto degradado:

```html
<div class="pill"><span class="dot"></span> Filosofía</div>
```

Componente: `Pill.astro`. Variante `.dot.live` (verde) en CTA final.

---

## 4. Layout y capas

### Primitivos UI

| Componente | Rol |
|------------|-----|
| `SiteWrap.astro` | `max-w-layout` + padding horizontal 32px / 20px móvil |
| `SectionShell.astro` | Sección; en home: `transparent` + `padding="home"` |
| `SectionHead.astro` | Pill + H2 + subtítulo (`.section-head-v6`) |

### Padding de secciones (home)

| Clase | Valor |
|-------|--------|
| `.home-section` | `80px 0` (móvil ≤980px: `64px`) |
| `.home-section--spacious` | `96px 0` (FAQ, testimonios) |
| `.portfolio-section` | `padding-top: 40px` adicional |
| `.hero-v6` | `64px 0 80px` |
| `.about-dark-wrap` | `40px 0` vertical |

### Fondo global — aurora

En `Base.astro`:

```html
<div class="aurora-bg" aria-hidden="true">
  <div class="aurora-blob"></div>
</div>
```

- Blobs azul / magenta / lila con `filter: blur(110–120px)`
- `theme-color`: `#FAFAFC`
- `data-theme="light"` fijado en `<html>`

### Navbar flotante

Estructura:

```
SiteWrap
  └── .site-nav__inner (pill glass, border-radius full)
```

- Sticky `top: 16px`, wrapper exterior transparente
- Logo: `LogoMark` (`/favicon.svg`) + «RimoByte»
- CTA: `Button` primario → `/contacto/`
- Scroll: **no** aplica `site-nav--solid` en modo float (`site.ts`)

---

## 5. Shapes y bordes

```css
--radius-sm:   12px;
--radius-md:   16px;    /* FAQ items */
--radius-card: 24px;    /* cards, portfolio, about oscuro */
--radius-xl:   32px;    /* bloque about-dark */
--radius-full: 999px;   /* pills, botones, nav */
```

Sombras:

```css
--shadow-md:       inset highlight + sombra suave;
--shadow-gradient:   hover cards con borde degradado;
--shadow-deep:       foto about;
```

---

## 6. Componentes base (v6)

### Botones (`Button.astro`)

| Variante | Clase | Aspecto |
|----------|-------|---------|
| Primario | `btn btn-primary` | Degradado logo, pill, sombra lila |
| Outline | `btn btn-outline` | Cristal + borde `--color-border-hover` |
| Ghost | `btn btn-ghost` | Igual outline; hover fondo blanco |

Inter 500, `14px`, sin uppercase.

### Glass card (`.glass-card`)

- Fondo `--color-surface-card`, `blur(20px)`
- Borde `1px solid --color-border-default`
- Variante `.glass-card--hover`: lift + borde degradado en `:hover`

Usado en: filosofía (`.principle`), servicios (`.service-glass`), testimonios, FAQ (`.faq-item`).

### Service cards home

`ServiceCard.astro` → `.service-glass.glass-card`: icono en caja `--gradient-soft`, precio, link pill «Saber más».

### Portfolio (`ProjectsFan.astro`)

Grid 12 columnas (7+5 / 5+7):

- **Card:** flex columna, altura igualada por fila (`align-items: stretch`)
- **Thumb:** `.portfolio-project__thumb` — `background-size: cover`, `background-position: top center`, `flex: 1`, `aspect-ratio` mínima vía `min-height: clamp(...)`
- **Pie:** `.portfolio-project__info` — fondo **blanco sólido** `#fff`, sin blur

### About (`PhotoStatement.astro`)

- Wrapper: `.about-dark-wrap` > `SiteWrap` > `.about-dark`
- Fondo `--color-ink`, radio `--radius-xl`
- Grid `auto 1fr`: foto `max-width: 20rem`, contenido ocupa el resto
- Aurora decorativa interna (`.about-dark__aurora`)

### FAQ (`FAQ.astro`)

- `.faq-list` a ancho completo del `SiteWrap`
- `.faq-item`: glass card; icono circular +/- en `summary::after` (SVG inline en CSS)
- Pill: «Preguntas frecuentes»

### CTA final (`HomeCTA.astro`)

`.cta-dark-card` sobre `--color-ink`, pill live, botones a `/contacto/` y WhatsApp.

### Footer (`Footer.astro`)

`.footer-v6`: grid enlaces, marca con `LogoMark`, borde superior sutil.

---

## 7. Home — estructura

`index.astro`:

```
Navbar (float pill)
Hero → Features → ProjectsFan → PhotoStatement → Services
→ Testimonials → FAQ → HomeCTA
Footer
```

Sin formulario en home (CTA enlaza a `/contacto/`). Sin `LogoStrip`, `Stats` ni `FeaturedCase` del diseño anterior.

---

## 8. Animaciones y motion

### Scroll reveal

```css
.reveal { opacity: 0; transform: translateY(28px); }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Observer en `Base.astro`: `threshold: 0.08`.

### Easings

```css
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
```

### Scripts (`site.ts`)

- Nav float: sin barra sólida al scroll
- Métricas count-up (si existen en DOM)
- Legacy: cursor glow desactivado si no hay `#cursor-glow`

### Reduced motion

Respetar `prefers-reduced-motion: reduce` en animaciones y page loader.

---

## 9. Reglas absolutas (v6)

| ❌ Nunca | ✅ Siempre |
|---------|-----------|
| Fondo oscuro en home v6 | `#FAFAFC` + aurora |
| Degradado en titular completo | Solo en `.gradient-text` |
| Headlines en peso 500 tenue | **700** en H1/H2 home |
| Botones con `border-radius: 4px` en home | Pill (`--radius-full`) |
| Space Mono en home v6 | Inter en display, cuerpo y botones |
| Pie portfolio con `backdrop-filter` | Fondo blanco sólido |
| Stats con líneas interiores `--line` | Líneas = `--color-bg-base` |
| Grain / cursor glow en home | Aurora únicamente |
| `backdrop-filter` en pie de proyecto | Dos bloques: thumb + info opaco |

---

## 10. Estructura de archivos

```
src/
  components/
    ui/
      SiteWrap.astro · SectionShell.astro · SectionHead.astro
      Pill.astro · Button.astro · LogoMark.astro · Stars.astro
      ServiceCard.astro · Icon.astro · icons/
    sections/
      Navbar.astro · Hero.astro · Features.astro
      ProjectsFan.astro · PhotoStatement.astro · Services.astro
      Testimonials.astro · FAQ.astro · HomeCTA.astro · Footer.astro
      ContactForm.tsx · ContactFormIsland.astro   ← /contacto/
  data/
    homeShowcase.ts · homeTestimonials.ts
    services.ts · projects.ts · faq.ts
  layouts/
    Base.astro                    ← aurora, theme light, starGrad SVG
  scripts/
    site.ts
  styles/
    global.css                    ← @theme tokens, .btn, legacy internas
    glass-system.css              ← v6: aurora, glass, home sections
```

---

## 11. Tailwind — clases de token

Usar utilidades generadas por `@theme`, no sintaxis arbitraria:

| Evitar | Usar |
|--------|------|
| `text-(--color-text-secondary)` | `text-text-secondary` |
| `bg-(--color-bg-base)` | `bg-bg-base` |
| `border-(--color-border-default)` | `border-border-default` |
| `font-(--font-display)` | `font-display` |

En `style={{ }}` de React sí usar `var(--color-blue)`.

---

## 12. Qué hace único a RimoByte (v6)

1. **Aurora + cristal** — luminoso y técnico sin parecer plantilla SaaS genérica.
2. **Un acento degradado por titular** — el arcoíris del logo solo donde importa.
3. **Nav pill flotante** — misma anchura de contenido que el resto del sitio.
4. **Portfolio editorial** — grid asimétrico 7/5 con cards a altura igual y capturas a pantalla completa.
5. **Bloque about oscuro** — contraste dramático dentro del wrapper, no full-bleed arbitrario.
6. **Inter end-to-end en home** — una sola voz tipográfica, pesos 400–700.

---

## Migración pendiente

Páginas en `/servicios/`, `/proyectos/`, `/blog/`, sectores y `/sobre-mi/` pueden seguir usando:

- `Eyebrow.astro` (Space Mono azul)
- Secciones oscuras `SectionShell` con `border-b`
- Clash Grotesk en títulos

Al migrar cada página, aplicar los patrones de este doc y retirar estilos legacy correspondientes en `global.css`.

---

*Fuente de verdad para rimobyte.com. Si el código y este doc divergen, el código manda hasta que se actualice el doc.*

# DESIGN.md — RimoByte
> Sistema de diseño para rimobyte.com  
> Stack: **Astro 6** + Tailwind 4 + React islands  
> Versión: **5.0** · Junio 2026

Este documento describe el diseño **tal como está implementado** en el código. Ante cualquier duda, contrastar con `src/styles/global.css` y los componentes en `src/components/`.

---

## 1. Filosofía y personalidad

RimoByte es Flor Rímolo — una ingeniera informática que trabaja directamente con negocios locales. La web debe sentirse como la persona: **técnicamente impecable, directa, cercana y sin artificios**.

La inspiración compositiva es Kodex: dark, cinematográfica, tipografía editorial con tracking negativo, Space Mono para la capa de utilidad técnica. Pero donde Kodex es una agencia fría y futurista, RimoByte es una **persona real con criterio técnico**.

**Tensión creativa:**
Precisión técnica (monospace, grids exactos, jerarquía clara) + calidez (foto real, copia directa, sin jerga).

**Principios irrompibles:**
- Todo sobre oscuro. Sin fondos claros en ninguna sección.
- Tipografía como protagonista. Los headlines ocupan espacio intencionadamente.
- **Una** palabra o frase en *italic* con degradado de marca (`--gradient-logo`) dentro de cada headline importante.
- Space Mono solo para kickers, labels, botones, numeración decorativa y metadata. Nunca en cuerpo.
- Clash Grotesk solo para titulares H1–H3 y precios en cards. Nunca en párrafos.
- Botones primarios y outline con `border-radius: 4px` (esquinas suaves, no pill).
- Cards de contenido con `4px` (`--radius-card`) en todo el sitio — igual que servicios en home.
- Profundidad por **secciones planas**: fondos sólidos `--color-bg-base` / `--color-bg-elevated` y `border-bottom`.
- El degradado del logo (`#196BEE → #6535E5 → #E715D1`) en "Byte", favicon y **`<em>` en headlines**.
- Fondo global: **grain SVG + cursor glow** en todas las páginas (`Base.astro`).

### Un solo modo de layout

| Elemento | Patrón |
|----------|--------|
| Fondo | `.site-grain` + `#cursor-glow` (global) |
| Secciones | `SectionShell` → `bg-bg-base` o `elevated`, `border-b border-border-default` |
| Contenedor | `SiteWrap` → `max-w-layout` + `px-[clamp(1.5rem,5vw,4rem)]` |
| Cabecera H2 | `SectionHead` → título sólido + `<em class="text-gradient-logo">` |
| Nav | `Navbar.astro` único: barra de progreso, burger 2 líneas, drawer móvil |
| Headlines | Blanco sólido + `<em>` con `--gradient-logo` en todo el sitio |
| CSS de layout | **Tailwind en markup**; CSS global solo para grain, glow, reveal, carrusel, FAQ `<details>`, etc. |

---

## 2. Colores

### Backgrounds — capas de oscuro

```css
--color-bg-base:     #0A0A12;   /* fondo de página */
--color-bg-elevated: #111118;   /* capa elevada (referencia sólida) */
--color-bg-surface:  #16162A;   /* inputs, elementos opacos */
--color-bg-subtle:   #1E1E35;   /* placeholders, media vacía */
```

En páginas internas, las secciones usan `SectionShell` con fondos sólidos. **No** se usa vidrio semitransparente (`.section-bg` eliminado).

### Texto

```css
--color-text-primary:   #FFFFFF;
--color-text-secondary: rgba(255,255,255,0.55);
--color-text-muted:     rgba(255,255,255,0.30);
```

### Acción — azul único

```css
--color-blue:        #2B47EC;
--color-blue-hover:  #1E35D4;
--color-blue-subtle: rgba(43,71,236,0.10);
--color-blue-glow:   rgba(43,71,236,0.20);
```

### Bordes

```css
--color-border-default: rgba(255,255,255,0.07);
--color-border-hover:   rgba(255,255,255,0.13);
--color-border-blue:    rgba(43,71,236,0.35);
```

### Degradados

```css
/* Logo — "Byte", favicon, símbolo de fondo, <em> en headlines */
--gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);

/* Headlines H1/H2 (páginas internas) — texto base */
--gradient-headline: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.48) 100%);
```

**Nunca** usar `--gradient-logo` en botones, cards ni bordes. Solo en marca y acento *italic* de titulares.

### Patrón de puntos (fondo interactivo — páginas internas)

```css
--dot-pattern-size: 20px;
--dot-pattern-color: rgba(101, 53, 229, 0.14);  /* lila del logo, muy sutil */
```

---

## 3. Tipografía

### Familias

| Familia | Rol |
|---------|-----|
| **Clash Grotesk** | H1, H2, H3, números en manifest/métricas, precios en servicios |
| **Inter Variable** | Cuerpo, subtítulos, formularios, nav links, citas del carrusel |
| **Space Mono** | Kickers, labels, **todos los botones**, footnotes, metadata |

**Carga:** Clash Grotesk autohospedada (`public/assets/fonts/clash-grotesk/*.woff2`) + Space Mono e Inter vía npm (`@fontsource/*`). Sin CDN de fuentes en producción.

### Escala (valores en uso)

| Uso | Familia | Peso | Tamaño típico |
|-----|---------|------|---------------|
| Hero H1 (home) | Clash | 500 | `clamp(2.5rem, 6vw, 4.75rem)` |
| Hero H1 (internas) | Clash | 500 | `clamp(2.75rem, 5.5vw, 4.5rem)` |
| Sección H2 (home) | Clash | 500 | `clamp(1.75rem, 3.5vw, 2.5rem)` |
| Sección H2 (internas) | Clash | 500 | `clamp(2rem, 3.5vw, 3rem)` |
| Card title | Clash | 500 | `clamp(1.3125rem, 2.2vw, 1.5rem)` |
| Cuerpo | Inter | 400 | `1rem` / `0.9375rem` |
| Kicker | Space Mono | 400 | `0.6875rem`, tracking `0.14em` |
| Label / footnote | Space Mono | 400 | `0.625rem`, tracking `0.12em` |
| Botones | Space Mono | 400 | `0.8125rem`, tracking `0.08em`, uppercase |

### Headlines — degradado + acento italic

**Todo el sitio** — H1/H2 en blanco sólido; solo el `<em>` usa `--gradient-logo`:

```css
h1 em, h2 em {
  font-style: italic;
  background-image: var(--gradient-logo);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Componente `SectionHead.astro` para cabeceras de sección. El `<em>` lleva padding extra para que la cursiva no se recorte (`global.css`).

### Kicker (`Eyebrow.astro`)

Etiqueta superior de sección — Space Mono azul, sin corchetes:

```html
<p class="eyebrow">DISEÑO WEB · DESARROLLO · ESPAÑA</p>
```

- Space Mono, `0.6875rem`, uppercase, `letter-spacing: 0.14em`
- Color: `--color-blue`
- Margen inferior fijo hasta el título: `--eyebrow-title-gap: 1.5rem`
- Componente: `Eyebrow.astro` (clase `.eyebrow` en CSS)

---

## 4. Layout y capas de sección

### Primitivos UI

| Componente | Rol |
|------------|-----|
| `SiteWrap.astro` | Contenedor `max-w-layout` + padding horizontal |
| `SectionShell.astro` | Sección plana con `border-b`, `bg-bg-base` o `elevated`, padding vertical |
| `SectionHead.astro` | H2 sólido + `<em>` con `text-gradient-logo` + subtítulo opcional |

### Container

Usar `SiteWrap` en lugar de repetir clases de contenedor. La clase legacy `.landing-wrap` en CSS equivale al mismo ancho.

### Padding de secciones

| Contexto | Valor |
|----------|--------|
| `SectionShell` (default) | `py-[clamp(4rem,10vw,7rem)]` |
| Hero | `padding="hero"` + padding superior extra vía `style` |
| Métricas (`.landing-metrics`) | celdas `2rem 1.25rem` |

### Fondo global — grain + cursor glow

En `Base.astro` (todas las páginas):
- `.site-grain` — textura SVG fija, `opacity: 0.35` (dark)
- `#cursor-glow` — radial lila que sigue el cursor (desactivado con `prefers-reduced-motion`)

### Navbar (`Navbar.astro`)

- Altura: `--site-nav-h: 4.25rem`
- Scroll: clase `site-nav--solid` + barra de progreso (`site.ts`)
- Links: `/proyectos/`, dropdown Servicios, `/blog/`, `/sobre-mi/`
- CTA desktop: `btn-primary` → `/contacto/`
- Móvil: drawer + burger 2 líneas

Logo: Clash 500 — "Rimo" blanco + "Byte" con `.text-gradient-logo`.

Implementación: `src/components/sections/servicios/*.astro` y `src/data/services.ts`.

---

## 5. Shapes y bordes

```css
--radius-card: 4px;     /* cards de contenido (servicios, blog, proyectos, surface-card) */
--radius-input: 14px;   /* inputs y textarea en formularios con borde completo */
--radius-full: 9999px;  /* dots del carrusel, ThemeSwitcher, skip-link */
```

---

## 6. Componentes base

### Botones (`Button.astro` + `.btn` en `global.css`)

| Variante | Clase | Uso |
|----------|-------|-----|
| Primario | `btn btn-primary` | CTA principal, azul sólido, `border-radius: 4px` |
| Outline | `btn btn-outline` | CTA secundario, borde sutil |
| Ghost | `btn btn-ghost` | Links de acción, sin padding, gap animado al hover |

Todas las variantes: **Space Mono**, uppercase, `letter-spacing: 0.08em`, `padding: 0.875rem 1.5rem`.

### Service cards — unificado

`ServiceCard.astro` en todo el sitio: `.landing-service-card` con icono Lucide en banda gráfica, `border-radius: 4px`, link mono «Saber más →». Datos desde `services.ts`.

Iconos: `globe`, `shopping-bag`, `wrench` vía `Icon.astro`.

### Sistema de iconos

```
src/components/ui/icons/
  globe.svg, shopping-bag.svg, wrench.svg   ← servicios
  mail.svg, whatsapp.svg, chevron-down.svg  ← contacto
  quote-ornate.svg                          ← testimonios
  corner-tl.svg, corner-br.svg              ← PhotoStatement (internas)
  registry.ts                               ← mapa + iconDataUri()
```

Consumo: `Icon.astro` (Astro), `Icon.tsx` (React). **Sin SVG inline sueltos en secciones.**

### Quote — `QuoteIcon.astro`

*(Sin cambios — glyph / ornate, tones, sizes.)*

### Stats (`Stats.astro`)

`.landing-metrics` grid 2×2 / 4 cols. Valores Clash azul, animación count-up (`site.ts`).

### Proyectos — home

`ProjectsFan.astro`: `.work-spotlight` + `.work-picker`. Datos derivados de `projects.ts` vía `homeShowcase.ts`.

### PhotoStatement (`PhotoStatement.astro`)

`.landing-about`: grid foto + texto, marco con borde degradado (`.landing-about__frame`).

### FAQ (`FAQ.astro`)

`<details>` nativos en `.landing-faq` en todo el sitio. Sin island React. Datos: `faq.ts` o prop `faqs`.

### Formulario — `ContactForm.tsx`

Layout único `.landing-contact`: info + formulario 2 columnas. Submit `btn-primary btn--block`. Wrapper: `ContactFormIsland.astro`.

### Page loader — `PageLoader.astro`

*(Sin cambios.)*

---

## 7. Home — estructura y hero

`index.astro`. Orden de secciones:

```
Navbar
Hero → FeaturedCase → Stats → Features → PhotoStatement → Testimonials
→ ProjectsFan → Services → FAQ → ContactFormIsland
Footer
```

Grid `1.15fr / 0.85fr` desde 900px. Script de interacción: `site.ts`.

---

## 8. Animaciones y motion

### Scroll reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.6s var(--ease-spring), transform 0.6s var(--ease-spring);
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Observer en `Base.astro`: `threshold: 0.08`, `rootMargin: '0px 0px -40px 0px'`.

### Easings

```css
--ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
--site-ease: cubic-bezier(0.16, 1, 0.3, 1);
```

### Scripts globales (`site.ts`)

- Nav: clase `site-nav--solid` al scroll + barra de progreso
- Hero showcase: cambio de proyecto al click (si existe en DOM)
- Work spotlight: sincronizado con picker
- Métricas: animación count-up al entrar en viewport

### Reduced motion

Respetar `prefers-reduced-motion: reduce` en carrusel, cursor glow, fondo animado y page loader.

---

## 9. Reglas absolutas

| ❌ Nunca | ✅ Siempre |
|---------|-----------|
| Fondo blanco o gris claro | Capas oscuras sólidas + grain global |
| Degradado logo en botones, cards o bordes | Logo gradient en "Byte" y `<em>` de headlines |
| Segundo color de acción | Solo `#2B47EC` |
| Botones pill en CTAs | `border-radius: 4px` en `.btn-primary` / `.btn-outline` |
| Kicker con corchetes `[ ]` | Mono azul, uppercase, sin adornos |
| Inter en botones | Space Mono en todos los `.btn` |
| Headlines en 600/700 | Clash **500** en H1–H3 |
| Clash en párrafos | Inter en cuerpo |
| SVG inline sueltos en secciones | Iconos en `ui/icons/` vía `Icon` |
| `.section-bg` vidrio | `SectionShell` plano |
| FAQ React island | `FAQ.astro` con `<details>` nativos |
| Dos navbars o layouts | Un solo `Navbar` + `Base` sin prop `landing` |

---

## 10. Estructura de archivos

```
src/
  components/
    ui/
      SiteWrap.astro · SectionShell.astro · SectionHead.astro
      Eyebrow.astro · Button.astro · CTABand.astro
      Icon.astro · Icon.tsx · icons/
      ServiceCard.astro
      PageLoader.astro
    sections/
      Navbar.astro
      Hero.astro · FeaturedCase.astro · Stats.astro · Features.astro
      PhotoStatement.astro · Testimonials.astro · ProjectsFan.astro
      Services.astro · FAQ.astro
      ContactForm.tsx · ContactFormIsland.astro
      Footer.astro · Marquee.astro
      servicios/ · sector/
  data/
    homeShowcase.ts                ← derivado de projects.ts
    services.ts · projects.ts · faq.ts
  layouts/
    Base.astro
  scripts/
    site.ts                        ← grain, nav, showcase, métricas
    testimonials-carousel.ts
  styles/
    global.css                     ← tokens + efectos (grain, reveal, FAQ, etc.)
```

---

## 11. Qué hace único a RimoByte

1. **Degradado de marca en el único *italic*** — el acento editorial usa el arcoíris del logo.
2. **Ritmo plano global** — secciones sólidas con grain sutil; sin vidrio ni fondos duales.
3. **Primitivos reutilizables** — `SiteWrap`, `SectionShell`, `SectionHead` + Tailwind first.
4. **Hero con showcase** — proyectos reales desde el primer scroll.
5. **Manifest numerado** — confianza y servicios en listas `01–NN`, no grids de cards genéricas.
6. **Un solo azul de acción** — coherencia en CTAs, iconos y acentos.

---

*Fuente de verdad para rimobyte.com. Si el código y este doc divergen, el código manda hasta que se actualice el doc.*

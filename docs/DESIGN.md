# DESIGN.md — RimoByte
> Sistema de diseño para rimobyte.com  
> Stack: **Astro 6** + Tailwind 4 + React islands  
> Versión: **4.0** · Mayo 2026

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
- **Una** palabra o frase en *italic* con degradado azul dentro de cada headline importante.
- Space Mono solo para eyebrows, labels, botones, numeración decorativa y metadata. Nunca en cuerpo.
- Clash Grotesk solo para titulares H1–H3 y precios en cards. Nunca en párrafos.
- Pills (`border-radius: 9999px`) en botones primarios y outline. Cards con `14px`; fan-cards de proyectos con `24px`.
- Profundidad por **capas semitransparentes + blur**, contraste de tono y glow de borde azul — no por drop-shadows decorativas en cards (el fan de proyectos sí usa sombra para elevación).
- El degradado del logo (`#196BEE → #6535E5 → #E715D1`) solo en "Byte", el favicon y el símbolo de fondo.
- Fondo de página **fijo** (puntos interactivos + símbolo) visible a través de secciones con efecto vidrio.

---

## 2. Colores

### Backgrounds — capas de oscuro

```css
--color-bg-base:     #0A0A12;   /* fondo de página */
--color-bg-elevated: #111118;   /* capa elevada (referencia sólida) */
--color-bg-surface:  #16162A;   /* inputs, elementos opacos */
--color-bg-subtle:   #1E1E35;   /* placeholders, media vacía */
```

En la home, las secciones **no** usan estos colores al 100 % de opacidad. Usan capas vidrio (ver §4).

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
/* Logo — solo "Byte" y favicon */
--gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);

/* Headlines H1/H2 — texto base */
--gradient-headline: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.48) 100%);

/* <em> en headlines — acento editorial */
--gradient-headline-em: linear-gradient(180deg, #6b82ff 0%, #2b47ec 52%, #1a2ecc 100%);
```

**Nunca** usar `--gradient-logo` en botones, cards ni bordes.

### Patrón de puntos (fondo interactivo)

```css
--dot-pattern-size: 20px;
--dot-pattern-color: rgba(101, 53, 229, 0.14);  /* lila del logo, muy sutil */
```

---

## 3. Tipografía

### Familias

| Familia | Rol |
|---------|-----|
| **Clash Grotesk** | H1, H2, H3, números grandes en feature cards, precios en servicios |
| **Inter Variable** | Cuerpo, subtítulos, formularios, nav links, citas del carrusel |
| **Space Mono** | Eyebrows, labels, **todos los botones**, footnotes, metadata, marquee |

**Carga:** Clash Grotesk (Fontshare CDN) + Space Mono (Google Fonts) + Inter (`@fontsource-variable/inter` local).

### Escala (valores en uso)

| Uso | Familia | Peso | Tamaño típico |
|-----|---------|------|---------------|
| Hero H1 | Clash | 500 | `clamp(2.75rem, 5.5vw, 4.5rem)` |
| Sección H2 | Clash | 500 | `clamp(2rem, 3.5vw, 3rem)` |
| Card title | Clash | 500 | `clamp(1.3125rem, 2.2vw, 1.5rem)` |
| Cuerpo | Inter | 400 | `1rem` / `0.9375rem` |
| Eyebrow | Space Mono | 400 | `0.6875rem`, tracking `0.14em` |
| Label / footnote | Space Mono | 400 | `0.625rem`, tracking `0.12em` |
| Botones | Space Mono | 400 | `0.8125rem`, tracking `0.08em`, uppercase |

### Headlines — degradado + acento italic

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 500; }

h1, h2 {
  background-image: var(--gradient-headline);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

h1 em, h2 em {
  font-style: italic;
  background-image: var(--gradient-headline-em);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

El `<em>` lleva padding extra para que la cursiva no se recorte (`global.css`).

### Eyebrows

Estructura real (`Eyebrow.astro`):

```html
<p class="eyebrow">
  <span class="eyebrow__bracket">[</span>
  <span>TEXTO DEL EYEBROW</span>
  <span class="eyebrow__bracket">]</span>
</p>
```

- Space Mono, `0.6875rem`, uppercase, `letter-spacing: 0.14em`
- Color: `--color-blue`
- Corchetes con `opacity: 0.45`
- Margen inferior fijo hasta el título: `--eyebrow-title-gap: 1.5rem`
- **No** se usa el prefijo `●` (era borrador; la implementación usa corchetes)

---

## 4. Layout y capas de sección

### Container

No hay clase `.container` global. Patrón repetido:

```html
<div class="max-w-layout mx-auto px-[clamp(1.5rem,5vw,4rem)]">
```

### Padding de secciones

| Contexto | Valor en uso |
|----------|----------------|
| Sección estándar | `py-[clamp(4rem,8vw,7rem)]` |
| Hero | `padding-block: clamp(7rem, 13vw, 11rem)` |
| Stats | `py-[clamp(3rem,6vw,5rem)]` |
| Projects fan (abajo) | `pb-[clamp(5rem,10vw,9rem)]` |

### Capas vidrio — `.section-bg`

Las secciones de contenido usan fondos semitransparentes para dejar ver el fondo fijo:

```css
.section-bg {
  background: rgba(10, 10, 18, 0.55);
  backdrop-filter: blur(12px);
}

.section-bg--elevated {
  background: rgba(17, 17, 24, 0.62);
  backdrop-filter: blur(12px);
}
```

**Uso:** `section-bg` en la mayoría de bloques; `section-bg--elevated` en marquee, stats y testimonios.

### Fondo fijo (`SiteBackground.astro`)

Capa `position: fixed` detrás de todo el contenido:
1. **Canvas de puntos** interactivos (`interactive-dots.ts`) — color lila sutil, reaccionan al cursor.
2. **Símbolo del favicon** centrado, `opacity ~0.06`, animación `site-bg-breathe` (10s).

El `main` y `footer` van en `z-index: 1` sobre este fondo.

### Navbar

- `position: fixed`, `z-index: 50`
- Al scroll: `background: rgba(10,10,18,0.8)`, `backdrop-filter: blur(16px)`, borde inferior sutil
- Altura expuesta como `--nav-height` (JS en `Navbar.astro`)
- Links: Inter `0.875rem`, `text-secondary` → hover blanco
- Logo: Clash 700 — "Rimo" blanco + "Byte" con `.text-gradient-logo`
- CTA: `btn-primary`
- Móvil: menú full-screen con links Clash 3xl

### Marcadores de capítulo — solo páginas de servicio

Las landings bajo `/servicios/*` (ej. `web-corporativa`) son páginas largas con un **hilo de venta lineal**. Ahí se usa un marcador superior distinto del eyebrow: ritmo tipo índice / revista impresa.

**No es un patrón global del sitio.** En home, sobre-mi, proyectos y contacto la jerarquía sigue siendo **eyebrow + cambio de layout** (fan, stats, carrusel, borde editorial, etc.). No añadir marcadores numerados allí salvo que el tipo de página cambie de forma explícita.

#### Formato

```
/ 02 · Diagnóstico                    04 situaciones
────────────────────────────────────────────────────
```

- Izquierda: `/ NN · Etiqueta` — capítulo del argumento de venta.
- Derecha (opcional): metadata en mono (`04 situaciones`, `07 items`, `Presupuesto cerrado`).
- Tipografía: Space Mono, `0.625rem`, uppercase, `letter-spacing: 0.18em`, `text-text-muted`.
- Separador: `border-t border-border-default` + `pt-6` antes del bloque de título.
- Fila: `flex items-baseline justify-between`.

#### Marcador vs eyebrow

Conviven en la misma sección; no se sustituyen:

| Elemento | Rol |
|----------|-----|
| **Marcador** `/ NN · …` | Capítulo del documento (índice, ritmo al hacer scroll). |
| **Eyebrow** `[ QUÉ INCLUYE ]` | Etiqueta semántica de la sección (mismo sistema que el resto del sitio). |

#### Dónde sí / dónde no

| Bloque | Marcador numerado |
|--------|-------------------|
| Hero de servicio (`HeroServicio`) | No — intro fuera del índice (no hay `/ 01`). |
| Hilo editorial (diagnóstico, alcance, inversión, cierre) | Sí — `02`, `03`, `04`… |
| Casos reales | No — eyebrow `CASOS REALES` + layout propio (cards). |
| FAQ, formulario de contacto | No — componentes globales reutilizados (misma UI que home). |
| Otros servicios | No — solo si hay más de un servicio en `services.ts`; eyebrow basta. |

Implementación: `src/components/sections/servicios/*.astro` y datos en `src/data/services.ts`.

#### Numeración

- La secuencia empieza en **`02`** (el hero es capítulo implícito sin etiqueta).
- Los números deben ser **consecutivos en todo bloque que lleve marcador**, sin saltos que el usuario vea al hacer scroll (ej. no pasar de `/ 04` a `/ 05` si entre medias hay dos secciones largas sin numerar, salvo que sea decisión documentada).
- Al añadir un capítulo al hilo (p. ej. marcar Casos como `05`), renumerar los siguientes.
- Si una sección intermedia no lleva marcador (FAQ, casos), el cierre puede usar **solo etiqueta sin número** (`/ Siguiente paso`) o el número que corresponda al último capítulo del índice — pero no mezclar ambas lógicas en la misma plantilla.

Ejemplo de referencia — web corporativa:

| Orden | Sección | Marcador |
|-------|---------|----------|
| 1 | Hero | — |
| 2 | Para quién es | `/ 02 · Diagnóstico` |
| 3 | Qué incluye | `/ 03 · Alcance del servicio` |
| 4 | Precio | `/ 04 · Inversión` |
| 5 | Casos reales | — |
| 6 | FAQ | — |
| 7 | CTA + contacto | `/ 05 · Siguiente paso` (eyebrow aparte: `CUÉNTAME TU PROYECTO`) |

#### Futuro

- Nuevos servicios (tienda online, mantenimiento): mismo patrón en componentes props-driven.
- Opcional: extraer `SectionChapter.astro` (`number?`, `label`, `meta?`) para no duplicar markup.

---

## 5. Shapes y bordes

```css
--radius-lg:   14px;    /* inputs, textarea, cards, PhotoStatement */
--radius-xl:   24px;    /* fan-cards de proyectos */
--radius-full: 9999px;  /* botones pill, dots del carrusel */
```

---

## 6. Componentes base

### Botones (`Button.astro` + `.btn` en `global.css`)

| Variante | Clase | Uso |
|----------|-------|-----|
| Primario | `btn btn-primary` | CTA principal, pill azul |
| Outline | `btn btn-outline` | CTA secundario, borde sutil |
| Ghost | `btn btn-ghost` | Links de acción, sin padding, gap animado al hover |

Todas las variantes: **Space Mono**, uppercase, `letter-spacing: 0.08em`.

### Cards semitransparentes — `.surface-card`

Sustituye al concepto `.card` con fondo sólido del borrador anterior.

```css
.surface-card {
  border-radius: 14px;
  border: 1px solid var(--color-border-default);
  padding: 1.75rem;
  background: rgba(22, 22, 42, 0.38);
  transition: border-color 0.2s ease, background 0.2s ease;
}
.surface-card:hover {
  border-color: var(--color-border-blue);
  background: rgba(30, 30, 53, 0.52);
}
```

Usado por: `FeatureCard`, `ServiceCard`, y como base visual compartida.

### Feature cards — `FeatureCard.astro`

Grid asimétrico en desktop (`Features.astro`):

```
Columnas: 5fr  3.5fr  3.5fr
Fila 1: [Card 01 — tall, row-span 2] [Card 02] [Card 03]
Fila 2:                               [Card 04 — col-span 2]
```

- Número grande arriba (`feature-card__num`) — Clash 600, azul sólido
- Watermark del mismo número abajo derecha, `opacity: 0.07`
- Footnote abajo en Space Mono uppercase azul (`opacity: 0.75`)
- `gap-3` entre cards

### Service cards — `ServiceCard.astro`

Misma base `.surface-card` + patrón de icono (como el watermark numérico en features):

- **Icono Lucide** arriba izquierda (`service-card__icon`) — azul, ~3rem
- **Mismo icono** como watermark abajo derecha (`opacity: 0.07`)
- Título, cuerpo, footer con precio (Clash 500) + `btn-ghost`

Iconos en `src/components/ui/icons/` (Lucide, stroke). Registro: `icons/registry.ts`.

### Sistema de iconos

```
src/components/ui/icons/
  globe.svg, shopping-bag.svg, wrench.svg   ← servicios
  mail.svg, whatsapp.svg, chevron-down.svg  ← contacto
  quote-ornate.svg                          ← testimonios / caso destacado
  corner-tl.svg, corner-br.svg              ← PhotoStatement
  registry.ts                               ← mapa + iconDataUri()
```

Consumo: `Icon.astro` (Astro), `Icon.tsx` (React), `QuoteIcon.astro` (variante ornate).

### Quote — `QuoteIcon.astro`

| Variante | Implementación |
|----------|----------------|
| `glyph` | Carácter `"` en Clash, azul, opacidad baja (watermark en cards) |
| `ornate` | SVG `quote-ornate.svg` vía `Icon` |

Tones: `subtle` (opacity 0.06) / `strong` (0.28). Tamaños: `sm` / `lg` / `xl`.

### Stats — `Stats.astro`

Grid 2×2 móvil / 4 columnas desktop con bordes internos.

```css
.stat__value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  color: var(--color-blue);  /* no blanco */
}
```

Labels: Space Mono `0.625rem`, uppercase, muted.

### Marquee — `Marquee.astro`

- Dentro del flujo del hero (`hero-screen__marquee`)
- `section-bg--elevated`, borde superior, `py-3`
- Animación CSS `marquee` **22s** linear infinite
- Items: Space Mono uppercase muted, separador `·` azul

### Projects fan — `ProjectsFan.astro`

**Desktop:** 5 cards en abanico (ángulos ±9°, ±4°, centro recto), hover endereza. Tamaño ~`clamp(250px, 19vw, 300px)` × `clamp(380px, 38vw, 520px)`, `border-radius: 24px`, sombra `0 24px 56px rgba(0,0,0,0.45)`.

**Móvil:** carrusel horizontal con scroll-snap (`projects-fan__scroll`), cards 280×400px.

Media: imagen `object-fit: cover`, `object-position: top center`. Info inferior con sector (mono azul), nombre (Clash), URL (mono muted).

### PhotoStatement — `PhotoStatement.astro`

**No** es foto a sangre en columna completa. Es retrato **encuadrado**:

- Grid `42fr / 58fr`
- Foto `aspect-ratio: 3/4`, `border-radius: 14px`, `max-width: 22.5rem`, centrada en columna
- Filtro: `brightness(0.78) contrast(1.06) saturate(0.88)`
- Esquinas decorativas azules (`corner-tl`, `corner-br`) fuera del marco
- Texto a la derecha con eyebrow, H2, cuerpo, `btn-ghost`

### Testimonios — `Testimonials.astro`

**Carrusel** (no bento grid). Datos desde Google Reviews API.

- Un slide visible; transición opacity 0.55s
- `QuoteIcon` ornate + cita en Inter italic
- Meta: autor · tiempo · Google (Space Mono)
- Navegación: dots pill (`0.375rem` → activo `2rem` ancho, azul)
- Script: `testimonials-carousel.ts` (respeta `prefers-reduced-motion`)

### Caso destacado — `FeaturedCase.astro`

Bloque editorial con borde izquierdo azul `3px`, `QuoteIcon` ornate, headline con `headline-gradient` + `<em>`, metadata mono, `btn-ghost`.

### Formulario — `ContactForm.tsx`

- Labels: Space Mono `0.625rem`, uppercase, muted
- Inputs/selects/textarea: Inter, `border-radius: 14px` (`--radius-lg`), fondo `--color-bg-surface`
- Selects: `appearance: none`; chevron con `Icon` (`chevron-down`) en un contenedor `position: relative` (no `background-image` — el color en `iconDataUri` debe ser hex sin URL-encode, p. ej. `#2B47EC`)
- Iconos de contacto: `Icon` React (`mail`, `whatsapp`)
- Submit: `btn btn-primary` (ancho al contenido, `align-self: flex-start`; sin `btn--block`)

### Page loader — `PageLoader.astro`

Pantalla inicial fija (`z-index: 9999`) con símbolo del favicon y degradado animado (mask del SVG). Mínimo 900ms, máximo 4500ms. Al terminar: `body.is-loading` se quita y el loader se elimina del DOM.

---

## 7. Sistema de hero

```
1. Eyebrow     ← [ TEXTO ] en Space Mono azul
2. H1          ← Clash 500, degradado + un <em> italic con degradado azul
3. Subtítulo   ← Inter, text-secondary
4. CTAs        ← primary + outline (pills)
5. Checks      ← lista con punto azul (Inter, no mono)
6. Marquee     ← separador animado bajo el hero
```

Hero centrado, `max-width: 760px` en el bloque de texto.

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
```

### Reduced motion

Respetar `prefers-reduced-motion: reduce` en carrusel, fondo animado y page loader.

---

## 9. Reglas absolutas

| ❌ Nunca | ✅ Siempre |
|---------|-----------|
| Fondo blanco o gris claro | Capas oscuras + vidrio semitransparente |
| Degradado logo fuera de marca | Solo "Byte", favicon, símbolo de fondo |
| Segundo color de acción | Solo `#2B47EC` |
| Botones rectangulares | Pills en primary/outline |
| Eyebrow con `●` o en Clash/Inter | Corchetes `[ ]` + Space Mono |
| Inter en botones | Space Mono en todos los `.btn` |
| Headlines en 600/700 | Clash **500** en H1–H3 |
| Clash en párrafos | Inter en cuerpo |
| Cards con fondo sólido opaco | `.surface-card` semitransparente |
| SVG inline sueltos en secciones | Iconos en `ui/icons/` vía `Icon` |
| Testimonios en grid estático | Carrusel con datos Google |
| Foto Flor a sangre en columna | Retrato 3:4 encuadrado + esquinas |
| Drop-shadow en cards de contenido | Sombra solo en fan-cards de proyectos |
| Marcadores `/ NN ·` en home, portfolio o contacto | Solo en landings `/servicios/*` (hilo editorial) |
| Sustituir eyebrow por marcador en servicios | Ambos: marcador = capítulo, eyebrow = etiqueta de sección |

---

## 10. Estructura de archivos

```
src/
  components/
    ui/
      Eyebrow.astro
      Button.astro
      Icon.astro · Icon.tsx
      icons/              ← todos los SVG + registry.ts
      QuoteIcon.astro
      FeatureCard.astro
      ServiceCard.astro
      SurfaceCard.astro
      SiteBackground.astro
      PageLoader.astro
    sections/
      Navbar.astro
      Hero.astro
      Marquee.astro
      FeaturedCase.astro
      Stats.astro
      Features.astro
      ProjectsFan.astro
      PhotoStatement.astro
      Testimonials.astro
      Services.astro
      servicios/          ← landings de servicio (marcadores de capítulo)
        HeroServicio.astro
        ParaQuienEs.astro
        QueIncluye.astro
        PrecioServicio.astro
        CasosRelacionados.astro
        OtrosServicios.astro
        CTAFinalServicio.astro
      FAQ.tsx
      ContactForm.tsx
      Footer.astro
  data/
    services.ts           ← copy y estructura por servicio
  layouts/
    Base.astro
  pages/
    index.astro
    servicios/
      web-corporativa.astro
  scripts/
    interactive-dots.ts
    testimonials-carousel.ts
  styles/
    global.css
  lib/
    google-reviews.ts
public/
  favicon.svg (fuente única del símbolo)
  favicon.ico · PNG favicon · apple-touch · android-chrome — generados con `pnpm images:favicons` (gitignored)
  assets/
    brand/flor-rimobyte.webp
    projects/…
docs/
  DESIGN.md
```

---

## 11. Qué hace único a RimoByte

1. **Degradado editorial en headlines** — blanco→gris en el título, azul degradado en el único *italic*.
2. **Fondo vivo** — puntos interactivos + símbolo de marca respirando detrás del vidrio.
3. **Eyebrows con corchetes** — sensación de metadata técnica, no decoración genérica.
4. **Cards semitransparentes** — el contenido flota sobre el fondo, no bloques opacos.
5. **Feature + service cards con watermark** — número o icono grande fantasma abajo derecha.
6. **Fan de proyectos** — memorable en desktop; carrusel usable en móvil.
7. **Retrato encuadrado con esquinas** — Flor visible como persona, no stock hero genérico.
8. **Un solo azul de acción** — coherencia total en CTAs, iconos y acentos.
9. **Marcadores de capítulo en servicios** — landings largas con índice `/ NN ·` solo en `/servicios/*`; el resto del sitio usa eyebrow y layout variado.

---

*Fuente de verdad para rimobyte.com. Si el código y este doc divergen, el código manda hasta que se actualice el doc.*

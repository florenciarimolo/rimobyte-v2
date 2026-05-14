# DESIGN.md — RimoByte
> Sistema de diseño para rimobyte.com  
> Stack: Astro + React (Astro Islands)  
> Estética: Dark minimalism premium · Tech editorial · Marca personal humana  
> Versión: 2.0 · Mayo 2026

---

## 1. Filosofía de diseño

**Tensión creativa central:** La frialdad del tech editorial (Linear, Vercel) humanizada por la presencia real de una persona — Flor. No es una agencia, es una ingeniera que trabaja contigo.

**Principios que gobiernan cada decisión:**
- La web es oscura — siempre. Sin excepciones de fondo claro.
- Espacios que respiran — nunca apretar, nunca rellenar por rellenar
- Tipografía como personalidad — Clash Grotesk para impacto, Inter para claridad humana
- Eyebrows/badges siempre en monospace mayúscula — señal técnica, no decorativa
- El azul #2B47EC es el único color de acción — sin segundos acentos cromáticos
- Fotos reales de Flor son obligatorias — sin ilustraciones que reemplacen a la persona

---

## 2. Paleta de color

### Sistema monocromático oscuro + azul

Todo el sitio vive en oscuro. La jerarquía de profundidad se construye con capas de negro/gris muy oscuro — no hay secciones claras.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-base` | `#0A0A12` | Fondo base de toda la web |
| `--color-bg-elevated` | `#0F0F1A` | Cards, secciones con ligero contraste |
| `--color-bg-surface` | `#16162A` | Cards hover, inputs, superficies interactivas |
| `--color-bg-subtle` | `#1C1C35` | Bordes visibles, separadores activos |

### Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-text-primary` | `#F0F0F8` | Titulares y texto principal |
| `--color-text-secondary` | `rgba(240,240,248,0.6)` | Cuerpo de texto, descripciones |
| `--color-text-muted` | `rgba(240,240,248,0.35)` | Placeholders, metadata, texto terciario |

### Acción — azul único

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-blue` | `#2B47EC` | Único color de acción — botones, links, eyebrows, numeración |
| `--color-blue-hover` | `#1E35D4` | Estado hover |
| `--color-blue-subtle` | `rgba(43,71,236,0.12)` | Glow suave, fondos de hover |
| `--color-blue-border` | `rgba(43,71,236,0.25)` | Bordes activos |

### Bordes

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-border-default` | `rgba(240,240,248,0.07)` | Cards en reposo |
| `--color-border-hover` | `rgba(240,240,248,0.14)` | Cards en hover genérico |
| `--color-border-blue` | `rgba(43,71,236,0.3)` | Cards/elementos activos o destacados |

### Degradado del logo (SOLO aquí)

```css
--gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);
```

**REGLA ABSOLUTA:** Este degradado existe únicamente en:
1. El símbolo del favicon
2. La palabra "Byte" en el logotipo textual

Nunca en botones, fondos, bordes, separadores ni elementos decorativos.

### Variables CSS completas

```css
:root {
  /* Backgrounds — dark only */
  --color-bg-base:     #0A0A12;
  --color-bg-elevated: #0F0F1A;
  --color-bg-surface:  #16162A;
  --color-bg-subtle:   #1C1C35;

  /* Text */
  --color-text-primary:   #F0F0F8;
  --color-text-secondary: rgba(240,240,248,0.6);
  --color-text-muted:     rgba(240,240,248,0.35);

  /* Action — blue only */
  --color-blue:        #2B47EC;
  --color-blue-hover:  #1E35D4;
  --color-blue-subtle: rgba(43,71,236,0.12);
  --color-blue-border: rgba(43,71,236,0.25);

  /* Borders */
  --color-border-default: rgba(240,240,248,0.07);
  --color-border-hover:   rgba(240,240,248,0.14);
  --color-border-blue:    rgba(43,71,236,0.3);

  /* Logo gradient */
  --gradient-logo: linear-gradient(135deg, #196BEE 0%, #6535E5 50%, #E715D1 100%);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.35s ease;
}
```

---

## 3. Tipografía

### Familias

**Clash Grotesk** — titulares H1/H2/H3. Variable font con pesos 400–700. CDN gratuito via Fontshare.

**Inter** — cuerpo, subtítulos, botones, UI. Omnipresente, invisible por diseño.

**Monospace del sistema** — eyebrows/badges y numeración técnica únicamente. Stack del sistema — sin importar familia externa.

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --font-display: 'Clash Grotesk', -apple-system, sans-serif;
  --font-body:    'Inter', -apple-system, sans-serif;
  --font-mono:    'SF Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
}
```

### Escala tipográfica

| Elemento | Familia | Peso | Tamaño | Line-height | Letter-spacing |
|----------|---------|------|--------|-------------|----------------|
| H1 (hero) | Clash Grotesk | 700 | clamp(2.75rem, 5.5vw, 4.5rem) | 1.05 | -0.03em |
| H2 (sección) | Clash Grotesk | 600 | clamp(2rem, 3.5vw, 3rem) | 1.1 | -0.02em |
| H3 (card title) | Clash Grotesk | 500 | 1.25rem | 1.3 | -0.01em |
| Subtítulo hero | Inter | 400 | clamp(1rem, 2vw, 1.2rem) | 1.75 | 0 |
| Cuerpo | Inter | 400 | 1rem | 1.75 | 0 |
| **Eyebrow / Badge** | **monospace** | **400** | **0.7rem** | **1** | **0.12em** |
| CTA / Botón | Inter | 600 | 0.9375rem | 1 | 0 |
| Numeración técnica | monospace | 400 | 0.8125rem | 1 | 0.04em |

### Reglas tipográficas

- H1, H2, H3 siempre en Clash Grotesk — solo en titulares
- Subtítulos, cuerpo, botones: Inter
- **Eyebrows: siempre `var(--font-mono)`, siempre `text-transform: uppercase`**
- Eyebrows llevan `●` como prefijo — también en mono
- Nunca Clash Grotesk en texto de cuerpo corrido
- Máximo dos familias visibles en pantalla (mono cuenta como neutro técnico)

---

## 4. Espaciado y layout

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  --space-32: 8rem;
}

.section         { padding: clamp(4rem, 8vw, 7rem) 0; }
.section-hero    { padding: clamp(6rem, 12vw, 10rem) 0 clamp(5rem, 9vw, 8rem); }
.section-compact { padding: clamp(2.5rem, 5vw, 4rem) 0; }
```

---

## 5. Componentes base

### Logo

```css
.logo        { font-family: var(--font-display); font-weight: 700; font-size: 1.375rem; letter-spacing: -0.03em; text-decoration: none; }
.logo__rimo  { color: var(--color-text-primary); }
.logo__byte  { background: var(--gradient-logo); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
```

### Eyebrow

```css
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-blue);
}
.eyebrow__dot { font-size: 0.5rem; opacity: 0.7; }
```

> Eyebrow es texto puro — sin fondo, sin borde-radius. Más editorial que UI.

### Botones

```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--color-blue); color: #FFF;
  font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600;
  padding: 0.875rem 1.75rem; border-radius: 0.5rem; border: none;
  cursor: pointer; text-decoration: none; white-space: nowrap;
  transition: background var(--transition-base), transform var(--transition-fast);
}
.btn-primary:hover  { background: var(--color-blue-hover); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }

.btn-outline {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: transparent; color: var(--color-text-primary);
  font-family: var(--font-body); font-size: 0.9375rem; font-weight: 600;
  padding: 0.875rem 1.75rem; border-radius: 0.5rem;
  border: 1px solid var(--color-border-hover);
  cursor: pointer; text-decoration: none; white-space: nowrap;
  transition: border-color var(--transition-base), background var(--transition-base);
}
.btn-outline:hover { border-color: var(--color-blue-border); background: var(--color-blue-subtle); }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 0.375rem;
  background: transparent; color: var(--color-blue);
  font-family: var(--font-body); font-size: 0.9375rem; font-weight: 500;
  border: none; padding: 0; cursor: pointer; text-decoration: none;
  transition: gap var(--transition-base);
}
.btn-ghost:hover { gap: 0.625rem; }
```

### Card de diferenciador

```css
.card-feature {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 1rem; padding: 1.75rem;
  transition: border-color var(--transition-base), background var(--transition-base);
}
.card-feature:hover { border-color: var(--color-border-blue); background: var(--color-bg-surface); }
.card-feature__number {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--color-blue); margin-bottom: 1.25rem;
}
.card-feature__title {
  font-family: var(--font-display); font-size: 1.125rem; font-weight: 600;
  color: var(--color-text-primary); letter-spacing: -0.01em; margin-bottom: 0.625rem;
}
.card-feature__body { font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.75; }
```

### Card de proyecto

```css
.card-project {
  display: block; overflow: hidden; border-radius: 0.875rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  text-decoration: none;
  transition: border-color var(--transition-base), transform var(--transition-slow);
}
.card-project:hover { border-color: var(--color-border-blue); transform: translateY(-4px); }
.card-project__thumb { width: 100%; aspect-ratio: 16/10; object-fit: cover; display: block; background: var(--color-bg-surface); }
.card-project__body  { padding: 1.25rem 1.5rem 1.5rem; }
.card-project__sector {
  font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--color-blue); margin-bottom: 0.375rem;
}
.card-project__title {
  font-family: var(--font-display); font-size: 1rem; font-weight: 600;
  color: var(--color-text-primary); letter-spacing: -0.01em;
}
```

### Testimonio

```css
.testimonial {
  position: relative; padding: 2rem 2rem 1.75rem;
  background: var(--color-bg-elevated);
  border-radius: 1rem; border: 1px solid var(--color-border-default);
}
.testimonial::before {
  content: '"'; position: absolute; top: 0.75rem; left: 1.75rem;
  font-family: var(--font-display); font-size: 5rem; font-weight: 700;
  color: var(--color-blue); opacity: 0.1; line-height: 1; pointer-events: none;
}
.testimonial__quote  { font-size: 1rem; line-height: 1.75; color: var(--color-text-primary); font-style: italic; margin-bottom: 1.5rem; }
.testimonial__author { font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary); }
.testimonial__meta   { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-muted); margin-top: 0.25rem; }
```

### Stat (número grande)

```css
.stat__value { font-family: var(--font-display); font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 700; color: var(--color-text-primary); letter-spacing: -0.03em; line-height: 1; }
.stat__label { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-muted); margin-top: 0.375rem; }
```

### Checks

```css
.check-list { display: flex; flex-wrap: wrap; gap: 0.625rem 1.5rem; list-style: none; padding: 0; margin: 0; }
.check-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--color-text-secondary); }
.check-item::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--color-blue); opacity: 0.7; flex-shrink: 0; }
```

### Formulario

```css
.form-label { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 0.5rem; display: block; }
.form-input, .form-select, .form-textarea {
  font-family: var(--font-body); font-size: 0.9375rem;
  color: var(--color-text-primary); background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default); border-radius: 0.5rem;
  padding: 0.875rem 1rem; outline: none; width: 100%;
  transition: border-color var(--transition-base), background var(--transition-base);
}
.form-input::placeholder, .form-textarea::placeholder { color: var(--color-text-muted); }
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: var(--color-blue-border);
  background: var(--color-bg-subtle);
  box-shadow: 0 0 0 3px rgba(43,71,236,0.08);
}
```

---

## 6. Sistema de hero

Estructura fija en todas las páginas:

```
1. Eyebrow   ← monospace uppercase azul, siempre presente
2. H1        ← Clash Grotesk 700
3. Descripción ← Inter 400, color-text-secondary
4. CTA(s)    ← al menos uno; dos en páginas de captación
5. Checks    ← opcional, solo donde refuerzan la conversión
```

Todos los heros: fondo `--color-bg-base` (#0A0A12).

### Eyebrow por página

| Página | Texto |
|--------|-------|
| Home | `● DISEÑO WEB · DESARROLLO · ESPAÑA` |
| Sobre mí | `● INGENIERA INFORMÁTICA · FREELANCE` |
| Contacto | `● HABLEMOS` |
| Proyectos | `● PORTFOLIO · 8 PROYECTOS` |
| Web corporativa | `● SERVICIO · WEB CORPORATIVA` |
| Tienda online | `● SERVICIO · TIENDA ONLINE` |
| Mantenimiento | `● SERVICIO · MANTENIMIENTO WEB` |
| Sectores | `● WEB PARA [SECTOR]` |
| Blog | `● BLOG · CONSEJOS Y RECURSOS` |

---

## 7. Jerarquía de fondos oscuros

Sin fondos claros en ninguna sección. El ritmo visual se crea con:

```
#0A0A12  ← base — fondo de página y heros
#0F0F1A  ← elevated — cards, franja de stats, secciones destacadas
#16162A  ← surface — cards en hover, inputs
#1C1C35  ← subtle — bordes visibles cuando hay énfasis
```

**Cómo separar secciones sin fondos claros:**
- Línea `1px solid var(--color-border-default)` entre secciones
- Cards con `--color-bg-elevated` flotando sobre base `--color-bg-base`
- Franja de sección con `--color-bg-elevated` como fondo de banda completa
- Variación de padding generoso / compacto para crear respiración visual

---

## 8. Animaciones y motion

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s cubic-bezier(0.16,1,0.3,1),
              transform 0.55s cubic-bezier(0.16,1,0.3,1);
}
.reveal.is-visible        { opacity: 1; transform: translateY(0); }
.reveal:nth-child(1)      { transition-delay: 0ms; }
.reveal:nth-child(2)      { transition-delay: 60ms; }
.reveal:nth-child(3)      { transition-delay: 120ms; }
.reveal:nth-child(4)      { transition-delay: 180ms; }
```

```js
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## 9. Navbar

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 1.25rem 0;
  transition: background var(--transition-slow), border-color var(--transition-slow);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(10,10,18,0.85);
  backdrop-filter: blur(16px);
  border-bottom-color: var(--color-border-default);
}
.nav-link {
  font-family: var(--font-body); font-size: 0.875rem; font-weight: 500;
  color: var(--color-text-secondary); text-decoration: none;
  transition: color var(--transition-base);
}
.nav-link:hover { color: var(--color-text-primary); }
```

---

## 10. Footer

```
Fondo: var(--color-bg-elevated)
Borde superior: 1px solid var(--color-border-default)
Logo izquierda · Links centro · Email derecha
Copyright: var(--font-mono), muted, 0.65rem uppercase
```

---

## 11. Reglas absolutas (nunca romper)

| ❌ Nunca | ✅ Siempre |
|---------|-----------|
| Fondo blanco o gris claro | Todo sobre oscuro `#0A0A12` / `#0F0F1A` |
| Degradado fuera del logo | Solo símbolo + "Byte" |
| Segundo acento cromático (ámbar u otro) | Solo `#2B47EC` como color de acción |
| Eyebrow en Inter o Clash Grotesk | Siempre `var(--font-mono)` uppercase |
| Clash Grotesk en cuerpo de texto | Solo H1, H2, H3 |
| Botones con degradado | Azul sólido o contorno oscuro |
| Reemplazar foto de Flor | Foto real, siempre |

---

## 12. Estructura de archivos (Astro)

```
src/
  layouts/
    Base.astro        ← fonts, meta, CSS vars, navbar, footer
    Page.astro        ← layout estándar con hero
  components/
    ui/
      Eyebrow.astro
      Button.astro
      Card.astro
    sections/
      Hero.astro
      Features.astro
      Projects.astro
      Testimonials.astro
      Stats.astro
      FAQ.astro
      ContactForm.astro
  pages/
    index.astro
    sobre-mi.astro
    proyectos/index.astro · [slug].astro
    servicios/web-corporativa.astro · tienda-online.astro · mantenimiento-web.astro
    web-para-[sector].astro
    blog/index.astro · [slug].astro
    contacto.astro
  styles/
    global.css
    typography.css
    components.css
```

---

*Este documento es la fuente de verdad para rimobyte.com.*

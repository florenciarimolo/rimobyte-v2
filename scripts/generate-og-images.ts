/**
 * Pre-genera PNG OG (1200×630) para páginas que usan la imagen por defecto (retrato).
 * Posts del blog y fichas de proyecto tienen OG propias (.webp); no entran aquí.
 *
 * Ejecutar: `pnpm images:og` (también en `prebuild`).
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { generateOgImage } from '../src/lib/og/generate.ts';
import { services } from '../src/data/services.ts';
import { sectors } from '../src/data/sectors.ts';
import { pathnameToOgBasename, stripBrandSuffix } from '../src/lib/og/url.ts';

/** Mantener alineado con SEO de cada página `.astro`. */
const STATIC_PAGES: { routePath: string; title: string; description: string }[] = [
  {
    routePath: '/',
    title: 'Diseñadora web freelance para negocios locales · RimoByte',
    description:
      'Soy Flor, ingeniera informática especializada en desarrollo web. Creo webs para negocios locales con acompañamiento real y sin letra pequeña — tuya desde el primer día.',
  },
  {
    routePath: '/sobre-mi/',
    title: 'Flor Rímolo — Diseñadora web freelance · RimoByte',
    description:
      'Graduada en 2019, especializada en desarrollo web para negocios locales. Trabajo directamente con el cliente sin intermediarios. Tu web es tuya desde el primer día.',
  },
  {
    routePath: '/contacto/',
    title: 'Contacto — Presupuesto web para negocios locales · RimoByte',
    description:
      'Cuéntame tu proyecto y te respondo sin tecnicismos. Diseño y desarrollo web para negocios locales — Flor Rímolo.',
  },
  {
    routePath: '/blog/',
    title: 'Blog sobre diseño web para negocios · RimoByte',
    description:
      'Guías sobre cuánto cuesta una web para tu negocio, por qué debe ser tuya (dominio y hosting a tu nombre) y cómo combinar web e Instagram.',
  },
  {
    routePath: '/politica-privacidad/',
    title: 'Política de privacidad · RimoByte',
    description:
      'Información sobre el tratamiento de datos personales en rimobyte.com: formulario de contacto, reCAPTCHA, correo y reseñas públicas. Flor Rímolo — RimoByte.',
  },
  {
    routePath: '/politica-cookies/',
    title: 'Política de cookies · RimoByte',
    description:
      'Qué cookies y tecnologías similares se usan en rimobyte.com, incluido reCAPTCHA v3 de Google, y cómo gestionarlas. RimoByte.',
  },
  {
    routePath: '/servicios/',
    title: 'Servicios de diseño web para negocios locales · RimoByte',
    description:
      'Web corporativa, tienda online y mantenimiento web para autónomos y negocios locales. Presupuesto cerrado, tuya desde el primer día.',
  },
];

async function writeOgPng(basename: string, title: string, description: string) {
  const png = await generateOgImage({
    title: stripBrandSuffix(title),
    description,
  });
  const optimized = await sharp(png).png({ compressionLevel: 9 }).toBuffer();
  const outDir = path.join(process.cwd(), 'public/assets/og');
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, `${basename}.png`), optimized);
}

async function main() {
  const entries: { basename: string; title: string; description: string }[] = STATIC_PAGES.map((p) => ({
    basename: pathnameToOgBasename(p.routePath),
    title: p.title,
    description: p.description,
  }));

  for (const s of services) {
    entries.push({
      basename: pathnameToOgBasename(`/servicios/${s.slug}/`),
      title: s.seo.title,
      description: s.seo.description,
    });
  }

  for (const sector of sectors) {
    entries.push({
      basename: pathnameToOgBasename(`/${sector.slug}/`),
      title: sector.seo.title,
      description: sector.seo.description,
    });
  }

  for (const e of entries) {
    console.info('[images:og]', e.basename);
    await writeOgPng(e.basename, e.title, e.description);
  }

  console.info('[images:og] OK —', entries.length, 'archivos');
}

main().catch((err) => {
  console.error('[images:og]', err);
  process.exit(1);
});

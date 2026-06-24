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
import { staticOgPageEntries } from '../src/data/staticPageSeo.ts';
import { pathnameToOgBasename, stripBrandSuffix } from '../src/lib/og/url.ts';

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
  const entries: { basename: string; title: string; description: string }[] =
    staticOgPageEntries().map(({ routePath, seo }) => ({
      basename: pathnameToOgBasename(routePath),
      title: seo.title,
      description: seo.description,
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

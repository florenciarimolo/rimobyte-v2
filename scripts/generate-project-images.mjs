/**
 * Genera variantes WebP para tarjetas de la home (strip + featured) y capturas móviles.
 * Ejecutar tras añadir o cambiar imágenes en public/assets/projects/*.webp
 *
 *   pnpm run images:projects
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../public/assets/projects');
const outDir = path.join(root, 'generated');

/** Mismos valores que src/data/projectImages.ts */
const bases = [
  'vila-i-lancis',
  'lucia-nails-art',
  'supercapaces',
  'rock-zone-camp',
  'ariadna-vilalta',
  'jlg-ki',
  'juancar-garma-reset7',
  'de-cos',
  'fenix',
];

/** Capturas móvil con nombre propio (no siguen el patrón {proyecto}-mobile) */
const mobileCaptures = ['vila-lancis-mobile'];

async function generateVariants(name, widths) {
  const input = path.join(root, `${name}.webp`);
  try {
    await fs.access(input);
  } catch {
    console.warn(`[skip] no existe: ${input}`);
    return;
  }

  for (const w of widths) {
    const dest = path.join(outDir, `${name}-w${w}.webp`);
    await sharp(input)
      .resize({
        width: w,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: 82, effort: 4 })
      .toFile(dest);
    console.log('OK', path.relative(process.cwd(), dest));
  }
}

await fs.mkdir(outDir, { recursive: true });

for (const base of bases) {
  await generateVariants(base, [400, 800]);

  const mobileName = `${base}-mobile`;
  const mobileInput = path.join(root, `${mobileName}.webp`);
  try {
    await fs.access(mobileInput);
    await generateVariants(mobileName, [320, 640]);
  } catch {
    // Sin captura móvil para este proyecto
  }
}

for (const mobile of mobileCaptures) {
  await generateVariants(mobile, [320, 640]);
}

console.log('Listo.');

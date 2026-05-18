/**
 * Convierte JPG/PNG en public/assets/blog/ a WebP y genera variantes:
 *   {slug}.webp              — referencia principal (max 1200w)
 *   generated/{slug}-card-w400|800.webp  — cards del índice (16:10)
 *   generated/{slug}-hero-w1600.webp     — fondo del hero
 *   generated/{slug}-og.webp             — Open Graph 1200×630
 *
 *   pnpm run images:blog
 *   pnpm run images:blog -- --slug=cuanto-cuesta-una-pagina-web
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../public/assets/blog');
const outDir = path.join(root, 'generated');

const CARD_WIDTHS = [400, 800];
const CARD_ASPECT = 16 / 10;
const MASTER_WIDTH = 1200;
const HERO_WIDTH = 1600;
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const slugArg = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1];

async function findSources() {
  const entries = await fs.readdir(root, { withFileTypes: true });
  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
  return entries
    .filter((e) => e.isFile() && exts.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.basename(e.name, path.extname(e.name)))
    .filter((base) => base !== 'generated' && (!slugArg || base === slugArg));
}

await fs.mkdir(outDir, { recursive: true });

const slugs = await findSources();
if (slugs.length === 0) {
  console.warn('No hay imágenes fuente en public/assets/blog/ (*.jpg, *.png, *.webp)');
  process.exit(0);
}

for (const slug of slugs) {
  const candidates = ['.jpg', '.jpeg', '.png', '.webp'].map((ext) =>
    path.join(root, `${slug}${ext}`),
  );
  let inputPath = null;
  for (const p of candidates) {
    try {
      await fs.access(p);
      inputPath = p;
      break;
    } catch {
      /* siguiente extensión */
    }
  }
  if (!inputPath) {
    console.warn(`[skip] sin fuente para: ${slug}`);
    continue;
  }

  const pipeline = sharp(await fs.readFile(inputPath)).rotate();

  await pipeline
    .clone()
    .resize({ width: MASTER_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(root, `${slug}.webp`));
  console.log('OK', `assets/blog/${slug}.webp`);

  await pipeline
    .clone()
    .resize({ width: HERO_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(outDir, `${slug}-hero-w1600.webp`));
  console.log('OK', `assets/blog/generated/${slug}-hero-w1600.webp`);

  await pipeline
    .clone()
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85, effort: 4 })
    .toFile(path.join(outDir, `${slug}-og.webp`));
  console.log('OK', `assets/blog/generated/${slug}-og.webp`);

  for (const w of CARD_WIDTHS) {
    const h = Math.round(w / CARD_ASPECT);
    await pipeline
      .clone()
      .resize(w, h, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82, effort: 4 })
      .toFile(path.join(outDir, `${slug}-card-w${w}.webp`));
    console.log('OK', `assets/blog/generated/${slug}-card-w${w}.webp`);
  }

  if (/\.(jpe?g|png)$/i.test(inputPath)) {
    await fs.unlink(inputPath);
    console.log('removed source', path.relative(process.cwd(), inputPath));
  }
}

console.log('Listo.');

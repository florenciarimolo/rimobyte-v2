/**
 * Genera favicons PNG + ICO desde `public/favicon.svg` (salida en `public/`).
 * Ejecutar: `pnpm images:favicons` (también en `prebuild`).
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const root = process.cwd();
const svgPath = path.join(root, 'public/favicon.svg');

async function pngFromSvg(size) {
  const svg = await readFile(svgPath);
  return sharp(svg).resize(size, size).png().toBuffer();
}

async function main() {
  const buf16 = await pngFromSvg(16);
  const buf32 = await pngFromSvg(32);
  const buf180 = await pngFromSvg(180);
  const buf192 = await pngFromSvg(192);
  const buf512 = await pngFromSvg(512);

  const ico = await pngToIco([buf16, buf32]);

  await writeFile(path.join(root, 'public/favicon-16x16.png'), buf16);
  await writeFile(path.join(root, 'public/favicon-32x32.png'), buf32);
  await writeFile(path.join(root, 'public/apple-touch-icon.png'), buf180);
  await writeFile(path.join(root, 'public/android-chrome-192x192.png'), buf192);
  await writeFile(path.join(root, 'public/android-chrome-512x512.png'), buf512);
  await writeFile(path.join(root, 'public/favicon.ico'), ico);

  console.info('[images:favicons] OK');
}

main().catch((err) => {
  console.error('[images:favicons]', err);
  process.exit(1);
});

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { OgTemplate } from './template';
import { OG_HEIGHT, OG_WIDTH } from './constants';

interface OgAssets {
  portraitSrc: string;
  faviconSrc: string;
  fonts: { name: string; data: Buffer; weight: 400 | 500; style: 'normal' }[];
}

let assetsPromise: Promise<OgAssets> | null = null;

async function loadAssets(): Promise<OgAssets> {
  const root = process.cwd();
  const [portraitWebp, faviconSvg, interData, clashData] = await Promise.all([
    readFile(path.join(root, 'public/assets/brand/flor-rimobyte.webp')),
    readFile(path.join(root, 'public/favicon.svg')),
    readFile(path.join(root, 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff')),
    readFile(path.join(root, 'src/assets/fonts/clash-grotesk-500.ttf')),
  ]);

  const [portraitPng, faviconPng] = await Promise.all([
    sharp(portraitWebp).resize(560, 560, { fit: 'cover' }).png().toBuffer(),
    sharp(faviconSvg).resize(64, 64).png().toBuffer(),
  ]);

  return {
    portraitSrc: `data:image/png;base64,${portraitPng.toString('base64')}`,
    faviconSrc: `data:image/png;base64,${faviconPng.toString('base64')}`,
    fonts: [
      { name: 'Inter', data: interData, weight: 400, style: 'normal' },
      { name: 'Clash Grotesk', data: clashData, weight: 500, style: 'normal' },
    ],
  };
}

function getAssets(): Promise<OgAssets> {
  assetsPromise ??= loadAssets();
  return assetsPromise;
}

export async function generateOgImage({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Buffer> {
  const { portraitSrc, faviconSrc, fonts } = await getAssets();

  const svg = await satori(
    OgTemplate({ title, description, portraitSrc, faviconSrc }),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}

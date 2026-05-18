import type { APIRoute } from 'astro';
import { generateOgImage } from '../lib/og/generate';
import { OG_MAX_DESCRIPTION, OG_MAX_TITLE } from '../lib/og/constants';
import { stripBrandSuffix } from '../lib/og/url';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const rawTitle = url.searchParams.get('title')?.trim();
  const rawDescription = url.searchParams.get('description')?.trim();

  if (!rawTitle || !rawDescription) {
    return new Response('Faltan title o description', { status: 400 });
  }

  const title = stripBrandSuffix(rawTitle).slice(0, OG_MAX_TITLE);
  const description = rawDescription.slice(0, OG_MAX_DESCRIPTION);

  if (!title || !description) {
    return new Response('Parámetros inválidos', { status: 400 });
  }

  try {
    const png = await generateOgImage({ title, description });
    return new Response(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('[og.png]', error);
    return new Response('Error al generar la imagen', { status: 500 });
  }
};

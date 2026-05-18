import { DEFAULT_OG_IMAGE, OG_MAX_DESCRIPTION, OG_MAX_TITLE } from './constants';

/** Quita el sufijo de marca del `<title>` para el texto del cartel OG. */
export function stripBrandSuffix(title: string): string {
  const stripped = title.replace(/\s*·\s*RimoByte\s*$/i, '').trim();
  return stripped || title;
}

function normalizeImagePath(image: string): string {
  try {
    const url = new URL(image);
    return url.pathname;
  } catch {
    return image.split('?')[0] ?? image;
  }
}

/** Basename del PNG pre-generado en `public/assets/og/` — debe coincidir con `scripts/generate-og-images.ts`. */
export function pathnameToOgBasename(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (normalized === '/') return 'home';
  return normalized.slice(1).replace(/\//g, '__');
}

/** `true` si la página no define una imagen OG propia (usa el retrato por defecto o ninguna). */
export function isDefaultOgImage(image?: string): boolean {
  if (!image) return true;
  const path = normalizeImagePath(image);
  return path === DEFAULT_OG_IMAGE || path.endsWith('/flor-rimobyte.webp');
}

export function buildOgImagePath(title: string, description: string): string {
  const params = new URLSearchParams({
    title: stripBrandSuffix(title).slice(0, OG_MAX_TITLE),
    description: description.slice(0, OG_MAX_DESCRIPTION),
  });
  return `/og.png?${params.toString()}`;
}

export function resolveOgImage({
  image,
  pathname,
}: {
  image?: string;
  pathname: string;
}): string {
  if (!isDefaultOgImage(image)) return image!;
  return `/assets/og/${pathnameToOgBasename(pathname)}.png`;
}

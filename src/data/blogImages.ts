/**
 * Rutas de imágenes de blog en /public/assets/blog/.
 * Generar variantes con: pnpm run images:blog
 */
const BLOG_ASSETS = '/assets/blog';

export function blogCoverPath(slug: string): string {
  return `${BLOG_ASSETS}/${slug}.webp`;
}

export function blogCardSrc(slug: string, width: 400 | 800): string {
  return `${BLOG_ASSETS}/generated/${slug}-card-w${width}.webp`;
}

export function blogCardSrcset(slug: string): string {
  return `${blogCardSrc(slug, 400)} 400w, ${blogCardSrc(slug, 800)} 800w`;
}

export function blogHeroPath(slug: string): string {
  return `${BLOG_ASSETS}/generated/${slug}-hero-w1600.webp`;
}

export function blogOgPath(slug: string): string {
  return `${BLOG_ASSETS}/generated/${slug}-og.webp`;
}

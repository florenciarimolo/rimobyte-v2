import { defineMiddleware } from 'astro:middleware';
import { publicRouteSet } from './data/sitemapRedirects';

function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function isPassthrough(pathname: string): boolean {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/assets/') ||
    pathname === '/favicon.svg' ||
    pathname === '/site.webmanifest' ||
    pathname === '/robots.txt' ||
    pathname.startsWith('/sitemap')
  );
}

export const onRequest = defineMiddleware((context, next) => {
  const pathname = normalizePathname(context.url.pathname);

  if (isPassthrough(pathname)) {
    return next();
  }

  if (publicRouteSet.has(pathname)) {
    return next();
  }

  return context.redirect('/', 301);
});

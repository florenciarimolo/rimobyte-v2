import { defineMiddleware } from 'astro:middleware';
import { legacySitemapRedirects } from './data/sitemapRedirects';

export const onRequest = defineMiddleware((context, next) => {
  const pathKey = context.url.pathname.replace(/\/$/, '') || '/';
  const destination =
    legacySitemapRedirects[pathKey as keyof typeof legacySitemapRedirects];

  if (destination) {
    return context.redirect(destination, 301);
  }

  return next();
});

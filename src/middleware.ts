import { defineMiddleware } from 'astro:middleware';
import { legacySitemapRedirects } from './data/sitemapRedirects';
import { needsTrailingSlashRedirect } from './lib/trailing-slash';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname, search } = context.url;
  const pathKey = pathname.replace(/\/$/, '') || '/';
  const destination =
    legacySitemapRedirects[pathKey as keyof typeof legacySitemapRedirects];

  if (destination) {
    return context.redirect(destination, 301);
  }

  if (needsTrailingSlashRedirect(pathname)) {
    return context.redirect(`${pathname}/${search}`, 301);
  }

  return next();
});

// astro.config.mjs
// output: 'static' es el default en Astro 6 — páginas con prerender=false son serverless automáticamente
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';
import { legacySitemapRedirects } from './src/data/sitemapRedirects.ts';

export default defineConfig({
  adapter: vercel(),
  integrations: [react(), sitemap()],
  redirects: legacySitemapRedirects,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
    // Tras `astro build`, el caché de .vite puede preempaquetar jsx-dev-runtime en
    // producción (sin jsxDEV) y romper la hidratación en `astro dev`.
    ...(process.env.NODE_ENV !== 'production' && {
      optimizeDeps: {
        esbuildOptions: {
          define: {
            'process.env.NODE_ENV': '"development"',
          },
        },
      },
    }),
  },
  site: 'https://rimobyte.com',
});
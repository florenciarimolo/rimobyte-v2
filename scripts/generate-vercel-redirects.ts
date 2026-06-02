import { writeFileSync } from 'node:fs';
import { legacySitemapRedirects } from '../src/data/sitemapRedirects.ts';

const redirects = Object.entries(legacySitemapRedirects).map(([source, destination]) => ({
  source,
  destination,
  statusCode: 301,
}));

writeFileSync('vercel.json', `${JSON.stringify({ redirects }, null, 2)}\n`);
console.log(`vercel.json: ${redirects.length} redirects legacy`);

#!/usr/bin/env node
/**
 * Marca un post del calendario como publicado (tras merge del PR).
 *
 *   pnpm blog:mark-published -- --slug=mantenimiento-wordpress-empresas
 *   pnpm blog:mark-published -- --slug=mantenimiento-wordpress-empresas --date=2026-09-22
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const calendarPath = path.join(path.resolve(__dirname, '..'), 'content/blog-calendar.json');

function parseArgs() {
  const slug = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1];
  const date = process.argv.find((a) => a.startsWith('--date='))?.split('=')[1];
  if (!slug) throw new Error('Indica --slug=nombre-del-post');
  return { slug, date: date ?? new Date().toISOString().slice(0, 10) };
}

async function main() {
  const { slug, date } = parseArgs();
  const calendar = JSON.parse(await fs.readFile(calendarPath, 'utf8'));
  const post = calendar.posts.find((p) => p.slug === slug);

  if (!post) throw new Error(`No hay entrada para ${slug}`);
  post.status = 'published';
  post.publishedDate = date;
  delete post.branch;
  delete post.draftedAt;

  await fs.writeFile(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`, 'utf8');
  console.log(`Calendario actualizado: ${slug} → published (${date})`);
  console.log('Commitea el cambio en main tras el merge del PR.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Falla si hay clases Tailwind con sintaxis arbitraria (--token)
 * en lugar de utilidades generadas desde @theme.
 *
 * Ejecutar: pnpm lint:classes
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const PATTERN = /\b(text|bg|border|font)-\(--/g;
const EXT = /\.(astro|tsx)$/;

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (EXT.test(name)) files.push(path);
  }
  return files;
}

const hits = [];
for (const file of walk(SRC)) {
  const content = readFileSync(file, 'utf8');
  for (const line of content.split('\n')) {
    if (PATTERN.test(line)) {
      hits.push(`${relative(ROOT, file)}: ${line.trim()}`);
    }
    PATTERN.lastIndex = 0;
  }
}

if (hits.length) {
  console.error('Clases Tailwind arbitrarias detectadas (usa utilidades de @theme):\n');
  for (const h of hits) console.error(`  ${h}`);
  console.error('\nVer .cursor/rules/tailwind-tokens.mdc y AGENTS.md § Tailwind');
  process.exit(1);
}

console.log('lint:classes — OK (sin prop-(--token) en clases)');

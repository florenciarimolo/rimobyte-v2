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
const CANONICAL_REPLACEMENTS = [
  [/max-w-\[var\(--max-width-layout\)\]/g, 'max-w-layout'],
  [/ease-\[--ease-spring\]/g, 'ease-spring'],
  [/ease-\[--ease-out\]/g, 'ease-out'],
  [/duration-\[600ms\]/g, 'duration-600'],
  [/tracking-\[-0\.025em\]/g, 'tracking-tight'],
  [/aspect-\[16\/10\]/g, 'aspect-16/10'],
  [/leading-\[1\.25\]/g, 'leading-tight'],
  [/leading-\[1\.5\]/g, 'leading-normal'],
  [/max-w-\[30rem\]/g, 'max-w-120'],
  [/max-w-\[47\.5rem\]/g, 'max-w-190'],
  [/tracking-\[0\.1em\]/g, 'tracking-widest'],
  [/z-\[10001\]/g, 'z-10001'],
];
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
    for (const [re, canonical] of CANONICAL_REPLACEMENTS) {
      re.lastIndex = 0;
      if (re.test(line)) {
        hits.push(`${relative(ROOT, file)}: usa \`${canonical}\` en lugar de sintaxis arbitraria → ${line.trim()}`);
      }
    }
  }
}

if (hits.length) {
  console.error('Clases Tailwind arbitrarias detectadas (usa utilidades de @theme):\n');
  for (const h of hits) console.error(`  ${h}`);
  console.error('\nVer .cursor/rules/tailwind-tokens.mdc y AGENTS.md § Tailwind');
  process.exit(1);
}

console.log('lint:classes — OK (sin prop-(--token) en clases)');

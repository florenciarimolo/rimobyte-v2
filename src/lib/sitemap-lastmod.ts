import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { projects } from '../data/projects';
import { canonicalPath } from './url';

function toIsoDate(value: string): string {
  const clean = value.replace(/['"]/g, '').trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(clean)) return clean.slice(0, 10);
  if (/^\d{4}-\d{2}$/.test(clean)) return `${clean}-01`;
  return clean;
}

function parseBlogLastmod(): Map<string, string> {
  const dir = join(process.cwd(), 'src/content/blog');
  const map = new Map<string, string>();

  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;

    const raw = readFileSync(join(dir, file), 'utf8');
    const fm = raw.match(/^---\s*([\s\S]*?)\s*---/);
    if (!fm) continue;

    const frontmatter = fm[1];
    const updated = frontmatter.match(/^updatedDate:\s*(.+)$/m)?.[1];
    const date = frontmatter.match(/^date:\s*(.+)$/m)?.[1];
    const value = updated ?? date;
    if (!value) continue;

    const slug = file.replace(/\.md$/, '');
    map.set(`/blog/${slug}/`, toIsoDate(value));
  }

  return map;
}

const blogLastmod = parseBlogLastmod();
const projectLastmod = new Map(
  projects.map((p) => [`/proyectos/${p.slug}/`, toIsoDate(p.date)]),
);

export function createLastmodLookup(buildDate: string) {
  return function lastmodForUrl(pathname: string): string {
    const path = canonicalPath(pathname);
    return blogLastmod.get(path) ?? projectLastmod.get(path) ?? buildDate.slice(0, 10);
  };
}

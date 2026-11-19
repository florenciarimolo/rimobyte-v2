/**
 * Temas editoriales compartidos por el informe SEO, el cron de borradores
 * y el check de PR. Sinónimo y ciudad cuentan como el mismo tema.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/** @type {{ id: string, stems: string[], sector?: boolean }[]} */
export const TOPIC_FAMILIES = [
  { id: 'mantenimiento', stems: ['manten', 'soporte'] },
  { id: 'programador', stems: ['program', 'desarro', 'disen'] },
  { id: 'seo', stems: ['seo', 'posicion'] },
  { id: 'hosting', stems: ['hosting', 'alojam'] },
  { id: 'rediseno', stems: ['redisen'] },
  { id: 'precio', stems: ['cuesta', 'precio', 'tarifa'] },
  { id: 'plantilla', stems: ['plantill', 'elementor'] },
  { id: 'wix', stems: ['wix'] },
  { id: 'shopify', stems: ['shopify'] },
  { id: 'peluqueria', stems: ['peluqu'], sector: true },
  { id: 'psicologo', stems: ['psicolog'], sector: true },
  { id: 'asesoria', stems: ['asesor'], sector: true },
  { id: 'restaurante', stems: ['restaur'], sector: true },
  { id: 'inmobiliaria', stems: ['inmobil'], sector: true },
  { id: 'entrenador', stems: ['entrenador'], sector: true },
  { id: 'cursos', stems: ['curso'], sector: true },
];

const SECTOR_IDS = new Set(TOPIC_FAMILIES.filter((family) => family.sector).map((family) => family.id));

export function normalizeTopicText(value) {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function tokenMatchesStem(token, stem) {
  if (stem === 'seo') return token === 'seo';
  if (stem === 'curso') return token === 'curso' || token.startsWith('cursos');
  return token.startsWith(stem);
}

/** Temas presentes en un texto. Si hay sector, «precio» no cuenta: el precio va en el título del sector. */
export function topicsFromText(value) {
  if (!value) return new Set();
  const tokens = normalizeTopicText(value).split(/\s+/).filter((token) => token.length >= 3 || token === 'seo');
  const found = new Set();
  for (const family of TOPIC_FAMILIES) {
    if (tokens.some((token) => family.stems.some((stem) => tokenMatchesStem(token, stem)))) {
      found.add(family.id);
    }
  }
  if ([...found].some((id) => SECTOR_IDS.has(id))) found.delete('precio');
  return found;
}

function collectTexts(post, fields) {
  const chunks = [];
  for (const field of fields) {
    const value = post[field];
    if (Array.isArray(value)) chunks.push(...value);
    else if (value) chunks.push(value);
  }
  if (fields.includes('slug') && post.slug) chunks.push(post.slug.replace(/-/g, ' '));
  return chunks;
}

/**
 * primary: consulta, título y slug. Eso decide si el post cubre el tema.
 * secondary: description y keywords (menciones de pasada, como «acceso al hosting»).
 */
export function classifyTopics(post) {
  const primary = new Set();
  const secondary = new Set();
  for (const chunk of collectTexts(post, ['targetQuery', 'title', 'slug'])) {
    for (const id of topicsFromText(chunk)) primary.add(id);
  }
  for (const chunk of collectTexts(post, ['description', 'keywords'])) {
    for (const id of topicsFromText(chunk)) {
      if (!primary.has(id)) secondary.add(id);
    }
  }
  if ([...primary, ...secondary].some((id) => SECTOR_IDS.has(id))) {
    primary.delete('precio');
    secondary.delete('precio');
  }
  return { primary, secondary };
}

export function topicsOf(post) {
  const { primary, secondary } = classifyTopics(post);
  return new Set([...primary, ...secondary]);
}

/**
 * Otro post que cubre el mismo tema en el título, el slug o la consulta.
 * Una mención solo en la description no cuenta como artículo de ese tema.
 * @returns {{ post: object, topics: string[], score: number } | null}
 */
export function findTopicOverlap(candidate, posts) {
  const mine = classifyTopics(candidate);
  const mineIds = new Set([...mine.primary, ...mine.secondary]);
  if (mineIds.size === 0) return null;

  let best = null;
  for (const post of posts) {
    if (!post?.slug || post.slug === candidate.slug) continue;
    const other = classifyTopics(post);
    const shared = [...mineIds].filter((id) => other.primary.has(id));
    if (shared.length === 0) continue;
    const score = shared.length;
    if (!best || score > best.score) best = { post, topics: shared, score };
  }
  return best;
}

export function parseFrontmatter(raw) {
  const match = String(raw).match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const read = (key) => {
    const found = block.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'));
    return found?.[1]?.replace(/\\"/g, '"');
  };
  const keywordsLine = block.match(/^keywords:\s*(\[[^\]]*\])/m)?.[1];
  let keywords = [];
  if (keywordsLine) {
    try {
      keywords = JSON.parse(keywordsLine);
    } catch {
      keywords = [];
    }
  }
  return {
    title: read('title'),
    description: read('description'),
    keywords,
  };
}

export function postsFromMarkdownEntries(entries) {
  return entries.map(({ slug, raw }) => ({ slug, ...parseFrontmatter(raw) }));
}

/** Une calendario y frontmatter. Si el título del calendario y el del markdown difieren, se miran los dos. */
export function mergePosts(calendarPosts, markdownPosts) {
  const bySlug = new Map();
  for (const post of markdownPosts) bySlug.set(post.slug, { ...post });
  for (const post of calendarPosts) {
    const prev = bySlug.get(post.slug) ?? {};
    const titles = [post.title, prev.title].filter(Boolean);
    const descriptions = [post.description, prev.description].filter(Boolean);
    const keywords = [...(prev.keywords ?? []), ...(post.keywords ?? [])];
    bySlug.set(post.slug, {
      ...prev,
      ...post,
      title: titles.join(' · '),
      description: descriptions.join(' '),
      keywords,
    });
  }
  return [...bySlug.values()];
}

export function readCoverageFromDisk(root) {
  const calendar = JSON.parse(readFileSync(path.join(root, 'content/blog-calendar.json'), 'utf8'));
  const dir = path.join(root, 'src/content/blog');
  const entries = readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.slice(0, -3),
      raw: readFileSync(path.join(dir, file), 'utf8'),
    }));
  return mergePosts(calendar.posts ?? [], postsFromMarkdownEntries(entries));
}

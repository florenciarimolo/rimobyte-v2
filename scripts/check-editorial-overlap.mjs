#!/usr/bin/env node
/**
 * Falla si una PR crea un artículo de un tema ya cubierto, mueve fechas
 * o reescribe un snippet hacia el tema de otro post.
 *
 *   pnpm editorial:check
 *   BASE_SHA=origin/main node scripts/check-editorial-overlap.mjs
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  findTopicOverlap,
  mergePosts,
  parseFrontmatter,
  postsFromMarkdownEntries,
  topicsOf,
} from './blog-topics.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' });
}

function gitShow(ref, file) {
  try {
    return git(['show', `${ref}:${file}`]);
  } catch {
    return null;
  }
}

function listMarkdown(ref) {
  const out = git(['ls-tree', '-r', '--name-only', ref, 'src/content/blog']);
  return out
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.endsWith('.md'));
}

function coverageAt(ref) {
  const calendarRaw = gitShow(ref, 'content/blog-calendar.json');
  const calendarPosts = calendarRaw ? (JSON.parse(calendarRaw).posts ?? []) : [];
  const entries = listMarkdown(ref).flatMap((file) => {
    const raw = gitShow(ref, file);
    if (raw == null) return [];
    return [{ slug: path.basename(file, '.md'), raw }];
  });
  return {
    calendarPosts,
    posts: mergePosts(calendarPosts, postsFromMarkdownEntries(entries)),
  };
}

function coverageWorktree() {
  const calendar = JSON.parse(readFileSync(path.join(root, 'content/blog-calendar.json'), 'utf8'));
  const dir = path.join(root, 'src/content/blog');
  const entries = readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.slice(0, -3),
      raw: readFileSync(path.join(dir, file), 'utf8'),
    }));
  return {
    calendarPosts: calendar.posts ?? [],
    posts: mergePosts(calendar.posts ?? [], postsFromMarkdownEntries(entries)),
    markdownSlugs: new Set(entries.map((entry) => entry.slug)),
  };
}

function baseRef() {
  if (process.env.BASE_SHA) return process.env.BASE_SHA;
  try {
    git(['rev-parse', '--verify', 'origin/main']);
    return 'origin/main';
  } catch {
    return 'HEAD';
  }
}

function problemsBetween(base, head) {
  const problems = [];
  const baseBySlug = new Map(base.calendarPosts.map((post) => [post.slug, post]));
  const headBySlug = new Map(head.calendarPosts.map((post) => [post.slug, post]));
  const lastDate = base.calendarPosts.map((post) => post.scheduledDate).sort().at(-1) ?? '';

  for (const post of base.calendarPosts) {
    const next = headBySlug.get(post.slug);
    if (!next) {
      problems.push(`Falta la entrada del calendario \`${post.slug}\`.`);
      continue;
    }
    if (next.scheduledDate !== post.scheduledDate) {
      problems.push(
        `\`${post.slug}\`: scheduledDate no se puede cambiar (${post.scheduledDate} → ${next.scheduledDate}).`,
      );
    }
    const prevPublished = post.publishedDate ?? null;
    const nextPublished = next.publishedDate ?? null;
    if (nextPublished !== prevPublished) {
      problems.push(
        `\`${post.slug}\`: publishedDate no se puede cambiar (${prevPublished ?? '—'} → ${nextPublished ?? '—'}).`,
      );
    }
    const statusOk = next.status === post.status || (post.status === 'pending' && next.status === 'pr');
    if (!statusOk) {
      problems.push(`\`${post.slug}\`: status ${post.status} → ${next.status} no está permitido en una PR.`);
    }
  }

  for (const post of head.calendarPosts) {
    if (baseBySlug.has(post.slug)) continue;
    if (post.status !== 'pending') {
      problems.push(`\`${post.slug}\` entra con status \`${post.status}\`. Un post nuevo tiene que ir en pending.`);
    }
    if (lastDate && post.scheduledDate <= lastDate) {
      problems.push(
        `\`${post.slug}\`: la fecha ${post.scheduledDate} tiene que ser posterior a ${lastDate}.`,
      );
    }
    const overlap = findTopicOverlap(post, head.posts);
    if (overlap) {
      problems.push(
        `Nuevo post \`${post.slug}\` cubre ${overlap.topics.join(', ')}, ya cubierto por \`${overlap.post.slug}\`.`,
      );
    }
  }

  const baseTopics = new Map(base.posts.map((post) => [post.slug, topicsOf(post)]));
  for (const post of head.posts) {
    const previous = baseTopics.get(post.slug);
    if (!previous) continue;
    const added = [...topicsOf(post)].filter((topic) => !previous.has(topic));
    if (added.length === 0) continue;
    const others = head.posts.filter((other) => other.slug !== post.slug);
    for (const topic of added) {
      const owner = others.find((other) => topicsOf(other).has(topic));
      if (!owner) continue;
      problems.push(
        `\`${post.slug}\` pasa a cubrir ${topic}, que ya usa \`${owner.slug}\`. No reescribas el snippet hacia ese tema.`,
      );
    }
  }

  for (const slug of head.markdownSlugs) {
    if (base.markdownSlugs.has(slug)) continue;
    const post = head.posts.find((item) => item.slug === slug) ?? { slug, ...parseFrontmatter('') };
    const overlap = findTopicOverlap(post, head.posts);
    if (overlap) {
      problems.push(
        `No crees \`src/content/blog/${slug}.md\`: mismo tema (${overlap.topics.join(', ')}) que \`${overlap.post.slug}\`.`,
      );
    }
  }

  return problems;
}

function main() {
  const ref = baseRef();
  const base = coverageAt(ref);
  base.markdownSlugs = new Set(listMarkdown(ref).map((file) => path.basename(file, '.md')));
  const head = coverageWorktree();
  const problems = problemsBetween(base, head);
  if (problems.length === 0) {
    console.log(`Calendario y artículos coherentes respecto a ${ref}.`);
    return;
  }
  console.error(`Solapes editoriales respecto a ${ref}:`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

main();

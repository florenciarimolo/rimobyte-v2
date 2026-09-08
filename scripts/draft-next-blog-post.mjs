#!/usr/bin/env node
/**
 * Crea el borrador del siguiente post del calendario editorial en una rama y abre PR.
 *
 *   pnpm blog:draft
 *   pnpm blog:draft -- --force
 *   pnpm blog:draft -- --slug=mantenimiento-wordpress-empresas
 *   pnpm blog:draft -- --no-pr
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const calendarPath = path.join(root, 'content/blog-calendar.json');

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: 'inherit', ...opts });
}

function runCapture(cmd) {
  return execSync(cmd, { cwd: root, encoding: 'utf8' }).trim();
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    force: args.includes('--force'),
    noPr: args.includes('--no-pr'),
    slug: args.find((a) => a.startsWith('--slug='))?.split('=')[1],
  };
}

async function readCalendar() {
  const raw = await fs.readFile(calendarPath, 'utf8');
  return JSON.parse(raw);
}

async function writeCalendar(calendar) {
  await fs.writeFile(calendarPath, `${JSON.stringify(calendar, null, 2)}\n`, 'utf8');
}

function pickPost(calendar, { force, slug }) {
  const posts = calendar.posts;
  const today = new Date().toISOString().slice(0, 10);

  if (slug) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) throw new Error(`No hay entrada en el calendario para slug: ${slug}`);
    if (post.status === 'published') throw new Error(`El post ${slug} ya está publicado.`);
    if (post.status === 'pr') throw new Error(`El post ${slug} ya tiene PR abierto (status: pr).`);
    return post;
  }

  const pending = posts.filter((p) => p.status === 'pending');
  if (pending.length === 0) {
    return null;
  }

  if (force) {
    return pending[0];
  }

  const due = pending.filter((p) => p.scheduledDate <= today);
  if (due.length === 0) {
    const next = pending[0];
    throw new Error(
      `El siguiente post (${next.slug}) está programado para ${next.scheduledDate}. Usa --force para adelantarlo.`,
    );
  }

  return due.sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))[0];
}

function buildMarkdown(post) {
  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `description: "${post.description.replace(/"/g, '\\"')}"`,
    `date: ${post.scheduledDate}`,
    `type: ${post.type}`,
    `keywords: ${JSON.stringify(post.keywords)}`,
    `readingTime: "${post.readingTime}"`,
    `ctaText: "${post.ctaText.replace(/"/g, '\\"')}"`,
    `ctaLink: "${post.ctaLink}"`,
    `relatedSlugs: ${JSON.stringify(post.relatedSlugs)}`,
    `coverImage: "/assets/blog/${post.slug}.webp"`,
    '---',
    '',
  ].join('\n');

  const body = [
    post.intro,
    '',
    ...post.sections.flatMap((s) => [s.heading, '', s.body, '']),
    post.closing,
    '',
  ].join('\n');

  return frontmatter + body;
}

async function ensureBlogVisual(slug, visual) {
  const metaPath = path.join(root, 'src/data/blogMeta.ts');
  let content = await fs.readFile(metaPath, 'utf8');
  if (content.includes(`'${slug}':`)) return;

  const marker = '\n};\n\nexport function getBlogVisual';
  const idx = content.lastIndexOf(marker);
  if (idx === -1) throw new Error('No se pudo localizar blogVisuals en blogMeta.ts');

  const block = `  '${slug}': {\n    icon: '${visual.icon}',\n    gradient: '${visual.gradient}',\n  },\n`;
  content = content.slice(0, idx) + block + content.slice(idx);
  await fs.writeFile(metaPath, content, 'utf8');
}

async function copyCover(slug, sourceSlug) {
  const src = path.join(root, `public/assets/blog/${sourceSlug}.webp`);
  const dest = path.join(root, `public/assets/blog/${slug}.webp`);
  try {
    await fs.access(src);
  } catch {
    throw new Error(`No existe portada fuente: ${src}`);
  }
  await fs.copyFile(src, dest);
}

function branchName(slug) {
  return `blog/${slug}`;
}

async function main() {
  const opts = parseArgs();
  const calendar = await readCalendar();
  const post = pickPost(calendar, opts);

  if (!post) {
    console.log('No hay posts pendientes en el calendario.');
    return;
  }

  const mdPath = path.join(root, `src/content/blog/${post.slug}.md`);
  try {
    await fs.access(mdPath);
    throw new Error(`Ya existe ${mdPath}. Revisa el calendario o el repo.`);
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }

  const branch = branchName(post.slug);
  console.log(`\n→ Borrador: ${post.slug} (${post.scheduledDate})`);
  console.log(`→ Rama: ${branch}\n`);

  try {
    run('git diff --quiet && git diff --cached --quiet');
  } catch {
    throw new Error('Hay cambios sin commitear. Guarda o descarta antes de ejecutar blog:draft.');
  }

  const currentBranch = runCapture('git rev-parse --abbrev-ref HEAD');
  if (currentBranch !== branch) {
    run('git fetch origin main 2>/dev/null || true');
    run('git checkout main');
    run('git pull --ff-only origin main 2>/dev/null || true');
    try {
      run(`git checkout ${branch}`);
    } catch {
      run(`git checkout -b ${branch}`);
    }
  }

  await fs.writeFile(mdPath, buildMarkdown(post), 'utf8');
  await ensureBlogVisual(post.slug, post.visual);
  await copyCover(post.slug, post.coverSourceSlug);

  run(`pnpm images:blog -- --slug=${post.slug}`);
  run('pnpm check');

  post.status = 'pr';
  post.draftedAt = new Date().toISOString().slice(0, 10);
  post.branch = branch;
  await writeCalendar(calendar);

  const commitMsg = `Borrador blog: ${post.title}

Post programado para ${post.scheduledDate}. Query objetivo: ${post.targetQuery ?? '—'}.
Revisar copy antes de merge.`;

  const prBody = [
    '## Resumen',
    `- Post: **${post.title}**`,
    `- Slug: \`/blog/${post.slug}/\``,
    `- Fecha programada: ${post.scheduledDate}`,
    `- Query SEO: ${post.targetQuery ?? '—'}`,
    '',
    '## Checklist de revisión',
    '- [ ] Tono y precios correctos',
    '- [ ] Enlaces internos funcionan',
    '- [ ] CTA apunta al destino adecuado',
    `- [ ] Tras merge: \`pnpm blog:mark-published -- --slug=${post.slug}\``,
    '- [ ] Pedir indexación en GSC',
    '',
    'Generado con `pnpm blog:draft`.',
  ].join('\n');

  const msgFile = path.join(root, '.git-commit-msg.txt');
  const prBodyFile = path.join(root, '.blog-pr-body.md');
  await fs.writeFile(msgFile, commitMsg, 'utf8');

  run(
    `git add content/blog-calendar.json src/content/blog/${post.slug}.md src/data/blogMeta.ts public/assets/blog/${post.slug}.webp`,
  );
  const generatedDir = path.join(root, 'public/assets/blog/generated');
  const generated = (await fs.readdir(generatedDir)).filter((f) => f.startsWith(`${post.slug}-`));
  for (const file of generated) {
    run(`git add public/assets/blog/generated/${file}`);
  }

  run(`git commit -F ${msgFile}`);
  await fs.unlink(msgFile);

  if (opts.noPr) {
    console.log(`\nListo en rama ${branch} (sin push/PR). Ejecuta git push y gh pr create manualmente.`);
    return;
  }

  await fs.writeFile(prBodyFile, prBody, 'utf8');
  run(`git push -u origin ${branch}`);

  try {
    runCapture('gh --version');
    run(
      `gh pr create --base main --head ${branch} --title ${JSON.stringify(`Blog: ${post.title}`)} --body-file ${prBodyFile}`,
    );
    await fs.unlink(prBodyFile);
    console.log('\nPR creado. Revísalo en GitHub antes de merge.');
  } catch {
    await fs.unlink(prBodyFile).catch(() => {});
    console.warn('\ngh CLI no disponible. Push hecho; crea el PR manualmente en GitHub.');
  }
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Obtiene la URL de preview de Vercel desde el comentario del bot en el PR.
 * Hace poll hasta max_timeout si el deployment aún no terminó.
 *
 * Env: GITHUB_REPOSITORY, GH_TOKEN, PR_NUMBER, MAX_TIMEOUT_MS (default 600000)
 * Salida: escribe PREVIEW_URL= en GITHUB_OUTPUT o stdout
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchComments(pr) {
  const repo = process.env.GITHUB_REPOSITORY;
  const raw = execSync(`gh api "repos/${repo}/issues/${pr}/comments"`, {
    encoding: 'utf8',
    env: { ...process.env, GH_TOKEN: process.env.GH_TOKEN || process.env.GITHUB_TOKEN },
  });
  return JSON.parse(raw);
}

function extractPreviewUrl(body) {
  if (!body || typeof body !== 'string') return '';

  const previewLink = body.match(/\[Preview\]\((https:\/\/[^)]+\.vercel\.app[^)]*)\)/i);
  if (previewLink) return previewLink[1];

  const markdownLink = body.match(/\](https:\/\/[a-z0-9-]+\.vercel\.app)\)/i);
  if (markdownLink) return markdownLink[1];

  const plain = body.match(/(https:\/\/rimobyte-v2[a-z0-9-]*\.vercel\.app)/i);
  if (plain) return plain[1];

  const anyPreview = body.match(/(https:\/\/[a-z0-9-]+-git-[a-z0-9-]+\.vercel\.app)/i);
  return anyPreview?.[1] ?? '';
}

async function main() {
  const pr = process.env.PR_NUMBER?.trim();
  if (!pr) throw new Error('Falta PR_NUMBER');

  const maxTimeout = Number(process.env.MAX_TIMEOUT_MS ?? 600_000);
  const pollMs = Number(process.env.POLL_INTERVAL_MS ?? 15_000);
  const start = Date.now();

  let url = '';
  while (Date.now() - start < maxTimeout) {
    const comments = fetchComments(pr);
    for (const comment of comments) {
      const login = comment.user?.login ?? '';
      if (login.includes('vercel') || comment.body?.includes('vercel.app')) {
        url = extractPreviewUrl(comment.body);
        if (url) break;
      }
    }
    if (url) break;
    console.log(`Esperando preview de Vercel en PR #${pr}… (${Math.round((Date.now() - start) / 1000)}s)`);
    await sleep(pollMs);
  }

  if (!url) {
    console.warn('No se encontró URL de preview en comentarios de Vercel.');
  } else {
    console.log(`Preview: ${url}`);
  }

  const out = process.env.GITHUB_OUTPUT;
  if (out) {
    fs.appendFileSync(out, `url=${url}\n`);
  } else {
    console.log(url);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

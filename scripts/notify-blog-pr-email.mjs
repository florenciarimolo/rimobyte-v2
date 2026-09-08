#!/usr/bin/env node
/**
 * Email de aviso: PR de artículo de blog listo para revisar + URL preview Vercel.
 *
 * Env:
 *   RESEND_API_KEY
 *   BLOG_NOTIFY_TO | SEO_REPORT_TO (destinatario)
 *   PR_URL, POST_SLUG, POST_TITLE (opcional), SCHEDULED_DATE (opcional)
 *   PREVIEW_URL (base del deployment Vercel, sin path)
 */
import { Resend } from 'resend';

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function env(name, fallback = '') {
  const v = process.env[name]?.trim();
  return v || fallback;
}

async function main() {
  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) throw new Error('Falta RESEND_API_KEY');

  const to = env('BLOG_NOTIFY_TO', env('SEO_REPORT_TO', 'florenciarimolo.dev@gmail.com'));
  const prUrl = env('PR_URL');
  const slug = env('POST_SLUG');
  const title = env('POST_TITLE') || slug;
  const scheduled = env('SCHEDULED_DATE');
  const previewBase = env('PREVIEW_URL');

  if (!prUrl || !slug) {
    throw new Error('Faltan PR_URL o POST_SLUG');
  }

  const articleUrl = previewBase
    ? `${previewBase.replace(/\/$/, '')}/blog/${slug}/`
    : null;

  const resend = new Resend(apiKey);
  const subject = `Revisar artículo de blog: ${title}`;

  const previewBlock = articleUrl
    ? `<p style="font-family:sans-serif;margin:1.25rem 0">
        <a href="${escapeHtml(articleUrl)}" style="font-size:1.05rem"><strong>Ver artículo en preview de Vercel</strong></a>
      </p>
      <p style="font-family:sans-serif;color:#555;font-size:0.9rem">URL directa: ${escapeHtml(articleUrl)}</p>`
    : `<p style="font-family:sans-serif;color:#888">No se pudo obtener la URL de preview de Vercel. Revisa el PR en GitHub; el bot de Vercel suele dejar el enlace en los comentarios.</p>`;

  const scheduledBlock = scheduled
    ? `<p style="font-family:sans-serif"><strong>Fecha programada:</strong> ${escapeHtml(scheduled)}</p>`
    : '';

  const result = await resend.emails.send({
    from: 'RimoByte <no-reply@rimobyte.com>',
    to,
    subject,
    html: `
      <h2 style="font-family:sans-serif;color:#111">Tienes un artículo de blog para revisar</h2>
      <p style="font-family:sans-serif;color:#444">${escapeHtml(title)}</p>
      ${scheduledBlock}
      <p style="font-family:sans-serif"><strong>Slug:</strong> /blog/${escapeHtml(slug)}/</p>
      ${previewBlock}
      <p style="font-family:sans-serif;margin-top:1.5rem">
        <a href="${escapeHtml(prUrl)}">Abrir pull request en GitHub</a>
      </p>
      <hr style="border:none;border-top:1px solid #eee;margin:1.5rem 0" />
      <p style="font-family:sans-serif;color:#888;font-size:0.85rem">
        Cuando esté bien: merge del PR → Vercel publica en rimobyte.com →
        <code>pnpm blog:mark-published -- --slug=${escapeHtml(slug)}</code>
      </p>
    `,
  });

  if (result.error) {
    throw new Error(`Resend: ${result.error.message}`);
  }

  console.log(`Email enviado a ${to} (id: ${result.data?.id ?? '—'})`);
  if (articleUrl) console.log(`Preview artículo: ${articleUrl}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});

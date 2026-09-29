#!/usr/bin/env node
/**
 * Cada mañana: si hoy toca publicar en Instagram, asegura el diseño en Canva
 * y envía por email el enlace y el caption.
 *
 *   pnpm instagram:daily
 *   pnpm instagram:daily -- --dry-run
 *   pnpm instagram:daily -- --date=2026-09-30
 *   pnpm instagram:daily -- --force
 *
 * Env: RESEND_API_KEY, SEO_REPORT_TO | INSTAGRAM_NOTIFY_TO
 *      CANVA_ACCESS_TOKEN — solo si el post del día aún no tiene canvaUrl
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const queuePath = join(root, 'content/instagram-queue.json');
const CANVA_MCP = 'https://mcp.canva.com/mcp';
const PUBLISH_WEEKDAYS = new Set([1, 3, 5]);

const BRAND_BRIEF = [
  'Pieza de Instagram en español para RimoByte (Flor Rímolo).',
  'Lienzo 1080×1440, fondo #FAFAFC, tipografía Inter, tinta #0A0A12.',
  'Arriba a la izquierda, en todas las páginas: el símbolo del logo (lazos entrelazados, degradado #196BEE → #6535E5 → #E715D1) y, a 12 px, la palabra RimoByte en bold.',
  'Abajo a la izquierda solo el texto rimobyte.com, peso normal, 22 px, color #545462. Sin la palabra rimobyte suelta ni un punto separador.',
  'Titular siempre bold y del mismo tamaño (72 px). Subtítulos y viñetas en peso normal, 32 px, color #2C2C38.',
  'El degradado de marca solo en una palabra o en el botón, con el mismo peso que el resto de esa línea.',
  'Sin fondo oscuro y sin fotos de stock.',
].join(' ');

function parseArgs(argv) {
  const flags = { dryRun: false, force: false, date: '' };
  for (const arg of argv) {
    if (arg === '--dry-run') flags.dryRun = true;
    else if (arg === '--force') flags.force = true;
    else if (arg.startsWith('--date=')) flags.date = arg.slice('--date='.length);
  }
  return flags;
}

function madridDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function weekdayMon1(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  const short = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Madrid',
    weekday: 'short',
  }).format(utc);
  return { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }[short];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadQueue() {
  return JSON.parse(readFileSync(queuePath, 'utf8'));
}

function saveQueue(queue) {
  writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`);
}

function templateFor(queue, isoDate) {
  const weekday = weekdayMon1(isoDate);
  if (!PUBLISH_WEEKDAYS.has(weekday)) return null;
  const slot = weekday === 1 ? 'lunes' : weekday === 3 ? 'miercoles' : 'viernes';
  const anchor = queue.anchorDate ?? '2026-09-28';
  const [ay, am, ad] = anchor.split('-').map(Number);
  const [y, m, d] = isoDate.split('-').map(Number);
  const days = Math.round(
    (Date.UTC(y, m - 1, d) - Date.UTC(ay, am - 1, ad)) / 86_400_000,
  );
  if (days < 0) return null;
  const cycleWeek = Math.floor(days / 7) % 4;
  const template = queue.posts.find(
    (post) => post.cycleWeek === cycleWeek && post.slot === slot,
  );
  if (!template?.brief) return null;
  return {
    ...template,
    date: isoDate,
    canvaUrl: '',
    notifiedOn: null,
    derived: true,
  };
}

function postForDate(queue, isoDate) {
  return queue.posts.find((post) => post.date === isoDate) ?? templateFor(queue, isoDate);
}

async function mcpRequest(token, sessionId, body) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (sessionId) headers['Mcp-Session-Id'] = sessionId;
  const response = await fetch(CANVA_MCP, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const nextSession = response.headers.get('mcp-session-id') ?? sessionId;
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Canva respondió ${response.status}: ${text.slice(0, 400)}`);
  }
  if (!text.trim()) return { sessionId: nextSession, result: null };
  const dataLine = text
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trim())
    .find((line) => line.startsWith('{'));
  const payload = JSON.parse(dataLine || text);
  if (payload.error) {
    throw new Error(payload.error.message || 'Error de Canva');
  }
  return { sessionId: nextSession, result: payload.result };
}

async function canvaTool(token, sessionId, name, args) {
  const call = await mcpRequest(token, sessionId, {
    jsonrpc: '2.0',
    id: Date.now(),
    method: 'tools/call',
    params: { name, arguments: args },
  });
  const content = call.result?.content;
  const text = Array.isArray(content)
    ? content.map((part) => part.text ?? '').join('\n')
    : JSON.stringify(call.result ?? {});
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = null;
  }
  return { sessionId: call.sessionId, text, parsed };
}

function designFromPayload(payload) {
  const design = payload?.design ?? payload;
  const url = design?.url || design?.edit_url;
  if (design?.id && url) return { id: design.id, url };
  return null;
}

async function createCanvaDesign(post) {
  const token = process.env.CANVA_ACCESS_TOKEN?.trim();
  if (!token) {
    throw new Error(
      `El post del ${post.date} no tiene diseño y falta CANVA_ACCESS_TOKEN para crearlo.`,
    );
  }

  const init = await mcpRequest(token, null, {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'rimobyte-instagram-daily', version: '1.0.0' },
    },
  });
  let sessionId = init.sessionId;
  await mcpRequest(token, sessionId, {
    jsonrpc: '2.0',
    method: 'notifications/initialized',
  });

  const started = await canvaTool(token, sessionId, 'create-design', {
    brief: `${BRAND_BRIEF} ${post.brief}`,
    format: 'Instagram Post (Portrait)',
    user_intent: `Crear el post de Instagram del ${post.date}`,
  });
  sessionId = started.sessionId;
  let job = started.parsed;
  if (!job?.job_id) {
    throw new Error(`Canva no devolvió un trabajo de diseño: ${started.text.slice(0, 400)}`);
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const ready = designFromPayload(job);
    if (job.status === 'completed' && ready) return ready;
    if (job.status === 'failed') {
      throw new Error(`Canva no pudo crear el diseño del ${post.date}.`);
    }
    const waitSeconds = job.polling_policy?.wait_seconds ?? 15;
    await new Promise((resolve) => setTimeout(resolve, waitSeconds * 1000));
    const polled = await canvaTool(token, sessionId, 'get-create-design-async-job', {
      job_id: job.job_id,
      continuation_token: job.continuation_token,
      user_intent: `Comprobar el diseño del ${post.date}`,
    });
    sessionId = polled.sessionId;
    if (!polled.parsed?.job_id) {
      throw new Error(`Respuesta inesperada de Canva: ${polled.text.slice(0, 400)}`);
    }
    job = polled.parsed;
  }

  throw new Error(`El diseño del ${post.date} no estuvo listo a tiempo.`);
}

async function sendEmail(post, { designError = '' } = {}) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error('Falta RESEND_API_KEY');
  const to =
    process.env.INSTAGRAM_NOTIFY_TO?.trim() ||
    process.env.SEO_REPORT_TO?.trim() ||
    'florenciarimolo.dev@gmail.com';

  const resend = new Resend(apiKey);
  const captionHtml = escapeHtml(post.caption).replace(/\n/g, '<br />');
  const designBlock = post.canvaUrl
    ? `<p style="font-family:sans-serif">
        <a href="${escapeHtml(post.canvaUrl)}"><strong>Abrir el diseño en Canva</strong></a>
      </p>
      <p style="font-family:sans-serif;color:#666;font-size:0.9rem">Exporta en PNG y súbelo a instagram.com/rimobyte. El texto de abajo es el caption.</p>`
    : `<p style="font-family:sans-serif;color:#8a1c4a">Canva no ha creado el diseño: ${escapeHtml(designError)}</p>
      <p style="font-family:sans-serif;color:#666;font-size:0.9rem">El caption ya lo puedes publicar. El diseño se reintentará en la siguiente ejecución.</p>`;
  const result = await resend.emails.send({
    from: 'RimoByte <no-reply@rimobyte.com>',
    to,
    subject: `Instagram ${post.date}: ${post.title}`,
    html: `
      <h2 style="font-family:sans-serif;color:#111">Hoy toca publicar en Instagram</h2>
      <p style="font-family:sans-serif;color:#444">${escapeHtml(post.title)}</p>
      ${designBlock}
      <div style="font-family:sans-serif;background:#fafafc;border:1px solid #ececf1;border-radius:12px;padding:16px 18px;line-height:1.5;color:#0a0a12">
        ${captionHtml}
      </div>
    `,
  });

  if (result.error) throw new Error(`Resend: ${result.error.message}`);
  console.log(`Email enviado a ${to} (id: ${result.data?.id ?? '—'})`);
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));
  const today = flags.date || madridDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) {
    throw new Error('--date tiene que ser YYYY-MM-DD');
  }

  const queue = loadQueue();
  let post = postForDate(queue, today);
  if (!post) {
    console.log(`${today}: no toca publicar.`);
    return;
  }

  if (post.notifiedOn === today && !flags.force) {
    console.log(`${today}: el aviso ya se envió.`);
    return;
  }

  let created = false;
  let designError = '';
  if (!post.canvaUrl) {
    if (!post.brief) {
      throw new Error(`El post del ${today} no tiene brief para crear el diseño.`);
    }
    if (flags.dryRun) {
      console.log(`${today}: falta diseño. En una ejecución real se crearía en Canva.`);
      console.log(post.caption);
      return;
    }
    try {
      const design = await createCanvaDesign(post);
      post = { ...post, canvaUrl: design.url, derived: undefined };
      created = true;
      const index = queue.posts.findIndex((item) => item.date === today);
      if (index === -1) queue.posts.push(post);
      else queue.posts[index] = { ...queue.posts[index], canvaUrl: design.url };
      saveQueue(queue);
      console.log(`Diseño creado: ${design.url}`);
    } catch (error) {
      designError = error.message;
      console.error(designError);
    }
  }

  if (flags.dryRun) {
    console.log(`${today}: ${post.title}`);
    console.log(post.canvaUrl);
    console.log(post.caption);
    return;
  }

  await sendEmail(post, { designError });
  const index = queue.posts.findIndex((item) => item.date === today);
  const saved = index === -1 ? post : queue.posts[index];
  const next = { ...saved, canvaUrl: post.canvaUrl, notifiedOn: today };
  delete next.derived;
  if (index === -1) queue.posts.push(next);
  else queue.posts[index] = next;
  saveQueue(queue);
  if (!created) console.log(`${today}: aviso enviado, diseño ya existía.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

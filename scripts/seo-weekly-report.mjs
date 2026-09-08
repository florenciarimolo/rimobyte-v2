#!/usr/bin/env node
/**
 * Informe SEO semanal orientado a captación de clientes.
 *
 *   pnpm seo:report
 *   pnpm seo:report -- --dry-run
 *   pnpm seo:report -- --no-email
 *   pnpm seo:report -- --email-only   # envía el informe ya escrito (post-commit en CI)
 *   pnpm seo:report -- --no-commit    # no-op local (el commit lo hace Actions)
 *
 * Env: GOOGLE_APPLICATION_CREDENTIALS | GSC_SERVICE_ACCOUNT_JSON,
 *      GSC_SITE_URL, PSI_API_KEY, RESEND_API_KEY, SEO_REPORT_TO
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE_ORIGIN = 'https://rimobyte.com';
const REPORTS_DIR = path.join(root, 'docs/reports');

const COMMERCIAL_TERMS = [
  'wordpress',
  'desarrollo web',
  'web para',
  'tienda online',
  'woocommerce',
  'cuanto cuesta',
  'cuánto cuesta',
  'precio web',
  'freelance',
  'programador',
  'diseño web',
  'pagina web',
  'página web',
  'agencia',
  'web corporativa',
];

/** Prefijos de rutas de conversión (sin contar `/` — se trata aparte). */
const MONEY_PATH_PREFIXES = [
  '/desarrollo-web-wordpress/',
  '/servicios/',
  '/contacto/',
  '/web-para-',
];

const SPIKE_MIN_IMPRESSIONS = 10;
/** Si no había datos previos, exige más volumen para no marcar “pico” por ruido. */
const SPIKE_MIN_IMPRESSIONS_NEW = 20;
const CLICK_DROP_MIN_PREV_CLICKS = 3;
const LOW_CTR_THRESHOLD = 0.03;
const WEB_PARA_LOW_CTR = 0.02;
const WEB_PARA_MIN_IMPRESSIONS = 10;

function parseArgs() {
  const args = process.argv.slice(2).filter((a) => a !== '--');
  return {
    dryRun: args.includes('--dry-run'),
    noEmail: args.includes('--no-email'),
    noCommit: args.includes('--no-commit'),
    emailOnly: args.includes('--email-only'),
  };
}

async function loadDotEnv() {
  try {
    const raw = await fs.readFile(path.join(root, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  } catch {
    // .env optional in CI
  }
}

function envOrDefault(key, fallback) {
  const v = process.env[key]?.trim();
  return v || fallback;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function dateRanges() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  const prevEnd = new Date(start);
  prevEnd.setUTCDate(prevEnd.getUTCDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setUTCDate(prevStart.getUTCDate() - 27);
  return {
    current: { startDate: isoDate(start), endDate: isoDate(end) },
    previous: { startDate: isoDate(prevStart), endDate: isoDate(prevEnd) },
  };
}

function isNoiseQuery(q) {
  if (!q || typeof q !== 'string') return true;
  if (q.length > 80) return true;
  if (q.includes('-site:')) return true;
  if (q.includes('site:')) return true;
  return false;
}

function isCommercialQuery(q) {
  const lower = q.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
  return COMMERCIAL_TERMS.some((t) => {
    const term = t.normalize('NFD').replace(/\p{M}/gu, '');
    return lower.includes(term);
  });
}

function pathFromPageUrl(pageUrl) {
  try {
    const u = new URL(pageUrl);
    let p = u.pathname || '/';
    if (!p.endsWith('/')) p += '/';
    return p;
  } catch {
    let p = String(pageUrl);
    if (!p.startsWith('/')) p = `/${p}`;
    if (!p.endsWith('/')) p += '/';
    return p;
  }
}

/** Clave estable para comparar periodos (host + path con barra final). */
function pageKey(pageUrl) {
  try {
    const u = new URL(pageUrl);
    const host = u.hostname.replace(/^www\./, '');
    let p = u.pathname || '/';
    if (!p.endsWith('/')) p += '/';
    return `${host}${p}`;
  } catch {
    return pathFromPageUrl(pageUrl);
  }
}

function canonicalSiteUrl(pageUrl) {
  const p = pathFromPageUrl(pageUrl);
  return `${SITE_ORIGIN}${p}`;
}

function isMoneyPage(pageUrl) {
  const p = pathFromPageUrl(pageUrl);
  if (p === '/') return true;
  return MONEY_PATH_PREFIXES.some((prefix) => p.startsWith(prefix));
}

function isSectorLanding(pageUrl) {
  return /^\/web-para-[^/]+\/$/.test(pathFromPageUrl(pageUrl));
}

function isBlogPost(pageUrl) {
  return /^\/blog\/[^/]+\/$/.test(pathFromPageUrl(pageUrl));
}

function mapUrlToCode(pageUrl) {
  const p = pathFromPageUrl(pageUrl);
  if (p === '/desarrollo-web-wordpress/') {
    return 'src/data/wordpressLanding.ts (wordpressLandingSeo)';
  }
  if (
    p === '/' ||
    p === '/servicios/' ||
    p === '/contacto/' ||
    p === '/sobre-mi/' ||
    p === '/blog/' ||
    p === '/proyectos/'
  ) {
    return 'src/data/staticPageSeo.ts';
  }
  if (p.startsWith('/servicios/')) {
    return 'src/data/serviceDetails.ts / src/data/services.ts';
  }
  const sector = p.match(/^\/web-para-([^/]+)\/$/);
  if (sector) {
    return `src/data/sectors.ts (slug: web-para-${sector[1]})`;
  }
  const blog = p.match(/^\/blog\/([^/]+)\/$/);
  if (blog) {
    return `src/content/blog/${blog[1]}.md`;
  }
  const project = p.match(/^\/proyectos\/([^/]+)\/$/);
  if (project) {
    return `src/data/projects.ts (slug: ${project[1]})`;
  }
  return 'revisar sitemap / redirects';
}

function pctChange(current, previous) {
  if (previous === 0) return current > 0 ? Infinity : 0;
  return ((current - previous) / previous) * 100;
}

function formatPct(n) {
  if (n === Infinity) return 'nueva / sin base previa';
  if (!Number.isFinite(n)) return '0 %';
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(0)} %`;
}

function formatCtr(ctr) {
  return `${((ctr ?? 0) * 100).toFixed(1)} %`;
}

function formatPos(pos) {
  return (pos ?? 0).toFixed(1);
}

async function getSearchConsole() {
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  const jsonInline = process.env.GSC_SERVICE_ACCOUNT_JSON?.trim();
  let auth;
  if (keyFile) {
    try {
      await fs.access(keyFile);
    } catch {
      throw new Error(`No se encuentra el JSON de GSC en: ${keyFile}`);
    }
    auth = new google.auth.GoogleAuth({
      keyFile,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
  } else if (jsonInline) {
    let credentials;
    try {
      credentials = JSON.parse(jsonInline);
    } catch {
      throw new Error('GSC_SERVICE_ACCOUNT_JSON no es JSON válido');
    }
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });
  } else {
    throw new Error(
      'Falta GOOGLE_APPLICATION_CREDENTIALS o GSC_SERVICE_ACCOUNT_JSON',
    );
  }
  return google.searchconsole({ version: 'v1', auth });
}

async function gscQuery(searchconsole, siteUrl, { startDate, endDate }, dimensions, rowLimit = 25) {
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });
  return res.data.rows ?? [];
}

async function gscTotals(searchconsole, siteUrl, range) {
  const rows = await gscQuery(searchconsole, siteUrl, range, [], 1);
  if (!rows.length) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  }
  const r = rows[0];
  return {
    clicks: r.clicks ?? 0,
    impressions: r.impressions ?? 0,
    ctr: r.ctr ?? 0,
    position: r.position ?? 0,
  };
}

function rowsToPageMap(rows) {
  const map = new Map();
  for (const r of rows) {
    const raw = r.keys?.[0];
    if (!raw) continue;
    map.set(pageKey(raw), {
      page: raw,
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    });
  }
  return map;
}

async function fetchPageQueries(searchconsole, siteUrl, range, pageUrl) {
  // Probar URL tal cual y variante con/sin barra final (GSC es estricto con equals).
  const candidates = new Set([pageUrl]);
  try {
    const u = new URL(pageUrl);
    const withSlash = u.pathname.endsWith('/')
      ? pageUrl
      : `${u.origin}${u.pathname}/${u.search}`;
    const withoutSlash = u.pathname.endsWith('/')
      ? `${u.origin}${u.pathname.slice(0, -1)}${u.search}`
      : pageUrl;
    candidates.add(withSlash);
    candidates.add(withoutSlash);
  } catch {
    // ignore
  }

  for (const expression of candidates) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: range.startDate,
        endDate: range.endDate,
        dimensions: ['query'],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'page',
                operator: 'equals',
                expression,
              },
            ],
          },
        ],
        rowLimit: 5,
      },
    });
    const rows = (res.data.rows ?? []).filter((r) => !isNoiseQuery(r.keys?.[0]));
    if (rows.length) return rows;
  }
  return [];
}

async function fetchPsi(url, apiKey, { retries = 1 } = {}) {
  const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url', url);
  endpoint.searchParams.set('key', apiKey);
  endpoint.searchParams.set('category', 'PERFORMANCE');
  endpoint.searchParams.set('strategy', 'mobile');

  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.error) {
        lastError = data.error.message;
        if (attempt < retries) continue;
        return { url, error: lastError };
      }
      const audits = data.lighthouseResult?.audits ?? {};
      const score = data.lighthouseResult?.categories?.performance?.score;
      return {
        url,
        score: score == null ? null : Math.round(score * 100),
        lcp: audits['largest-contentful-paint']?.displayValue ?? 'n/a',
        inp: audits['interaction-to-next-paint']?.displayValue ?? 'n/a',
        cls: audits['cumulative-layout-shift']?.displayValue ?? 'n/a',
      };
    } catch (err) {
      lastError = err.message;
      if (attempt < retries) continue;
      return { url, error: lastError };
    }
  }
  return { url, error: lastError ?? 'unknown' };
}

function buildRecommendations(ctx) {
  const recs = [];

  for (const spike of ctx.spikes) {
    const money = isMoneyPage(spike.page);
    const lowCtr = spike.ctr < LOW_CTR_THRESHOLD;
    if (money && lowCtr) {
      recs.push({
        priority: 'Alta',
        path: pathFromPageUrl(spike.page),
        title: `Pico de impresiones + CTR bajo en ${pathFromPageUrl(spike.page)}`,
        detail: `Impresiones ${formatPct(spike.impChange)} (${spike.impressions} imp, CTR ${formatCtr(spike.ctr)}). Visibilidad sin clics = leads perdidos. Revisar title/description con propuesta de valor.`,
        file: mapUrlToCode(spike.page),
      });
    } else if (money) {
      recs.push({
        priority: 'Alta',
        path: pathFromPageUrl(spike.page),
        title: `Pico de impresiones en money page ${pathFromPageUrl(spike.page)}`,
        detail: `Impresiones ${formatPct(spike.impChange)}. Revisar consultas que impulsan la URL y alinear CTA/copy.`,
        file: mapUrlToCode(spike.page),
      });
    } else {
      recs.push({
        priority: 'Media',
        path: pathFromPageUrl(spike.page),
        title: `Pico de impresiones en ${pathFromPageUrl(spike.page)}`,
        detail: `Impresiones ${formatPct(spike.impChange)}. Valorar si merece CTA hacia money page.`,
        file: mapUrlToCode(spike.page),
      });
    }
  }

  for (const page of ctx.topPages) {
    if (isMoneyPage(page.page) && page.impressions >= 20 && page.clicks === 0) {
      recs.push({
        priority: 'Alta',
        path: pathFromPageUrl(page.page),
        title: `Money page sin clics: ${pathFromPageUrl(page.page)}`,
        detail: `${page.impressions} impresiones y 0 clics. El snippet probablemente no convence.`,
        file: mapUrlToCode(page.page),
      });
    }

    // Landing sectorial con tráfico y CTR bajo
    if (
      isSectorLanding(page.page) &&
      page.impressions >= WEB_PARA_MIN_IMPRESSIONS &&
      page.ctr < WEB_PARA_LOW_CTR
    ) {
      recs.push({
        priority: 'Media',
        path: pathFromPageUrl(page.page),
        title: `Landing sectorial con CTR bajo: ${pathFromPageUrl(page.page)}`,
        detail: `${page.impressions} imp, CTR ${formatCtr(page.ctr)}. Sector con demanda real: revisar seo.title / seo.description.`,
        file: mapUrlToCode(page.page),
      });
    }

    // Blog atrayendo tráfico: verificar CTA hacia money page
    if (isBlogPost(page.page) && page.impressions >= 5) {
      recs.push({
        priority: 'Media',
        path: pathFromPageUrl(page.page),
        title: `Blog con tráfico: verificar CTA en ${pathFromPageUrl(page.page)}`,
        detail: `${page.impressions} imp. Comprobar frontmatter title/description y que ctaLink apunte a money page (/desarrollo-web-wordpress/, /contacto/, /web-para-*).`,
        file: mapUrlToCode(page.page),
      });
    }
  }

  for (const q of ctx.opportunities) {
    recs.push({
      priority: 'Alta',
      path: `query:${q.query}`,
      title: `Oportunidad comercial: «${q.query}» (pos. ${formatPos(q.position)})`,
      detail: `${q.impressions} impresiones, ${q.clicks} clics. Posición 4–15: nuevo post en content/blog-calendar.json o reforzar landing/CTA.`,
      file: 'content/blog-calendar.json o landing relacionada',
    });
  }

  for (const q of ctx.topCommercial) {
    if (q.position <= 3 && q.clicks === 0 && q.impressions >= 5) {
      recs.push({
        priority: 'Media',
        path: `query:${q.query}`,
        title: `Top 3 sin clics: «${q.query}»`,
        detail: 'Title/H1 probablemente no coincide con la búsqueda. Ajustar meta.',
        file: 'revisar página que rankea para esa query',
      });
    }
  }

  for (const drop of ctx.clickDrops) {
    recs.push({
      priority: 'Alta',
      path: pathFromPageUrl(drop.page),
      title: `Caída de clics: ${pathFromPageUrl(drop.page)}`,
      detail: `Clics ${formatPct(drop.clickChange)} (${drop.prevClicks} → ${drop.clicks}). Revisar rutas, redirects y metadatos.`,
      file: mapUrlToCode(drop.page),
    });
  }

  for (const psi of ctx.psiResults) {
    if (psi.error) continue;
    if (psi.score != null && psi.score < 90 && isMoneyPage(psi.url)) {
      recs.push({
        priority: 'Media',
        path: pathFromPageUrl(psi.url),
        title: `Rendimiento móvil bajo: ${pathFromPageUrl(psi.url)} (${psi.score})`,
        detail: `LCP ${psi.lcp}, INP ${psi.inp}, CLS ${psi.cls}. Afecta conversión en money page.`,
        file: mapUrlToCode(psi.url),
      });
    }
  }

  // Deduplicar: mismo path + misma prioridad → quedarse con el primero (más específico suele ir antes)
  const seen = new Set();
  return recs.filter((r) => {
    const key = `${r.priority}|${r.path}|${r.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    // Evitar spam: si ya hay Alta para el mismo path, omitir Media de “blog CTA” / sector duplicado
    if (r.priority === 'Media') {
      const hasAlta = recs.some(
        (o) => o.priority === 'Alta' && o.path === r.path && o !== r,
      );
      if (hasAlta && (r.title.startsWith('Blog con tráfico') || r.title.startsWith('Landing sectorial'))) {
        return false;
      }
    }
    return true;
  });
}

function priorityOrder(p) {
  return { Alta: 0, Media: 1, Baja: 2 }[p] ?? 9;
}

function buildMarkdown(report) {
  const {
    reportDate,
    ranges,
    totals,
    spikes,
    topCommercial,
    topPages,
    opportunities,
    clickDrops,
    psiResults,
    recommendations,
  } = report;

  const lines = [];
  lines.push(`# Informe SEO semanal — ${reportDate}`);
  lines.push('');
  lines.push(
    '> Objetivo: más negocios locales encuentran RimoByte y solicitan presupuesto de web WordPress.',
  );
  lines.push('');
  lines.push(
    `**Periodo actual:** ${ranges.current.startDate} → ${ranges.current.endDate}  `,
  );
  lines.push(
    `**Periodo anterior:** ${ranges.previous.startDate} → ${ranges.previous.endDate}`,
  );
  lines.push('');
  lines.push('## Resumen ejecutivo');
  lines.push('');

  const alta = recommendations.filter((r) => r.priority === 'Alta');
  if (alta.length) {
    lines.push('**Leads / visibilidad en riesgo (prioridad Alta):**');
    lines.push('');
    for (const r of alta.slice(0, 5)) {
      lines.push(`- ${r.title} → \`${r.file}\``);
    }
    lines.push('');
  } else {
    lines.push('No hay alertas de prioridad Alta esta semana.');
    lines.push('');
  }

  lines.push('## KPIs Search Console');
  lines.push('');
  lines.push('| Métrica | Actual | Anterior | Variación |');
  lines.push('|---------|--------|----------|-----------|');
  lines.push(
    `| Clics | ${totals.current.clicks} | ${totals.previous.clicks} | ${formatPct(pctChange(totals.current.clicks, totals.previous.clicks))} |`,
  );
  lines.push(
    `| Impresiones | ${totals.current.impressions} | ${totals.previous.impressions} | ${formatPct(pctChange(totals.current.impressions, totals.previous.impressions))} |`,
  );
  lines.push(
    `| CTR | ${formatCtr(totals.current.ctr)} | ${formatCtr(totals.previous.ctr)} | — |`,
  );
  lines.push(
    `| Posición media | ${formatPos(totals.current.position)} | ${formatPos(totals.previous.position)} | — |`,
  );
  lines.push('');

  lines.push('## Páginas en pico de impresiones');
  lines.push('');
  if (!spikes.length) {
    lines.push('_Ningún pico > 100 % esta semana._');
    lines.push('');
  } else {
    for (const s of spikes) {
      lines.push(
        `### ${pathFromPageUrl(s.page)} ${isMoneyPage(s.page) ? '(money page)' : ''}`,
      );
      lines.push('');
      lines.push(
        `- Impresiones: ${s.impressions} (${formatPct(s.impChange)} vs anterior)`,
      );
      lines.push(
        `- Clics: ${s.clicks} · CTR: ${formatCtr(s.ctr)} · Pos: ${formatPos(s.position)}`,
      );
      lines.push(`- Código: \`${mapUrlToCode(s.page)}\``);
      if (s.queries?.length) {
        lines.push('- Top consultas:');
        for (const q of s.queries) {
          lines.push(
            `  - «${q.keys[0]}» — ${q.impressions} imp, ${q.clicks} clics, pos ${formatPos(q.position)}`,
          );
        }
      }
      lines.push('');
    }
  }

  lines.push('## Consultas comerciales (top 10 por impresiones)');
  lines.push('');
  if (!topCommercial.length) {
    lines.push('_Sin consultas comerciales filtradas esta semana._');
    lines.push('');
  } else {
    lines.push('| Consulta | Imp | Clics | CTR | Pos |');
    lines.push('|----------|-----|-------|-----|-----|');
    for (const q of topCommercial) {
      lines.push(
        `| ${q.query.replace(/\|/g, '\\|')} | ${q.impressions} | ${q.clicks} | ${formatCtr(q.ctr)} | ${formatPos(q.position)} |`,
      );
    }
    lines.push('');
  }

  lines.push('## Top páginas por impresiones');
  lines.push('');
  lines.push('| Página | Imp | Clics | CTR | Pos | Money? |');
  lines.push('|--------|-----|-------|-----|-----|--------|');
  for (const p of topPages) {
    lines.push(
      `| ${pathFromPageUrl(p.page)} | ${p.impressions} | ${p.clicks} | ${formatCtr(p.ctr)} | ${formatPos(p.position)} | ${isMoneyPage(p.page) ? 'sí' : 'no'} |`,
    );
  }
  lines.push('');

  lines.push('## Oportunidades (pos. 4–15, intención comercial)');
  lines.push('');
  if (!opportunities.length) {
    lines.push('_Ninguna esta semana._');
    lines.push('');
  } else {
    for (const o of opportunities) {
      lines.push(
        `- «${o.query}» — pos ${formatPos(o.position)}, ${o.impressions} imp, ${o.clicks} clics`,
      );
    }
    lines.push('');
  }

  if (clickDrops.length) {
    lines.push('## Caídas de clics');
    lines.push('');
    for (const d of clickDrops) {
      lines.push(
        `- ${pathFromPageUrl(d.page)}: ${formatPct(d.clickChange)} (${d.prevClicks} → ${d.clicks})`,
      );
    }
    lines.push('');
  }

  lines.push('## PageSpeed Insights (móvil)');
  lines.push('');
  lines.push('| URL | Score | LCP | INP | CLS |');
  lines.push('|-----|-------|-----|-----|-----|');
  for (const p of psiResults) {
    if (p.error) {
      lines.push(`| ${pathFromPageUrl(p.url)} | error | ${String(p.error).replace(/\|/g, '/')} | — | — |`);
    } else {
      lines.push(
        `| ${pathFromPageUrl(p.url)} | ${p.score ?? 'n/a'} | ${p.lcp} | ${p.inp} | ${p.cls} |`,
      );
    }
  }
  lines.push('');

  lines.push('## Recomendaciones priorizadas');
  lines.push('');
  const sorted = [...recommendations].sort(
    (a, b) => priorityOrder(a.priority) - priorityOrder(b.priority),
  );
  if (!sorted.length) {
    lines.push('_Sin recomendaciones automáticas esta semana._');
  } else {
    for (const r of sorted) {
      lines.push(`### [${r.priority}] ${r.title}`);
      lines.push('');
      lines.push(r.detail);
      lines.push('');
      lines.push(`**Archivo:** \`${r.file}\``);
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
  lines.push(
    '_Generado con `pnpm seo:report`. No editar a mano; regenerar o esperar al cron._',
  );
  lines.push('');

  return lines.join('\n');
}

function buildEmailHtml(report, githubUrl) {
  const alta = report.recommendations
    .filter((r) => r.priority === 'Alta')
    .slice(0, 5);
  const media = report.recommendations
    .filter((r) => r.priority === 'Media')
    .slice(0, 3);
  const actions = [...alta, ...media].slice(0, 5);

  const actionLis = actions
    .map(
      (r) =>
        `<li><strong>[${r.priority}]</strong> ${escapeHtml(r.title)}<br/><code style="font-size:12px">${escapeHtml(r.file)}</code></li>`,
    )
    .join('');

  return `
    <h2 style="font-family:sans-serif">Informe SEO semanal — ${report.reportDate}</h2>
    <p style="font-family:sans-serif;color:#444">Objetivo: más leads de webs WordPress.</p>
    <h3 style="font-family:sans-serif">KPIs (${report.ranges.current.startDate} → ${report.ranges.current.endDate})</h3>
    <ul style="font-family:sans-serif">
      <li>Clics: <strong>${report.totals.current.clicks}</strong> (${formatPct(pctChange(report.totals.current.clicks, report.totals.previous.clicks))})</li>
      <li>Impresiones: <strong>${report.totals.current.impressions}</strong> (${formatPct(pctChange(report.totals.current.impressions, report.totals.previous.impressions))})</li>
      <li>CTR: <strong>${formatCtr(report.totals.current.ctr)}</strong> · Pos. media: <strong>${formatPos(report.totals.current.position)}</strong></li>
    </ul>
    ${
      report.spikes.length
        ? `<p style="font-family:sans-serif"><strong>Picos:</strong> ${escapeHtml(report.spikes.map((s) => `${pathFromPageUrl(s.page)} ${formatPct(s.impChange)}`).join(', '))}</p>`
        : ''
    }
    <h3 style="font-family:sans-serif">Top acciones</h3>
    <ol style="font-family:sans-serif">${actionLis || '<li>Sin acciones urgentes</li>'}</ol>
    <p style="font-family:sans-serif"><a href="${escapeHtml(githubUrl)}">Ver informe completo en GitHub</a></p>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function githubReportUrl(filename) {
  const repoSlug = process.env.GITHUB_REPOSITORY || 'florenciarimolo/rimobyte-v2';
  return `https://github.com/${repoSlug}/blob/main/docs/reports/${filename}`;
}

async function sendEmail({ reportDate, markdown, githubUrl, subjectExtra = '' }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = envOrDefault('SEO_REPORT_TO', 'florenciarimolo.dev@gmail.com');
  if (!apiKey) throw new Error('Falta RESEND_API_KEY');

  // Extraer resumen mínimo del markdown si no tenemos objeto report completo
  const kpiMatch = markdown.match(/\*\*Periodo actual:\*\* (.+)/);
  const period = kpiMatch?.[1] ?? reportDate;

  const resend = new Resend(apiKey);
  const filename = `seo-${reportDate}.md`;
  const result = await resend.emails.send({
    from: 'RimoByte <no-reply@rimobyte.com>',
    to,
    subject: `Informe SEO semanal ${reportDate} — rimobyte.com${subjectExtra}`,
    html: `
      <h2 style="font-family:sans-serif">Informe SEO semanal — ${escapeHtml(reportDate)}</h2>
      <p style="font-family:sans-serif;color:#444">Objetivo: más leads de webs WordPress.</p>
      <p style="font-family:sans-serif">Periodo: ${escapeHtml(period)}</p>
      <p style="font-family:sans-serif">El detalle completo va en el adjunto Markdown y en GitHub.</p>
      <p style="font-family:sans-serif"><a href="${escapeHtml(githubUrl)}">Ver informe en GitHub</a></p>
    `,
    attachments: [
      {
        filename,
        content: Buffer.from(markdown, 'utf8'),
      },
    ],
  });
  if (result.error) {
    throw new Error(`Resend: ${result.error.message}`);
  }
  return result.data;
}

async function sendEmailFromReport(report, markdown, githubUrl) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = envOrDefault('SEO_REPORT_TO', 'florenciarimolo.dev@gmail.com');
  if (!apiKey) throw new Error('Falta RESEND_API_KEY');

  const resend = new Resend(apiKey);
  const filename = `seo-${report.reportDate}.md`;
  const result = await resend.emails.send({
    from: 'RimoByte <no-reply@rimobyte.com>',
    to,
    subject: `Informe SEO semanal ${report.reportDate} — rimobyte.com`,
    html: buildEmailHtml(report, githubUrl),
    attachments: [
      {
        filename,
        content: Buffer.from(markdown, 'utf8'),
      },
    ],
  });
  if (result.error) {
    throw new Error(`Resend: ${result.error.message}`);
  }
  return result.data;
}

async function runEmailOnly() {
  const reportDate = isoDate(new Date());
  const filename = `seo-${reportDate}.md`;
  const reportPath = path.join(REPORTS_DIR, filename);
  let markdown;
  try {
    markdown = await fs.readFile(reportPath, 'utf8');
  } catch {
    // Fallback: último seo-*.md por nombre
    const files = (await fs.readdir(REPORTS_DIR))
      .filter((f) => /^seo-\d{4}-\d{2}-\d{2}\.md$/.test(f))
      .sort();
    if (!files.length) {
      throw new Error('No hay informes en docs/reports/ para --email-only');
    }
    const latest = files[files.length - 1];
    markdown = await fs.readFile(path.join(REPORTS_DIR, latest), 'utf8');
    const dateFromName = latest.slice(4, 14);
    const githubUrl = githubReportUrl(latest);
    console.log(`Enviando informe existente: ${latest}`);
    const sent = await sendEmail({
      reportDate: dateFromName,
      markdown,
      githubUrl,
    });
    console.log('Email enviado:', sent?.id ?? 'ok');
    return;
  }
  const githubUrl = githubReportUrl(filename);
  console.log(`Enviando informe: ${filename}`);
  const sent = await sendEmail({ reportDate, markdown, githubUrl });
  console.log('Email enviado:', sent?.id ?? 'ok');
}

function buildPsiUrls(topPages) {
  const psiCandidates = [
    `${SITE_ORIGIN}/`,
    `${SITE_ORIGIN}/desarrollo-web-wordpress/`,
  ];

  // Preferir money pages entre el top por impresiones
  const ranked = [...topPages].sort((a, b) => {
    const am = isMoneyPage(a.page) ? 1 : 0;
    const bm = isMoneyPage(b.page) ? 1 : 0;
    if (bm !== am) return bm - am;
    return b.impressions - a.impressions;
  });

  for (const p of ranked) {
    if (psiCandidates.length >= 4) break;
    let url;
    try {
      const u = new URL(p.page);
      const host = u.hostname.replace(/^www\./, '');
      if (host !== 'rimobyte.com') continue;
      url = canonicalSiteUrl(p.page);
    } catch {
      continue;
    }
    if (!psiCandidates.includes(url)) psiCandidates.push(url);
  }
  return psiCandidates;
}

async function main() {
  await loadDotEnv();
  const opts = parseArgs();

  if (opts.emailOnly) {
    await runEmailOnly();
    return;
  }

  const siteUrl = process.env.GSC_SITE_URL?.trim();
  const psiKey = process.env.PSI_API_KEY?.trim();

  if (!siteUrl) throw new Error('Falta GSC_SITE_URL');
  if (!psiKey) throw new Error('Falta PSI_API_KEY');

  const ranges = dateRanges();
  const reportDate = isoDate(new Date());
  console.log(`Periodo actual: ${ranges.current.startDate} → ${ranges.current.endDate}`);
  console.log(`Periodo anterior: ${ranges.previous.startDate} → ${ranges.previous.endDate}`);

  const searchconsole = await getSearchConsole();

  const [totalsCurrent, totalsPrevious, queryRows, pageRows, prevPageRows] =
    await Promise.all([
      gscTotals(searchconsole, siteUrl, ranges.current),
      gscTotals(searchconsole, siteUrl, ranges.previous),
      gscQuery(searchconsole, siteUrl, ranges.current, ['query'], 50),
      gscQuery(searchconsole, siteUrl, ranges.current, ['page'], 100),
      gscQuery(searchconsole, siteUrl, ranges.previous, ['page'], 100),
    ]);

  const prevPages = rowsToPageMap(prevPageRows);

  const cleanQueries = queryRows
    .filter((r) => !isNoiseQuery(r.keys?.[0]))
    .map((r) => ({
      query: r.keys[0],
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }));

  const topCommercial = cleanQueries
    .filter((q) => isCommercialQuery(q.query))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  const topPages = pageRows
    .map((r) => ({
      page: r.keys[0],
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  const spikes = [];
  for (const r of pageRows) {
    const page = r.keys?.[0];
    if (!page) continue;
    const impressions = r.impressions ?? 0;
    if (impressions < SPIKE_MIN_IMPRESSIONS) continue;
    const prev = prevPages.get(pageKey(page));
    const prevImp = prev?.impressions ?? 0;
    // Evitar falsos picos: página nueva en el top necesita más volumen
    if (prevImp === 0 && impressions < SPIKE_MIN_IMPRESSIONS_NEW) continue;
    const change = pctChange(impressions, prevImp);
    if (change > 100) {
      spikes.push({
        page,
        impressions,
        clicks: r.clicks ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
        prevImpressions: prevImp,
        impChange: change,
      });
    }
  }
  spikes.sort((a, b) => b.impChange - a.impChange);

  for (const s of spikes.slice(0, 5)) {
    try {
      s.queries = await fetchPageQueries(
        searchconsole,
        siteUrl,
        ranges.current,
        s.page,
      );
    } catch (err) {
      console.warn(`  Aviso: no se pudieron leer queries de ${s.page}: ${err.message}`);
      s.queries = [];
    }
  }

  const opportunities = cleanQueries
    .filter(
      (q) =>
        isCommercialQuery(q.query) &&
        q.position >= 4 &&
        q.position <= 15 &&
        q.impressions >= 5,
    )
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10);

  const clickDrops = [];
  for (const r of pageRows) {
    const page = r.keys?.[0];
    if (!page || !isMoneyPage(page)) continue;
    const prev = prevPages.get(pageKey(page));
    if (!prev || prev.clicks < CLICK_DROP_MIN_PREV_CLICKS) continue;
    const clicks = r.clicks ?? 0;
    const change = pctChange(clicks, prev.clicks);
    if (change <= -20) {
      clickDrops.push({
        page,
        clicks,
        prevClicks: prev.clicks,
        clickChange: change,
      });
    }
  }

  const psiCandidates = buildPsiUrls(topPages);
  console.log('PSI URLs:', psiCandidates.join(', '));
  const psiResults = [];
  for (const url of psiCandidates) {
    process.stdout.write(`  PSI ${url}… `);
    const result = await fetchPsi(url, psiKey);
    if (result.error) console.log(`error: ${result.error}`);
    else console.log(`score ${result.score}`);
    psiResults.push(result);
  }

  const recommendations = buildRecommendations({
    spikes,
    topPages,
    opportunities,
    topCommercial,
    clickDrops,
    psiResults,
  });

  const report = {
    reportDate,
    ranges,
    totals: { current: totalsCurrent, previous: totalsPrevious },
    spikes,
    topCommercial,
    topPages,
    opportunities,
    clickDrops,
    psiResults,
    recommendations,
  };

  const markdown = buildMarkdown(report);
  const filename = `seo-${reportDate}.md`;
  const reportPath = path.join(REPORTS_DIR, filename);
  const githubUrl = githubReportUrl(filename);

  if (opts.dryRun) {
    console.log('\n--- DRY RUN ---\n');
    console.log(markdown);
    console.log('\n(no se escribe archivo, no se envía email, no se hace commit)');
    return;
  }

  await fs.mkdir(REPORTS_DIR, { recursive: true });
  await fs.writeFile(reportPath, markdown, 'utf8');
  console.log(`\nInforme escrito: ${path.relative(root, reportPath)}`);

  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(
      process.env.GITHUB_OUTPUT,
      `report_path=${path.relative(root, reportPath)}\nreport_date=${reportDate}\n`,
    );
  }

  if (!opts.noEmail) {
    console.log('Enviando email…');
    const sent = await sendEmailFromReport(report, markdown, githubUrl);
    console.log('Email enviado:', sent?.id ?? 'ok');
  } else {
    console.log('Email omitido (--no-email); usar --email-only tras el commit en CI.');
  }

  if (opts.noCommit) {
    console.log('Commit omitido (--no-commit); el workflow CI se encarga en producción.');
  }

  console.log('\nListo.');
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});

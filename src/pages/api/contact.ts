import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { verifyRecaptchaToken } from '../../lib/recaptcha';

export const prerender = false;

const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY?.trim();
const recaptchaSiteKey = import.meta.env.RECAPTCHA_SITE_KEY?.trim();

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const JSON_HEADERS = { 'Content-Type': 'application/json' } as const;

const LIMITS = {
  nombre: 120,
  email: 254,
  negocio: 120,
  servicio: 120,
  mensaje: 4000,
  /** slug corto de página de origen */
  origin: 80,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function asTrimmedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;
  return trimmed;
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), { status, headers: JSON_HEADERS });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const nombre = asTrimmedString(body.nombre, LIMITS.nombre);
    const email = asTrimmedString(body.email, LIMITS.email);
    const negocio = asTrimmedString(body.negocio, LIMITS.negocio);
    const servicio = asTrimmedString(body.servicio, LIMITS.servicio);
    const mensajeRaw = body.mensaje;
    const mensaje =
      mensajeRaw == null || mensajeRaw === ''
        ? ''
        : asTrimmedString(mensajeRaw, LIMITS.mensaje);

    const originRaw = body.origin;
    const originTrimmed =
      originRaw == null || originRaw === ''
        ? ''
        : asTrimmedString(originRaw, LIMITS.origin);

    if (!nombre || !email || !negocio || !servicio) {
      return jsonError('Faltan campos obligatorios o son inválidos', 400);
    }

    if (!EMAIL_RE.test(email)) {
      return jsonError('Email no válido', 400);
    }

    if (mensajeRaw != null && mensajeRaw !== '' && mensaje === null) {
      return jsonError('El mensaje es demasiado largo', 400);
    }

    if (originRaw != null && originRaw !== '' && originTrimmed === null) {
      return jsonError('El campo de origen no es válido', 400);
    }

    if (recaptchaSecret) {
      if (!recaptchaSiteKey) {
        console.error('RECAPTCHA_SECRET_KEY definida sin RECAPTCHA_SITE_KEY');
        return jsonError('Error de configuración del servidor', 503);
      }
      const verification = await verifyRecaptchaToken(
        typeof body.recaptchaToken === 'string' ? body.recaptchaToken : null,
        recaptchaSecret,
      );
      if (!verification.ok) {
        return jsonError('No se pudo verificar la protección anti-spam. Inténtalo de nuevo.', 400);
      }
    }

    const safe = {
      nombre: escapeHtml(nombre),
      email: escapeHtml(email),
      negocio: escapeHtml(negocio),
      servicio: escapeHtml(servicio),
      mensaje: mensaje ? escapeHtml(mensaje) : '',
      origin: originTrimmed ? escapeHtml(originTrimmed) : '',
    };

    const originLabel = safe.origin ? ` [${safe.origin}]` : '';

    await resend.emails.send({
      from: 'RimoByte <no-reply@rimobyte.com>',
      to: 'info@rimobyte.com',
      replyTo: email,
      subject: `Nuevo contacto${originLabel}: ${nombre} — ${servicio}`,
      html: `
        <h2 style="font-family:sans-serif">Nuevo mensaje de contacto</h2>
        ${safe.origin ? `<p><strong>Origen:</strong> ${safe.origin}</p>` : ''}
        <p><strong>Nombre:</strong> ${safe.nombre}</p>
        <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
        <p><strong>Tipo de negocio:</strong> ${safe.negocio}</p>
        <p><strong>Qué necesita:</strong> ${safe.servicio}</p>
        ${safe.mensaje ? `<p><strong>Mensaje:</strong> ${safe.mensaje}</p>` : ''}
      `,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: JSON_HEADERS });
  } catch (error) {
    console.error('Error Resend:', error);
    return jsonError('Error al enviar el mensaje', 500);
  }
};

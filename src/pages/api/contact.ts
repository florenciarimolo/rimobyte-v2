import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nombre, email, negocio, servicio, mensaje } = await request.json();

    if (!nombre || !email || !negocio || !servicio) {
      return new Response(JSON.stringify({ error: 'Faltan campos obligatorios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await resend.emails.send({
      from: 'RimoByte <no-reply@rimobyte.com>',
      to: 'info@rimobyte.com',
      replyTo: email,
      subject: `Nuevo contacto: ${nombre} — ${servicio}`,
      html: `
        <h2 style="font-family:sans-serif">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Tipo de negocio:</strong> ${negocio}</p>
        <p><strong>Qué necesita:</strong> ${servicio}</p>
        ${mensaje ? `<p><strong>Mensaje:</strong> ${mensaje}</p>` : ''}
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error Resend:', error);
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

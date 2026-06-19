import { useEffect, useState } from 'react';
import { contactOriginFromPathname } from '../../lib/contact-origin';

const RECAPTCHA_ACTION = 'contact';

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[data-recaptcha="${siteKey}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('recaptcha-script')), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = siteKey;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('recaptcha-script'));
    document.head.appendChild(script);
  });
}

function mountRecaptchaBadge(): void {
  if (typeof document === 'undefined') return;
  const badge = document.querySelector<HTMLElement>('.grecaptcha-badge');
  const root = document.getElementById('recaptcha-root');
  if (!badge || !root || badge.parentElement === root) return;
  root.appendChild(badge);
  badge.style.zIndex = '9998';
  badge.style.position = 'fixed';
}

async function getRecaptchaToken(siteKey: string): Promise<string> {
  await loadRecaptchaScript(siteKey);
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha) throw new Error('recaptcha-unavailable');

  return new Promise((resolve, reject) => {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(siteKey, { action: RECAPTCHA_ACTION })
        .then(resolve)
        .catch(reject);
    });
  });
}

const textFields = [
  { id: 'contact-nombre', name: 'nombre', label: 'Nombre', type: 'text' },
  { id: 'contact-email', name: 'email', label: 'Email', type: 'email' },
] as const;

const selectFields = [
  {
    id: 'contact-negocio',
    name: 'negocio',
    label: '¿Qué tipo de negocio tienes?',
    opts: ['Restaurante / Hostelería', 'Peluquería / Estética', 'Asesoría / Gestoría', 'Entrenador personal', 'Tienda / Comercio local', 'Clínica / Salud', 'Psicólogo / Terapeuta', 'Otro'],
  },
  {
    id: 'contact-servicio',
    name: 'servicio',
    label: '¿Qué necesitas?',
    opts: ['Web nueva desde cero', 'Renovar web existente', 'Tienda online', 'Mantenimiento', 'No lo sé aún'],
  },
] as const;

type ContactFormProps = {
  recaptchaSiteKey?: string;
  origin?: string;
  omitAnchor?: boolean;
  headingLevel?: 1 | 2;
  heading?: string;
  headingEm?: string;
  intro?: string;
  priceNote?: string;
  serviceLink?: string;
};

const fieldInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 0',
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'var(--color-text-primary)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--color-border-hover)',
  borderRadius: 0,
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function ContactForm({
  recaptchaSiteKey = '',
  origin,
  omitAnchor = false,
  headingLevel = 2,
  heading = '¿Hablamos?',
  headingEm,
  intro,
  priceNote,
  serviceLink,
}: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const recaptchaEnabled = Boolean(recaptchaSiteKey.trim());

  useEffect(() => {
    if (!recaptchaEnabled) return;

    const observer = new MutationObserver(() => mountRecaptchaBadge());
    observer.observe(document.body, { childList: true, subtree: true });

    loadRecaptchaScript(recaptchaSiteKey)
      .then(() => {
        mountRecaptchaBadge();
        window.setTimeout(mountRecaptchaBadge, 0);
        window.setTimeout(mountRecaptchaBadge, 500);
      })
      .catch(() => {
        /* el token se pedirá de nuevo en submit */
      });

    return () => observer.disconnect();
  }, [recaptchaEnabled, recaptchaSiteKey]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const originValue =
      data.origin?.trim() ||
      origin?.trim() ||
      (typeof window !== 'undefined' ? contactOriginFromPathname(window.location.pathname) : '');
    if (originValue) data.origin = originValue;

    try {
      let recaptchaToken: string | undefined;
      if (recaptchaEnabled) {
        recaptchaToken = await getRecaptchaToken(recaptchaSiteKey);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...(recaptchaToken ? { recaptchaToken } : {}) }),
      });
      if (res.ok) { setSent(true); } else { setError(true); }
    } catch { setError(true); }
    finally { setLoading(false); }
  };

  const HeadingTag = headingLevel === 1 ? 'h1' : 'h2';
  const defaultIntro =
    'Sin compromiso y sin tecnicismos. En menos de 24 horas te respondo con ideas concretas, no con una plantilla de presupuesto.';

  return (
    <section {...(!omitAnchor ? { id: 'contacto' } : {})} className="landing-contact">
      <div className="landing-wrap landing-contact__layout">
        <div className="landing-contact__left reveal">
          <HeadingTag>
            {heading}
            {headingEm ? (
              <>
                {' '}
                <em className="text-gradient-logo">{headingEm}</em>
              </>
            ) : null}
          </HeadingTag>
          <p>{intro ?? defaultIntro}</p>
          {(priceNote || serviceLink) && (
            <p className="landing-contact__meta">
              {priceNote}
              {priceNote && serviceLink ? ' · ' : null}
              {serviceLink ? (
                <a href={serviceLink}>Ver servicio completo →</a>
              ) : null}
            </p>
          )}
          <a href="mailto:info@rimobyte.com" className="landing-contact__email">info@rimobyte.com</a>
          <a href="tel:+34684713743" className="landing-contact__phone">+34 684 713 743</a>
        </div>

        {sent ? (
          <div className="reveal" role="status" aria-live="polite" style={{ padding: '2rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, marginBottom: '0.75rem' }}>¡Mensaje enviado!</p>
            <p style={{ color: 'var(--color-text-secondary)' }}>Te respondo en menos de 24 horas.</p>
          </div>
        ) : (
          <form className="landing-contact__form reveal" onSubmit={handleSubmit} aria-busy={loading}>
            <input type="hidden" name="origin" value={origin ?? ''} />
            {textFields.map((f) => (
              <div key={f.name} className="landing-field">
                <label htmlFor={f.id}>{f.label}</label>
                <input
                  id={f.id}
                  name={f.name}
                  type={f.type}
                  required
                  style={fieldInputStyle}
                  autoComplete={f.name === 'nombre' ? 'name' : 'email'}
                />
              </div>
            ))}
            {selectFields.map((f) => (
              <div key={f.name} className="landing-field">
                <label htmlFor={f.id}>{f.label}</label>
                <select id={f.id} name={f.name} required style={fieldInputStyle} defaultValue="">
                  <option value="" disabled>Selecciona...</option>
                  {f.opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="landing-field">
              <label htmlFor="contact-mensaje">
                Cuéntame más <span className="opt">(opcional)</span>
              </label>
              <textarea
                id="contact-mensaje"
                name="mensaje"
                rows={3}
                style={{ ...fieldInputStyle, resize: 'vertical', minHeight: 80 }}
              />
            </div>

            {error && (
              <p role="alert" aria-live="assertive" style={{ fontSize: '0.875rem', color: '#f87171', margin: 0 }}>
                Hubo un error al enviar. Inténtalo de nuevo o escríbeme a info@rimobyte.com.
              </p>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn--block" aria-disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {recaptchaEnabled && (
              <p className="landing-contact__legal">
                Protegido por reCAPTCHA. Aplican la{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de privacidad</a>
                {' '}y los{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Términos de Google</a>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

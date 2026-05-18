import { useEffect, useState } from 'react';
import { contactOriginFromPathname } from '../../lib/contact-origin';
import Icon from '../ui/Icon';

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

const mono = { fontFamily: "'Space Mono', monospace" };

const inputBase: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'white',
  backgroundColor: 'var(--color-bg-surface)',
  border: '1px solid var(--color-border-default)',
  borderRadius: '14px',
  padding: '1rem 1.5rem',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
  appearance: 'none' as const,
};

const labelStyle: React.CSSProperties = {
  ...mono,
  fontSize: '0.625rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.30)',
  marginBottom: '0.5rem',
  display: 'block',
};

const selectStyle: React.CSSProperties = {
  ...inputBase,
  paddingRight: '3rem',
  cursor: 'pointer',
};

const selectWrapStyle: React.CSSProperties = {
  position: 'relative',
};

const selectChevronStyle: React.CSSProperties = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  display: 'flex',
  color: 'rgba(255,255,255,0.55)',
};

const textFields = [
  { id: 'contact-nombre', name: 'nombre', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
  { id: 'contact-email', name: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' },
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
  /** Identificador corto de la página (ej. `web-corporativa`) para el email */
  origin?: string;
  /** Evita duplicar `#contacto` cuando ya existe una sección anchor encima */
  omitAnchor?: boolean;
  /** En página dedicada `/contacto/` usar `1` para un único `<h1>` */
  headingLevel?: 1 | 2;
  /** Texto del titular principal (h1 en contacto, h2 en el resto) */
  heading?: string;
};

export default function ContactForm({
  recaptchaSiteKey = '',
  origin,
  omitAnchor = false,
  headingLevel = 2,
  heading = '¿Hablamos?',
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

  return (
    <section
      {...(!omitAnchor ? { id: 'contacto' } : {})}
      className="section-bg--elevated"
      style={{ padding: 'clamp(4rem,8vw,7rem) 0' }}
    >
      <div style={{ maxWidth: 'var(--max-width-layout)', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>

          <div>
            <p className="eyebrow">
              <span className="eyebrow__bracket" aria-hidden="true">[</span>
              CONTACTO
              <span className="eyebrow__bracket" aria-hidden="true">]</span>
            </p>
            <HeadingTag style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '1.5rem' }}>
              {heading}
            </HeadingTag>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: '380px', marginBottom: '2rem' }}>
              Sin compromiso y sin tecnicismos. En menos de 24 horas te respondo con ideas concretas, no con una plantilla de presupuesto.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="mailto:info@rimobyte.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }}>
                <Icon name="mail" style={{ width: 20, height: 20, color: 'var(--color-blue)' }} />
                info@rimobyte.com
              </a>
              <a href="https://wa.me/34684713743" target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', fontSize: '0.9375rem', transition: 'color 0.2s' }}>
                <Icon name="whatsapp" style={{ width: 20, height: 20, color: 'var(--color-blue)' }} />
                +34 684 713 743
              </a>
            </div>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }} role="status" aria-live="polite">
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'white', marginBottom: '0.75rem' }}>¡Mensaje enviado!</p>
              <p style={{ color: 'rgba(255,255,255,0.55)' }}>Te respondo en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} aria-busy={loading}>
              <input type="hidden" name="origin" value={origin ?? ''} />
              {textFields.map(f => (
                <div key={f.name}>
                  <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
                  <input id={f.id} name={f.name} type={f.type} required placeholder={f.placeholder} style={inputBase} />
                </div>
              ))}
              {selectFields.map(f => (
                <div key={f.name}>
                  <label htmlFor={f.id} style={labelStyle}>{f.label}</label>
                  <div style={selectWrapStyle}>
                    <select id={f.id} name={f.name} required style={selectStyle} defaultValue="">
                      <option value="" disabled>Selecciona...</option>
                      {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span style={selectChevronStyle} aria-hidden="true">
                      <Icon name="chevron-down" style={{ width: 20, height: 20 }} />
                    </span>
                  </div>
                </div>
              ))}
              <div>
                <label htmlFor="contact-mensaje" style={labelStyle}>
                  Cuéntame más <span style={{ opacity: 0.5 }}>(opcional)</span>
                </label>
                <textarea id="contact-mensaje" name="mensaje" rows={4} placeholder="Describe tu proyecto..." style={{ ...inputBase, resize: 'vertical' }} />
              </div>

              {error && (
                <p role="alert" aria-live="assertive" style={{ fontSize: '0.875rem', color: '#f87171', margin: 0 }}>
                  Hubo un error al enviar. Inténtalo de nuevo o escríbeme a info@rimobyte.com.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start' }}
                aria-disabled={loading}
              >
                {loading ? 'Enviando…' : 'Enviar mensaje →'}
              </button>

              {recaptchaEnabled && (
                <p
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.35)',
                    margin: 0,
                  }}
                >
                  Este sitio está protegido por reCAPTCHA y se aplican la{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    Política de privacidad
                  </a>{' '}
                  y los{' '}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    Términos del servicio
                  </a>{' '}
                  de Google.
                </p>
              )}
            </form>
          )}

        </div>
      </div>
    </section>
  );
}

import { contactOriginFromPathname } from '../lib/contact-origin';

const RECAPTCHA_ACTION = 'contact';

function loadRecaptchaScript(siteKey: string): Promise<void> {
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
      grecaptcha.execute(siteKey, { action: RECAPTCHA_ACTION }).then(resolve).catch(reject);
    });
  });
}

function setFormBusy(form: HTMLFormElement, busy: boolean): void {
  form.setAttribute('aria-busy', String(busy));
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = submit?.querySelector<HTMLElement>('[data-contact-submit-label]');
  if (submit) {
    submit.disabled = busy;
    submit.setAttribute('aria-disabled', String(busy));
  }
  if (label) label.textContent = busy ? 'Enviando…' : 'Enviar mensaje';
}

function showError(form: HTMLFormElement, visible: boolean): void {
  const error = form.querySelector<HTMLElement>('[data-contact-error]');
  if (error) error.hidden = !visible;
}

function showSuccess(form: HTMLFormElement): void {
  const card = form.closest('.contact-v6__form-card');
  const success = card?.querySelector<HTMLElement>('[data-contact-success]');
  if (!card || !success) return;
  form.hidden = true;
  card.querySelector('.contact-v6__form-lede')?.remove();
  success.hidden = false;
}

function initRecaptcha(siteKey: string): void {
  const observer = new MutationObserver(() => mountRecaptchaBadge());
  observer.observe(document.body, { childList: true, subtree: true });

  loadRecaptchaScript(siteKey)
    .then(() => {
      mountRecaptchaBadge();
      window.setTimeout(mountRecaptchaBadge, 0);
      window.setTimeout(mountRecaptchaBadge, 500);
    })
    .catch(() => {
      /* el token se pedirá de nuevo en submit */
    });
}

function bindContactForm(form: HTMLFormElement): void {
  if (form.dataset.contactBound === 'true') return;
  form.dataset.contactBound = 'true';

  const siteKey = form.dataset.recaptchaKey?.trim() ?? '';
  const recaptchaEnabled = Boolean(siteKey);
  const defaultOrigin = form.dataset.origin?.trim() ?? '';

  if (recaptchaEnabled) initRecaptcha(siteKey);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setFormBusy(form, true);
    showError(form, false);

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const originValue =
      data.origin?.trim() ||
      defaultOrigin ||
      contactOriginFromPathname(window.location.pathname);
    if (originValue) data.origin = originValue;

    try {
      let recaptchaToken: string | undefined;
      if (recaptchaEnabled) {
        recaptchaToken = await getRecaptchaToken(siteKey);
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...(recaptchaToken ? { recaptchaToken } : {}) }),
      });

      if (res.ok) {
        showSuccess(form);
      } else {
        showError(form, true);
      }
    } catch {
      showError(form, true);
    } finally {
      setFormBusy(form, false);
    }
  });
}

export function initContactForms(): void {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach(bindContactForm);
}

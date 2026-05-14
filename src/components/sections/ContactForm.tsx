import { useState } from 'react';

const inputClass =
  'font-(--font-body) text-[0.9375rem] text-(--color-text-primary) bg-(--color-bg-surface) ' +
  'border border-(--color-border-default) rounded-lg px-4 py-3.5 outline-none w-full ' +
  'transition-[border-color,background] duration-200 ' +
  'focus:border-(--color-blue-border) focus:bg-(--color-bg-subtle) ' +
  'focus:shadow-[0_0_0_3px_rgba(43,71,236,0.08)] ' +
  'placeholder:text-(--color-text-muted)';

const labelClass =
  'font-(--font-mono) text-[0.65rem] tracking-[0.1em] uppercase text-(--color-text-muted) mb-2 block';

const selectFieldClass =
  'font-(--font-body) text-[0.9375rem] text-(--color-text-primary) bg-(--color-bg-surface) ' +
  'border border-(--color-border-default) rounded-lg pl-4 pr-12 py-3.5 outline-none w-full ' +
  'appearance-none cursor-pointer ' +
  'transition-[border-color,background] duration-200 ' +
  'focus:border-(--color-blue-border) focus:bg-(--color-bg-subtle) ' +
  'focus:shadow-[0_0_0_3px_rgba(43,71,236,0.08)]';

function SelectChevron() {
  return (
    <span
      className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center justify-center text-(--color-blue)"
      aria-hidden
    >
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="bg-(--color-bg-elevated) py-[clamp(4rem,8vw,7rem)]">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Texto izquierda */}
          <div>
            <p className="eyebrow mb-5">
              <span className="text-[0.5rem] opacity-70">●</span>{' '}CONTACTO
            </p>
            <h2 className="font-(--font-display) font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-(--color-text-primary) mb-6">
              ¿Hablamos?
            </h2>
            <p className="text-base leading-[1.75] text-(--color-text-secondary)">
              Sin compromiso y sin tecnicismos. Cuéntame qué necesitas y en menos de 24 horas te respondo con ideas concretas, no con una plantilla de presupuesto.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:info@rimobyte.com"
                className="inline-flex items-center gap-3 text-(--color-text-primary) no-underline transition-colors duration-200 hover:text-(--color-blue)"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-(--color-blue)"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-[0.9375rem] font-(--font-body)">info@rimobyte.com</span>
              </a>

              <a
                href="https://wa.me/34684713743"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-(--color-text-primary) no-underline transition-colors duration-200 hover:text-(--color-blue)"
                aria-label="Abrir WhatsApp con el número +34 684 713 743"
              >
                <svg
                  className="h-5 w-5 shrink-0 text-(--color-blue)"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-[0.9375rem] font-(--font-body)">+34 684 713 743</span>
              </a>
            </div>
          </div>

          {/* Formulario derecha */}
          {sent ? (
            <div className="text-center py-12">
              <p className="font-(--font-display) text-2xl font-semibold text-(--color-text-primary) mb-3">
                ¡Mensaje enviado!
              </p>
              <p className="text-(--color-text-secondary)">
                Te respondo en menos de 24 horas.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div>
                <label className={labelClass}>Nombre</label>
                <input name="nombre" type="text" required placeholder="Tu nombre" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input name="email" type="email" required placeholder="tu@email.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Tipo de negocio</label>
                <div className="relative">
                  <select name="negocio" required className={selectFieldClass}>
                    <option value="">Selecciona...</option>
                    {['Restaurante / Hostelería', 'Peluquería / Estética', 'Asesoría / Gestoría', 'Entrenador personal', 'Tienda / Comercio local', 'Clínica / Salud', 'Psicólogo / Terapeuta', 'Otro'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
              </div>

              <div>
                <label className={labelClass}>¿Qué necesitas?</label>
                <div className="relative">
                  <select name="servicio" required className={selectFieldClass}>
                    <option value="">Selecciona...</option>
                    {['Web nueva desde cero', 'Renovar web existente', 'Tienda online', 'Mantenimiento', 'No lo sé aún'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <SelectChevron />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Cuéntame más <span className="opacity-50">(opcional)</span>
                </label>
                <textarea name="mensaje" rows={4} placeholder="Describe brevemente tu proyecto..." className={`${inputClass} resize-y`} />
              </div>

              {error && (
                <p className="text-sm text-red-400">
                  Hubo un error al enviar. Inténtalo de nuevo o escríbeme a info@rimobyte.com.
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-(--color-blue) text-white font-(--font-body) text-[0.9375rem] font-semibold py-3.5 px-7 rounded-lg border-0 cursor-pointer w-full transition-colors duration-200 hover:bg-(--color-blue-hover) disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando…' : 'Enviar mensaje →'}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}

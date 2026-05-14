import { useState } from 'react';

const faqs = [
  {
    q: '¿Cuánto cuesta una web?',
    a: 'Web corporativa desde 600€, tienda online desde 1.200€. Siempre con presupuesto claro antes de empezar — sin sorpresas ni costes ocultos.',
  },
  {
    q: '¿Cuánto tarda en estar lista?',
    a: 'Web corporativa 3-4 semanas, tienda online 4-6 semanas. Depende también del contenido — te guío desde el principio.',
  },
  {
    q: '¿Necesito saber de tecnología?',
    a: 'Para nada. Me encargo de todo lo técnico y te explico solo lo que necesitas saber para gestionar tu web del día a día.',
  },
  {
    q: '¿Qué pasa si ya tengo una web?',
    a: 'Puedo renovarla, migrarla o mejorarla. Primero la reviso y te digo honestamente qué tiene sentido hacer — sin venderte nada que no necesites.',
  },
  {
    q: '¿Y si después necesito cambiar algo?',
    a: 'Te enseño a hacer los cambios básicos tú mismo. Y si necesitas algo más complejo, aquí estoy. Con o sin contrato de mantenimiento.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-(--color-bg-base) py-[clamp(4rem,8vw,7rem)]">
      <div className="max-w-[1200px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow mb-5">
              <span className="text-[0.5rem] opacity-70">●</span>{' '}PREGUNTAS FRECUENTES
            </p>

            <h2 className="font-(--font-display) font-semibold text-[clamp(2rem,3.5vw,3rem)] leading-[1.1] tracking-[-0.02em] text-(--color-text-primary) mb-12">
              Dudas habituales antes de empezar.
            </h2>
          </div>

          <div className="divide-y divide-(--color-border-default) border-t border-b border-(--color-border-default)">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left bg-transparent border-0 cursor-pointer"
              >
                <span className="font-(--font-display) font-medium text-base text-(--color-text-primary) leading-[1.4]">
                  {faq.q}
                </span>
                <span className="text-(--color-blue) text-xl leading-none shrink-0">
                  {open === i ? '−' : '+'}
                </span>
              </button>

              {/* max-height como valor dinámico — inline style inevitable para animación JS */}
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: open === i ? '200px' : '0' }}
              >
                <p className="text-[0.9375rem] leading-[1.75] text-(--color-text-secondary) pb-5">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}

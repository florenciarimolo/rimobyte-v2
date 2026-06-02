import { useMemo, useState } from 'react';

import { faqEntries } from '../../data/faq';

const display = { fontFamily: "'Clash Grotesk', Inter, sans-serif" };

export type FAQItem = { question: string; answer: string };

type FAQProps = {
  faqs?: FAQItem[];
};

export default function FAQ({ faqs }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null);

  const entries = useMemo(
    () => (faqs?.length ? faqs.map((f) => ({ q: f.question, a: f.answer })) : faqEntries),
    [faqs],
  );

  return (
    <section className="section-bg" style={{ padding: 'clamp(4rem,8vw,7rem) 0' }}>
      <div style={{ maxWidth: 'var(--max-width-layout)', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
            <p className="eyebrow">
              <span className="eyebrow__bracket" aria-hidden="true">[</span>
              PREGUNTAS FRECUENTES
              <span className="eyebrow__bracket" aria-hidden="true">]</span>
            </p>
            <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.08, letterSpacing: '-0.025em', margin: 0 }}>
              Dudas habituales antes de <em style={{ fontStyle: 'italic', color: 'var(--color-blue)' }}>empezar.</em>
            </h2>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border-default)' }}>
            {entries.map((f, i) => {
              const buttonId = `faq-btn-${i}`;
              const panelId = `faq-panel-${i}`;
              const isOpen = open === i;

              return (
                <div key={f.q} style={{ borderBottom: '1px solid var(--color-border-default)' }}>
                  <h3 style={{ margin: 0 }}>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', padding: '1.25rem 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <span style={{ ...display, fontWeight: 500, fontSize: '1rem', color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{f.q}</span>
                      <span aria-hidden="true" style={{ color: 'var(--color-blue)', fontSize: '1.25rem', flexShrink: 0, lineHeight: 1 }}>{isOpen ? '−' : '+'}</span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="faq-panel"
                    style={{
                      maxHeight: isOpen ? 'min(90vh, 520px)' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--color-text-secondary)', paddingBottom: '1.25rem', margin: 0 }}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Copy único para FAQ en home + JSON-LD FAQPage */
export interface FaqEntry {
  q: string;
  a: string;
}

export const faqEntries: FaqEntry[] = [
  {
    q: '¿Cuánto cuesta una web?',
    a: 'Web corporativa desde 600€, tienda online desde 1.500€. Siempre con presupuesto claro antes de empezar — sin sorpresas ni costes ocultos.',
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
    a: 'Puedo renovarla, migrarla o mejorarla. Primero la reviso y te digo honestamente qué tiene sentido hacer.',
  },
  {
    q: '¿Y si después necesito cambiar algo?',
    a: 'Te enseño a hacer los cambios básicos tú mismo. Y si necesitas algo más complejo, aquí estoy. Con o sin contrato de mantenimiento.',
  },
];

export function buildFaqPageJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntries.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

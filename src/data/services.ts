import { projects, type Project } from './projects';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedCase {
  /** referencia al proyecto en projects.ts */
  slug: string;
  /** frase corta destacada */
  highlight: string;
  testimonialQuote: string;
}

export interface Service {
  slug: string;
  name: string;
  eyebrow: string;
  /** H1 — sin el <em>, se marca aparte */
  headline: string;
  /** La palabra o frase que va en <em> dentro del H1 */
  headlineEm: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  checks: string[];
  illustration: 'corporate' | 'ecommerce' | 'maintenance';
  targetAudience: string[];
  features: ServiceFeature[];
  price: string;
  priceNote: string;
  relatedCases: RelatedCase[];
  faqs: ServiceFAQ[];
  ctaFinal: {
    title: string;
    titleEm: string;
    text: string;
    cta: string;
  };
  seo: {
    title: string;
    description: string;
  };
}

export const services: Service[] = [
  {
    slug: 'web-corporativa',
    name: 'Web corporativa',
    eyebrow: 'SERVICIO · WEB CORPORATIVA',
    headline: 'Una web que representa tu negocio y trabaja por ti',
    headlineEm: 'las 24 horas.',
    description:
      'Para autónomos y negocios locales que quieren existir profesionalmente en internet, captar clientes y transmitir confianza desde el primer clic.',
    ctaPrimary: 'Pide tu presupuesto',
    ctaSecondary: 'Ver proyectos',
    checks: ['Tuya desde el primer día', 'Sin dependencias', 'SEO incluido'],
    illustration: 'corporate',
    targetAudience: [
      'Tienes un negocio local y tus clientes no te encuentran en Google',
      'Tu web actual no transmite la imagen que mereces o está desactualizada',
      'Dependes de una agencia que no responde o tiene el hosting a su nombre',
      'Quieres empezar desde cero con las cosas bien hechas desde el primer día',
    ],
    features: [
      {
        title: 'Diseño personalizado',
        description:
          'No uso plantillas genéricas. Cada web se diseña partiendo de tu negocio, tu sector y tus clientes.',
      },
      {
        title: 'Desarrollo a medida',
        description:
          'Construida con tecnología moderna, rápida y segura. Sin plugins innecesarios que la ralenticen.',
      },
      {
        title: 'SEO básico incluido',
        description:
          'Meta titles, meta descriptions, estructura de headings y velocidad optimizada. Tu web lista para que Google la encuentre desde el primer día.',
      },
      {
        title: 'Formulario de contacto',
        description: 'Para que tus clientes puedan escribirte directamente desde la web.',
      },
      {
        title: 'Diseño responsive',
        description:
          'Se ve bien en móvil, tablet y escritorio. El 70% de las visitas llegan desde el móvil.',
      },
      {
        title: 'Dominio y hosting a tu nombre',
        description:
          'Te guío para que lo contrates tú directamente. Sin intermediarios, sin rehenes.',
      },
      {
        title: 'Formación básica incluida',
        description:
          'Al entregar te explico cómo gestionar tu web del día a día. Sin depender de mí para lo básico.',
      },
    ],
    price: 'Desde 600€',
    priceNote:
      'El hosting y el dominio los pagas tú directamente (entre 50€ y 100€/año aproximadamente). Son tuyos, no míos.',
    relatedCases: [
      {
        slug: 'vila-i-lancis',
        highlight:
          'Rediseño completo y recuperación de accesos — su web estaba en manos de una agencia que no respondía y no les dejaba entrar al panel.',
        testimonialQuote:
          'Trabajar con ella una gran experiencia y profesionalidad. Conoce muy bien el mercado.',
      },
      {
        slug: 'lucia-nails-art',
        highlight:
          'Web desde cero con SEO local — hoy aparece la primera en Google en su área y tiene toda la agenda llena.',
        testimonialQuote:
          'Gracias a eso he captado muchísimas clientas y tengo toda la agenda llena.',
      },
      {
        slug: 'ariadna-vilalta',
        highlight:
          'Web orientada a posicionamiento como experta internacional — no un catálogo de servicios, sino una plataforma de autoridad.',
        testimonialQuote:
          'RimoByte consiguió lo que parecía imposible: que alguien entendiera qué quiero comunicar.',
      },
    ],
    faqs: [
      {
        question: '¿Necesito saber de WordPress para gestionar mi web?',
        answer:
          'No. Al entregar te explico exactamente cómo actualizar textos, cambiar imágenes y añadir contenido básico.',
      },
      {
        question: '¿Puedo cambiar el diseño después si no me gusta?',
        answer:
          'Antes de construir nada te presento dos propuestas de diseño. No empiezo a desarrollar hasta que estés conforme.',
      },
      {
        question: '¿Qué pasa con mi web actual si ya tengo una?',
        answer:
          'La revisamos juntos y decido contigo qué conservar. Antes de tocar nada hago una copia de seguridad completa, así no se pierde nada del trabajo anterior.',
      },
      {
        question: '¿El SEO básico incluido es suficiente para aparecer en Google?',
        answer:
          'Es el punto de partida necesario: estructura correcta, velocidad, meta tags y contenido optimizado.',
      },
      {
        question: '¿Cuánto tarda realmente?',
        answer: 'Entre 3 y 4 semanas desde que tengo todo el contenido.',
      },
      {
        question: '¿Qué pasa si necesito algo que no está incluido?',
        answer:
          'Te lo digo antes de empezar, no al final. Si surge algo fuera del alcance inicial, lo hablamos y presupuestamos aparte.',
      },
    ],
    ctaFinal: {
      title: '¿Empezamos',
      titleEm: 'juntos?',
      text: 'Cuéntame tu negocio y en menos de 24 horas te respondo con una propuesta concreta.',
      cta: 'Pide tu presupuesto gratuito',
    },
    seo: {
      title: 'Web corporativa para negocios locales · RimoByte',
      description:
        'Web profesional para autónomos y negocios locales desde 600€. SEO incluido, tuya desde el primer día, sin dependencias. Presupuesto cerrado antes de empezar.',
    },
  },
];

export function getRelatedProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherServices(currentSlug: string): Service[] {
  return services.filter((s) => s.slug !== currentSlug);
}

import { projects, type Project } from './projects';

export interface SectorFeature {
  title: string;
  description: string;
  /** Etiqueta mono bajo la card (ej. "Carta · autoservicio") */
  tag?: string;
  /** Variante del grid asimétrico */
  span?: 'tall' | 'wide';
}

export interface SectorFAQ {
  question: string;
  answer: string;
}

export interface SectorCase {
  /** referencia al proyecto en projects.ts */
  slug: string;
  challenge: string;
  solution: string;
  result: string;
  resultEm?: string;
  testimonialQuote: string;
  author: string;
}

export interface Sector {
  slug: string;
  name: string;
  sectorNameShort: string;
  eyebrow: string;
  headline: string;
  headlineEm: string;
  description: string;
  ctaPrimary: string;
  checks: string[];
  heroStrip?: { label: string; tags: string[] };
  painPoints?: {
    eyebrow: string;
    title: string;
    titleEm: string;
    points: string[];
  };
  featuresIntro?: string;
  featuresTitle?: string;
  featuresTitleEm?: string;
  features: SectorFeature[];
  relatedCase?: SectorCase;
  faqs: SectorFAQ[];
  ctaFinal: {
    title: string;
    titleEm?: string;
    text: string;
  };
  serviceLink: string;
  seo: {
    title: string;
    description: string;
  };
}

export function getSectorProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const sectors: Sector[] = [
  {
    slug: 'web-para-restaurantes',
    name: 'Web para restaurantes',
    sectorNameShort: 'restaurantes',
    eyebrow: 'WEB PARA RESTAURANTES',
    headline: 'Tu restaurante merece una web que llene mesas, no que ocupe',
    headlineEm: 'espacio en internet.',
    description:
      'Diseño webs para restaurantes, bares y negocios de hostelería que quieren ser encontrados en Google, mostrar su carta online y facilitar las reservas, sin depender de plataformas que se quedan con tu margen.',
    ctaPrimary: 'Quiero mi web para restaurante',
    checks: ['Carta online actualizable', 'Apareces en Google Maps', 'Tuya desde el primer día'],
    heroStrip: {
      label: 'Enfoque hostelería',
      tags: ['Carta digital', 'Reservas propias', 'Google local'],
    },
    painPoints: {
      eyebrow: '¿TE SUENA?',
      title: 'Lo que frena a muchos restaurantes',
      titleEm: 'antes de abrir la web.',
      points: [
        'La carta está en PDF y cada cambio de precio implica llamar a alguien.',
        'En Google aparece TheFork o el perfil de otro antes que tu propio negocio.',
        'Las reservas van por Instagram o WhatsApp — sin sistema, sin control.',
        'Tienes web, pero en móvil se ve mal y no aparece en búsquedas locales.',
      ],
    },
    featuresIntro:
      'Cinco piezas concretas que convierten visitas en mesas reservadas. Nada genérico: cada una resuelve algo que tus clientes buscan antes de cruzar la puerta.',
    featuresTitle: 'Lo que convierte visitas en mesas',
    featuresTitleEm: 'en una web para restaurantes.',
    features: [
      {
        title: 'Carta online actualizable',
        description:
          'Para que puedas cambiar precios, platos y menús tú mismo, sin llamar a nadie.',
        tag: 'Carta · autoservicio',
        span: 'tall',
      },
      {
        title: 'Reservas directas',
        description:
          'Formulario o integración con tu sistema de reservas para reservar mesa sin salir de tu web.',
        tag: 'Reservas · sin comisiones',
      },
      {
        title: 'Presencia en Google Maps',
        description:
          'Web enlazada con tu Google Business Profile para aparecer en búsquedas locales.',
        tag: 'SEO · búsqueda local',
      },
      {
        title: 'Fotos que abren el apetito',
        description: 'Diseño pensado para que las fotos de tus platos sean las protagonistas.',
        tag: 'Visual · conversión',
        span: 'wide',
      },
      {
        title: 'Horarios y ubicación claros',
        description:
          'Lo primero que busca alguien antes de ir a un restaurante. Fácil de encontrar, siempre actualizada.',
        tag: 'Info · acceso directo',
      },
    ],
    relatedCase: undefined,
    faqs: [
      {
        question: '¿Puedo actualizar la carta yo mismo?',
        answer: 'Sí. Al entregar te explico exactamente cómo hacerlo sin conocimientos técnicos.',
      },
      {
        question: '¿Integras sistemas de reservas como TheFork o Cover Manager?',
        answer: 'Sí. Si ya usas una plataforma, la integramos. Si no tienes ninguna, te asesoro.',
      },
      {
        question: '¿Qué pasa con mi ficha de Google?',
        answer:
          'La web y tu Google Business Profile se trabajan de forma coordinada para aparecer en búsquedas locales.',
      },
      {
        question: '¿Cuánto cuesta?',
        answer: 'Desde 600€. Siempre presupuesto cerrado antes de empezar.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu restaurante?',
      text: 'Cuéntame cómo es tu negocio y qué necesitas. En menos de 24 horas te respondo con una propuesta concreta.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Web para restaurantes y hostelería · RimoByte',
      description:
        'Webs para restaurantes, bares y hostelería que quieren llenar mesas y aparecer en Google. Carta online, reservas y Google Maps integrados.',
    },
  },
  {
    slug: 'web-para-peluquerias',
    name: 'Web para peluquerías',
    sectorNameShort: 'peluquerías',
    eyebrow: 'WEB PARA PELUQUERÍAS Y ESTÉTICA',
    headline: 'Que tus clientes pidan cita online y te encuentren',
    headlineEm: 'antes que a la competencia.',
    description:
      'Diseño webs para peluquerías, salones de belleza y centros de estética que quieren captar clientes nuevos en Google y facilitar las reservas online.',
    ctaPrimary: 'Quiero mi web para peluquería',
    checks: ['Reservas online', 'Apareces en Google local', 'Tuya desde el primer día'],
    featuresTitle: 'Lo que convierte visitas en citas',
    featuresTitleEm: 'en una web para peluquerías.',
    features: [
      {
        title: 'Reservas online',
        description:
          'Para que tus clientes puedan pedir cita directamente desde la web, a cualquier hora, sin tener que llamar.',
      },
      {
        title: 'Catálogo de servicios y precios',
        description:
          'Claro, visual y fácil de actualizar. Que el cliente sepa exactamente qué ofreces antes de reservar.',
      },
      {
        title: 'Galería de trabajos',
        description:
          'Tus mejores trabajos como carta de presentación. Las fotos convencen más que cualquier descripción.',
      },
      {
        title: 'Presencia en Google local',
        description:
          'Optimizada para aparecer cuando alguien busca "peluquería cerca de mí" o en tu ciudad.',
      },
      {
        title: 'Información de contacto y ubicación',
        description:
          'Horarios, dirección y cómo llegar. Lo básico que cualquier cliente nuevo busca.',
      },
    ],
    relatedCase: {
      slug: 'lucia-nails-art',
      challenge:
        'Lucía no tenía presencia online y dependía del boca a boca para conseguir clientas nuevas.',
      solution: 'Web con SEO local optimizado y diseño que refleja la estética de su centro.',
      result: 'Hoy aparece la primera en Google en su área y tiene',
      resultEm: 'toda la agenda llena.',
      testimonialQuote:
        'Gracias a eso he captado muchísimas clientas y tengo toda la agenda llena.',
      author: 'Lucía Martínez Reinoso',
    },
    faqs: [
      {
        question: '¿Integras sistemas de reservas como Booksy o Planfy?',
        answer:
          'Sí. Si ya usas una plataforma, la integramos. Si no, te asesoro sobre cuál se adapta mejor a tu negocio.',
      },
      {
        question: '¿Puedo actualizar los precios y servicios yo misma?',
        answer: 'Sí. Sin llamarme cada vez que cambias una tarifa.',
      },
      {
        question: '¿Para qué necesito una web si ya tengo Instagram?',
        answer:
          'Instagram es para quienes ya te siguen. Google es para quienes todavía no te conocen y buscan una peluquería en tu zona.',
      },
      {
        question: '¿Cuánto cuesta?',
        answer: 'Desde 600€. Siempre presupuesto cerrado antes de empezar.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de tu negocio?',
      text: 'Cuéntame cómo es tu peluquería o centro de estética y qué necesitas. En menos de 24 horas te respondo.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Web para peluquerías y centros de estética · RimoByte',
      description:
        'Webs para peluquerías y salones de belleza con reservas online y SEO local. Aparece en Google antes que tu competencia. Desde 600€.',
    },
  },
];

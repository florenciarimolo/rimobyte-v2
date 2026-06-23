import { projects, type Project } from './projects';
import type { IconName } from '../components/ui/icons/registry';

export interface SectorFeature {
  title: string;
  description: string;
  /** Etiqueta mono bajo la card (ej. "Carta · autoservicio") */
  tag?: string;
  /** Variante del grid asimétrico */
  span?: 'tall' | 'wide';
  icon?: IconName;
}

export interface SectorPainCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface SectorStat {
  value: string;
  label: string;
  gradient?: boolean;
}

export interface SectorOffer {
  eyebrow: string;
  title: string;
  titleEm: string;
  lede: string;
  features: string[];
  price: string;
  priceNote: string;
  priceDetail: string;
  cta: string;
}

export interface SectorCaseHighlight {
  eyebrow: string;
  title: string;
  titleEm: string;
  description: string;
  stats: SectorStat[];
  quote: string;
  quoteAuthor: string;
  ctaLabel: string;
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
  heroPills?: string[];
  heroStats?: SectorStat[];
  heroSecondaryCta?: { label: string; href: string };
  /** Proyecto para el mockup del hero (project-hero-shot) */
  heroProjectSlug?: string;
  /** Captura móvil del mockup de teléfono en el hero sectorial */
  heroMockupImage?: string;
  heroStrip?: { label: string; tags: string[] };
  painPoints?: {
    eyebrow: string;
    title: string;
    titleEm: string;
    description?: string;
    points?: string[];
    cards?: SectorPainCard[];
  };
  featuresIntro?: string;
  featuresEyebrow?: string;
  featuresTitle?: string;
  featuresTitleEm?: string;
  features: SectorFeature[];
  relatedCase?: SectorCase;
  caseHighlight?: SectorCaseHighlight;
  offer?: SectorOffer;
  faqEyebrow?: string;
  faqTitle?: string;
  faqTitleEm?: string;
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
    headline: 'De invisible en Google a',
    headlineEm: 'agenda llena.',
    description:
      'Webs WordPress para peluquerías, centros de manicura y estética que quieren que sus clientas las encuentren en Google y reserven directamente — sin depender de Instagram, TheBookerCompany ni del boca a boca.',
    ctaPrimary: 'Quiero una web así',
    checks: ['Reservas online', 'Apareces en Google local', 'Tuya desde el primer día'],
    heroPills: ['Web para peluquerías y centros de estética', 'SEO local · Reservas'],
    heroStats: [
      { value: '#1', label: 'Google local conseguido', gradient: true },
      { value: '100%', label: 'Agenda al completo', gradient: true },
      { value: '24/7', label: 'Reservas sin tu intervención', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver caso real', href: '#caso-lucia' },
    heroProjectSlug: 'lucia-nails-art',
    heroMockupImage: '/assets/projects/lucia-nails-art-mobile.webp',
    painPoints: {
      eyebrow: 'Lo que más me cuentan',
      title: 'Si tu peluquería',
      titleEm: 'está en alguno de estos cuatro casos…',
      description:
        '… probablemente estás dejando ingresos sobre la mesa cada semana. Estos son los problemas que más veo en peluquerías, centros de manicura y estética sin web — o con una web que no funciona.',
      cards: [
        {
          icon: 'globe',
          title: 'No apareces en Google',
          description:
            'Cuando alguien busca "manicura + tu zona" sale tu competencia, no tú. Si no estás en los tres primeros resultados, no existes.',
        },
        {
          icon: 'result-chat',
          title: 'Pierdes horas en DMs',
          description:
            'Cada clienta que reserva por WhatsApp o Instagram te roba 5 minutos. Diez clientas al día son casi una hora menos de manicuras.',
        },
        {
          icon: 'result-clock',
          title: 'Olvidos y huecos',
          description:
            'Sin recordatorios automáticos hay no-shows. Sin sistema de reservas en tiempo real, hay huecos que podrían estar vendidos.',
        },
        {
          icon: 'result-trend',
          title: 'Dependes del boca a boca',
          description:
            'Cuando una clienta se muda o cambia de ciudad, pierdes el ingreso. Sin tráfico de descubrimiento, no creces.',
        },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para peluquerías',
    featuresIntro:
      'Cada elemento de la web está afinado para el sector: lo que buscan tus clientas, cómo deciden y cómo reservan. Sin funciones genéricas que no usarías nunca.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo trabajas tú.',
    features: [
      {
        icon: 'globe',
        title: 'SEO local hiperafinado',
        description:
          'Estructura optimizada para "manicura/peluquería + tu ciudad o barrio". Schema LocalBusiness, Google Business Profile y reseñas integradas.',
      },
      {
        icon: 'result-clock',
        title: 'Reservas integradas',
        description:
          'Formulario o sistema de reservas con calendario en tiempo real. Confirmación automática por email y opción de recordatorio.',
      },
      {
        icon: 'result-layers',
        title: 'Galería de trabajos',
        description:
          'Showcase visual con tus mejores manicuras, tratamientos o cortes. Conectada a Instagram para que se actualice sola.',
      },
      {
        icon: 'shopping-bag',
        title: 'Lista de precios clara',
        description:
          'Servicios con duración y precio destacados. Tus clientas saben qué van a pagar antes de reservar — menos dudas, más conversión.',
      },
      {
        icon: 'whatsapp',
        title: 'Click-to-call y WhatsApp',
        description:
          'Botones de llamada y WhatsApp visibles. Tu clienta llama o escribe sin buscar el teléfono — el camino corto convierte.',
      },
      {
        icon: 'result-grid',
        title: 'Mapa y "cómo llegar"',
        description:
          'Tu ubicación integrada con Google Maps. Crítico para SEO local y para que las clientas que vienen desde fuera te encuentren físicamente.',
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
        'Gracias a la web he captado muchísimas clientas nuevas y tengo toda la agenda llena.',
      author: 'Lucía Martínez Reinoso',
    },
    caseHighlight: {
      eyebrow: 'Caso real · Peluquerías',
      title: 'Lucía Nails Art: la web que',
      titleEm: 'llenó su agenda.',
      description:
        'Centro de manicura en Esparreguera. Negocio consolidado pero sin presencia online. Tres meses después del lanzamiento aparecía la primera en Google para sus búsquedas clave y la agenda estaba al 100%.',
      stats: [
        { value: '#1', label: 'Posición Google local', gradient: true },
        { value: '100%', label: 'Ocupación de agenda', gradient: true },
        { value: '0 → 1', label: 'De invisible a referencia', gradient: true },
      ],
      quote:
        'Gracias a la web he captado muchísimas clientas nuevas y tengo toda la agenda llena.',
      quoteAuthor: 'Lucía Martínez · lucianailsart.com',
      ctaLabel: 'Leer el caso completo',
    },
    offer: {
      eyebrow: 'Plan completo · Peluquerías',
      title: 'Todo lo que tu peluquería',
      titleEm: 'necesita online.',
      lede:
        'Una web a medida con SEO local incluido, sistema de reservas y formación para que la manejes tú. Sin permanencia, sin sorpresas.',
      features: [
        'Diseño 100% a medida (sin plantillas)',
        'SEO local optimizado para tu zona',
        'Sistema de reservas integrado',
        'Google Business Profile configurado',
        'Galería conectada a Instagram',
        'Sesión de formación + soporte 30 días',
      ],
      price: '600€',
      priceNote: 'desde · pago único',
      priceDetail:
        'El precio final depende de las páginas que necesites y si integramos sistema de reservas externo (Treatwell, Booksy, etc.). Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'peluquerías y estética.',
    faqs: [
      {
        question: '¿Cuánto tarda en aparecer mi peluquería la primera en Google?',
        answer:
          'Depende de la competencia local. En zonas con poca competencia (pueblo, barrio pequeño) puedes estar en top 3 en 4–8 semanas. En grandes ciudades el SEO local tarda 3–6 meses en consolidarse, aunque desde el día uno empiezas a recibir visitas. Lucía llegó al #1 en su área en menos de 3 meses.',
      },
      {
        question: '¿Necesito un sistema de reservas tipo Treatwell o Booksy?',
        answer:
          'Depende del volumen. Si haces menos de 5 reservas al día, un formulario sencillo en la web es suficiente. Si tienes equipo, calendario complejo o quieres bloqueo de huecos en tiempo real, integro el sistema externo que prefieras — sin que te cobren extra los enlaces a tu web.',
      },
      {
        question: '¿Integras sistemas de reservas como Booksy o Planfy?',
        answer:
          'Sí. Si ya usas una plataforma, la integramos. Si no, te asesoro sobre cuál se adapta mejor a tu negocio.',
      },
      {
        question: '¿Y si ya uso Instagram para conseguir clientas?',
        answer:
          'Instagram es complemento, no sustituto. Te seguirá funcionando para fidelizar a las que ya te conocen, pero Google es donde te descubren las nuevas. La web conecta los dos canales: tus posts de Instagram se muestran en la web, y desde la web ofrezco la reserva directa que Instagram no te permite hacer bien.',
      },
      {
        question: '¿Puedo cambiar precios y fotos yo misma después?',
        answer:
          'Sí, y de hecho insisto en que lo hagas. Te dejo una sesión de formación + manual escrito. Los precios, las fotos y los textos los actualizas tú sin tocar código y sin pedirme permiso.',
      },
      {
        question: '¿Trabajáis solo en España o también para peluquerías de otros países?',
        answer:
          'Atiendo todo el territorio español. Para fuera (Latam, otros países europeos) lo valoro caso a caso. La diferencia horaria y el conocimiento del SEO local marcan la diferencia, así que prefiero hablarlo antes.',
      },
    ],
    ctaFinal: {
      title: '¿Llenamos tu agenda',
      titleEm: 'también?',
      text: 'Cuéntame brevemente cómo es tu peluquería o centro de estética. Te respondo personalmente con una propuesta concreta — no una plantilla.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para peluquerías y centros de estética · RimoByte',
      description:
        'Webs WordPress a medida para peluquerías, centros de manicura y estética. SEO local para aparecer #1 en Google y formulario de reservas integrado. Desde 600€.',
    },
  },
];

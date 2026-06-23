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

export interface SectorParagraph {
  emphasis?: string;
  text: string;
}

export interface SectorCredential {
  label: string;
  text: string;
}

export interface SectorConceptMiniCard {
  icon: 'clock' | 'map' | 'phone';
  title: string;
  subtitle: string;
}

export interface SectorConcept {
  id?: string;
  eyebrow: string;
  title: string;
  titleEm: string;
  intro: string;
  url: string;
  browserHeadline: string;
  browserHeadlineEm: string;
  browserDescription: string;
  browserPrimaryCta: string;
  browserSecondaryCta: string;
  miniCards: SectorConceptMiniCard[];
}

export interface SectorRelatedProjects {
  eyebrow: string;
  title: string;
  titleEm: string;
  intro: string;
  slugs: string[];
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
  /** Mockup del hero: teléfono (por defecto) o carta de menú */
  heroMockupType?: 'phone' | 'menu';
  heroStrip?: { label: string; tags: string[] };
  painPoints?: {
    eyebrow: string;
    title: string;
    titleEm: string;
    description?: string;
    points?: string[];
    cards?: SectorPainCard[];
    paragraphs?: SectorParagraph[];
    credentialsTitle?: string;
    credentials?: SectorCredential[];
  };
  concept?: SectorConcept;
  relatedProjects?: SectorRelatedProjects;
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
    headline: 'Carta clara, mesas llenas,',
    headlineEm: 'cero comisiones.',
    description:
      'Webs para restaurantes y bares que quieren mostrar su carta como toca, recibir reservas directas y posicionarse en Google sin pagar comisión por cada cliente que entra por la puerta.',
    ctaPrimary: 'Cuéntame tu local',
    checks: ['Carta digital', 'Reservas directas', 'SEO local'],
    heroPills: ['Web para restaurantes y bares', 'Carta digital · Reservas'],
    heroMockupType: 'menu',
    heroSecondaryCta: { label: 'Ver concepto visual', href: '#concepto' },
    painPoints: {
      eyebrow: 'Lo que más veo en hostelería',
      title: 'Tu web tiene que resolver',
      titleEm: 'tres problemas a la vez.',
      paragraphs: [
        {
          text: 'Hacer una web de restaurante no es solo cuestión de mostrar bonitas fotos de platos. El comensal moderno decide en 30 segundos en el móvil — y si no encuentra lo que busca, se va a la competencia que sale a continuación en Google.',
        },
        {
          emphasis: 'El primer problema es la visibilidad:',
          text: ' que te encuentren cuando alguien busca "dónde comer cerca de mí" en su zona y hora exacta. El segundo es la decisión: una vez te encuentran, que vean carta, horario y cómo llegar sin tener que rebuscar. El tercero es la reserva: convertir el interés en una mesa confirmada antes de que cambien de idea.',
        },
        {
          emphasis: 'Estos tres problemas se resuelven con la misma ingeniería',
          text: ' que he aplicado en proyectos donde el SEO local, la velocidad y la integración de reservas eran críticos.',
        },
      ],
      credentialsTitle: 'Lo que tu web tendrá',
      credentials: [
        {
          label: 'SEO local hiperafinado.',
          text: 'Schema Restaurant, Google Business Profile y palabras clave de tu zona.',
        },
        {
          label: 'Integraciones limpias.',
          text: 'Covermanager, TheFork, Google Reserve o sistema propio — el que mejor te encaje.',
        },
        {
          label: 'Velocidad técnica garantizada.',
          text: 'Lighthouse 95+, fotos optimizadas y carga inferior a 1.5 segundos.',
        },
        {
          label: 'Cero plataformas atadas.',
          text: 'Tu web es tuya — sin comisiones por reserva ni tarifas encubiertas.',
        },
        {
          label: 'Soporte humano.',
          text: 'Hablas conmigo, no con un ticket. Diez reseñas de Google con 5/5 lo respaldan.',
        },
      ],
    },
    concept: {
      id: 'concepto',
      eyebrow: 'Cómo se vería tu web',
      title: 'Concepto visual para',
      titleEm: 'tu restaurante.',
      intro:
        'Mockup de cómo construiría la home: un primer pantallazo claro con CTA de reserva, carta organizada por secciones y los tres elementos críticos para hostelería (horario, mapa, llamada directa) siempre visibles.',
      url: 'turestaurante.es',
      browserHeadline: 'Cocina',
      browserHeadlineEm: 'de casa',
      browserDescription:
        'Producto de mercado, recetas tradicionales y un equipo que lleva veinte años haciendo lo que ama. Reserva tu mesa.',
      browserPrimaryCta: 'Reservar mesa',
      browserSecondaryCta: 'Ver carta',
      miniCards: [
        { icon: 'clock', title: 'Abierto ahora', subtitle: 'Cierra a las 23:30' },
        { icon: 'map', title: 'Calle Mayor, 14', subtitle: 'Cómo llegar →' },
        { icon: 'phone', title: '91 123 45 67', subtitle: 'Llamar ahora' },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para hostelería',
    featuresIntro:
      'Cada elemento de la web está afinado para el sector: lo que el comensal necesita ver antes de decidir, cómo llega físicamente y cómo reserva sin pasar por terceros.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo funciona tu sala.',
    features: [
      {
        icon: 'shopping-bag',
        title: 'Carta digital editable',
        description:
          'Carta organizada por secciones que tú actualizas en 2 minutos. Cambias precios, añades platos del día o marcas agotados sin tocar código.',
      },
      {
        icon: 'result-clock',
        title: 'Reservas directas',
        description:
          'Sistema integrado con confirmación automática. Sin comisiones por reserva (a diferencia de TheFork o Covermanager) — la mesa va directa a tu correo y agenda.',
      },
      {
        icon: 'globe',
        title: 'SEO geolocalizado',
        description:
          'Schema Restaurant + LocalBusiness, integración con Google Maps y Google Business Profile. Apareces cuando buscan "restaurante + tu zona" o "comer cerca de mí".',
      },
      {
        icon: 'result-pulse',
        title: 'Horarios en tiempo real',
        description:
          'Tu web sabe si está abierto o cerrado y lo muestra al visitante. Crítico para el comensal de última hora que decide en el móvil.',
      },
      {
        icon: 'result-layers',
        title: 'Galería de fotos cuidada',
        description:
          'Tus platos, el local y el equipo en alta calidad. Conexión con Instagram para que la galería se alimente sola con tus posts nuevos.',
      },
      {
        icon: 'whatsapp',
        title: 'Click-to-call y mapa',
        description:
          'Botón de llamada visible en móvil y mapa con un clic para "Cómo llegar". Los dos elementos que más se pulsan en webs de restaurantes.',
      },
    ],
    relatedProjects: {
      eyebrow: 'Mi trabajo en negocios locales',
      title: 'La ingeniería detrás de tu web,',
      titleEm: 'aplicada y probada.',
      intro:
        'Webs donde el SEO local, la velocidad y las integraciones con sistemas externos eran críticas — las mismas piezas que sostienen una web de restaurante que funciona de verdad.',
      slugs: ['lucia-nails-art', 'rock-zone-camp'],
    },
    offer: {
      eyebrow: 'Plan completo · Hostelería',
      title: 'Todo lo que tu restaurante',
      titleEm: 'necesita online.',
      lede:
        'Una web a medida con carta digital, reservas directas y SEO local incluido. Plazo cerrado, precio cerrado y formación para que la gestiones tú después. Sin permanencia, sin comisiones por mesa reservada.',
      features: [
        'Diseño 100% a medida con dos direcciones a elegir',
        'Carta digital editable por temporada en 2 minutos',
        'Sistema de reservas integrado sin comisiones por mesa',
        'SEO local + Google Business Profile configurados',
        'Formación + 30 días de soporte tras la entrega',
      ],
      price: '600€',
      priceNote: 'desde · pago único, sin permanencia',
      priceDetail:
        'El precio final depende del número de páginas y de si integramos sistema de reservas externo (Covermanager, TheFork, Google Reserve). Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'restaurantes y bares.',
    faqs: [
      {
        question: '¿Cuánto tarda en lanzarse una web de restaurante?',
        answer:
          'Entre 3 y 5 semanas desde que tengo el contenido base: textos, fotos, carta y datos del local. El cuello de botella suele ser tu disponibilidad para revisar avances y elegir entre las dos direcciones de diseño que te propongo al inicio. Si vas con prisa por una apertura o un cambio de temporada, podemos comprimir plazos hablándolo de antemano.',
      },
      {
        question: '¿Cómo funcionan las reservas sin pagar comisiones como en TheFork?',
        answer:
          'El sistema integrado en la web envía las reservas directas a tu email o a un panel de gestión. No hay un intermediario que cobre 2€ por cada cliente que reserva. Si prefieres usar Covermanager o un sistema externo (porque ya lo tienes), también lo conecto — siempre eligiendo el más barato para ti.',
      },
      {
        question: '¿Puedo cambiar la carta yo misma cada temporada?',
        answer:
          'Sí, es uno de los puntos clave. La carta digital es editable con un panel que sirve igual a quien sabe de tecnología que a quien no. Cambias precios, añades platos del día o marcas un plato como "no disponible" en menos de 1 minuto.',
      },
      {
        question: '¿Y si tengo varias sedes (un bar y un restaurante, dos locales)?',
        answer:
          'Lo gestionamos como una sola web con páginas separadas por sede, cada una con su SEO local, sus horarios y su sistema de reservas. Más eficiente que mantener dos webs por separado, y mejor para Google.',
      },
      {
        question: '¿Os encargáis también de las fotos del local y los platos?',
        answer:
          'Yo no soy fotógrafa, pero te recomiendo profesionales serios de food photography si los necesitas. Sin buenas fotos, la web no convierte — es el componente más importante después del SEO. Coordino la sesión si lo prefieres.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu local?',
      text: 'Cuéntame qué tipo de restaurante o bar tienes y qué necesitas resolver. Te respondo personalmente con una propuesta concreta, plazos cerrados y precio cerrado antes de empezar.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para restaurantes y bares · RimoByte',
      description:
        'Webs WordPress a medida para restaurantes y bares. Carta digital, reservas integradas, SEO geolocalizado. Desde 600€, sin permanencia ni comisiones por reserva.',
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

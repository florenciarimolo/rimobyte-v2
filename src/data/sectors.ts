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
  sectionId?: string;
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
  /** Mockup del hero: teléfono (por defecto), carta de menú o especialidades (psicología) */
  heroMockupType?: 'phone' | 'menu' | 'practice' | 'listings';
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
  {
    slug: 'web-para-asesorias',
    name: 'Web para asesorías',
    sectorNameShort: 'asesorías',
    eyebrow: 'WEB PARA ASESORÍAS Y GESTORÍAS',
    headline: 'Confianza que se ve',
    headlineEm: 'a primera vista.',
    description:
      'Webs WordPress para asesorías fiscales, laborales y gestorías que quieren transmitir solvencia técnica, aparecer en Google cuando buscan asesor en su zona y captar autónomos y pymes nuevos sin depender solo del boca a boca.',
    ctaPrimary: 'Quiero una web así',
    checks: ['SEO local', 'Multiidioma', 'Tuya desde el primer día'],
    heroPills: ['Web para asesorías y gestorías', 'SEO local · Multiidioma'],
    heroStats: [
      { value: '3', label: 'Idiomas en producción', gradient: true },
      { value: '4', label: 'Áreas de servicio integradas', gradient: true },
      { value: 'RGPD', label: 'Cumplimiento de origen', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver caso real', href: '#caso-vilalancis' },
    heroProjectSlug: 'vila-i-lancis',
    heroMockupImage: '/assets/projects/vila-lancis-mobile.webp',
    painPoints: {
      eyebrow: 'Lo que más me cuentan',
      title: 'Si tu asesoría',
      titleEm: 'se reconoce en alguno de estos cuatro casos…',
      description:
        '… probablemente estás perdiendo clientes potenciales antes de que sepan siquiera que existes. Estos son los problemas que más veo en asesorías y gestorías sin web — o con una web que no transmite lo que el cliente busca antes de descolgar el teléfono.',
      cards: [
        {
          icon: 'globe',
          title: 'Invisible en Google',
          description:
            'El autónomo que busca "asesoría fiscal + tu ciudad" no te encuentra. Las grandes plataformas online (Declarando, Holded) copan los primeros resultados.',
        },
        {
          icon: 'result-layers',
          title: 'Web genérica de plantilla',
          description:
            'Si tu web parece la de cualquier otro, el cliente la equipara con cualquier otra. Y el precio se vuelve el único criterio — terreno donde no quieres competir.',
        },
        {
          icon: 'result-chat',
          title: 'Sin contenido que filtre',
          description:
            'Recibes consultas de gente que no es tu cliente ideal: micronegocios sin facturación, dudas puntuales no remuneradas. Sin contenido claro, no filtras.',
        },
        {
          icon: 'result-trend',
          title: 'Dependencia de la recomendación',
          description:
            'Si tu único canal de captación es el boca a boca, tu crecimiento es lineal. La web bien hecha convierte tu reputación local en visibilidad multiplicada.',
        },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para asesorías',
    featuresIntro:
      'Cada elemento de la web está afinado para el sector: el autónomo o gerente que decide después de comparar tres asesorías en Google, la confianza que se transmite antes del primer correo y la estructura de servicios que filtra al cliente correcto.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo capta y trabaja una asesoría.',
    features: [
      {
        icon: 'globe',
        title: 'SEO local geográfico',
        description:
          'Estructura optimizada para "asesoría/gestoría + ciudad o comarca". Schema LocalBusiness, Google Business Profile y landings por localidad si trabajas varias zonas.',
      },
      {
        icon: 'globe',
        title: 'Multiidioma nativo',
        description:
          'ES, CAT, EN o los que necesites — gestionados con Polylang o WPML. Pensado para zonas bilingües, expatriados o empresas internacionales como cliente.',
      },
      {
        icon: 'result-layers',
        title: 'Landings por área de servicio',
        description:
          'Una página específica para Fiscal, Laboral, Contable y Mercantil — cada una con su SEO propio. Apareces para búsquedas mucho más concretas que "asesoría".',
      },
      {
        icon: 'result-grid',
        title: 'Presentación del equipo',
        description:
          'Sección "Sobre nosotros" con foto, biografía y especialización de cada asesor. La confianza profesional necesita cara — ningún cliente firma con un logo anónimo.',
      },
      {
        icon: 'mail',
        title: 'Formulario de consulta gratuita',
        description:
          'Captador inteligente con campos clave (tipo de negocio, facturación aproximada, urgencia). Llega a tu correo segmentado para que respondas solo a los que encajan.',
      },
      {
        icon: 'result-lock',
        title: 'Cumplimiento RGPD/LSSI',
        description:
          'Aviso legal, política de privacidad, política de cookies y banner de consentimiento configurados desde el día uno. Lo que la AEPD pide a una empresa que asesora a otras.',
      },
    ],
    relatedCase: {
      slug: 'vila-i-lancis',
      challenge:
        'Trabajaban con una agencia que no respondía y no tenían acceso a su propio WordPress.',
      solution: 'Rediseño completo con web limpia, multiidioma y SEO local por ciudad.',
      result: 'Una web seria que transmite confianza y que por primera vez es',
      resultEm: 'realmente suya.',
      testimonialQuote:
        'Queríamos una web seria, clara y en los tres idiomas que hablan nuestros clientes. Flor entendió a la primera que vendíamos confianza, no servicios sueltos.',
      author: 'Vila & Lancis',
    },
    caseHighlight: {
      sectionId: 'caso-vilalancis',
      eyebrow: 'Caso real · Asesorías',
      title: 'Vila & Lancis: la web de la',
      titleEm: 'asesoría de La Roca.',
      description:
        'Asesoría fiscal, laboral y contable en La Roca del Vallès con servicio a domicilio en varias localidades de Barcelona. Su web combina presentación profesional del equipo, estructura clara de servicios por área y soporte multiidioma para llegar al cliente catalanoparlante y al expatriado de la zona.',
      stats: [
        { value: '3', label: 'Idiomas (ES · CAT · EN)', gradient: true },
        { value: '4', label: 'Áreas con landing propia', gradient: true },
        { value: '+', label: 'Varias localidades atendidas', gradient: true },
      ],
      quote:
        'Queríamos una web seria, clara y en los tres idiomas que hablan nuestros clientes. Flor entendió a la primera que vendíamos confianza, no servicios sueltos.',
      quoteAuthor: 'Vila & Lancis · vilalancis.com',
      ctaLabel: 'Leer el caso completo',
    },
    offer: {
      eyebrow: 'Plan completo · Asesorías',
      title: 'Todo lo que tu asesoría',
      titleEm: 'necesita online.',
      lede:
        'Una web a medida con SEO local, soporte multiidioma y formulario inteligente de captación. Diseño que transmite la solvencia que tus clientes esperan antes de firmar. Sin permanencia.',
      features: [
        'Diseño 100% a medida (sin plantillas)',
        'Landings por área de servicio (fiscal, laboral, contable…)',
        'Multiidioma (ES + CAT y/o EN según necesites)',
        'SEO local y Google Business Profile',
        'Formulario de consulta gratuita segmentado',
        'Avisos legales, RGPD y cookies configurados',
        'Sesión de formación + soporte 30 días',
      ],
      price: '600€',
      priceNote: 'desde · pago único',
      priceDetail:
        'El precio final depende del número de idiomas, landings por área y si añadimos área cliente privada. Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'asesorías y gestorías.',
    faqs: [
      {
        question: '¿Necesito la web en catalán o inglés además de en español?',
        answer:
          'Depende de tu zona y tu cliente objetivo. Si estás en Catalunya, Baleares o Valencia, tener la versión en catalán/valenciano abre mucho mercado local — el cliente medio busca y firma en su idioma. Si trabajas con expatriados, empresas internacionales o tienes plan de captación fuera del territorio, EN suma. En Vila & Lancis lanzamos las tres versiones (ES/CAT/EN) precisamente por eso. Lo definimos antes de empezar el proyecto.',
      },
      {
        question: '¿Cómo me ayuda una web a captar autónomos y pymes nuevos?',
        answer:
          'De dos formas. Primero, SEO local: cuando alguien busca "asesoría fiscal + tu ciudad" o "gestoría autónomos + comarca", apareces. Segundo, conversión: una vez te encuentran, la web transmite el nivel profesional adecuado — equipo presentado, áreas de servicio claras, casos o testimonios — para que te elijan a ti y no a la asesoría online genérica. Sin esos dos pilares, dependes solo del boca a boca.',
      },
      {
        question: '¿Hace falta tener blog de actualidad fiscal y laboral?',
        answer:
          'No es obligatorio, pero ayuda mucho al SEO si lo mantienes. Un par de artículos al mes sobre "renta 2026", "modelo 130", "alta de autónomo en…" te posicionan para búsquedas concretas que tu cliente potencial hace. Si no tienes tiempo para escribir, lo dejamos preparado para activarlo cuando puedas — sin penalización.',
      },
      {
        question: '¿Cumple la web con RGPD y la normativa de protección de datos?',
        answer:
          'Sí, y es uno de los puntos que más reviso en este sector. Aviso legal, política de privacidad, política de cookies, banner de consentimiento configurable y formularios con doble opt-in donde aplique. Una asesoría que falla en esto pierde credibilidad — porque es exactamente lo que asesora a sus clientes.',
      },
      {
        question: '¿Se puede añadir un área cliente privada después?',
        answer:
          'Sí. Si más adelante quieres que tus clientes suban documentos, descarguen sus declaraciones o vean el estado de sus gestiones, lo integramos como ampliación. Lo más habitual: empezamos con la web informativa + captación, y al año añadimos el área cliente cuando ya tienes claro qué procesos quieres digitalizar.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu asesoría?',
      text: 'Cuéntame brevemente cómo es tu asesoría o gestoría, dónde estás y qué tipo de cliente quieres captar. Te respondo personalmente con una propuesta concreta — no una plantilla.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para asesorías y gestorías · RimoByte',
      description:
        'Webs WordPress a medida para asesorías y gestorías. SEO local, multiidioma y diseño profesional que transmite confianza. Desde 600€, sin permanencia.',
    },
  },
  {
    slug: 'web-para-entrenadores-personales',
    name: 'Web para entrenadores personales',
    sectorNameShort: 'entrenadores personales',
    eyebrow: 'WEB PARA ENTRENADORES PERSONALES',
    headline: 'De seguidor de Instagram a',
    headlineEm: 'cliente que paga.',
    description:
      'Webs y landings para entrenadores personales que quieren convertir su audiencia en clientes que pagan — con pasarela Stripe integrada, programa enchufado a su app de seguimiento y ventas funcionando 24/7 sin tener que perseguir Bizums.',
    ctaPrimary: 'Quiero una web así',
    checks: ['Stripe integrado', 'Venta 24/7', 'Tuya desde el primer día'],
    heroPills: ['Web para entrenadores personales', 'Stripe · Programas online'],
    heroStats: [
      { value: '+700', label: 'Clientes vendidos online', gradient: true },
      { value: '24/7', label: 'Venta automatizada', gradient: true },
      { value: 'Stripe', label: 'Pasarela integrada', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver caso real', href: '#caso-reset7' },
    heroProjectSlug: 'juancar-garma-reset7',
    heroMockupImage: '/assets/projects/reset7-mobile.webp',
    painPoints: {
      eyebrow: 'Lo que más me cuentan',
      title: 'Si como entrenador',
      titleEm: 'te suena alguno de estos cuatro casos…',
      description:
        '… probablemente estás dejando ventas sobre la mesa cada mes. Estos son los problemas que más veo en entrenadores personales que tienen audiencia pero no consiguen monetizarla bien — o que la cobranza les come horas que deberían estar entrenando.',
      cards: [
        {
          icon: 'result-trend',
          title: 'Audiencia que no compra',
          description:
            'Miles de seguidores en Instagram, pero cuando lanzas un programa nadie pasa por caja. Te falta el sitio donde explicarlo a fondo y cobrar con un clic.',
        },
        {
          icon: 'shopping-bag',
          title: 'Cobros por Bizum y caos',
          description:
            'Persigues pagos, confirmas por WhatsApp, anotas en Excel quién pagó. Cada nuevo cliente te roba 20 minutos antes incluso de empezar a entrenarlo.',
        },
        {
          icon: 'result-clock',
          title: 'Solo facturas mientras entrenas',
          description:
            'Tus ingresos están atados a tus horas. Sin un producto digital empaquetado, no puedes crecer sin clonarte — y la energía es finita.',
        },
        {
          icon: 'globe',
          title: 'Invisible fuera de Instagram',
          description:
            'Si alguien busca "entrenador personal + tu ciudad" o "perder peso en casa programa", no apareces. Solo te encuentran quienes ya te siguen.',
        },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para entrenadores',
    featuresIntro:
      'Cada elemento está afinado para el sector: el seguidor de Instagram que decide en 60 segundos, el programa que necesita explicar bien para venderse y la integración técnica que conecta venta y app de seguimiento sin que tú toques nada.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo vendes tú.',
    features: [
      {
        icon: 'shopping-bag',
        title: 'Pasarela Stripe integrada',
        description:
          'Tarjeta, Apple Pay, Google Pay y Bizum. El cliente paga en un clic, recibe la factura automáticamente y tú no tocas un Excel nunca más.',
      },
      {
        icon: 'result-activity',
        title: 'Landing de venta optimizada',
        description:
          'Página dedicada a cada programa con copy de conversión, antes/después, testimonios y CTA repetido. Hecha para que entren desde Instagram y salgan habiendo comprado.',
      },
      {
        icon: 'wrench',
        title: 'Conexión con tu app',
        description:
          'Integración con Harbiz, Trainerize, TrueCoach o la app que uses. El cliente paga en la web y entra automáticamente con sus credenciales — sin que tú lo metas a mano.',
      },
      {
        icon: 'result-clock',
        title: 'Agenda y llamadas (Calendly)',
        description:
          'Para el cliente que prefiere hablar antes de comprar — sesión gratuita reservable desde la propia web. Integración con Calendly o el sistema de citas que prefieras.',
      },
      {
        icon: 'result-grid',
        title: 'Sección antes/después',
        description:
          'Galería de transformaciones reales con consentimiento de los clientes. Es lo que más convierte en este sector — más que cualquier copy o promesa.',
      },
      {
        icon: 'globe',
        title: 'SEO de programa y zona',
        description:
          'Optimizado para búsquedas tipo "entrenador personal + ciudad", "programa pérdida de grasa online" o "rutina en casa sin material". Te encuentran quienes aún no te siguen.',
      },
    ],
    relatedCase: {
      slug: 'juancar-garma-reset7',
      challenge:
        'Juancar tenía un programa con resultados reales pero sin una landing que lo comunicara y cobrara sola.',
      solution:
        'Landing de venta con Stripe, conexión a la app de seguimiento y copy centrado en conversión.',
      result: 'Un programa que se vende solo mientras él entrena — más de',
      resultEm: '700 clientes online.',
      testimonialQuote:
        'Quería que la persona entrase, viese el programa, pagase y empezase en la app sin que yo tuviera que tocar nada. La landing lo hace exactamente así — yo me dedico a entrenar.',
      author: 'Juancar Garma',
    },
    caseHighlight: {
      sectionId: 'caso-reset7',
      eyebrow: 'Caso real · Entrenadores',
      title: 'RESET7: el programa que',
      titleEm: 'se vende solo.',
      description:
        'Juancar Garma, entrenador personal con audiencia activa, necesitaba una landing dedicada para su programa de 4 semanas de pérdida de grasa. Diseñamos una página de venta optimizada para conversión con Stripe integrado, conexión directa con la app de seguimiento y testimonios reales con antes/después. Más de 700 personas la han usado para empezar.',
      stats: [
        { value: '+700', label: 'Clientes que han comprado', gradient: true },
        { value: 'Hoy', label: 'Acceso inmediato al pagar', gradient: true },
        { value: '0', label: 'Fricción en el pago', gradient: true },
      ],
      quote:
        'Quería que la persona entrase, viese el programa, pagase y empezase en la app sin que yo tuviera que tocar nada. La landing lo hace exactamente así — yo me dedico a entrenar.',
      quoteAuthor: 'Juancar Garma · juancargarma.com/reset7',
      ctaLabel: 'Leer el caso completo',
    },
    offer: {
      eyebrow: 'Plan completo · Entrenadores',
      title: 'Todo lo que tu negocio',
      titleEm: 'de entrenamiento necesita.',
      lede:
        'Una web a medida con landing de venta, pasarela Stripe y conexión con tu app de seguimiento. Pensada para vender programas online mientras tú entrenas o duermes. Sin permanencia.',
      features: [
        'Diseño 100% a medida (sin plantillas)',
        'Landing dedicada por programa o producto',
        'Pasarela Stripe (tarjeta, Apple/Google Pay, Bizum)',
        'Integración con tu app (Harbiz, Trainerize, TrueCoach…)',
        'Sección antes/después y testimonios',
        'Integración con Calendly + email marketing',
        'Sesión de formación + soporte 30 días',
      ],
      price: '600€',
      priceNote: 'desde · pago único',
      priceDetail:
        'El precio final depende del número de programas/landings, si conectamos app de seguimiento externa y si añadimos área cliente. Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'entrenadores personales.',
    faqs: [
      {
        question: '¿Funciona si vendo solo entrenamiento presencial?',
        answer:
          'Sí, y el enfoque cambia ligeramente: priorizamos SEO local ("entrenador personal + tu ciudad"), formulario de contacto para sesión gratuita y Calendly para que reserven la valoración inicial directamente. La pasarela Stripe la integramos igual para cobrar packs de sesiones de una sentada en lugar de un Bizum por mes.',
      },
      {
        question: '¿Qué comisión cobra Stripe por cada venta?',
        answer:
          'Stripe cobra 1,4% + 0,25€ por transacción europea (1,9% para tarjetas no europeas). Sin cuotas mensuales ni permanencia. Para un programa de 30€, esto son unos 0,67€ — mucho más barato que cualquier alternativa de la competencia, y sin perder tiempo conciliando Bizums.',
      },
      {
        question: '¿Puedo conectar mi app de seguimiento actual?',
        answer:
          'Sí. Trabajo habitualmente con Harbiz (la que usa Juancar en RESET7), Trainerize y TrueCoach, pero conecto cualquier app que tenga API o webhook. El flujo típico: cliente paga en la web → recibe email con sus credenciales → entra a la app con su plan ya cargado. Todo sin que tú toques nada.',
      },
      {
        question: '¿Necesito tener antes/después o testimonios para que funcione?',
        answer:
          'Ayudan muchísimo — son el motor de conversión nº1 en este sector. Si aún no los tienes, podemos lanzar sin ellos y diseñar la sección preparada para añadirlos cuando consigas los primeros. Importante: siempre con consentimiento explícito por escrito del cliente (RGPD), y te ayudo con el formulario de cesión de imagen.',
      },
      {
        question: '¿Se pueden vender varios programas a distintos precios?',
        answer:
          'Sí, sin límite. Cada programa puede tener su propia landing (como hace RESET7 dentro de juancargarma.com) con su precio, su descripción y su flujo de checkout. También funcionan modelos de suscripción mensual, packs y upgrades — lo definimos según tu modelo de negocio.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu programa?',
      text: 'Cuéntame brevemente qué programas vendes (o quieres vender), qué app usas para el seguimiento y dónde tienes tu audiencia. Te respondo personalmente con una propuesta concreta — no una plantilla.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para entrenadores personales · RimoByte',
      description:
        'Webs y landings para entrenadores personales con pasarela de pago integrada. Vende tus programas online 24/7 con Stripe. Desde 600€, sin permanencia.',
    },
  },
  {
    slug: 'web-para-cursos',
    name: 'Web para cursos',
    sectorNameShort: 'cursos y formaciones',
    eyebrow: 'WEB PARA CURSOS Y FORMACIONES',
    headline: 'Tu curso, tu marca,',
    headlineEm: 'tu plataforma.',
    description:
      'Plataformas WordPress + LearnDash para creadores de cursos, formadores y expertos que quieren vender su conocimiento bajo su propio dominio — con pasarela doble PayPal y Stripe, newsletter conectada y sin pagar comisiones a Hotmart, Teachable ni Kajabi.',
    ctaPrimary: 'Quiero una plataforma así',
    checks: ['LearnDash integrado', 'PayPal + Stripe', 'Tuya desde el primer día'],
    heroPills: ['Web para cursos y formaciones', 'LearnDash · Stripe · MailerLite'],
    heroStats: [
      { value: 'LMS', label: 'Plataforma profesional', gradient: true },
      { value: '2', label: 'Pasarelas integradas', gradient: true },
      { value: '0%', label: 'Comisión a terceros', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver caso real', href: '#caso-supercapaces' },
    heroProjectSlug: 'supercapaces',
    heroMockupImage: '/assets/projects/supercapaces-mobile.webp',
    painPoints: {
      eyebrow: 'Lo que más me cuentan',
      title: 'Si tu curso',
      titleEm: 'está en alguno de estos cuatro casos…',
      description:
        '… probablemente estás dejando dinero, alumnos y autoridad en manos de terceros. Estos son los problemas que más veo en creadores de cursos que aún no tienen una plataforma propia — o que tienen una que les frena en lugar de ayudarles a crecer.',
      cards: [
        {
          icon: 'shopping-bag',
          title: 'Comisiones que te ahogan',
          description:
            'Hotmart, Kajabi o Teachable se quedan entre el 5% y el 10% de cada venta. En un año con cien alumnos a 200€, son miles de euros que regalas.',
        },
        {
          icon: 'result-grid',
          title: 'La audiencia no es tuya',
          description:
            'En plataformas externas, los emails de tus alumnos los tienen ellos. Si mañana cambian condiciones o te cierran cuenta, te quedas sin tu negocio.',
        },
        {
          icon: 'mail',
          title: 'Sin lead magnet, sin embudo',
          description:
            'El visitante que aún no compra se va sin dejar email. Sin un "regalo" gratuito conectado a tu newsletter, tiras al cubo el 95% del tráfico.',
        },
        {
          icon: 'result-activity',
          title: 'Cero datos del alumno',
          description:
            'No sabes quién acaba el curso, quién abandona en el módulo 2 ni qué lecciones se ven más. Sin métricas, no mejoras tu producto ni recuperas a quien se queda a medias.',
        },
      ],
    },
    featuresEyebrow: 'Qué incluye una plataforma de cursos',
    featuresIntro:
      'Cada elemento está afinado para creadores de formación: el visitante que descubre tu curso desde Google, el alumno potencial que necesita un "primer bocado" antes de pagar, y el alumno ya inscrito al que tienes que llevar de la mano hasta el final del programa.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo vendes y entregas tu curso.',
    features: [
      {
        icon: 'result-layers',
        title: 'LMS profesional (LearnDash)',
        description:
          'Estructura por cursos, módulos y lecciones. Vídeo, PDF, audio, quizzes y certificados. Lo mismo que usan Tony Robbins o Stanford, montado bajo tu dominio.',
      },
      {
        icon: 'shopping-bag',
        title: 'Doble pasarela: Stripe + PayPal',
        description:
          'El alumno paga con la que prefiera. Stripe para tarjeta, Apple/Google Pay y Bizum; PayPal para quienes desconfían de meter la tarjeta. Más opciones, más ventas.',
      },
      {
        icon: 'mail',
        title: 'Lead magnet + newsletter',
        description:
          'Página de regalo con taller, ebook o serie de vídeos gratuitos. Captura email y lo conecta automáticamente con MailerLite, ActiveCampaign o tu plataforma de email.',
      },
      {
        icon: 'result-clock',
        title: 'Drip content y progreso',
        description:
          'Contenido liberado por días o semanas para evitar abandono. Cada alumno tiene su barra de progreso, módulos completados y certificado al terminar.',
      },
      {
        icon: 'result-grid',
        title: 'Área cliente con login',
        description:
          'Cada alumno entra a su panel privado con sus cursos comprados, su progreso, sus descargas y soporte. Acceso de por vida o por suscripción, tú decides.',
      },
      {
        icon: 'globe',
        title: 'SEO de búsqueda formativa',
        description:
          'Optimizado para búsquedas tipo "curso de [tu temática] online", "formación para [perfil]" o "[problema] aprender". Te descubren quienes aún no te conocen — el motor del crecimiento orgánico.',
      },
    ],
    relatedCase: {
      slug: 'supercapaces',
      challenge:
        'Carlos tenía una web a medias y no sabía gestionar membresías ni automatizaciones de email para sus alumnos.',
      solution:
        'Plataforma SuperCapaces con LearnDash, doble pasarela y MailerLite conectado al lead magnet.',
      result: 'Una plataforma con identidad propia que el cliente gestiona solo y donde',
      resultEm: 'el alumno paga y empieza sin intermediarios.',
      testimonialQuote:
        'Necesitaba un sitio donde Proyecto Lucía viviera con su propia identidad y donde el alumno entrara, pagara y empezara el curso sin que ninguna plataforma intermediaria se quedara con mi audiencia ni con mi margen.',
      author: 'Carlos Pons',
    },
    caseHighlight: {
      sectionId: 'caso-supercapaces',
      eyebrow: 'Caso real · Cursos',
      title: 'SuperCapaces: la plataforma de',
      titleEm: 'Proyecto Lucía.',
      description:
        'Carlos Pons, creador del curso para padres de hijos con discapacidad intelectual o autismo, necesitaba una plataforma propia con identidad, no una landing colgada de Hotmart. Montamos SuperCapaces con LearnDash como LMS, doble pasarela PayPal + Stripe para que el alumno pague como prefiera, y MailerLite conectado para el lead magnet (taller gratuito de 5 vídeos) y la newsletter.',
      stats: [
        { value: '5', label: 'Módulos del curso en LMS', gradient: true },
        { value: '2', label: 'Pasarelas (PayPal + Stripe)', gradient: true },
        { value: '15d', label: 'Garantía de devolución', gradient: true },
      ],
      quote:
        'Necesitaba un sitio donde Proyecto Lucía viviera con su propia identidad y donde el alumno entrara, pagara y empezara el curso sin que ninguna plataforma intermediaria se quedara con mi audiencia ni con mi margen.',
      quoteAuthor: 'Carlos Pons · supercapaces.com',
      ctaLabel: 'Leer el caso completo',
    },
    offer: {
      eyebrow: 'Plan completo · Cursos',
      title: 'Todo lo que tu plataforma',
      titleEm: 'de formación necesita.',
      lede:
        'Una plataforma a medida con LMS profesional, pasarela doble PayPal + Stripe, lead magnet conectado y embudo de email automatizado. Diseñada para que vendas, entregues y midas tu curso sin depender de plataformas externas.',
      features: [
        'Diseño 100% a medida (sin plantillas)',
        'LMS configurado (LearnDash, LifterLMS o Tutor)',
        'Doble pasarela de pago (PayPal + Stripe)',
        'Lead magnet con automatización de email',
        'Integración con MailerLite, ActiveCampaign, Mailchimp…',
        'Área cliente con progreso y certificados',
        'Sesión de formación + soporte 30 días',
      ],
      price: '1000€',
      priceNote: 'desde · pago único',
      priceDetail:
        'El precio final depende del LMS elegido, el número de cursos, si añadimos modelo de suscripción o área comunidad, y la complejidad del embudo de email. Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'cursos y formaciones.',
    faqs: [
      {
        question: '¿Qué LMS me recomiendas: LearnDash, LifterLMS, Tutor…?',
        answer:
          'Depende del tipo de curso. LearnDash es el más completo y el que usé en SuperCapaces — ideal para cursos con varios módulos, certificados, drip content y comunidad. LifterLMS funciona muy bien para suscripciones mensuales. Tutor LMS es más barato y suficiente para cursos simples. Lo decidimos en la primera llamada según lo que vendas y cómo quieras entregarlo.',
      },
      {
        question: '¿Cuánto cobran Stripe y PayPal por venta?',
        answer:
          'Stripe: 1,4% + 0,25€ por transacción europea. PayPal: en torno al 2,9% + 0,35€. Sin cuotas mensuales ni permanencia. Para un curso de 200€ esto son 3-6€ por venta — comparado con el 10% que se queda Hotmart (20€ por la misma venta), te ahorras 70-80% en comisiones desde el día uno.',
      },
      {
        question: '¿Se puede vender por suscripción mensual además de pago único?',
        answer:
          'Sí, y suele convivir bien. Pago único para el curso principal, suscripción mensual para acceso a comunidad, masterclasses en directo o nuevos módulos. Configuramos los dos modelos en la misma plataforma — y Stripe se encarga del cobro recurrente automáticamente.',
      },
      {
        question: '¿Cómo conecto mi plataforma de email (MailerLite, ActiveCampaign…)?',
        answer:
          'Vía API o webhooks. Cuando alguien se descarga tu lead magnet, entra automáticamente en una lista de MailerLite y arranca tu secuencia de bienvenida. Cuando compra el curso, pasa a una lista de clientes y sale de las campañas de venta. Todo automático, sin que tú tengas que exportar emails ni copiar listas.',
      },
      {
        question: '¿Puedo migrar mi curso desde Hotmart, Teachable o Kajabi?',
        answer:
          'Sí. Llevo el contenido (vídeos, PDFs, quizzes) a tu nuevo LMS, mantengo la estructura de módulos y configuro la migración de alumnos existentes para que conserven su progreso. Lo más delicado son los emails de notificación y los pagos recurrentes — los planifico antes para evitar duplicados o cobros perdidos.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu curso?',
      text: 'Cuéntame brevemente qué cursos vendes (o quieres vender), cómo entregas hoy el contenido y qué plataforma de email usas. Te respondo personalmente con una propuesta concreta — no una plantilla.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para cursos y formaciones online · RimoByte',
      description:
        'Plataformas WordPress + LearnDash para creadores de cursos y formaciones online. Pasarela doble (PayPal + Stripe) y newsletter conectada. Desde 1.000€, sin permanencia.',
    },
  },
  {
    slug: 'web-para-psicologos',
    name: 'Web para psicólogos',
    sectorNameShort: 'psicólogos',
    eyebrow: 'WEB PARA PSICÓLOGOS Y TERAPEUTAS',
    headline: 'Confianza antes de la primera sesión,',
    headlineEm: 'pacientes que encajan.',
    description:
      'Webs para psicólogos y terapeutas en consulta privada que quieren que les encuentren en Google, transmitir credibilidad antes del primer contacto y convertir visitas en solicitudes de cita — con una página por especialidad, formularios RGPD y reserva sin depender solo de Doctoralia o Psychology Today.',
    ctaPrimary: 'Cuéntame tu consulta',
    checks: ['SEO por especialidad', 'RGPD incluido', 'Tuya desde el primer día'],
    heroPills: ['Web para psicólogos y terapeutas', 'SEO local · Primera cita'],
    heroMockupType: 'practice',
    heroStats: [
      { value: '1', label: 'Página por especialidad · SEO', gradient: true },
      { value: 'RGPD', label: 'Formularios y avisos legales', gradient: true },
      { value: '24/7', label: 'Solicitud de cita disponible', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver concepto visual', href: '#concepto' },
    painPoints: {
      eyebrow: 'Lo que más veo en consulta privada',
      title: 'Tu web tiene que resolver',
      titleEm: 'tres problemas a la vez.',
      paragraphs: [
        {
          text: 'Hacer una web de psicólogo no es poner una foto bonita y un teléfono. La persona que busca ayuda decide en pocos segundos si puede confiar en ti — y si no encuentra especialidad, enfoque y forma de contacto clara, vuelve al listado de Doctoralia o al siguiente resultado de Google.',
        },
        {
          emphasis: 'El primer problema es la visibilidad:',
          text: ' que te encuentren cuando buscan "psicólogo + tu ciudad" o "terapia para la ansiedad en [zona]" — no solo tu nombre. El segundo es la confianza: colegiación visible, enfoque terapéutico, tarifas o primeros pasos sin ambigüedad. El tercero es la conversión: pasar de "me interesa" a primera cita con el mínimo roce posible.',
        },
        {
          emphasis: 'Estos tres problemas se resuelven con la misma ingeniería',
          text: ' que aplico en webs profesionales donde el SEO local, la claridad de la oferta y los formularios conformes a RGPD no son opcionales.',
        },
      ],
      credentialsTitle: 'Lo que tu web tendrá',
      credentials: [
        {
          label: 'Una página por especialidad.',
          text: 'Ansiedad, pareja, infantil, EMDR… cada una con su SEO, no un listado genérico que Google no posiciona.',
        },
        {
          label: 'Perfil profesional que transmite.',
          text: 'Formación, colegiación, enfoque y foto — lo que el paciente necesita antes de escribirte.',
        },
        {
          label: 'Primera cita sin fricción.',
          text: 'Formulario seguro, Calendly, Doctolib o el sistema que ya uses — integrado y visible desde el móvil.',
        },
        {
          label: 'RGPD y deontología.',
          text: 'Aviso legal, privacidad, cookies y formularios adaptados al tratamiento de datos en salud.',
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
      titleEm: 'tu consulta.',
      intro:
        'Mockup de cómo construiría la home: quién ayudas y con qué enfoque en el primer pantallazo, especialidades enlazadas cada una a su página, y los tres elementos críticos (cómo pedir cita, modalidad online/presencial y ubicación) siempre a mano.',
      url: 'tuconsulta.es',
      browserHeadline: 'Tu consulta,',
      browserHeadlineEm: 'accesible',
      browserDescription:
        'Psicóloga colegiada. Terapia individual, de pareja y online. Primera sesión sin compromiso — cuéntame qué necesitas.',
      browserPrimaryCta: 'Pedir primera cita',
      browserSecondaryCta: 'Ver especialidades',
      miniCards: [
        { icon: 'clock', title: 'Primera cita', subtitle: 'Online o presencial' },
        { icon: 'map', title: 'Consulta en tu ciudad', subtitle: 'Cómo llegar →' },
        { icon: 'phone', title: 'Contacto directo', subtitle: 'Sin intermediarios' },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para psicólogos',
    featuresIntro:
      'Cada elemento está afinado para consulta privada: lo que el paciente necesita leer antes de confiar, cómo filtra si encajáis y cómo pide cita sin sentirse expuesto.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo trabaja tu consulta.',
    features: [
      {
        icon: 'result-layers',
        title: 'Página por especialidad',
        description:
          'Ansiedad, depresión, pareja, trauma, infantil… cada una con su URL, su copy y su SEO. Google no posiciona un bullet en una página genérica de "servicios".',
      },
      {
        icon: 'result-grid',
        title: 'Sobre mí con credenciales',
        description:
          'Formación, colegiación, número de colegiado, enfoque terapéutico y líneas de trabajo. La confianza clínica empieza antes del primer email.',
      },
      {
        icon: 'result-clock',
        title: 'Reserva o solicitud de cita',
        description:
          'Calendly, Doctolib, Doctoralia embebido o formulario propio con campos mínimos. El paciente sabe qué pasa después de pulsar "enviar".',
      },
      {
        icon: 'globe',
        title: 'SEO local y por problema',
        description:
          'Schema Person + LocalBusiness, Google Business Profile y páginas para "psicólogo + ciudad" y "terapia para [problema] + zona".',
      },
      {
        icon: 'result-lock',
        title: 'RGPD y confidencialidad',
        description:
          'Política de privacidad, aviso legal, cookies y formularios con base legal clara. Imprescindible en un sector donde tratas datos de salud.',
      },
      {
        icon: 'mail',
        title: 'Tarifas, seguros y FAQs',
        description:
          'Página de honorarios (o rango orientativo), si aceptas mutua o solo privado, y preguntas frecuentes que reducen consultas repetitivas por WhatsApp.',
      },
    ],
    relatedProjects: {
      eyebrow: 'Mi trabajo en webs profesionales',
      title: 'La ingeniería detrás de tu web,',
      titleEm: 'aplicada y probada.',
      intro:
        'Proyectos donde el SEO, la velocidad y la estructura de contenidos eran críticos — las mismas piezas que sostienen una web de consulta que capta pacientes de verdad.',
      slugs: ['vila-i-lancis', 'lucia-nails-art'],
    },
    offer: {
      eyebrow: 'Plan completo · Psicología',
      title: 'Todo lo que tu consulta',
      titleEm: 'necesita online.',
      lede:
        'Una web a medida con páginas por especialidad, perfil profesional, formulario o reserva integrada y SEO local incluido. Plazo cerrado, precio cerrado y formación para que la gestiones tú después. Sin permanencia.',
      features: [
        'Diseño 100% a medida con dos direcciones a elegir',
        'Home + sobre mí + una página por especialidad acordada',
        'Formulario RGPD o integración con tu sistema de citas',
        'SEO local + Google Business Profile configurados',
        'Formación + 30 días de soporte tras la entrega',
      ],
      price: '600€',
      priceNote: 'desde · pago único, sin permanencia',
      priceDetail:
        'El precio final depende del número de especialidades/páginas, si integramos Calendly, Doctolib u otro sistema, y si añadimos blog o área de recursos. Te paso presupuesto cerrado antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'psicólogos y terapeutas.',
    faqs: [
      {
        question: '¿Por qué no basta con Doctoralia o Psychology Today?',
        answer:
          'Son directorios útiles para visibilidad, pero la comisión, la competencia en la misma ficha y el hecho de que el paciente no está en tu web hacen que pierdas control sobre la primera impresión y los datos. Tu web propia posiciona por especialidad y ciudad, transmite tu enfoque sin compararte en columna con otros colegas, y el contacto llega directo a ti.',
      },
      {
        question: '¿Cuántas páginas de especialidad necesito realmente?',
        answer:
          'Al menos una por línea de trabajo que quieras captar en Google: si tratas ansiedad, pareja e infantil, son tres páginas — no tres párrafos en "Servicios". Empezamos por las dos o tres búsquedas que más pacientes te pueden traer y dejamos la estructura preparada para añadir más sin rehacer la web.',
      },
      {
        question: '¿Puedo ofrecer terapia online y presencial en la misma web?',
        answer:
          'Sí, y conviene dejarlo claro desde la home: modalidad, zonas horarias si atiendes fuera de tu ciudad, y requisitos técnicos mínimos para sesión online. Cada especialidad puede indicar si está disponible en ambos formatos. También preparo páginas por comunidad autónoma si trabajas en régimen PSYPACT o similar.',
      },
      {
        question: '¿La web cumple con RGPD y el código deontológico?',
        answer:
          'Sí. Aviso legal, política de privacidad, cookies, formularios con información al interesado y sin campos clínicos innecesarios en el primer contacto. No sustituyo el asesoramiento de tu colegio profesional, pero conozco las exigencias habituales en webs de salud mental en España.',
      },
      {
        question: '¿Cuánto tarda en estar lista y en empezar a aparecer en Google?',
        answer:
          'Entre 3 y 5 semanas desde que tengo textos, foto y datos de colegiación. El SEO local empieza a moverse en 4–12 semanas según competencia en tu ciudad. Las páginas de especialidad largas suelen posicionar antes que una home genérica — por eso insisto en una URL por problema, no en un único listado.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu consulta?',
      text: 'Cuéntame qué especialidades trabajas, si atiendes online o presencial y qué usas hoy para las citas. Te respondo personalmente con una propuesta concreta, plazos cerrados y precio cerrado antes de empezar.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para psicólogos y terapeutas · RimoByte',
      description:
        'Webs WordPress a medida para psicólogos en consulta privada. Una página por especialidad, SEO local, formularios RGPD y reserva de primera cita. Desde 600€, sin permanencia.',
    },
  },
  {
    slug: 'web-para-inmobiliarias',
    name: 'Web para inmobiliarias',
    sectorNameShort: 'inmobiliarias',
    eyebrow: 'WEB PARA INMOBILIARIAS',
    headline: 'Tu CRM al día, tu web',
    headlineEm: 'con cara propia.',
    description:
      'Webs WordPress a medida para agencias inmobiliarias que quieren un catálogo sincronizado con su CRM (Inmovilla, Inmoweb, Witei, Inmobalia, Apimo…), un buscador que filtra de verdad y una imagen de marca que no parezca la plantilla genérica que viene con el software.',
    ctaPrimary: 'Cuéntame tu agencia',
    checks: ['Sincronización CRM', 'Buscador de inmuebles', 'Diseño a medida'],
    heroPills: ['Web para inmobiliarias', 'CRM conectado · Catálogo'],
    heroMockupType: 'listings',
    heroStats: [
      { value: 'CRM', label: 'Inmuebles sincronizados', gradient: true },
      { value: 'SEO', label: 'Por zona y tipo de inmueble', gradient: true },
      { value: '24/7', label: 'Solicitudes de visita', gradient: true },
    ],
    heroSecondaryCta: { label: 'Ver concepto visual', href: '#concepto' },
    painPoints: {
      eyebrow: 'Lo que más veo en inmobiliaria',
      title: 'Tu web tiene que resolver',
      titleEm: 'tres problemas a la vez.',
      paragraphs: [
        {
          text: 'Hacer una web de inmobiliaria no es pegar un iframe del portal ni repetir la misma plantilla que ofrece tu CRM. El comprador o inquilino compara en segundos: fotos, precio, zona y sensación de confianza. Si la web parece genérica o el catálogo va desfasado, vuelve a Idealista.',
        },
        {
          emphasis: 'El primer problema es el catálogo:',
          text: ' que los inmuebles que gestionas en el CRM aparezcan en tu web sin duplicar trabajo — con fotos, precios y estados actualizados. El segundo es la búsqueda: filtros por operación, zona, precio y habitaciones que funcionen en móvil. El tercero es la captación: que pidan visita, valoración o contacto contigo, no solo con el portal.',
        },
        {
          emphasis: 'Muchos CRM incluyen web propia,',
          text: ' pero las plantillas son limitadas y todas las agencias del mismo software se parecen. Yo conecto tu CRM con WordPress para que el catálogo se alimente solo y el diseño, la estructura y el SEO sean tuyos — personalizados para tu mercado y tu marca.',
        },
      ],
      credentialsTitle: 'Lo que tu web tendrá',
      credentials: [
        {
          label: 'Conexión con tu CRM.',
          text: 'Sincronización vía API o XML con Inmovilla, Inmoweb, Witei, Inmobalia, Apimo, Getrix, eGO Real Estate y otros feeds compatibles. Publicas una vez en el CRM y la web se actualiza.',
        },
        {
          label: 'Buscador y fichas de inmueble.',
          text: 'Filtros por venta/alquiler, zona, precio y m². Galería, mapa, características y CTA de solicitud de visita en cada ficha.',
        },
        {
          label: 'Diseño que no parece plantilla.',
          text: 'WordPress a medida: tu logo, tus colores, tu copy y páginas por zona o tipo de inmueble — no el tema genérico del marketplace del CRM.',
        },
        {
          label: 'SEO local por barrio y operación.',
          text: 'Páginas para "pisos en venta en [zona]" o "alquiler en [barrio]" además del listado general.',
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
      titleEm: 'tu inmobiliaria.',
      intro:
        'Mockup de cómo construiría la home: buscador visible en el primer pantallazo, inmuebles destacados alimentados por el CRM y los tres elementos críticos (operación, zona y solicitud de visita) siempre a mano.',
      url: 'tuinmobiliaria.es',
      browserHeadline: 'Encuentra tu',
      browserHeadlineEm: 'próximo hogar',
      browserDescription:
        'Venta y alquiler en tu ciudad. Catálogo actualizado cada día desde nuestra gestión. Solicita visita sin compromiso.',
      browserPrimaryCta: 'Ver inmuebles',
      browserSecondaryCta: 'Valoración gratuita',
      miniCards: [
        { icon: 'clock', title: '12 inmuebles nuevos', subtitle: 'Esta semana' },
        { icon: 'map', title: 'Tu zona', subtitle: 'Barrios y municipios' },
        { icon: 'phone', title: 'Contacto directo', subtitle: 'Sin intermediarios' },
      ],
    },
    featuresEyebrow: 'Qué incluye una web para inmobiliarias',
    featuresIntro:
      'Cada pieza está pensada para agencias que ya trabajan con CRM: el catálogo no se duplica, la web convierte visitas en leads y la marca no se diluye en una plantilla estándar.',
    featuresTitle: 'Pensado para',
    featuresTitleEm: 'cómo vendes inmuebles.',
    features: [
      {
        icon: 'result-layers',
        title: 'Sincronización CRM → WordPress',
        description:
          'Conexión con Inmovilla, Inmoweb, Witei, Inmobalia, Apimo, Getrix, eGO Real Estate, Kyero, InfoCasa, thinkSPAIN y ReSales Online vía API o feed XML. Inmuebles, fotos, precios y estados sin copiar y pegar.',
        tag: 'CRM · API / XML',
        span: 'wide',
      },
      {
        icon: 'result-grid',
        title: 'Buscador con filtros reales',
        description:
          'Venta o alquiler, rango de precio, habitaciones, m² y zona. Resultados rápidos en móvil — donde se decide el 70% de las búsquedas inmobiliarias.',
      },
      {
        icon: 'result-star',
        title: 'Fichas de inmueble que venden',
        description:
          'Galería optimizada, plano, mapa, características, eficiencia energética y botones de WhatsApp, llamada y solicitud de visita.',
      },
      {
        icon: 'globe',
        title: 'SEO por zona y operación',
        description:
          'Landing pages para barrios, municipios y tipos de inmueble. Schema RealEstateAgent + LocalBusiness para Google local.',
      },
      {
        icon: 'result-trend',
        title: 'Captación de leads',
        description:
          'Formularios de valoración, alertas de búsqueda, solicitud de visita y contacto con RGPD. Los leads llegan a tu email o al CRM.',
      },
      {
        icon: 'result-clock',
        title: 'Diseño a medida, no plantilla del CRM',
        description:
          'La web que ofrece Inmoweb o Inmovilla funciona, pero se ve como la del vecino. Aquí el diseño es WordPress propio: solo tu marca, con el catálogo conectado.',
        span: 'tall',
      },
    ],
    relatedProjects: {
      eyebrow: 'Mi trabajo en webs profesionales',
      title: 'La ingeniería detrás de tu web,',
      titleEm: 'aplicada y probada.',
      intro:
        'Proyectos donde el SEO, la velocidad y las integraciones con sistemas externos eran críticas — la misma base técnica que necesita una inmobiliaria con catálogo vivo.',
      slugs: ['vila-i-lancis', 'lucia-nails-art'],
    },
    offer: {
      eyebrow: 'Plan completo · Inmobiliaria',
      title: 'Todo lo que tu agencia',
      titleEm: 'necesita online.',
      lede:
        'Web WordPress a medida con buscador de inmuebles, conexión a tu CRM y SEO local. Plazo cerrado, precio cerrado y formación para que gestiones contenidos tú después. Sin permanencia.',
      features: [
        'Diseño 100% a medida con dos direcciones a elegir',
        'Home + listado de inmuebles + ficha individual',
        'Integración CRM acordada (API, XML o plugin según tu software)',
        'Formularios de visita y valoración con RGPD',
        'SEO local + Google Business Profile configurados',
        'Formación + 30 días de soporte tras la entrega',
      ],
      price: '1200€',
      priceNote: 'desde · pago único, sin permanencia',
      priceDetail:
        'El precio final depende del CRM que uses, del volumen de inmuebles, de páginas por zona y de si migramos catálogo o web actual. La integración CRM se presupuesta aparte si requiere desarrollo a medida. Te paso cifra cerrada antes de empezar.',
      cta: 'Pedir presupuesto',
    },
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Sobre webs para',
    faqTitleEm: 'inmobiliarias.',
    faqs: [
      {
        question: '¿Por qué no usar la web que ya incluye mi CRM?',
        answer:
          'Inmoweb, Inmovilla y otros ofrecen web conectada al catálogo — y para empezar puede valer. El problema es el diseño: plantillas genéricas, poca flexibilidad de marca y SEO limitado. Mi propuesta es mantener tu CRM como fuente de verdad y mostrar los inmuebles en una web WordPress tuya, con diseño personalizado y estructura pensada para tu mercado.',
      },
      {
        question: '¿Con qué CRMs inmobiliarios puedes conectar la web?',
        answer:
          'Trabajo con los CRM más usados en España que ya tienen integración estándar con WordPress: Inmovilla, Inmoweb, Witei, Inmobalia, Apimo, Getrix, eGO Real Estate, Kyero, InfoCasa, thinkSPAIN y ReSales Online. Si el tuyo exporta XML o CSV en una URL pública (OpenImmo, XML genérico…), también suele encajar. Antes de presupuestar reviso qué opciones ofrece tu licencia y te digo la vía más fiable.',
      },
      {
        question: '¿Los inmuebles se actualizan solos cuando cambio algo en el CRM?',
        answer:
          'Sí, esa es la idea. Configuramos sincronización automática (cada X minutos o vía cron) o importación programada según lo que permita tu CRM. Cuando das de baja un inmueble, cambias precio o subes fotos nuevas, la web refleja el cambio sin que tengas que tocar WordPress.',
      },
      {
        question: '¿Puedo tener páginas por barrio o por tipo de inmueble?',
        answer:
          'Sí, y suele ser clave para SEO. Además del buscador general, preparo landings para zonas donde más operas ("pisos de lujo en Sarrià", "alquiler en el Eixample") con copy y estructura orientados a búsqueda, no solo un listado filtrado.',
      },
      {
        question: '¿Cuánto tarda y qué necesito tener listo?',
        answer:
          'Entre 4 y 8 semanas según complejidad de la integración CRM y número de plantillas (ficha, listado, zonas). Necesito acceso de prueba al CRM, logo, textos de empresa, fotos de equipo y definir qué portales o software ya usáis. La integración se prueba con inmuebles reales antes de publicar.',
      },
    ],
    ctaFinal: {
      title: '¿Hablamos de',
      titleEm: 'tu inmobiliaria?',
      text: 'Cuéntame qué CRM usas, cuántos inmuebles gestionas y si hoy tienes web propia o solo la del software. Te respondo personalmente con una propuesta concreta, plazos cerrados y precio cerrado antes de empezar.',
    },
    serviceLink: '/servicios/web-corporativa/',
    seo: {
      title: 'Diseño web para inmobiliarias · RimoByte',
      description:
        'Webs WordPress a medida para inmobiliarias. Catálogo sincronizado con Inmovilla, Inmoweb, Witei, Inmobalia, Apimo y otros CRM. Buscador, fichas de inmueble y diseño personalizado — no plantilla genérica del CRM. Desde 1200€.',
    },
  },
];

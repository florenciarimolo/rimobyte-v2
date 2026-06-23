export interface ProjectStat {
  value: string;
  label: string;
  description?: string;
}

export type ProjectCategory =
  | 'web-corporativa'
  | 'tienda-online'
  | 'landing-page'
  | 'plataforma'
  | 'sector-salud';

export type ProjectGridSpan = 'featured' | 'span-6' | 'span-4';

export type ProjectResultIconName =
  | 'pulse'
  | 'trend'
  | 'clock'
  | 'star'
  | 'grid'
  | 'lock'
  | 'activity'
  | 'chat'
  | 'layers';

export interface ProjectNarrativeFigure {
  label: string;
  text: string;
}

export interface ProjectNarrativeBlock {
  id: 'reto' | 'propuesta' | 'proceso' | 'resultado';
  num: '01' | '02' | '03' | '04';
  navLabel: string;
  title: string;
  paragraphs: string[];
  figure?: ProjectNarrativeFigure;
}

export interface ProjectNarrative {
  subtitle?: string;
  blocks: ProjectNarrativeBlock[];
}

export interface Project {
  slug: string;
  name: string;
  displayName: string;
  /** Fragmento exacto de `displayName` para destacarlo en el hero (gradient-text). */
  displayNameHighlight?: string;
  url: string;
  eyebrow: string;
  sector: string;
  location: string;
  /** YYYY-MM — uso interno para ordenar; año visible en hero */
  date: string;
  stackLabel?: string;
  challenge: string;
  solution: string;
  result: string;
  /** Bloque narrativo opcional entre propuesta y resultado */
  process?: string;
  /** Caja de diagnóstico en el bloque «El reto» */
  diagnosis?: string;
  /** Párrafo introductorio del hero de detalle */
  heroLede?: string;
  testimonial?: {
    quote: string;
    /** Fragmento exacto de `quote` que se muestra con degradado */
    quoteHighlight?: string;
    author: string;
    role?: string;
  };
  image: string;
  stats: ProjectStat[];
  /** Hero 16:9 — mismo archivo que image hasta tener variantes dedicadas */
  heroImage?: string;
  techStack?: string[];
  categories: ProjectCategory[];
  gridSpan: ProjectGridSpan;
  thumbLetter: string;
  thumbGradient: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  cardSummary: string;
  resultHighlight: string;
  resultIcon: ProjectResultIconName;
  /** Caso «El caso, paso a paso» — 4 bloques con copy del mockup */
  narrative?: ProjectNarrative;
}

export const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'web-corporativa', label: 'Web corporativa' },
  { id: 'tienda-online', label: 'Tienda online' },
  { id: 'landing-page', label: 'Landing page' },
  { id: 'plataforma', label: 'Plataforma' },
  { id: 'sector-salud', label: 'Sector salud' },
] as const;

/** Orden y spans del grid en /proyectos/ (mockup v6) */
export const projectsListingOrder: { slug: string; gridSpan: ProjectGridSpan }[] = [
  { slug: 'lucia-nails-art', gridSpan: 'featured' },
  { slug: 'de-cos', gridSpan: 'span-6' },
  { slug: 'rock-zone-camp', gridSpan: 'span-6' },
  { slug: 'ariadna-vilalta', gridSpan: 'span-4' },
  { slug: 'supercapaces', gridSpan: 'span-4' },
  { slug: 'vila-i-lancis', gridSpan: 'span-4' },
  { slug: 'juancar-garma-reset7', gridSpan: 'span-6' },
  { slug: 'fenix-internacional-360', gridSpan: 'span-6' },
  { slug: 'jlg-ki', gridSpan: 'span-6' },
];

/** Orden cronológico inverso (más reciente primero) */
export const projects: Project[] = [
  {
    slug: 'ariadna-vilalta',
    name: 'Ariadna Vilalta',
    displayName: 'Ariadna Vilalta · Plataforma de autoridad para una speaker internacional',
    displayNameHighlight: 'autoridad',
    url: 'ariadnavilalta.com',
    eyebrow: 'Web para psicólogos',
    sector: 'Ciberpsicóloga · Speaker internacional',
    location: 'España',
    date: '2026-05',
    challenge:
      'Ariadna no necesitaba una web de servicios al uso — necesitaba posicionarse como experta y speaker internacional en ciberpsicología. Un perfil diferente que requería un enfoque diferente: menos catálogo, más autoridad.',
    solution:
      'Web diseñada para comunicar su expertise y credibilidad como referente en su campo. El foco no era vender sesiones sino construir la imagen de una experta a nivel internacional.',
    result:
      'Una web que por primera vez la representa como quiere ser percibida — con criterio, con personalidad y con el mensaje correcto para el público correcto.',
    testimonial: {
      quote:
        'RimoByte consiguió lo que parecía imposible: que alguien entendiera qué quiero comunicar y lo haga de una forma que me represente.',
      quoteHighlight: 'lo haga de una forma que me represente',
      author: 'Ariadna Vilalta',
    },
    image: '/assets/projects/ariadna-vilalta.webp',
    heroImage: '/assets/projects/ariadna-vilalta.webp',
    stats: [
      {
        value: 'Internacional',
        label: 'Alcance del posicionamiento',
        description:
          'Web pensada para abrir puertas fuera de España y consolidar su imagen de speaker en ciberpsicología.',
      },
      {
        value: 'Autoridad',
        label: 'Enfoque del contenido',
        description:
          'Cada sección refuerza credibilidad y expertise — no un catálogo de servicios ni precios.',
      },
      {
        value: '1ª vez',
        label: 'Representación personal',
        description:
          'Por primera vez la web comunica quién es y cómo quiere ser percibida por su público.',
      },
    ],
    categories: ['sector-salud', 'plataforma'],
    gridSpan: 'span-4',
    thumbLetter: 'A',
    thumbGradient: 3,
    cardSummary:
      'Ciberpsicóloga y speaker internacional. Una web que la representa como experta y abre puertas en su sector.',
    resultHighlight: 'Branding de autoridad',
    resultIcon: 'star',
  },
  {
    slug: 'supercapaces',
    name: 'SuperCapaces',
    displayName: 'SuperCapaces · Plataforma de cursos lista para autogestionarse',
    displayNameHighlight: 'autogestionarse',
    url: 'supercapaces.com',
    eyebrow: 'Plataforma de cursos',
    sector: 'Cursos online para familias',
    location: 'España',
    date: '2026-04',
    challenge:
      'El cliente tenía una web a medias y no sabía cómo gestionar las membresías de sus cursos ni las automatizaciones de correo para sus alumnos. La tecnología era un obstáculo para un proyecto con un propósito muy claro.',
    solution:
      'Finalización del desarrollo, implementación del sistema de membresías y configuración de las automatizaciones de email. Formación al cliente para que pudiera gestionar todo de forma autónoma.',
    result:
      'Una plataforma funcional que el cliente gestiona solo, con los cursos activos y las comunicaciones automatizadas. La tecnología dejó de ser un problema para convertirse en una herramienta.',
    testimonial: {
      quote:
        'Flor realizó la renovación completa de la web y el resultado ha sido muy bueno tanto a nivel visual como funcional. Desde el primer momento mostró mucha implicación, empatía y rapidez.',
      quoteHighlight: 'mucha implicación, empatía y rapidez',
      author: 'Carlos Pons',
    },
    image: '/assets/projects/supercapaces.webp',
    heroImage: '/assets/projects/supercapaces.webp',
    stats: [
      {
        value: '100%',
        label: 'Gestión autónoma del cliente',
        description:
          'Cursos, usuarios y comunicaciones bajo su control sin depender de soporte externo.',
      },
      {
        value: 'Activas',
        label: 'Automatizaciones de email',
        description:
          'Los alumnos reciben lo que necesitan sin que el cliente tenga que intervenir manualmente.',
      },
      {
        value: 'Listo',
        label: 'Sistema de membresías',
        description: 'Base preparada para sumar cursos y usuarios sin rehacer la plataforma.',
      },
    ],
    categories: ['plataforma'],
    gridSpan: 'span-4',
    thumbLetter: 'S',
    thumbGradient: 5,
    cardSummary:
      'Membresías, automatizaciones de email y plataforma que el cliente gestiona por su cuenta sin depender de nadie.',
    resultHighlight: '100% autogestionable',
    resultIcon: 'grid',
  },
  {
    slug: 'fenix-internacional-360',
    name: 'Fénix',
    displayName: 'Fénix · Una web narrativa con propósito real',
    displayNameHighlight: 'propósito real',
    url: 'fenixinternacional360.com',
    eyebrow: 'Web con propósito',
    sector: 'Mentorías para madres emprendedoras',
    location: 'Internacional',
    date: '2026-03',
    challenge:
      'La clienta había vivido en primera persona el colapso que supone la maternidad para una empresaria — y quería crear un espacio para acompañar a otras madres en esa misma situación. No necesitaba una web de ventas agresiva sino una plataforma que transmitiera calor humano, credibilidad y propósito.',
    solution:
      'Web desde cero con un enfoque narrativo — la historia personal de la fundadora como eje central, no sus servicios. El diseño y los textos están construidos para que una madre emprendedora se sienta identificada desde el primer scroll.',
    result:
      'Desde el lanzamiento ha acompañado a más de 20 madres emprendedoras a través de sus mentorías. Un proyecto donde la tecnología está al servicio de una causa real.',
    image: '/assets/projects/fenix.webp',
    heroImage: '/assets/projects/fenix.webp',
    stats: [
      {
        value: '+20',
        label: 'Madres acompañadas',
        description:
          'Desde el lanzamiento, mentorías activas con madres emprendedoras en proceso de reinvención.',
      },
      {
        value: 'Internacional',
        label: 'Alcance del proyecto',
        description: 'Una web que conecta con madres más allá de las fronteras geográficas.',
      },
      {
        value: 'Personal',
        label: 'Enfoque narrativo',
        description: 'La historia de la fundadora guía el mensaje, no un catálogo de servicios.',
      },
    ],
    categories: ['landing-page'],
    gridSpan: 'span-6',
    thumbLetter: 'F',
    thumbGradient: 9,
    cardSummary:
      'Mentorías para madres emprendedoras. Desde el lanzamiento ha acompañado a más de 20 madres en proceso de reinvención.',
    resultHighlight: '+20 mentorías activas',
    resultIcon: 'chat',
  },
  {
    slug: 'jlg-ki',
    name: 'JLG K&I',
    displayName: 'JLG K&I · De WordPress.com a una web propia y escalable',
    displayNameHighlight: 'propia',
    url: 'jlgki.com',
    eyebrow: 'Web corporativa',
    sector: 'Sitio web corporativo',
    location: 'España',
    date: '2025-07',
    challenge:
      'El cliente tenía su web en WordPress.com — una solución limitada que le impedía crecer y en la que estaba pagando sin sacar partido real. Necesitaba dar el salto a una web propia y profesional.',
    solution:
      'Asesoramiento para migrar a WordPress con hosting y dominio propios, y rediseño completo del sitio. Por primera vez, el cliente tiene una web que es realmente suya y con capacidad de evolucionar.',
    result:
      'Una base técnica sólida para seguir creciendo, con una relación de trabajo continua orientada a nuevos proyectos y mejoras progresivas.',
    testimonial: {
      quote:
        'Ha sido un placer trabajar con Florencia. Poner las primeras piedras para una relación de larga duración.',
      quoteHighlight: 'relación de larga duración',
      author: 'Josep Linde',
    },
    image: '/assets/projects/jlg-ki.webp',
    heroImage: '/assets/projects/jlg-ki.webp',
    stats: [
      {
        value: '100%',
        label: 'Propiedad recuperada',
        description:
          'Hosting, dominio y WordPress a su nombre — por primera vez la web es realmente suya.',
      },
      {
        value: 'Continua',
        label: 'Colaboración con el cliente',
        description: 'Relación abierta a nuevos proyectos y mejoras progresivas sin empezar de cero.',
      },
      {
        value: 'Ilimitada',
        label: 'Capacidad de evolución',
        description:
          'Infraestructura propia que puede crecer sin las limitaciones de WordPress.com.',
      },
    ],
    categories: ['web-corporativa'],
    gridSpan: 'span-6',
    thumbLetter: 'JLG',
    thumbGradient: 7,
    cardSummary:
      'Migración a una infraestructura propia con base técnica sólida y relación continua para evolucionar.',
    resultHighlight: 'Stack propio y escalable',
    resultIcon: 'layers',
  },
  {
    slug: 'de-cos',
    name: 'de Cos',
    displayName: 'de Cos · Rescate técnico y +67% de ventas mensuales',
    displayNameHighlight: '+67%',
    url: 'decos.es',
    eyebrow: 'Tienda online',
    sector: 'Tienda online de sandalias artesanales',
    location: 'España',
    date: '2025-06',
    challenge:
      'Situación crítica: una agencia que no respondía y una web que directamente no funcionaba. Cuando entré al proyecto, lo primero fue rescatar la tienda antes de poder mejorarla.',
    solution:
      'Rescate y estabilización de la web, rediseño completo de la tienda y aplicación de mejoras técnicas y de SEO. Se devolvió la propiedad total al cliente — accesos, hosting y dominio a su nombre.',
    result:
      'La tienda pasó de 10-15 ventas mensuales en temporada alta a 25 — un crecimiento del 67% — impulsado por las 300 visitas mensuales orgánicas que genera la web. Actualmente aparece en los primeros resultados de Google para sus búsquedas clave.',
    testimonial: {
      quote:
        'Llegué a Rimobyte por recomendación, y sin duda paso su testigo a quien busque un técnico de confianza.',
      quoteHighlight: 'técnico de confianza',
      author: 'Maria Jose',
    },
    image: '/assets/projects/de-cos.webp',
    heroImage: '/assets/projects/de-cos.webp',
    stats: [
      {
        value: '+67%',
        label: 'Ventas mensuales',
        description: 'De 10-15 ventas en temporada alta a 25, impulsadas por tráfico orgánico.',
      },
      {
        value: '300',
        label: 'Visitas orgánicas al mes',
        description: 'Tráfico que llega desde Google sin invertir en publicidad.',
      },
      {
        value: 'Top',
        label: 'Posición en Google',
        description: 'Primeros resultados para las búsquedas que importan en su sector.',
      },
    ],
    categories: ['tienda-online'],
    gridSpan: 'span-6',
    thumbLetter: 'dC',
    thumbGradient: 6,
    cardSummary:
      'Situación crítica: una agencia que no respondía y una web rota. Reconstruí la tienda de cero y la posicioné en Google.',
    resultHighlight: '+67% ventas mensuales',
    resultIcon: 'trend',
  },
  {
    slug: 'juancar-garma-reset7',
    name: 'Juancar Garma / RESET7',
    displayName: 'Juancar Garma · Landing de ventas que convierte sola',
    displayNameHighlight: 'convierte',
    url: 'juancargarma.com/reset7',
    eyebrow: 'Web para entrenadores',
    sector: 'Landing page de ventas · Entrenador personal',
    location: 'España',
    date: '2025-05',
    challenge:
      'Juan Carlos tenía un programa de pérdida de peso con resultados reales pero sin una página que los comunicara bien. Necesitaba una landing orientada a ventas que convirtiera visitas en clientes.',
    solution:
      'Landing page de venta directa con diseño moderno, integración de pago por Stripe y una narrativa construida alrededor de los casos de éxito reales de sus clientes. Sin distracciones — un único objetivo, una única acción.',
    result:
      'Una página que habla el lenguaje de sus clientes potenciales y convierte. Juan Carlos ya no tiene que explicar su método — la web lo hace por él.',
    testimonial: {
      quote: 'Trabajar con Flor es de las mejores decisiones que he podido hacer.',
      quoteHighlight: 'de las mejores decisiones',
      author: 'Juan Carlos García',
    },
    image: '/assets/projects/juancar-garma-reset7.webp',
    heroImage: '/assets/projects/juancar-garma-reset7.webp',
    stats: [
      {
        value: '1',
        label: 'Objetivo de conversión',
        description: 'Una landing sin distracciones: un solo CTA, una sola acción.',
      },
      {
        value: 'Stripe',
        label: 'Pago integrado',
        description: 'El cliente compra el reto sin salir de la página ni pasar por intermediarios.',
      },
      {
        value: '7 días',
        label: 'Duración del programa',
        description:
          'La web explica el método y los resultados — Juan Carlos no tiene que convencer uno a uno.',
      },
    ],
    categories: ['landing-page'],
    gridSpan: 'span-6',
    thumbLetter: 'JG',
    thumbGradient: 4,
    cardSummary:
      'Programa de pérdida de peso con resultados reales pero sin página que los comunicara. Una landing que habla el lenguaje del cliente y convierte.',
    resultHighlight: 'Conversión sin intervención',
    resultIcon: 'activity',
  },
  {
    slug: 'rock-zone-camp',
    name: 'Rock Zone Camp',
    displayName: 'Rock Zone Camp · Identidad potente con rendimiento 99/100',
    displayNameHighlight: '99/100',
    url: 'rockzonecamp.com',
    eyebrow: 'Eventos y campamentos',
    sector: 'Campamento de música rock',
    location: 'España',
    date: '2025-04',
    challenge:
      'Necesitaban una web para promocionar sus campamentos e integrar las inscripciones online. El reto técnico era claro: muchas imágenes y vídeos que podían hacer la web lenta e inmanejable.',
    solution:
      'Diseño con identidad visual potente que transmite la energía del proyecto, con un sistema de inscripciones integrado. La optimización de rendimiento fue prioritaria desde el primer momento.',
    result:
      'La web puntúa 99 sobre 100 en PageSpeed — un resultado excepcional para un sitio con tanto contenido visual. Carga rápido, convierte bien y el cliente no ha dejado de crecer.',
    testimonial: {
      quote: 'Se ha convertido en la programadora oficial de nuestro proyecto.',
      quoteHighlight: 'programadora oficial de nuestro proyecto',
      author: 'Fura Aria',
    },
    image: '/assets/projects/rock-zone-camp.webp',
    heroImage: '/assets/projects/rock-zone-camp.webp',
    stats: [
      {
        value: '99/100',
        label: 'Puntuación PageSpeed',
        description:
          'Rendimiento excepcional pese al volumen de imágenes y vídeos del campamento.',
      },
      {
        value: '100%',
        label: 'Inscripciones online integradas',
        description: 'Todo el proceso de reserva ocurre en la web, sin fricción manual.',
      },
      {
        value: 'Optimizado',
        label: 'Contenido visual',
        description: 'Imágenes y vídeo con identidad potente, sin sacrificar velocidad de carga.',
      },
    ],
    categories: ['landing-page'],
    gridSpan: 'span-6',
    thumbLetter: 'R',
    thumbGradient: 2,
    cardSummary:
      'Web con personalidad, mucho contenido visual y un rendimiento técnico excepcional para promocionar e integrar inscripciones.',
    resultHighlight: '99/100 PageSpeed',
    resultIcon: 'clock',
  },
  {
    slug: 'vila-i-lancis',
    name: 'Vila i Lancis',
    displayName: 'Vila i Lancis · Rediseño completo y recuperación de accesos',
    displayNameHighlight: 'recuperación',
    url: 'vilalancis.com',
    eyebrow: 'Web para asesorías',
    sector: 'Asesoría fiscal, laboral y contable',
    location: 'La Roca del Vallès',
    date: '2024-12',
    challenge:
      'Trabajaba con una agencia que no respondía a sus peticiones de cambio, tenía la web cargada de plugins innecesarios y un diseño que no convertía. Para colmo, no tenían acceso a su propio WordPress — ni siquiera al panel de administración.',
    solution:
      'Rediseño completo con una web limpia, rápida y sin dependencias. Se entregó con todos los accesos a nombre del cliente — hosting, dominio y WordPress — y se trabajó el SEO local por ciudad para competir en un mercado saturado como Barcelona.',
    result:
      'Una web que representa la seriedad de la asesoría, que carga rápido y que por primera vez es realmente suya. Sin agencias intermediarias, sin plugins basura, sin pedir permiso para cambiar nada.',
    testimonial: {
      quote:
        'Trabajar con ella una gran experiencia y profesionalidad. Conoce muy bien el mercado.',
      quoteHighlight: 'gran experiencia y profesionalidad',
      author: 'Vila i Lancis',
    },
    image: '/assets/projects/vila-i-lancis.webp',
    heroImage: '/assets/projects/vila-i-lancis.webp',
    stats: [
      {
        value: '100%',
        label: 'Accesos recuperados',
        description: 'Hosting, dominio y WordPress de vuelta en manos del cliente.',
      },
      {
        value: '3',
        label: 'Idiomas (ES · CA · EN)',
        description: 'Web multilingüe para competir en un mercado saturado como Barcelona.',
      },
      {
        value: '0',
        label: 'Plugins innecesarios',
        description:
          'Web limpia y rápida, sin basura técnica ni agencias bloqueando cambios.',
      },
    ],
    categories: ['web-corporativa'],
    gridSpan: 'span-4',
    thumbLetter: 'V',
    thumbGradient: 8,
    cardSummary:
      'Migración limpia desde otra agencia, recuperación de accesos y rediseño que representa la seriedad de la asesoría.',
    resultHighlight: 'Accesos recuperados',
    resultIcon: 'lock',
  },
  {
    slug: 'lucia-nails-art',
    name: 'Lucía Nails Art',
    displayName: 'Lucía Nails Art · De invisible en Google a agenda llena',
    displayNameHighlight: 'agenda llena',
    url: 'lucianailsart.com',
    eyebrow: 'Web para peluquerías',
    sector: 'Centro de manicura y estética',
    location: 'Esparreguera, Barcelona',
    date: '2024-10',
    challenge:
      'Lucía tenía un negocio consolidado pero invisible en internet. Sin web, dependía del boca a boca para conseguir clientas nuevas y no aparecía en ninguna búsqueda local.',
    solution:
      'Diseñé y desarrollé su web desde cero, con un SEO local optimizado para que apareciera en las búsquedas de su zona. La web refleja la estética de su centro y facilita el contacto directo para reservas.',
    process:
      'Trabajamos en cuatro fases: investigación de keywords reales del sector y zona, propuesta de diseño con dos direcciones para que Lucía eligiera, desarrollo en WordPress sobre una base optimizada, y despliegue con todo el SEO técnico — schema LocalBusiness, sitemap, alt-text en imágenes, velocidad de carga por debajo de 1.5s en móvil. Al entregar, le enseñé a actualizar fotos y precios por su cuenta.',
    result:
      'Hoy Lucía aparece la primera en los resultados de Google en su área. Su agenda está llena y ha captado clientas que la encontraron directamente a través de la web.',
    diagnosis:
      'Sin web, sin Google Business Profile reclamado, sin reseñas online. Negocio invisible para todo el tráfico de descubrimiento local. Toda la captación dependía del WhatsApp personal de Lucía.',
    heroLede:
      'Lucía tenía un centro de manicura consolidado en Esparreguera pero sin presencia online. Diseñé y desarrollé su web desde cero, con SEO local optimizado para su zona. Hoy es la primera en Google y su agenda no tiene huecos.',
    stackLabel: 'WordPress',
    testimonial: {
      quote:
        'Gracias a la web he captado muchísimas clientas nuevas y tengo toda la agenda llena.',
      quoteHighlight: 'toda la agenda llena',
      author: 'Lucía Martínez',
      role: 'Lucía Nails Art · lucianailsart.com',
    },
    image: '/assets/projects/lucia-nails-art.webp',
    heroImage: '/assets/projects/lucia-nails-art.webp',
    techStack: [
      'WordPress 6',
      'Tema custom',
      'Schema.org LocalBusiness',
      'SEO local Esparreguera',
      'Google Business Profile',
      'Formulario reservas',
      'WebP responsive',
      'CDN + caché agresivo',
      'Lighthouse 98/100',
    ],
    stats: [
      {
        value: '#1',
        label: 'Posición Google',
        description: 'En búsquedas locales del área de Esparreguera para «manicura» y términos relacionados.',
      },
      {
        value: '100%',
        label: 'Ocupación de agenda',
        description:
          'Sin huecos disponibles. Las clientas reservan directamente desde la web sin intervención manual.',
      },
      {
        value: '0 → 1',
        label: 'Punto de partida',
        description: 'De cero presencia online a referencia local en su sector y zona geográfica.',
      },
    ],
    categories: [],
    gridSpan: 'featured',
    thumbLetter: 'L',
    thumbGradient: 1,
    cardSummary:
      'Lucía tenía un negocio consolidado pero invisible en internet. Diseñé y desarrollé su web desde cero, con un SEO local optimizado para que apareciera en las búsquedas de su zona. Hoy es la primera en Google en su área y su agenda está llena.',
    resultHighlight: '#1 en Google local · Agenda llena',
    resultIcon: 'pulse',
    narrative: {
      subtitle:
        'Cómo pasamos de un negocio invisible en internet a un referente local con la agenda llena, sin grandes campañas ni anuncios pagados.',
      blocks: [
        {
          id: 'reto',
          num: '01',
          navLabel: 'El reto',
          title: 'Un negocio consolidado, invisible en internet.',
          paragraphs: [
            'Lucía tenía un centro de manicura con una clientela fiel construida a base de boca a boca. Pero cuando alguien buscaba "manicura Esparreguera" en Google, no aparecía. Ni en los mapas, ni en los resultados orgánicos. Existía solo para quienes ya la conocían.',
            'El problema no era el servicio — era el techo. Sin presencia online, su crecimiento dependía exclusivamente de la recomendación entre amigas. Y eso es un techo bajo si quieres llenar una agenda completa todas las semanas.',
          ],
          figure: {
            label: 'Diagnóstico inicial',
            text: 'Sin web, sin Google Business Profile reclamado, sin reseñas online. Negocio invisible para todo el tráfico de descubrimiento local. Toda la captación dependía del WhatsApp personal de Lucía.',
          },
        },
        {
          id: 'propuesta',
          num: '02',
          navLabel: 'La propuesta',
          title: 'Una web que la encuentre Google primero.',
          paragraphs: [
            'La prioridad no era una web bonita — era una web que rankeara. Diseñé el sitio con dos focos paralelos: comunicar la estética del centro (cuidada, femenina, con personalidad) y atacar el SEO local desde el primer pixel.',
            'Eso significó estructurar el contenido alrededor de términos que las clientas potenciales escriben de verdad ("manicura semipermanente Esparreguera", "uñas acrílicas cerca de mí"), publicar fotos reales de los trabajos de Lucía para alimentar Google Business y simplificar el camino entre "veo la web" y "pido cita".',
          ],
        },
        {
          id: 'proceso',
          num: '03',
          navLabel: 'El proceso',
          title: 'De cero a online en cuatro semanas.',
          paragraphs: [
            'Trabajamos en cuatro fases: investigación de keywords reales del sector y zona, propuesta de diseño con dos direcciones para que Lucía eligiera, desarrollo en WordPress sobre una base optimizada, y despliegue con todo el SEO técnico — schema LocalBusiness, sitemap, alt-text en imágenes, velocidad de carga por debajo de 1.5s en móvil.',
            'Al entregar, le enseñé a Lucía a actualizar fotos y precios por su cuenta. La web es 100% suya — accesos, dominio y hosting a su nombre. Si mañana quiere irse, se va con todo.',
          ],
        },
        {
          id: 'resultado',
          num: '04',
          navLabel: 'El resultado',
          title: 'Primera en Google. Agenda llena.',
          paragraphs: [
            'Tres meses después del lanzamiento, Lucía aparecía en el primer resultado orgánico para sus búsquedas clave en su área. Las reservas empezaron a llegar solas, sin que ella tuviera que mover un dedo en redes sociales.',
            'Hoy su agenda está al 100% de ocupación todas las semanas, alimentada en gran parte por clientas que la encontraron directamente desde Google sin pasar por una recomendación. La web sigue trabajando 24 horas al día — y Lucía solo abre WhatsApp para confirmar citas.',
          ],
        },
      ],
    },
  },
];

/** Parte `displayName` para envolver la primera coincidencia de `phrase` en `<em>` (hero). */
export function splitDisplayNameHighlight(
  displayName: string,
  phrase?: string,
): { before: string; em: string; after: string } | null {
  if (!phrase?.trim()) return null;
  const i = displayName.indexOf(phrase);
  if (i === -1) return null;
  return {
    before: displayName.slice(0, i),
    em: phrase,
    after: displayName.slice(i + phrase.length),
  };
}

/** Total de proyectos — único mantenedor cuando cambie el array */
export const projectCount = projects.length;

/** Eyebrow «PORTFOLIO · N PROYECTOS» — home y página proyectos */
export const portfolioEyebrowLabel = `PORTFOLIO · ${projectCount} PROYECTOS`;

/** Proyectos en orden del grid de /proyectos/ */
export function getProjectsForListing(): Project[] {
  return projectsListingOrder
    .map(({ slug }) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => p !== undefined);
}

/** Conteo por categoría para filtros */
export function getProjectFilterCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: projectCount };
  for (const filter of projectFilters) {
    if (filter.id === 'all') continue;
    counts[filter.id] = projects.filter((p) => p.categories.includes(filter.id as ProjectCategory))
      .length;
  }
  return counts;
}

/** Sectores distintos en el portfolio */
export const distinctSectorCount = new Set(projects.map((p) => p.sector)).size;

/** Año visible a partir de `date` (YYYY-MM) */
export function projectYear(date: string): string {
  return date.slice(0, 4);
}

/** Subtítulo de la sección narrativa */
export function getProjectNarrativeSubtitle(project: Project): string {
  return (
    project.narrative?.subtitle ??
    'Cómo pasamos del punto de partida al resultado, sin grandes campañas ni atajos.'
  );
}

interface ProjectNarrativeMeta {
  titles: {
    reto: string;
    propuesta: string;
    proceso: string;
    resultado: string;
  };
  proceso: string[];
  reto?: string[];
  propuesta?: string[];
  resultado?: string[];
  figure?: ProjectNarrativeFigure;
}

const PROJECT_NARRATIVE_META: Record<string, ProjectNarrativeMeta> = {
  'ariadna-vilalta': {
    titles: {
      reto: 'Un perfil de experta sin la web que lo respaldara.',
      propuesta: 'Autoridad internacional antes que catálogo.',
      proceso: 'Estrategia, diseño y desarrollo alineados.',
      resultado: 'Por fin una web que la representa.',
    },
    proceso: [
      'Partimos del mensaje que Ariadna quería transmitir y lo tradujimos en una arquitectura de contenidos clara, sin ruido comercial innecesario.',
      'Diseño, desarrollo y revisión iterativa hasta que cada sección apuntara al mismo objetivo: que se le perciba como la referente que ya es en su sector.',
    ],
    resultado: [
      'Una web que por primera vez la representa como quiere ser percibida — con criterio, con personalidad y con el mensaje correcto para el público correcto.',
      'Hoy tiene una base digital coherente con su trayectoria como speaker y experta, lista para abrir puertas en contextos internacionales.',
    ],
  },
  supercapaces: {
    titles: {
      reto: 'Una web a medias y sin sistema de membresías.',
      propuesta: 'Plataforma lista para gestionar sola.',
      proceso: 'Membresías, automatizaciones y formación.',
      resultado: 'La tecnología dejó de ser un obstáculo.',
    },
    proceso: [
      'Finalizamos el desarrollo pendiente, implementamos el sistema de membresías y configuramos las automatizaciones de correo para los alumnos.',
      'Formación práctica al cliente para que pudiera gestionar cursos, usuarios y comunicaciones sin depender de soporte externo.',
    ],
    resultado: [
      'Una plataforma funcional que el cliente gestiona solo, con los cursos activos y las comunicaciones automatizadas.',
      'La tecnología dejó de ser un problema para convertirse en una herramienta al servicio de un proyecto con propósito muy claro.',
    ],
  },
  'fenix-internacional-360': {
    titles: {
      reto: 'Un propósito claro sin la web que lo transmitiera.',
      propuesta: 'Narrativa personal antes que venta agresiva.',
      proceso: 'Historia, diseño y lanzamiento con calidez.',
      resultado: 'Más de 20 madres acompañadas.',
    },
    proceso: [
      'Construimos la web desde cero con la historia personal de la fundadora como eje central, no sus servicios.',
      'Diseño y textos pensados para que una madre emprendedora se sienta identificada desde el primer scroll, con un tono humano y creíble.',
    ],
    resultado: [
      'Desde el lanzamiento ha acompañado a más de 20 madres emprendedoras a través de sus mentorías.',
      'Un proyecto donde la tecnología está al servicio de una causa real — y la web sigue siendo el punto de entrada a ese acompañamiento.',
    ],
  },
  'jlg-ki': {
    titles: {
      reto: 'WordPress.com limitaba su crecimiento.',
      propuesta: 'Migración a una web propia y escalable.',
      proceso: 'Asesoramiento, migración y rediseño.',
      resultado: 'Base sólida para seguir evolucionando.',
    },
    proceso: [
      'Asesoramiento para migrar a WordPress con hosting y dominio propios, con una arquitectura pensada para crecer sin las limitaciones de la plataforma anterior.',
      'Rediseño completo del sitio y entrega con todos los accesos a nombre del cliente — por primera vez, una web que es realmente suya.',
    ],
    resultado: [
      'Una base técnica sólida para seguir creciendo, con una relación de trabajo continua orientada a nuevos proyectos y mejoras progresivas.',
      'El cliente pasó de pagar por una solución limitada a tener control total sobre su presencia online.',
    ],
  },
  'de-cos': {
    titles: {
      reto: 'Tienda rota y agencia que no respondía.',
      propuesta: 'Rescate técnico y rediseño orientado a ventas.',
      proceso: 'Estabilización, rediseño y SEO.',
      resultado: '+67% de ventas mensuales.',
    },
    proceso: [
      'Lo primero fue rescatar y estabilizar la tienda antes de poder mejorarla — sin eso, cualquier rediseño habría sido cosmético.',
      'Rediseño completo, mejoras técnicas y SEO, con devolución de la propiedad total al cliente: accesos, hosting y dominio a su nombre.',
    ],
    resultado: [
      'La tienda pasó de 10-15 ventas mensuales en temporada alta a 25 — un crecimiento del 67% — impulsado por las 300 visitas mensuales orgánicas que genera la web.',
      'Actualmente aparece en los primeros resultados de Google para sus búsquedas clave, con una base técnica que ya no depende de terceros.',
    ],
  },
  'juancar-garma-reset7': {
    titles: {
      reto: 'Resultados reales sin página que los vendiera.',
      propuesta: 'Landing de venta directa sin distracciones.',
      proceso: 'Narrativa, diseño e integración de pago.',
      resultado: 'La web explica el método por él.',
    },
    proceso: [
      'Construimos una landing orientada a un único objetivo de conversión, con narrativa basada en casos de éxito reales de sus clientes.',
      'Integración de pago por Stripe y diseño moderno que habla el lenguaje de sus clientes potenciales — sin menús ni elementos que distraigan.',
    ],
    resultado: [
      'Una página que habla el lenguaje de sus clientes potenciales y convierte.',
      'Juan Carlos ya no tiene que explicar su método — la web lo hace por él mientras él se centra en sus clientes.',
    ],
  },
  'rock-zone-camp': {
    titles: {
      reto: 'Mucho contenido visual sin sacrificar velocidad.',
      propuesta: 'Identidad potente con inscripciones integradas.',
      proceso: 'Diseño, optimización y sistema de reservas.',
      resultado: '99/100 en PageSpeed.',
    },
    proceso: [
      'Diseño con identidad visual potente que transmite la energía del proyecto, con un sistema de inscripciones integrado desde el inicio.',
      'La optimización de rendimiento fue prioritaria en cada decisión — imágenes, vídeos y carga diferida para no lastrar la experiencia.',
    ],
    resultado: [
      'La web puntúa 99 sobre 100 en PageSpeed — un resultado excepcional para un sitio con tanto contenido visual.',
      'Carga rápido, convierte bien y el cliente no ha dejado de crecer desde el lanzamiento.',
    ],
  },
  'vila-i-lancis': {
    titles: {
      reto: 'Agencia ausente y sin acceso a su WordPress.',
      propuesta: 'Rediseño limpio y SEO local por ciudad.',
      proceso: 'Migración, rediseño y recuperación de accesos.',
      resultado: 'Una web que por fin es suya.',
    },
    proceso: [
      'Rediseño completo con una web limpia, rápida y sin dependencias innecesarias — eliminando plugins que no aportaban valor.',
      'Recuperación de todos los accesos a nombre del cliente y trabajo de SEO local por ciudad para competir en un mercado saturado como Barcelona.',
    ],
    resultado: [
      'Una web que representa la seriedad de la asesoría, que carga rápido y que por primera vez es realmente suya.',
      'Sin agencias intermediarias, sin plugins basura, sin pedir permiso para cambiar nada.',
    ],
  },
};

function splitIntoParagraphs(text: string): string[] {
  const parts = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) return parts;
  if (parts.length === 1) {
    const sentences = parts[0].match(/[^.!?…]+[.!?…]+/gu) ?? [parts[0]];
    if (sentences.length >= 2) {
      const mid = Math.ceil(sentences.length / 2);
      return [
        sentences.slice(0, mid).join('').trim(),
        sentences.slice(mid).join('').trim(),
      ];
    }
    return parts;
  }
  return [text.trim()];
}

function buildDefaultNarrativeBlocks(project: Project): ProjectNarrativeBlock[] {
  const meta = PROJECT_NARRATIVE_META[project.slug];
  const titles = meta?.titles ?? {
    reto: 'El punto de partida.',
    propuesta: 'La propuesta.',
    proceso: 'El proceso.',
    resultado: 'El resultado.',
  };

  const retoParagraphs = meta?.reto ?? splitIntoParagraphs(project.challenge);
  const propuestaParagraphs = meta?.propuesta ?? splitIntoParagraphs(project.solution);
  const procesoParagraphs =
    meta?.proceso ??
    (project.process
      ? splitIntoParagraphs(project.process)
      : [
          'El trabajo se organizó en fases claras: diagnóstico, propuesta, desarrollo y entrega con todo bajo el control del cliente.',
          'Al cerrar el proyecto, quedó documentado cómo actualizar contenidos y con todos los accesos a su nombre.',
        ]);
  const resultadoParagraphs = meta?.resultado ?? splitIntoParagraphs(project.result);

  const figure =
    meta?.figure ??
    (project.diagnosis
      ? { label: 'Diagnóstico inicial', text: project.diagnosis }
      : undefined);

  return [
    {
      id: 'reto',
      num: '01',
      navLabel: 'El reto',
      title: titles.reto,
      paragraphs: retoParagraphs,
      figure,
    },
    {
      id: 'propuesta',
      num: '02',
      navLabel: 'La propuesta',
      title: titles.propuesta,
      paragraphs: propuestaParagraphs,
    },
    {
      id: 'proceso',
      num: '03',
      navLabel: 'El proceso',
      title: titles.proceso,
      paragraphs: procesoParagraphs,
    },
    {
      id: 'resultado',
      num: '04',
      navLabel: 'El resultado',
      title: titles.resultado,
      paragraphs: resultadoParagraphs,
    },
  ];
}

/** Bloques narrativos del caso de estudio — siempre 4 pasos */
export function getProjectNarrativeBlocks(project: Project): ProjectNarrativeBlock[] {
  if (project.narrative?.blocks.length === 4) {
    return project.narrative.blocks;
  }
  return buildDefaultNarrativeBlocks(project);
}

/** Siguiente según orden del array (índice más alto = más antiguo); navegación cíclica */
export function getNextProject(currentSlug: string): Project {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const i = index >= 0 ? index : 0;
  return projects[(i + 1) % projects.length];
}

/** Anterior según orden del array; navegación cíclica */
export function getPrevProject(currentSlug: string): Project {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const i = index >= 0 ? index : 0;
  return projects[(i - 1 + projects.length) % projects.length];
}

/** Siguiente en el grid de /proyectos/ */
export function getNextProjectInListing(currentSlug: string): Project {
  const slugs = projectsListingOrder.map((p) => p.slug);
  const i = slugs.indexOf(currentSlug);
  const index = i >= 0 ? i : 0;
  const nextSlug = slugs[(index + 1) % slugs.length];
  return projects.find((p) => p.slug === nextSlug) ?? projects[0];
}

/** Anterior en el grid de /proyectos/ */
export function getPrevProjectInListing(currentSlug: string): Project {
  const slugs = projectsListingOrder.map((p) => p.slug);
  const i = slugs.indexOf(currentSlug);
  const index = i >= 0 ? i : 0;
  const prevSlug = slugs[(index - 1 + slugs.length) % slugs.length];
  return projects.find((p) => p.slug === prevSlug) ?? projects[0];
}

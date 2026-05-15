export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  displayName: string;
  /** Fragmento exacto de `displayName` para destacarlo en el hero (italic + degradado azul). */
  displayNameHighlight?: string;
  url: string;
  eyebrow: string;
  sector: string;
  location: string;
  /** YYYY-MM — uso interno para ordenar; no se muestra en UI */
  date: string;
  challenge: string;
  solution: string;
  result: string;
  testimonial?: {
    quote: string;
    author: string;
  };
  image: string;
  stats: ProjectStat[];
  /** Hero 16:9 — mismo archivo que image hasta tener variantes dedicadas */
  heroImage?: string;
}

/** Orden cronológico inverso (más reciente primero) */
export const projects: Project[] = [
  {
    slug: 'ariadna-vilalta',
    name: 'Ariadna Vilalta',
    displayName: 'Ariadna Vilalta · Plataforma de autoridad para una speaker internacional',
    displayNameHighlight: 'autoridad',
    url: 'ariadnavilalta.com',
    eyebrow: 'WEB PARA PSICÓLOGOS',
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
      author: 'Ariadna Vilalta',
    },
    image: '/assets/projects/ariadna-vilalta.webp',
    heroImage: '/assets/projects/ariadna-vilalta.webp',
    stats: [
      { value: 'Internacional', label: 'Posicionamiento como speaker' },
      { value: 'Autoridad', label: 'Más que catálogo de servicios' },
      { value: '1ª', label: 'Web que la representa de verdad' },
    ],
  },
  {
    slug: 'supercapaces',
    name: 'SuperCapaces',
    displayName: 'SuperCapaces · Plataforma de cursos lista para autogestionarse',
    displayNameHighlight: 'autogestionarse',
    url: 'supercapaces.com',
    eyebrow: 'PLATAFORMA DE CURSOS',
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
      author: 'Carlos Pons',
    },
    image: '/assets/projects/supercapaces.webp',
    heroImage: '/assets/projects/supercapaces.webp',
    stats: [
      { value: '100%', label: 'Gestión autónoma del cliente' },
      { value: 'Auto', label: 'Automatizaciones de email activas' },
      { value: 'Escalable', label: 'Sistema de membresías' },
    ],
  },
  {
    slug: 'fenix-internacional-360',
    name: 'Fénix',
    displayName: 'Fénix · Una web narrativa con propósito real',
    displayNameHighlight: 'propósito real',
    url: 'fenixinternacional360.com',
    eyebrow: 'WEB CON PROPÓSITO',
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
      { value: '+20', label: 'Madres acompañadas' },
      { value: 'Internacional', label: 'Alcance del proyecto' },
      { value: 'Narrativa', label: 'Historia personal como eje' },
    ],
  },
  {
    slug: 'jlg-ki',
    name: 'JLG K&I',
    displayName: 'JLG K&I · De WordPress.com a una web propia y escalable',
    displayNameHighlight: 'propia',
    url: 'jlgki.com',
    eyebrow: 'WEB CORPORATIVA',
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
      author: 'Josep Linde',
    },
    image: '/assets/projects/jlg-ki.webp',
    heroImage: '/assets/projects/jlg-ki.webp',
    stats: [
      { value: '100%', label: 'Propiedad recuperada' },
      { value: 'Continua', label: 'Relación de trabajo' },
      { value: '∞', label: 'Capacidad de evolucionar' },
    ],
  },
  {
    slug: 'de-cos',
    name: 'de Cos',
    displayName: 'de Cos · Rescate técnico y +67% de ventas mensuales',
    displayNameHighlight: '+67%',
    url: 'decos.es',
    eyebrow: 'TIENDA ONLINE',
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
      author: 'Maria Jose',
    },
    image: '/assets/projects/de-cos.webp',
    heroImage: '/assets/projects/de-cos.webp',
    stats: [
      { value: '+67%', label: 'Ventas mensuales' },
      { value: '300', label: 'Visitas orgánicas al mes' },
      { value: 'Top', label: 'En Google para keywords clave' },
    ],
  },
  {
    slug: 'juancar-garma-reset7',
    name: 'Juancar Garma / RESET7',
    displayName: 'Juancar Garma · Landing de ventas que convierte sola',
    displayNameHighlight: 'convierte',
    url: 'juancargarma.com/reset7',
    eyebrow: 'WEB PARA ENTRENADORES',
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
      author: 'Juan Carlos García',
    },
    image: '/assets/projects/juancar-garma-reset7.webp',
    heroImage: '/assets/projects/juancar-garma-reset7.webp',
    stats: [
      { value: '1', label: 'Único objetivo de conversión' },
      { value: 'Stripe', label: 'Pago integrado' },
      { value: '7 días', label: 'Reto vendido sin explicaciones' },
    ],
  },
  {
    slug: 'rock-zone-camp',
    name: 'Rock Zone Camp',
    displayName: 'Rock Zone Camp · Identidad potente con rendimiento 99/100',
    displayNameHighlight: '99/100',
    url: 'rockzonecamp.com',
    eyebrow: 'EVENTOS Y CAMPAMENTOS',
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
      author: 'Fura Aria',
    },
    image: '/assets/projects/rock-zone-camp.webp',
    heroImage: '/assets/projects/rock-zone-camp.webp',
    stats: [
      { value: '99/100', label: 'Puntuación PageSpeed' },
      { value: '100%', label: 'Inscripciones online integradas' },
      { value: 'Multi', label: 'Vídeo e imagen sin lastrar' },
    ],
  },
  {
    slug: 'vila-i-lancis',
    name: 'Vila i Lancis',
    displayName: 'Vila i Lancis · Rediseño completo y recuperación de accesos',
    displayNameHighlight: 'recuperación',
    url: 'vilalancis.com',
    eyebrow: 'WEB PARA ASESORÍAS',
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
      author: 'Vila i Lancis',
    },
    image: '/assets/projects/vila-i-lancis.webp',
    heroImage: '/assets/projects/vila-i-lancis.webp',
    stats: [
      { value: '100%', label: 'Accesos recuperados' },
      { value: '3', label: 'Idiomas (ES · CA · EN)' },
      { value: 'Sin', label: 'Plugins basura ni agencias' },
    ],
  },
  {
    slug: 'lucia-nails-art',
    name: 'Lucía Nails Art',
    displayName: 'Lucía Nails Art · De invisible en Google a agenda llena',
    displayNameHighlight: 'agenda llena',
    url: 'lucianailsart.com',
    eyebrow: 'WEB PARA PELUQUERÍAS',
    sector: 'Centro de manicura y estética',
    location: 'Esparreguera, Barcelona',
    date: '2024-10',
    challenge:
      'Lucía tenía un negocio consolidado pero invisible en internet. Sin web, dependía del boca a boca para conseguir clientas nuevas y no aparecía en ninguna búsqueda local.',
    solution:
      'Diseñé y desarrollé su web desde cero, con un SEO local optimizado para que apareciera en las búsquedas de su zona. La web refleja la estética de su centro y facilita el contacto directo para reservas.',
    result:
      'Hoy Lucía aparece la primera en los resultados de Google en su área. Su agenda está llena y ha captado clientas que la encontraron directamente a través de la web.',
    testimonial: {
      quote:
        'Gracias a eso he captado muchísimas clientas y tengo toda la agenda llena.',
      author: 'Lucía Martínez',
    },
    image: '/assets/projects/lucia-nails-art.webp',
    heroImage: '/assets/projects/lucia-nails-art.webp',
    stats: [
      { value: '#1', label: 'En Google local de su área' },
      { value: '100%', label: 'Agenda llena' },
      { value: '0 → 1', label: 'De ninguna web a referencia local' },
    ],
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

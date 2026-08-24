import type { Service } from './services';
import type { ServiceDetailContent } from './serviceDetails';

export const wordpressLandingSeo = {
  title: 'Desarrollo web WordPress para negocios en España · RimoByte',
  description:
    'Desarrollo web WordPress a medida para negocios en España, desde 600€. Freelance, presupuesto cerrado, tu web a tu nombre. Sin agencia, sin plantillas, sin letra pequeña.',
} as const;

export const wordpressLandingService: Service = {
  slug: 'desarrollo-web-wordpress',
  name: 'Desarrollo web WordPress',
  eyebrow: 'DESARROLLO WEB WORDPRESS',
  headline: 'Desarrollo web WordPress a medida para negocios',
  headlineEm: 'en España.',
  description:
    'Soy Flor Rímolo, desarrolladora WordPress freelance. Diseño y programo webs a medida para autónomos y pymes en España: tuyas desde el primer día, pensadas para que te encuentren en Google.',
  ctaPrimary: 'Pide tu presupuesto',
  ctaSecondary: 'Ver servicios',
  checks: ['WordPress a medida', 'Desde 600€', 'Freelance en España'],
  illustration: 'corporate',
  targetAudience: [
    'Quieres una web WordPress profesional, no un constructor tipo Wix',
    'Buscas una desarrolladora freelance, no una agencia con cuenta de proyecto',
    'Tu web actual está desactualizada o no es tuya de verdad',
    'Quieres aparecer en Google cuando alguien busca tu negocio en España',
  ],
  features: [],
  price: 'Desde 600€',
  priceNote: 'Dominio y servidor los contratas tú. Son tuyos, no míos.',
  relatedCases: [],
  faqs: [
    {
      question: '¿Eres programadora WordPress o usas plantillas?',
      answer:
        'Desarrollo WordPress a medida: diseño propio, estructura pensada para tu negocio y plugins solo los necesarios. No monto temas genéricos con tu logo encima.',
    },
    {
      question: '¿Trabajas como freelance o a través de una agencia?',
      answer:
        'Freelance. Hablas conmigo, diseño yo, programo yo y te respondo yo. Sin equipos que rotan ni intermediarios.',
    },
    {
      question: '¿Cuánto tarda una web WordPress?',
      answer:
        'Una web corporativa, entre 3 y 4 semanas desde que tengo el contenido. Una tienda WooCommerce, entre 4 y 6 semanas.',
    },
    {
      question: '¿La web es mía al entregarla?',
      answer:
        'Sí. Dominio, servidor y WordPress van a tu nombre. Te doy acceso de administrador. Si un día quieres irte, te llevas todo.',
    },
    {
      question: '¿Sirve si ahora tengo Wix, WordPress.com o una web de agencia?',
      answer:
        'Sí. Puedo migrar o rediseñar. Primero reviso qué tienes y te digo si merece la pena conservar algo o empezar de cero.',
    },
    {
      question: '¿Haces también tiendas y mantenimiento?',
      answer:
        'Sí. Tienda WooCommerce desde 1.200€ y mantenimiento WordPress desde 50€/mes, sin permanencia. El detalle está en cada ficha de servicio.',
      answerHtml:
        'Sí. <a href="/servicios/tienda-online/">Tienda WooCommerce</a> desde 1.200€ y <a href="/servicios/mantenimiento-web/">mantenimiento WordPress</a> desde 50€/mes, sin permanencia. La ficha de producto de la web corporativa está en <a href="/servicios/web-corporativa/">web corporativa</a>.',
    },
  ],
  ctaFinal: {
    title: '¿Hacemos tu web',
    titleEm: 'en WordPress?',
    text: 'Cuéntame tu negocio. En menos de 24 horas te respondo con una propuesta concreta.',
    cta: 'Pide tu presupuesto',
  },
  seo: wordpressLandingSeo,
};

export const wordpressLandingDetail: ServiceDetailContent = {
  anchorId: 'desarrollo-web-wordpress',
  heroPills: ['WordPress a medida', 'Freelance · España'],
  heroLede:
    'Webs WordPress para negocios locales que quieren captar clientes en Google — no una plantilla, no una agencia que se queda con los accesos. Presupuesto cerrado desde 600€.',
  metaAside: [
    { label: 'Precio', value: 'desde 600€', gradient: true },
    { label: 'Plazo', value: '3–5 semanas' },
    { label: 'CMS', value: 'WordPress' },
    { label: 'Dónde', value: 'España' },
    { label: 'Modelo', value: 'Freelance' },
    { label: 'Propiedad', value: 'Tuya al entregar' },
  ],
  includesIntro: {
    title: 'Qué incluye el',
    titleEm: 'desarrollo WordPress.',
    description:
      'Lo mismo que pides cuando buscas una desarrolladora WordPress: una web tuya, rápida, editable y lista para posicionar. Sin letra pequeña.',
  },
  includes: [
    {
      icon: 'design',
      title: 'Diseño a medida, no plantilla',
      description: 'Dos propuestas visuales. WordPress configurado para tu marca, no un tema de catálogo.',
      extra: 'Revisión en fase de diseño',
    },
    {
      icon: 'search',
      title: 'SEO de partida',
      description: 'Títulos, estructura, velocidad y schema. Base para que Google te encuentre en España.',
      extra: 'Google Business Profile conectado',
    },
    {
      icon: 'layout',
      title: 'WordPress que puedes editar',
      description: 'Textos e imágenes desde el panel, sin tocar código. Formación incluida al entregar.',
      extra: 'Usuario administrador tuyo',
    },
    {
      icon: 'speed',
      title: 'Rendimiento y seguridad',
      description: 'Pocos plugins, caché, copias y una base limpia. Lighthouse 95+ de partida.',
      extra: 'Sin Frankenstein de extensiones',
    },
    {
      icon: 'form',
      title: 'Contacto que convierte',
      description: 'Formulario anti-spam, avisos a tu correo y WhatsApp opcional.',
      extra: 'Sin depender de Instagram',
    },
    {
      icon: 'training',
      title: 'Migración o web nueva',
      description: 'Desde cero, rediseño o salida de Wix / agencia. Te digo qué tiene sentido antes de presupuestar.',
      extra: 'Accesos a tu nombre',
    },
  ],
  fit: {
    yes: {
      pill: 'Encaja contigo',
      title: 'Es para ti si…',
      items: [
        'Quieres una web WordPress profesional para tu negocio en España',
        'Prefieres una freelance a una agencia con procesos y rotación',
        'Vienes de Wix, una plantilla o una web que no controlas',
        'Te importa aparecer en Google, no solo «tener página»',
        'Quieres precio cerrado y la web a tu nombre',
      ],
    },
    no: {
      pill: 'Mejor otro camino',
      title: 'No encajamos si…',
      items: [
        'Quieres arrastrar bloques tú en Wix o Squarespace',
        'Buscas la web más barata sin importar el resultado',
        'Necesitas la web para ayer — los plazos realistas son semanas',
        'Quieres vender productos: eso es tienda WooCommerce, y también la hago',
        'No quieres WordPress y buscas otro CMS',
      ],
    },
  },
  processIntro: {
    title: 'Cómo trabajo el',
    titleEm: 'proyecto WordPress.',
    description:
      'Un solo interlocutor. Presupuesto por escrito. Entregas que puedes ver antes de publicar.',
  },
  relatedTitle: 'Webs WordPress',
  relatedTitleEm: 'ya entregadas.',
  relatedSlugs: ['vila-i-lancis', 'lucia-nails-art', 'ariadna-vilalta'],
  pricingDetail: {
    label: 'Desarrollo web WordPress',
    amount: '600€',
    amountSub: 'Web corporativa · precio cerrado',
    features: [
      'Diseño a medida (2 propuestas)',
      'WordPress configurado y optimizado',
      'Hasta 8 páginas',
      'SEO local de partida',
      'Formulario de contacto',
      'Formación en vivo',
      'Dominio y servidor a tu nombre',
    ],
    extras: [
      {
        name: 'Web corporativa (ficha)',
        detail: 'Qué incluye página a página',
        price: 'desde 600€',
        href: '/servicios/web-corporativa/',
      },
      {
        name: 'Tienda WooCommerce',
        detail: 'Catálogo, pagos, pedidos',
        price: 'desde 1.200€',
        href: '/servicios/tienda-online/',
      },
      {
        name: 'Plataforma de cursos',
        detail: 'WordPress + LMS',
        price: 'desde 1.000€',
        href: '/web-para-cursos/',
      },
      {
        name: 'Mantenimiento WordPress',
        detail: 'Sin permanencia',
        price: 'desde 50€/mes',
        href: '/servicios/mantenimiento-web/',
      },
    ],
    cta: 'Pedir presupuesto cerrado',
  },
  faqTitle: 'WordPress,',
  faqTitleEm: 'sin rodeos.',
  ctaTitle: '¿Hacemos tu web',
  ctaTitleEm: 'en WordPress?',
  hubIdealFor: [],
};

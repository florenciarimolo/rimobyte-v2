import type { ServiceProcessStep } from './servicesHub';

export type ServiceIncludeIcon =
  | 'design'
  | 'search'
  | 'speed'
  | 'layout'
  | 'form'
  | 'training'
  | 'cart'
  | 'payment'
  | 'shipping'
  | 'inventory'
  | 'security'
  | 'support'
  | 'updates'
  | 'backup'
  | 'monitoring'
  | 'reports';

export interface ServiceMetaRow {
  label: string;
  value: string;
  gradient?: boolean;
}

export interface ServiceIncludeItem {
  icon: ServiceIncludeIcon;
  title: string;
  description: string;
  extra: string;
}

export interface ServiceFitCard {
  pill: string;
  title: string;
  items: string[];
}

export interface PricingExtra {
  name: string;
  detail?: string;
  price: string;
}

export interface ServiceDetailContent {
  heroPills: string[];
  heroLede: string;
  metaAside: ServiceMetaRow[];
  includesIntro: {
    title: string;
    titleEm: string;
    description: string;
  };
  includes: ServiceIncludeItem[];
  fit: {
    yes: ServiceFitCard;
    no: ServiceFitCard;
  };
  processIntro: {
    title: string;
    titleEm: string;
    description: string;
  };
  /** Pasos del proceso; si no se define, se usan los de proyecto web nuevo. */
  processSteps?: ServiceProcessStep[];
  relatedTitle: string;
  relatedTitleEm: string;
  relatedSlugs: string[];
  pricingDetail: {
    label: string;
    amount: string;
    amountSub?: string;
    features: string[];
    extras: PricingExtra[];
    cta: string;
  };
  faqTitle: string;
  faqTitleEm: string;
  ctaTitle: string;
  ctaTitleEm: string;
  hubIdealFor: string[];
  hubFeatured?: boolean;
  hubTag?: string;
  anchorId: string;
}

export const serviceDetailBySlug: Record<string, ServiceDetailContent> = {
  'web-corporativa': {
    anchorId: 'web-corporativa',
    heroPills: ['Web corporativa', 'WordPress · A medida'],
    heroLede:
      'La web que te presenta en Google, transmite confianza y convierte visitas en contactos — sin depender de Instagram ni de plataformas que cambian las reglas.',
    metaAside: [
      { label: 'Precio', value: 'desde 600€', gradient: true },
      { label: 'Plazo', value: '3–5 semanas' },
      { label: 'CMS', value: 'WordPress' },
      { label: 'Páginas', value: 'Hasta 8 incluidas' },
      { label: 'SEO local', value: 'Incluido' },
      { label: 'Formación', value: '1 sesión incluida' },
    ],
    includesIntro: {
      title: 'Qué incluye',
      titleEm: 'tu web corporativa.',
      description:
        'Todo lo que necesitas para salir al mundo con una web profesional, rápida y que puedas gestionar tú. Sin sorpresas en el presupuesto.',
    },
    includes: [
      {
        icon: 'design',
        title: 'Diseño a medida',
        description: 'Dos propuestas visuales adaptadas a tu marca. Sin plantillas genéricas.',
        extra: 'Revisión ilimitada en fase de diseño',
      },
      {
        icon: 'search',
        title: 'SEO local',
        description: 'Estructura, metadatos y schema para que te encuentren en tu zona.',
        extra: 'Google Business Profile conectado',
      },
      {
        icon: 'speed',
        title: 'Rendimiento',
        description: 'Código limpio, imágenes optimizadas y caché configurada.',
        extra: 'Lighthouse 95+ garantizado',
      },
      {
        icon: 'layout',
        title: 'Hasta 8 páginas',
        description: 'Inicio, servicios, sobre mí, contacto y las que necesites.',
        extra: 'Páginas extra: 60€/ud',
      },
      {
        icon: 'form',
        title: 'Formulario de contacto',
        description: 'Con protección anti-spam y notificaciones a tu email.',
        extra: 'Integración con WhatsApp opcional',
      },
      {
        icon: 'training',
        title: 'Formación incluida',
        description: 'Sesión en vivo para que edites textos e imágenes sin miedo.',
        extra: 'Vídeo de referencia grabado',
      },
    ],
    fit: {
      yes: {
        pill: 'Encaja contigo',
        title: 'Es para ti si…',
        items: [
          'Tienes un negocio local y quieres que te encuentren en Google',
          'Necesitas transmitir profesionalidad más allá de Instagram',
          'Quieres editar textos e imágenes tú sin depender de nadie',
          'Buscas un presupuesto cerrado sin sorpresas a mitad de proyecto',
          'Valoras tener a la misma persona en diseño, desarrollo y SEO',
        ],
      },
      no: {
        pill: 'Mejor otro camino',
        title: 'No encajamos si…',
        items: [
          'Quieres vender productos online (necesitas tienda WooCommerce)',
          'Buscas la opción más barata del mercado sin importar el resultado',
          'Necesitas la web mañana — los plazos realistas son 3–5 semanas',
          'Quieres un constructor tipo Wix donde arrastras bloques tú solo',
          'No tienes claro qué quieres comunicar y no quieres pensarlo',
        ],
      },
    },
    processIntro: {
      title: 'Cómo trabajamos',
      titleEm: 'paso a paso.',
      description:
        'El mismo proceso en cada proyecto: sin sorpresas, con presupuesto cerrado y sin que tengas que perseguir nada.',
    },
    relatedTitle: 'Proyectos de',
    relatedTitleEm: 'web corporativa.',
    relatedSlugs: ['vila-i-lancis', 'ariadna-vilalta', 'juancar-garma-reset7'],
    pricingDetail: {
      label: 'Web corporativa',
      amount: '600€',
      amountSub: 'Precio cerrado · hasta 8 páginas',
      features: [
        'Diseño a medida (2 propuestas)',
        'WordPress configurado y optimizado',
        'SEO local + Google Business Profile',
        'Formulario de contacto',
        'Rendimiento Lighthouse 95+',
        'Formación en vivo (1 sesión)',
        '30 días de soporte post-lanzamiento',
      ],
      extras: [
        { name: 'Página adicional', detail: 'Misma calidad y SEO', price: '60€/ud' },
        { name: 'Redacción de contenidos', detail: 'Por página, tono de marca', price: '60€/ud' },
        { name: 'Fotos de stock', detail: 'Selección y optimización para tu web', price: 'A consultar' },
        { name: 'Mantenimiento mensual', detail: 'Actualizaciones + soporte', price: 'desde 50€/mes' },
      ],
      cta: 'Pedir presupuesto cerrado',
    },
    faqTitle: 'Sobre la',
    faqTitleEm: 'web corporativa.',
    ctaTitle: '¿Empezamos por',
    ctaTitleEm: 'tu web?',
    hubIdealFor: [
      'Negocios locales que quieren aparecer en Google',
      'Profesionales que necesitan más allá de Instagram',
      'Presupuesto cerrado sin sorpresas',
    ],
    hubFeatured: false,
  },
  'tienda-online': {
    anchorId: 'tienda-online',
    heroPills: ['Tienda online', 'WooCommerce · A medida'],
    heroLede:
      'Vende tus productos con una tienda propia, sin comisiones de marketplace ni depender de plataformas que cambian las reglas cuando quieren.',
    metaAside: [
      { label: 'Precio', value: 'desde 1.200€', gradient: true },
      { label: 'Plazo', value: '4–8 semanas' },
      { label: 'CMS', value: 'WooCommerce' },
      { label: 'Productos', value: 'Hasta 30 incluidos' },
      { label: 'Pagos', value: 'Stripe / Redsys' },
      { label: 'Formación', value: '2 sesiones incluidas' },
    ],
    includesIntro: {
      title: 'Qué incluye',
      titleEm: 'tu tienda online.',
      description:
        'Todo lo necesario para vender con confianza: catálogo, pagos, envíos y una experiencia de compra que no te avergüenza compartir.',
    },
    includes: [
      {
        icon: 'design',
        title: 'Diseño de tienda a medida',
        description: 'Interfaz de compra pensada para tu marca y tu tipo de producto.',
        extra: 'Optimizada para móvil primero',
      },
      {
        icon: 'cart',
        title: 'Catálogo WooCommerce',
        description: 'Hasta 30 productos cargados con variantes, categorías y filtros.',
        extra: 'Productos extra: 10€/ud',
      },
      {
        icon: 'payment',
        title: 'Pasarela de pago',
        description: 'Stripe, Redsys o la que uses en tu negocio, configurada y probada.',
        extra: 'Bizum y transferencia opcionales',
      },
      {
        icon: 'shipping',
        title: 'Envíos y tarifas',
        description: 'Zonas, pesos y transportistas configurados según tu operativa.',
        extra: 'Integración con Correos / SEUR',
      },
      {
        icon: 'search',
        title: 'SEO para productos',
        description: 'URLs, metadatos y schema de producto para Google Shopping.',
        extra: 'Feed para Google Merchant',
      },
      {
        icon: 'training',
        title: 'Formación en gestión',
        description: 'Dos sesiones: catálogo, pedidos y promociones sin miedo.',
        extra: 'Manual de referencia en vídeo',
      },
    ],
    fit: {
      yes: {
        pill: 'Encaja contigo',
        title: 'Es para ti si…',
        items: [
          'Vendes productos físicos o digitales y quieres tu propia tienda',
          'Estás harto de comisiones de Etsy, Amazon o marketplaces',
          'Necesitas control total sobre precios, stock y experiencia de compra',
          'Quieres integrar pagos y envíos con tu operativa real',
          'Buscas escalar sin rehacer la web cada dos años',
        ],
      },
      no: {
        pill: 'Mejor otro camino',
        title: 'No encajamos si…',
        items: [
          'Solo necesitas una web informativa sin venta online',
          'Tienes menos de 10 productos y un Instagram bien gestionado te basta',
          'Buscas dropshipping automatizado sin tocar nada',
          'Necesitas marketplace multi-vendedor (tipo Amazon)',
          'El presupuesto no llega a 1.200€ — mejor empezar por web corporativa',
        ],
      },
    },
    processIntro: {
      title: 'Cómo trabajamos',
      titleEm: 'tu tienda.',
      description:
        'Mismo método que en webs corporativas, con fases extra de catálogo, pagos y pruebas de compra antes de publicar.',
    },
    relatedTitle: 'Tiendas que',
    relatedTitleEm: 'ya venden.',
    relatedSlugs: ['de-cos'],
    pricingDetail: {
      label: 'Tienda online',
      amount: '1.200€',
      amountSub: 'Precio cerrado · hasta 30 productos',
      features: [
        'Diseño de tienda a medida',
        'WooCommerce configurado y optimizado',
        'Hasta 30 productos cargados',
        'Pasarela de pago (Stripe / Redsys)',
        'Configuración de envíos',
        'SEO de producto + schema',
        '2 sesiones de formación',
        '30 días de soporte post-lanzamiento',
      ],
      extras: [
        { name: 'Producto adicional', detail: 'Carga con fotos y variantes', price: '10€/ud' },
        { name: 'Integración ERP', detail: 'Sincronización de stock', price: 'A consultar' },
        { name: 'Suscripciones', detail: 'WooCommerce Subscriptions', price: 'A consultar' },
        { name: 'Mantenimiento mensual', detail: 'Actualizaciones + soporte', price: 'desde 80€/mes' },
      ],
      cta: 'Pedir presupuesto de tienda',
    },
    faqTitle: 'Sobre la',
    faqTitleEm: 'tienda online.',
    ctaTitle: '¿Montamos',
    ctaTitleEm: 'tu tienda?',
    hubIdealFor: [
      'Vender sin comisiones de marketplace',
      'Control total de catálogo y precios',
      'Pagos y envíos integrados',
    ],
    hubFeatured: true,
    hubTag: 'Más demandado',
  },
  'mantenimiento-web': {
    anchorId: 'mantenimiento',
    heroPills: ['Mantenimiento', 'WordPress · Sin permanencia'],
    heroLede:
      'Tu web actualizada, segura y rápida sin que tengas que pensar en plugins, copias de seguridad ni actualizaciones que rompen cosas.',
    metaAside: [
      { label: 'Precio', value: 'desde 50€/mes', gradient: true },
      { label: 'Contrato', value: 'Sin permanencia' },
      { label: 'CMS', value: 'WordPress' },
      { label: 'Soporte', value: 'Email + WhatsApp' },
      { label: 'Copias', value: 'Diarias' },
      { label: 'Cambios', value: 'Pequeños incluidos' },
    ],
    includesIntro: {
      title: 'Qué incluye',
      titleEm: 'el mantenimiento.',
      description:
        'Delega lo técnico y dedícate a tu negocio. Todo lo que una web WordPress necesita para estar sana, sin contratos que te atan.',
    },
    includes: [
      {
        icon: 'updates',
        title: 'Actualizaciones seguras',
        description: 'WordPress, tema y plugins actualizados con pruebas previas.',
        extra: 'Rollback si algo falla',
      },
      {
        icon: 'backup',
        title: 'Copias de seguridad',
        description: 'Backup diario automático almacenado fuera del servidor.',
        extra: 'Restauración en menos de 24h',
      },
      {
        icon: 'security',
        title: 'Seguridad activa',
        description: 'Firewall, escaneo de malware y bloqueo de intentos de acceso.',
        extra: 'Limpieza incluida si hay incidente',
      },
      {
        icon: 'monitoring',
        title: 'Monitorización 24/7',
        description: 'Alertas si la web cae o ralentiza. Actúo antes de que lo notes.',
        extra: 'Informe mensual de uptime',
      },
      {
        icon: 'support',
        title: 'Soporte directo',
        description: 'Me escribes por email o WhatsApp y te respondo yo, no un ticket anónimo.',
        extra: 'Respuesta en menos de 24h',
      },
      {
        icon: 'reports',
        title: 'Cambios menores',
        description: 'Textos, imágenes y ajustes pequeños incluidos cada mes.',
        extra: 'Cambios grandes: presupuesto aparte',
      },
    ],
    fit: {
      yes: {
        pill: 'Encaja contigo',
        title: 'Es para ti si…',
        items: [
          'Ya tienes una web WordPress y no quieres tocar lo técnico',
          'Te preocupa la seguridad o has sufrido un hackeo',
          'Necesitas alguien de confianza al otro lado del teléfono',
          'Quieres actualizaciones sin el miedo de que algo se rompa',
          'Prefieres pagar mes a mes sin permanencia',
        ],
      },
      no: {
        pill: 'Mejor otro camino',
        title: 'No encajamos si…',
        items: [
          'Tu web está en Wix, Squarespace u otra plataforma cerrada',
          'Necesitas desarrollo nuevo cada semana (mejor proyecto a medida)',
          'Buscas el precio más bajo sin importar quién responde',
          'Quieres un panel de tickets corporativo con SLA de 15 minutos',
          'La web no es WordPress y no tiene sentido migrarla',
        ],
      },
    },
    processIntro: {
      title: 'Cómo',
      titleEm: 'empezamos.',
      description:
        'Auditoría inicial, acceso seguro y en una semana tu web ya está bajo mantenimiento sin interrumpir nada.',
    },
    processSteps: [
      {
        title: 'Hablamos',
        description:
          'Me cuentas el estado de tu web y qué te preocupa: actualizaciones, seguridad, velocidad o soporte puntual.',
      },
      {
        title: 'Auditoría',
        description:
          'Reviso WordPress, plugins, copias y rendimiento. Te digo qué hay y qué conviene hacer, sin tocar nada aún.',
      },
      {
        title: 'Propuesta',
        description:
          'Te paso plan y precio mensual por escrito. Sin permanencia: si encaja, seguimos.',
      },
      {
        title: 'Activación',
        description:
          'Configuro copias, actualizaciones y monitorización. Tu web sigue online mientras lo dejo listo.',
      },
      {
        title: 'Mantenimiento',
        description:
          'Cada mes: updates seguros, soporte directo, cambios menores incluidos e informe de estado.',
      },
    ],
    relatedTitle: 'Webs que',
    relatedTitleEm: 'mantengo.',
    relatedSlugs: ['vila-i-lancis', 'de-cos', 'ariadna-vilalta'],
    pricingDetail: {
      label: 'Mantenimiento',
      amount: '50€/mes',
      amountSub: 'Sin permanencia · cancela cuando quieras',
      features: [
        'Actualizaciones de WordPress, tema y plugins',
        'Copias de seguridad diarias',
        'Monitorización y alertas 24/7',
        'Seguridad activa + firewall',
        'Soporte directo por email y WhatsApp',
        'Cambios menores incluidos',
        'Informe mensual de estado',
      ],
      extras: [
        { name: 'Plan avanzado', detail: 'Tienda WooCommerce + más horas', price: 'desde 80€/mes' },
        { name: 'Rescate urgente', detail: 'Web hackeada o caída', price: 'A consultar' },
        { name: 'Optimización velocidad', detail: 'Auditoría + mejoras', price: 'A consultar' },
        { name: 'Horas de desarrollo', detail: 'Nuevas funcionalidades', price: '45€/h' },
      ],
      cta: 'Solicitar auditoría gratuita',
    },
    faqTitle: 'Sobre el',
    faqTitleEm: 'mantenimiento.',
    ctaTitle: '¿Dejamos tu web',
    ctaTitleEm: 'en buenas manos?',
    hubIdealFor: [
      'Web WordPress sin mantenimiento activo',
      'Tranquilidad sin permanencia',
      'Soporte directo conmigo',
    ],
    hubFeatured: false,
  },
};

export const serviceDetailSlugs = Object.keys(serviceDetailBySlug);

export function getServiceDetail(slug: string): ServiceDetailContent | undefined {
  return serviceDetailBySlug[slug];
}

import { projects, type Project } from './projects';

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
  /** HTML opcional para la respuesta visible (schema usa `answer` en texto plano). */
  answerHtml?: string;
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
  targetAudienceEyebrow?: string;
  targetAudienceTitle?: string;
  targetAudienceTitleEm?: string;
  targetAudienceFootnote?: string;
  targetAudienceCountLabel?: string;
  features: ServiceFeature[];
  price: string;
  priceNote: string;
  relatedCases: RelatedCase[];
  /** Título H2 de CasosRelacionados; por defecto “Proyectos que hablan / por sí solos.” */
  relatedCasesTitle?: string;
  relatedCasesTitleEm?: string;
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
    priceNote: 'El hosting y el dominio los pagas tú directamente. Son tuyos, no míos.',
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
  {
    slug: 'tienda-online',
    name: 'Tienda online',
    eyebrow: 'SERVICIO · TIENDA ONLINE',
    headline: 'Tu tienda online, sin líos técnicos',
    headlineEm: 'ni letras pequeñas.',
    description:
      'Para negocios y autónomos que quieren llevar sus productos a internet y vender las 24 horas — sin depender de plataformas que se quedan con tu margen ni de agencias que retienen tu tienda.',
    ctaPrimary: 'Quiero mi tienda online',
    ctaSecondary: 'Ver proyectos',
    checks: ['Tuya desde el primer día', 'Sin comisiones por venta', 'SEO incluido'],
    illustration: 'ecommerce',
    targetAudience: [
      'Tienes productos físicos o digitales y quieres venderlos online',
      'Usas Instagram o el boca a boca pero quieres un canal de ventas propio que no dependa de algoritmos',
      'Tienes una tienda en Wix, marketplace o plantilla genérica y estás pagando más comisiones de las que quieres',
      'Ya tuviste una tienda con una agencia pero no funcionaba o no podías gestionarla tú mismo',
    ],
    features: [
      {
        title: 'Catálogo de productos',
        description:
          'Organizado por categorías, con fotos, descripciones y variantes. Fácil de gestionar tú mismo después de la entrega.',
      },
      {
        title: 'Pasarela de pago',
        description:
          'Integración con Stripe y PayPal. Tu dinero va directamente a tu cuenta, sin intermediarios.',
      },
      {
        title: 'Gestión de pedidos y envíos',
        description:
          'Panel para gestionar pedidos, estados y opciones de envío adaptadas a tu negocio.',
      },
      {
        title: 'SEO de producto incluido',
        description: 'Cada producto optimizado para que Google lo encuentre.',
      },
      {
        title: 'Diseño responsive',
        description: 'El 70% de las compras online se hacen desde el móvil.',
      },
      {
        title: 'Dominio y hosting a tu nombre',
        description: 'Tuyos, en tu cuenta, bajo tu control.',
      },
      {
        title: 'Formación incluida',
        description:
          'Al entregar te explico cómo añadir productos, gestionar pedidos y hacer cambios básicos.',
      },
    ],
    price: 'Desde 1.200€',
    priceNote: 'Hosting, dominio y comisiones de pasarela de pago no incluidos.',
    relatedCases: [
      {
        slug: 'de-cos',
        highlight:
          'Rescate y rediseño completo — pasó de 10-15 ventas mensuales a 25, con 300 visitas orgánicas al mes.',
        testimonialQuote:
          'Llegué a Rimobyte por recomendación, y sin duda paso su testigo a quien busque un técnico de confianza.',
      },
      {
        slug: 'juancar-garma-reset7',
        highlight:
          'Landing de ventas con Stripe — diseñada para convertir visitas en clientes sin distracciones.',
        testimonialQuote: 'Trabajar con Flor es de las mejores decisiones que he podido hacer.',
      },
    ],
    faqs: [
      {
        question: '¿Qué plataforma usas para la tienda?',
        answer:
          'WooCommerce sobre WordPress. Es tu tienda, sin comisiones de plataforma y sin ataduras — el dominio, el hosting y el catálogo son tuyos.',
      },
      {
        question: '¿Puedo gestionar los productos yo mismo después?',
        answer:
          'Sí. Al entregar te explico cómo añadir productos, gestionar stock y procesar pedidos.',
      },
      {
        question: '¿Por qué WooCommerce y no un marketplace?',
        answer:
          'En un marketplace (Amazon, Etsy, etc.) no eres dueño del canal: pagas comisiones, compites con miles de vendedores y dependes de sus reglas. Con WooCommerce la tienda es tuya, sin comisiones por venta y con control total del diseño y los datos.',
      },
      {
        question: '¿Puedo empezar con pocos productos y añadir más después?',
        answer: 'Perfectamente. La tienda se construye para escalar.',
      },
      {
        question: '¿Cómo cobro a mis clientes?',
        answer:
          'Con Stripe y PayPal. El dinero va directamente a tu cuenta. Consulta sus comisiones oficiales en stripe.com/es/pricing y paypal.com/es/business/paypal-business-fees.',
        answerHtml:
          'Con Stripe y PayPal. El dinero va directamente a tu cuenta. Consulta sus comisiones oficiales en: <a href="https://stripe.com/es/pricing" target="_blank" rel="noopener noreferrer">stripe.com/es/pricing</a> · <a href="https://www.paypal.com/es/business/paypal-business-fees" target="_blank" rel="noopener noreferrer">paypal.com/es/business/paypal-business-fees</a>.',
      },
      {
        question: '¿Puedo vender en España y en otros países?',
        answer: 'Sí. Configuramos impuestos, monedas y envíos según dónde quieras vender.',
      },
      {
        question: '¿Cuánto tarda en estar lista la tienda?',
        answer:
          'Entre 4 y 6 semanas desde que tengo el catálogo de productos con fotos y descripciones.',
      },
    ],
    ctaFinal: {
      title: '¿Empezamos con',
      titleEm: 'tu tienda?',
      text: 'Cuéntame qué quieres vender y en menos de 24 horas te respondo con una propuesta concreta.',
      cta: 'Pide tu presupuesto gratuito',
    },
    seo: {
      title: 'Tienda online para pequeño negocio · RimoByte',
      description:
        'Tienda WooCommerce para pequeños negocios desde 1.200€. Sin comisiones por venta, tuya desde el primer día. Stripe y PayPal integrados.',
    },
  },
  {
    slug: 'mantenimiento-web',
    name: 'Mantenimiento web',
    eyebrow: 'SERVICIO · MANTENIMIENTO WEB',
    headline: 'Tu web al día y segura,',
    headlineEm: 'yo miro por lo técnico.',
    description:
      'Para negocios que quieren olvidarse de actualizaciones, seguridad y problemas técnicos — y centrarse en lo que realmente importa: su negocio.',
    ctaPrimary: 'Quiero saber más',
    ctaSecondary: 'Ver proyectos',
    checks: ['Sin permanencia', 'Sin letra pequeña', 'Soporte cuando lo necesitas'],
    illustration: 'maintenance',
    targetAudience: [
      'Plugins desactualizados que abren vulnerabilidades de seguridad',
      'Actualizaciones de WordPress que rompen el diseño o la funcionalidad',
      'Copias de seguridad inexistentes — si algo falla, no hay vuelta atrás',
      'Velocidad degradada que afecta al posicionamiento en Google',
    ],
    targetAudienceEyebrow: 'POR QUÉ IMPORTA',
    targetAudienceTitle: 'Lo que pasa cuando nadie cuida',
    targetAudienceTitleEm: 'tu web.',
    targetAudienceFootnote:
      'No es obligatorio contratarlo. Pero es importante que sepas lo que implica no hacerlo.',
    targetAudienceCountLabel: 'riesgos',
    features: [
      {
        title: 'Actualizaciones periódicas',
        description:
          'WordPress, plugins y tema actualizados regularmente para evitar vulnerabilidades y mantener la compatibilidad.',
      },
      {
        title: 'Copias de seguridad automáticas',
        description:
          'Backup completo de la web de forma periódica. Si algo falla, se restaura sin perder nada.',
      },
      {
        title: 'Monitorización de seguridad',
        description:
          'Control de accesos, detección de actividad sospechosa y protección ante ataques comunes.',
      },
      {
        title: 'Resolución de incidencias',
        description:
          'Si algo deja de funcionar, lo resuelvo. Sin tener que buscar a alguien de cero ni explicar cómo está hecha tu web.',
      },
      {
        title: 'Soporte por email',
        description:
          'Para consultas, cambios menores y dudas del día a día. Tiempo de respuesta máximo de 24 horas en días laborables.',
      },
      {
        title: 'Comunicación directa',
        description:
          'Si detecto algo, te lo comento. Si tienes una duda o algo deja de funcionar, me escribes y te respondo. Sin formularios, sin tickets, directamente conmigo.',
      },
    ],
    price: 'Desde 50€/mes',
    priceNote:
      'Desarrollos nuevos, rediseños o funcionalidades adicionales se presupuestan aparte.',
    relatedCasesTitle: 'Webs que cuido',
    relatedCasesTitleEm: 'con mantenimiento continuo.',
    relatedCases: [
      {
        slug: 'rock-zone-camp',
        highlight:
          'Web con mucho contenido visual que necesita mantenimiento constante para mantener su rendimiento de 99/100 en PageSpeed.',
        testimonialQuote: 'Se ha convertido en la programadora oficial de nuestro proyecto.',
      },
      {
        slug: 'jlg-ki',
        highlight:
          'Relación de trabajo continua desde la migración — con mejoras progresivas y soporte permanente.',
        testimonialQuote: 'Poner las primeras piedras para una relación de larga duración.',
      },
    ],
    faqs: [
      {
        question: '¿Hay permanencia mínima?',
        answer: 'No. Puedes cancelar cuando quieras sin penalización ni explicación.',
      },
      {
        question: '¿Qué pasa si tengo una web que no has hecho tú?',
        answer:
          'Primero la reviso para entender cómo está construida. Si está en condiciones, adelante. Si tiene problemas previos, te lo digo antes de empezar.',
      },
      {
        question: '¿Cuánto tiempo tarda en resolverse una incidencia?',
        answer:
          'Un fallo crítico tiene prioridad máxima, respondo el mismo día. Para cambios menores el plazo es de 24-48 horas en días laborables.',
      },
      {
        question: '¿Los cambios de contenido están incluidos?',
        answer:
          'Los cambios menores sí. Los desarrollos nuevos o cambios estructurales se presupuestan aparte.',
      },
      {
        question: '¿Puedo cancelar y retomar el servicio más adelante?',
        answer:
          'Sí. No hay penalización por cancelar ni por volver. Tu web sigue siendo tuya en cualquier caso.',
      },
    ],
    ctaFinal: {
      title: '¿Quieres olvidarte de los',
      titleEm: 'problemas técnicos?',
      text: 'Cuéntame qué web tienes y te digo exactamente qué necesita. Sin compromiso.',
      cta: 'Consulta gratuita',
    },
    seo: {
      title: 'Mantenimiento web para negocios · RimoByte',
      description:
        'Mantenimiento web desde 50€/mes sin permanencia. Actualizaciones, seguridad, copias de seguridad y soporte directo. Sin letra pequeña, sin ataduras.',
    },
  },
];

export function getRelatedProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherServices(currentSlug: string): Service[] {
  return services.filter((s) => s.slug !== currentSlug);
}

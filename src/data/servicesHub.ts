import type { ServiceFAQ } from './services';

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface DecisionQuestion {
  letter: string;
  text: string;
  emphasis: string;
  textAfter: string;
  answer: string;
  href: string;
}

export interface HubVertical {
  title: string;
  description: string;
  href: string;
  icon: 'scissors' | 'utensils' | 'briefcase' | 'heart' | 'dumbbell' | 'book' | 'package' | 'chat';
}

export const serviceProcessSteps: ServiceProcessStep[] = [
  { title: 'Hablamos', description: 'Me cuentas qué necesitas. Sin prisas y sin tecnicismos.' },
  { title: 'Te presupuesto', description: 'Cifra cerrada por escrito. Si dices "adelante", empezamos.' },
  { title: 'Diseñamos', description: 'Dos direcciones de diseño. Eliges la que más te representa.' },
  { title: 'Construyo', description: 'Te enseño la web antes de publicar. Margen para ajustes.' },
  { title: 'Publicamos', description: 'Sale al mundo. Te formo. Sigo aquí si me necesitas.' },
];

export const hubDecisionQuestions: DecisionQuestion[] = [
  {
    letter: 'A',
    text: '¿Quieres que te ',
    emphasis: 'encuentren en Google',
    textAfter: ' y reciban contacto o reservas?',
    answer: 'Web corp. →',
    href: '/servicios/web-corporativa/',
  },
  {
    letter: 'B',
    text: '¿Quieres ',
    emphasis: 'vender productos',
    textAfter: ' directamente sin pasar por terceros?',
    answer: 'Tienda online →',
    href: '/servicios/tienda-online/',
  },
  {
    letter: 'C',
    text: '¿Ya tienes web pero ',
    emphasis: 'nadie la mantiene',
    textAfter: ' y te preocupa?',
    answer: 'Mantenimiento →',
    href: '/servicios/mantenimiento-web/',
  },
];

export const hubVerticals: HubVertical[] = [
  {
    title: 'Peluquerías y estética',
    description: 'SEO local optimizado y reservas integradas.',
    href: '/web-para-peluquerias/',
    icon: 'scissors',
  },
  {
    title: 'Restaurantes y bares',
    description: 'Carta digital, reservas y SEO geolocalizado.',
    href: '/web-para-restaurantes/',
    icon: 'utensils',
  },
  {
    title: 'Asesorías y gestorías',
    description: 'Web seria que transmite solvencia técnica.',
    href: '/web-para-asesorias/',
    icon: 'briefcase',
  },
  {
    title: 'Psicólogos y terapeutas',
    description: 'Plataforma de autoridad y captación de pacientes.',
    href: '/proyectos/ariadna-psicologia/',
    icon: 'heart',
  },
  {
    title: 'Entrenadores personales',
    description: 'Landing page que convierte sin intervención manual.',
    href: '/web-para-entrenadores-personales/',
    icon: 'dumbbell',
  },
  {
    title: 'Cursos y formaciones',
    description: 'Plataforma con membresías y email automatizado.',
    href: '/proyectos/supercapaces/',
    icon: 'book',
  },
  {
    title: 'Tiendas de artesanía',
    description: 'Catálogo cuidado y narrativa de producto.',
    href: '/proyectos/de-cos/',
    icon: 'package',
  },
  {
    title: 'Otro sector',
    description: 'Cuéntame el tuyo — siempre se adapta.',
    href: '/contacto/',
    icon: 'chat',
  },
];

export const hubFaqs: ServiceFAQ[] = [
  {
    question: '¿Los precios son cerrados o sufren ampliaciones a mitad de proyecto?',
    answer:
      'Cerrados. Antes de empezar te paso un presupuesto por escrito con todo desglosado. Si durante el proyecto pides algo que no estaba en el alcance inicial, te aviso y decidimos juntos antes de tocarlo.',
  },
  {
    question: '¿El dominio y el hosting están incluidos?',
    answer:
      'No, y es intencional. Dominio y hosting los pagas tú directamente al proveedor — así son 100% tuyos. Te recomiendo dónde contratarlos (proveedores serios, sin sorpresas) y te acompaño en el proceso.',
  },
  {
    question: '¿Cuánto tarda una web corporativa o una tienda online?',
    answer:
      'Web corporativa: entre 3 y 5 semanas. Tienda online: entre 4 y 8 semanas. El plazo depende sobre todo de la rapidez con la que tú me pases textos e imágenes — si los necesitas, te ayudo a organizarlos.',
  },
  {
    question: '¿Qué pasa si después necesito cambiar algo?',
    answer:
      'Puedes cambiarlo tú (te formo al entregar) o me encargo yo. Si quieres mantenimiento continuo, contrátalo. Si solo necesitas un cambio puntual, lo facturo por horas reales. Sin contratos obligatorios.',
  },
  {
    question: '¿Puedo migrar mi web actual o tengo que empezar de cero?',
    answer:
      'Las dos opciones son posibles. Si la web actual tiene contenido o posicionamiento SEO valioso, migramos con cuidado para no perderlo. Si es mejor empezar de cero, te lo digo claro.',
  },
];

import type { ServiceProcessStep } from './servicesHub';

export const sobreMiBeliefs = [
  {
    num: '01',
    title: 'Tu éxito es mi reputación',
    body: 'Mi reputación depende de que cada proyecto funcione. Así que me aseguro de que funcione. Trabajo con negocios locales, pero también con estudios de software que necesitan desarrolladores de confianza — cuando otros profesionales del sector confían en ti, algo estás haciendo bien.',
  },
  {
    num: '02',
    title: 'Ingeniería, no solo diseño',
    body: 'Diseño webs que se ven bien, pero también que cargan rápido, están bien construidas y no se rompen. Hay una diferencia entre una web bonita y una web que funciona — y la diferencia se nota en Google, en el móvil y a los seis meses, cuando otras webs empiezan a fallar.',
  },
  {
    num: '03',
    title: 'Transparencia desde el minuto uno',
    body: 'Antes de empezar te explico cuánto cuesta todo — incluido el hosting y el dominio que pagas tú directamente. Si durante el proyecto surge algo que no estaba contemplado, te lo digo antes de hacerlo, no al final en la factura. Sin sorpresas.',
  },
  {
    num: '04',
    title: 'Para el largo plazo',
    body: 'No desaparezco al entregar. Si quieres que esté para el mantenimiento, aquí estoy. Si no, te dejo todo listo para que puedas seguir sin mí. Cada proyecto se diseña pensando en que tú puedas tomar el control — no en que dependas de mí.',
  },
];

export const sobreMiTimeline = [
  { year: '2019', label: 'Graduación en Ingeniería Informática' },
  { year: '2019 — 2022', label: 'Desarrollo y proyectos web en equipos técnicos' },
  { year: '2023', label: 'Nace RimoByte: trabajo directo con negocios locales' },
  { year: 'Hoy', label: 'Webs en distintos sectores y colaboraciones con estudios de software' },
];

export const sobreMiProcessSteps: ServiceProcessStep[] = [
  {
    title: 'Hablamos',
    description:
      'Me cuentas qué necesitas. Si ya lo tienes claro, te doy una estimación de plazos desde el principio. Si todavía tienes dudas, te hago las preguntas necesarias para entender bien tu negocio y lo que quieres conseguir con tu web. Sin prisas.',
  },
  {
    title: 'Te explico los costes reales antes de empezar',
    description:
      'Tener una web requiere un dominio y un alojamiento — son tuyos, van a tu nombre y los pagas tú directamente. Antes de nada te explico exactamente cuánto cuestan y dónde contratarlos, para que no haya sorpresas después. Te acompaño en el proceso si lo necesitas.',
  },
  {
    title: 'Diseñamos juntos',
    description:
      'Una vez claro el contenido, te presento un par de propuestas de diseño para que elijas la dirección que más te representa. No empiezo a construir nada hasta que estés convencida de lo que vas a tener.',
  },
  {
    title: 'Lo construyo y lo revisamos',
    description:
      'Implemento el diseño aprobado y te lo muestro antes de publicar. Tienes margen para pedir ajustes — el objetivo es que cuando salga, sea exactamente lo que esperabas.',
  },
  {
    title: 'Tu web sale al mundo — y yo sigo aquí',
    description:
      'Cuando la web está lista, te explico cómo funciona para que no dependas de mí para lo básico. Si quieres que me encargue del mantenimiento técnico, puedo hacerlo — pero no es obligatorio. La web es tuya y siempre lo será.',
  },
];

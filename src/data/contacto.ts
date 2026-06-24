import type { FaqEntry } from './faq';

export const contactProcessSteps = [
  {
    num: '01 / Respuesta',
    title: 'Te respondo en menos de 24h',
    body: 'Leo tu mensaje y te contesto personalmente con un par de preguntas si las hubiera, o directamente con una propuesta de llamada.',
  },
  {
    num: '02 / Llamada',
    title: 'Una llamada de 30 minutos',
    body: 'Te hago las preguntas necesarias para entender tu negocio, lo que ya tienes y lo que quieres conseguir. Si no encaja, te lo digo claro.',
  },
  {
    num: '03 / Propuesta',
    title: 'Presupuesto cerrado por escrito',
    body: 'En 2 o 3 días te envío una propuesta con alcance, plazos y precio cerrado. Sin sorpresas, sin extras que aparecen a mitad de camino.',
  },
];

export const contactFaqEntries: FaqEntry[] = [
  {
    q: '¿Tengo que tener claro qué quiero antes de escribir?',
    a: 'No. La mayoría de mensajes que recibo empiezan con "no estoy segura de qué necesito". Para eso está la primera llamada — te ayudo a aterrizar qué tiene sentido en tu caso antes de que pagues un solo euro.',
  },
  {
    q: '¿La consulta inicial es gratuita?',
    a: 'Sí. La primera llamada de unos 30 minutos no se factura. Es para entender si encajamos y para que tengas claro a quién contratas antes de decidir nada.',
  },
  {
    q: '¿Atendéis solo a clientes en España?',
    a: 'Mayoritariamente trabajo con negocios en España, pero atiendo proyectos en otros países hispanohablantes y en inglés. Lo valoramos en la primera llamada según el huso horario y el SEO local que necesites.',
  },
  {
    q: '¿Y si lo que quiero es solo un mantenimiento o una migración pequeña?',
    a: 'También. No todo proyecto tiene que ser una web nueva. Migraciones, mantenimientos, mejoras de velocidad o auditorías SEO son trabajos habituales — y tienen su propia tarifa adaptada.',
  },
];

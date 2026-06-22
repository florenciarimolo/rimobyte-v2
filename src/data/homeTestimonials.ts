export interface HomeTestimonial {
  quote: string;
  quoteHighlight?: string;
  author: string;
  meta: string;
  initial: string;
}

export const featuredTestimonial: HomeTestimonial = {
  quote: 'Tengo toda la agenda llena. Mis clientas me encuentran en Google y reservan por la web sin que yo tenga que mover un dedo.',
  quoteHighlight: 'agenda llena.',
  author: 'Lucía Martínez',
  meta: 'Lucía Nails Art · lucianailsart.com',
  initial: 'L',
};

export const testimonialCards: HomeTestimonial[] = [
  {
    quote:
      'Atención al detalle, buena comunicación y rapidez en la entrega. Se ha convertido en la programadora oficial de nuestro proyecto.',
    author: 'Fura Aria',
    meta: 'Google · hace 11 meses',
    initial: 'F',
  },
  {
    quote:
      'Excelente optimización y desarrollo, con un trato personal inmejorable. Llegué por recomendación y paso su testigo sin dudarlo.',
    author: 'María José Cos',
    meta: 'Google · hace 11 meses',
    initial: 'M',
  },
  {
    quote:
      'Una de las mejores decisiones que he tomado. Profesional, perfeccionista y, sobre todo, una persona increíble. Resolvió todas mis dudas.',
    author: 'Juan Carlos García',
    meta: 'Google · hace 11 meses',
    initial: 'J',
  },
];

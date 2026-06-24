export type BlogType = 'guia' | 'opinion' | 'sector' | 'herramientas';

export const blogTypeLabels: Record<BlogType, string> = {
  guia: 'Guía',
  opinion: 'Opinión',
  sector: 'Sector',
  herramientas: 'Herramientas',
};

export const blogFilterTypes: { id: 'all' | BlogType; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'guia', label: 'Guías' },
  { id: 'sector', label: 'Sectores' },
  { id: 'opinion', label: 'Opinión' },
];

export interface BlogVisual {
  icon: string;
  gradient: string;
}

const blogVisuals: Record<string, BlogVisual> = {
  'cuanto-cuesta-una-pagina-web': {
    icon: '€',
    gradient: 'linear-gradient(135deg, #196BEE, #6535E5)',
  },
  'web-o-instagram': {
    icon: 'IG',
    gradient: 'linear-gradient(135deg, #6535E5, #E715D1)',
  },
  'tu-web-debe-ser-tuya': {
    icon: '!',
    gradient: 'linear-gradient(135deg, #E715D1, #6535E5)',
  },
  'web-para-restaurante-conseguir-reservas': {
    icon: 'R',
    gradient: 'linear-gradient(135deg, #196BEE, #6535E5 50%, #E715D1)',
  },
  'web-para-asesoria-captar-clientes': {
    icon: 'A',
    gradient: 'linear-gradient(135deg, #6535E5, #196BEE)',
  },
};

export function getBlogVisual(slug: string): BlogVisual {
  return (
    blogVisuals[slug] ?? {
      icon: slug.charAt(0).toUpperCase(),
      gradient: 'var(--gradient-logo)',
    }
  );
}

export function formatBlogDate(date: Date, style: 'short' | 'long' = 'short'): string {
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  });
}

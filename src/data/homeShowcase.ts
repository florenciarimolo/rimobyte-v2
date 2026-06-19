import { projects, type Project } from './projects';

/** Proyectos destacados en hero y sección «Proyectos recientes» de la home */
export interface HomeShowcaseProject {
  slug: string;
  name: string;
  /** Etiqueta corta (hero caption, picker) */
  sector: string;
  url: string;
  image: string;
  /** Descripción para el spotlight de proyectos */
  description: string;
}

function toShowcase(project: Project): HomeShowcaseProject {
  const sectorShort = project.sector.split('·')[0].trim();
  return {
    slug: project.slug,
    name: project.name,
    sector: sectorShort,
    url: project.url,
    image: project.image,
    description: project.solution,
  };
}

const projectBySlug = new Map(projects.map((p) => [p.slug, p]));

function pickShowcase(slugs: string[]): HomeShowcaseProject[] {
  return slugs.map((slug) => {
    const project = projectBySlug.get(slug);
    if (!project) throw new Error(`Proyecto no encontrado para showcase: ${slug}`);
    return toShowcase(project);
  });
}

const heroSlugs = ['lucia-nails-art', 'vila-i-lancis', 'de-cos', 'ariadna-vilalta', 'rock-zone-camp'];
const spotlightSlugs = ['lucia-nails-art', 'rock-zone-camp', 'vila-i-lancis', 'ariadna-vilalta', 'de-cos'];

export const heroShowcaseProjects = pickShowcase(heroSlugs);
export const spotlightProjects = pickShowcase(spotlightSlugs);

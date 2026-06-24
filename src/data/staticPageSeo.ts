import { projectCount } from './projects';

export interface PageSeo {
  title: string;
  description: string;
  image?: string;
}

/** Defaults de `<Base>` cuando una página no define title/description. */
export const defaultBaseSeo: PageSeo = {
  title: 'Desarrollo web WordPress para negocios locales · RimoByte',
  description:
    'Flor Rímolo, ingeniera informática. Diseño y desarrollo de webs WordPress y tiendas WooCommerce para negocios locales en España. Tu web, tu propiedad, sin letra pequeña.',
  image: '/assets/brand/flor-rimobyte.webp',
};

export const homeSeo: PageSeo = {
  title: 'Desarrollo web WordPress a medida · RimoByte',
  description: defaultBaseSeo.description,
  image: '/assets/brand/flor-rimobyte.webp',
};

export const sobreMiSeo: PageSeo = {
  title: 'Flor Rímolo · Desarrollo web WordPress freelance · RimoByte',
  description:
    'Graduada en 2019, especializada en desarrollo web WordPress para negocios locales. Trabajo directamente con el cliente sin intermediarios. Tu web es tuya desde el primer día.',
  image: '/assets/brand/flor-rimobyte.webp',
};

export const contactoSeo: PageSeo = {
  title: 'Contacto · Flor Rímolo · RimoByte',
  description:
    'Cuéntame tu proyecto. Te respondo personalmente en menos de 24 horas con ideas concretas, no una plantilla de presupuesto.',
  image: '/assets/brand/flor-rimobyte.webp',
};

export const blogIndexSeo: PageSeo = {
  title: 'Blog · Diseño web para negocios · RimoByte',
  description:
    'Guías sobre cuánto cuesta una web, por qué debe ser tuya, web e Instagram, y consejos sectoriales para restaurantes y asesorías. Precios reales y sin letra pequeña.',
};

export const serviciosHubSeo: PageSeo = {
  title: 'Servicios de desarrollo web WordPress · RimoByte',
  description:
    'Web corporativa desde 600€, tienda WooCommerce desde 1.200€, plataformas de cursos desde 1.000€ y mantenimiento. Presupuesto cerrado, tuya desde el primer día.',
};

export function proyectosIndexSeo(count: number = projectCount): PageSeo {
  const phrase = count === 1 ? '1 proyecto real' : `${count} proyectos reales`;
  return {
    title: 'Proyectos web para negocios reales · RimoByte',
    description: `${phrase}: webs corporativas, tiendas online, landings y plataformas. Casos documentados con desafío, solución y resultado para cada cliente.`,
    image: '/assets/projects/og-proyectos.webp',
  };
}

export const politicaPrivacidadSeo: PageSeo = {
  title: 'Política de privacidad · RimoByte',
  description:
    'Información sobre el tratamiento de datos personales en rimobyte.com: formulario de contacto, reCAPTCHA, correo y reseñas públicas. Flor Rímolo — RimoByte.',
  image: '/assets/brand/flor-rimobyte.webp',
};

export const politicaCookiesSeo: PageSeo = {
  title: 'Política de cookies · RimoByte',
  description:
    'Qué cookies y tecnologías similares se usan en rimobyte.com, incluido reCAPTCHA v3 de Google, y cómo gestionarlas. RimoByte.',
  image: '/assets/brand/flor-rimobyte.webp',
};

export const notFoundSeo: PageSeo = {
  title: 'Página no encontrada · RimoByte',
  description: 'Esta URL no existe o se ha movido. Vuelve al inicio o explora el blog y los proyectos.',
};

/** Rutas estáticas con OG pre-generada (excluye proyectos con imagen propia). */
export function staticOgPageEntries(): { routePath: string; seo: PageSeo }[] {
  return [
    { routePath: '/', seo: homeSeo },
    { routePath: '/sobre-mi/', seo: sobreMiSeo },
    { routePath: '/contacto/', seo: contactoSeo },
    { routePath: '/blog/', seo: blogIndexSeo },
    { routePath: '/servicios/', seo: serviciosHubSeo },
    { routePath: '/politica-privacidad/', seo: politicaPrivacidadSeo },
    { routePath: '/politica-cookies/', seo: politicaCookiesSeo },
  ];
}

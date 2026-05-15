/**
 * Nombre del archivo en /public/assets/projects/{nombre}.webp (sin ruta ni extensión).
 * Las variantes responsive se generan en /public/assets/projects/generated/{nombre}-w{400|800}.webp
 */
export const projectImageBaseBySlug: Record<string, string> = {
  'vila-i-lancis': 'vila-i-lancis',
  'lucia-nails-art': 'lucia-nails-art',
  supercapaces: 'supercapaces',
  'rock-zone-camp': 'rock-zone-camp',
  'ariadna-vilalta': 'ariadna-vilalta',
  'jlg-ki': 'jlg-ki',
  'juancar-garma-reset7': 'juancar-garma-reset7',
  'de-cos': 'de-cos',
  'fenix-internacional-360': 'fenix',
};

export function projectImageBase(slug: string): string | undefined {
  return projectImageBaseBySlug[slug];
}

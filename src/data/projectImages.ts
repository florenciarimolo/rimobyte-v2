/**
 * Nombre del archivo en /public/assets/projects/{nombre}.webp (sin ruta ni extensión).
 * Las variantes responsive se generan en /public/assets/projects/generated/{nombre}-w{400|800}.webp
 */
export const projectImageBaseBySlug: Record<string, string> = {
  'vila-i-lancis': 'vila-lancis-v2',
  'lucia-nails-art': 'lucia-nails',
  supercapaces: 'supercapaces',
  'rock-zone-camp': 'rockzone',
  'ariadna-vilalta': 'ariadna-vilalta',
  'jlg-ki': 'jlgki',
  reset7: 'reset7',
  'de-cos': 'decos',
};

export function projectImageBase(slug: string): string | undefined {
  return projectImageBaseBySlug[slug];
}

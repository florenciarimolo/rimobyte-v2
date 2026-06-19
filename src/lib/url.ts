/** Normaliza rutas internas a la forma canónica con barra final (excepto `/`). */
export function canonicalPath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') + '/';
}

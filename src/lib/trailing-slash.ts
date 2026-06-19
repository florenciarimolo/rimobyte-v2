const FILE_EXT_RE = /\.[a-z0-9]+$/i;

/** Rutas HTML que deben redirigirse a la variante con barra final. */
export function needsTrailingSlashRedirect(pathname: string): boolean {
  if (pathname === '/') return false;
  if (pathname.endsWith('/')) return false;
  if (pathname.startsWith('/api/')) return false;

  const lastSegment = pathname.split('/').pop() ?? '';
  if (FILE_EXT_RE.test(lastSegment)) return false;

  return true;
}

/** Slug corto para el campo `origin` del formulario (máx. 80 en `/api/contact`). */
export function contactOriginFromPathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '') || '/';
  if (trimmed === '/') return 'home';
  return trimmed.replace(/^\//, '');
}

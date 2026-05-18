/** URLs públicas de perfil para JSON-LD `sameAs` (opcional). */
export function publicProfileUrls(): string[] {
  const raw = [
    import.meta.env.PUBLIC_INSTAGRAM_URL,
    import.meta.env.PUBLIC_LINKEDIN_URL,
    import.meta.env.PUBLIC_GBP_URL,
  ];
  return raw.filter((u): u is string => typeof u === 'string' && u.trim().length > 0).map((u) => u.trim());
}

import { resolveTheme, toggleTheme, type Theme } from '../lib/theme';

let initialized = false;

function syncSwitchers(theme: Theme) {
  const isDark = theme === 'dark';
  const label = isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';

  document.querySelectorAll<HTMLButtonElement>('.theme-switcher').forEach((btn) => {
    btn.setAttribute('aria-label', label);
  });
}

/** Enlaza todos los botones `.theme-switcher` (navbar desktop + móvil). */
export function initThemeSwitchers() {
  if (initialized) return;
  initialized = true;

  syncSwitchers(resolveTheme());

  document.addEventListener('click', (e) => {
    const btn = (e.target as Element | null)?.closest<HTMLButtonElement>('.theme-switcher');
    if (!btn) return;
    syncSwitchers(toggleTheme());
  });

  document.addEventListener('themechange', (e) => {
    const detail = (e as CustomEvent<{ theme: Theme }>).detail;
    if (detail?.theme) syncSwitchers(detail.theme);
  });
}

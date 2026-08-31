export const THEME_STORAGE_KEY = 'rimobyte-theme';

export type Theme = 'light' | 'dark';

export const THEME_COLORS: Record<Theme, string> = {
  dark: '#0A0A12',
  light: '#EEEDF4',
};

export function getSystemTheme(): Theme {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  return 'light';
}

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    if (value === 'light' || value === 'dark') return value;
  } catch {
    /* localStorage no disponible */
  }
  return null;
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const meta =
    document.getElementById('theme-color-meta') ??
    document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);

  const statusBar = document.getElementById('apple-status-bar-meta');
  if (statusBar) {
    statusBar.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');
  }

  document.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
}

export function setTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  applyTheme(theme);
}

export function toggleTheme(): Theme {
  const current: Theme =
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  const next: Theme = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  return next;
}

function onSystemThemeChange(): void {
  if (!getStoredTheme()) applyTheme(getSystemTheme());
}

let listenersInitialized = false;

export function initThemeListeners(): void {
  if (listenersInitialized) return;
  listenersInitialized = true;

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', onSystemThemeChange);
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', onSystemThemeChange);

  window.addEventListener('storage', (e) => {
    if (e.key !== THEME_STORAGE_KEY) return;
    if (e.newValue === 'light' || e.newValue === 'dark') {
      applyTheme(e.newValue);
    } else if (e.newValue === null) {
      applyTheme(resolveTheme());
    }
  });

  document.addEventListener('astro:page-load', () => {
    applyTheme(resolveTheme());
  });
}

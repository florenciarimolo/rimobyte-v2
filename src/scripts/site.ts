/** Interacciones globales del sitio */
export function initSite() {
  initNavProgress();
  initCursorGlow();
  initHeroShowcase();
  initWorkSpotlight();
  initMetricCounts();
}

function initNavProgress() {
  const nav = document.getElementById('navbar');
  const progressBar = document.getElementById('nav-progress');
  if (!nav) return;

  const isFloatNav = nav.classList.contains('site-nav--float');

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    if (!isFloatNav) {
      nav.classList.toggle('site-nav--solid', scrollTop > 24);
    }
    progressBar?.style.setProperty('--progress', String(progress));
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!glow || reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;

  glow.classList.add('is-on');
  window.addEventListener(
    'mousemove',
    (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    },
    { passive: true },
  );
}

function initHeroShowcase() {
  const list = document.getElementById('hero-showcase-list');
  const img = document.getElementById('hero-showcase-img') as HTMLImageElement | null;
  const nameEl = document.getElementById('hero-showcase-name');
  const sectorEl = document.getElementById('hero-showcase-sector');
  const frame = img?.closest('.hero-showcase__frame');
  const items = list?.querySelectorAll<HTMLButtonElement>('.hero-showcase__item');
  if (!items?.length || !img || !nameEl || !sectorEl) return;

  let timer: number | null = null;
  let index = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setItem = (item: HTMLButtonElement) => {
    items.forEach((el) => el.classList.toggle('is-active', el === item));
    frame?.classList.add('is-changing');
    window.setTimeout(() => {
      img.src = item.dataset.img ?? '';
      img.alt = item.dataset.name ?? '';
      nameEl.textContent = item.dataset.name ?? '';
      sectorEl.textContent = item.dataset.sector ?? '';
      frame?.classList.remove('is-changing');
    }, 150);
  };

  const startAutoplay = () => {
    if (reduceMotion) return;
    timer = window.setInterval(() => {
      index = (index + 1) % items.length;
      setItem(items[index]);
    }, 4500);
  };

  const stopAutoplay = () => {
    if (timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  items.forEach((item, i) => {
    const activate = () => {
      stopAutoplay();
      index = i;
      setItem(item);
    };
    item.addEventListener('mouseenter', activate);
    item.addEventListener('focus', activate);
    item.addEventListener('click', activate);
  });

  list?.addEventListener('mouseleave', startAutoplay);
  startAutoplay();
}

function initWorkSpotlight() {
  const picker = document.getElementById('work-picker');
  const spotlight = document.getElementById('work-spotlight');
  const img = document.getElementById('work-spotlight-img') as HTMLImageElement | null;
  const sector = document.getElementById('work-spotlight-sector');
  const name = document.getElementById('work-spotlight-name');
  const desc = document.getElementById('work-spotlight-desc');
  const link = document.getElementById('work-spotlight-link') as HTMLAnchorElement | null;
  const btns = picker?.querySelectorAll<HTMLButtonElement>('.work-picker__btn');
  if (!btns?.length || !img) return;

  const setProject = (btn: HTMLButtonElement) => {
    btns.forEach((el) => {
      const active = el === btn;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-selected', String(active));
    });

    spotlight?.classList.add('is-changing');
    window.setTimeout(() => {
      img.src = btn.dataset.img ?? '';
      img.alt = btn.dataset.name ?? '';
      if (sector) sector.textContent = btn.dataset.sector ?? '';
      if (name) name.textContent = btn.dataset.name ?? '';
      if (desc) desc.textContent = btn.dataset.desc ?? '';
      if (link) {
        const url = btn.dataset.url ?? '';
        link.textContent = url ? `${url} ↗` : 'Ver proyecto ↗';
        link.href = url ? `https://${url}` : '#';
      }
      spotlight?.classList.remove('is-changing');
    }, 150);
  };

  btns.forEach((btn) => btn.addEventListener('click', () => setProject(btn)));
}

function initMetricCounts() {
  const cells = document.querySelectorAll<HTMLElement>('[data-count]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el: HTMLElement) => {
    const target = parseInt(el.dataset.count ?? '0', 10);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (reduceMotion || !cells.length) {
    cells.forEach((el) => {
      el.textContent = `${el.dataset.count ?? ''}${el.dataset.suffix ?? ''}`;
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  cells.forEach((el) => observer.observe(el));
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite);
  } else {
    initSite();
  }
}

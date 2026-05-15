const AUTOPLAY_MS = 6000;

function initCarousel(root: HTMLElement) {
  const slides = [...root.querySelectorAll<HTMLElement>('.testimonials-carousel__slide')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('.testimonials-carousel__dot')];
  if (slides.length <= 1) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  let timer: ReturnType<typeof setInterval> | null = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setSlide(next: number) {
    index = (next + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    dots.forEach((dot, i) => {
      const active = i === index;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', active ? 'true' : 'false');
      dot.tabIndex = active ? 0 : -1;
    });
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    if (reducedMotion) return;
    stop();
    timer = setInterval(() => setSlide(index + 1), AUTOPLAY_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setSlide(i);
      start();
    });
  });

  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget as Node)) start();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  setSlide(index);
  start();
}

export function initTestimonialsCarousels() {
  document.querySelectorAll<HTMLElement>('.testimonials-carousel').forEach(initCarousel);
}

initTestimonialsCarousels();

document.addEventListener('astro:page-load', initTestimonialsCarousels);

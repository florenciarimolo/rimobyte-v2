const AUTOPLAY_MS = 6000;

function initCarousel(root: HTMLElement) {
  const slides = [...root.querySelectorAll<HTMLElement>('.testimonials-carousel__slide')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('.testimonials-carousel__dot')];
  if (slides.length <= 1) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  let timer: ReturnType<typeof setInterval> | null = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function restartDotProgress() {
    dots.forEach((dot) => {
      const fill = dot.querySelector<HTMLElement>('.testimonials-carousel__dot-fill');
      if (!fill) return;
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.removeProperty('animation');
      fill.style.removeProperty('animation-play-state');
    });

    const activeDot = dots[index];
    if (!activeDot || reducedMotion) return;

    const fill = activeDot.querySelector<HTMLElement>('.testimonials-carousel__dot-fill');
    if (fill) {
      fill.style.animation = `testimonials-dot-progress ${AUTOPLAY_MS}ms linear forwards`;
    }
  }

  function pauseDotProgress() {
    dots.forEach((dot) => {
      const fill = dot.querySelector<HTMLElement>('.testimonials-carousel__dot-fill');
      if (fill) fill.style.animationPlayState = 'paused';
    });
  }

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

    restartDotProgress();
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    pauseDotProgress();
  }

  function start() {
    if (reducedMotion) return;
    stop();
    restartDotProgress();
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

interface Dot {
  bx: number;
  by: number;
  x: number;
  y: number;
}

const SPACING = 20;
const DOT_RADIUS = 1.25;
const DOT_COLOR = 'rgba(101, 53, 229, 0.11)';
const HOVER_RADIUS = 110;
const PUSH_STRENGTH = 32;
const EASE = 0.14;
const RETURN_EASE = 0.1;

function buildDots(w: number, h: number): Dot[] {
  const dots: Dot[] = [];
  const half = SPACING / 2;
  for (let x = half; x < w; x += SPACING) {
    for (let y = half; y < h; y += SPACING) {
      dots.push({ bx: x, by: y, x, y });
    }
  }
  return dots;
}

function initInteractiveDots() {
  const el = document.getElementById('site-dots-canvas');
  if (!(el instanceof HTMLCanvasElement)) return;
  const canvas = el;

  function getCtx(): CanvasRenderingContext2D {
    const c = canvas.getContext('2d');
    if (!c) throw new Error('Canvas 2D context unavailable');
    return c;
  }

  if (!canvas.getContext('2d')) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interactive = !reduced;

  let width = 0;
  let height = 0;
  let dots: Dot[] = [];
  let mouseX = -9999;
  let mouseY = -9999;
  let active = false;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = getCtx();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = buildDots(width, height);
  }

  function draw() {
    const ctx = getCtx();
    ctx.clearRect(0, 0, width, height);

    for (const dot of dots) {
      let targetX = dot.bx;
      let targetY = dot.by;

      if (interactive && active && mouseX > -9000) {
        const dx = dot.bx - mouseX;
        const dy = dot.by - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < HOVER_RADIUS && dist > 0.001) {
          const t = 1 - dist / HOVER_RADIUS;
          const force = t * t * PUSH_STRENGTH;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }
      }

      const ease = interactive && active ? EASE : RETURN_EASE;
      dot.x += (targetX - dot.x) * ease;
      dot.y += (targetY - dot.y) * ease;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = DOT_COLOR;
      ctx.fill();
    }
  }

  function needsFrame(): boolean {
    if (interactive && active) return true;
    return dots.some(
      (d) => Math.abs(d.x - d.bx) > 0.05 || Math.abs(d.y - d.by) > 0.05
    );
  }

  function tick() {
    if (needsFrame()) draw();
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  if (interactive) {
    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        active = true;
      },
      { passive: true }
    );

    document.documentElement.addEventListener('mouseleave', () => {
      mouseX = -9999;
      mouseY = -9999;
      active = false;
    });
  }

  requestAnimationFrame(tick);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInteractiveDots);
} else {
  initInteractiveDots();
}

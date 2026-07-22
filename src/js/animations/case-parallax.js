// Лёгкий tilt/параллакс на обложках кейсов: картинка чуть смещается
// в сторону, противоположную курсору, поверх существующего scale-hover.
// Тот же эффект — на обложках «Другие кейсы» в футере страниц кейсов
// (.other-case__cover), для единообразия hover-поведения по всему сайту.
const MAX_SHIFT = 6; // px, максимальное смещение по каждой оси

export function initCaseParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (prefersReducedMotion || isCoarsePointer) return;

  const covers = document.querySelectorAll('.case__cover, .other-case__cover');

  covers.forEach((cover) => {
    let frame = null;

    const setOffset = (x, y) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cover.style.setProperty('--parallax-x', `${x}px`);
        cover.style.setProperty('--parallax-y', `${y}px`);
      });
    };

    cover.addEventListener('mouseenter', () => {
      cover.classList.add('is-tracking');
    });

    cover.addEventListener('mousemove', (event) => {
      const rect = cover.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset((-nx * MAX_SHIFT * 2).toFixed(2), (-ny * MAX_SHIFT * 2).toFixed(2));
    });

    cover.addEventListener('mouseleave', () => {
      cover.classList.remove('is-tracking');
      setOffset(0, 0);
    });
  });
}

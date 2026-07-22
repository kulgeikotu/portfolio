// Лёгкое замедление скролла в scroll-stack секции кейсов: как только верх
// следующей карточки показался в кадре снизу, гасим deltaY колеса/трекпада —
// но только на первые APPEAR_THRESHOLD px её появления. Коэффициент — не
// вкл/выкл, а плавный купол (синусоида): от 1 (без замедления) в начале и
// конце зоны до SLOW_FACTOR в её середине, чтобы вход/выход был мягким,
// без рывка.
// Только десктоп (совпадает с брейкпоинтом самого stacking-эффекта в
// case-card.css) и только wheel — клавиатура/тач пока не гасятся.
const SLOW_FACTOR = 0.55;      // минимальный коэффициент скорости в пике замедления
const APPEAR_THRESHOLD = 30;   // px — ширина зоны замедления от появления следующей карточки

export function initCaseStackScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = document.querySelector('#cases');
  const cases = section ? Array.from(section.querySelectorAll('.case')) : [];
  if (!section || cases.length < 2) return;

  const isDesktop = () => window.matchMedia('(min-width:901px)').matches;

  // Насколько уже показалась следующая карточка (0..APPEAR_THRESHOLD px) →
  // плавный купол коэффициента скорости, без ступеньки на границах зоны
  function activeDampingFactor() {
    const vh = window.innerHeight;
    for (let i = 0; i < cases.length - 1; i++) {
      const shown = vh - cases[i + 1].getBoundingClientRect().top; // px, насколько видна
      if (shown > 0 && shown < APPEAR_THRESHOLD) {
        const progress = shown / APPEAR_THRESHOLD; // 0..1
        const ease = Math.sin(Math.PI * progress); // 0 → 1 → 0
        return 1 - (1 - SLOW_FACTOR) * ease;
      }
    }
    return 1;
  }

  window.addEventListener(
    'wheel',
    (event) => {
      if (!isDesktop()) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return; // горизонтальный свайп — не трогаем

      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) return; // секция кейсов вне экрана

      const factor = activeDampingFactor();
      if (factor >= 1) return;

      event.preventDefault();
      window.scrollTo({ top: window.scrollY + event.deltaY * factor, behavior: 'auto' });
    },
    { passive: false }
  );
}

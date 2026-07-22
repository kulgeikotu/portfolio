// Подсветка активного пункта навигации при скролле по секциям
export function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const linkById = {};
  navLinks.forEach((a) => {
    linkById[a.getAttribute('href').slice(1)] = a;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkById[entry.target.id];
        if (!link) return;
        // переключаем по факту вход/выход секции из зоны наблюдения —
        // иначе пункт остаётся подсвеченным навсегда после первого захода
        // в раздел (в т.ч. если вернуться обратно в hero)
        link.classList.toggle('is-active', entry.isIntersecting);
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => io.observe(s));
}

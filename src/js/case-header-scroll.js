// Хедер страниц кейсов остаётся прозрачным поверх hero (как задумано —
// сквозь него виден фон hero), но получает полупрозрачную подложку, как
// только hero прокручен полностью — иначе тёмные иконки/текст хедера
// теряются на тёмном блоке карточек-итогов в конце страницы.
export function initCaseHeaderScroll() {
  const header = document.querySelector('.case-header');
  const hero = document.querySelector('.case-hero');
  if (!header || !hero) return;

  const io = new IntersectionObserver(([entry]) => {
    header.classList.toggle('case-header--scrolled', !entry.isIntersecting);
  });
  io.observe(hero);
}

// На мобиле (≤900px, брейкпоинт .case в case-card.css) кликабельна вся
// карточка кейса, включая заголовок — не только обложка, как на десктопе
// (см. комментарий в case-card.css про десктопное поведение).
export function initCaseMobileLink() {
  const cards = document.querySelectorAll('.case');
  if (!cards.length) return;

  const isMobile = () => window.matchMedia('(max-width:900px)').matches;

  cards.forEach((card) => {
    const link = card.querySelector('.case__cover');
    if (!link) return;

    card.addEventListener('click', (event) => {
      if (!isMobile()) return;
      if (event.target.closest('a')) return; // сама обложка — клик уже обработан нативной ссылкой
      if (window.getSelection().toString()) return; // не мешаем выделению текста описания

      window.location.href = link.href;
    });
  });
}

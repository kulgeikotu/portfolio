// Стрелки влево/вправо на клавиатуре переключают визуалы — так же,
// как клики по стрелкам в .visual-footer (см. visual-footer.html).
// Ничего не делает вне страниц визуалов (там просто нет этих ссылок).
export function initVisualKeyNav() {
  const prev = document.querySelector('.visual-footer__arrow--prev');
  const next = document.querySelector('.visual-footer__arrow--next');
  if (!prev || !next) return;

  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;

    const target = e.target;
    const isTyping = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
    if (isTyping) return;

    if (e.key === 'ArrowLeft') window.location.href = prev.href;
    else if (e.key === 'ArrowRight') window.location.href = next.href;
  });
}

// Открытие/закрытие полноэкранного мобильного меню
export function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('menuClose');
  const menu = document.getElementById('mobileMenu');
  if (!toggle || !closeBtn || !menu) return;

  const links = menu.querySelectorAll('a');

  function open() {
    menu.setAttribute('data-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    menu.setAttribute('data-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  links.forEach((a) => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.getAttribute('data-open') === 'true') close();
  });
  // клик по блюр-фону вокруг плавающей панели тоже закрывает меню
  menu.addEventListener('click', (e) => {
    if (e.target === menu) close();
  });
}

// Переключатель языка: ведёт на ПАРНУЮ страницу другого языка.
// Пример: /cases/beeline-crm.html  <->  /en/cases/beeline-crm.html
export function initLangSwitch() {
  const btn = document.getElementById('langSwitch');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const isEn = path.startsWith('/en/') || path === '/en';

    let target;
    if (isEn) {
      // EN -> RU: убираем префикс /en
      target = path.replace(/^\/en/, '') || '/';
    } else {
      // RU -> EN: добавляем префикс /en
      target = '/en' + (path === '/' ? '/' : path);
    }

    // запоминаем выбор языка на будущее
    try {
      localStorage.setItem('preferred-lang', isEn ? 'ru' : 'en');
    } catch (_) {}

    window.location.href = target + window.location.hash;
  });
}

// Аналитика кликов через делегирование.
// На целевые элементы в разметке вешаем data-track="event_name".
// Vercel Analytics подключается в main.js через inject().

export function initAnalyticsEvents(track) {
  if (typeof track !== 'function') return;

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track(el.dataset.track);
  });
}

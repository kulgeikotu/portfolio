// Точка входа. Vite подхватит этот файл из <script type="module">.
// Стили подключены отдельным <link rel="stylesheet"> в head-meta.html
// (чтобы блокировать отрисовку и не мерцать неотстилизованным HTML) —
// здесь их импортировать не нужно, иначе задвоятся в сборке.

import { initMobileMenu } from './mobile-menu.js';
import { initSmoothAnchors } from './smooth-anchors.js';
import { initActiveNav } from './active-nav.js';
import { initCaseHeaderScroll } from './case-header-scroll.js';
import { initLangSwitch } from './lang-switch.js';
import { initAnimations } from './animations/index.js';
import { initAnalyticsEvents } from './analytics/events.js';
import { initEmailCopy } from './email-copy.js';
import { initImageLoaders } from './image-loader.js';
import { initVisualKeyNav } from './visual-key-nav.js';
import { initCaseMobileLink } from './case-mobile-link.js';

// Vercel Analytics — цифры/отвалы. Работает после деплоя на Vercel.
import { inject, track } from '@vercel/analytics';

function boot() {
  initMobileMenu();
  initSmoothAnchors();
  initActiveNav();
  initCaseHeaderScroll();
  initLangSwitch();
  initAnimations();
  initEmailCopy();
  initImageLoaders();
  initVisualKeyNav();
  initCaseMobileLink();

  inject();                    // просмотры страниц
  initAnalyticsEvents(track);  // кастомные клики по data-track
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

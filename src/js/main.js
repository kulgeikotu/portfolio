// Точка входа. Vite подхватит этот файл из <script type="module">.
import '../styles/main.css';

import { initMobileMenu } from './mobile-menu.js';
import { initSmoothAnchors } from './smooth-anchors.js';
import { initActiveNav } from './active-nav.js';
import { initCaseHeaderScroll } from './case-header-scroll.js';
import { initLangSwitch } from './lang-switch.js';
import { initAnimations } from './animations/index.js';
import { initAnalyticsEvents } from './analytics/events.js';
import { initEmailCopy } from './email-copy.js';

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

  inject();                    // просмотры страниц
  initAnalyticsEvents(track);  // кастомные клики по data-track
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

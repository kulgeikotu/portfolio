// Реестр анимаций. Появления при скролле + параллакс на обложках кейсов.
import { initRevealOnScroll } from './reveal-on-scroll.js';
import { initCaseParallax } from './case-parallax.js';
import { initCaseStackScroll } from './case-stack-scroll.js';

export function initAnimations() {
  initRevealOnScroll();
  initCaseParallax();
  initCaseStackScroll();
  // initHeroIntro();  // ← позже
}

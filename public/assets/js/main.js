/**
 * main.js
 * Entry point for the storefront JavaScript.
 *
 * Each feature lives in its own module under ./modules/. This file only
 * imports them and calls their init functions, so adding a feature later
 * means adding one import and one line here.
 */

import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/scroll-reveal.js';

/** Writes the current year into the footer copyright. */
function setCurrentYear() {
  const yearElement = document.querySelector('#current-year');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

/** Runs every module once the DOM is ready. */
function init() {
  initNavigation();
  initScrollReveal();
  setCurrentYear();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
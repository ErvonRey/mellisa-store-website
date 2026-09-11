/**
 * navigation.js
 * Controls the mobile menu button and keeps the menu state in sync with
 * the aria-expanded attribute, so screen readers always know what is open.
 *
 * Exported as a single init function: main.js decides when to run it.
 */

const DESKTOP_QUERY = '(min-width: 901px)'; // must match the breakpoint in layout.css

export function initNavigation() {
  const nav = document.querySelector('#primary-nav');
  const toggle = document.querySelector('.nav-toggle');

  // Bail out quietly if the markup changes later and these are missing.
  if (!nav || !toggle) {
    return;
  }

  /** Open or close the menu and keep the button's aria state in sync. */
  function setMenuOpen(isOpen) {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  }

  function isMenuOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  // 1. Clicking the button toggles the menu.
  toggle.addEventListener('click', () => {
    setMenuOpen(!isMenuOpen());
  });

  // 2. Tapping any link inside the menu closes it (mobile convenience).
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      setMenuOpen(false);
    }
  });

  // 3. Escape closes the menu and returns focus to the button.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // 4. If the viewport grows to desktop width, drop the mobile menu state
  //    so the horizontal navigation is never left hidden.
  const desktopMedia = window.matchMedia(DESKTOP_QUERY);
  desktopMedia.addEventListener('change', (event) => {
    if (event.matches) {
      setMenuOpen(false);
    }
  });
}
/**
 * scroll-reveal.js
 * Animates `.reveal` elements with the scroll position using
 * IntersectionObserver: they fade and lift into place when they enter the
 * viewport, and animate back out when they leave it — so scrolling down
 * again replays the effect.
 *
 * Hidden state lives in components.css and is undone in index.html with a
 * <noscript> fallback, so the content is always visible without JavaScript.
 * Users who ask for reduced motion get the final state immediately.
 *
 * Exported as a single init function: main.js decides when to run it.
 */

const VISIBLE_CLASS = 'is-visible';

/* How much of an element must be on screen before it counts as visible. */
const VISIBLE_THRESHOLD = 0.15;

/* Keeps the toggle from flickering right at the viewport edge. */
const ROOT_MARGIN = '0px 0px -10% 0px';

export function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');

  // Nothing to animate on this page.
  if (targets.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Show everything at once if the browser can't observe, or motion is unwanted.
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    targets.forEach((element) => element.classList.add(VISIBLE_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Enter the viewport: animate in. Leave it: animate back out, so the
        // effect replays the next time the element scrolls in.
        entry.target.classList.toggle(VISIBLE_CLASS, entry.isIntersecting);
      });
    },
    { threshold: VISIBLE_THRESHOLD, rootMargin: ROOT_MARGIN },
  );

  targets.forEach((element) => observer.observe(element));
}
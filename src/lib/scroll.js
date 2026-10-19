// Shared smooth-scroll helper. App registers its Lenis instance here;
// without Lenis (reduced motion) we fall back to native scrolling.
let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export const scrollToId = (id, { instant = false } = {}) => {
  const target = id === 'top' ? null : document.getElementById(id);
  if (id !== 'top' && !target) return;

  // Sections carry `scroll-margin-top` (see index.css) so they clear the sticky navbar;
  // both Lenis and native scrollIntoView respect it.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (instant && target) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
  } else if (lenis) {
    lenis.scrollTo(target ?? 0);
  } else if (target) {
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }

  if (target) {
    // Move keyboard focus to the section so tabbing continues from there.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', `#${id}`);
  }
};

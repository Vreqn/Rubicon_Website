/* ==========================================================================
   SCROLL REVEAL — content rises in on first view. Designed to FAIL OPEN:
   CSS transitions are frozen while a tab/iframe is hidden or throttled, so
   whenever animation can't actually run we commit the visible end-state
   instantly (via the .reveal-instant class) instead of trapping content at
   opacity 0. The fade only plays in a genuinely visible tab.

   The initial hidden state is additionally gated behind html.js (set by the
   inline <head> script in BaseLayout), so a no-JS visitor never gets
   invisible content at all. CSS lives in global.css.
   ========================================================================== */
const docEl = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = Array.from(document.querySelectorAll('[data-reveal]'));

if (els.length) {
  const reveal = (el) => el.classList.add('is-in');
  const showAllInstant = () => {
    docEl.classList.add('reveal-instant'); // bypasses the transition entirely
    els.forEach(reveal);
    els.length = 0;
  };

  // If we can't animate right now, just show everything, no transition.
  if (reduce || document.visibilityState !== 'visible') {
    showAllInstant();
  } else {
    const sweep = () => {
      const vh = window.innerHeight || docEl.clientHeight;
      for (let i = els.length - 1; i >= 0; i--) {
        const r = els[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          reveal(els[i]);
          els.splice(i, 1);
        }
      }
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              reveal(e.target);
              io.unobserve(e.target);
              const k = els.indexOf(e.target);
              if (k >= 0) els.splice(k, 1);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
      );
      els.slice().forEach((el) => io.observe(el));
    }

    sweep();
    window.addEventListener('scroll', sweep, { passive: true });
    window.addEventListener('resize', sweep, { passive: true });

    // If the tab becomes hidden, transitions freeze — reveal the rest with no
    // animation so nothing is ever stuck invisible when the user returns.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') showAllInstant();
    });
  }
}

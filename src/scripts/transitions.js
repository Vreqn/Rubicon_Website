/* ==========================================================================
   PAGE TRANSITIONS — controller
   Works with src/styles/transitions.css and the small inline <head> script
   in BaseLayout. The arrive curtain is painted by CSS at first paint (gated
   by the rw-arrive class the inline script sets), so this file only needs to:
     · arm the frozen-tab safety (.rw-arrived) for the arrive curtain,
     · intercept in-site link clicks to play the LEAVE curtain, then navigate,
     · flag sessionStorage so the NEXT page knows to play its arrive curtain.

   FAILS OPEN: under reduced-motion it does nothing and navigation is normal;
   if an animation never fires, a timeout navigates anyway; and the arrive
   curtain self-clears even with no JS at all (pure CSS animation).

   The 620ms / 1300ms failsafes must outlast --dur-curtain-leave / -arrive in
   tokens.css — change them together.
   ========================================================================== */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const docEl = document.documentElement;
const FLAG = 'rw-xover'; // sessionStorage flag: "this navigation is in-site"

// Frozen-tab safety: after the arrive curtain should have lifted, force it
// hidden so a throttled/background tab can never stay covered.
if (!reduce && docEl.classList.contains('rw-arrive')) {
  setTimeout(() => docEl.classList.add('rw-arrived'), 1300);
}

if (!reduce) {
  let navigating = false;

  // --- LEAVE: rise from the bottom to cover, then navigate ---------------
  const leaveTo = (url) => {
    if (navigating) return;
    navigating = true;
    try {
      sessionStorage.setItem(FLAG, '1'); // tell next page to arrive
    } catch {
      /* storage unavailable — next page simply lands without a curtain */
    }
    docEl.classList.remove('rw-arrived'); // let the curtain show for the leave
    docEl.classList.add('rw-leaving');

    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.href = url;
    };
    docEl.addEventListener('animationend', function onEnd(e) {
      if (e.animationName !== 'rw-leave-panel') return;
      docEl.removeEventListener('animationend', onEnd);
      go();
    });
    setTimeout(go, 620); // safety net if animationend never fires (frozen tab)
  };

  // --- decide whether a click should trigger the curtain -----------------
  const isInternalNav = (a, href) => {
    if (!href) return false;
    if (a.target && a.target !== '_self') return false; // new tab/frame
    if (a.hasAttribute('download')) return false;
    if (/^(mailto:|tel:|javascript:)/i.test(href)) return false;
    if (href.charAt(0) === '#') return false; // same-page anchor
    let dest;
    try {
      dest = new URL(a.href, window.location.href);
    } catch {
      return false;
    }
    if (dest.origin !== window.location.origin) return false; // external
    if (dest.pathname === window.location.pathname && dest.hash) return false;
    return true;
  };

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented) return; // e.g. the study reader claimed this click
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!isInternalNav(a, href)) return;
    e.preventDefault();
    leaveTo(a.href);
  });

  // --- bfcache: returning via Back/Forward may restore a covered page ----
  window.addEventListener('pageshow', (ev) => {
    if (ev.persisted) {
      navigating = false;
      docEl.classList.remove('rw-leaving');
      try {
        sessionStorage.removeItem(FLAG);
      } catch {
        /* ignore */
      }
    }
  });
}

/* ==========================================================================
   3D TILT — study cards float toward the cursor, with parallax depth layers
   (CSS in StudyCard.astro, keyed off data-tilt="on"). Skipped entirely under
   reduced motion. Reads --tilt-max (deg) from tokens.css.
   ========================================================================== */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-tilt-grid]').forEach((grid) => {
  if (reduce) return;
  grid.setAttribute('data-tilt', 'on');

  const tiltMax = () => {
    const v = parseFloat(getComputedStyle(grid).getPropertyValue('--tilt-max'));
    return Number.isNaN(v) ? 18 : v;
  };

  grid.querySelectorAll('.study').forEach((card) => {
    let raf = null;

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const m = tiltMax();
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `rotateY(${(px * m).toFixed(2)}deg) rotateX(${(-py * m).toFixed(2)}deg)`;
      });
    };

    card.addEventListener('pointerenter', () => card.classList.add('is-active'));
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', () => {
      if (raf) cancelAnimationFrame(raf);
      card.classList.remove('is-active');
      card.style.transform = '';
    });
  });
});

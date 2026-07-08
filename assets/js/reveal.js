/* reveal.js — fallback reveal + clip-reveal for images */
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var supportsView = (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()'));
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Clip-reveal for images (insight lead, etc.)
  var clipEls = document.querySelectorAll('.clip-reveal');
  if (clipEls.length && 'IntersectionObserver' in window) {
    var clipIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          clipIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    clipEls.forEach(function (el) { clipIo.observe(el); });
  }

  if (!reduce) {
    // Also observe .clip-reveal for view-timeline support
    if (supportsView) return; // CSS handles it
  }

  // Modern browsers animate .reveal via CSS view() timeline; nothing to do.
  if (supportsView || reduce) return;

  document.body.classList.add('reveal--io');
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

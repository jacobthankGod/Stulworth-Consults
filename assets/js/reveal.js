/* reveal.js — IntersectionObserver fallback for .reveal elements */
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // view() timeline doesn't reliably fire on file:// protocol. Treat as unsupported.
  var isFile = window.location.protocol === 'file:';
  var supportsView = !isFile && !reduce && typeof CSS !== 'undefined' && CSS.supports && CSS.supports('animation-timeline: view()');

  if (supportsView) {
    // CSS scroll-driven animation handles the reveal. Nothing else needed.
    return;
  }

  // Fallback: IntersectionObserver
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

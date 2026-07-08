/* smooth.js — Lenis smooth scroll + scroll progress bar + a11y guard */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.querySelector('.scroll-progress');
  var lenis = null;

  function update(p) { if (bar) bar.style.transform = 'scaleX(' + Math.max(0, Math.min(1, p)) + ')'; }

  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, duration: 1.2, smoothWheel: true });
    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(performance.now());
    lenis.on('scroll', function (e) { update(e.progress || 0); });
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id && id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(document.querySelector(id), { offset: -90 });
        }
      });
    });
  } else {
    window.addEventListener('scroll', function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      update(h > 0 ? window.scrollY / h : 0);
    }, { passive: true });
  }
})();

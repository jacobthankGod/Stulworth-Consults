/* reveal.js — make .reveal elements visible via IntersectionObserver */
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

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
  }, { threshold: 0, rootMargin: '0px 0px 80px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

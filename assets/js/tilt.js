/* tilt.js — 3D tilt + cursor-tracking glow for [data-tilt] cards */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  if (reduce || !fine) return;

  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    var raf = null;
    function move(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width;
      var y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      card.style.setProperty('--rx', ((0.5 - y) * 9).toFixed(2) + 'deg');
      card.style.setProperty('--ry', ((x - 0.5) * 9).toFixed(2) + 'deg');
    }
    card.addEventListener('pointermove', function (e) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { move(e); });
    });
    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
})();

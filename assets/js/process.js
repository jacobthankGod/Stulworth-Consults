/* process.js — pin-stack vertical slide with per-card transforms */
(function () {
  var track = document.getElementById('pinTrack');
  var section = document.querySelector('#process');
  if (!track || !section) return;

  var slides = track.querySelectorAll('.pin-slide');
  var count = slides.length;
  if (count < 2) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    slides[0].classList.add('active-slide');
    return;
  }

  var pinSticky = section.querySelector('.pin-sticky');
  var stickyOffset = pinSticky.offsetTop;

  var stackGap = 40;

  function update() {
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var scrollStart = 70 - stickyOffset;
    var done = Math.max(0, scrollStart - rect.top);
    var total = rect.height - vh;
    var p = Math.min(1, (done + 1) / total);

    var activeIdx = p * count;
    var k = Math.min(Math.floor(activeIdx + 0.001), count - 1);
    var phaseProgress = activeIdx - k;

    slides.forEach(function (s, i) {
      var y;
      if (i <= k) {
        y = 0;
      } else if (i === k + 1) {
        var enterPhase = Math.min(1, Math.max(0, (phaseProgress - 0.3) / 0.7));
        y = Math.max(0, vh - enterPhase * vh);
      } else {
        y = vh + (i - k - 1) * stackGap;
      }

      s.style.transform = 'translateY(' + y + 'px)';
      s.classList.toggle('active-slide', i === k);
    });
  }

  function resize() {
    stickyOffset = pinSticky.offsetTop;
    var vh = window.innerHeight;
    var scrollRange = count * vh;
    section.style.minHeight = Math.ceil(vh + scrollRange) + 'px';
    update();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', update, { passive: true });
  resize();
})();

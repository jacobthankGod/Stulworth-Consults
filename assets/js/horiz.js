/* horiz.js — sticky horizontal scroll for capabilities carousel */
(function () {
  var track = document.getElementById('horizTrack');
  var section = document.querySelector('.horiz-section');
  if (!track || !section) return;

  var panels = track.querySelectorAll('.horiz-panel');
  if (panels.length < 2) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.transform = 'none';
    return;
  }

  var headSpace = 0;
  var scrollNeeded = 0;
  var scrollW = 0;
  var measured = false;

  function update() {
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var done = vh - rect.top;

    var headerH = 70;
    var pinDone = vh - headerH + headSpace;
    var p = scrollNeeded > 0
      ? Math.max(0, Math.min(1, (done - pinDone) / scrollNeeded))
      : 0;

    track.style.transform = 'translateX(' + (-p * scrollW) + 'px)';
  }

  function resize() {
    scrollW = Math.max(0, track.scrollWidth - window.innerWidth);
    var sticky = document.querySelector('.horiz-sticky');
    var stickyH = sticky ? sticky.offsetHeight : window.innerHeight;
    var head = section.querySelector('.container');
    var headH = head ? head.offsetHeight : 0;
    section.style.minHeight = Math.ceil(stickyH + headH + scrollW + 120) + 'px';

    scrollNeeded = scrollW + 120;

    if (!measured && sticky) {
      var sr = section.getBoundingClientRect();
      headSpace = sticky.getBoundingClientRect().top - sr.top;
      measured = true;
    }

    update();
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('scroll', update, { passive: true });

  // Hook into Lenis if it exists (smooth scroll on index.html)
  var checkLenis = setInterval(function () {
    if (typeof Lenis !== 'undefined' && window.lenis) {
      window.lenis.on('scroll', update);
      clearInterval(checkLenis);
    }
  }, 200);
  setTimeout(function () { clearInterval(checkLenis); }, 3000);

  resize();

  // Re-check assets after lazy images load
  window.addEventListener('load', function () {
    setTimeout(resize, 300);
  });
})();

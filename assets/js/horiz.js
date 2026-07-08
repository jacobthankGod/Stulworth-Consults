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
  var ticking = false;
  var rafId = null;

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
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      rafId = requestAnimationFrame(update);
      ticking = true;
    }
  }

  function resize() {
    if (rafId) cancelAnimationFrame(rafId);
    ticking = false;

    scrollW = Math.max(0, track.scrollWidth - window.innerWidth);
    var sticky = document.querySelector('.horiz-sticky');
    var stickyH = sticky ? sticky.offsetHeight : window.innerHeight;
    var head = section.querySelector('.container');
    var headH = head ? head.offsetHeight : 0;
    var overflow = Math.max(0, track.scrollWidth - window.innerWidth);
    section.style.minHeight = Math.ceil(stickyH + headH + overflow + 120) + 'px';

    scrollNeeded = overflow + 120;

    if (!measured && sticky) {
      var sr = section.getBoundingClientRect();
      headSpace = sticky.getBoundingClientRect().top - sr.top;
      measured = true;
    }

    onScroll();
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  resize();
})();

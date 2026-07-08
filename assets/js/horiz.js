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

  var headSpace = 0;     // natural distance from section top to sticky top
  var scrollNeeded = 0;  // overflow + 120 (p=1 when sticky unpins)
  var measured = false;

  function update() {
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;
    var done = vh - rect.top;

    // p = 0 when the sticky pins (its top reaches header-h)
    var headerH = 70;
    var pinDone = vh - headerH + headSpace;
    var p = scrollNeeded > 0
      ? Math.max(0, Math.min(1, (done - pinDone) / scrollNeeded))
      : 0;

    var scrollW = Math.max(0, track.scrollWidth - window.innerWidth);
    track.style.transform = 'translateX(' + (-p * scrollW) + 'px)';
  }

  function resize() {
    var overflow = Math.max(0, track.scrollWidth - window.innerWidth);
    var sticky = document.querySelector('.horiz-sticky');
    var stickyH = sticky ? sticky.offsetHeight : window.innerHeight;
    var head = section.querySelector('.container');
    var headH = head ? head.offsetHeight : 0;
    section.style.minHeight = Math.ceil(stickyH + headH + overflow + 120) + 'px';

    scrollNeeded = overflow + 120;

    if (!measured && sticky) {
      var sr = section.getBoundingClientRect();
      headSpace = sticky.getBoundingClientRect().top - sr.top;
      measured = true;
    }

    update();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('scroll', update, { passive: true });
  resize();
})();

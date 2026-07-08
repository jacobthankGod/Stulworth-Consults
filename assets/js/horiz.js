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
  var scrollW = 0;
  var headerH = 70;

  function update() {
    var rect = section.getBoundingClientRect();
    var vh = window.innerHeight;

    // How far the section has scrolled past the pin point
    // Pin happens when the sticky's top reaches headerH from viewport top
    // i.e., when section's top = headerH - headSpace
    var pinOffset = headerH - rect.top - headSpace;

    // Available scroll distance while the sticky is pinned
    // = section total height - viewport - vertical space before sticky + header
    var totalPin = section.scrollHeight - vh - headSpace + headerH;

    var p = totalPin > 0
      ? Math.max(0, Math.min(1, pinOffset / totalPin))
      : 0;

    track.style.transform = 'translateX(' + (-p * scrollW) + 'px)';
  }

  function resize() {
    scrollW = Math.max(0, track.scrollWidth - window.innerWidth);
    var sticky = document.querySelector('.horiz-sticky');
    if (!sticky) return;

    // Measure headSpace first (doesn't depend on minHeight)
    var sr = section.getBoundingClientRect();
    headSpace = sticky.getBoundingClientRect().top - sr.top;

    // Set minHeight so available pin scroll exactly fits scrollW + 120px buffer
    // availablePin = section.scrollHeight - vh - headSpace + headerH
    // We want: section.scrollHeight - vh - headSpace + headerH = scrollW + 120
    // So: section.scrollHeight = scrollW + 120 + vh + headSpace - headerH
    var target = scrollW + 120 + window.innerHeight + headSpace - headerH;
    section.style.minHeight = Math.ceil(target) + 'px';

    if (window.lenis) window.lenis.resize();

    update();
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  }

  window.addEventListener('resize', onResize, { passive: true });

  // Hook into Lenis (already initialized by smooth.js before this runs)
  if (window.lenis) window.lenis.on('scroll', update);

  resize();

  window.addEventListener('load', function () {
    setTimeout(function () {
      resize();
      if (window.lenis) window.lenis.resize();
    }, 300);
  });
})();

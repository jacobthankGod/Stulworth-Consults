/* hero.js — rotating hero slides with autoplay, controls, a11y, reduced-motion */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (slides.length < 2) return;

  var dotsWrap = document.querySelector('.hero-dots');
  var prev = document.querySelector('.hero-prev');
  var next = document.querySelector('.hero-next');
  var root = document.querySelector('.hero-slides');
  var index = 0;
  var timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build dots
  if (dotsWrap) {
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', function () { go(i); restart(); });
      dotsWrap.appendChild(b);
    });
  }
  var dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];

  function go(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('active', n === index); });
    dots.forEach(function (d, n) { d.classList.toggle('active', n === index); });
    if (root) root.setAttribute('aria-live', 'polite');
  }
  function nextSlide() { go(index + 1); }
  function prevSlide() { go(index - 1); }

  function start() {
    if (reduce) return;
    stop();
    timer = setInterval(nextSlide, 6000);
  }
  function stop() { if (timer) clearInterval(timer); }
  function restart() { stop(); start(); }

  if (next) next.addEventListener('click', function () { nextSlide(); restart(); });
  if (prev) prev.addEventListener('click', function () { prevSlide(); restart(); });

  var region = document.querySelector('.hero');
  if (region) {
    region.addEventListener('mouseenter', stop);
    region.addEventListener('mouseleave', start);
    region.addEventListener('focusin', stop);
    region.addEventListener('focusout', start);
  }

  go(0);
  start();
})();

/* nav.js — header scroll state, mega-menu, mobile menu, adaptive header */
(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Adaptive header — darken when dark band touches the header
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.band--dark, section.band--accent'));
  if (header && sections.length) {
    function onAdaptive() {
      var dark = false;
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top <= 76 && rect.bottom > 0) { dark = true; break; }
      }
      header.classList.toggle('header--dark', dark);
    }
    window.addEventListener('scroll', onAdaptive, { passive: true });
    onAdaptive();
  }

  // Sticky bottom CTA bar (appears after first viewport)
  var ctaBar = document.getElementById('ctaBar');
  if (ctaBar) {
    var onCta = function () {
      var show = window.scrollY > window.innerHeight * 0.6;
      ctaBar.classList.toggle('show', show);
      ctaBar.setAttribute('aria-hidden', show ? 'false' : 'true');
    };
    window.addEventListener('scroll', onCta, { passive: true });
    onCta();
  }

  // Desktop mega-menu (hover + focus + click)
  var items = document.querySelectorAll('.nav-item.has-mega');
  items.forEach(function (item) {
    var open = function () { item.classList.add('open'); };
    var close = function () { item.classList.remove('open'); };
    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    var trigger = item.querySelector('> a');
    if (trigger) {
      trigger.addEventListener('focus', open);
      trigger.addEventListener('click', function (e) {
        // allow navigation but toggle on desktop
        if (window.innerWidth > 980) { e.preventDefault(); item.classList.toggle('open'); }
      });
    }
  });

  // Escape closes menus
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      items.forEach(function (i) { i.classList.remove('open'); });
      closeMobile();
    }
  });

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var closeBtn = document.querySelector('.mobile-close');
  var menu = document.querySelector('.mobile-menu');

  function openMobile() {
    if (!menu) return;
    menu.classList.add('open');
    document.body.classList.add('menu-open');
    if (closeBtn) closeBtn.classList.add('show');
  }
  function closeMobile() {
    if (!menu) return;
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (closeBtn) closeBtn.classList.remove('show');
  }

  if (toggle) toggle.addEventListener('click', openMobile);
  if (closeBtn) closeBtn.addEventListener('click', closeMobile);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobile);
    });
  }
})();

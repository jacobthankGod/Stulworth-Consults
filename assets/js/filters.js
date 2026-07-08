/* filters.js — capability filter + sliding indicator + reflow pop */
(function () {
  var bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;
  var buttons = bar.querySelectorAll('.chip');
  var cards = document.querySelectorAll('[data-group]');
  var indicator = bar.querySelector('.chip-indicator');

  function moveIndicator(btn) {
    if (!indicator) return;
    indicator.style.width = btn.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }

  function apply(filter, btn) {
    buttons.forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    moveIndicator(btn);
    cards.forEach(function (card) {
      var show = filter === 'all' || card.getAttribute('data-group') === filter;
      card.style.display = show ? '' : 'none';
      if (show) {
        card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
      }
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-filter'), btn);
    });
  });

  window.addEventListener('resize', function () {
    var active = bar.querySelector('.chip.active');
    if (active) moveIndicator(active);
  });

  // init indicator position
  var active = bar.querySelector('.chip.active') || buttons[0];
  if (active) requestAnimationFrame(function () { moveIndicator(active); });
})();

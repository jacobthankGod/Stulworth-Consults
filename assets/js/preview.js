/* preview.js — cursor-following image preview for editorial insights + cards */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var preview = document.querySelector('.ins-preview');
  if (!preview || reduce || !fine) return;
  var img = preview.querySelector('img');
  var rows = document.querySelectorAll('.ins-row[data-preview]');
  var cards = document.querySelectorAll('[data-card-preview]');

  var raf = null, tx = 0, ty = 0;
  function place() {
    preview.style.left = tx + 'px';
    preview.style.top = ty + 'px';
  }
  function onMove(e) {
    tx = e.clientX; ty = e.clientY;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(place);
  }

  if (rows.length) {
    document.querySelector('.ins-list').addEventListener('pointermove', onMove);
    rows.forEach(function (row) {
      row.addEventListener('pointerenter', function () {
        if (img) img.src = row.getAttribute('data-preview');
        preview.classList.add('show');
      });
      row.addEventListener('pointerleave', function () { preview.classList.remove('show'); });
    });
  }

  cards.forEach(function (card) {
    var src = card.getAttribute('data-card-preview');
    card.addEventListener('pointerenter', function () {
      if (img && src) img.src = src;
      preview.classList.add('show');
    });
    card.addEventListener('pointerleave', function () { preview.classList.remove('show'); });
    card.addEventListener('pointermove', onMove);
  });
})();

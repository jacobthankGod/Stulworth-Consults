/* work.js — horizontal work carousel nav + meta counter */
(function () {
  var track = document.querySelector('.work-carousel');
  if (!track) return;
  var prev = document.querySelector('.work-prev');
  var next = document.querySelector('.work-next');

  function step() {
    var card = track.querySelector('.work-card');
    var amount = card ? card.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    return amount;
  }
  if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
  if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });

  // Keyboard support when carousel is focused
  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { track.scrollBy({ left: step(), behavior: 'smooth' }); }
    if (e.key === 'ArrowLeft') { track.scrollBy({ left: -step(), behavior: 'smooth' }); }
  });
})();

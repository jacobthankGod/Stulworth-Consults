/* forms.js — client-side contact form validation + fake submit */
(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;
  var status = form.querySelector('.form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var required = form.querySelectorAll('[required]');
    required.forEach(function (field) {
      var valid = field.value.trim() !== '';
      if (field.type === 'email') valid = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      field.style.borderColor = valid ? '' : 'var(--accent-deep)';
      if (!valid) ok = false;
    });
    if (!ok) {
      if (status) { status.textContent = 'Please complete the required fields with a valid email.'; status.style.background = 'rgba(200,30,30,0.08)'; status.style.color = '#b00020'; status.classList.add('show'); }
      return;
    }
    if (status) {
      status.textContent = 'Thanks — your message is on its way. We’ll be in touch soon.';
      status.style.background = ''; status.style.color = '';
      status.classList.add('show');
    }
    form.reset();
  });
})();

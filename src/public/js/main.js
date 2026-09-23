document.addEventListener('DOMContentLoaded', function() {
  const whatsappLink = window.__WHATSAPP_LINK__;
  if (!whatsappLink) return;

  const whatsappBtn = document.querySelector('.whatsapp-float__link');
  if (whatsappBtn) {
    whatsappBtn.href = whatsappLink;
  }

  const yearElements = document.querySelectorAll('[data-year]');
  yearElements.forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  var existingYearSpans = document.querySelectorAll('.js-year');
  existingYearSpans.forEach(function(span) {
    span.textContent = new Date().getFullYear();
  });
});

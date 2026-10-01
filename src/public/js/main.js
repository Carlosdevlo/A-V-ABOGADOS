document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var whatsappLink = window.__WHATSAPP_LINK__;
  if (whatsappLink) {
    var whatsappBtns = document.querySelectorAll('.whatsapp-float__link, .btn--whatsapp');
    whatsappBtns.forEach(function(btn) {
      btn.href = whatsappLink;
    });
  }
});
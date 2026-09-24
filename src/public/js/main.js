document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var whatsappLink = window.__WHATSAPP_LINK__;
  if (whatsappLink) {
    var whatsappBtns = document.querySelectorAll('.whatsapp-float__link, .btn--whatsapp');
    whatsappBtns.forEach(function(btn) {
      btn.href = whatsappLink;
    });
  }

  var yearElements = document.querySelectorAll('[data-year]');
  yearElements.forEach(function(el) {
    el.textContent = new Date().getFullYear();
  });

  var existingYearSpans = document.querySelectorAll('.js-year');
  existingYearSpans.forEach(function(span) {
    span.textContent = new Date().getFullYear();
  });

  /* ===== Lazy-load banner video ===== */
  var bannerVideo = document.querySelector('.banner__video');
  var bannerPoster = document.querySelector('.banner__poster');

  if (bannerVideo) {
    bannerVideo.setAttribute('preload', 'none');

    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var video = entry.target;
            var source = video.querySelector('source');
            var dataSrc = video.getAttribute('data-src');

            if (dataSrc && source) {
              source.setAttribute('src', dataSrc);
              video.load();
            }

            video.setAttribute('preload', 'metadata');
            video.muted = true;
            video.playsInline = true;

            video.play().then(function() {
              video.setAttribute('data-loaded', 'true');
              if (bannerPoster) {
                bannerPoster.classList.add('hidden');
              }
            }).catch(function() {
              if (bannerPoster) {
                bannerPoster.classList.add('hidden');
              }
            });

            videoObserver.unobserve(video);
          }
        });
      }, { threshold: 0.25 });

      videoObserver.observe(bannerVideo);
    }
  }
});

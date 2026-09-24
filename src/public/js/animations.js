document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-aos]').forEach(function(el) {
      el.classList.add('aos-animate');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('[data-counter]').forEach(function(el) {
      var target = parseInt(el.getAttribute('data-counter')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      el.textContent = prefix + target.toLocaleString('es-CO') + suffix;
    });
    return;
  }

  /* ===== Scroll reveal animations (AOS-like) ===== */
  var animatedElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window) {
    var observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var animation = el.getAttribute('data-aos') || 'fade-up';
          var delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);

          var applyAnimation = function() {
            el.classList.add('aos-animate');
            el.style.opacity = '1';
            el.style.transform = 'translate(0) scale(1)';
            observer.unobserve(el);
          };

          if (delay > 0) {
            setTimeout(applyAnimation, delay);
          } else {
            applyAnimation();
          }
        }
      });
    }, observerOptions);

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function(el) {
      el.classList.add('aos-animate');
      el.style.opacity = '1';
      el.style.transform = 'translate(0) scale(1)';
    });
  }

  /* ===== Counter animations ===== */
  var counters = document.querySelectorAll('[data-counter]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-counter')) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var duration = 2000;
          var step = Math.max(1, Math.floor(target / (duration / 16)));
          var current = 0;
          var isDecimal = el.getAttribute('data-counter').toString().indexOf('.') !== -1;

          var timer = setInterval(function() {
            current += step;
            if (current >= target) {
              current = target;
              if (isDecimal) {
                el.textContent = prefix + current.toFixed(2) + suffix;
              } else {
                el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
              }
              clearInterval(timer);
            } else {
              if (isDecimal) {
                el.textContent = prefix + current.toFixed(2) + suffix;
              } else {
                el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
              }
            }
          }, 16);

          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function(el) {
      counterObserver.observe(el);
    });
  }

  /* ===== FAQ accordion ===== */
  var faqItems = document.querySelectorAll('.faq__question');
  if (faqItems.length > 0) {
    faqItems.forEach(function(button) {
      button.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        var answer = this.nextElementSibling;

        this.setAttribute('aria-expanded', !expanded);

        if (answer) {
          if (expanded) {
            answer.style.display = 'none';
          } else {
            answer.style.display = 'block';
          }
        }
      });
    });
  }

  /* ===== Smooth scroll for anchor links ===== */
  var smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        var offset = 100;
        if (window.innerWidth < 768) {
          offset = 80;
        }
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        window.history.pushState(null, '', '#' + targetId);
      }
    });
  });
});

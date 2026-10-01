document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-aos]').forEach(function(el) {
      el.classList.add('aos-animate');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  /* ===== Scroll reveal animations (AOS-like) ===== */
  var animatedElements = document.querySelectorAll('[data-aos]');

  var applyAOS = function(el) {
    el.classList.add('aos-animate');
    el.style.opacity = '1';
    el.style.transform = 'translate(0) scale(1)';
  };

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
            applyAOS(el);
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

    /* Safety fallback: if IntersectionObserver hasn't revealed elements
       within 3 seconds (common on slow mobile), reveal all */
    setTimeout(function() {
      var unrevealed = document.querySelectorAll('[data-aos]:not(.aos-animate)');
      unrevealed.forEach(applyAOS);
    }, 3000);
  } else {
    animatedElements.forEach(applyAOS);
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
            answer.classList.remove('faq__answer--is-open');
          } else {
            answer.classList.add('faq__answer--is-open');
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

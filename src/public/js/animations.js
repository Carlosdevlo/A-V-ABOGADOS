document.addEventListener('DOMContentLoaded', function() {
  var animatedElements = document.querySelectorAll('[data-aos]');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var animation = el.getAttribute('data-aos') || 'fade-up';
          var delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);

          var applyAnimation = function() {
            if (animation === 'fade-down') {
              el.style.transform = 'translateY(-20px)';
              el.style.opacity = '0';
            } else if (animation === 'fade-left') {
              el.style.transform = 'translateX(-20px)';
              el.style.opacity = '0';
            } else if (animation === 'fade-right') {
              el.style.transform = 'translateX(20px)';
              el.style.opacity = '0';
            } else if (animation === 'fade-up') {
              el.style.transform = 'translateY(20px)';
              el.style.opacity = '0';
            }
            
            requestAnimationFrame(function() {
              el.style.transform = 'translate(0)';
              el.style.opacity = '1';
            });
            
            el.classList.add('aos-animate');
            observer.unobserve(el);
          };

          if (delay > 0) {
            setTimeout(applyAnimation, delay);
          } else {
            applyAnimation();
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    animatedElements.forEach(function(el) {
      el.classList.add('aos-animate');
    });
  }

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

          var timer = setInterval(function() {
            current += step;
            if (current >= target) {
              current = target;
              el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
              clearInterval(timer);
            } else {
              el.textContent = prefix + current.toLocaleString('es-CO') + suffix;
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

  var smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href').substring(1);
      var target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        window.history.pushState(null, '', '#' + targetId);
      }
    });
  });
});

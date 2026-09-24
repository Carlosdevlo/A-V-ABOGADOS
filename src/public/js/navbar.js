document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  const overlay = document.getElementById('navbar-overlay');

  if (toggle && menu) {
    const toggleMenu = function(isOpen) {
      if (isOpen === undefined) {
        isOpen = !menu.classList.contains('navbar__menu--open');
      }
      menu.classList.toggle('navbar__menu--open', isOpen);
      toggle.classList.toggle('navbar__toggle--open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      if (overlay) {
        overlay.classList.toggle('navbar__overlay--active', isOpen);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    toggle.addEventListener('click', function() {
      toggleMenu();
    });

    if (overlay) {
      overlay.addEventListener('click', function() {
        toggleMenu(false);
      });
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('navbar__menu--open')) {
        toggleMenu(false);
      }
    });

    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', function() {
        if (menu.classList.contains('navbar__menu--open')) {
          toggleMenu(false);
        }
      });
    });
  }

  const handleNavbarScroll = function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const isScrolled = window.scrollY > 80;
    navbar.classList.toggle('navbar--scrolled', isScrolled);
  };

  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  handleNavbarScroll();
});

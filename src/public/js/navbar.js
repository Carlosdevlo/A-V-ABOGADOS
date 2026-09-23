document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.contains('navbar__menu--open');
      menu.classList.toggle('navbar__menu--open');
      toggle.classList.toggle('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    document.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', function() {
        if (menu.classList.contains('navbar__menu--open')) {
          menu.classList.remove('navbar__menu--open');
          toggle.classList.remove('navbar__toggle--open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
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

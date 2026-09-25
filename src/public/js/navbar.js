document.addEventListener('DOMContentLoaded', function() {
  var toggle = document.getElementById('navbar-toggle');
  var menu = document.getElementById('navbar-menu');
  var overlay = document.getElementById('navbar-overlay');
  var navContainer = document.getElementById('navbar-container');

  if (!toggle || !menu || !navContainer) return;

  var updateNavbarMode = function() {
    var temp = document.createElement('div');
    temp.style.cssText = 'position:absolute;visibility:hidden;height:auto;width:auto;display:flex;flex-wrap:nowrap;white-space:nowrap;padding:0;margin:0;';

    var menuStyle = getComputedStyle(menu);
    temp.style.gap = menuStyle.gap || '1.5rem';

    var items = menu.querySelectorAll('.navbar__item');
    var i;
    var len = items.length;
    for (i = 0; i < len; i++) {
      var clone = items[i].cloneNode(true);
      clone.style.flexShrink = '0';
      clone.style.whiteSpace = 'nowrap';
      temp.appendChild(clone);
    }

    document.body.appendChild(temp);

    var naturalWidth = temp.offsetWidth;
    temp.remove();

    var logo = document.querySelector('.navbar__logo');
    var logoWidth = logo ? logo.offsetWidth : 0;
    var availableWidth = navContainer.offsetWidth - logoWidth;

    var shouldBeMobile = naturalWidth > availableWidth;
    var isMobileMode = menu.classList.contains('navbar__menu--mobile');

    if (shouldBeMobile && !isMobileMode) {
      menu.classList.add('navbar__menu--mobile');
      toggle.classList.add('navbar__toggle--visible');
      menu.classList.remove('navbar__menu--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      if (overlay) overlay.classList.remove('navbar__overlay--active');
      document.body.style.overflow = '';
    } else if (!shouldBeMobile && isMobileMode) {
      menu.classList.remove('navbar__menu--mobile');
      toggle.classList.remove('navbar__toggle--visible');
    }
  };

  var toggleMenu = function(isOpen) {
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

  var links = document.querySelectorAll('.navbar__link');
  var len = links.length;
  for (var j = 0; j < len; j++) {
    links[j].addEventListener('click', function() {
      if (menu.classList.contains('navbar__menu--open')) {
        toggleMenu(false);
      }
    });
  }

  window.addEventListener('resize', function() {
    clearTimeout(window.navbarResizeTimer);
    window.navbarResizeTimer = setTimeout(updateNavbarMode, 100);
  });

  window.addEventListener('orientationchange', function() {
    setTimeout(updateNavbarMode, 100);
  });

  var handleNavbarScroll = function() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var isScrolled = window.scrollY > 80;
    navbar.classList.toggle('navbar--scrolled', isScrolled);
  };

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleNavbarScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('load', updateNavbarMode);
  updateNavbarMode();
  handleNavbarScroll();
});

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var toggle = document.getElementById('navbar-toggle');
  var menu = document.getElementById('navbar-menu');
  var overlay = document.getElementById('navbar-overlay');
  var navContainer = document.getElementById('navbar-container');

  if (!toggle || !menu || !navContainer) return;

  function isModalOpen() {
    var modals = document.querySelectorAll('.modal:not([hidden])');
    for (var i = 0; i < modals.length; i++) {
      if (modals[i].classList.contains('modal--open')) return true;
    }
    return false;
  }

  function getScrollbarWidth() {
    if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
      return 0;
    }
    var scrollDiv = document.createElement('div');
    scrollDiv.style.visibility = 'hidden';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '0';
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }

  function lockBodyScroll(lock) {
    var scrollbarWidth = getScrollbarWidth();
    if (lock) {
      if (!isModalOpen()) {
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = scrollbarWidth + 'px';
        }
      }
    } else {
      if (!isModalOpen()) {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    }
  }

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
      if (overlay) overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
      lockBodyScroll(false);
    } else if (!shouldBeMobile && isMobileMode) {
      menu.classList.remove('navbar__menu--mobile');
      toggle.classList.remove('navbar__toggle--visible');
      menu.classList.remove('navbar__menu--open');
      toggle.classList.remove('navbar__toggle--open');
      document.body.classList.remove('nav-open');
      lockBodyScroll(false);
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
    if (overlay) {
      overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    document.body.classList.toggle('nav-open', isOpen);
    lockBodyScroll(isOpen);
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

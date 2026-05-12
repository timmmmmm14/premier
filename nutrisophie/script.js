/* ===================================================
   NUTRISOPHIE — JavaScript
   =================================================== */

(function () {
  'use strict';

  // --- Elements ---
  const header     = document.getElementById('header');
  const navToggle  = document.getElementById('navToggle');
  const navMenu    = document.getElementById('navMenu');
  const navLinks   = document.querySelectorAll('.nav__link');
  const scrollTopBtn = document.getElementById('scrollTop');
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');
  const sections     = document.querySelectorAll('section[id]');

  // ===================================================
  // 1. Header — Scrolled state
  // ===================================================
  function onScroll() {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    updateActiveLink();
  }

  // ===================================================
  // 2. Mobile menu toggle
  // ===================================================
  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ===================================================
  // 3. Active nav link on scroll
  // ===================================================
  function updateActiveLink() {
    let currentSection = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  // ===================================================
  // 4. Smooth scroll for anchor links
  // ===================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--header-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===================================================
  // 5. Fade-in animations (Intersection Observer)
  // ===================================================
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ===================================================
  // 6. Contact form — feedback visuel
  // ===================================================
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Envoi en cours…</span>';

      setTimeout(function () {
        contactForm.style.display = 'none';
        formSuccess.classList.add('visible');
        window.scrollTo({
          top: formSuccess.getBoundingClientRect().top + window.scrollY - 120,
          behavior: 'smooth'
        });
      }, 600);
    });
  }

  // ===================================================
  // 7. Service card hover — subtle color accent
  // ===================================================
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.style.borderColor = 'transparent';
    });
    card.addEventListener('mouseleave', function () {
      if (!this.classList.contains('service-card--featured')) {
        this.style.borderColor = '';
      }
    });
  });

  // ===================================================
  // 8. Init
  // ===================================================
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Trigger hero fade-in immediately
  document.querySelectorAll('.hero .fade-in').forEach(function (el) {
    setTimeout(function () { el.classList.add('visible'); }, 100);
  });

})();

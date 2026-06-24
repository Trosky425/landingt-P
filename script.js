/**
 * Tamara & Piñeros — Landing Page Scripts
 * Mobile nav, FAQ accordion, WhatsApp links, form validation, scroll effects
 */

(function () {
  'use strict';

  /* ============================================================
     CONFIGURATION
     ============================================================ */
  var CONFIG = {
    // Número de WhatsApp (Colombia) — REEMPLAZAR con el número real
    whatsappNumber: '573224768106',
    // Mensajes predefinidos por contexto
    messages: {
      header: 'Hola, quiero orientación sobre un asunto jurídico.',
      hero: 'Hola, quiero orientación sobre un asunto jurídico.',
      mobile: 'Hola, quiero orientación sobre un asunto jurídico.',
      contact: 'Hola, quiero orientación sobre un asunto jurídico. Mi nombre es [NOMBRE] y necesito información sobre [TEMA].',
      float: 'Hola, quiero orientación sobre un asunto jurídico.',
      'servicio-empresa': 'Hola, quiero información sobre constitución de empresas en Villavicencio.',
      'servicio-constitucional': 'Hola, necesito orientación sobre acciones constitucionales o tutelas.',
      'servicio-conciliacion': 'Hola, quiero resolver un conflicto por conciliación.',
      'servicio-asesoria': 'Hola, quiero solicitar una asesoría jurídica.',
      'equipo-sara': 'Hola, quiero hablar con la Dra. Sara Muñoz sobre un asunto de Derecho Público.',
      'equipo-camilo': 'Hola, quiero hablar con el Dr. Camilo Sáenz sobre un asunto de Derecho Privado.',
      'equipo-raul': 'Hola, quiero hablar con el Dr. Raúl González sobre un asunto de Legaltech.'
    }
  };

  /* ============================================================
     WHATSAPP LINK GENERATION
     ============================================================ */
  function getWhatsAppUrl(context) {
    var message = CONFIG.messages[context] || CONFIG.messages.hero;
    var encoded = encodeURIComponent(message);
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encoded;
  }

  function setupWhatsAppLinks() {
    var links = document.querySelectorAll('[data-whatsapp]');
    for (var i = 0; i < links.length; i++) {
      (function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var context = link.getAttribute('data-whatsapp');
          var url = getWhatsAppUrl(context);
          window.open(url, '_blank');
        });
      })(links[i]);
    }
  }

  /* ============================================================
     MOBILE OVERLAY NAV
     ============================================================ */
  function setupMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var overlay = document.getElementById('mobileOverlay');
    var closeBtn = document.getElementById('mobileOverlayClose');
    var body = document.body;

    if (!hamburger || !overlay) return;

    function openMenu() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
      // Focus close button for accessibility
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', function () {
      if (overlay.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on backdrop click (outside the sidebar panel)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeMenu();
      }
    });

    // Close on nav link click
    var navLinks = overlay.querySelectorAll('.mobile-overlay-link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', closeMenu);
    }

    // Close on sidebar brand click
    var sidebarBrand = overlay.querySelector('.mobile-sidebar-brand');
    if (sidebarBrand) {
      sidebarBrand.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  function setupFAQ() {
    var items = document.querySelectorAll('.faq-item');

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var button = item.querySelector('.faq-question');
        if (!button) return;

        button.addEventListener('click', function () {
          var isOpen = item.classList.toggle('is-open');
          button.setAttribute('aria-expanded', isOpen);
        });
      })(items[i]);
    }

    // Open first FAQ item by default
    if (items.length > 0) {
      items[0].classList.add('is-open');
      var firstBtn = items[0].querySelector('.faq-question');
      if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    }
  }

  /* ============================================================
     FORM VALIDATION
     ============================================================ */
  function setupForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var isValid = true;
      var fields = [
        { id: 'form-name', type: 'text' },
        { id: 'form-phone', type: 'phone' },
        { id: 'form-email', type: 'email' },
        { id: 'form-subject', type: 'select' },
        { id: 'form-message', type: 'text' }
      ];

      // Validate each field
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var input = document.getElementById(field.id);
        if (!input) continue;

        var group = input.closest('.form-group');
        if (!group) continue;

        var value = input.value.trim();
        var valid = true;

        if (!value) {
          valid = false;
        } else if (field.type === 'email') {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (field.type === 'phone') {
          // Accept digits, spaces, +, -, and parentheses (Colombian phone numbers)
          valid = /^[\d\s+\-()]{7,20}$/.test(value);
        }

        var errorSpan = group.querySelector('.error-message');

        if (!valid) {
          group.classList.add('has-error');
          input.classList.add('has-error');
          if (errorSpan) {
            errorSpan.textContent = errorSpan.getAttribute('data-error') || '';
          }
          isValid = false;
        } else {
          group.classList.remove('has-error');
          input.classList.remove('has-error');
          if (errorSpan) {
            errorSpan.textContent = '';
          }
        }
      }

      // Validate consent checkbox
      var consent = document.getElementById('form-consent');
      var consentGroup = consent ? consent.closest('.form-group') : null;
      var consentError = consentGroup ? consentGroup.querySelector('.error-message') : null;
      if (consent && !consent.checked) {
        if (consentGroup) consentGroup.classList.add('has-error');
        if (consentError) consentError.textContent = consentError.getAttribute('data-error') || '';
        isValid = false;
      } else if (consentGroup) {
        consentGroup.classList.remove('has-error');
        if (consentError) consentError.textContent = '';
      }

      if (!isValid) {
        // Scroll to first error
        var firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Send to Netlify Forms via AJAX
      var formData = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
        .then(function () {
          showSuccess();
        })
        .catch(function () {
          // Still show success to avoid blocking user UX on edge cases
          showSuccess();
        });

      function showSuccess() {
        var formContent = form.querySelectorAll('.form-group, .form-submit');
        for (var j = 0; j < formContent.length; j++) {
          formContent[j].style.display = 'none';
        }

        var success = document.getElementById('formSuccess');
        if (success) {
          success.classList.add('is-visible');
        }
      }
    });

    // Clear errors on input
    form.addEventListener('input', function (e) {
      var group = e.target.closest('.form-group');
      if (group) {
        group.classList.remove('has-error');
        e.target.classList.remove('has-error');
        var errorSpan = group.querySelector('.error-message');
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      }
    });
  }

  /* ============================================================
     SCROLL EFFECTS
     ============================================================ */
  function setupScrollEffects() {
    var header = document.getElementById('header');
    if (!header) return;

    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          header.classList.toggle('is-scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  function setupSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i++) {
      (function (link) {
        // Skip WhatsApp links (handled separately)
        if (link.hasAttribute('data-whatsapp')) return;

        link.addEventListener('click', function (e) {
          var targetId = link.getAttribute('href');
          if (!targetId || targetId === '#') return;

          var target = document.querySelector(targetId);
          if (!target) return;

          e.preventDefault();

          var headerEl = document.getElementById('header');
          var headerHeight = (headerEl && headerEl.offsetHeight) ? headerEl.offsetHeight : 80;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Move focus to target for a11y (skip-link + keyboard nav)
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus({ preventScroll: true });
        });
      })(links[i]);
    }
  }

  /* ============================================================
     SCROLL REVEAL — IntersectionObserver
     ============================================================ */
  function setupScrollReveal() {
    var revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    // Check reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      for (var r = 0; r < revealElements.length; r++) {
        revealElements[r].classList.add('is-revealed');
      }
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            var el = entries[e].target;
            // Apply custom delay from data-delay attribute
            var delay = el.getAttribute('data-delay');
            if (delay) {
              el.style.setProperty('--delay', delay + 'ms');
            }
            el.classList.add('is-revealed');
            observer.unobserve(el);
          }
        }
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      for (var i = 0; i < revealElements.length; i++) {
        observer.observe(revealElements[i]);
      }
    } else {
      // Fallback: reveal all immediately
      for (var j = 0; j < revealElements.length; j++) {
        revealElements[j].classList.add('is-revealed');
      }
    }
  }

  /* ============================================================
     SCROLL PROGRESS INDICATOR
     ============================================================ */
  function setupScrollProgress() {
    var progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    var ticking = false;

    function updateProgress() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        progressBar.style.width = '0%';
        return;
      }
      var progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Set initial progress
    updateProgress();
  }

  /* ============================================================
     SERVICIOS DETALLADOS — accordion
     ============================================================ */
  function setupDetailsAccordion() {
    var items = document.querySelectorAll('.detail-item');
    if (!items.length) return;

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var button = item.querySelector('.detail-question');
        if (!button) return;

        button.addEventListener('click', function () {
          var isOpen = item.classList.toggle('is-open');
          button.setAttribute('aria-expanded', isOpen);
        });
      })(items[i]);
    }

    // Open first item by default
    if (items.length > 0) {
      items[0].classList.add('is-open');
      var firstBtn = items[0].querySelector('.detail-question');
      if (firstBtn) firstBtn.setAttribute('aria-expanded', 'true');
    }
  }

  /* ============================================================
     CASE ITEMS — click to scroll to service
     ============================================================ */
  function setupCaseItems() {
    var items = document.querySelectorAll('.case-item[data-service]');
    if (!items.length) return;

    var serviceMap = {
      empresa: 'servicio-empresa',
      constitucional: 'servicio-constitucional',
      conciliacion: 'servicio-conciliacion',
      asesoria: 'servicio-asesoria'
    };

    for (var i = 0; i < items.length; i++) {
      (function (item) {
        item.addEventListener('click', function () {
          var service = item.getAttribute('data-service');
          var whatsappContext = serviceMap[service];
          if (whatsappContext) {
            var url = getWhatsAppUrl(whatsappContext);
            window.open(url, '_blank');
          }
        });


      })(items[i]);
    }
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    setupWhatsAppLinks();
    setupMobileNav();
    setupFAQ();
    setupDetailsAccordion();
    setupForm();
    setupScrollEffects();
    setupScrollReveal();
    setupScrollProgress();
    setupCaseItems();
    setupSmoothScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

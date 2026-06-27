/**
 * Tamara & Piñeros — Landing Page Scripts
 * Mobile nav, FAQ accordion, WhatsApp links, scroll effects
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
      'servicio-asesoria-express': 'Hola, quiero solicitar una asesoría jurídica express.',
      'servicio-constitucional': 'Hola, necesito orientación sobre acciones constitucionales o tutelas.',
      'servicio-conciliacion': 'Hola, quiero resolver un conflicto por conciliación.',
      'servicio-empresa': 'Hola, quiero información sobre constitución de empresas en Villavicencio.',
      'servicio-asesoria-integral': 'Hola, quiero solicitar una asesoría jurídica integral.',
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

  function openExternalWindow(url) {
    var newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    } else {
      window.location.href = url;
    }
  }

  function setupWhatsAppLinks() {
    // Direct WhatsApp links — header, float, hero, mobile, team, contact
    // Skip links inside the intake modal (handled separately)
    var links = document.querySelectorAll('[data-whatsapp]');
    for (var i = 0; i < links.length; i++) {
      (function (link) {
        // Skip intake modal internal links
        if (link.closest && link.closest('.intake-modal')) return;

        link.addEventListener('click', function (e) {
          e.preventDefault();
          var context = link.getAttribute('data-whatsapp');
          var url = getWhatsAppUrl(context);
          openExternalWindow(url);
        });
      })(links[i]);
    }

    // Service card CTAs with data-intake — open intake modal instead of direct redirect
    var intakeLinks = document.querySelectorAll('[data-intake]');
    for (var j = 0; j < intakeLinks.length; j++) {
      (function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var intakeContext = link.getAttribute('data-intake');
          var serviceKey = link.getAttribute('data-service') || '';
          openIntakeModal(intakeContext, serviceKey);
        });
      })(intakeLinks[j]);
    }
  }

  /* ============================================================
     INTAKE MODAL — validation, Netlify submit, wa.me redirect
     ============================================================ */
  var intakeModal = null;
  var intakeForm = null;
  var intakeSubmitBtn = null;
  var intakeSuccess = null;

  function openIntakeModal(context, serviceKey) {
    if (!intakeModal) return;
    intakeModal.setAttribute('aria-hidden', 'false');
    intakeModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Pre-select the service if available
    var serviceSelect = intakeForm.querySelector('[name="servicio"]');
    if (serviceSelect && serviceKey) {
      serviceSelect.value = serviceKey;
    }

    // Reset form state
    intakeForm.reset();
    if (serviceSelect && serviceKey) {
      serviceSelect.value = serviceKey;
    }
    clearIntakeErrors();
    intakeForm.style.display = '';
    if (intakeSuccess) intakeSuccess.style.display = 'none';
    if (intakeSubmitBtn) intakeSubmitBtn.disabled = false;

    // Re-check consent (reset clears it)
    var consentBox = intakeForm.querySelector('[name="consent"]');
    if (consentBox) consentBox.checked = true;

    // Focus first field
    var firstField = intakeForm.querySelector('[name="nombre"]');
    if (firstField) firstField.focus();
  }

  function closeIntakeModal() {
    if (!intakeModal) return;
    intakeModal.setAttribute('aria-hidden', 'true');
    intakeModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function clearIntakeErrors() {
    var errors = intakeForm ? intakeForm.querySelectorAll('.error-message') : [];
    for (var i = 0; i < errors.length; i++) {
      errors[i].textContent = '';
    }
    var groups = intakeForm ? intakeForm.querySelectorAll('.form-group.has-error') : [];
    for (var j = 0; j < groups.length; j++) {
      groups[j].classList.remove('has-error');
    }
    var fields = intakeForm ? intakeForm.querySelectorAll('.form-group input, .form-group select') : [];
    for (var k = 0; k < fields.length; k++) {
      fields[k].classList.remove('is-invalid');
    }
  }

  function showFieldError(fieldId, message) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById('error-' + fieldId.replace('intake-', ''));
    if (field) field.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = message;
    // Add .has-error to parent .form-group to reveal the error message via CSS
    if (field) {
      var group = field.closest('.form-group');
      if (group) group.classList.add('has-error');
    }
  }

  function validateIntakeForm() {
    clearIntakeErrors();
    var valid = true;

    var nombre = intakeForm.querySelector('[name="nombre"]');
    var ciudad = intakeForm.querySelector('[name="ciudad"]');
    var servicio = intakeForm.querySelector('[name="servicio"]');
    var consent = intakeForm.querySelector('[name="consent"]');

    if (!nombre.value.trim()) {
      showFieldError('intake-nombre', 'Ingresa tu nombre completo.');
      valid = false;
    }
    if (!ciudad.value.trim()) {
      showFieldError('intake-ciudad', 'Ingresa tu ciudad.');
      valid = false;
    }
    if (!servicio.value) {
      showFieldError('intake-servicio', 'Selecciona un servicio.');
      valid = false;
    }
    if (!consent.checked) {
      // Consent blocking — show inline message near checkbox
      var consentGroup = intakeForm.querySelector('.form-checkbox');
      var consentError = document.getElementById('error-consent');
      if (consentGroup) {
        consentGroup.classList.add('has-error');
      }
      if (consentError) {
        consentError.textContent = 'Debes aceptar la política de tratamiento de datos.';
      }
      valid = false;
    }

    return valid;
  }

  function submitIntakeToNetlify(formData, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.status >= 200 && xhr.status < 400 ? null : 'error', xhr);
      }
    };

    // Build URL-encoded form data
    var params = [];
    formData.forEach(function (value, key) {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    });
    xhr.send(params.join('&'));
  }

  function handleIntakeSubmit(e) {
    if (e) e.preventDefault();

    if (!validateIntakeForm()) return;

    if (intakeSubmitBtn) {
      intakeSubmitBtn.disabled = true;
      intakeSubmitBtn.textContent = 'Enviando…';
    }

    var formData = new FormData(intakeForm);

    submitIntakeToNetlify(formData, function (err) {
      if (err) {
        // On Netlify error — still redirect to WhatsApp as fallback
        redirectToIntakeWhatsApp(formData);
        return;
      }

      // Show success state
      intakeForm.style.display = 'none';
      if (intakeSuccess) {
        intakeSuccess.style.display = '';
        // Update the WhatsApp link in success state with service-specific message
        var successLink = intakeSuccess.querySelector('[data-whatsapp]');
        if (successLink) {
          var servicio = formData.get('servicio');
          var contextKey = 'servicio-' + servicio;
          successLink.href = getWhatsAppUrl(contextKey);
        }
      }

      // Also redirect after a short delay
      setTimeout(function () {
        redirectToIntakeWhatsApp(formData);
      }, 1500);
    });
  }

  function redirectToIntakeWhatsApp(formData) {
    var servicio = formData.get('servicio');
    var contextKey = 'servicio-' + servicio;
    var url = getWhatsAppUrl(contextKey);
    openExternalWindow(url);
    closeIntakeModal();
  }

  function setupIntakeModal() {
    intakeModal = document.getElementById('intakeModal');
    if (!intakeModal) return;

    intakeForm = document.getElementById('intakeForm');
    intakeSubmitBtn = document.getElementById('intakeSubmit');
    intakeSuccess = document.getElementById('intakeSuccess');

    var closeBtn = document.getElementById('intakeModalClose');
    var backdrop = document.getElementById('intakeModalBackdrop');

    // Close handlers
    if (closeBtn) {
      closeBtn.addEventListener('click', closeIntakeModal);
    }
    if (backdrop) {
      backdrop.addEventListener('click', closeIntakeModal);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && intakeModal.classList.contains('is-open')) {
        closeIntakeModal();
      }
    });

    // Form submit handler
    if (intakeForm) {
      intakeForm.addEventListener('submit', handleIntakeSubmit);
    }
  }

  /* ============================================================
     LEAD MAGNETS — asset probing + CTA state
     ============================================================ */
  function setupLeadMagnets() {
    var cards = document.querySelectorAll('.lead-magnet-card[data-asset]');
    if (!cards.length) return;

    for (var i = 0; i < cards.length; i++) {
      (function (card) {
        var assetPath = card.getAttribute('data-asset');
        var cta = card.querySelector('[data-asset-download]');
        if (!assetPath || !cta) return;

        // Suppress click when asset is unavailable (href still "#" or disabled)
        cta.addEventListener('click', function (e) {
          if (cta.classList.contains('is-disabled') || cta.getAttribute('href') === '#') {
            e.preventDefault();
          }
        });

        // Probe asset via HEAD request
        if (typeof fetch === 'function') {
          fetch(assetPath, { method: 'HEAD' })
            .then(function (response) {
              if (response.ok) {
                // Asset exists — enable download
                cta.textContent = 'Descargar guía';
                cta.href = assetPath;
                cta.setAttribute('download', '');
                cta.classList.remove('is-disabled');
                cta.classList.add('btn-available');
              }
              // else: keep "Próximamente" + disabled state (default from HTML)
            })
            .catch(function () {
              // Network error — keep placeholder state
            });
        }
        // If fetch unavailable, keep "Próximamente" default
      })(cards[i]);
    }
  }

  /* ============================================================
     TIMELINE — staggered step reveal
     ============================================================ */
  function setupTimeline() {
    var timeline = document.querySelector('.timeline');
    if (!timeline) return;

    var steps = timeline.querySelectorAll('.timeline-step');
    if (!steps.length) return;

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      timeline.classList.add('is-revealed');
      return;
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        for (var e = 0; e < entries.length; e++) {
          if (entries[e].isIntersecting) {
            timeline.classList.add('is-revealed');
            observer.unobserve(timeline);
          }
        }
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      });

      observer.observe(timeline);
    } else {
      timeline.classList.add('is-revealed');
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
            openExternalWindow(url);
          }
        });


      })(items[i]);
    }
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    setupIntakeModal();
    setupWhatsAppLinks();
    setupLeadMagnets();
    setupTimeline();
    setupMobileNav();
    setupFAQ();
    setupDetailsAccordion();
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

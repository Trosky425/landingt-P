/**
 * Tamara & Piñeros — Landing Page Scripts
 * Vanilla JS only. Keeps intake and navigation behavior fail-closed.
 */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '573224768106';
  var INTAKE_SUBMIT_TEXT = 'Continuar por WhatsApp';
  var MAX_INTAKE_FIELD_LENGTH = 80;

  var APPROVED_PUBLIC_PDFS = {};

  var SERVICE_LABELS = {
    'personas-derechos': 'Personas y derechos',
    'conflictos-acuerdos': 'Conflictos y acuerdos',
    'empresas-emprendimientos': 'Emprendimientos y empresas'
  };

  var WHATSAPP_MESSAGES = {
    header: 'Hola, quiero orientación sobre un asunto jurídico.',
    hero: 'Hola, quiero orientación sobre un asunto jurídico.',
    mobile: 'Hola, quiero orientación sobre un asunto jurídico.',
    contact: 'Hola, quiero orientación sobre un asunto jurídico.',
    float: 'Hola, quiero orientación sobre un asunto jurídico.',
    privacy: 'Hola, quiero orientación sobre un asunto jurídico.',
    aviso: 'Hola, quiero orientación sobre un asunto jurídico.',
    'intake-success': 'Hola, quiero continuar mi solicitud por WhatsApp.',
    'equipo-sara': 'Hola, quiero hablar con la Dra. Sara Muñoz sobre un asunto de Derecho Público.',
    'equipo-camilo': 'Hola, quiero hablar con el Dr. Camilo Sáenz sobre un asunto de Derecho Privado.',
    'equipo-raul': 'Hola, quiero hablar con el Dr. Raúl González sobre un asunto de Legaltech.'
  };

  var focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  var lastMobileFocus = null;
  var lastModalFocus = null;

  function isAllowedService(value) {
    return Object.prototype.hasOwnProperty.call(SERVICE_LABELS, value);
  }

  function getServiceLabel(value) {
    if (!isAllowedService(value)) {
      return '';
    }
    return SERVICE_LABELS[value];
  }

  function getWhatsAppUrl(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function normalizeIntakeField(value) {
    return String(value || '').trim().slice(0, MAX_INTAKE_FIELD_LENGTH);
  }

  function getIntakeControls(container) {
    return {
      nombre: container ? container.querySelector('[name="nombre"]') : null,
      ciudad: container ? container.querySelector('[name="ciudad"]') : null,
      servicio: container ? container.querySelector('[name="servicio"]') : null,
      consent: container ? container.querySelector('[name="consent"]') : null
    };
  }

  function buildIntakeWhatsAppMessage(container) {
    var controls = getIntakeControls(container);
    var name = normalizeIntakeField(controls.nombre.value);
    var city = normalizeIntakeField(controls.ciudad.value);
    var serviceLabel = getServiceLabel(controls.servicio.value);

    return [
      'Hola, quiero orientación jurídica.',
      '',
      'Nombre: ' + name,
      'Ciudad: ' + city,
      'Servicio de interés: ' + serviceLabel,
      '',
      'Autorizo iniciar contacto por WhatsApp y el tratamiento de mis datos personales conforme a la política de tratamiento de datos.'
    ].join('\n');
  }

  function continueToWhatsApp(url, reservedWindow) {
    if (reservedWindow && !reservedWindow.closed) {
      try {
        reservedWindow.opener = null;
        reservedWindow.location.href = url;
        return;
      } catch (error) {
        reservedWindow = null;
      }
    }

    window.setTimeout(function () {
      window.location.href = url;
    }, 700);
  }

  function reserveWhatsAppWindow() {
    try {
      var reservedWindow = window.open('about:blank', '_blank');
      if (reservedWindow) {
        reservedWindow.opener = null;
      }
      return reservedWindow;
    } catch (error) {
      return null;
    }
  }

  function getVisibleFocusable(container) {
    if (!container) {
      return [];
    }

    var nodes = container.querySelectorAll(focusableSelector);
    var focusable = [];

    for (var i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      if (!node.hasAttribute('hidden') && node.offsetParent !== null) {
        focusable.push(node);
      }
    }

    return focusable;
  }

  function keepFocusInside(event, container) {
    if (event.key !== 'Tab') {
      return;
    }

    var focusable = getVisibleFocusable(container);
    if (!focusable.length) {
      event.preventDefault();
      return;
    }

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function setBodyLocked(isLocked) {
    document.body.style.overflow = isLocked ? 'hidden' : '';
  }

  function setupExternalLinkHardening() {
    var links = document.querySelectorAll('a[target="_blank"]');
    for (var i = 0; i < links.length; i += 1) {
      links[i].setAttribute('rel', 'noopener noreferrer');
    }
  }

  function setupWhatsAppLinks() {
    var links = document.querySelectorAll('[data-whatsapp]');

    for (var i = 0; i < links.length; i += 1) {
      var link = links[i];
      var context = link.getAttribute('data-whatsapp');
      var message = WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES.hero;

      link.setAttribute('href', getWhatsAppUrl(message));
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  }

  function setupMobileMenu() {
    var hamburger = document.getElementById('hamburger');
    var overlay = document.getElementById('mobileOverlay');
    var closeButton = document.getElementById('mobileOverlayClose');
    var sidebar = overlay ? overlay.querySelector('.mobile-sidebar') : null;

    if (!hamburger || !overlay || !sidebar) {
      return;
    }

    function openMenu() {
      lastMobileFocus = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
      setBodyLocked(true);

      if (closeButton) {
        closeButton.focus();
      }
    }

    function closeMenu(restoreFocus) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
      setBodyLocked(false);

      if (restoreFocus !== false && lastMobileFocus && typeof lastMobileFocus.focus === 'function') {
        lastMobileFocus.focus();
      }
    }

    hamburger.addEventListener('click', function () {
      if (overlay.classList.contains('is-open')) {
        closeMenu(true);
      } else {
        openMenu();
      }
    });

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        closeMenu(true);
      });
    }

    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) {
        closeMenu(true);
      }
    });

    var links = overlay.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener('click', function () {
        closeMenu(false);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (!overlay.classList.contains('is-open')) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      } else {
        keepFocusInside(event, overlay);
      }
    });
  }

  function setupScrollState() {
    var header = document.getElementById('header');
    var progress = document.getElementById('scrollProgress');
    var ticking = false;

    if (!header && !progress) {
      return;
    }

    function update() {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 50);
      }

      if (progress) {
        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        var percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
        progress.style.width = percent + '%';
      }

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  function setupReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) {
      return;
    }

    function revealAll() {
      for (var i = 0; i < items.length; i += 1) {
        items[i].classList.add('is-revealed');
      }
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i += 1) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-revealed');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    });

    for (var j = 0; j < items.length; j += 1) {
      observer.observe(items[j]);
    }
  }

  function setupAccordion(itemSelector, buttonSelector, panelSelector) {
    var items = document.querySelectorAll(itemSelector);

    for (var i = 0; i < items.length; i += 1) {
      (function (item) {
        var button = item.querySelector(buttonSelector);
        var panel = item.querySelector(panelSelector);

        if (!button || !panel) {
          return;
        }

        function setOpen(isOpen) {
          item.classList.toggle('is-open', isOpen);
          button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          panel.style.maxHeight = isOpen ? panel.scrollHeight + 'px' : '';
        }

        setOpen(button.getAttribute('aria-expanded') === 'true');

        button.addEventListener('click', function () {
          setOpen(button.getAttribute('aria-expanded') !== 'true');
        });
      })(items[i]);
    }
  }

  function setupSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i += 1) {
      (function (link) {
        if (link.hasAttribute('data-service') || link.hasAttribute('data-intake') || link.hasAttribute('data-asset-download')) {
          return;
        }

        link.addEventListener('click', function (event) {
          var href = link.getAttribute('href');
          if (!href || href === '#') {
            return;
          }

          var target = document.getElementById(href.slice(1));
          if (!target) {
            return;
          }

          event.preventDefault();
          var header = document.getElementById('header');
          var offset = header ? header.offsetHeight + 16 : 16;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({ top: top, behavior: 'smooth' });

          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          target.focus({ preventScroll: true });
        });
      })(links[i]);
    }
  }

  function setError(input, message) {
    if (!input) {
      return;
    }

    var group = input.closest('.form-group');
    var error = group ? group.querySelector('.error-message') : null;

    if (group) {
      group.classList.toggle('has-error', Boolean(message));
    }
    input.classList.toggle('has-error', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (error) {
      error.textContent = message || '';
    }
  }

  function validateIntakeForm(container) {
    var controls = getIntakeControls(container);
    var name = controls.nombre;
    var city = controls.ciudad;
    var service = controls.servicio;
    var consent = controls.consent;
    var isValid = true;

    if (!name || !name.value.trim()) {
      setError(name, 'Escribe tu nombre completo.');
      isValid = false;
    } else {
      setError(name, '');
    }

    if (!city || !city.value.trim()) {
      setError(city, 'Escribe tu ciudad.');
      isValid = false;
    } else {
      setError(city, '');
    }

    if (!service || !isAllowedService(service.value)) {
      setError(service, 'Selecciona un servicio válido.');
      isValid = false;
    } else {
      setError(service, '');
    }

    if (!consent || !consent.checked) {
      setError(consent, 'Debes autorizar el tratamiento de tus datos personales.');
      isValid = false;
    } else {
      setError(consent, '');
    }

    return isValid;
  }

  function resetIntakeFormState(container, serviceValue) {
    if (!container) {
      return;
    }

    var controls = getIntakeControls(container);
    if (controls.nombre) {
      controls.nombre.value = '';
    }
    if (controls.ciudad) {
      controls.ciudad.value = '';
    }
    if (controls.servicio) {
      controls.servicio.value = '';
    }
    if (controls.consent) {
      controls.consent.checked = false;
    }

    var groups = container.querySelectorAll('.form-group, .form-submit');
    for (var i = 0; i < groups.length; i += 1) {
      groups[i].hidden = false;
    }

    var fields = container.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    for (var j = 0; j < fields.length; j += 1) {
      setError(fields[j], '');
    }

    var success = document.getElementById('intakeSuccess');
    if (success) {
      success.classList.remove('is-visible');
      success.removeAttribute('tabindex');
    }

    var submit = document.getElementById('intakeSubmit');
    if (submit) {
      submit.disabled = false;
      submit.textContent = INTAKE_SUBMIT_TEXT;
    }

    var serviceSelect = controls.servicio;
    if (serviceSelect && isAllowedService(serviceValue)) {
      serviceSelect.value = serviceValue;
      setError(serviceSelect, '');
    }
  }

  function setupIntakeModal() {
    var modal = document.getElementById('intakeModal');
    var panel = modal ? modal.querySelector('.intake-modal-panel') : null;
    var closeButton = document.getElementById('intakeModalClose');
    var backdrop = document.getElementById('intakeModalBackdrop');
    var intake = document.getElementById('intakeForm');

    if (!modal || !panel) {
      return;
    }

    function openModal(serviceValue, trigger) {
      if (!isAllowedService(serviceValue)) {
        return;
      }

      lastModalFocus = trigger || document.activeElement;

      resetIntakeFormState(intake, serviceValue);

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      setBodyLocked(true);

      var focusable = getVisibleFocusable(modal);
      if (focusable.length) {
        focusable[0].focus();
      }
    }

    function closeModal(restoreFocus) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      setBodyLocked(false);

      if (restoreFocus !== false && lastModalFocus && typeof lastModalFocus.focus === 'function') {
        lastModalFocus.focus();
      }
    }

    var openers = document.querySelectorAll('[data-service], [data-intake]');
    for (var i = 0; i < openers.length; i += 1) {
      (function (opener) {
        opener.addEventListener('click', function (event) {
          var serviceValue = opener.getAttribute('data-service') || opener.getAttribute('data-intake');
          if (!isAllowedService(serviceValue)) {
            return;
          }

          event.preventDefault();
          openModal(serviceValue, opener);
        });
      })(openers[i]);
    }

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        closeModal(true);
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeModal(true);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (!modal.classList.contains('is-open')) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal(true);
      } else {
        keepFocusInside(event, modal);
      }
    });

    if (intake) {
      setupIntakeForm(intake);
    }
  }

  function setupIntakeForm(container) {
    var submit = document.getElementById('intakeSubmit');
    var success = document.getElementById('intakeSuccess');
    var successLink = success ? success.querySelector('[data-whatsapp="intake-success"]') : null;

    function handleIntakeRequest() {
      if (!validateIntakeForm(container)) {
        var firstError = container.querySelector('.has-error input, .has-error select');
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      var whatsappUrl = getWhatsAppUrl(buildIntakeWhatsAppMessage(container));
      var reservedWhatsAppWindow = reserveWhatsAppWindow();

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Abriendo WhatsApp...';
      }

      var groups = container.querySelectorAll('.form-group, .form-submit');
      for (var i = 0; i < groups.length; i += 1) {
        groups[i].hidden = true;
      }

      if (successLink) {
        successLink.setAttribute('href', whatsappUrl);
        successLink.setAttribute('target', '_blank');
        successLink.setAttribute('rel', 'noopener noreferrer');
      }

      if (success) {
        success.classList.add('is-visible');
        success.setAttribute('tabindex', '-1');
        success.focus();
      }

      continueToWhatsApp(whatsappUrl, reservedWhatsAppWindow);
    }

    container.addEventListener('input', function (event) {
      if (event.target && event.target.name) {
        setError(event.target, '');
      }
    });

    container.addEventListener('keydown', function (event) {
      var target = event.target;
      var tagName = target && target.tagName;
      var inputType = target && target.type;
      var isTextInput = tagName === 'INPUT' && inputType !== 'checkbox' && inputType !== 'button';
      if (event.key === 'Enter' && isTextInput) {
        event.preventDefault();
        handleIntakeRequest();
      }
    });

    if (submit) {
      submit.addEventListener('click', handleIntakeRequest);
    }
  }

  function isUnsafeInternalPath(value) {
    if (!value) {
      return false;
    }

    var normalized = value.toLowerCase();
    return normalized.indexOf('.md') !== -1 ||
      normalized.indexOf('.atl') !== -1 ||
      normalized.indexOf('openspec') !== -1 ||
      normalized.indexOf('draft') !== -1 ||
      normalized.indexOf('internal') !== -1;
  }

  function normalizePublicPdfPath(value) {
    if (!value) {
      return '';
    }

    var normalized = value.trim().replace(/^\/+/, '').split('?')[0].split('#')[0];
    if (!normalized || normalized.indexOf('..') !== -1 || normalized.indexOf('\\') !== -1 || normalized.indexOf('//') !== -1) {
      return '';
    }

    return normalized;
  }

  function isApprovedPublicPdf(value) {
    var normalized = normalizePublicPdfPath(value);
    return Boolean(normalized) && /\.pdf$/i.test(normalized) && Object.prototype.hasOwnProperty.call(APPROVED_PUBLIC_PDFS, normalized);
  }

  function setupLeadMagnetSafety() {
    var links = document.querySelectorAll('a[href], [data-asset-download]');

    for (var i = 0; i < links.length; i += 1) {
      (function (link) {
        var isIntakeOpener = link.hasAttribute('data-service') || link.hasAttribute('data-intake');
        if (isIntakeOpener) {
          return;
        }

        var href = link.getAttribute('href') || '';
        var asset = link.getAttribute('data-asset-download') || link.getAttribute('data-asset') || '';
        var isLeadMagnet = link.classList.contains('lead-magnet-cta') || link.hasAttribute('data-asset-download');
        var isDisabled = link.classList.contains('is-disabled') || link.getAttribute('aria-disabled') === 'true' || href.trim() === '#';
        var candidate = asset || href;

        if (!isLeadMagnet && !isDisabled && !isUnsafeInternalPath(href) && !isUnsafeInternalPath(asset)) {
          return;
        }

        if (isLeadMagnet && !isDisabled && !isUnsafeInternalPath(candidate) && isApprovedPublicPdf(candidate)) {
          return;
        }

        if (isLeadMagnet || isDisabled || isUnsafeInternalPath(href) || isUnsafeInternalPath(asset)) {
          link.setAttribute('aria-disabled', 'true');
          link.addEventListener('click', function (event) {
            event.preventDefault();
          });
        }
      })(links[i]);
    }
  }

  function init() {
    setupExternalLinkHardening();
    setupWhatsAppLinks();
    setupMobileMenu();
    setupScrollState();
    setupReveal();
    setupAccordion('.faq-item', '.faq-question', '.faq-answer');
    setupAccordion('.detail-item', '.detail-question', '.detail-answer');
    setupSmoothScroll();
    setupIntakeModal();
    setupLeadMagnetSafety();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

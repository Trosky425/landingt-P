#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const scriptPath = path.join(publicDir, 'js', 'script.js');
const indexPath = path.join(publicDir, 'index.html');

const failures = [];

function fail(message) {
  failures.push(message);
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function unique(values) {
  return Array.from(new Set(values)).sort();
}

function getMatches(text, regex, groupIndex) {
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[groupIndex]);
  }
  return matches;
}

function getObjectKeys(block) {
  const keys = [];
  let match;
  const keyPattern = /(?:'([^']+)'|([A-Za-z_$][\w$-]*))\s*:/g;

  while ((match = keyPattern.exec(block)) !== null) {
    keys.push(match[1] || match[2]);
  }

  return keys;
}

function normalizePublicPath(value) {
  return value.trim().split('?')[0].split('#')[0].replace(/^\/+/, '');
}

function isMainScriptSrc(value) {
  return normalizePublicPath(value) === 'js/script.js';
}

function getAttributeValues(text, attributeName) {
  const pattern = new RegExp('\\b' + attributeName + '=(?:"([^"]*)"|\\\'([^\\\']*)\\\')', 'gi');
  const values = [];
  let match;

  while ((match = pattern.exec(text)) !== null) {
    values.push(match[1] || match[2] || '');
  }

  return values;
}

function isUnsafeInternalLink(value) {
  const normalized = value.toLowerCase();
  return normalized.indexOf('.atl') !== -1 ||
    normalized.indexOf('openspec') !== -1 ||
    normalized.indexOf('.md') !== -1 ||
    normalized.indexOf('draft') !== -1;
}

if (!fs.existsSync(scriptPath)) {
  fail('public/js/script.js must exist.');
}

if (!fs.existsSync(indexPath)) {
  fail('public/index.html must exist.');
}

const script = fs.existsSync(scriptPath) ? readText(scriptPath) : '';
const index = fs.existsSync(indexPath) ? readText(indexPath) : '';
const htmlFiles = walk(publicDir).filter((filePath) => filePath.toLowerCase().endsWith('.html'));
const scriptPages = htmlFiles.map((filePath) => {
  const html = readText(filePath);
  const scriptSrcs = getAttributeValues(html, 'src').filter((value) => /(?:^|\/)js\/script\.js(?:[?#].*)?$/i.test(value));

  return {
    filePath,
    relativePath: path.relative(publicDir, filePath).replace(/\\/g, '/'),
    html,
    scriptSrcs
  };
}).filter((page) => page.scriptSrcs.length > 0);
const scriptPagesHtml = scriptPages.map((page) => page.html).join('\n');
const publicTextFiles = walk(publicDir).filter((filePath) => /\.(?:html|js)$/i.test(filePath));

try {
  new vm.Script(script, { filename: scriptPath });
} catch (error) {
  fail(`public/js/script.js must parse: ${error.message}`);
}

const unsafePatterns = [
  /\.innerHTML\b/,
  /\.outerHTML\b/,
  /\.insertAdjacentHTML\b/,
  /document\.write\b/,
  /\beval\s*\(/,
  /new\s+Function\b/,
  /\blocalStorage\b/,
  /\bsessionStorage\b/,
  /document\.cookie\b/
];

for (const pattern of unsafePatterns) {
  if (pattern.test(script)) {
    fail(`public/js/script.js must not use unsafe API matching ${pattern}.`);
  }
}

for (const filePath of walk(publicDir)) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/').toLowerCase();
  if (relativePath.endsWith('.atl')) {
    fail(`public/ must not expose .atl files: ${relativePath}`);
  }
  if (relativePath.endsWith('.md')) {
    fail(`public/ must not expose Markdown guides: ${relativePath}`);
  }
}

const forbiddenIntakePatterns = [
  ['data-netlify', /\bdata-netlify\b/i],
  ['netlify-honeypot', /\bnetlify-honeypot\b/i],
  ['form-name', /\bform-name\b/i],
  ['bot-field', /\bbot-field\b/i]
];

for (const filePath of publicTextFiles) {
  const relativePath = path.relative(publicDir, filePath).replace(/\\/g, '/');
  const text = readText(filePath);
  for (const [label, pattern] of forbiddenIntakePatterns) {
    if (pattern.test(text)) {
      fail(`${relativePath} must not contain retired Netlify Forms marker: ${label}.`);
    }
  }
}

if (/<form\b[^>]*\bid=["']intakeForm["']/i.test(index)) {
  fail('#intakeForm must be a non-submit container, not a navigational form.');
}

if (!/<(?:div|section)\b[^>]*\bid=["']intakeForm["'][^>]*\brole=["']form["']/i.test(index)) {
  fail('#intakeForm must be a non-submit container with role="form".');
}

const intakeSubmitMatch = index.match(/<button\b[^>]*\bid=["']intakeSubmit["'][^>]*>/i);
if (!intakeSubmitMatch) {
  fail('index.html must include #intakeSubmit.');
} else if (!/\btype=["']button["']/i.test(intakeSubmitMatch[0])) {
  fail('#intakeSubmit must be type="button".');
}

for (const fieldId of ['intake-nombre', 'intake-ciudad']) {
  const fieldMatch = index.match(new RegExp("<input\\b[^>]*\\bid=[\"']" + fieldId + "[\"'][^>]*>", 'i'));
  if (!fieldMatch || !/\bmaxlength=["']80["']/i.test(fieldMatch[0])) {
    fail(`#${fieldId} must cap user-provided WhatsApp URL text with maxlength="80".`);
  }
}

if (/\bfetch\s*\(/.test(script)) {
  fail('public/js/script.js must not call fetch for intake or any static fallback submission.');
}

const serviceBlockMatch = script.match(/var SERVICE_LABELS = \{([\s\S]*?)\n  \};/);
if (!serviceBlockMatch) {
  fail('script must define SERVICE_LABELS.');
}

const allowedServices = serviceBlockMatch ? unique(getObjectKeys(serviceBlockMatch[1])) : [];
const selectBlockMatch = index.match(/<select[^>]+id="intake-servicio"[\s\S]*?<\/select>/);
const selectServices = selectBlockMatch ? unique(getMatches(selectBlockMatch[0], /<option\s+value="([^"]+)"/g, 1).filter(Boolean)) : [];
const dataServices = unique(getMatches(scriptPagesHtml, /data-(?:service|intake)="([^"]+)"/g, 1));

if (!selectBlockMatch) {
  fail('index.html must include #intake-servicio select.');
}

if (allowedServices.join('|') !== selectServices.join('|')) {
  fail(`SERVICE_LABELS must match intake select options. script=${allowedServices.join(',')} select=${selectServices.join(',')}`);
}

const unknownDataServices = dataServices.filter((value) => !allowedServices.includes(value));
if (unknownDataServices.length > 0) {
  fail(`data-service/data-intake values must use the allowlist: ${unknownDataServices.join(',')}`);
}

if (scriptPages.length === 0) {
  fail('at least one public HTML page must reference /js/script.js.');
}

for (const page of scriptPages) {
  const invalidScriptSrcs = page.scriptSrcs.filter((value) => !isMainScriptSrc(value));
  if (invalidScriptSrcs.length > 0) {
    fail(`${page.relativePath} must reference /js/script.js with an approved path: ${invalidScriptSrcs.join(',')}`);
  }

  for (const attributeName of ['href', 'src', 'data-asset', 'data-asset-download']) {
    const unsafeValues = getAttributeValues(page.html, attributeName).filter(isUnsafeInternalLink);
    if (unsafeValues.length > 0) {
      fail(`${page.relativePath} must not link unsafe internal/draft paths in ${attributeName}: ${unique(unsafeValues).join(',')}`);
    }
  }
}

const whatsappBlockMatch = script.match(/var WHATSAPP_MESSAGES = \{([\s\S]*?)\n  \};/);
if (!whatsappBlockMatch) {
  fail('script must define WHATSAPP_MESSAGES.');
}

const whatsappContexts = whatsappBlockMatch ? unique(getObjectKeys(whatsappBlockMatch[1])) : [];
const pageWhatsappContexts = unique(getMatches(scriptPagesHtml, /data-whatsapp="([^"]+)"/g, 1));
const hasWhatsAppFallback = whatsappContexts.includes('hero') && /WHATSAPP_MESSAGES\[context\]\s*\|\|\s*WHATSAPP_MESSAGES\.hero/.test(script);
const uncoveredWhatsappContexts = pageWhatsappContexts.filter((value) => !whatsappContexts.includes(value));

if (uncoveredWhatsappContexts.length > 0 && !hasWhatsAppFallback) {
  fail(`data-whatsapp values must be represented in WHATSAPP_MESSAGES or covered by the generic fallback: ${uncoveredWhatsappContexts.join(',')}`);
}

const requiredScriptContracts = [
  ['modal reset helper', /function resetIntakeFormState/],
  ['modal reset unhides fields', /hidden\s*=\s*false/],
  ['modal reset hides success state', /classList\.remove\('is-visible'\)/],
  ['WhatsApp continuation reserves a tab during intake click', /window\.open\('about:blank', '_blank'\)/],
  ['WhatsApp fallback same-tab navigation exists', /window\.location\.href\s*=\s*url/],
  ['WhatsApp generic context fallback is covered', /WHATSAPP_MESSAGES\[context\]\s*\|\|\s*WHATSAPP_MESSAGES\.hero/],
  ['lead magnet CTA selector is covered', /lead-magnet-cta/],
  ['disabled class is covered', /is-disabled/],
  ['aria-disabled is covered', /aria-disabled/],
  ['placeholder hash links are covered', /href\.trim\(\) === '#'/],
  ['asset downloads are covered', /data-asset-download/],
  ['lead magnet clicks can be blocked', /event\.preventDefault\(\)/],
  ['approved public PDFs are allowlisted', /APPROVED_PUBLIC_PDFS/],
  ['Markdown paths are rejected', /\.md/],
  ['ATL paths are rejected', /\.atl/],
  ['openspec paths are rejected', /openspec/]
];

for (const [label, pattern] of requiredScriptContracts) {
  if (!pattern.test(script)) {
    fail(`script contract missing: ${label}.`);
  }
}

class FakeEvent {
  constructor(type, options) {
    this.type = type;
    this.cancelable = !options || options.cancelable !== false;
    this.defaultPrevented = false;
    this.target = options && options.target ? options.target : null;
    this.currentTarget = null;
    this.key = options && options.key ? options.key : '';
    this.shiftKey = Boolean(options && options.shiftKey);
  }

  preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true;
    }
  }
}

class FakeClassList {
  constructor(value) {
    this.items = new Set((value || '').split(/\s+/).filter(Boolean));
  }

  add(...values) {
    values.forEach((value) => this.items.add(value));
  }

  remove(...values) {
    values.forEach((value) => this.items.delete(value));
  }

  contains(value) {
    return this.items.has(value);
  }

  toggle(value, force) {
    if (force === true) {
      this.add(value);
      return true;
    }
    if (force === false) {
      this.remove(value);
      return false;
    }
    if (this.contains(value)) {
      this.remove(value);
      return false;
    }
    this.add(value);
    return true;
  }
}

class FakeElement {
  constructor(tagName, attributes) {
    this.tagName = tagName.toUpperCase();
    this.nodeName = this.tagName;
    this.attributes = {};
    this.children = [];
    this.parentNode = null;
    this.eventListeners = {};
    this.style = {};
    this.classList = new FakeClassList('');
    this.offsetParent = {};
    this.ownerDocument = null;
    this.defaultValue = '';
    this.defaultChecked = false;
    this.disabled = false;
    this.checked = false;
    this.value = '';
    this.textContent = '';
    this._hidden = false;

    const attrs = attributes || {};
    Object.keys(attrs).forEach((name) => this.setAttribute(name, attrs[name]));
    if (Object.prototype.hasOwnProperty.call(attrs, 'textContent')) {
      this.textContent = attrs.textContent;
    }
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(value) {
    this._hidden = Boolean(value);
    if (this._hidden) {
      this.attributes.hidden = '';
    } else {
      delete this.attributes.hidden;
    }
  }

  setAttribute(name, value) {
    const normalizedValue = String(value);
    this.attributes[name] = normalizedValue;
    if (name === 'id') {
      this.id = normalizedValue;
    }
    if (name === 'class') {
      this.classList = new FakeClassList(normalizedValue);
    }
    if (name === 'name') {
      this.name = normalizedValue;
    }
    if (name === 'value') {
      this.value = normalizedValue;
      this.defaultValue = normalizedValue;
    }
    if (name === 'type') {
      this.type = normalizedValue;
    }
    if (name === 'hidden') {
      this._hidden = true;
    }
    if (name === 'disabled') {
      this.disabled = true;
    }
    if (name === 'checked') {
      this.checked = true;
      this.defaultChecked = true;
    }
  }

  getAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name) ? this.attributes[name] : null;
  }

  hasAttribute(name) {
    return Object.prototype.hasOwnProperty.call(this.attributes, name);
  }

  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'hidden') {
      this._hidden = false;
    }
    if (name === 'disabled') {
      this.disabled = false;
    }
  }

  appendChild(child) {
    child.parentNode = this;
    child.ownerDocument = this.ownerDocument;
    this.children.push(child);
    propagateOwnerDocument(child, this.ownerDocument);
    return child;
  }

  addEventListener(type, handler) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(handler);
  }

  dispatchEvent(event) {
    if (!event.target) {
      event.target = this;
    }
    event.currentTarget = this;
    const handlers = this.eventListeners[event.type] || [];
    handlers.forEach((handler) => handler.call(this, event));
    return !event.defaultPrevented;
  }

  click() {
    const event = new FakeEvent('click');
    this.dispatchEvent(event);
    if (!event.defaultPrevented && this.tagName === 'A' && this.hasAttribute('href') && this.ownerDocument) {
      this.ownerDocument.defaultView.location.href = this.getAttribute('href');
    }
    return event;
  }

  focus() {
    if (this.ownerDocument) {
      this.ownerDocument.activeElement = this;
    }
  }

  reset() {
    if (!this._controls) {
      return;
    }
    this._controls.forEach((control) => {
      control.value = control.defaultValue || '';
      control.checked = Boolean(control.defaultChecked);
    });
  }

  closest(selector) {
    let current = this;
    while (current) {
      if (matchesSelector(current, selector)) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  querySelector(selector) {
    const matches = this.querySelectorAll(selector);
    return matches.length ? matches[0] : null;
  }

  querySelectorAll(selector) {
    const results = [];
    walkChildren(this, (child) => {
      if (matchesSelector(child, selector)) {
        results.push(child);
      }
    });
    return results;
  }
}

class FakeDocument {
  constructor() {
    this.readyState = 'complete';
    this.eventListeners = {};
    this.documentElement = new FakeElement('html');
    this.body = new FakeElement('body');
    this.activeElement = this.body;
    this.defaultView = null;
    this.documentElement.ownerDocument = this;
    this.body.ownerDocument = this;
    this.documentElement.appendChild(this.body);
  }

  getElementById(id) {
    let found = null;
    walkChildren(this.documentElement, (child) => {
      if (!found && child.id === id) {
        found = child;
      }
    });
    return found;
  }

  querySelectorAll(selector) {
    return this.documentElement.querySelectorAll(selector);
  }

  querySelector(selector) {
    const matches = this.querySelectorAll(selector);
    return matches.length ? matches[0] : null;
  }

  addEventListener(type, handler) {
    if (!this.eventListeners[type]) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(handler);
  }

  dispatchEvent(event) {
    if (!event.target) {
      event.target = this;
    }
    event.currentTarget = this;
    const handlers = this.eventListeners[event.type] || [];
    handlers.forEach((handler) => handler.call(this, event));
    return !event.defaultPrevented;
  }
}

class FakeFormData {
  constructor(form) {
    this.entries = [];
    if (!form || !form._controls) {
      return;
    }
    form._controls.forEach((control) => {
      if (!control.name || control.disabled) {
        return;
      }
      if ((control.type === 'checkbox' || control.type === 'radio') && !control.checked) {
        return;
      }
      this.entries.push([control.name, control.value || 'on']);
    });
  }

  get(name) {
    const match = this.entries.find((entry) => entry[0] === name);
    return match ? match[1] : null;
  }

  set(name, value) {
    let replaced = false;
    this.entries = this.entries.filter((entry) => {
      if (entry[0] !== name) {
        return true;
      }
      if (!replaced) {
        entry[1] = value;
        replaced = true;
        return true;
      }
      return false;
    });
    if (!replaced) {
      this.entries.push([name, value]);
    }
  }

  [Symbol.iterator]() {
    return this.entries[Symbol.iterator]();
  }
}

function propagateOwnerDocument(node, ownerDocument) {
  node.ownerDocument = ownerDocument;
  node.children.forEach((child) => propagateOwnerDocument(child, ownerDocument));
}

function walkChildren(node, visitor) {
  node.children.forEach((child) => {
    visitor(child);
    walkChildren(child, visitor);
  });
}

function splitSelectorList(selector) {
  return selector.split(',').map((part) => part.trim()).filter(Boolean);
}

function matchesSelector(element, selector) {
  return splitSelectorList(selector).some((part) => matchesSelectorPart(element, part));
}

function matchesSelectorPart(element, selector) {
  const segments = selector.split(/\s+/).filter(Boolean);
  let current = element;

  for (let i = segments.length - 1; i >= 0; i -= 1) {
    if (!current || !matchesSimpleSelector(current, segments[i])) {
      return false;
    }
    if (i > 0) {
      current = findAncestor(current.parentNode, segments[i - 1]);
      i -= 1;
    }
  }

  return true;
}

function findAncestor(element, selector) {
  let current = element;
  while (current) {
    if (matchesSimpleSelector(current, selector)) {
      return current;
    }
    current = current.parentNode;
  }
  return null;
}

function matchesSimpleSelector(element, selector) {
  const notMatch = selector.match(/^(.*):not\((.*)\)$/);
  if (notMatch) {
    const base = notMatch[1] || '*';
    return matchesSimpleSelector(element, base) && !matchesSimpleSelector(element, notMatch[2]);
  }

  if (selector === '*') {
    return true;
  }
  if (selector.charAt(0) === '.') {
    return element.classList.contains(selector.slice(1));
  }
  if (selector.charAt(0) === '#') {
    return element.id === selector.slice(1);
  }

  const tagClassMatch = selector.match(/^([a-z][\w-]*)\.([\w-]+)$/i);
  if (tagClassMatch) {
    return element.tagName.toLowerCase() === tagClassMatch[1].toLowerCase() && element.classList.contains(tagClassMatch[2]);
  }

  const attrMatch = selector.match(/^([a-z][\w-]*)?\[([\w-]+)(?:([\^$*|~]?=)["']?([^"'\]]+)["']?)?\]$/i);
  if (attrMatch) {
    const tag = attrMatch[1];
    const attr = attrMatch[2];
    const operator = attrMatch[3];
    const expected = attrMatch[4];
    if (tag && element.tagName.toLowerCase() !== tag.toLowerCase()) {
      return false;
    }
    if (!element.hasAttribute(attr)) {
      return false;
    }
    if (!operator) {
      return true;
    }
    const actual = element.getAttribute(attr) || '';
    if (operator === '=') {
      return actual === expected;
    }
    if (operator === '^=') {
      return actual.indexOf(expected) === 0;
    }
    return false;
  }

  return element.tagName.toLowerCase() === selector.toLowerCase();
}

function append(parent, tagName, attributes) {
  const child = new FakeElement(tagName, attributes);
  parent.appendChild(child);
  return child;
}

function addFormGroup(form, control) {
  const group = append(form, 'div', { class: 'form-group' });
  group.appendChild(control);
  append(group, 'span', { class: 'error-message' });
  return group;
}

function buildBehaviorFixture() {
  const document = new FakeDocument();
  const fetchCalls = [];
  const openedWindows = [];
  const timeoutCallbacks = [];
  const windowListeners = {};
  const window = {
    document,
    location: { href: 'https://example.test/' },
    scrollY: 0,
    innerHeight: 900,
    addEventListener(type, handler) {
      if (!windowListeners[type]) {
        windowListeners[type] = [];
      }
      windowListeners[type].push(handler);
    },
    requestAnimationFrame(callback) {
      callback();
    },
    setTimeout(callback) {
      timeoutCallbacks.push(callback);
      return timeoutCallbacks.length;
    },
    open(url, target) {
      const openedWindow = {
        opener: {},
        closed: false,
        location: { href: url },
        target,
        close() {
          this.closed = true;
        }
      };
      openedWindows.push(openedWindow);
      return openedWindow;
    }
  };
  document.defaultView = window;

  const serviceCta = append(document.body, 'a', {
    href: '#',
    class: 'btn btn-primary',
    'data-service': 'conflictos-acuerdos',
    'data-intake': 'conflictos-acuerdos'
  });
  const unknownServiceButton = append(document.body, 'button', {
    type: 'button',
    'data-service': 'servicio-desconocido'
  });
  const leadCta = append(document.body, 'a', {
    href: '#',
    class: 'btn lead-magnet-cta is-disabled',
    'data-asset-download': 'assets/guides/guia-arriendo.pdf'
  });

  const modal = append(document.body, 'div', {
    id: 'intakeModal',
    class: 'intake-modal',
    'aria-hidden': 'true'
  });
  append(modal, 'div', { id: 'intakeModalBackdrop', class: 'intake-modal-backdrop' });
  const panel = append(modal, 'div', { class: 'intake-modal-panel' });
  append(panel, 'button', { id: 'intakeModalClose', type: 'button' });
  const form = append(panel, 'div', { id: 'intakeForm', role: 'form' });
  const nameInput = new FakeElement('input', { type: 'text', name: 'nombre', id: 'intake-nombre', value: '' });
  const cityInput = new FakeElement('input', { type: 'text', name: 'ciudad', id: 'intake-ciudad', value: '' });
  const serviceSelect = new FakeElement('select', { name: 'servicio', id: 'intake-servicio', value: '' });
  const consent = new FakeElement('input', { type: 'checkbox', name: 'consent', id: 'intake-consent', value: 'on' });

  addFormGroup(form, nameInput);
  addFormGroup(form, cityInput);
  addFormGroup(form, serviceSelect);
  addFormGroup(form, consent);
  const privacyLink = append(form, 'a', { href: '/privacy.html' });
  privacyLink.textContent = 'política de tratamiento de datos';
  const submitWrap = append(form, 'div', { class: 'form-submit' });
  const submit = append(submitWrap, 'button', { id: 'intakeSubmit', type: 'button' });
  submit.textContent = 'Continuar por WhatsApp';
  const success = append(panel, 'div', { id: 'intakeSuccess', class: 'form-success' });
  const successLink = append(success, 'a', {
    href: 'https://wa.me/573224768106',
    'data-whatsapp': 'intake-success'
  });

  form._controls = [nameInput, cityInput, serviceSelect, consent];
  form.elements = {
    nombre: nameInput,
    ciudad: cityInput,
    servicio: serviceSelect,
    consent
  };
  propagateOwnerDocument(document.documentElement, document);

  function fetch(url, options) {
    fetchCalls.push({ url, options });
    return Promise.resolve({ ok: true });
  }

  return {
    document,
    window,
    fetch,
    fetchCalls,
    openedWindows,
    serviceCta,
    unknownServiceButton,
    leadCta,
    modal,
    form,
    nameInput,
    cityInput,
    serviceSelect,
    consent,
    privacyLink,
    submit,
    submitWrap,
    success,
    successLink
  };
}

function assertBehavior(condition, message) {
  if (!condition) {
    fail(`behavior contract failed: ${message}`);
  }
}

async function runBehaviorContracts() {
  if (!script) {
    return;
  }

  const fixture = buildBehaviorFixture();
  const context = vm.createContext({
    document: fixture.document,
    window: fixture.window,
    fetch: fixture.fetch,
    FormData: FakeFormData,
    URLSearchParams,
    console
  });

  try {
    new vm.Script(script, { filename: scriptPath }).runInContext(context);
  } catch (error) {
    fail(`public/js/script.js must execute in the behavior harness: ${error.message}`);
    return;
  }

  fixture.success.classList.add('is-visible');
  fixture.success.setAttribute('tabindex', '-1');
  fixture.form.querySelectorAll('.form-group, .form-submit').forEach((group) => {
    group.hidden = true;
  });
  fixture.submit.disabled = true;
  fixture.submit.textContent = 'Previously sent';

  const openEvent = fixture.serviceCta.click();
  assertBehavior(openEvent.defaultPrevented, 'service CTA opening the intake modal must prevent placeholder navigation.');
  assertBehavior(fixture.modal.getAttribute('aria-hidden') === 'false', 'service CTA must open the intake modal with aria-hidden=false.');
  assertBehavior(fixture.modal.classList.contains('is-open'), 'service CTA must add the modal open class.');
  assertBehavior(fixture.serviceSelect.value === 'conflictos-acuerdos', 'service CTA must set only the allowlisted service value.');
  assertBehavior(fixture.form.querySelectorAll('.form-group, .form-submit').every((group) => group.hidden === false), 'opening intake must unhide form groups and submit controls after a previous success state.');
  assertBehavior(!fixture.success.classList.contains('is-visible') && !fixture.success.hasAttribute('tabindex'), 'opening intake must hide and reset the previous success state.');
  assertBehavior(!fixture.submit.disabled && fixture.submit.textContent === 'Continuar por WhatsApp', 'opening intake must reset the submit button.');

  const privacyEnterEvent = new FakeEvent('keydown', { target: fixture.privacyLink, key: 'Enter' });
  fixture.form.dispatchEvent(privacyEnterEvent);
  assertBehavior(!privacyEnterEvent.defaultPrevented, 'Enter on the privacy link must keep native link behavior.');
  assertBehavior(fixture.openedWindows.length === 0, 'Enter on the privacy link must not trigger WhatsApp continuation.');

  const serviceEnterEvent = new FakeEvent('keydown', { target: fixture.serviceSelect, key: 'Enter' });
  fixture.form.dispatchEvent(serviceEnterEvent);
  assertBehavior(!serviceEnterEvent.defaultPrevented, 'Enter on the service select must keep native select behavior.');
  assertBehavior(fixture.openedWindows.length === 0, 'Enter on the service select must not trigger WhatsApp continuation.');

  fixture.serviceSelect.value = 'conflictos-acuerdos';
  fixture.nameInput.value = '';
  fixture.cityInput.value = 'Bogota Private';
  fixture.consent.checked = true;
  fixture.submit.click();
  assertBehavior(fixture.openedWindows.length === 0, 'missing name must not trigger WhatsApp continuation.');
  assertBehavior(fixture.nameInput.getAttribute('aria-invalid') === 'true', 'missing name must be surfaced as an invalid field.');

  fixture.nameInput.value = 'Alice Sensitive';
  fixture.cityInput.value = '';
  fixture.submit.click();
  assertBehavior(fixture.openedWindows.length === 0, 'missing city must not trigger WhatsApp continuation.');
  assertBehavior(fixture.cityInput.getAttribute('aria-invalid') === 'true', 'missing city must be surfaced as an invalid field.');

  fixture.cityInput.value = 'Bogota Private';
  fixture.consent.checked = false;
  fixture.submit.click();
  assertBehavior(fixture.openedWindows.length === 0, 'missing consent must not trigger WhatsApp continuation.');
  assertBehavior(fixture.consent.getAttribute('aria-invalid') === 'true', 'missing consent must be surfaced as an invalid field.');

  fixture.nameInput.value = 'Alice Sensitive';
  fixture.cityInput.value = 'Bogota Private';
  fixture.consent.checked = true;
  fixture.consent.checked = true;
  fixture.submit.click();
  await Promise.resolve();
  await Promise.resolve();

  assertBehavior(fixture.fetchCalls.length === 0, 'valid intake click must not call fetch or post to Netlify Forms.');
  assertBehavior(fixture.successLink.getAttribute('href').indexOf('https://wa.me/') === 0, 'valid intake click must update the fallback WhatsApp link.');
  assertBehavior(fixture.openedWindows.length === 1, 'valid intake click must reserve and continue to one WhatsApp window.');
  const whatsappUrl = fixture.openedWindows[0] ? fixture.openedWindows[0].location.href : '';
  const decodedWhatsappUrl = decodeURIComponent(whatsappUrl);
  assertBehavior(whatsappUrl === fixture.successLink.getAttribute('href'), 'WhatsApp continuation and fallback link must use the same URL.');
  assertBehavior(decodedWhatsappUrl.indexOf('Conflictos y acuerdos') !== -1, 'WhatsApp continuation must include the selected allowlisted service label.');
  assertBehavior(decodedWhatsappUrl.indexOf('Alice Sensitive') !== -1 && decodedWhatsappUrl.indexOf('Bogota Private') !== -1, 'WhatsApp continuation must include submitted name and city for user-reviewed sending.');

  const beforeLeadHref = fixture.window.location.href;
  const leadEvent = fixture.leadCta.click();
  assertBehavior(leadEvent.defaultPrevented, 'disabled lead magnet CTA clicks must be prevented.');
  assertBehavior(fixture.window.location.href === beforeLeadHref, 'disabled lead magnet CTA clicks must not navigate.');

  fixture.modal.classList.remove('is-open');
  fixture.modal.setAttribute('aria-hidden', 'true');
  fixture.serviceSelect.value = 'personas-derechos';
  fixture.unknownServiceButton.click();
  assertBehavior(fixture.modal.getAttribute('aria-hidden') === 'true' && !fixture.modal.classList.contains('is-open'), 'unknown service openers must not open the intake modal.');
  assertBehavior(fixture.serviceSelect.value === 'personas-derechos', 'unknown service openers must not write unallowlisted service values.');

  fixture.fetchCalls.length = 0;
  fixture.openedWindows.length = 0;
  fixture.serviceSelect.value = 'servicio-desconocido';
  fixture.nameInput.value = 'Alice Sensitive';
  fixture.cityInput.value = 'Bogota Private';
  fixture.consent.checked = true;
  fixture.submit.click();
  await Promise.resolve();
  assertBehavior(fixture.fetchCalls.length === 0, 'unknown selected service must block Netlify submission.');
  assertBehavior(fixture.openedWindows.length === 0, 'unknown selected service must not trigger WhatsApp continuation.');
  assertBehavior(fixture.serviceSelect.getAttribute('aria-invalid') === 'true', 'unknown selected service must be rejected by validation.');

  fixture.fetchCalls.length = 0;
  fixture.openedWindows.length = 0;
  fixture.serviceSelect.value = 'conflictos-acuerdos';
  fixture.nameInput.value = 'N'.repeat(120);
  fixture.cityInput.value = 'C'.repeat(120);
  fixture.consent.checked = true;
  fixture.submit.click();
  await Promise.resolve();
  const boundedWhatsappUrl = fixture.openedWindows[0] ? fixture.openedWindows[0].location.href : '';
  const decodedBoundedWhatsappUrl = decodeURIComponent(boundedWhatsappUrl);
  assertBehavior(boundedWhatsappUrl.length < 1000, 'bounded intake values must keep the generated WhatsApp URL within a conservative length.');
  assertBehavior(decodedBoundedWhatsappUrl.indexOf('N'.repeat(80)) !== -1 && decodedBoundedWhatsappUrl.indexOf('N'.repeat(81)) === -1, 'name must be capped before building the WhatsApp URL.');
  assertBehavior(decodedBoundedWhatsappUrl.indexOf('C'.repeat(80)) !== -1 && decodedBoundedWhatsappUrl.indexOf('C'.repeat(81)) === -1, 'city must be capped before building the WhatsApp URL.');

  fixture.fetchCalls.length = 0;
  fixture.openedWindows.length = 0;
  fixture.serviceSelect.value = 'conflictos-acuerdos';
  fixture.nameInput.value = 'Enter Sensitive';
  fixture.cityInput.value = 'Enter City';
  fixture.consent.checked = true;
  const enterEvent = new FakeEvent('keydown', { target: fixture.cityInput, key: 'Enter' });
  fixture.form.dispatchEvent(enterEvent);
  assertBehavior(enterEvent.defaultPrevented, 'Enter inside intake fields must prevent default navigation/submission.');
  assertBehavior(fixture.openedWindows.length === 1, 'Enter inside intake fields must trigger the same WhatsApp flow.');
}

function report() {
  if (failures.length > 0) {
    console.error('Smoke static contracts failed:');
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log('Smoke static contracts passed.');
}

runBehaviorContracts().then(report).catch((error) => {
  fail(`behavior contract harness crashed: ${error.stack || error.message}`);
  report();
});

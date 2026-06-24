# Landing Quality Specification

## Purpose

Captures the baseline behaviors being upgraded to professional quality: correct Spanish (Colombian) orthography, accessible accordion/FAQ/form interactions, a skip link, real-button case items, and a hero image optimized for LCP. All changes MUST respect `prefers-reduced-motion`. Static HTML5 + vanilla JS (IIFE, `'use strict'`, `var`, `data-*`).

## Requirements

### Requirement: Spanish Accent Integrity

All user-facing Spanish copy in `index.html` and `script.js` MUST use correct accents. Known offenders MUST be fixed: "Conciliación", "Así trabajamos", "Atención cercana y seria", "comunicación", "jurídico", and FAQ question text. After the fix there SHALL be no missing accents in either file.

#### Scenario: Known missing accents fixed

- GIVEN the current files contain "Conciliacion", "Asi", "Atencion", and unaccented FAQ copy
- WHEN the fix is applied
- THEN those strings become "Conciliación", "Así", "Atención" (and accented FAQ copy)
- AND a full-file scan finds no remaining unaccented required words

### Requirement: Accordion & FAQ A11y Associations

Each accordion (`detail-question`) and FAQ (`faq-question`) trigger button MUST pair with its panel via `aria-controls` (button) ↔ matching `id` (panel). Each panel MUST have `aria-labelledby` pointing to its trigger. Trigger `aria-expanded` MUST toggle true/false on open/close.

#### Scenario: Button-panel pairing

- GIVEN an accordion or FAQ item
- WHEN inspected
- THEN the trigger `aria-controls` equals the panel `id`
- AND the panel `aria-labelledby` equals the trigger `id`

#### Scenario: Expanded state toggles

- GIVEN a closed item (`aria-expanded="false"`)
- WHEN the trigger is activated
- THEN `aria-expanded` becomes `"true"`
- AND on close it returns to `"false"`

### Requirement: Form Error A11y

Each form input MUST link to its error message via `aria-describedby`. Error messages MUST live in an `aria-live="polite"` region so screen readers announce them on validation.

#### Scenario: Input-error association

- GIVEN a form field with a validation error message
- WHEN the field is inspected
- THEN the input `aria-describedby` references the error message `id`

#### Scenario: Live announcement

- GIVEN the error region has `aria-live="polite"`
- WHEN validation fails
- THEN the error message is inserted in the live region and announced without stealing focus

### Requirement: Skip Link

A "Saltar al contenido principal" link MUST be the first focusable element in `index.html`. It MUST be visually hidden until focused, then visible, and MUST move focus to the main content on activation.

#### Scenario: Visible on focus

- GIVEN the skip link is not focused
- THEN it is visually hidden
- WHEN it receives focus
- THEN it becomes visible

#### Scenario: Skips to main content

- GIVEN the skip link is activated
- THEN focus moves to the main content landmark
- AND the user is not required to tab through the header

### Requirement: Case Items as Real Buttons

Each `.case-item` MUST be a native `<button>` element, not a `<div>` with `role="button"` and `tabindex`. The `data-service` binding MUST be preserved.

#### Scenario: Native button semantics

- GIVEN the case-items section
- WHEN inspected
- THEN every `.case-item` is a `<button>` element
- AND no `role="button"` or manual `tabindex` remains on them
- AND `data-service` attributes are unchanged

### Requirement: Hero LCP Optimization

The hero image `perfil-1000.png` MUST load eager (not `loading="lazy"`) and MUST have explicit `width` and `height` attributes. It SHOULD set `fetchpriority="high"`.

#### Scenario: Eager above-the-fold load

- GIVEN the hero `<img>` for `perfil-1000.png`
- WHEN inspected
- THEN `loading` is not `lazy` (eager by default)
- AND `width` and `height` attributes are present with numeric values
- AND `fetchpriority="high"` is set

### Requirement: Reduced-Motion Respect

All motion added or modified by this change MUST be disabled or reduced when the user agent prefers reduced motion (`@media (prefers-reduced-motion: reduce)`).

#### Scenario: Reduced motion honored

- GIVEN a user agent with `prefers-reduced-motion: reduce`
- WHEN any animated transition introduced by this change runs
- THEN the transition is suppressed or reduced to an instant change

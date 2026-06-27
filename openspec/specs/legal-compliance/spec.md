# Legal Compliance Specification

## Purpose

Mandates the privacy pages required to close the live non-compliance liability under **Ley 1581 de 2012 + Decreto 1377 de 2013 (SIC)** for a Colombian law-firm landing page that already collects personal data via a consent checkbox. Covers `privacy.html`, `aviso-privacidad.html`, footer wiring, and the WhatsApp intake consent channel. No backend; Netlify serves exact files.

## Requirements

### Requirement: Política de Tratamiento de Datos Page

`privacy.html` MUST exist and declare `lang="es"`. It MUST be valid HTML5 and present, in Spanish (Colombian), the SIC-required sections: responsable del tratamiento, finalidad del tratamiento, derechos del titular (acceso, rectificación, supresión, actualización), canal de reclamos (HAB), and base legal. The responsable name MUST state José Manuel Piñeros (natural person acting as responsible party during the pre-SAS phase). The finalidad section MUST cover data collected through both the contact form and the WhatsApp intake form. This page SHOULD match the landing visual design (Inter/Manrope, palette from `styles.css`).

#### Scenario: All mandatory SIC sections present

- GIVEN `privacy.html` is rendered
- WHEN a reader scans the document
- THEN sections for responsable, finalidad, derechos del titular, canal de reclamos, and base legal are all present and non-empty
- AND the document `lang` attribute equals `es`

#### Scenario: Responsable reflects real data

- GIVEN `privacy.html` is served
- WHEN a reader looks for the responsible party
- THEN the responsable section names José Manuel Piñeros
- AND does NOT display a `[Pendiente: …]` placeholder for the responsible party

#### Scenario: Finalidad covers intake collection

- GIVEN the finalidad section of `privacy.html`
- WHEN a reader checks what personal-data purposes are declared
- THEN intake-form data collection (name, city, service preference via WhatsApp intake) is explicitly listed as a treatment purpose

#### Scenario: Valid HTML5

- GIVEN `privacy.html` is served
- WHEN validated against the HTML5 spec
- THEN it passes with no structural errors

#### Scenario: Firm-specific data partially unavailable

- GIVEN some firm data outside responsable (e.g. RNBd, dirección exacta, teléfono SIC) has not been provided
- WHEN the page is generated
- THEN those specific fields display clearly marked placeholders (e.g. `[Pendiente: …]`)
- AND no fabricated data appears
- AND the responsable field specifically contains the real name, not a placeholder

### Requirement: Intake Form Consent

The WhatsApp intake form MUST include a consent checkbox that references `/privacy.html` and explicitly authorizes treatment of the data collected through the intake (name, city, service preference). The intake consent MUST be independent from the existing contact-form consent but MUST link to the same `/privacy.html` page.

#### Scenario: Intake consent present and linked

- GIVEN the intake form is rendered on the landing page
- WHEN a visitor views the form before submission
- THEN a checked consent checkbox is visible with text that references the política de tratamiento de datos
- AND the checkbox label includes a resolvable link to `/privacy.html`

#### Scenario: Consent absent blocks intake

- GIVEN the intake form is displayed
- WHEN the visitor unchecks the consent checkbox and submits
- THEN the form does not redirect to WhatsApp
- AND an inline message indicates consent is required

### Requirement: Aviso de Privacidad Complementario Page

`aviso-privacidad.html` MUST exist, declare `lang="es"`, and be valid HTML5. It MUST summarize the key points of the política and MUST link to the full `privacy.html`. It SHOULD match the landing visual design.

#### Scenario: Aviso references the full policy

- GIVEN `aviso-privacidad.html` is rendered
- WHEN a reader needs the full policy
- THEN a link to `/privacy.html` is present and resolvable
- AND the link text identifies it as the full política de tratamiento de datos

### Requirement: Footer Legal Link Wiring

`index.html` footer MUST link "Política de tratamiento de datos" to `/privacy.html` and "Aviso de privacidad" to `/aviso-privacidad.html`. Links MUST NOT use `#`. Both links MUST resolve HTTP 200 on Netlify. The consent-checkbox reference (form) MUST also point to the real `/privacy.html`.

#### Scenario: Footer links resolve

- GIVEN the deployed Netlify site
- WHEN each footer legal link is requested
- THEN `/privacy.html` and `/aviso-privacidad.html` each return 200
- AND neither link `href` equals `#`

#### Scenario: Exact file wins over _redirects catch-all

- GIVEN Netlify serves exact files before the `/* → /index.html 200` fallback
- WHEN a crawler requests `/privacy.html`
- THEN the actual `privacy.html` is served (not the SPA fallback)

### Requirement: Legal Page Navigation & Crawlability

Both legal pages MUST provide a back link to `/index.html` and MUST be reachable as exact files (crawlable, not masked by `_redirects`).

#### Scenario: Back navigation

- GIVEN a visitor lands on `/privacy.html` or `/aviso-privacidad.html`
- WHEN they want to return to the landing
- THEN a visible back link to `/index.html` is present on each page

#### Scenario: Crawlable

- GIVEN a search-engine crawler
- WHEN it requests `/privacy.html` or `/aviso-privacidad.html` directly
- THEN the page content is returned with a 200 status

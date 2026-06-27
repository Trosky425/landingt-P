# Delta for legal-compliance

## ADDED Requirements

### Requirement: Intake Form Consent

The WhatsApp intake form MUST include a consent checkbox that references `/privacy.html` and explicitly authorizes treatment of the data collected through the intake (name, city, service preference). The intake consent MUST be independent from the existing contact-form consent but MUST link to the same `/privacy.html` page.

(Previously: Not present — intake form is new in this change.)

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

## MODIFIED Requirements

### Requirement: Política de Tratamiento de Datos Page

`privacy.html` MUST exist and declare `lang="es"`. It MUST be valid HTML5 and present, in Spanish (Colombian), the SIC-required sections: responsable del tratamiento, finalidad del tratamiento, derechos del titular (acceso, rectificación, supresión, actualización), canal de reclamos (HAB), and base legal. The responsable name MUST state José Manuel Piñeros (natural person acting as responsible party during the pre-SAS phase). The finalidad section MUST cover data collected through both the contact form and the WhatsApp intake form. This page SHOULD match the landing visual design (Inter/Manrope, palette from `styles.css`).

(Previously: responsable was a placeholder; finalidad did not cover intake data; legal form was unspecified.)

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

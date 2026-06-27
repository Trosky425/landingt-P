# whatsapp-intake Specification

## Purpose

A 3-field WhatsApp intake mini-form that interposes between the service CTA and the existing service-specific `wa.me` redirect. Collects name, city, and preferred service via Netlify Forms before opening WhatsApp.

## Requirements

### Requirement: Intake Form Capture

The intake form MUST collect exactly three fields: name (text), city (text), and preferred service (select, choices matching the 5 catalog services). The form MUST use Netlify Forms (`netlify` attribute, `POST`). On successful submission, the browser MUST redirect to the service-specific `wa.me` URL corresponding to the selected service.

#### Scenario: Client fills intake and reaches WhatsApp

- GIVEN a client selects "Constitución de empresas" from the service catalog
- WHEN they complete the intake form with name, city, and confirm the service
- AND submit passes client-side validation
- THEN the browser redirects to `https://wa.me/573224768106?text=...` with the pre-filled message for that service
- AND Netlify receives the form submission

#### Scenario: Validation blocks empty submission

- GIVEN the intake form is displayed
- WHEN the client submits with any field empty
- THEN the form does not redirect
- AND an inline validation message indicates which field is missing

### Requirement: Intake Consent Checkbox

The intake form MUST include a checked-by-default consent checkbox. The checkbox label MUST link to `/privacy.html` and MUST state that the client authorizes personal-data treatment per the política de datos.

#### Scenario: Consent is visible before submission

- GIVEN the intake form is rendered
- WHEN the client views the form
- THEN a consent checkbox referencing `/privacy.html` is present
- AND the checkbox is pre-checked
- AND the label includes the words "autorizo" and "tratamiento de datos"

### Requirement: Interposition Preserves WhatsApp Flow

The intake form MUST NOT break the pre-existing service-specific WhatsApp CTA flow. When no intake is needed (e.g. direct WhatsApp click from a non-catalog location), the existing `wa.me` redirect MUST work unchanged.

#### Scenario: Direct WhatsApp CTA still works

- GIVEN the existing WhatsApp float button or team-card WhatsApp link
- WHEN clicked directly without intake interposition
- THEN the `wa.me` redirect fires as before, with its original pre-filled message

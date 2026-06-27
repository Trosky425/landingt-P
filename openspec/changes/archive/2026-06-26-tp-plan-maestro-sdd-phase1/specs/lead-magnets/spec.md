# lead-magnets Specification

## Purpose

Three downloadable guide CTAs that capture leads without overpromising assets that may be unavailable at launch. Placeholder-awareness is mandatory; CTAs MUST degrade gracefully when the referenced PDF is missing.

## Requirements

### Requirement: Lead-Magnet CTA Display

The landing page MUST display exactly 3 lead-magnet CTAs, each linked to a specific downloadable guide path.

| CTA Label | Guide Topic |
|-----------|-------------|
| Guía de arriendo | Tenant/landlord rights |
| Guía de derecho de petición | Filing petitions |
| Guía de creación de empresa | Business incorporation |

#### Scenario: Visitor sees all 3 lead magnets

- GIVEN the landing page loads
- WHEN a visitor reaches the lead-magnet section
- THEN exactly 3 CTAs are visible, each with a descriptive label and a download action

#### Scenario: Missing guide asset

- GIVEN the PDF asset for a lead magnet has not been published
- WHEN the CTA is clicked
- THEN the visitor sees a non-disruptive message indicating the guide is forthcoming (e.g. "Próximamente")
- AND no broken-link error page, 404, or empty download appears

### Requirement: No Overpromise of Unavailable Assets

Lead-magnet CTAs MUST NOT imply immediate delivery guarantees for assets that are not yet hosted. CTAs SHOULD use conditional language (e.g. "Descarga disponible próximamente") when the asset is a placeholder.

#### Scenario: CTA wording does not guarantee unavailable asset

- GIVEN a lead-magnet PDF has not been authored or hosted
- WHEN the CTA text is inspected
- THEN it does NOT contain absolute delivery language such as "Descarga ahora" or "Descarga inmediata"

# service-catalog Specification

## Purpose

5-product, 3-tier service catalog displayed on the landing page, matching the Plan Maestro's validated sell-first services. No backend; static cards build from the existing `.card` pattern.

## Requirements

### Requirement: Service Catalog Display

The landing page MUST display exactly 5 productized legal services grouped into 3 tiers (express, medio, premium). Each service card MUST present: name, tier badge, feature list, pricing reference, and a CTA.

| Service | Tier |
|---------|------|
| Asesoría jurídica express | Express |
| Acciones constitucionales | Express |
| Conciliación / MASC | Medio |
| Constitución de empresas | Medio |
| Asesoría jurídica integral | Premium |

#### Scenario: Visitor scans service catalog

- GIVEN a visitor lands on the services section
- WHEN they view the catalog
- THEN exactly 5 cards are visible with distinct tier badges (Express, Medio, Premium)
- AND each card includes a feature list and a CTA

#### Scenario: Responsive card grid

- GIVEN any viewport width from 320px to 1920px
- WHEN the catalog section renders
- THEN cards reflow into a responsive grid without horizontal scroll
- AND no card content is truncated or overlaps

### Requirement: Fee Policy Reference

Each service card MUST display a pricing reference using CONALBOS reference tariffs as the base, with a clearly labeled 35% introductory discount applicable for the first 3 calendar months.

#### Scenario: Pricing visible on each service card

- GIVEN a visitor views any service card
- WHEN they look for pricing
- THEN a pricing reference is visible on or near the card
- AND the 35% introductory discount label is present
- AND a temporal qualifier ("primeros 3 meses" or equivalent) accompanies the discount

### Requirement: Intake Filter Boundaries

The catalog MUST NOT display a public service exclusion list. The page MAY indicate that initial advisory serves as an intake filter. The internal exclusion rule (unlawful, harmful, unethical, or low-standard matters rejected) MUST remain internal and MUST NOT appear as public-facing catalog text.

#### Scenario: No public exclusion list visible

- GIVEN a visitor reads the service catalog section
- WHEN scanning for service restrictions
- THEN no list titled "servicios que no tomamos" or equivalent is visible

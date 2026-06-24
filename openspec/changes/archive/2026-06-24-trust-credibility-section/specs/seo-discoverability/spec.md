# Delta for SEO Discoverability

## ADDED Requirements

### Requirement: sameAs Canonical Social Profiles

The `LegalService` JSON-LD block MUST include a `sameAs` array listing the firm's canonical social profile URLs: Facebook `https://www.facebook.com/profile.php?id=61585664874960` and Instagram `https://www.instagram.com/tamaraypineros`. The Instagram URL MUST NOT carry the `igsh` tracking parameter. The `sameAs` URLs MUST match the visible footer/sidebar social anchors exactly.

#### Scenario: sameAs present and canonical

- GIVEN the JSON-LD block in `index.html`
- WHEN parsed as JSON
- THEN `sameAs` is an array containing the Facebook and Instagram canonical URLs
- AND no entry contains an `igsh` query parameter

#### Scenario: sameAs matches visible links

- GIVEN the JSON-LD `sameAs` array and the page's visible social anchors
- WHEN the URL sets are compared
- THEN they are identical

## MODIFIED Requirements

### Requirement: Schema.org JSON-LD Enrichment

`index.html` MUST include a Schema.org JSON-LD block typed `LegalService`. It MUST contain `geo` (latitude/longitude for Villavicencio), `openingHours`, `areaServed` (Villavicencio/Meta), and `sameAs` (canonical social profiles). It MUST list exactly three real `employee` `Person` objects — Dra. Sara Muñoz (`jobTitle` "Abogada", `knowsAbout` "Derecho Público", `image`), Dr. Camilo Sáenz (`jobTitle` "Abogado", `knowsAbout` "Derecho Privado", `image`), and Dr. Raúl González (`jobTitle` "Abogado", `knowsAbout` "Legaltech", `image`). The block MUST NOT contain a `founder` field and MUST NOT contain any `"[Pendiente"` placeholder text. The block SHALL validate against the Schema.org `LegalService` type.

(Previously: included a placeholder `founder` Person and a single placeholder `employee` Person with "[Pendiente…]" names; no `sameAs`.)

#### Scenario: Core structured fields present

- GIVEN the JSON-LD block in `index.html`
- WHEN parsed as JSON
- THEN `@type` includes `LegalService`, and `geo`, `openingHours`, `areaServed`, and `sameAs` are present with non-empty values
- AND `geo` contains `latitude` and `longitude` for Villavicencio

#### Scenario: Real attorney Person entries

- GIVEN the JSON-LD `employee` array
- WHEN the Person objects are inspected
- THEN exactly three real Persons are present (Sara Muñoz, Camilo Sáenz, Raúl González)
- AND each has `jobTitle` "Abogado"/"Abogada", a `knowsAbout` specialty, and an `image` URL
- AND no `founder` field exists in the block

#### Scenario: No placeholder leakage

- GIVEN the JSON-LD block text
- WHEN searched for the string "[Pendiente"
- THEN zero matches are found

#### Scenario: Schema.org validation

- GIVEN the JSON-LD block
- WHEN validated with Schema.org tooling
- THEN it validates as a `LegalService` with no type violations

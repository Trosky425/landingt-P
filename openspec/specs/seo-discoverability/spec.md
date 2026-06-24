# SEO Discoverability Specification

## Purpose

Makes the Tamara & Piñeros landing page discoverable and correctly described by search engines: a crawlable `robots.txt`, a valid `sitemap.xml` referencing the live Netlify origin, and Schema.org JSON-LD enrichment on `index.html` so the firm is represented as a `LegalService` with geo, hours, service area, and people. Static site; no backend.

## Requirements

### Requirement: robots.txt

A `robots.txt` file MUST exist at the site root. It MUST allow all crawlers (`User-agent: *` with `Allow: /` or no `Disallow`), and MUST reference the sitemap URL. It SHALL disallow nothing of public value (only an `/admin` path if one existed). It MUST NOT block `privacy.html`, `aviso-privacidad.html`, or `index.html`.

#### Scenario: All crawlers allowed

- GIVEN `robots.txt` at root
- WHEN a crawler reads it
- THEN `User-agent: *` permits crawling of all public pages
- AND a `Sitemap:` directive points to the full sitemap URL

#### Scenario: Legal pages not blocked

- GIVEN `robots.txt` rules
- WHEN checking `/privacy.html` and `/aviso-privacidad.html`
- THEN neither path is disallowed

### Requirement: sitemap.xml

A `sitemap.xml` MUST exist at root and be valid XML per sitemaps.org 0.9. It MUST list `index.html`, `privacy.html`, and `aviso-privacidad.html` with a `lastmod` date. URLs MUST use the Netlify origin `https://tamaraypineros.netlify.app`.

#### Scenario: All pages listed with correct origin

- GIVEN `sitemap.xml` is parsed
- WHEN the URL set is inspected
- THEN it contains `https://tamaraypineros.netlify.app/index.html`, `/privacy.html`, and `/aviso-privacidad.html`
- AND each `<url>` has a `<lastmod>`

#### Scenario: Valid sitemaps.org 0.9 XML

- GIVEN `sitemap.xml`
- WHEN validated against the sitemaps.org 0.9 schema
- THEN it is well-formed and schema-valid

### Requirement: Schema.org JSON-LD Enrichment

`index.html` MUST include a Schema.org JSON-LD block typed `LegalService`. It MUST contain `geo` (latitude/longitude for Villavicencio), `openingHours`, and `areaServed` (Villavicencio/Meta). It SHOULD include `sameAs` (social links when available) and `founder`/`employee` (placeholder Person when real names are unavailable). The block SHALL validate against the Schema.org `LegalService` type.

#### Scenario: Core structured fields present

- GIVEN the JSON-LD block in `index.html`
- WHEN parsed as JSON
- THEN `@type` includes `LegalService`, and `geo`, `openingHours`, and `areaServed` are present with non-empty values
- AND `geo` contains `latitude` and `longitude` for Villavicencio

#### Scenario: Placeholder people when real data unavailable

- GIVEN no real founder/employee names are available
- WHEN the block is generated
- THEN `founder`/`employee` use clearly marked placeholder `Person` entries
- AND no fabricated professional credentials (e.g. Tarjeta Profesional) appear

#### Scenario: Schema.org validation

- GIVEN the JSON-LD block
- WHEN validated with Schema.org tooling
- THEN it validates as a `LegalService` with no type violations

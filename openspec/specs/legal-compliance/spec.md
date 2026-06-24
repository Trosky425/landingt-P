# Legal Compliance Specification

## Purpose

Mandates the privacy pages required to close the live non-compliance liability under **Ley 1581 de 2012 + Decreto 1377 de 2013 (SIC)** for a Colombian law-firm landing page that already collects personal data via a consent checkbox. Covers `privacy.html`, `aviso-privacidad.html`, and footer wiring. No backend; Netlify serves exact files.

## Requirements

### Requirement: Política de Tratamiento de Datos Page

`privacy.html` MUST exist and declare `lang="es"`. It MUST be valid HTML5 and present, in Spanish (Colombian), the SIC-required sections: responsable del tratamiento, finalidad del tratamiento, derechos del titular (acceso, rectificación, supresión, actualización), canal de reclamos (HAB), and base legal. Firm-specific fields (responsable name, contacto, RNBd) MUST use clearly marked placeholders when real data is unavailable. It SHOULD match the landing visual design (Inter/Manrope, palette from `styles.css`).

#### Scenario: All mandatory SIC sections present

- GIVEN `privacy.html` is rendered
- WHEN a reader scans the document
- THEN sections for responsable, finalidad, derechos del titular, canal de reclamos, and base legal are all present and non-empty
- AND the document `lang` attribute equals `es`

#### Scenario: Firm-specific data unavailable

- GIVEN real responsable/contacto/RNBd data has not been provided
- WHEN the page is generated
- THEN each missing field displays a clearly marked placeholder (e.g. `[Pendiente: …]`)
- AND no fabricated personal or registry data appears

#### Scenario: Valid HTML5

- GIVEN `privacy.html` is served
- WHEN validated against the HTML5 spec
- THEN it passes with no structural errors

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

# Team Section Specification

## Purpose

Adds an "Equipo" section presenting the firm's attorneys as real, named people — photo, name, specialty area, and a WhatsApp contact path — to close the credibility gap on a law-firm landing page. Ships NO fabricated credentials, years of experience, bios, testimonials, or founder designation.

## Requirements

### Requirement: Equipo Section Structure

The page MUST include a `<section id="equipo">` using the `.section-alt` background, placed in document order between `#diferenciales` and `#casos`. It MUST contain a `.section-head` with a `.section-kicker` reading "EQUIPO", an `<h2>`, and an intro paragraph. It SHALL reuse the existing `.section` / `.section-head` / `.section-kicker` patterns.

#### Scenario: Correct placement and header

- GIVEN `index.html` document order
- WHEN the section list is inspected
- THEN `#equipo` (`.section-alt`) appears after `#diferenciales` and before `#casos`
- AND its header contains kicker "EQUIPO", an `<h2>`, and an intro `<p>`

### Requirement: Attorney Cards

The section MUST render exactly three attorney cards in this order: Dra. Sara Muñoz (Derecho Público), Dr. Camilo Sáenz (Derecho Privado), Dr. Raúl González (Abogado Legaltech). Each card MUST contain a photo, the attorney's name in an `<h3>`, a `.card-specialty` specialty label, and a WhatsApp CTA. The surname "Sáenz" MUST be spelled correctly (not "Sanenz") in all visible and machine-readable text.

#### Scenario: Three cards with required fields

- GIVEN the `#equipo` section
- WHEN the cards are enumerated
- THEN three cards appear in the order Sara Muñoz, Camilo Sáenz, Raúl González
- AND each card has a photo, `<h3>` name, `.card-specialty`, and a WhatsApp CTA

#### Scenario: Surname typo corrected

- GIVEN all text in `index.html` and `script.js`
- WHEN searched for the string "Sanenz"
- THEN zero matches exist
- AND "Sáenz" appears for Dr. Camilo's surname

### Requirement: Team Grid Layout

The cards MUST be laid out using a dedicated `.team-grid` selector — NOT the existing `.cards-grid` selector. The grid MUST be responsive: one column by default, two columns at `min-width: 640px`, and three columns at `min-width: 900px`. The `.cards-grid` rules MUST NOT be modified.

#### Scenario: Separate responsive grid

- GIVEN `styles.css`
- WHEN the `.team-grid` rules are inspected
- THEN it defines 1 -> 2 (@640) -> 3 (@900) columns
- AND `.cards-grid` breakpoints remain unchanged

### Requirement: Team Card Design

Each card MUST reuse the base `.card` class plus a `.card--team` modifier. The photo MUST use `.card-photo` with `object-fit: cover` and `aspect-ratio: 4 / 5`, positioned at the top of the card. The name MUST be an `<h3>` in Manrope 700. The specialty MUST use `.card-specialty` styled in the accent color `#5A4FCF`, uppercase, with letter-spacing.

#### Scenario: Card visual contract

- GIVEN a `.card--team` element
- WHEN its computed styles are inspected
- THEN `.card-photo` has `object-fit: cover` and `aspect-ratio: 4/5`
- AND `.card-specialty` is uppercase, accent-colored, with letter-spacing

### Requirement: Optimized Attorney Photos

Each photo MUST be served via a `<picture>` element with an AVIF `<source>`, a WebP `<source>`, and a PNG `<img>` fallback. The `<img>` MUST carry `loading="lazy"`, `decoding="async"`, explicit `width`/`height`, and a descriptive `alt` (e.g. "Dra. Sara Muñoz — abogada"). The combined payload of all three photos MUST be under 300 KB; raw ~1.8 MB PNGs MUST NOT ship.

#### Scenario: Responsive image markup

- GIVEN a team card photo
- WHEN the `<picture>` element is inspected
- THEN it has AVIF and WebP sources plus a PNG `<img>` fallback
- AND the `<img>` has `loading="lazy"`, `decoding="async"`, width/height, and descriptive alt

#### Scenario: Payload budget

- GIVEN the three optimized photo assets
- WHEN their byte sizes are summed
- THEN the total is under 300 KB
- AND no shipped file approaches the original raw PNG weight

### Requirement: Attorney-Scoped WhatsApp CTAs

Each card's WhatsApp CTA MUST use `data-whatsapp` with an attorney-scoped context key: `equipo-sara`, `equipo-camilo`, or `equipo-raul`. The link MUST open the firm number `573224768106` — NOT a per-attorney personal number. The pre-filled message MUST mention the attorney's name and specialty. The contexts MUST be defined in `script.js` `CONFIG.messages`.

#### Scenario: Scoped context and message

- GIVEN a card CTA with `data-whatsapp="equipo-sara"`
- WHEN the WhatsApp URL is generated
- THEN it targets `573224768106` with a pre-filled message naming "Dra. Sara Muñoz" and "Derecho Público"
- AND no per-attorney personal phone number is present anywhere

### Requirement: Reveal Animation

Cards MUST use `data-reveal="fade-up"` with staggered delays. The reveal MUST be suppressed under `prefers-reduced-motion: reduce` so cards render visible without movement.

#### Scenario: Reduced-motion suppression

- GIVEN `prefers-reduced-motion: reduce` is active
- WHEN the equipo cards load
- THEN they are visible immediately with no transform animation

### Requirement: Equipo Navigation

An "Equipo" navigation entry linking to `#equipo` MUST appear in both the desktop header `.nav` and the mobile `.mobile-overlay-nav`. The mobile link MUST follow the existing `.mobile-overlay-link` pattern with its `--i` stagger index updated for the inserted item.

#### Scenario: Nav entry in both menus

- GIVEN the header `.nav` and the mobile `.mobile-overlay-nav`
- WHEN the link set is inspected
- THEN both contain an "Equipo" link targeting `#equipo`

### Requirement: No Fabricated Attorney Data

The section MUST NOT include Tarjeta Profesional numbers, years of experience, founding year, biographies, testimonials, case results, or any "founder" designation. Only name, specialty, photo, and WhatsApp CTA are permitted per attorney.

#### Scenario: Only permitted fields

- GIVEN the `#equipo` section markup and `script.js` contexts
- WHEN scanned for credential / bio / testimonial / founder content
- THEN none are present
- AND each card exposes only name, specialty, photo, and WhatsApp CTA

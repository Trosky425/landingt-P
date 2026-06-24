# Social Links Specification

## Purpose

Gives the firm a visible, accessible social presence by adding Facebook, Instagram, and WhatsApp icon links to the page footer and the mobile navigation sidebar. Pairs machine-readable `sameAs` references (see seo-discoverability) with human-clickable anchors using canonical, tracking-free URLs.

## Requirements

### Requirement: Footer Social Row

The page footer MUST include a `.footer-social` row containing three social link buttons: Facebook, Instagram, and WhatsApp. Each button MUST use an inline brand-accurate SVG and a descriptive `aria-label`. The links MUST resolve to Facebook `https://www.facebook.com/profile.php?id=61585664874960`, Instagram `https://www.instagram.com/tamaraypineros`, and WhatsApp `https://wa.me/573224768106`.

#### Scenario: Three footer social links

- GIVEN the `.site-footer`
- WHEN the `.footer-social` row is inspected
- THEN it contains Facebook, Instagram, and WhatsApp icon links with inline SVGs
- AND each anchor href matches its canonical URL

#### Scenario: Instagram tracking param stripped

- GIVEN the Instagram anchor href
- WHEN the URL is parsed
- THEN it is `https://www.instagram.com/tamaraypineros` with no `igsh` query parameter

### Requirement: Mobile Sidebar Social Row

The mobile `.mobile-overlay` sidebar MUST display the same three social icon buttons, placed above the existing WhatsApp CTA button in `.mobile-overlay-footer`. They MUST reuse the same hrefs, SVGs, and `aria-label`s as the footer row.

#### Scenario: Sidebar social placement

- GIVEN the open mobile sidebar
- WHEN the `.mobile-overlay-footer` is inspected
- THEN the three social icons appear above the existing WhatsApp CTA button

### Requirement: No Social Links in Desktop Header

Social links MUST NOT appear in the desktop `.site-header`. The header remains limited to brand, primary `.nav`, and the single WhatsApp CTA.

#### Scenario: Header exclusion

- GIVEN the `.site-header`
- WHEN searched for `.footer-social` or social-brand SVGs
- THEN no social link elements are present

### Requirement: Social Link Visual and Accessibility

Social icon links MUST default to color `#53627A` and shift to `#5A4FCF` on hover. Each link MUST have a minimum 44x44 px touch target, be keyboard focusable, and expose a `:focus-visible` style. Each `aria-label` MUST be descriptive (e.g. "Facebook de Tamara & Piñeros").

#### Scenario: Accessible touch targets and focus

- GIVEN a rendered social link
- WHEN inspected via keyboard
- THEN it is focusable, shows a `:focus-visible` outline, and measures at least 44x44 px
- AND its `aria-label` names the platform and the firm

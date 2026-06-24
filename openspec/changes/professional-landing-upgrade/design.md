# Design: Professional Landing Upgrade — Slice 1 (Compliance + SEO Foundation)

## Technical Approach

No architecture change — the stack stays static HTML5 + vanilla CSS/JS (IIFE, `'use strict'`, `var`, `data-*`). Slice 1 is purely additive files (legal pages, `robots.txt`, `sitemap.xml`) plus targeted inline edits to `index.html` / `styles.css` / `script.js` that close the live SIC liability and fix unblocked SEO/a11y/perf gaps. No build tooling, no new deps. Maps to the 3 specs: `legal-compliance`, `seo-discoverability`, `landing-quality`.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|---|---|---|---|
| Legal page styling | (a) shared `styles.css` (b) standalone CSS (c) inline `<style>` | **(a) link `styles.css`** | Spec says pages SHOULD match landing design; reuses Inter/Manrope + palette; no 4th file; one source of truth. Add a small `.legal-page` block to `styles.css`. |
| Skip-link target | (a) `href="#hero"` + `tabindex="-1"` on hero (b) wrap content in `<main id="main-content">` | **(b) `<main>` landmark** | Spec requires "main content landmark"; `<main>` is the landmark; only 2-line markup change (open after header/overlay, close before whatsapp-float/footer). |
| Form error live region | (a) per-field `aria-live="polite"` span (b) single global live region populated by JS | **(a) per-field** | Spec: "error messages MUST live in an `aria-live=polite` region"; per-field is simplest, no JS change (has-error CSS toggles display). Caveat: SR announcement on display-toggle is SR-dependent — acceptable for manual-verification stack. |
| case-item migration | (a) keep manual keydown (b) remove it | **(b) remove redundant keydown** | Native `<button>` handles Enter/Space; manual handler calls `preventDefault()` + `.click()` (currently neutralizes native). Remove for clarity. `data-service` + click handler preserved. |
| `sameAs` in JSON-LD | (a) empty array (b) omit until real socials | **(b) omit** | Spec says SHOULD "when available"; unavailable now. Avoid emitting empty arrays. |
| Placeholder people | real Person vs placeholder | **placeholder `Person`** | Spec mandates placeholder when real names unavailable; no fabricated Tarjeta Profesional. |

## Data Flow

    Browser ──┬─ index.html (edited) ── styles.css (edited) ── script.js (edited)
              ├─ privacy.html ──┐
              ├─ aviso-privacidad.html ─┤  (all link styles.css; back-link to /index.html)
              ├─ robots.txt ──→ Sitemap: …/sitemap.xml
              └─ sitemap.xml ──→ lists index/privacy/aviso (origin https://tamaraypineros.netlify.app)

    Netlify: exact files (privacy.html, aviso-privacidad.html, robots.txt, sitemap.xml) win over `/* → /index.html 200` in _redirects. No _redirects change.

## File Changes

| File | Action | Description |
|---|---|---|
| `_backup-slice1/index.html`, `_backup-slice1/styles.css`, `_backup-slice1/script.js` | Create | Pre-edit backups (no git safety net). |
| `privacy.html` | Create | Política de tratamiento de datos: responsable, finalidad, derechos del titular (acceso/rectificación/supresión/actualización), canal de reclamos (HAB), base legal. `lang="es"`, link `styles.css`, header brand + "Volver al inicio" → `/index.html`, footer. Firm fields as `[Pendiente: …]`. |
| `aviso-privacidad.html` | Create | Aviso complementario: summary + link to `/privacy.html`. Same shell as privacy.html. |
| `robots.txt` | Create | `User-agent: *` / `Allow: /` / `Sitemap: https://tamaraypineros.netlify.app/sitemap.xml`. No `Disallow`. |
| `sitemap.xml` | Create | sitemaps.org 0.9; lists `index.html`, `privacy.html`, `aviso-privacidad.html` with `lastmod`. Origin `https://tamaraypineros.netlify.app`. |
| `index.html` | Modify | Footer links 825-826 + consent link 785 → real pages; JSON-LD enrichment (geo, openingHours, areaServed array, founder/employee placeholders); hero img eager + width/height + `fetchpriority="high"`; skip-link as first focusable + `<main id="main-content">` wrapper; `aria-controls`/`aria-labelledby` + ids on detail (4) & FAQ (5) items; case-items `div`→`<button>` (drop role/tabindex, keep `data-service`); form error spans get `id` + `aria-live="polite"`, inputs get `aria-describedby`; accent fixes (364 "MÁS", 444 "Conciliación", 519 "Así", 562 "Atención", 563 "comunicación"/"jurídico", 567 "Más", 687 "básicos", 752 "número"). |
| `styles.css` | Modify | `.skip-link` (hidden until `:focus`); `.case-item` button reset (`font-family: inherit; appearance: none;`); `.legal-page` prose container (max-width ~720px, readable measure). Reduced-motion already covered (1815-1845). |
| `script.js` | Modify | Remove redundant case-item keydown handler (441-446). Grep for accent offenders — message strings appear already accented; fix only if found. No a11y JS change needed (aria-expanded already toggled). |

## Interfaces / Contracts

JSON-LD additions to the existing `LegalService` block:

```json
"geo": { "@type": "GeoCoordinates", "latitude": "4.1420", "longitude": "-73.6266" },
"openingHours": "Mo-Fr 08:00-17:00",
"areaServed": [
  { "@type": "City", "name": "Villavicencio" },
  { "@type": "State", "name": "Meta" }
],
"founder": [{ "@type": "Person", "name": "[Pendiente: nombre del fundador]" }],
"employee": [{ "@type": "Person", "name": "[Pendiente: nombre del abogado]" }]
```

ID convention: `detail-trigger-{n}` ↔ `detail-panel-{n}`; `faq-trigger-{n}` ↔ `faq-panel-{n}` (1-indexed). Form errors: `err-{field}`.

## Testing Strategy

| Layer | What | Approach |
|---|---|---|
| Manual | Footer/consent links resolve 200 | `curl -I` each on Netlify preview |
| Manual | Legal pages SIC sections present | Visual scan; lang="es"; valid HTML5 (W3C validator) |
| Manual | a11y pairs | DevTools a11y panel: aria-controls↔id, aria-expanded toggles, skip-link focus, case-items are `<button>` |
| Manual | Schema.org | Schema.org Rich Results Test → validates as `LegalService` |
| Manual | SEO files | `curl /robots.txt`, `/sitemap.xml`; XML validator |
| Manual | Accents | Re-grep offenders list; confirm zero remaining |
| Manual | Reduced motion | OS/devtools emulation → transitions suppressed (existing block) |

## Migration / Rollout

No migration. Back up 3 core files to `_backup-slice1/` before editing (no git). New files are additive — delete to revert. Restore backups + redeploy to roll back inline changes. Ship slice 1 as a single Netlify deploy.

## Open Questions

- [ ] Real founder/employee names, Tarjeta Profesional, address, hours, socials → placeholders until firm provides.
- [ ] Inverted `¿` on FAQ questions — out of spec's "accent" scope; optional polish.
- [ ] `aria-live` announcement reliability on `display:none→block` (SR-dependent) — acceptable now; could later switch to JS-populated error text.

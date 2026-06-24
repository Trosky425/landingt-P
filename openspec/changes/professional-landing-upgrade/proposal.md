# Proposal: Professional Landing Upgrade — Slice 1 (Compliance + SEO Foundation)

## Intent

The live site collects personal data (name/phone/email/message) via a consent checkbox that references a privacy policy — but `privacy.html` and `aviso-privacidad.html` don't exist (footer → `#`). This is **live non-compliance under Ley 1581 de 2012 + Decreto 1377 de 2013 (SIC)**. Slice 1 closes that liability and fixes the unblocked SEO/a11y/perf gaps blocking professional credibility.

## Scope

### In Scope
- `privacy.html` — política de tratamiento de datos (responsable, finalidad, derechos del titular, canal de reclamos)
- `aviso-privacidad.html` — aviso complementario
- `robots.txt` + `sitemap.xml`
- Fix remaining Spanish accents in `index.html` / `script.js`
- A11y: `aria-controls`/`aria-labelledby` (accordion/FAQ), `aria-describedby`/`aria-live` (form errors), skip-link, case-items → `<button>`
- Hero LCP: `perfil-1000.png` eager + `width`/`height` + `fetchpriority="high"`
- Schema.org: `geo`, `openingHours`, `sameAs`, `areaServed`, `founder`/`employee`
- Footer: wire legal links to the real pages

### Out of Scope (deferred)
- Equipo / bios / Tarjeta Profesional / photos — blocked on real firm data
- Location + Google Map — blocked on real address
- Testimonials / case results — blocked on consented data
- Analytics (GA4/Pixel/GTM) — triggers cookie-consent requirement → separate change
- Cookie banner — only when analytics added; booking, blog → separate changes

## Capabilities

### New Capabilities
- `legal-compliance`: privacy policy + aviso de privacidad pages + footer wiring
- `seo-discoverability`: robots.txt, sitemap.xml, Schema.org JSON-LD enrichment
- `landing-quality`: a11y associations, accent fixes, hero LCP fix

### Modified Capabilities
None — no prior specs exist. All three are new full specs; `landing-quality` captures the baseline behaviors these upgrades modify.

## Approach

Static HTML legal pages (no backend; Spanish/Colombian legal text). SEO files at root. Inline fixes to `index.html`/`styles.css`/`script.js` per current IIFE / `'use strict'` / `var` / `data-*` conventions. No build tooling, no new deps. Netlify serves exact files before the `_redirects` catch-all.

## Affected Areas

| Area | Impact | Change |
|------|--------|--------|
| `privacy.html`, `aviso-privacidad.html`, `robots.txt`, `sitemap.xml` | New | Additive |
| `index.html` | Modified | Footer, Schema.org, hero img, a11y, accents |
| `styles.css` + `script.js` | Modified | skip-link/button styles; aria wiring, form-error aria, accents |

## Risks

| Risk | Mitigation |
|------|------------|
| Live legal liability until deployed | Ship slice 1 first — priority |
| No git → no safety net | Back up core files before editing |
| `_redirects` catch-all masks pages | Exact files win; verify 200 on Netlify preview |
| Legal text accuracy (Ley 1581) | SIC-compliant template; mark firm-specific placeholders |
| No automated testing | Manual checklist + Netlify preview + link/SEO audit |

## Rollback Plan

Back up the 3 core files to `_backup-slice1/` before editing. New files are additive — delete to revert. Restore backups to undo inline changes. Redeploy to Netlify.

## Dependencies

- Legal pages need firm-specific fields (responsable, contacto, RNBd) — use marked placeholders if unavailable.
- Real firm data (names, Tarjeta Profesional, address, testimonials, photos) — BLOCKED, deferred.

## Success Criteria

- [ ] `privacy.html` + `aviso-privacidad.html` live with responsable + finalidad + derechos + canal de reclamos
- [ ] Footer links resolve to real pages (no `#`) on Netlify preview
- [ ] `robots.txt` + `sitemap.xml` valid and crawlable
- [ ] Accordion/FAQ `aria-controls`/`aria-labelledby`; form errors `aria-live`; skip-link; case-items are buttons
- [ ] Hero eager + `width`/`height` + `fetchpriority="high"`
- [ ] Schema.org validates with geo, openingHours, sameAs, areaServed
- [ ] No remaining missing accents in index.html/script.js
- [ ] Manual link/SEO audit passes on Netlify preview

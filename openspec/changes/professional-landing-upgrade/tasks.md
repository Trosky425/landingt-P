# Tasks: Professional Landing Upgrade — Slice 1

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350-400 (new files ~220 + index ~80 + css ~30 + js ~6) |
| 400-line budget risk | Medium |
| Chained PRs recommended | Yes |
| Suggested split | Unit 1: new files (PR 1) → Unit 2: inline edits (PR 2) |
| Delivery strategy | ask-on-risk (none given; auto-forecast) |
| Chain strategy | pending — repo is NOT git; user must decide |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: Medium

> Repo is **not a git repo** — chained/stacked PRs require `git init` first. Real fork: (a) git-init + 2 review units, or (b) single manual-review unit (`size:exception`). Proposal ships slice 1 as one Netlify deploy either way; the split is review-sequence only.

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | New files + `.legal-page` styles | PR 1 | additive; base=main (post git-init); curl-200 + SIC + XML verify |
| 2 | index.html + styles.css + script.js inline edits | PR 2 | base=PR 1 branch (footer wiring depends on Unit 1 pages) |

## Phase 1: Foundation (new files + backup)

- [x] 1.1 Copy `index.html`, `styles.css`, `script.js` → `_backup-slice1/` (no git safety net).
- [x] 1.2 Create `privacy.html` — `lang="es"`, link `styles.css`; SIC sections (responsable, finalidad, derechos: acceso/rectificación/supresión/actualización, canal HAB, base legal); header + back→`/index.html`, footer; firm fields `[Pendiente: …]`. → SIC sections present; placeholder data; Valid HTML5.
- [x] 1.3 Create `aviso-privacidad.html` — same shell, summarize política, link→`/privacy.html`, back→`/index.html`. → Aviso references full policy.
- [x] 1.4 Create `robots.txt` — `User-agent: *`, `Allow: /`, `Sitemap: https://tamaraypineros.netlify.app/sitemap.xml`, no Disallow of public pages. → All crawlers allowed; legal pages not blocked.
- [x] 1.5 Create `sitemap.xml` — sitemaps.org 0.9; list index/privacy/aviso with `<lastmod>`; origin `https://tamaraypineros.netlify.app`. → All pages listed; valid XML.

## Phase 2: index.html inline edits

- [x] 2.1 Footer links (825-826) + consent link (785) → `/privacy.html` & `/aviso-privacidad.html` (no `#`). → Footer links resolve; exact-file wins.
- [x] 2.2 JSON-LD: **REPLACE** single-City `areaServed` with array [City Villavicencio, State Meta] — no duplicate keys (S1); ADD `geo` (4.1420,-73.6266), `openingHours` "Mo-Fr 08:00-17:00", founder/employee placeholder `Person`; omit `sameAs`. → Core fields; placeholder people; Schema.org validation.
- [x] 2.3 Hero img (186): drop `loading="lazy"`, add `width="1000" height="1000" fetchpriority="high"`. → Eager LCP.
- [x] 2.4 Skip-link as first focusable + wrap content in `<main id="main-content">` (open after header/overlay, close before whatsapp-float/footer). → Visible on focus; skips to main.
- [x] 2.5 Accordion (detail 371/404/437/471 + panels 385/418/452/488) & FAQ (5 items 647-719): add ids `detail-trigger/panel-{n}`, `faq-trigger/panel-{n}` + `aria-controls`(btn)↔`id`(panel) + `aria-labelledby`(panel)↔trigger id. → Button-panel pairing; expanded toggles.
- [x] 2.6 Form error spans (747/753/759/772/778/787): add `id="err-{field}"` + `aria-live="polite"`; inputs `aria-describedby`. **HARDEN (W2):** keep span in DOM, toggle `.sr-only`/visibility (not `display:none→block`) OR JS-populate text — robustly announce. Wire consent-checkbox error to `aria-describedby` if it has validation (S3). → Input-error assoc; live announcement.
- [x] 2.7 case-items (584/594/604/615): `div role="button" tabindex="0"` → native `<button>`; drop role/tabindex; keep `data-service` + `aria-label`. → Native button semantics.
- [x] 2.8 Accents + FAQ `¿` (W1): "SABER MÁS"(364), "Conciliación"(444), "Así"(519), "Atención"/"comunicación"/"jurídico"(562-563), "Más"(567), "básicos"(687), "número"(752); add inverted `¿` to FAQ questions (FAQ accents already correct — only `¿` missing). → Known accents fixed.

## Phase 3: styles.css + script.js

- [x] 3.1 styles.css: `.legal-page` prose container (max-width ~720px). Remaining: `.skip-link` + `.case-item` button reset — Unit 2. Reduced-motion block exists (1815-1845) — no change. → `.legal-page` added (Unit 1); `.skip-link` + `.case-item` pending (Unit 2).
- [x] 3.2 script.js: remove redundant case-item keydown handler (441-446); grep message strings for accents — fix only if found (design: already accented).

## Phase 4: Manual verification (no test runner)

- [ ] 4.1 Link audit: `curl -I` /privacy.html, /aviso-privacidad.html, /robots.txt, /sitemap.xml on Netlify preview → 200; footer/consent `href` ≠ `#`. _(HTTP — needs deploy)_
- [ ] 4.2 SEO audit: robots.txt parse, sitemap XML validator, Schema.org Rich Results Test → `LegalService`. _(HTTP — needs deploy)_
- [x] 4.3 A11y audit: DevTools a11y panel — `aria-controls`↔`id`, `aria-expanded` toggles, skip-link focus→`<main>`, case-items are `<button>`, `aria-live` announces on error. _(Local inspection — all pairs verified)_
- [x] 4.4 Re-grep accent offenders → zero remaining; reduced-motion emulation → transitions suppressed.
- [ ] 4.5 W3C HTML5 validator on `privacy.html` & `aviso-privacidad.html`. _(HTTP — needs deploy)_

# Tasks: Trust & Credibility Section (Equipo + Social + JSON-LD Repair)

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~193 impl (index.html ~91, styles.css ~98, script.js ~4) + 9 binary assets (0 diff lines). SDD planning docs ~700 md lines — review as separate docs unit. |
| 400-line budget risk | Medium (impl under 400; total incl. SDD docs exceeds 400 -> chained) |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (assets + JSON-LD) -> PR 2 (equipo UI + socials + nav + JS) |
| Delivery strategy | auto-chain |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Assets + JSON-LD repair (no visible UI) | PR 1 | base: main; ships 9 optimized photos + fixes SEO placeholder leak; self-contained |
| 2 | Equipo section + team CSS + nav + WhatsApp contexts | PR 2 | base: main after PR 1 merges; references PR 1 photos in `<picture>` |
| 3 | Social links footer + sidebar + social CSS | PR 2 | merged with Unit 2 (~179 lines total, under budget); capability: social-links |

> Line-drift note: design refs reveal stagger at line 1456; actual is ~1453. Search for pattern `.cards-grid [data-reveal]`, NOT the line number.

## Phase 1: Foundation (PR 1 -- Assets + JSON-LD)

- [x] 1.1 Backup `index.html`, `styles.css`, `script.js` -> `_backup-trust/` before any edit
- [x] 1.2 Optimize 3 photos (`npx sharp-cli@5.2.0`): `sara-munoz`, `camilo-saenz` (FIX Sanenz->Sáenz), `raul-gonzalez`; each AVIF q50 + WebP q80 + PNG c9, 960x1200 4:5 cover; verify total <300KB, no raw PNG ships (deviation: used AVIF q45 + PNG palette16 @ 240x300 to meet <300KB)
- [x] 1.3 `index.html` JSON-LD: DROP founder; replace placeholder employee with 3 real `employee` Person + `sameAs` (FB+IG, `igsh` stripped)

## Phase 2: Equipo Section Core (PR 2 -- Unit 2)

- [ ] 2.1 `index.html`: insert `<section id="equipo">` (`.section-alt`) between `#diferenciales` and `#casos`, 3 attorney cards (picture/h3/card-specialty/WhatsApp CTA)
- [ ] 2.2 `index.html` header `.nav`: add `<a href="#equipo">Equipo</a>` between Diferenciales and Casos
- [ ] 2.3 `index.html` mobile `.mobile-overlay-nav`: insert Equipo `--i:4` after Diferenciales; renumber Casos->5, FAQ->6, Contacto->7
- [ ] 2.4 `styles.css`: add `.team-grid` (1->2@640->3@900), `.card--team`, `.card-photo` (4/5 cover), `.card-specialty` (accent #5A4FCF) -- NEVER edit `.cards-grid`
- [ ] 2.5 `styles.css`: add `.team-grid [data-reveal],` to existing stagger selector (search pattern `.cards-grid [data-reveal]`, not line number)
- [ ] 2.6 `script.js`: add `equipo-sara`/`equipo-camilo`/`equipo-raul` to `CONFIG.messages` (name + specialty, firm # 573224768106)

## Phase 3: Social Links (PR 2 -- Unit 3)

- [ ] 3.1 `index.html` footer `.footer-inner`: add `.footer-social` row (FB/IG/WhatsApp inline SVG + `aria-label`s, canonical hrefs, `igsh` stripped)
- [ ] 3.2 `index.html` `.mobile-overlay-footer`: add `.mobile-overlay-social` ABOVE existing WhatsApp button (same hrefs/SVGs/labels)
- [ ] 3.3 `styles.css`: add `.footer-social` (#53627A->hover #5A4FCF) + `.mobile-overlay-social` (light-on-dark); both 44x44 touch target + `:focus-visible`; NO social in desktop header

## Phase 4: Verification (manual)

- [ ] 4.1 Visual: 3 cards render with photos, ordered Sara->Camilo->Raúl, between #diferenciales and #casos
- [ ] 4.2 Responsive: grid 1col -> 2col@640 -> 3col@900 (DevTools emulation)
- [ ] 4.3 A11y: social links >=44x44, focus-visible outline, descriptive aria-labels, keyboard; "Equipo" in header + sidebar nav
- [ ] 4.4 Reduced-motion: emulate `prefers-reduced-motion: reduce` -> cards visible immediately, no transform
- [ ] 4.5 SEO: JSON-LD validates as LegalService (Rich Results Test), 3 real Persons + sameAs, no founder
- [ ] 4.6 Grep: zero "Sanenz" matches in index.html/script.js; zero "[Pendiente" in index.html
- [ ] 4.7 Performance: `Get-Item *.avif,*.webp,*.png | Measure-Object Length -Sum` < 300KB
- [ ] 4.8 No fabricated data: each card exposes only name + specialty + photo + WhatsApp (no Tarjeta Profesional, years, bios, testimonials, founder)

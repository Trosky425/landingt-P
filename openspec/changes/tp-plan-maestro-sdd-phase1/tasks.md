# Tasks: Plan Maestro SDD — Phase 1

## Phase 1: Markup Foundation

- [x] 1.1 Update `index.html` services block to replace 4 generic cards with 5 named tier cards, `data-tier`, inline pricing, and `data-intake` service CTAs. Depends: none. Effort: 2h.
- [x] 1.2 Add a lead-magnet section in `index.html` and create `assets/guides/.gitkeep`; wire 3 cards with `data-asset` and placeholder-safe CTA copy. Depends: 1.1. Effort: 1h.
- [x] 1.3 Add the `index.html` intake modal (`form[name="intake"]`, honeypot, consent link) and replace the current process block with the 15-step timeline markup. Depends: 1.1. Effort: 2h.
- [x] 1.4 Update `privacy.html` with José Manuel Piñeros as responsable, intake finalidad coverage, and consent text aligned with the modal. Depends: 1.3. Effort: 0.75h.

## Phase 2: Styling

- [x] 2.1 Extend `styles.css` for `.card--tier-*`, `.tier-badge`, `.card-pricing`, and card CTA spacing so all 5 services stay aligned across breakpoints. Depends: 1.1. Effort: 1.5h.
- [x] 2.2 Add `styles.css` states for `.lead-magnet-card`, disabled/`Próximamente` CTA, `.intake-modal`, field errors, and consent row. Depends: 1.2, 1.3. Effort: 1.5h.
- [x] 2.3 Add `styles.css` vertical timeline layout, connector, and reduced-motion-safe reveal rules for the 15-step flow. Depends: 1.3. Effort: 1h.

## Phase 3: Behavior Wiring

- [ ] 3.1 Update `script.js` `CONFIG.messages` with 5 service keys and change `setupWhatsAppLinks()` so only `data-intake` service CTAs open the modal while header, float, and team links keep direct redirect behavior. Depends: 1.1, 1.3. Effort: 1.5h.
- [ ] 3.2 Add `setupIntakeModal()` in `script.js` for required-field validation, consent blocking, Netlify AJAX submit, and service-specific `wa.me` redirect fallback. Depends: 3.1. Effort: 2h.
- [ ] 3.3 Add `setupLeadMagnets()` asset probing and timeline init/reveal hooks in `script.js` without regressing FAQ, nav, or current scroll behaviors. Depends: 1.2, 2.3. Effort: 1.25h.

## Phase 4: Manual Verification

- [ ] 4.1 Run a manual checklist against `index.html`, `styles.css`, `script.js`, and `privacy.html`: 5 tier cards + pricing, 3 lead-magnet states, intake validation/consent, Netlify submit → WhatsApp, direct CTA bypass, timeline reduced-motion, and mobile layout. Depends: 2.1–3.3. Effort: 1.5h.

## Review Workload Forecast

- Estimated changed lines: 480-650
- 400-line budget risk: High
- Chained PRs recommended: Yes
- Decision needed before apply: Yes
- Delivery strategy: ask-on-risk
- Suggested split: PR1 markup + privacy, PR2 CSS states/layout, PR3 JS wiring + manual verification

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: pending
400-line budget risk: High

# Proposal: Plan Maestro SDD — Phase 1 (30-Day Minimum Sellable System)

## Intent

Upgrade the landing page from 4-service lead capture into the Plan Maestro's minimum sellable system: 7 services in 3 tiers, lead-magnet CTAs, WhatsApp intake form, process-flow section, extended compliance. WhatsApp service-specific links already exist (lines 334–387); this adds the capture layer before redirect.

## Prerequisites

7 [VALIDAR] items from `02_PLAN_MAESTRO_TP.md` block catalog/pricing/intake: fundadores, forma jurídica, servicios prioritarios, capacidad pool, honorarios, Drive, responsable datos. Resolve before design.

## Scope

### In Scope
- Service cards: 4→7, 3 tiers (express/medio/premium) on existing `.card` pattern
- Pricing/packages section (blocked on prerequisite #5)
- 3 lead-magnet guide CTAs (source: Plan Maestro catalog; PDF authoring separate)
- WhatsApp intake mini-form: name, city, service → validates → redirects to existing `wa.me`
- "Así funciona" 15-step process-flow section
- Extend legal consent to intake; update privacy-page scope

### Out of Scope
- Operational: Drive folders, WhatsApp labels, case board, lawyer contracts
- Service-specific WhatsApp CTAs — already shipped
- Phase 2/3: analytics, cookie banner, blog, booking
- Lead-magnet PDF creation (assets referenced, not authored)

## Capabilities

### New
- `service-catalog`: 7-product, 3-tier catalog
- `lead-magnets`: 3 downloadable guide CTAs
- `whatsapp-intake`: mini-form validation + redirect interposition (Netlify Forms)
- `process-flow`: 15-step visual section

### Modified
- `legal-compliance`: intake consent extends existing privacy consent

## Approach

Static HTML/CSS/JS. Existing IIFE/`'use strict'`/`var`/`data-*` conventions. No new deps. Netlify Forms for intake. Extend WhatsApp redirect logic in `script.js` to interpose intake before `wa.me` builder. Tiered catalog uses `.card` + modifier classes.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | Modified | Catalog, intake form, process-flow, pricing, magnets |
| `styles.css` | Modified | Tier badges, intake, timeline, card variants |
| `script.js` | Modified | Intake validation, redirect interposition |
| `privacy.html` | Modified | Consent extended to intake |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| [VALIDAR] blocks design | High | Placeholders; design adapts post-resolution |
| Scope creep → operational | Medium | Code-only gate; ops as manual checklist |
| Intake friction hurts conversion | Medium | 3 fields max; Netlify submission metrics |
| Lead-magnet PDFs missing | Medium | Placeholder paths; separate workstream |

## Rollback Plan

Redeploy prior git versions of modified files. Remove additive section blocks. Intake removal restores direct WhatsApp redirect. Netlify instant rollback.

## Dependencies

- [VALIDAR] 1–7 confirmed pre-design. Lead-magnet PDFs hosted (placeholder OK). Netlify Forms for intake.

## Success Criteria

- [ ] 7 tier-tagged cards, responsive 3-col grid
- [ ] Intake validates + redirects to service-specific `wa.me`
- [ ] 3 lead-magnet CTAs resolve (or documented placeholders)
- [ ] "Así funciona" visible, reduced-motion respected
- [ ] Intake consent wired to `/privacy.html`; privacy reflects intake scope
- [ ] No regressions: WhatsApp CTAs, contact form, FAQ, mobile menu

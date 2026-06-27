# Design: Plan Maestro SDD — Phase 1

## Technical Approach

Extend the static HTML/CSS/JS landing page with 5 additive blocks: tiered service catalog (5 cards, 3 tiers with CONALBOS pricing), lead-magnet CTAs (3 cards, placeholder-aware), WhatsApp intake modal (Netlify Forms), 15-step process-flow timeline, and updated legal compliance. All changes follow existing patterns: IIFE `'use strict'`, `var`, `data-*` attributes, `.card` modifier classes, IntersectionObserver reveal. No new dependencies.

## Architecture Decisions

### Decision: Service Catalog — 5 Named Services with Tier Modifiers

| Option | Tradeoff | Decision |
|--------|----------|----------|
| A) New section with separate grid | Duplicates layout, breaks consistency | ❌ |
| B) Extend `.cards-grid` + `.card--tier-{express,medio,premium}` | Reuses responsive grid, tier badge via CSS | ✅ |

**Rationale**: Existing `.cards-grid` handles 1→2 column responsive breakpoints. Tier modifiers add visual differentiation without layout duplication.

**Service-to-tier mapping** (from spec, resolved):

| Service | Tier | CSS class | `data-tier` |
|---------|------|-----------|-------------|
| Asesoría jurídica express | Express | `.card--tier-express` | `express` |
| Acciones constitucionales | Express | `.card--tier-express` | `express` |
| Conciliación / MASC | Medio | `.card--tier-medio` | `medio` |
| Constitución de empresas | Medio | `.card--tier-medio` | `medio` |
| Asesoría jurídica integral | Premium | `.card--tier-premium` | `premium` |

The existing 4 generic cards in `index.html` (lines 320–389) are replaced by these 5 named productized cards. Each card retains the existing structure: `.card-icon` SVG → `h3` → `p` → `ul.card-features` → pricing block → CTA.

### Decision: Pricing Reference — Inline Block per Card with CONALBOS Base + Discount Badge

| Option | Tradeoff | Decision |
|--------|----------|----------|
| A) Separate pricing table section | Disconnects price from service context, adds scroll | ❌ |
| B) Tooltip/hover pricing | Hidden on mobile, poor a11y | ❌ |
| C) Inline pricing block inside each `.card`, between features and CTA | Self-contained, scannable, works on all viewports | ✅ |

**Rationale**: Spec requires pricing visible "on or near the card." Inline keeps the pricing contextually bound to each service. No extra section needed. Works within existing `.card` flex-column layout — pricing block sits above the CTA via `margin-top: auto` push.

**Pricing block markup** (inside each card):

```html
<div class="card-pricing">
  <span class="pricing-base">Ref. CONALBOS: $XXX – $YYY</span>
  <span class="pricing-discount">
    <del>$YYY</del> <strong class="pricing-final">$ZZZ</strong>
  </span>
  <span class="pricing-badge">35% dto. · primeros 3 meses</span>
</div>
```

- `.pricing-base`: muted text, CONALBOS reference range (static, per-service).
- `.pricing-discount`: `<del>` strikethrough on upper range, `<strong>` highlighted discounted value.
- `.pricing-badge`: accent-colored pill badge with temporal qualifier.
- Express services show lower CONALBOS ranges; Premium shows higher. Exact values are content, not code — hardcoded per card in HTML.

### Decision: WhatsApp Intake — Modal Overlay with Netlify Forms

| Option | Tradeoff | Decision |
|--------|----------|----------|
| A) Inline form in services section | Clutters catalog | ❌ |
| B) Separate page | Adds navigation friction | ❌ |
| C) Modal overlay, Netlify submit, then `wa.me` redirect | Preserves card CTAs, captures lead | ✅ |

**Rationale**: Spec requires interposition before redirect. Modal preserves card CTA pattern. Netlify Forms handles submission without backend. Direct WhatsApp CTAs (float, team, header) bypass intake per spec.

**Intake modal service select** mirrors the 5 catalog services:

```html
<select name="servicio" required>
  <option value="asesoria-express">Asesoría jurídica express</option>
  <option value="acciones-constitucionales">Acciones constitucionales</option>
  <option value="conciliacion-masc">Conciliación / MASC</option>
  <option value="constitucion-empresas">Constitución de empresas</option>
  <option value="asesoria-integral">Asesoría jurídica integral</option>
</select>
```

### Decision: Process Flow — Vertical Timeline with CSS Counter

| Option | Tradeoff | Decision |
|--------|----------|----------|
| A) Extend `.steps-grid` to 15 steps | Visually overwhelming, no progression | ❌ |
| B) Vertical timeline with connector line | Scannable, shows progression | ✅ |

**Rationale**: 15 steps need visual hierarchy. Vertical timeline with `::before` connector and numbered circles (reusing `.step-number` styling) shows progression. Reduced-motion disables connector animation.

### Decision: Lead Magnets — Conditional CTA with Asset Probe

| Option | Tradeoff | Decision |
|--------|----------|----------|
| A) Hardcode download links | Breaks when PDFs missing | ❌ |
| B) `data-asset` attribute + JS probe → "Próximamente" fallback | Graceful degradation | ✅ |

**Rationale**: Spec requires "No Overpromise." JS probes asset path via `fetch` HEAD and toggles CTA state.

## Data Flow

```
Service Card CTA click (data-intake="servicio-{key}")
        │
        ▼
  ┌─────────────┐
  │ Intake Modal │ ← name, city, service select + consent
  └──────┬──────┘
         │
    ┌────┴────┐
    ▼         ▼
Netlify    wa.me redirect
Forms      (service-specific
submit     message from CONFIG.messages)

Direct CTAs (float, team, header) → bypass modal → existing flow
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Replace 4 generic cards with 5 named tier-tagged cards + pricing blocks; add lead-magnet section; add intake modal markup; replace 3-step process with 15-step timeline; update nav |
| `styles.css` | Modify | Add `.card--tier-*` modifiers, `.tier-badge`, `.card-pricing` block, `.pricing-badge` pill, `.intake-modal` overlay, `.timeline` vertical layout, `.lead-magnet-card` disabled state |
| `script.js` | Modify | Add `setupIntakeModal()` (validation + Netlify submit + redirect), `setupLeadMagnets()` (asset probe), `setupTimeline()`; modify `setupWhatsAppLinks()` to interpose modal for `data-intake` CTAs only; add 5 service keys to `CONFIG.messages` |
| `privacy.html` | Modify | Section 7: name intake form as active data collection channel; add intake data to finalidad; name José Manuel Piñeros as responsable |
| `assets/guides/` | Create | Directory for lead-magnet PDFs (`.gitkeep` initially) |

## Interfaces / Contracts

### Tier Badge CSS Convention

```css
.card--tier-express .tier-badge { background: #E8F5E9; color: #2E7D32; }
.card--tier-medio   .tier-badge { background: #FFF3E0; color: #E65100; }
.card--tier-premium .tier-badge { background: #EDE7F6; color: #5A4FCF; }
```

### Pricing Block CSS

```css
.card-pricing { margin-top: 16px; padding-top: 16px; border-top: 1px solid #E4E6EC; }
.pricing-base { font-size: 13px; color: #53627A; display: block; }
.pricing-badge {
  display: inline-block; margin-top: 8px; padding: 4px 10px;
  border-radius: 999px; font-size: 12px; font-weight: 700;
  background: rgba(90, 79, 207, 0.08); color: #5A4FCF;
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Visual | All 5 cards render with correct tier badge color and label | Manual cross-browser |
| Visual | **Pricing block visible on every card: CONALBOS ref, strikethrough, discount badge with "primeros 3 meses"** | Manual checklist per card |
| Unit | Intake validation (empty fields block submit, unchecked consent blocks submit) | Browser devtools |
| Integration | Intake submit → Netlify Forms → `wa.me` redirect with correct service message | Manual E2E on staging |
| E2E | Catalog → CTA → intake → WhatsApp; lead magnet placeholder; timeline reveal; reduced-motion | Cross-browser (Chrome, Firefox, Safari mobile) |
| Regression | Direct WhatsApp CTAs bypass intake; FAQ; mobile nav; scroll reveal | Manual checklist |

## Migration / Rollout

No migration required. All additive. Rollback: revert git commit or remove `data-intake` attributes to restore direct `wa.me` redirect. Netlify instant rollback.

## Open Questions

- [ ] Confirm lead-magnet PDF filenames for `assets/guides/`
- [ ] Confirm 15 process-flow step labels (content team input)
- [ ] Confirm responsable name (José Manuel Piñeros) for privacy page
- [ ] Netlify Forms: verify form name `intake` registered in dashboard before deploy

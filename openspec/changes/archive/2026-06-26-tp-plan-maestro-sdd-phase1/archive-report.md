# Archive Report — tp-plan-maestro-sdd-phase1

**Change**: Plan Maestro SDD — Phase 1 (30-Day Minimum Sellable System)
**Archived**: 2026-06-26
**Archive path**: `openspec/changes/archive/2026-06-26-tp-plan-maestro-sdd-phase1/`
**Artifact store mode**: hybrid (OpenSpec filesystem + Engram persistent memory)
**PR strategy**: Chained PRs — feature-branch-chain (PR1 markup + privacy, PR2 CSS states/layout, PR3 JS wiring + manual verification)
**Branch at archive**: `feature/tp-plan-maestro-sdd-phase1-pr3` (not pushed)
**Verify verdict**: PASS WITH WARNINGS — 0 CRITICAL, 3 WARNING

---

## Summary

This change upgraded the landing page from 4 generic service cards to the Plan Maestro's minimum sellable system: a 5-product, 3-tier service catalog (Express / Medio / Premium) with inline CONALBOS pricing and a 35% introductory discount badge, a 3-guide lead-magnet section with asset-probe fallback (`is-disabled` + "Próximamente"), a WhatsApp intake modal (Netlify Forms submit + service-specific `wa.me` redirect) that interposes only on `data-intake` CTAs while preserving direct WhatsApp CTAs (float, team, header), a 15-step "Así funciona" vertical timeline with reduced-motion-safe reveals, and the privacy-page updates required for the new intake channel (José Manuel Piñeros as responsable, intake data covered under finalidad, intake consent wired to `/privacy.html`).

The proposal artifact is stale against the resolved implementation scope: it was authored against 7 services in 3 tiers, but the validated sell-first scope resolved to 5 named services. Specs, design, tasks, and the shipped code all use the resolved 5-service scope. The proposal is preserved in the archive as a historical record; the WARN is recorded below.

---

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| service-catalog | Created | Delta was a full new spec (no prior main spec). 3 requirements copied verbatim: Service Catalog Display (5 cards, 3 tiers), Fee Policy Reference (CONALBOS + 35% dto. primeros 3 meses), Intake Filter Boundaries (no public exclusion list). |
| lead-magnets | Created | Delta was a full new spec (no prior main spec). 2 requirements copied verbatim: Lead-Magnet CTA Display (exactly 3 CTAs, missing-asset graceful fallback), No Overpromise of Unavailable Assets. |
| whatsapp-intake | Created | Delta was a full new spec (no prior main spec). 3 requirements copied verbatim: Intake Form Capture (3 fields, Netlify Forms, service-specific `wa.me` redirect), Intake Consent Checkbox (checked-by-default, linked to `/privacy.html`), Interposition Preserves WhatsApp Flow (direct CTAs bypass modal). |
| process-flow | Created | Delta was a full new spec (no prior main spec). 2 requirements copied verbatim: Process Flow Display (15 steps, "Así funciona" section, reduced-motion safe), No Operational Implementation Leak. |
| legal-compliance | Updated (MODIFIED + ADDED) | 1 requirement modified (Política de Tratamiento de Datos Page: responsable resolved to José Manuel Piñeros, finalidad now covers intake, partial-data placeholder rule preserved), 1 requirement added (Intake Form Consent: intake consent independent from contact consent, blocks submission when unchecked). 3 prior requirements preserved (Aviso de Privacidad Complementario Page, Footer Legal Link Wiring, Legal Page Navigation & Crawlability). |

### Merge detail

**CREATED (full new main specs, copied verbatim from delta):**
- `service-catalog/spec.md` ← `openspec/changes/.../specs/service-catalog/spec.md`
- `lead-magnets/spec.md` ← `openspec/changes/.../specs/lead-magnets/spec.md`
- `process-flow/spec.md` ← `openspec/changes/.../specs/process-flow/spec.md`
- `whatsapp-intake/spec.md` ← `openspec/changes/.../specs/whatsapp-intake/spec.md`

**MODIFIED — `Política de Tratamiento de Datos Page` (legal-compliance):**
- Responsable: placeholder rule tightened — real name (José Manuel Piñeros) required, no `[Pendiente: …]` for responsable specifically; other firm-specific fields (RNBd, dirección, teléfono SIC) still allow clearly marked placeholders.
- Finalidad: now MUST cover both contact-form and WhatsApp intake-form data.
- Scenarios: replaced "Firm-specific data unavailable" with three focused scenarios — "Responsable reflects real data", "Finalidad covers intake collection", "Firm-specific data partially unavailable".

**ADDED — `Intake Form Consent` (legal-compliance):**
- New requirement: WhatsApp intake form consent checkbox must reference `/privacy.html`, authorize intake-data treatment (name, city, service preference), be independent from contact-form consent, and block submission when unchecked.
- Two scenarios: "Intake consent present and linked", "Consent absent blocks intake".

**PRESERVED (legal-compliance):** `Aviso de Privacidad Complementario Page`, `Footer Legal Link Wiring`, `Legal Page Navigation & Crawlability` — all three requirements and their scenarios retained unchanged.

---

## Archive Contents

| Artifact | Status | Notes |
|----------|--------|-------|
| `proposal.md` | ✅ | Intent, scope, approach, risks, rollback. STALE: still references 7 services; resolved scope is 5. Preserved as historical record — see WARN W3. |
| `specs/service-catalog/spec.md` | ✅ | Delta spec, now merged into main `openspec/specs/service-catalog/spec.md` |
| `specs/lead-magnets/spec.md` | ✅ | Delta spec, now merged into main `openspec/specs/lead-magnets/spec.md` |
| `specs/whatsapp-intake/spec.md` | ✅ | Delta spec, now merged into main `openspec/specs/whatsapp-intake/spec.md` |
| `specs/process-flow/spec.md` | ✅ | Delta spec, now merged into main `openspec/specs/process-flow/spec.md` |
| `specs/legal-compliance/spec.md` | ✅ | Delta spec, now merged into main `openspec/specs/legal-compliance/spec.md` |
| `design.md` | ✅ | Architecture decisions, CSS/JS conventions, file change list, interfaces/contracts |
| `tasks.md` | ✅ | 11/11 implementation tasks complete; all checkboxes checked |
| `verify-report.md` | ✅ | PASS WITH WARNINGS — full compliance matrix, static inspection snapshot, spec/correctness tables |

### Task completion summary

- **Phase 1** (Markup Foundation): 4/4 ✅ — 1.1 catalog cards, 1.2 lead-magnet section + `.gitkeep`, 1.3 intake modal + 15-step timeline, 1.4 privacy page update
- **Phase 2** (Styling): 3/3 ✅ — 2.1 tier modifiers + pricing, 2.2 lead-magnet/intake states, 2.3 vertical timeline + reduced-motion
- **Phase 3** (Behavior Wiring): 3/3 ✅ — 3.1 CONFIG.messages + `data-intake` interposition, 3.2 `setupIntakeModal()` validation + Netlify + redirect, 3.3 `setupLeadMagnets()` + `setupTimeline()` init/reveal
- **Phase 4** (Manual Verification): 1/1 ✅ — 4.1 manual checklist across all 4 files

---

## Source of Truth Updated

The following main specs now reflect the new behavior:

- `openspec/specs/service-catalog/spec.md` — created (5-product 3-tier catalog, CONALBOS pricing + 35% dto., no public exclusion list)
- `openspec/specs/lead-magnets/spec.md` — created (3 CTAs, asset probe + "Próximamente" fallback, no overpromise copy)
- `openspec/specs/process-flow/spec.md` — created (15 steps, responsive + reduced-motion safe, no operational leaks)
- `openspec/specs/whatsapp-intake/spec.md` — created (3 fields, Netlify Forms, service-specific `wa.me` redirect, consent required, direct CTAs bypass)
- `openspec/specs/legal-compliance/spec.md` — Política requirement updated (real responsable + intake finalidad + partial-placeholder rule); new `Intake Form Consent` requirement added; 3 prior requirements preserved unchanged

---

## Warnings & Open Items

### W1: Browser / staging E2E was not executed (non-blocking, WARNING in verify-report)

No local automation or browser runner is configured in this environment. Runtime behavior remains unproven for:
- Netlify Forms receipt of intake submission
- `wa.me` redirect with correct service-specific pre-filled message
- Responsive catalog / timeline / intake modal layouts across 320–1920px viewports
- `prefers-reduced-motion: reduce` honored on the timeline
- Mobile WhatsApp app handoff from redirect

Static source inspection found no code defect. **Resolution**: recommend a single manual staging smoke pass before the next user-facing deploy (catalog CTA → intake → Netlify → WhatsApp, lead-magnet missing-asset click, mobile layout, reduced-motion).

### W2: HTML5 validator not configured (non-blocking, WARNING in verify-report)

No local HTML5 validator available. `privacy.html` and `index.html` are source-inspection verified only for legal compliance and structural correctness. **Resolution**: validate against an external HTML5 validator (e.g. validator.w3.org/nu) before the next deploy.

### W3: Proposal is stale against resolved implementation scope (non-blocking, WARNING in verify-report)

The proposal still references 7 services in 3 tiers, while the resolved sell-first scope (specs, design, tasks, implementation) is 5 named services. The proposal is preserved in the archive as the original intent; the scope resolution was a downstream decision. **Resolution**: this is an artifact-drift warning, not a code defect. If desired, a follow-up SDD change can author a revised proposal, or a resolution note can be appended to the archived proposal explaining the 7 → 5 reduction.

### Out-of-scope items preserved for future SDD cycles

These were identified as out-of-scope during exploration and remain for future work:
- Lead-magnet PDF creation and hosting (`assets/guides/` is `.gitkeep`-only)
- Operational systems: Drive folders, WhatsApp labels, case board, lawyer contracts
- Service-specific WhatsApp CTAs — already shipped pre-Phase-1
- Phase 2/3: analytics, cookie banner, blog, booking

---

## Intentional Archive Note

This archive proceeds with acknowledged warnings:
- W1 (browser/staging E2E) is accepted — implementation is complete and static-source-validated; manual staging smoke recommended post-archive.
- W2 (HTML5 validator) is accepted — source-inspection is the only path available in this environment; external validation recommended pre-deploy.
- W3 (proposal drift) is accepted — proposal is preserved as historical intent; the resolved 5-service scope is captured in specs, design, tasks, and implementation.

No CRITICAL issues. No override required. The verify verdict (PASS WITH WARNINGS) is recorded as the basis for archive clearance.

---

## Engram Traceability

| Topic | Observation ID | Purpose |
|-------|----------------|---------|
| `sdd/tp-plan-maestro-sdd-phase1/apply-progress` | #466 | Apply progress / blocker fix (timeline labels + `is-disabled` alignment) |
| `sdd/tp-plan-maestro-sdd-phase1/verify-report` | #472 | Verification verdict (PASS WITH WARNINGS) |
| `sdd/tp-plan-maestro-sdd-phase1/archive-report` | (this save) | Archive closure with lineage |

All four delta spec files, the design, the tasks, and the verify-report are mirrored in `openspec/changes/archive/2026-06-26-tp-plan-maestro-sdd-phase1/`. The main specs at `openspec/specs/{service-catalog,lead-magnets,process-flow,whatsapp-intake,legal-compliance}/spec.md` are the new source of truth.

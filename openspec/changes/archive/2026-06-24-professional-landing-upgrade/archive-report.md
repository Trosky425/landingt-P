# Archive Report: professional-landing-upgrade

**Change**: professional-landing-upgrade — Slice 1 (Compliance + SEO Foundation)
**Archived**: 2026-06-24
**Mode**: hybrid (OpenSpec files + Engram)
**Store mode**: hybrid

---

## What Was Archived

The entire active change directory `openspec/changes/professional-landing-upgrade/` was moved to `openspec/changes/archive/2026-06-24-professional-landing-upgrade/`.

### Artifacts Archived

| Artifact | Path | Status |
|----------|------|--------|
| Proposal | `proposal.md` | ✅ Archived |
| Design | `design.md` | ✅ Archived |
| Tasks | `tasks.md` | ✅ Archived |
| Verify report | `verify-report.md` | ✅ Archived |
| Archive report | `archive-report.md` | ✅ Archived (this file) |

### Engram Observations

| Artifact | Topic Key |
|----------|-----------|
| Proposal | `sdd/professional-landing-upgrade/proposal` |
| Apply progress | `sdd/professional-landing-upgrade/apply-progress` |
| Archive report | `sdd/professional-landing-upgrade/archive-report` |

No delta specs were present in the change directory — all 3 specs were created as full specs directly at `openspec/specs/{domain}/spec.md`. No delta merge was needed.

---

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| `legal-compliance` | Already in place | Full spec at `openspec/specs/legal-compliance/spec.md` — 5 requirements, 9 scenarios |
| `seo-discoverability` | Already in place | Full spec at `openspec/specs/seo-discoverability/spec.md` — 3 requirements, 6 scenarios |
| `landing-quality` | Already in place | Full spec at `openspec/specs/landing-quality/spec.md` — 7 requirements, 12 scenarios |

All three specs were created as full specs (not deltas) according to the proposal's "No prior specs exist — all three are new full specs" intent. They were placed directly into `openspec/specs/` during implementation and serve as the source of truth.

---

## Task Completion Summary

| Phase | Complete | Total | Status |
|-------|----------|-------|--------|
| Phase 1: Foundation (new files) | 5 | 5 | ✅ All complete |
| Phase 2: index.html inline edits | 8 | 8 | ✅ All complete |
| Phase 3: styles.css + script.js | 2 | 2 | ✅ All complete |
| Phase 4: Manual verification | 2 | 5 | ⏳ 3 deferred (require Netlify deploy) |
| **Total** | **17** | **20** | **Complete (local) — 3 deferred** |

### Implementation Tasks (Phases 1-3): 15/15 ✅ ALL COMPLETE

All implementation tasks across Phases 1, 2, and 3 are checked complete in `tasks.md`. The apply-progress Engram record confirms every task was implemented and all commits merged to main.

### Deferred Verification Tasks (Phase 4)

These 3 tasks could not be completed locally — they require a Netlify deploy:

| Task | Description | Dependency |
|------|-------------|------------|
| 4.1 | Link audit: `curl -I` on `/privacy.html`, `/aviso-privacidad.html`, `/robots.txt`, `/sitemap.xml` → HTTP 200 | Netlify deploy |
| 4.2 | SEO audit: robots.txt parse, sitemap XML validator, Schema.org Rich Results Test → `LegalService` | Netlify deploy |
| 4.5 | W3C HTML5 validator on `privacy.html` & `aviso-privacidad.html` | Netlify deploy |

**Deferred items to close after deploy:**
- [ ] HTTP 200 for `/privacy.html`, `/aviso-privacidad.html`, `/robots.txt`, `/sitemap.xml`
- [ ] Exact file wins over `_redirects` catch-all
- [ ] Schema.org Rich Results Test validates as `LegalService`
- [ ] W3C HTML5 validation of legal pages

---

## Warnings & Known Issues

### W1 (WARNING): aria-live announcement reliability

- **Spec:** `landing-quality` — Form Error A11y, Scenario: Live announcement
- **Issue:** Error message text is hardcoded in the DOM (sr-only approach). When `.has-error` CSS is toggled, the `aria-live="polite"` region content does not change — screen readers only announce content insertion/modification, not CSS visibility changes.
- **Impact:** Screen reader users may not hear error messages announced dynamically.
- **Recommendation:** JS-populate error text in empty spans on validation (option a from design's open questions) — this triggers aria-live announcement reliably.
- **Files affected:** `index.html` (error spans), `styles.css` (sr-only toggle), `script.js` (has-error toggle without text population)

### S1 (Suggestion): WhatsApp message contexts for legal pages

- `privacy.html` uses `data-whatsapp="privacy"` and `aviso-privacidad.html` uses `data-whatsapp="aviso"`, but `script.js` CONFIG.messages has no matching contexts — fallback uses the `hero` message.

### S2 (Suggestion): WhatsApp links use `href="#"` (pre-existing)

- Pre-existing pattern where WhatsApp links use `href="#"` with JS interception. For no-JS users, links go nowhere. Pre-existing, not introduced by this change.

---

## Future Changes Planned

From the proposal's out-of-scope list and verify-report:

| Change | Description | Blocked On |
|--------|-------------|------------|
| Trust Section | Equipo/bios/Tarjeta Profesional/photos | Real firm data |
| Location | Google Map embed | Real firm address |
| Testimonials | Case results | Consented client data |
| Analytics | GA4/Pixel/GTM | Triggers cookie consent — separate change |
| Cookie Banner | Only when analytics added | After analytics decision |
| Booking | Online appointment scheduling | Separate change |
| Blog | Content publishing | Separate change |
| WhatsApp `href` hardening | Progressive enhancement for no-JS | Pre-existing, low priority |

---

## Verification Summary (from verify-report.md)

- **Verdict:** PASS WITH WARNINGS
- **CRITICAL:** 0 — No blockers
- **WARNINGS:** 1 (W1: aria-live announcement reliability)
- **SUGGESTIONS:** 2 (S1: WhatsApp message contexts, S2: href="#" pre-existing)
- **DEFERRED:** 5 deploy-dependent checks
- **Spec scenarios PASS by source inspection:** 16/16 local-verifiable scenarios pass
- **Design coherence:** 6/6 design decisions match implementation

The change is ready to deploy. After deploy, close the 3 deferred verification tasks (4.1, 4.2, 4.5).

---

## Intentional-With-Warnings Archive

This archive is marked **intentional-with-warnings** because:
1. The config.yaml rule "Confirm Netlify deploy state before archiving" applies, but the change has not been deployed. The deferred verification tasks are documented here and require deploy to close.
2. W1 (aria-live) is a known warning that does not block archive — no CRITICAL issues exist.
3. All implementation tasks (Phases 1-3) are 100% complete and verified by source inspection.
4. The archive is performed per orchestrator instruction with full awareness of deferred items.

---

## Source of Truth

The following specs in `openspec/specs/` now reflect the implemented behavior:

- `openspec/specs/legal-compliance/spec.md` — Privacy pages, footer wiring, crawlability
- `openspec/specs/seo-discoverability/spec.md` — robots.txt, sitemap.xml, Schema.org JSON-LD
- `openspec/specs/landing-quality/spec.md` — Accents, a11y associations, skip-link, case-items, hero LCP, reduced motion

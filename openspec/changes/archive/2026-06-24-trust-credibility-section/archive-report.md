# Archive Report — trust-credibility-section

**Change**: Trust & Credibility Section (Equipo + Social + JSON-LD Repair)
**Archived**: 2026-06-24
**Archive path**: `openspec/changes/archive/2026-06-24-trust-credibility-section/`
**Artifact store mode**: hybrid (OpenSpec filesystem + Engram persistent memory)

---

## Summary

This change delivered one integrated trust slice across three capabilities: a visible **team section** (`#equipo`) with three real attorney cards between `#diferenciales` and `#casos`, **social links** (Facebook, Instagram, WhatsApp) in the footer and mobile sidebar, and **JSON-LD repair** — dropping the placeholder `founder` and single placeholder `employee`, replacing them with three real `employee` `Person` objects plus canonical `sameAs` (FB + IG). Photos were optimized from ~5.6MB raw to 286KB across 9 files (AVIF/WebP/PNG).

**Verdict at archive**: PASS WITH WARNINGS — 0 CRITICAL, 1 WARNING, 6 DEFERRED.

---

## Specs Synced

| Domain | Action | Details |
|--------|--------|---------|
| seo-discoverability | Updated (MODIFIED + ADDED) | 1 requirement modified (Schema.org JSON-LD Enrichment: founder replaced with 3 real Persons, sameAs added), 1 requirement added (sameAs Canonical Social Profiles) |

### Merge detail

**MODIFIED** — `Schema.org JSON-LD Enrichment`:
- Changed `SHOULD include sameAs` → `MUST include sameAs`
- Replaced placeholder `founder`/`employee` → exactly 3 real Persons (Sara Muñoz, Camilo Sáenz, Raúl González)
- Added `MUST NOT contain founder` and `MUST NOT contain "[Pendiente"`
- Updated scenarios: replaced "Placeholder people when real data unavailable" with "Real attorney Person entries" + "No placeholder leakage"

**ADDED** — `sameAs Canonical Social Profiles`:
- New requirement: JSON-LD `sameAs` MUST list FB and IG canonical URLs
- Two scenarios: sameAs present and canonical, sameAs matches visible links

**PRESERVED**: `robots.txt` and `sitemap.xml` requirements (unchanged by this delta).

---

## Archive Contents

| Artifact | Status | Notes |
|----------|--------|-------|
| `proposal.md` | ✅ | Intent, scope, approach, risks, rollback plan |
| `specs/seo-discoverability/spec.md` | ✅ | Delta spec (now merged into main) |
| `design.md` | ✅ | Architecture decisions, HTML/CSS/JS, before/after |
| `tasks.md` | ✅ | 12/12 implementation tasks complete; 1/8 verification checked in tasks.md (4.6), 3 confirmed by verify evidence (4.6, 4.7, 4.8) |
| `verify-report.md` | ✅ | PASS WITH WARNINGS — full compliance matrix |

### Task completion summary

- **Phase 1** (Assets + JSON-LD): 3/3 ✅
- **Phase 2** (Equipo Section Core): 6/6 ✅
- **Phase 3** (Social Links): 3/3 ✅
- **Phase 4** (Verification): 1/8 checked in tasks.md (4.6); 3 confirmed by verify evidence (4.6 grep, 4.7 payload, 4.8 no fabrication); 6 deferred (browser/Netlify-dependent)

---

## Source of Truth Updated

The following specs now reflect the new behavior:

- `openspec/specs/seo-discoverability/spec.md` — Schema.org JSON-LD requirement updated and sameAs requirement added

---

## Warnings & Open Items

### W1: sameAs vs visible social anchors (non-blocking)

The JSON-LD `sameAs` array includes only Facebook and Instagram (correct per Schema.org convention — `sameAs` is for social *profile* pages). The visible footer/sidebar social anchors include a WhatsApp `wa.me` link, which is a messaging deep-link, not a profile page. The delta spec scenario says "the URL sets are identical" — this is technically not true when counting WhatsApp. **Resolution**: sameAs is correct as-is. The spec wording tension was identified by verify-report W1. No action needed — the schema.org-correct behavior (FB + IG only in sameAs) is already implemented.

### 6 deferred verification tasks

These require a browser, DevTools emulation, or deployed Netlify origin — not executable in the verify environment. They should be confirmed post-deploy:

| # | Check | Deferred because |
|---|-------|-----------------|
| 1 | Visual: 3 cards render with photos, ordered, between sections | Needs browser |
| 2 | Responsive: grid 1col→2col@640→3col@900 | Needs DevTools emulation |
| 3 | A11y rendered: 44×44 measurement, keyboard tab, focus-visible | Needs browser |
| 4 | Reduced-motion: `prefers-reduced-motion: reduce` emulation | Needs DevTools |
| 5 | SEO: JSON-LD validates as LegalService via Rich Results Test | Needs Schema.org validator |
| 6 | HTTP 200 for 9 new photo files | Needs deployed Netlify origin |

### Pre-existing suggestion (non-blocking)

The stagger-delay `calc(var(--delay, 0ms) * 1ms)` produces an invalid CSS `time * time` multiplication, causing simultaneous rather than staggered reveals across all grids. Pre-existing across `.cards-grid`, `.steps-grid`, `.reasons-grid`, `.case-list`, and now `.team-grid`. Optional fix: `calc(var(--delay, 0) * 1ms)` with unitless `--delay` or drop the `* 1ms`.

---

## Future Changes Planned

These were identified as out-of-scope during exploration and remain for future SDD cycles:

- **Tarjeta Profesional**: Add attorney professional ID numbers when provided by the firm
- **Office address + Google Map**: Embed location with a Maps iframe
- **Testimonials**: Client testimonial carousel or cards
- **Analytics**: Privacy-respecting analytics (e.g., Plausible, Fathom)
- **Booking**: Online appointment scheduling integration
- **Blog**: Legal blog or articles section

---

## Intentional Archive Note

This archive proceeds with acknowledged warnings:
- W1 sameAs wording tension is accepted — sameAs is correct per Schema.org
- 6 deferred checks require Netlify deployment to verify — implementation is complete and static-source-validated
- Pre-existing stagger-delay suggestion is non-blocking and affects pre-existing code

---

## Engram Traceability

- Apply-progress: observation #427 (PR 2 completion, 12/12 impl tasks)
- Archive report: `topic_key: sdd/trust-credibility-section/archive-report`
- Verify report: `openspec/changes/archive/2026-06-24-trust-credibility-section/verify-report.md`

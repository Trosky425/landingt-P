# Proposal: Document Brand System

## Intent

Create a premium legal-document standard for Tamara & Piñeros PDFs: elegant, simple, trustworthy, and boutique. The gap is ad hoc document presentation; the opportunity is a reusable system that makes each PDF feel like a premium legal product while keeping the true control signals internal and verifiable.

## Scope

### In Scope
- Define PDF visual identity: cover/header/footer, watermark, logo usage, palette, typography, spacing, and tone.
- Define documentary controls: unique ID format (`TP-SLD-001 · V1.0 · 2026` as the first canonical pattern), versioning, human-review status, and source grounding.
- Define compliance-safe Spanish labels: “Identificador del documento”, “Versión”, “Revisión jurídica humana”, “Fuentes base”.

### Out of Scope
- Accredited certification claims or literal blockchain implementation.
- Full legal drafting for every future PDF.
- Landing-page redesign or new CTA mechanics.

## Capabilities

### New Capabilities
- `document-brand-system`: reusable premium PDF identity + watermark + traceability standard.

### Modified Capabilities
- None.

## Approach

Base the system on the existing premium UI kit (soft violet, high contrast, clean spacing, minimal ornament) and the legal-compliance copy rules. Treat “documentary quality” as internal control: traceable, versioned, source-grounded, and human-reviewed by default unless explicitly waived.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `openspec/specs/document-brand-system/spec.md` | New | Defines the reusable document standard for future PDF assets. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Brand language reads like certification | Med | Ban “certified” wording unless an accredited process exists. |
| Governance feels heavy for simple PDFs | Med | Keep metadata minimal: ID, version, review, sources. |
| Style becomes decorative instead of legal | Low | Prioritize readability and restraint over ornament. |

## Rollback Plan

Revert to the previous PDF layout and metadata-free formatting. Keep the legal content intact and remove watermark/review labels until the spec is reapproved.

## Dependencies

- Approved legal grounding for any cited claims (Ley 527 de 1999, Ley 594 de 2000, Ley 1581 de 2012 where personal data applies).
- Named human legal reviewer for the default review gate.

## Success Criteria

- [ ] Every PDF exposes a consistent ID, version, and review-state convention.
- [ ] No public copy implies accredited certification or literal blockchain.
- [ ] Documents feel premium/exclusive while remaining clear and legally cautious.

## Next recommended phase

- `sdd-spec` to define the new `document-brand-system` spec and any reusable PDF templates.

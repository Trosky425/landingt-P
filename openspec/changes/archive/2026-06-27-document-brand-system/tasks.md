# Tasks: Document Brand System

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 180-260 |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | auto-forecast |
| Chain strategy | pending |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Create the three guide docs and placeholder registry content | PR 1 | Single reviewable docs slice; include manual verification notes |

## Phase 1: Foundation Docs

- [x] 1.1 Create `assets/guides/brand-system-reference.md` with page anatomy, identifier grammar, watermark rules, brand tokens, and safe Spanish labels from `openspec/changes/document-brand-system/design.md`.
- [x] 1.2 Create `assets/guides/document-registry.md` with the registry table contract, category-code notes, uniqueness rule, and starter example rows that do not imply published legal approval.
- [x] 1.3 Create `assets/guides/review-workflow.md` with the draft → source-grounding → human-review → metadata → registry → publish flow and the default human-review gate.

## Phase 2: Content Wiring

- [x] 2.1 Add the metadata-strip template, disclaimer block, CTA guidance, and version-history rule to `assets/guides/brand-system-reference.md` so authors can assemble a compliant PDF without guessing.
- [x] 2.2 Add registry fields for `ID`, `Title`, `Version`, `Date`, `Review State`, `Sources`, and `Status` in `assets/guides/document-registry.md`, plus issuance instructions for new IDs.
- [x] 2.3 Add source-trace rules, waiver handling for `Eximido`, optional integrity-hash safe-default behavior, and banned-term checks to `assets/guides/review-workflow.md`.
- [x] 2.4 Remove `assets/guides/.gitkeep` once the guide files exist, and cross-link the three new docs so maintainers can navigate them quickly.

## Phase 3: Manual Verification

- [x] 3.1 Review `assets/guides/brand-system-reference.md` against spec scenarios for `Document Identity Convention` and `Premium Minimalist Visual Standard`.
- [x] 3.2 Review `assets/guides/document-registry.md` and `assets/guides/review-workflow.md` against `Documentary Quality Metadata`, `Human Review Status`, and `Optional Verifiable Integrity Hash`.
- [x] 3.3 Grep `assets/guides/*.md` for forbidden public terms (`certificado`, `certificación`, `official validation`, `blockchain`) and verify disclaimer/source entries satisfy `Source Grounding and Non-Advice Disclaimer`.

## Phase 4: Cleanup

- [x] 4.1 Tighten wording across `assets/guides/brand-system-reference.md`, `assets/guides/document-registry.md`, and `assets/guides/review-workflow.md` so the tone stays minimal, premium, and non-certifying.

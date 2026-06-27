---
name: landing-legal-pdf
description: "Trigger: landing PDF, lead magnet, legal guide, checklist, downloadable asset. Draft safe client-facing legal PDFs for the landing."
license: Apache-2.0
metadata:
  author: "Trosky425"
  version: "1.0"
---

## Activation Contract

Use this skill when creating or editing downloadable legal guides, checklists, lead magnets, PDFs, or client-facing legal education assets for the landing page.

## Hard Rules

- Load `legal-source-grounding` first for every legal asset.
- Write for a normal client: clear, direct, professional Spanish by default.
- Do not add definitive case advice, guaranteed outcomes, or unsupported legal claims.
- Include a soft CTA to contact Tamara & Piñeros for case-specific review.
- Include a non-personalized-information disclaimer unless the human explicitly removes it.
- Keep legal precision over marketing intensity.

## Decision Gates

| Asset type | Shape |
|---|---|
| Guide | Problem → explanation → steps → common mistakes → when to consult. |
| Checklist | Before you start → checklist → red flags → next step. |
| FAQ | Question → short answer → practical note → review warning. |
| Template aid | Purpose → how to use → limits → lawyer review warning. |

## Execution Steps

1. Confirm target reader, service, jurisdiction, and asset type.
2. Apply `legal-source-grounding`; do not continue if core claims are unsupported.
3. Draft using the selected shape and the PDF outline in `references/pdf-outline.md`.
4. Add CTA and disclaimer.
5. Return content plus internal review notes; do not claim it is legally approved until the human approves.

## Output Contract

Return:
- `title`
- `asset_type`
- `client_facing_content`
- `cta`
- `disclaimer`
- `internal_review_notes`
- `human_review_status`

## References

- `references/pdf-outline.md` — standard landing PDF outline.

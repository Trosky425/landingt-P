---
name: legal-source-grounding
description: "Trigger: legal PDF, juridical guide, legal checklist, legal content. Ground legal drafting in approved sources and require human review."
license: Apache-2.0
metadata:
  author: "Trosky425"
  version: "1.0"
---

## Activation Contract

Use this skill before drafting or revising any legal, juridical, compliance, privacy, or client-facing legal education content for the landing page or downloadable assets.

## Hard Rules

- Require human legal review by default for every legal artifact. Only skip it when the human explicitly approves skipping review for that artifact.
- Do not invent laws, article numbers, doctrines, deadlines, authorities, jurisprudence, procedures, fees, or legal consequences.
- Treat unsupported legal claims as `Needs source` or `Needs lawyer validation`, not as facts.
- Separate confirmed sources, general legal orientation, firm criteria, and case-specific advice.
- Never present downloadable content as personalized legal advice.
- If the user provides a source hierarchy, follow it over general memory or model knowledge.

## Decision Gates

| Situation | Action |
|---|---|
| Source is provided and relevant | Use it and cite/trace it in the drafting notes. |
| Source is missing or unclear | Mark the claim `Needs source`; ask for source or lawyer approval. |
| Claim depends on facts of a concrete case | Mark as `Requires case review`; avoid definitive advice. |
| Human asks to skip review | Record that explicit approval in the output. |

## Execution Steps

1. List the legal claims the artifact needs to make.
2. Map each claim to an approved source, user instruction, or `Needs source` marker.
3. Draft only source-supported or clearly qualified content.
4. Add a review block: reviewer, pending legal points, and whether human review is required.
5. Pass the grounded draft to `landing-legal-pdf` only after unresolved legal claims are marked.

## Output Contract

Return:
- `source_status`: supported | partially_supported | needs_sources
- `human_review`: required | explicitly_waived
- `unsupported_claims`: list or `none`
- `drafting_notes`: source trace and legal-risk notes

## References

- `references/review-policy.md` — human review and source-grounding policy.

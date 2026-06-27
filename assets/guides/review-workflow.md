# Review Workflow

Step-by-step process for authoring, reviewing, and publishing a Tamara & Piñeros PDF. Every published document must pass through this workflow.

> **Related docs**: [Brand System Reference](brand-system-reference.md) · [Document Registry](document-registry.md)

---

## Quick Path

1. **Draft** content using the appropriate asset shape.
2. **Ground sources** — mark every legal claim with a named source or `Needs source`.
3. **Human review** — default gate; state must be `Revisado`, `Pendiente de revisión`, or `Eximido`.
4. **Fill metadata strip** — all required fields before publication.
5. **Update registry** — add or update the entry in the document registry.
6. **Publish** — place PDF in `assets/guides/` and update the lead-magnet CTA link.

---

## Step 1: Draft

Author content using the `landing-legal-pdf` skill's asset-type shapes:

| Asset type | Shape |
|---|---|
| Guide | Problem → explanation → steps → common mistakes → when to consult |
| Checklist | Before you start → checklist → red flags → next step |
| FAQ | Question → short answer → practical note → review warning |
| Template aid | Purpose → how to use → limits → lawyer review warning |

Apply the [page anatomy](brand-system-reference.md#1-page-anatomy) from the brand system reference.

---

## Step 2: Source Grounding

Apply the `legal-source-grounding` skill before continuing:

1. **List every legal claim** the document makes (laws, procedures, rights, obligations, deadlines, fees, consequences).
2. **Map each claim** to an approved source, user instruction, or mark it `Needs source`.
3. **Draft only** source-supported or clearly qualified content.
4. **Record** the source trace in drafting notes for the reviewer.

### Source Trace Format

For each legal claim, record:

```
Claim: [what the document states]
Source: [law name, article, doctrine, or "Needs source"]
Confidence: [supported | partially_supported | needs_sources]
```

### Approved Source Hierarchy

When Colombian law applies, prefer sources in this order:

1. Named Colombian statutes (e.g., Ley 527 de 1999, Ley 594 de 2000, Ley 1581 de 2012).
2. Regulatory decrees and official guidance.
3. Established jurisprudence or doctrine from recognized authorities.
4. Firm internal criteria (must be reviewed by a lawyer).

Do NOT invent laws, article numbers, deadlines, fees, or legal consequences. Treat unsupported claims as `Needs source`.

---

## Step 3: Human Review

Every PDF MUST declare its human review state. The default gate is **review required**.

| State | Spanish label | When to use |
|-------|---------------|-------------|
| Reviewed | `Revisado` | A named human reviewer has approved the content |
| Pending review | `Pendiente de revisión` | Content is complete but awaiting human review |
| Waived | `Eximido` | Human explicitly waived the review gate for this document |

### Waiver Handling for `Eximido`

- `Eximido` is ONLY allowed when a human **explicitly waives** the review gate.
- Record who waived it and when (in drafting notes or the registry's notes).
- A document with no review state declared is **not allowed** — missing review status is a publication blocker.

### Reviewer Responsibilities

- Confirm all legal claims are source-grounded or marked for validation.
- Verify no forbidden terms appear (see Step 5 below).
- Confirm the disclaimer and CTA are present.
- Approve or request changes before the document moves to `Revisado`.

---

## Step 4: Metadata Strip

Fill all required fields on the metadata strip before publication:

| Field | Label | Example |
|-------|-------|---------|
| Unique ID | `Identificador del documento` | `TP-SLD-001 · V1.0 · 2026` |
| Version | `Versión` | `1.0` |
| Human review | `Revisión jurídica humana` | `Revisado` |
| Base sources | `Fuentes base` | `Ley 527 de 1999, Ley 1581 de 2012` |

Optional fields: `Fecha de publicación`, `Tipo de documento`.

See the [brand system reference](brand-system-reference.md#1-page-anatomy) for the full metadata strip layout.

---

## Step 5: Banned-Term Check

Before publication, verify that **none** of these terms appear in public-facing content:

| Banned term | Why it is banned |
|---|---|
| `certificado` / `certified` | Implies accredited certification |
| `certificación` / `certificación acreditada` | No accredited certification process exists |
| `validación oficial` / `official validation` | Implies government endorsement |
| `aprobación gubernamental` / `government approval` | Implies state endorsement |
| `aval oficial` / `official endorsement` | Same as above |
| `blockchain` (literal public claim) | No literal blockchain system in use |

### How to check

```bash
# Grep all guide files for forbidden terms
grep -riE "certificado|certificación|validación oficial|aprobación gubernamental|aval oficial|blockchain" assets/guides/
```

If any match is found, remove or rephrase it before publication. Allowed internal-control terms (`calidad documental`, `trazabilidad`, `revisión jurídica humana`) are safe to use.

---

## Step 6: Integrity Hash — Safe Default

A public integrity hash MAY appear **only when all three conditions are met**:

1. The exact hash value is computed and available.
2. The source file scope (what was hashed) is stated.
3. The verification method is documented and reproducible.

**If any condition is missing**: the hash MUST NOT appear. No placeholder, badge, or integrity claim may be shown.

> This is the standing rule until a verifiable hash workflow is established. Omit the hash entirely rather than show an unverifiable one.

---

## Step 7: Registry Update

After the document passes review and metadata is complete:

1. Add or update the entry in the [document registry](document-registry.md).
2. Set `Status` to `Published`.
3. Confirm the `Review State` matches the declared human review state.

---

## Step 8: Publish

1. Place the final PDF in `assets/guides/`.
2. Update the lead-magnet CTA link on the landing page.
3. Verify the PDF opens correctly and all links work.

---

## Non-Advice Disclaimer

Every client-facing PDF MUST include this disclaimer (Spanish):

> Este documento ofrece información general y orientación jurídica de referencia. No constituye asesoría legal personalizada para un caso concreto. Para decisiones que afecten sus derechos u obligaciones, consulte directamente con Tamara & Piñeros para una revisión profesional de su situación.

Place this on the legal note page, after the metadata strip. Follow it with a CTA to contact the firm.

---

## Publication Checklist

Before marking any document as `Published`:

- [ ] Identifier assigned and unique (checked against registry)
- [ ] All source claims grounded or marked `Needs source`
- [ ] Human review state declared (`Revisado`, `Pendiente de revisión`, or `Eximido`)
- [ ] Metadata strip fully completed
- [ ] No forbidden terms found (grep check passed)
- [ ] Non-advice disclaimer present
- [ ] CTA to contact firm included
- [ ] Registry entry added with correct status
- [ ] PDF placed in `assets/guides/`
- [ ] Landing page CTA link updated (if applicable)
- [ ] Integrity hash omitted unless fully verifiable

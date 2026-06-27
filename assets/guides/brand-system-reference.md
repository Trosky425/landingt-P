# Brand System Reference

Tamara & Piñeros PDFs follow a single premium standard: minimalist, traceable, human-reviewed, and legally cautious. This document is the authoritative reference for every published PDF.

> **Related docs**: [Document Registry](document-registry.md) · [Review Workflow](review-workflow.md)

---

## Quick Path

1. Use the **identifier grammar** to assign a unique ID before drafting.
2. Follow the **page anatomy** for cover, inner pages, metadata strip, and legal note.
3. Apply **brand tokens** for colors, fonts, and spacing.
4. Add the **watermark** on inner pages only (never on cover or metadata).
5. Fill the **metadata strip** with all required fields before publication.
6. Include the **non-advice disclaimer** and CTA on every client-facing PDF.

---

## 1. Page Anatomy

Every PDF follows this structure:

### Cover Page

```
┌─────────────────────────────────────┐
│  [logo-monograma.png]               │
│  TAMARA & PIÑEROS                   │
│                                     │
│  Document Title                     │
│  Subtitle / topic                   │
│                                     │
│  Identificador: TP-XXX-001          │
│  Versión: 1.0 · 2026               │
└─────────────────────────────────────┘
```

- Logo monogram at top, firm name below.
- Title in heading font (Manrope 800).
- Identifier and version at bottom of cover.
- **No watermark on cover** — cover must be clean.

### Inner Pages (repeated)

```
┌─────────────────────────────────────┐
│  Header: TP · Doc Title · V1.0      │
│  ─────────────────────────────────  │
│  [watermark: monogram @ 4–6%]       │
│  Body content area                  │
│  (legal guide / checklist / FAQ)    │
│  ─────────────────────────────────  │
│  Footer: Page N · © Tamara & Piñeros│
└─────────────────────────────────────┘
```

- Running header: prefix + abbreviated title + version.
- Watermark centered, 45° diagonal, ~60% page width, 4–6% opacity.
- Footer: page number and copyright.

### Metadata Strip (last page)

All fields are **required** unless marked optional:

| Field | Label (Spanish) | Required |
|-------|-----------------|----------|
| Unique ID | `Identificador del documento` | Yes |
| Version | `Versión` | Yes |
| Human review state | `Revisión jurídica humana` | Yes |
| Base sources | `Fuentes base` | Yes |
| Publication date | `Fecha de publicación` | Optional |
| Document type | `Tipo de documento` | Optional |

**No watermark** over the metadata strip — it must be fully legible.

### Legal Note / Disclaimer (after metadata strip)

Every client-facing PDF MUST include:

1. **Non-advice disclaimer** (Spanish):

   > Este documento ofrece información general y orientación jurídica de referencia. No constituye asesoría legal personalizada para un caso concreto. Para decisiones que afecten sus derechos u obligaciones, consulte directamente con Tamara & Piñeros para una revisión profesional de su situación.

2. **CTA** to contact the firm for case-specific review.

**No watermark** over the legal note — it must be fully legible.

### Version History (if version > 1.0)

| Ver | Date | Change summary |
|-----|------|----------------|
| 1.0 | 2026-06-27 | Initial release |
| 1.1 | 2026-08-15 | Minor corrections to procedural steps |

Only include when the document has been revised beyond its initial release.

---

## 2. Identifier Grammar

**Format**: `TP-{CATEGORY}-{SEQUENCE} · V{MAJOR}.{MINOR} · {YEAR}`

| Token | Rule | Examples |
|-------|------|----------|
| `TP` | Fixed prefix (Tamara & Piñeros) | `TP` |
| `CATEGORY` | 3-letter uppercase code | `SLD`, `ARR`, `PET`, `EMP`, `GEN` |
| `SEQUENCE` | 3-digit zero-padded, unique within category | `001`, `002` |
| `MAJOR.MINOR` | Major = substantive legal change; Minor = corrections/formatting | `1.0`, `1.1`, `2.0` |
| `YEAR` | Publication year | `2026` |

**Category codes**:

| Code | Domain |
|------|--------|
| `SLD` | Solidaridad / debt negotiation |
| `ARR` | Arriendo / tenancy |
| `PET` | Petición / right of petition |
| `EMP` | Empresa / business law |
| `GEN` | General / cross-domain |

New category codes may be added by convention (3-letter uppercase, not already in the [registry](document-registry.md)).

**Canonical examples**:
- `TP-SLD-001 · V1.0 · 2026` — first solidarity guide, initial release
- `TP-ARR-001 · V1.1 · 2026` — tenant guide, minor correction
- `TP-EMP-002 · V2.0 · 2027` — second business guide, major revision

**Uniqueness rule**: Every published PDF must have exactly one identifier, unique across all active documents. Check the [registry](document-registry.md) before issuing a new ID.

---

## 3. Watermark Rules

| Rule | Value |
|------|-------|
| Element | Firm monogram (`logo-monograma.png`) |
| Placement | Centered, 45° diagonal, ~60% page width |
| Opacity | 4–6% (visible but never dominant) |
| Cover page | **Forbidden** |
| Over body text | Allowed at specified opacity |
| Over metadata strip | **Forbidden** |
| Over legal note | **Forbidden** |
| Color | Brand accent `#5A4FCF` at reduced opacity |

The watermark reinforces identity without reducing legibility. If in doubt, reduce opacity rather than increase it.

---

## 4. Brand Tokens

Derived from the existing UI Kit. Use these exact values for PDF authoring:

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#F8F8FB` | Page background (if colored) |
| `--bg-surface` | `#F1F0FB` | Card/section backgrounds |
| `--text-primary` | `#23262E` | Body text, headings |
| `--text-secondary` | `#53627A` | Captions, metadata labels |
| `--accent` | `#5A4FCF` | Accent lines, watermark, links |
| `--border` | `#D9DCE5` | Dividers, table borders |
| `--dark-premium` | `#2D313C` | Cover background (optional dark variant) |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings | Manrope | 800 | Document title, section headings |
| Body | Inter | 400/500 | Body text, metadata values |
| Labels | Inter | 600 uppercase | Metadata field labels |

### Spacing Principles

- Generous margins: minimum 20mm on all sides.
- Section spacing: 1.5× body line height between sections.
- Paragraph spacing: 0.75× body line height between paragraphs.
- Prioritize readability and restraint over ornament.

---

## 5. Safe Spanish Labels

These labels are compliance-safe and describe actual internal controls:

| Label | Usage |
|-------|-------|
| `Identificador del documento` | Unique ID field |
| `Versión` | Version number |
| `Revisión jurídica humana` | Review state |
| `Fuentes base` | Named source laws/doctrines |
| `Calidad documental` | Internal control descriptor |
| `Trazabilidad` | Traceability |

### Forbidden Public Terms

Do NOT use these terms in any public-facing PDF content unless verifiable evidence from an accredited body exists:

| Banned term | Reason |
|---|---|
| `certificado` / `certified` | Implies accredited certification the firm does not hold |
| `certificación` / `certificación acreditada` | No accredited certification process exists |
| `validación oficial` / `official validation` | Implies government or regulatory endorsement |
| `aprobación gubernamental` / `government approval` | Implies state endorsement |
| `aval oficial` / `official endorsement` | Same as above |
| `blockchain` (literal public claim) | Only allowed as internal design inspiration |

Allowed internal-control terms (`calidad documental`, `trazabilidad`, `revisión jurídica humana`) describe actual firm processes, not external endorsements.

---

## 6. Integrity Hash — Safe Default

A public integrity hash MAY appear **only when all three conditions are met**:

1. The exact hash value is computed and available.
2. The source file scope (what was hashed) is stated.
3. The verification method is documented and reproducible.

**If any condition is missing**: the hash MUST NOT appear. No placeholder, badge, or integrity claim may be shown.

> Showing an unverifiable hash is worse than showing none — it implies a guarantee the firm cannot back.

This is the standing rule for every PDF until a verifiable hash workflow is established.

---

## Checklist for Authors

Before publishing any PDF, confirm:

- [ ] Unique identifier assigned and recorded in the [registry](document-registry.md)
- [ ] Cover page is clean (no watermark)
- [ ] Watermark on inner pages only, at 4–6% opacity
- [ ] Metadata strip has all required fields filled
- [ ] Non-advice disclaimer is present and complete
- [ ] CTA to contact the firm is included
- [ ] No forbidden terms (`certificado`, `certificación`, `blockchain`, etc.)
- [ ] Human review state is declared (not blank)
- [ ] Base sources are listed or marked `Needs source`
- [ ] Brand tokens (colors, fonts, spacing) match this reference
- [ ] Version history included if version > 1.0

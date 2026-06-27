# Design: Document Brand System

## Technical Approach

Define a reusable PDF brand standard as a set of reference documents in `assets/guides/`. Since the project is a static site with no build tooling or PDF generation library, PDFs are authored externally and placed as static assets. This design specifies the **page anatomy, identifier grammar, watermark rules, brand tokens, and review workflow** that every future PDF must follow — not how to generate them programmatically.

The brand system maps directly to the spec's 7 requirements: identity convention, visual standard, metadata, human review, source grounding, compliance-safe terminology, and optional integrity hash.

## Architecture Decisions

| Decision | Options | Tradeoff | Choice |
|----------|---------|----------|--------|
| PDF delivery | Static asset in `assets/guides/` vs. server-generated | Static = no runtime cost, matches existing Netlify deploy; server-gen adds complexity with no benefit | **Static asset** |
| Brand reference format | Single markdown file vs. split into anatomy + tokens + workflow | Single file is simpler to maintain for a small firm; split adds overhead | **Single reference doc** (`brand-system-reference.md`) |
| Identifier storage | Hardcoded per-PDF vs. registry file | Registry enables uniqueness checks; hardcoded is fragile | **Registry file** (`document-registry.md`) tracking all issued IDs |
| Watermark rendering | Baked into PDF at authoring time vs. CSS overlay | Baked = universal, works in any viewer; CSS overlay only works in HTML | **Baked into PDF** at authoring time |
| HTML template for PDFs | Create HTML-to-PDF template vs. spec-only (no template) | HTML template enables consistent output but adds maintenance; spec-only relies on manual adherence | **Spec-only** for now; HTML template deferred to a future change |

## PDF Page Anatomy

```
┌─────────────────────────────────────┐
│  COVER PAGE                         │
│  ┌─────────────────────────────┐    │
│  │  [logo-monograma.png]       │    │
│  │  TAMARA & PIÑEROS           │    │
│  │                             │    │
│  │  Document Title             │    │
│  │  Subtitle / topic           │    │
│  │                             │    │
│  │  Identificador: TP-XXX-001  │    │
│  │  Versión: 1.0 · 2026       │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  INNER PAGE (repeated)              │
│  Header: TP · Doc Title · V1.0     │
│  ─────────────────────────────      │
│  [watermark: monogram @ 5%]         │
│  Body content area                  │
│  (legal guide / checklist / FAQ)    │
│  ─────────────────────────────      │
│  Footer: Page N · © Tamara & Piñeros│
├─────────────────────────────────────┤
│  METADATA STRIP (last page)         │
│  Identificador del documento: ...   │
│  Versión: ...                       │
│  Revisión jurídica humana: ...      │
│  Fuentes base: ...                  │
│  Fecha de publicación: ...          │
│  Tipo de documento: ...             │
├─────────────────────────────────────┤
│  LEGAL NOTE / DISCLAIMER            │
│  Non-advice disclaimer (Spanish)    │
│  CTA: contact firm for case review  │
├─────────────────────────────────────┤
│  VERSION HISTORY (if V > 1.0)       │
│  | Ver | Date | Change summary |    │
└─────────────────────────────────────┘
```

## Identifier Grammar

**Format**: `TP-{CATEGORY}-{SEQUENCE} · V{MAJOR}.{MINOR} · {YEAR}`

| Token | Rule | Examples |
|-------|------|----------|
| `TP` | Fixed prefix (Tamara & Piñeros) | `TP` |
| `CATEGORY` | 3-letter uppercase code | `SLD` (solidaridad), `ARR` (arriendo), `PET` (petición), `EMP` (empresa), `GEN` (general) |
| `SEQUENCE` | 3-digit zero-padded, unique within category | `001`, `002` |
| `MAJOR.MINOR` | Semantic: major = substantive legal change, minor = corrections/formatting | `1.0`, `1.1`, `2.0` |
| `YEAR` | Publication year | `2026` |

**Canonical examples**:
- `TP-SLD-001 · V1.0 · 2026` — first solidarity-law guide, initial release
- `TP-ARR-001 · V1.1 · 2026` — tenant guide, minor correction
- `TP-EMP-002 · V2.0 · 2027` — second business guide, major revision

## Watermark Rules

| Rule | Value |
|------|-------|
| Element | Firm monogram (`logo-monograma.png`) |
| Placement | Centered, 45° diagonal, spanning ~60% of page width |
| Opacity | 4–6% (visible but never dominant) |
| Cover page | **Forbidden** — cover must be clean |
| Over body text | Allowed at specified opacity |
| Over metadata strip / legal note | **Forbidden** — these must be fully legible |
| Color | Brand accent `#5A4FCF` at reduced opacity |

## Brand Tokens (from existing UI Kit)

| Token | Value | PDF Usage |
|-------|-------|-----------|
| `--bg-primary` | `#F8F8FB` | Page background (if colored) |
| `--bg-surface` | `#F1F0FB` | Card/section backgrounds |
| `--text-primary` | `#23262E` | Body text, headings |
| `--text-secondary` | `#53627A` | Captions, metadata labels |
| `--accent` | `#5A4FCF` | Accent lines, watermark, links |
| `--border` | `#D9DCE5` | Dividers, table borders |
| `--dark-premium` | `#2D313C` | Cover background (optional dark variant) |
| Heading font | Manrope 800 | Document title, section headings |
| Body font | Inter 400/500 | Body text, metadata values |
| Label font | Inter 600 uppercase | Metadata field labels |

## Review & Source Workflow

1. **Draft**: Author creates PDF content using the `landing-legal-pdf` skill's asset-type shapes (Guide, Checklist, FAQ, Template Aid).
2. **Source grounding**: Apply `legal-source-grounding` skill — mark every legal claim with source or `Needs source`.
3. **Human review**: Default = `Revisado` or `Pendiente de revisión`. Only `Eximido` when human explicitly waives.
4. **Metadata strip**: Fill all required fields before publication.
5. **Registry update**: Add entry to `document-registry.md` with ID, title, version, date, review state.
6. **Deploy**: Place PDF in `assets/guides/` and update lead-magnet CTA link.

**Safe Spanish labels** (compliance-safe, no certification claims):

| Label | Usage |
|-------|-------|
| `Identificador del documento` | Unique ID field |
| `Versión` | Version number |
| `Revisión jurídica humana` | Review state: `Revisado` / `Pendiente de revisión` / `Eximido` |
| `Fuentes base` | Named source laws/doctrines |
| `Calidad documental` | Internal control descriptor (allowed) |
| `Trazabilidad` | Traceability (allowed) |

**Forbidden public terms** (unless verifiable evidence from an accredited body exists):

| Banned term / phrase | Reason |
|---|---|
| `certificado` / `certified` | Implies accredited certification the firm does not hold |
| `certificación` / `certificación acreditada` | Same — no accredited certification process exists |
| `validación oficial` / `official validation` | Implies government or regulatory endorsement |
| `aprobación gubernamental` / `government approval` | Implies state endorsement of the document or firm |
| `aval oficial` / `official endorsement` | Same as above |
| `blockchain` (literal claim) | Implies literal blockchain technology is in use; only allowed as internal design inspiration, never as a public claim |

Generic uses of `certification` or `certificado` that could reasonably be read as implying third-party accreditation are also forbidden. Allowed internal-control terms (`calidad documental`, `trazabilidad`, `revisión jurídica humana`) describe actual firm processes, not external endorsements.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `assets/guides/brand-system-reference.md` | Create | Full brand system reference: anatomy, tokens, rules, examples |
| `assets/guides/document-registry.md` | Create | Registry of all issued document IDs with status tracking |
| `assets/guides/review-workflow.md` | Create | Step-by-step review/source/grounding workflow for PDF authors |

## Interfaces / Contracts

### Document Registry Entry Format

```markdown
| ID | Title | Version | Date | Review State | Sources | Status |
|----|-------|---------|------|--------------|---------|--------|
| TP-SLD-001 | Guía de solidaridad... | V1.0 | 2026-06-27 | Revisado | Ley 527/1999 | Published |
```

### Metadata Strip Contract (required fields)

```
Identificador del documento: TP-{CAT}-{SEQ} · V{M}.{m} · {YYYY}
Versión: {M}.{m}
Revisión jurídica humana: {Revisado | Pendiente de revisión | Eximido}
Fuentes base: {comma-separated law/doctrine names}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | PDF anatomy matches spec | Open each PDF, verify cover/inner/metadata/disclaimer pages present |
| Manual | Identifier uniqueness | Cross-check `document-registry.md` for duplicate IDs |
| Manual | Watermark visibility | Visual inspection: visible but not dominant; absent on cover and metadata |
| Manual | Compliance-safe terms | Grep PDF text for forbidden terms (`certificado`, `blockchain`) |
| Manual | Brand token adherence | Compare PDF colors/fonts against brand token table |
| Manual | Disclaimer presence | Verify non-advice disclaimer and CTA on every client-facing PDF |
| Manual | Review state declared | Confirm `Revisión jurídica humana` field is non-empty on every PDF |

No automated test runner exists. All verification is manual checklist against the spec scenarios.

## Migration / Rollout

No migration required. This is a greenfield document standard. Existing landing page is unaffected. Future PDFs adopt the standard at creation time.

## Integrity Hash — Safe Default (Spec §7)

The design resolves the optional integrity hash requirement with a **safe default**:

| Condition | Behavior |
|---|---|
| Exact hash value, source file scope, AND verification method are all available | Hash MAY appear in the metadata strip with all three elements shown |
| Any of the three elements is missing or unverifiable | Hash MUST NOT appear; no placeholder, badge, or integrity claim may be shown |

**Rationale**: Showing an unverifiable hash is worse than showing none — it implies a guarantee the firm cannot back. The safe default is omission. This is not deferred; it is the standing rule for every PDF until a verifiable hash workflow is established.

## Resolved Decisions

- Category codes are extensible by convention: add a new 3-letter uppercase code to the registry reference before issuing IDs under it. A spec amendment is only required when the identifier grammar itself changes.

# Document Registry

Central record of every Tamara & Piñeros PDF identifier issued. This registry enforces uniqueness and tracks publication status.

> **Related docs**: [Brand System Reference](brand-system-reference.md) · [Review Workflow](review-workflow.md)

---

## Quick Path

1. Before issuing a new ID, search this registry for duplicates.
2. Assign the next available sequence number within the category.
3. Add a row to the **Active Registry** table below.
4. Update the row's `Status` as the document progresses through the [review workflow](review-workflow.md).

---

## Identifier Format

`TP-{CATEGORY}-{SEQUENCE} · V{MAJOR}.{MINOR} · {YEAR}`

See the [Brand System Reference](brand-system-reference.md#2-identifier-grammar) for the full grammar and category codes.

---

## Registry Fields

| Field | Description | Required |
|-------|-------------|----------|
| `ID` | Full identifier: `TP-CAT-SEQ · Vx.y · YYYY` | Yes |
| `Title` | Document title (abbreviated if long) | Yes |
| `Version` | Current version (`Vx.y`) | Yes |
| `Date` | Publication or last-update date (`YYYY-MM-DD`) | Yes |
| `Review State` | `Revisado` / `Pendiente de revisión` / `Eximido` | Yes |
| `Sources` | Comma-separated base source laws/doctrines | Yes |
| `Status` | `Draft` / `In Review` / `Published` / `Superseded` / `Withdrawn` | Yes |

---

## Uniqueness Rule

- Each `ID` value MUST be unique across all active and archived entries.
- Sequence numbers are unique **within their category** (e.g., `TP-SLD-001` and `TP-ARR-001` are both valid).
- Never reuse an ID from a `Withdrawn` or `Superseded` document for a different document.
- A new major version of the same document keeps the same base ID with an updated version token (e.g., `TP-SLD-001 · V1.0` → `TP-SLD-001 · V2.0`).

---

## Issuing a New ID

1. **Check category**: Use an existing code from the [Brand System Reference](brand-system-reference.md#2-identifier-grammar) or create a new 3-letter uppercase code.
2. **Find next sequence**: Scan the registry for the highest sequence in that category; increment by 1.
3. **Set initial version**: `V1.0` for new documents.
4. **Set year**: Current publication year.
5. **Add row**: Fill all required fields; set `Status` to `Draft`.
6. **Proceed**: Follow the [review workflow](review-workflow.md) to move through review and publication.

---

## Active Registry

| ID | Title | Version | Date | Review State | Sources | Status |
|----|-------|---------|------|--------------|---------|--------|
| `TP-GEN-001 · V1.0 · 2026` | Example orientation checklist | `V1.0` | `2026-01-01` | `Pendiente de revisión` | `Example only — replace before use` | `Draft` |
| `TP-SLD-001 · V0.1 · 2026` | No puedo pagar mis deudas | `V0.1` | `2026-06-27` | `Pendiente de revisión` | `Ley 1564 de 2012 arts. 531-573; Ley 1116 de 2006 (pending validation for merchants)` | `Draft` |

> Starter rows are examples only. Replace them with real document metadata before publication; do not treat them as legally reviewed or published assets. The `TP-SLD-001` row is a real draft (V0.1) pending human legal review.

---

## Superseded / Withdrawn

| ID | Title | Version | Date | Review State | Sources | Status | Superseded by |
|----|-------|---------|------|--------------|---------|--------|---------------|
| — | — | — | — | — | — | — | — |

> Move entries here when a document is replaced by a new major version or withdrawn from publication.

---

## Category Codes Reference

| Code | Domain | Notes |
|------|--------|-------|
| `SLD` | Solidaridad / debt negotiation | — |
| `ARR` | Arriendo / tenancy | — |
| `PET` | Petición / right of petition | — |
| `EMP` | Empresa / business law | — |
| `GEN` | General / cross-domain | — |

New codes may be added by convention. Record the new code and domain in this table before issuing IDs under it.

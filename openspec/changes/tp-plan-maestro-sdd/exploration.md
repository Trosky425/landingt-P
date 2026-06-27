# Exploration: TP Plan Maestro SDD

> Source material: `TP_PLAN_MAESTRO_SDD/` — 8 documents listed below. Change name: `tp-plan-maestro-sdd`.

## Verifiable Source Enumeration

The source folder `TP_PLAN_MAESTRO_SDD/` contains exactly 8 files (verified via `Read` directory listing, 2026-06-26):

| # | File | Purpose |
|---|------|---------|
| 1 | `00_README.md` | Index and navigation for the plan documents |
| 2 | `01_PROMPTS_MEJORADOS.md` | Improved AI prompts for SDD execution |
| 3 | `02_PLAN_MAESTRO_TP.md` | Core business strategy (495 lines) |
| 4 | `03_ORDEN_EQUIPO_SDD_8_LINEAS.md` | 8-line SDD execution chain |
| 5 | `04_CHECKLIST_EJECUCION.md` | Execution checklist |
| 6 | `05_ESTRUCTURA_DRIVE.md` | Google Drive folder structure (82 lines) |
| 7 | `06_FLUJOS_OPERATIVOS.md` | Operational flows |
| 8 | `07_MATRICES.md` | Decision matrices |

## Current State

The project is a **static landing page** deployed on Netlify at `glat-tp.com` for the Colombian law firm Tamara & Piñeros. File inventory verified against live repo at `C:/Users/joséalfonso/Desktop/landingtyp/`:

| File | Lines | Role |
|------|-------|------|
| `index.html` | 889 | Single-page site: Hero, Trust Bar, 4 service cards, Team (3 members), How-We-Work, FAQ, Contact Form (Netlify Forms) |
| `styles.css` | 2174 | Visual styling (no build tooling, no framework) |
| `script.js` | 378 | Scroll behavior, FAQ accordion, WhatsApp float button logic, mobile menu toggle |

No `package.json`, no build tooling, no framework.

### WhatsApp CTAs — Already Service-Specific

The live `index.html` **already has service-specific WhatsApp CTAs** with distinct pre-filled messages per context (verified via grep, lines 334-387):

- `data-whatsapp="servicio-empresa"` → "Quiero información sobre constitución de empresas en Villavicencio."
- `data-whatsapp="servicio-constitucional"` → "Necesito orientación sobre acciones constitucionales o tutelas."
- `data-whatsapp="servicio-conciliacion"` → "Quiero resolver un conflicto por conciliación."
- `data-whatsapp="servicio-asesoria"` → "Quiero solicitar una asesoría jurídica."
- Team cards (lines 628-650): `equipo-sara`, `equipo-camilo`, `equipo-raul` with lawyer-specific messages.

**Therefore**, "add service-specific WhatsApp CTAs" is NOT new Phase-1 scope — it's already built. The Plan Maestro's WhatsApp innovation is the **intake flow** (mini-form before redirect, quick replies, labeling), not link differentiation.

### Google Drive Structure — 8 Top-Level Folders

`05_ESTRUCTURA_DRIVE.md` (lines 6-61) describes **8** top-level folders under `TP_OPERACION/`:

| # | Folder | Contents |
|---|--------|----------|
| 0 | `00_ADMINISTRACION/` | contratos_internos, honorarios, pagos, reportes |
| 1 | `01_MARCA_Y_MARKETING/` | logos, piezas_visuales, videos, copys, calendario_contenido |
| 2 | `02_COMERCIAL/` | leads, scripts_whatsapp, catalogo_servicios, propuestas |
| 3 | `03_CLIENTES/` | Per-client case folders with 7 subfolders each |
| 4 | `04_PLANTILLAS/` | 6 legal template categories |
| 5 | `05_POOL_ABOGADOS/` | perfiles, contratos_prestacion, areas, asignaciones |
| 6 | `06_COMPLIANCE/` | politica_datos, aviso_privacidad, autorizaciones, terminos_web, disclaimers |
| 7 | `07_METRICAS/` | 4 dashboards (whatsapp, redes, ventas, operacion) |

The Plan Maestro is a comprehensive **business strategy document** — not a software spec. It defines how the firm should operate as a "digital productized law firm" with 7 productized services in 3 tiers, WhatsApp-led client flow, Google Drive document management, trackers, a lawyer pool, and a 30/60/90 day implementation roadmap.

**Gap summary**: The landing page is the lead-capture layer. The Plan Maestro envisions an entire business operating system behind it (Drive, WhatsApp workflows, case tracking boards, legal templates, lawyer contracts, compliance docs, content calendar). Most of the plan is **operational setup**, not code changes.

## Affected Areas

### Code (landing page — in-scope for SDD)
- `index.html` — Service catalog cards currently show 4 services; plan proposes 7 productized services in 3 tiers (express, medio, premium). Card structure, copy, and CTAs would change.
- `index.html` — Lead magnets (free guides) and intake flow currently absent; plan requires them.
- `index.html` — WhatsApp links are already service-specific; the new scope is an **intake/mini-form** that captures name, city, and service type BEFORE redirecting to WhatsApp.
- `styles.css` — Visual changes if tier-based pricing/packages UI is added.
- `script.js` (378 lines) — Intake form validation or service-selector logic could need JS additions.
- `aviso-privacidad.html` / `privacy.html` — Plan requires explicit data treatment policy, consent capture, and disclaimers.

### Operational (not code — out of scope for this SDD change)
- Google Drive structure (`TP_OPERACION/`) — 8 top-level folders, 30+ subfolders, naming convention.
- WhatsApp Business — auto-reply script, 9 labels, quick replies per service.
- Case tracking board — Notion/Trello/ClickUp with 11 columns from "Nuevo lead" to "Cerrado".
- Legal templates — 6 template categories in Drive.
- Lawyer pool contracts, compliance docs, content calendar, metrics dashboards.

### Business Decisions ([VALIDAR] — blockers)
Source: `02_PLAN_MAESTRO_TP.md` lines 59-67 (verbatim table). These 7 items MUST be confirmed before execution:

| # | Dato | Por qué importa |
|---|------|-----------------|
| 1 | Fundadores reales y roles | Para organigrama societario y operativo. |
| 2 | Forma jurídica actual o futura | Persona natural, sociedad de hecho, SAS, etc. |
| 3 | Servicios que sí quieren vender primero | Para no dispersar la operación. |
| 4 | Capacidad del pool de abogados | Define tiempos de respuesta y volumen. |
| 5 | Política de honorarios | Define catálogo, paquetes y pagos. |
| 6 | Drive definitivo | Para montar estructura documental real. |
| 7 | Responsable de datos personales | Necesario para política de tratamiento y formularios. |

## Approaches

### 1. Single monolithic SDD change — "Execute the entire Plan Maestro"
- **Description**: One proposal covering all 7 services, all operational setup, and all landing page updates.
- **Pros**: Everything in one place; conceptually simple.
- **Cons**: **Unreviewable hybrid** of code, config, documents, and business decisions. Violates the 400-line review budget. Mixes code changes with platform setup that can't be verified via SDD. The 7 [VALIDAR] items block everything at once.
- **Effort**: High

### 2. Phase-by-phase SDD decomposition — aligned to 30/60/90 day roadmap
- **Description**: Create 3+ sequential SDD changes, each scoped to one phase of the plan. Phase-1 (30 days) focuses on the "minimum sellable system": updated landing catalog with 7 productized services in 3 tiers, intake/mini-form, lead magnets, process-flow section, and compliance pages. Phase-2 and Phase-3 follow after Phase-1 verification.
- **Pros**: Reviewable chunks. Each phase is independently verifiable. Validates plan incrementally — Phase-1 results inform Phase-2 scope. Aligns with plan's own structure. Each change stays under 400-line budget. WhatsApp CTAs are already service-specific, so Phase-1 scope is narrower than initially estimated.
- **Cons**: Requires the user to resolve [VALIDAR] items before Phase-1 design can finalize service catalog and pricing. Longer total calendar time.
- **Effort**: Medium (per phase)

### 3. Capability-based decomposition — independent parallel changes
- **Description**: Split by business capability: `landing-catalog-upgrade`, `whatsapp-intake-flow`, `drive-document-structure`, `compliance-docs`, `content-calendar`. Each change is independent and can run in parallel.
- **Pros**: Parallelizable. Each is tightly scoped to one domain.
- **Cons**: Operational changes (Drive, WhatsApp labels, compliance docs) are NOT code changes — they produce documents and platform config, not verifiable software. This stretches SDD beyond its natural fit. The landing page changes depend on service-catalog decisions, which depend on [VALIDAR] items.
- **Effort**: Low (per capability)

## Recommendation

**Approach 2 — Phase-by-phase decomposition**, with a critical refinement:

The first SDD change (`tp-plan-maestro-sdd-phase1`) should be scoped to **what the landing page needs to do differently** to support the Plan Maestro's "minimum sellable system" (30-day goal). This keeps the change in the SDD sweet spot: code/UI changes to the static site, verifiable by manual checklist against the plan's acceptance criteria.

Phase 2 and beyond should be **separate SDD changes** proposed only after Phase 1 verification and after the user resolves the [VALIDAR] items. The operational artifacts (Drive structure, WhatsApp labels, compliance docs) should be tracked as **task-level deliverables** within the SDD change or as separate operational workstreams outside SDD scope.

### What Phase 1 could include (code-facing):
1. Update service cards from the current 4 to the 7-product catalog with 3 tiers (express / medio / premium)
2. Add tier-based pricing/packages section (if pricing policy — [VALIDAR] item 5 — is confirmed)
3. Add lead-magnet download CTAs (3 guides: arriendo, derecho de petición, creación de empresa)
4. Add intake/mini-form before WhatsApp redirect (capture name, city, service type before sending to WhatsApp) — note: WhatsApp link differentiation already exists; the intake form is the new layer
5. Update legal-compliance pages (data treatment policy, consent checkbox — depends on [VALIDAR] items 2 and 7)
6. Add process-flow visual section ("Así funciona" matching the 15-step flow)

**Removed from old scope**: "Service-specific WhatsApp CTA links" — they already exist in `index.html` (lines 334-387) with distinct pre-filled messages per service card.

## Risks

- **Scope creep risk (HIGH)**: The Plan Maestro is a business strategy document, not a software spec. Without discipline, the SDD change balloons into a "build the entire company" effort. Mitigation: strict scope to landing-page code changes only in Phase 1.
- **Blocker risk (MEDIUM)**: 7 [VALIDAR] items (legal form, founders, services, lawyer pool capacity, fee policy, Drive account, data protection responsible) are unresolved per `02_PLAN_MAESTRO_TP.md` lines 59-67. Without these, service catalog, pricing, and intake flow can't be finalized. Mitigation: Phase 1 proposal MUST list these as pre-requisite confirmations.
- **Verification gap (HIGH)**: Operational artifacts (Drive folders, WhatsApp labels, Notion board) can't be verified by automated tests or code review. Mitigation: verify only code changes; track operational setup as manual checklist items.
- **Static-site constraint (LOW)**: No backend, no database, no server-side form handling. Netlify Forms is the only data capture mechanism. The intake flow must work within this constraint (form → Netlify → email/notification, NOT form → database).

## Ready for Proposal

**Yes — with conditions.** The exploration material is sufficient to write a Phase-1 proposal, but the orchestrator MUST communicate to the user that:

1. The Plan Maestro must be decomposed into phases; one SDD change cannot cover it all.
2. The 7 [VALIDAR] items in `02_PLAN_MAESTRO_TP.md` (lines 59-67) must be confirmed before Phase-1 design can finalize service catalog, pricing, and intake flow.
3. Operational artifacts (Drive, WhatsApp labels, compliance docs, lawyer contracts) will be tracked as manual checklist items within the change, not as code tasks — unless the user wants separate SDD changes for each.
4. The first proposal (`tp-plan-maestro-sdd-phase1`) should scope to landing-page code changes that support the 30-day "minimum sellable system" goal.
5. WhatsApp CTAs are already service-specific in the current `index.html`; the Phase-1 WhatsApp scope is the **intake form layer** that sits before the WhatsApp redirect.

---

## Verification Appendix

Every quantitative claim and enumerated list in this artifact traces to a specific file, line range, or tool invocation. This section exists so a gate auditor can reproduce every verification step without re-investigating the codebase.

| # | Claim | Source of Truth | Verification Method |
|---|-------|-----------------|---------------------|
| 1 | Source folder has 8 files | `TP_PLAN_MAESTRO_SDD/` directory | `Read` tool returned 8 entries (2026-06-26) |
| 2 | File list: `00_README.md` through `07_MATRICES.md` | Same directory listing | All 8 filenames enumerated in §Verifiable Source Enumeration |
| 3 | `script.js` is 378 lines | `C:/Users/joséalfonso/Desktop/landingtyp/script.js` | `(Get-Content script.js).Count` → 378 |
| 4 | `index.html` is 889 lines | `C:/Users/joséalfonso/Desktop/landingtyp/index.html` | `(Get-Content index.html).Count` → 889 |
| 5 | `styles.css` is 2174 lines | `C:/Users/joséalfonso/Desktop/landingtyp/styles.css` | `(Get-Content styles.css).Count` → 2174 |
| 6 | WhatsApp CTAs are already service-specific | `index.html` lines 334, 350, 367, 387 | `grep` for `wa.me` — each service card has distinct pre-filled `?text=` message |
| 7 | Drive structure has 8 top-level folders | `05_ESTRUCTURA_DRIVE.md` lines 6-61 | Tree diagram shows `00_ADMINISTRACION/` through `07_METRICAS/` |
| 8 | [VALIDAR] items are 7 exact entries | `02_PLAN_MAESTRO_TP.md` lines 59-67 | Table has 7 rows: Fundadores, Forma jurídica, Servicios, Capacidad, Política honorarios, Drive, Responsable datos |
| 9 | 4 service cards currently on landing page | `index.html` lines 334, 350, 367, 387 | 4 `data-whatsapp` values starting with `servicio-` |
| 10 | No `package.json`, no build tooling | `C:/Users/joséalfonso/Desktop/landingtyp/` | `glob` for `package.json` returns no match |

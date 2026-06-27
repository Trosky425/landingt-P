# Document Brand System Specification

## Purpose

Define the reusable Tamara & Piñeros PDF standard: premium, minimalist, traceable, human-reviewed by default, and legally cautious.

## Requirements

### Requirement: Document Identity Convention

Every published PDF MUST show one unique identifier using `Prefix-Category-Sequence · Vx.y · YYYY`. The first canonical pattern SHALL be `TP-SLD-001 · V1.0 · 2026`. The public label SHOULD be `Identificador del documento`.

#### Scenario: Canonical identifier appears on a published PDF

- GIVEN a published PDF
- WHEN its cover or metadata strip is inspected
- THEN one identifier matching the approved format is visible
- AND that identifier is unique among active PDFs

#### Scenario: Invalid identifier cannot represent a final document

- GIVEN a draft with a missing, duplicated, or malformed identifier
- WHEN it is prepared for publication
- THEN it SHALL NOT be presented as a final PDF

### Requirement: Premium Minimalist Visual Standard

Every PDF MUST use the firm brand with restrained color, high-contrast text, generous spacing, and a subtle watermark. The watermark MUST reinforce identity without reducing legibility or dominating the legal content.

#### Scenario: Branding stays premium and readable

- GIVEN a branded PDF
- WHEN a reader views the cover and an inner page
- THEN palette, typography, and spacing feel consistent and clear
- AND the watermark remains visually secondary

### Requirement: Documentary Quality Metadata

Every PDF MUST expose `Identificador del documento`, `Versión`, `Revisión jurídica humana`, and `Fuentes base`. It MAY also show publication date or document type. Documentary quality SHALL mean traceable, versioned, source-grounded, and review-aware.

#### Scenario: Required metadata is complete

- GIVEN a PDF containing legal or procedural information
- WHEN its metadata area is reviewed
- THEN all required fields are present and non-empty

### Requirement: Human Review Status

Every PDF MUST declare its human review state. The default SHALL be reviewed or pending review; publication without review MAY be shown only when a human explicitly waives that gate.

#### Scenario: Review state is explicit

- GIVEN a client-facing PDF
- WHEN the review label is inspected
- THEN it shows reviewed, pending review, or explicitly waived
- AND missing review status is not allowed

### Requirement: Source Grounding and Non-Advice Disclaimer

Legal claims, steps, or recommendations MUST be traceable to named base sources or marked for validation before publication. Every client-facing PDF MUST include a disclaimer that it provides general information and not personalized legal advice.

#### Scenario: Legal guidance is grounded and qualified

- GIVEN a PDF that mentions legal duties, procedures, or rights
- WHEN sources and disclaimers are inspected
- THEN the document lists its base sources or marks unresolved points for validation
- AND it includes a non-personalized-information disclaimer

### Requirement: Compliance-Safe Terminology

Public wording MUST NOT claim accredited certification, official validation, or literal blockchain use unless verifiable evidence exists. Terms such as `calidad documental`, `trazabilidad`, and `revisión jurídica humana` MAY be used when they describe actual internal controls.

#### Scenario: Unsupported prestige claims are excluded

- GIVEN metadata or marketing copy inside a PDF
- WHEN the wording is reviewed
- THEN unsupported `certificado`, `certificación`, or `blockchain` claims are absent
- AND compliant control terms remain allowed

### Requirement: Optional Verifiable Integrity Hash

A public integrity hash MAY appear only when the exact hash value, source file scope, and verification method are available. If verifiability is missing, the hash MUST NOT be shown and no placeholder integrity claim may appear.

#### Scenario: Integrity hash appears only when verifiable

- GIVEN a PDF displays an integrity hash
- WHEN a reviewer checks the evidence
- THEN the hash value and verification method are both available
- AND unverifiable hash badges or placeholders are absent

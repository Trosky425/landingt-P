# process-flow Specification

## Purpose

A 15-step "Así funciona" visual section explaining the firm's client journey from first contact to case resolution. Static HTML/CSS; no JavaScript-driven animation required beyond existing scroll-reveal conventions.

## Requirements

### Requirement: Process Flow Display

The landing page MUST display a 15-step process-flow section titled "Así funciona" (or equivalent Spanish label). The flow MUST be sequential, visually connected, and scannable. It MUST represent the full client lifecycle: contact, intake, analysis, execution, and closure.

#### Scenario: Visitor scans the process flow

- GIVEN a visitor navigates to the "Así funciona" section
- WHEN they view the section
- THEN exactly 15 sequential steps are visible
- AND each step has a short label describing that stage

#### Scenario: Responsive and accessible

- GIVEN any viewport from 320px to 1920px
- WHEN the process-flow section renders
- THEN steps reflow into a readable layout without horizontal overflow
- AND the section respects the `prefers-reduced-motion: reduce` media query

### Requirement: No Operational Implementation Leak

The process-flow section MUST describe WHAT happens, not HOW the firm operates internally. It MUST NOT reference Google Drive folders, WhatsApp labels, Notion boards, or lawyer-pool contracts.

#### Scenario: Flow stays user-facing

- GIVEN the rendered "Así funciona" section
- WHEN a visitor reads the steps
- THEN none of the step labels mention "Drive", "Notion", "ClickUp", "plantilla", or "pool de abogados"

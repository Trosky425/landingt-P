# Proposal: Trust & Credibility Section (Equipo + Social + JSON-LD Repair)

## Intent

Live page credibility gap: no team faces, JSON-LD leaking `"[Pendiente: nombre del fundador]"` into Google, no social presence despite active FB/IG. Ships one trust slice — no fabricated credentials, years, testimonials, or founder status.

## Scope

### In Scope
- **Equipo section** — new `<section id="equipo">` (`.section-alt`) between `#diferenciales`/`#casos`. 3 cards (Dra. Sara Muñoz / Dr. Camilo Sáenz / Dr. Raúl González): photo, name, specialty, WhatsApp CTA (firm # 573224768106, attorney-scoped msg), reveal.
- **CSS** — `.team-grid` (1→2@640→3@900) + `.card--team` (`.card-photo`, `.card-specialty`); NOT a `.cards-grid` mutation.
- **Photos** — → `sara-munoz`, `camilo-saenz` (FIX Sanenz→Sáenz), `raul-gonzalez`; AVIF+WebP+PNG, 4:5, `loading="lazy"`, <300KB total (from ~5.6MB).
- **JSON-LD** — DROP `founder` placeholder; 3 real `employee` `Person` (name, jobTitle, knowsAbout, image); ADD `sameAs` (FB+IG, `igsh` stripped).
- **Social** — footer `.footer-social` + sidebar row (FB/IG/WhatsApp), inline SVG, `aria-label`s; NOT header.
- **Nav** — "Equipo" in header + sidebar nav.
- **script.js** — 3 contexts (`equipo-sara`/`-camilo`/`-raul`) in `CONFIG.messages`.

### Out of Scope
Tarjeta Profesional, years/founding year, office address + map, testimonials, founder designation, per-attorney personal numbers, analytics/cookies, booking, blog — deferred.

## Capabilities

### New
- `team-section`: Equipo structure, team-grid + card--team, optimized photos, attorney-scoped WhatsApp CTAs, reveal reduced-motion
- `social-links`: Footer + sidebar social icons (FB/IG/WhatsApp), brand SVGs + aria-labels; sameAs pairing

### Modified
- `seo-discoverability`: JSON-LD drops founder placeholder, replaces placeholder `employee` with 3 real Persons, adds real `sameAs`

## Approach

Static HTML/CSS/JS, no build/deps. `<picture>` for photos, inline SVG for social. Reuse `.card`/`.section-head`/reveal. Photo opt = one-time manual export.

## Affected Areas

| Area | Impact | Change |
|------|--------|--------|
| `index.html` | Modified | #equipo, nav item, footer/sidebar social, JSON-LD rewrite |
| `styles.css` | Modified | `.team-grid`, `.card--team`, `.card-photo`, `.card-specialty`, `.footer-social` |
| `script.js` | Modified | 3 WhatsApp contexts |
| `sara-munoz.*` `camilo-saenz.*` `raul-gonzalez.*` | New | AVIF/WebP/PNG assets |

## Risks

| Risk | L | Mitigation |
|------|---|------------|
| Photos ship raw (~1.8MB) → CWV collapse | H | AVIF/WebP mandatory; verify <300KB |
| "Sanenz"→"Sáenz" typo persists | M | Fix filename + visible/schema; grep |
| IG `igsh` rots SEO refs | M | Strip from `sameAs` AND href |
| No founder → false claim | M | All 3 as `employee`; DROP founder |
| `.team-grid` mutates `.cards-grid` | M | New selector; never edit `.cards-grid` |
| Fabricated credentials/years/bios | H | Name + specialty + photo + WhatsApp only |

## Rollback Plan & Dependencies

Static Netlify — redeploy commit `dbb1571`. Assets additive; no migrations. Deps: `main` clean at `dbb1571`; manual photo tool (Squoosh/sharp).

## Success Criteria

- [ ] #equipo renders 3 cards between #diferenciales and #casos w/ real photos
- [ ] Photo payload <300KB; no raw PNG in production
- [ ] JSON-LD validates LegalService, 3 real Persons + sameAs; no "[Pendiente"
- [ ] "Equipo" in header + sidebar nav; FB/IG/WhatsApp w/ aria-labels in footer + sidebar
- [ ] Reveal suppressed under `prefers-reduced-motion`
- [ ] No fabricated credentials/bios/years/founder
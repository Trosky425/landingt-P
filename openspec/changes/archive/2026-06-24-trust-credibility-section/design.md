# Design: Trust & Credibility Section (Equipo + Social + JSON-LD Repair)

## Technical Approach

One trust slice across 3 existing files + new binary assets. Insert `<section id="equipo">` between `#diferenciales` (ends line 587) and `#casos` (starts line 589) reusing `.section-alt` + `.section-head` + `.card`. Introduce a dedicated `.team-grid` selector (NOT `.cards-grid`). Optimize 3 raw ~1.8MB PNGs to AVIF+WebP+PNG via `npx sharp-cli` (no build pipeline — one-time manual export). Replace JSON-LD placeholder founder/employee with 3 real `employee` Person objects + `sameAs`. Add social icon rows to footer + mobile sidebar. Wire 3 attorney-scoped WhatsApp contexts. No new JS init functions — existing `data-whatsapp` auto-discovery + reveal observer cover everything.

## Architecture Decisions

| Decision | Choice | Alternatives | Rationale |
|----------|--------|--------------|-----------|
| Grid selector | New `.team-grid` (1→2@640→3@900) | Mutate `.cards-grid` to 3-col | Spec forbids touching `.cards-grid`; mutation would shrink service cards globally |
| Photo optimization tool | `npx sharp-cli@5.2.0` | Squoosh GUI, ImageMagick | sharp-cli available via npx (verified); CLI automatable in apply phase; no permanent dep added |
| Photo formats | AVIF primary + WebP fallback + PNG legacy | AVIF only, WebP only | Spec requires 3-tier `<picture>`; PNG fallback for legacy + cumulative <300KB |
| Photo aspect | 4:5 portrait (960×1200 export) | 1:1 square, 9:16 original | Spec mandates `aspect-ratio: 4/5`; keeps face framing; matches existing `.hero-image aspect-ratio` pattern |
| Founder designation | DROP `founder` array; all 3 as `employee` | Promote one to founder | No verified founder data — promoting risks false claim (legal ethics); proposal + spec forbid it |
| Social in header | Excluded | Add icons next to header-cta | Spec explicitly forbids; header already busy with nav + brand + WhatsApp |
| Backup | Copy 3 files to `_backup-trust/` | Rely on git only | Belt-and-suspenders; git exists but config.yaml stale-says "not a repo" |

## Data Flow

    Raw PNG (941×1672, ~1.8MB each)
         │
         ▼  npx sharp-cli resize+convert
    sara-munoz.{avif,webp,png}  (~960×1200, 4:5)
    camilo-saenz.{avif,webp,png}
    raul-gonzalez.{avif,webp,png}
         │
         ▼  <picture> in index.html
    Browser picks AVIF → WebP → PNG
         │
         ▼  data-whatsapp="equipo-sara" etc.
    script.js CONFIG.messages → wa.me/573224768106

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | JSON-LD rewrite (lines 46-51), header nav insert (after line 99), mobile nav insert+renumber (after line 148), equipo section insert (after line 587), footer-social insert (after line 846), mobile-overlay-footer social insert (before line 163) |
| `styles.css` | Modify | `.team-grid` + `.card--team` + `.card-photo` + `.card-specialty` + `.footer-social` + `.mobile-overlay-social` + `.team-grid` added to reveal stagger selector (line 1456) |
| `script.js` | Modify | 3 entries in `CONFIG.messages` (after line 25) |
| `sara-munoz.avif/.webp/.png` | Create | Optimized photo (Dra. Sara Muñoz) |
| `camilo-saenz.avif/.webp/.png` | Create | Optimized photo (Dr. Camilo Sáenz — typo fixed) |
| `raul-gonzalez.avif/.webp/.png` | Create | Optimized photo (Dr. Raúl González) |
| `_backup-trust/` | Create | Pre-edit copies of index.html, styles.css, script.js |

## Equipo Section HTML (insert after line 587, before `#casos` comment)

```html
<!-- ============================================================
     EQUIPO
     ============================================================ -->
<section class="section section-alt" id="equipo">
  <div class="container">
    <div class="section-head" data-reveal="fade-up">
      <p class="section-kicker">EQUIPO</p>
      <h2>Quién te acompaña</h2>
      <p>Abogados que te explican el camino en lenguaje claro y te orientan desde el primer contacto.</p>
    </div>

    <div class="team-grid">
      <article class="card card--team" data-reveal="fade-up" data-delay="0">
        <picture class="card-photo">
          <source srcset="sara-munoz.avif" type="image/avif" />
          <source srcset="sara-munoz.webp" type="image/webp" />
          <img src="sara-munoz.png" alt="Dra. Sara Muñoz — abogada" width="480" height="600" loading="lazy" decoding="async" />
        </picture>
        <h3>Dra. Sara Muñoz</h3>
        <span class="card-specialty">Derecho Público</span>
        <a class="btn btn-primary btn-card" href="#" data-whatsapp="equipo-sara">Hablar con Sara</a>
      </article>

      <article class="card card--team" data-reveal="fade-up" data-delay="100">
        <picture class="card-photo">
          <source srcset="camilo-saenz.avif" type="image/avif" />
          <source srcset="camilo-saenz.webp" type="image/webp" />
          <img src="camilo-saenz.png" alt="Dr. Camilo Sáenz — abogado" width="480" height="600" loading="lazy" decoding="async" />
        </picture>
        <h3>Dr. Camilo Sáenz</h3>
        <span class="card-specialty">Derecho Privado</span>
        <a class="btn btn-primary btn-card" href="#" data-whatsapp="equipo-camilo">Hablar con Camilo</a>
      </article>

      <article class="card card--team" data-reveal="fade-up" data-delay="200">
        <picture class="card-photo">
          <source srcset="raul-gonzalez.avif" type="image/avif" />
          <source srcset="raul-gonzalez.webp" type="image/webp" />
          <img src="raul-gonzalez.png" alt="Dr. Raúl González — abogado" width="480" height="600" loading="lazy" decoding="async" />
        </picture>
        <h3>Dr. Raúl González</h3>
        <span class="card-specialty">Legaltech</span>
        <a class="btn btn-primary btn-card" href="#" data-whatsapp="equipo-raul">Hablar con Raúl</a>
      </article>
    </div>
  </div>
</section>
```

## CSS (append to styles.css, before reduced-motion block)

```css
/* ============================================================
   EQUIPO — TEAM GRID + CARDS
   ============================================================ */
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 640px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 900px) {
  .team-grid { grid-template-columns: repeat(3, 1fr); }
}

.card--team {
  padding: 0;
  overflow: hidden;
}

.card-photo {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.card-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card--team h3 {
  padding: 24px 28px 0;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px;
}

.card-specialty {
  display: block;
  padding: 0 28px 20px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #5A4FCF;
}

.card--team .btn-card {
  margin: 0 28px 28px;
  width: calc(100% - 56px);
  font-size: 15px;
  padding: 14px 24px;
}

@media (min-width: 768px) {
  .card--team h3 { padding: 28px 32px 0; font-size: 24px; }
  .card-specialty { padding: 0 32px 20px; }
  .card--team .btn-card { margin: 0 32px 32px; width: calc(100% - 64px); }
}

/* ============================================================
   SOCIAL LINKS — footer + mobile sidebar
   ============================================================ */
.footer-social {
  display: flex;
  gap: 12px;
  align-items: center;
}

.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: #53627A;
  border: 1px solid transparent;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.footer-social a:hover { color: #5A4FCF; border-color: rgba(90, 79, 207, 0.2); }

.footer-social a:focus-visible {
  outline: 2px solid #5A4FCF;
  outline-offset: 2px;
}

.footer-social svg { width: 22px; height: 22px; }

/* Mobile sidebar social row — light icons on dark sidebar */
.mobile-overlay-social {
  display: flex;
  gap: 12px;
  padding: 0 0 16px;
}

.mobile-overlay-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: color 0.25s ease, border-color 0.25s ease;
}

.mobile-overlay-social a:hover { color: #fff; border-color: rgba(255, 255, 255, 0.2); }

.mobile-overlay-social a:focus-visible {
  outline: 2px solid #7B6FE8;
  outline-offset: 2px;
}

.mobile-overlay-social svg { width: 22px; height: 22px; }
```

**Reveal stagger update** — add `.team-grid` to the existing stagger selector at line 1456:

```css
/* BEFORE */
.cards-grid [data-reveal],
.steps-grid [data-reveal],
.reasons-grid [data-reveal],
.case-list [data-reveal] {
  transition-delay: calc(var(--delay, 0ms) * 1ms);
}

/* AFTER — add .team-grid [data-reveal], */
```

**prefers-reduced-motion**: existing block (line 1861) uses universal `*` selector + `[data-reveal]` override — already covers all new elements. No change needed.

## JSON-LD Before/After (replace lines 46-51)

**Before:**
```json
    "founder": [
      { "@type": "Person", "name": "[Pendiente: nombre del fundador]" }
    ],
    "employee": [
      { "@type": "Person", "name": "[Pendiente: nombre del abogado]" }
    ],
```

**After:**
```json
    "employee": [
      { "@type": "Person", "name": "Dra. Sara Muñoz", "jobTitle": "Abogada", "knowsAbout": "Derecho Público", "image": "https://tamaraypineros.netlify.app/sara-munoz.avif" },
      { "@type": "Person", "name": "Dr. Camilo Sáenz", "jobTitle": "Abogado", "knowsAbout": "Derecho Privado", "image": "https://tamaraypineros.netlify.app/camilo-saenz.avif" },
      { "@type": "Person", "name": "Dr. Raúl González", "jobTitle": "Abogado", "knowsAbout": "Legaltech", "image": "https://tamaraypineros.netlify.app/raul-gonzalez.avif" }
    ],
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61585664874960",
      "https://www.instagram.com/tamaraypineros"
    ],
```

## Social Links HTML

**Footer** — insert after `.footer-links` div (after line 846), inside `.footer-inner`:

```html
<div class="footer-social">
  <a href="https://www.facebook.com/profile.php?id=61585664874960" aria-label="Facebook de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
  </a>
  <a href="https://www.instagram.com/tamaraypineros" aria-label="Instagram de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
  </a>
  <a href="https://wa.me/573224768106" aria-label="WhatsApp de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  </a>
</div>
```

**Mobile sidebar** — insert inside `.mobile-overlay-footer`, BEFORE the existing WhatsApp button (before line 163):

```html
<div class="mobile-overlay-social">
  <a href="https://www.facebook.com/profile.php?id=61585664874960" aria-label="Facebook de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>
  </a>
  <a href="https://www.instagram.com/tamaraypineros" aria-label="Instagram de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
  </a>
  <a href="https://wa.me/573224768106" aria-label="WhatsApp de Tamara & Piñeros" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  </a>
</div>
```

Note: WhatsApp social links use `href="https://wa.me/..."` directly (NOT `data-whatsapp`) so they work without JS and open in a new tab — they don't need a pre-filled message context.

## Navigation Update

**Header nav** (line 97-102) — insert Equipo between Diferenciales and Casos:

```html
<!-- BEFORE -->
<a href="#diferenciales">Diferenciales</a>
<a href="#casos">Casos</a>

<!-- AFTER -->
<a href="#diferenciales">Diferenciales</a>
<a href="#equipo">Equipo</a>
<a href="#casos">Casos</a>
```

**Mobile sidebar nav** (lines 145-160) — insert after Diferenciales (--i:3), renumber ALL subsequent `--i` values +1:

```html
<!-- Insert after the #diferenciales link (--i:3), before #casos -->
<a href="#equipo" class="mobile-overlay-link" style="--i:4">
  <span class="mol-title">Equipo</span>
  <span class="mol-desc">Quién te acompaña</span>
</a>
```

Then renumber: Casos `--i:4`→`5`, FAQ `--i:5`→`6`, Contacto `--i:6`→`7`.

## script.js — CONFIG.messages (insert after line 25)

```javascript
'equipo-sara': 'Hola, quiero hablar con la Dra. Sara Muñoz sobre un asunto de Derecho Público.',
'equipo-camilo': 'Hola, quiero hablar con el Dr. Camilo Sáenz sobre un asunto de Derecho Privado.',
'equipo-raul': 'Hola, quiero hablar con el Dr. Raúl González sobre un asunto de Legaltech.',
```

No new init functions — `setupWhatsAppLinks()` auto-discovers `[data-whatsapp]` via `querySelectorAll`; `setupScrollReveal()` auto-discovers `[data-reveal]`.

## Photo Optimization Strategy

**Tool**: `npx sharp-cli@5.2.0` (verified available — no permanent install). Apply phase runs per-photo:

```bash
npx sharp-cli -i "Dra. Sara Munoz Derecho Público.png" -o "sara-munoz.avif" -- resize 960 1200 --fit cover --withoutEnlargement -- avif --quality 50
npx sharp-cli -i "Dra. Sara Munoz Derecho Público.png" -o "sara-munoz.webp" -- resize 960 1200 --fit cover --withoutEnlargement -- webp --quality 80
npx sharp-cli -i "Dra. Sara Munoz Derecho Público.png" -o "sara-munoz.png" -- resize 960 1200 --fit cover --withoutEnlargement -- png --compressionLevel 9
```

Repeat for `camilo-saenz` (from "Dr. Camilo Sanenz Derecho Privado.png") and `raul-gonzalez` (from "Dr. Raul González Abogado Legaltech.png"). Verify total <300KB with `Get-Item ... | Measure-Object Length -Sum`. Original raw PNGs (~1.8MB each) MUST NOT ship.

## Backup Strategy

Before any edit, copy current files to `_backup-trust/`:

```bash
New-Item -ItemType Directory -Path "_backup-trust"
Copy-Item index.html, styles.css, script.js _backup-trust\
```

Git provides version history but config.yaml stale-says "not a repo" — backup is belt-and-suspenders.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Manual — visual | Equipo renders 3 cards with photos between #diferenciales and #casos | Open index.html locally + Netlify preview |
| Manual — responsive | Grid 1col mobile → 2col @640 → 3col @900 | DevTools device emulation |
| Manual — a11y | Social links 44×44, focus-visible, aria-labels | Keyboard tab + DevTools |
| Manual — reduced-motion | Cards visible immediately, no transform | DevTools emulate `prefers-reduced-motion: reduce` |
| SEO — JSON-LD | Validates LegalService, 3 Persons, sameAs, no "[Pendiente" | Google Rich Results Test / Schema.org validator |
| Performance | Photo payload <300KB total | `Get-Item *.avif,*.webp,*.png \| Measure-Object Length -Sum` |
| Grep — typo | Zero "Sanenz" matches | `Select-String -Pattern "Sanenz" index.html,script.js` |
| Grep — placeholder | Zero "[Pendiente" matches | `Select-String -Pattern "\[Pendiente" index.html` |

## Migration / Rollout

No migration required. Assets are additive (new files). Rollback = restore from `_backup-trust/` or redeploy commit `dbb1571` on Netlify. No feature flags needed.

## Open Questions

- [ ] None — all inputs unblocked (names, photos, social URLs confirmed in exploration #422)

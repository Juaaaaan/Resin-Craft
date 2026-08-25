## Why

The Home page has no scroll animations — all sections appear statically as the user scrolls. Adding coordinated reveal animations gives a premium, gallery-like feel consistent with the brand's "Artisanal Ether" identity. The `appScrollReveal` directive (RCA-48) is ready; these three tickets apply it across Home sections.

## What Changes

- **RCA-49 — Featured products stagger:** Each product card in "The Celestial Shore" section fades up with incremental delay (0/100/200ms) for a staggered reveal
- **RCA-50 — Brand story lateral entry:** In "El Arte como Descanso", text enters from left and image from right, meeting in the center
- **RCA-51 — Remaining sections fade-up:** "The Elements" (category tabs) title and bento grid get fade-up reveals. Hero is excluded (above the fold, visible on load)
- Import `ScrollRevealDirective` into affected components
- Template-only changes — no logic, no new components

## Capabilities

### New Capabilities

_None — uses existing `appScrollReveal` directive._

### Modified Capabilities

_None — no spec-level behavior changes. Template-only attribute additions. `skip_specs: true` set._

## Impact

- Modified templates: `featured-products.html`, `brand-story.html`, `category-tabs.html`
- Modified TS files: `featured-products.ts`, `brand-story.ts`, `category-tabs.ts` (add directive import)
- No API changes, no new dependencies, no breaking changes
- Hero component untouched

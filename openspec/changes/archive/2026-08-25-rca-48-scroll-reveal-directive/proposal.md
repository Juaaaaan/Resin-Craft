## Why

The site needs scroll-triggered reveal animations to add visual polish and guide user attention as they browse products. Currently no reusable animation primitive exists — each section that wants entrance effects would need ad-hoc IntersectionObserver code. A single directive centralizes this, keeps it SSR-safe, and respects accessibility preferences.

## What Changes

- New `appScrollReveal` Angular directive using IntersectionObserver
- Configurable direction (up, left, right), delay (ms), and threshold inputs
- CSS-driven transitions: opacity 0→1 + translate, 600–800ms with smooth easing
- SSR-safe: no browser APIs on server, no hydration mismatch
- Accessibility: respects `prefers-reduced-motion: reduce` — content visible without animation
- One-shot: unobserves element after first reveal

## Capabilities

### New Capabilities
- `scroll-reveal-directive`: Reusable attribute directive for scroll-triggered reveal animations with SSR safety and reduced-motion support

### Modified Capabilities

_None — this is a new standalone directive with no changes to existing specs._

## Impact

- New directive file under `src/app/shared/directives/`
- New CSS/SCSS for reveal transition classes (can live in directive styles or global styles)
- No API changes, no dependency additions, no breaking changes
- Any existing component can adopt by adding the attribute — zero coupling

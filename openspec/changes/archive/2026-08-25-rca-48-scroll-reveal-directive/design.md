## Context

The project is Angular 21 SSR with zoneless change detection. No animation utilities exist yet. The design system specifies `duration-300` as minimum transition speed, and this directive uses 600–800ms — well above that floor. See proposal.md for motivation.

Existing directives live under `src/app/shared/directives/` (directory may need creation).

## Goals / Non-Goals

**Goals:**
- Single-file directive (`.ts` only) — CSS transitions defined via host bindings, no separate stylesheet
- Zero external dependencies
- Drop-in usage on any element via attribute selector

**Non-Goals:**
- Scroll-linked (parallax-style) continuous animations — this is one-shot reveal only
- Custom animation keyframes or spring physics
- Directive-based orchestration of grouped sequences (stagger is per-element via `delay` input)

## Decisions

### 1. IntersectionObserver over scroll event listeners

**Choice:** IntersectionObserver API
**Rationale:** Native, performant, no throttle/debounce needed. Supported in all target browsers. Scroll listeners would require manual visibility math and hurt performance on pages with many observed elements.
**Alternative rejected:** `scroll` event + `getBoundingClientRect()` — expensive, needs throttling.

### 2. CSS transitions over Web Animations API

**Choice:** CSS transitions triggered by adding a `.revealed` class
**Rationale:** Simpler, no JS animation loop. `prefers-reduced-motion` handled purely in CSS via media query — the `transition-duration` is set to `0s` so the element shows instantly. Aligns with the design system's CSS-first approach.
**Alternative rejected:** `element.animate()` — more control but requires JS-side reduced-motion detection and cleanup.

### 3. Host bindings for initial hidden state

**Choice:** Use the directive's `host` object to set initial styles (`opacity: 0`, `transform: translateY(20px)`) and transition properties. On reveal, set `opacity: 1` and `transform: none`.
**Rationale:** No external CSS file needed. Styles are co-located with directive logic. SSR guard ensures these styles are only applied in the browser — server render shows elements in their final position.

### 4. SSR safety via afterNextRender

**Choice:** Use `afterNextRender` to initialize IntersectionObserver
**Rationale:** Angular 21 idiomatic pattern for browser-only code. Cleaner than manual `isPlatformBrowser` checks. Guaranteed to run only on the client after hydration.
**Alternative rejected:** `isPlatformBrowser` guard in `ngOnInit` — works but `afterNextRender` is the recommended Angular 19+ pattern and avoids hydration timing issues.

### 5. Reduced-motion via CSS media query

**Choice:** Wrap transitions in `@media (prefers-reduced-motion: no-preference)` and set initial state to visible when reduced-motion is active.
**Rationale:** Pure CSS solution — no JS matchMedia needed. If the user changes the OS setting mid-session, the CSS responds immediately. Elements start visible (no flash of hidden content).

## Risks / Trade-offs

- **[Late hydration flicker]** → Elements may briefly appear unstyled before the directive initializes on the client. Mitigation: initial hidden styles are applied via host bindings which resolve during hydration, not after.
- **[Many observed elements]** → IntersectionObserver handles hundreds of elements efficiently, but extremely large pages (500+) could see minor overhead. Mitigation: `unobserve` after reveal keeps the active set small. Acceptable for this project's scale.
- **[No "down" direction]** → The Jira spec lists up/left/right only. If "down" is needed later, adding it is a one-line map entry — not a design concern.

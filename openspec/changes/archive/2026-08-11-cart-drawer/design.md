## Context

The app has no cart UI yet. CartService API is spec'd (SPEC.md §6.1) with signals-based state (`items`, `total`, `itemCount`, `shipping`). ShippingService (§6.3) provides shipping options and cost calculation. The navbar (RCA-20, in progress) will host the cart icon that triggers the drawer. See proposal.md for motivation.

Angular 21 zoneless app — all reactivity via signals. SSR with `@angular/ssr`. Design system: Artisanal Ether (Tailwind v4 tokens).

## Goals / Non-Goals

**Goals:**
- Self-contained drawer component consuming CartService/ShippingService signals
- Smooth slide animation matching brand feel (≥300ms, deliberate)
- Fully reactive — no manual change detection
- SSR-safe, i18n-ready

**Non-Goals:**
- CartService implementation (RCA-29 — separate task)
- Checkout modal/flow (RCA-22)
- Persistent cart (localStorage/Supabase) — deferred per SPEC.md
- Stock validation inside drawer (handled by product page)

## Decisions

### 1. Angular Animations for slide transition

**Choice:** `@angular/animations` with `trigger('slideDrawer', ...)` — translateX(100%) ↔ translateX(0).

**Why over CSS-only:** Angular animations integrate with component lifecycle, support `:enter`/`:leave` states for conditional rendering (`@if`), and allow programmatic control. CSS transitions on `@if` blocks require workarounds.

**Alternative considered:** CSS `transition` + `[class]` binding. Simpler but doesn't animate the removal (`@if` false) without extra logic.

### 2. Component boundary — single component + inline sub-templates

**Choice:** One `CartDrawerComponent` with the drawer panel, backdrop, item list, and totals. No child components for item rows.

**Why:** Drawer is a cohesive UI unit. Item rows are simple (name, price, qty controls) — extracting a sub-component adds indirection without reuse benefit. If item rows grow complex later, extract then.

**Alternative considered:** `CartItemRowComponent` extracted. Premature — violates YAGNI for this scope.

### 3. Open/close control via `model()` two-way binding

**Choice:** `isOpen = model(false)` so the parent can bind with `[(isOpen)]`. The drawer updates the model on close (backdrop click, close button).

**Why over input+output pair:** Cleaner API for toggle state. Parent doesn't need to wire separate `(closed)` handler — the model syncs automatically.

### 4. Overlay as part of the component template

**Choice:** Backdrop `div` inside `CartDrawerComponent` template, shown with `@if (isOpen())`. Positioned `fixed inset-0` with semi-transparent background.

**Why:** Keeps drawer self-contained. No need for a portal or CDK overlay — the drawer is always rendered at the app root level anyway.

### 5. Shipping selector as inline radio/select group

**Choice:** Simple radio group inside the drawer listing ShippingService.options. No separate component.

**Why:** 3 options max per SPEC.md (ordinario, certificado, recogida). A radio group fits directly.

## Risks / Trade-offs

- **[CartService not implemented yet]** → Drawer depends on CartService signals. Mitigation: component can be built and tested with a stub service providing the same signal API. Task ordering in tasks.md will ensure CartService exists first or is stubbed.
- **[Animation on SSR]** → `@angular/animations` may attempt DOM access during SSR. Mitigation: `provideAnimations()` only in browser bootstrap; use `provideNoopAnimations()` in server config (standard Angular SSR pattern).
- **[Scroll lock when drawer open]** → Body should not scroll behind the drawer. Mitigation: use `afterNextRender` to toggle `overflow: hidden` on `document.body` with `isPlatformBrowser` guard.

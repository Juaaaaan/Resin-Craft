## Why

The storefront needs a shopping cart UI so users can review selected items, adjust quantities, and proceed to checkout. This is a core e-commerce interaction blocking the checkout flow (RCA-3 — Fase 3). The CartService (RCA-29) defines the signals-based state layer; this change adds the visual drawer that consumes it.

## What Changes

- New `CartDrawerComponent` — slide-in sidebar panel triggered from navbar cart icon
- Renders cart items with editable quantities, subtotal/total via `computed()` signals
- Shipping method selector connected to `ShippingService`
- "Finalizar compra" button (checkout integration deferred to RCA-22)
- Entry/exit animation using `@angular/animations`
- Backdrop overlay that closes drawer on click
- SSR-safe: no direct `window`/`document` access

## Capabilities

### New Capabilities
- `cart-drawer`: Cart drawer sidebar component — slide-in panel displaying cart items, quantity controls, totals, shipping selector, and checkout CTA. Connected to CartService signals.

### Modified Capabilities
_(none — CartService API is consumed as-is, no requirement changes)_

## Impact

- **New files:** `CartDrawerComponent` (component + template + styles + spec)
- **Modified files:** Parent layout or app component to host the drawer and control its open/close state
- **Dependencies:** CartService (RCA-29), ShippingService (RCA-31) — both must exist or be stubbed
- **Design system:** Uses Artisanal Ether tokens (surface, typography, spacing, transitions ≥300ms)
- **i18n:** All user-facing strings through Transloco (es default, en fallback)

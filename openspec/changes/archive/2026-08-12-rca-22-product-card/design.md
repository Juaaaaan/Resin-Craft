## Context

See proposal.md — Why. The existing `ProductCard` at `src/app/shared/components/product-card/` uses raw `[src]` for images, lacks OnPush, and is missing collection and availability display. The `Product` model already has `collection` (nullable). `StockStatus` type (`'available' | 'reserved' | 'sold'`) exists in `products.const.ts`.

## Goals / Non-Goals

**Goals:**
- SSR-safe image rendering via `NgOptimizedImage` + `isPlatformBrowser` guard
- Display collection name and stock-status badge
- OnPush change detection
- Backward-compatible: existing consumers work without changes

**Non-Goals:**
- Relocating the component to a different directory
- Changing the `Product` model or `StockStatus` type
- Adding routing or navigation behavior to the card
- i18n for badge labels (hardcoded Spanish for now, Transloco integration deferred)

## Decisions

### 1. `isPlatformBrowser` guard for image block

**Choice:** Wrap the `<img ngSrc>` block in `@if (isBrowser)` where `isBrowser` is a `computed()` signal derived from `isPlatformBrowser(inject(PLATFORM_ID))`.

**Why:** `NgOptimizedImage` requires width/height or fill mode. During SSR the image URL may not resolve and causes hydration mismatch warnings. Gating the entire image block avoids both issues. The placeholder renders on the server, and the real image appears after hydration.

**Alternative considered:** Using `ngSrc` with a placeholder `src` fallback — rejected because `NgOptimizedImage` does not support simultaneous `src` and `ngSrc`, and conditional binding is cleaner.

### 2. `stockStatus` as separate optional input (not derived from Product)

**Choice:** Accept `stockStatus` as `input<StockStatus | null>(null)` rather than expecting it on the `Product` model.

**Why:** `StockStatus` lives on `StockItem`, not `Product`. The card shouldn't know about stock queries — the parent passes the status. Default `null` means no badge, preserving backward compatibility.

**Alternative considered:** Extending `Product` with an optional `stockStatus` field — rejected to avoid coupling the model to UI concerns.

### 3. Badge variant mapping via computed signal

**Choice:** A `stockBadge` computed signal maps `StockStatus` to `{ label, variant }`:
- `'available'` → `{ label: 'Disponible', variant: 'primary' }`
- `'reserved'` → `{ label: 'Reservado', variant: 'secondary' }`
- `'sold'` → `{ label: 'Vendido', variant: 'secondary' }`

**Why:** Pure derivation, no template logic. The `Badge` component already supports variants.

### 4. Keep `imageUrl` as computed signal instead of getter

**Choice:** Replace the current `get imageUrl()` with a `computed(() => this.productService.getPrimaryImage(this.product()))`.

**Why:** Aligns with signals-first approach and works correctly with OnPush — getters without signals don't trigger change detection reliably in zoneless mode.

### 5. Collection displayed conditionally

**Choice:** `@if (product().collection)` block showing collection name in `text-label-sm` style below the product name.

**Why:** Minimal template addition. Uses existing `collection` field on `Product`. No display when null.

## Risks / Trade-offs

- **[Hydration flash]** Image area shows placeholder on server, then swaps to real image on hydration → brief visual flash. Mitigation: the placeholder has matching dimensions (`aspect-4/5`) so layout doesn't shift. Acceptable for this phase.
- **[Badge label hardcoded]** Labels are Spanish strings, not Transloco keys. Mitigation: documented as non-goal; will be addressed when i18n coverage expands.

## Why

The existing `ProductCard` component lacks SSR-safe image handling (`[src]` instead of `NgOptimizedImage`), is missing `ChangeDetectionStrategy.OnPush`, and doesn't display collection name or availability status — all required for a production-ready product catalog. Fixing these now unblocks the shop and collection pages.

## What Changes

- Refactor `ProductCard` to use `NgOptimizedImage` (`ngSrc`) with an `isBrowser` guard so images render only in the browser, preventing SSR hydration mismatches
- Add `ChangeDetectionStrategy.OnPush` to the component decorator
- Display the product's collection name below the product name
- Add an availability badge (in stock / out of stock / limited) using the existing `Badge` component and `StockStatus` enum
- Accept a new `stockStatus` input to drive the availability badge
- Keep the component in `src/app/shared/components/product-card/` (it already lives outside `ui/` and imports domain services — moving it would break existing consumers without added value)

## Capabilities

### New Capabilities

- `product-card`: SSR-safe product card with image, name, collection, price, availability badge, and add-to-bag action

### Modified Capabilities

_(none)_

## Impact

- **Components**: `ProductCard` — template, component class, and styles updated in place
- **Models**: `Product` interface unchanged; `StockStatus` enum already exists in `products.const.ts`
- **Consumers**: `FeaturedProducts` (and any future consumer) may pass `stockStatus` input; existing usage without it continues to work (badge hidden by default)
- **SSR**: Image rendering gated behind `isPlatformBrowser` — eliminates hydration warnings from `[src]`
- **Dependencies**: Adds `NgOptimizedImage` import; no new packages

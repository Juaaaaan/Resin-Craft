## Why

The storefront has no way for visitors to browse available inventory. Products exist in Supabase and `ProductsService.getAvailableStock()` already fetches them, but there is no page wired up to display them. Adding a `/stock` route lets customers see what is ready to purchase and funnels interest toward custom commissions.

## What Changes

- Add new route `/stock` (lazy-loaded) inside the existing `LayoutComponent` children
- Create `StockPage` feature component that calls `ProductsService.getAvailableStock()` and renders results in a responsive 4-column product-card grid
- Reuse existing `ProductCardComponent` for each item
- Add a CTA section at the bottom encouraging custom/commission orders
- Register the route in `app.routes.server.ts` for prerendering

## Capabilities

### New Capabilities

- `stock-page`: Stock catalogue page — route, data fetching, grid layout, empty state, and commission CTA

### Modified Capabilities

_(none — existing `product-card` and `ProductsService` are consumed as-is)_

## Impact

- **Routes**: `app.routes.ts` gains one new child route
- **SSR**: `app.routes.server.ts` gains prerender entry for `/stock`
- **New files**: `src/app/features/stock/` (component + spec + SCSS)
- **Dependencies**: No new packages — uses existing `ProductsService`, `ProductCardComponent`

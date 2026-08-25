## 1. Route Setup

- [x] 1.1 Generate `StockPage` component at `src/app/features/stock/` via Angular CLI (`ng generate component features/stock`)
- [x] 1.2 Add lazy-loaded `/stock` child route in `app.routes.ts` inside `LayoutComponent` children
- [x] 1.3 Register `/stock` in `app.routes.server.ts` for prerendering

## 2. Data Fetching & State

- [x] 2.1 Inject `ProductsService` and call `getAvailableStock()` on init, store result in a signal
- [x] 2.2 Add `isLoading` signal that is `true` while fetching and `false` after resolve
- [x] 2.3 Ensure SSR safety — no direct `window`/`document` access

## 3. Template & Layout

- [x] 3.1 Add loading state UI (skeleton or spinner) bound to `isLoading()` signal
- [x] 3.2 Add empty state message when `items().length === 0 && !isLoading()`
- [x] 3.3 Build responsive product grid: 4 columns desktop, 2 tablet, 1 mobile using Tailwind grid classes
- [x] 3.4 Render each `StockItem` using existing `ProductCardComponent`
- [x] 3.5 Add commission CTA section below grid with heading, body text, and button linking to `/contacto`

## 4. Styling

- [x] 4.1 Apply Artisanal Ether design tokens — `bg-surface`, typography scale, spacing `py-xl`, `gap-gutter`
- [x] 4.2 Style CTA section with `bg-surface-container` or `bg-primary-container` tint, centered layout

## 5. Testing

- [x] 5.1 Write unit tests for `StockPage`: data loads, empty state renders, CTA present
- [x] 5.2 Run `npm test` and `npm run lint` — all pass

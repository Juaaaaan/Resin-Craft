## Context

See proposal.md for motivation. The app already has `ProductsService.getAvailableStock()` returning `StockItem[]` from Supabase, and a reusable `ProductCardComponent`. Routes follow Spanish naming (`/colecciones`, `/cuidados`, `/contacto`) and lazy-load inside `LayoutComponent`. The app is zoneless (signals-only) with SSR prerendering.

## Goals / Non-Goals

**Goals:**

- Render a browsable catalogue of available stock items at `/stock`
- Reuse existing `ProductCardComponent` and `ProductsService` — no new data layer
- Responsive grid: 4 → 2 → 1 columns across breakpoints
- Commission CTA funneling visitors to `/contacto`

**Non-Goals:**

- Filtering, sorting, or search within stock (future work)
- Pagination or infinite scroll — inventory is small enough for a single page
- Cart interaction or "add to cart" from this page
- Product detail page navigation (no `/stock/:slug` route)

## Decisions

### 1. Async data pattern: `async/await` in constructor-free init

`getAvailableStock()` returns a `Promise<StockItem[]>`. Use an `async` init method called from the constructor-free pattern (signal + `afterNextRender` or direct call in field initializer). Store results in `signal<StockItem[]>([])` with a companion `isLoading` signal.

**Alternative considered:** Convert to observable with `toSignal()`. Rejected — service already returns Promise, wrapping adds complexity for no gain.

### 2. Grid layout: Tailwind CSS grid with responsive breakpoints

Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter` for the product grid. Keeps layout declarative in the template with zero custom SCSS.

**Alternative considered:** CSS flexbox with `flex-wrap`. Rejected — CSS Grid gives explicit column control without calculating widths.

### 3. Loading state: simple conditional with `@if`

Show a loading indicator via `@if (isLoading())` in template. No skeleton screen — stock page is prerendered so SSR serves content immediately; loading state only appears on client-side navigation.

**Alternative considered:** Skeleton grid with placeholder cards. Deferred — can add later if needed; prerendering minimizes visibility of loading state.

### 4. Empty state: inline in component template

Render empty state directly in `StockPage` template with `@if` / `@else`. No separate component — it's a simple message block.

### 5. CTA section: static template block with `routerLink`

Static HTML section below the grid. Uses `routerLink="/contacto"` for navigation. Styled with `bg-surface-container` tint to visually separate from the product grid.

## Risks / Trade-offs

- **[All items loaded at once]** → Acceptable for small inventory (<100 items). If catalogue grows significantly, revisit with pagination.
- **[`getAvailableStock()` returns empty `[]` on error]** → User sees empty state instead of error. Acceptable for MVP — service already handles errors silently. Can add error state later.
- **[Prerender assumes static stock]** → Prerendered HTML shows stock at build time; client hydration re-fetches. Stale content window is small and acceptable for this product type.

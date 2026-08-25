## 1. Component class refactor

- [x] 1.1 Add `ChangeDetectionStrategy.OnPush` to the `@Component` decorator
- [x] 1.2 Add `PLATFORM_ID` inject and `isBrowser` computed signal using `isPlatformBrowser`
- [x] 1.3 Replace `get imageUrl()` getter with `imageUrl = computed(() => this.productService.getPrimaryImage(this.product()))`
- [x] 1.4 Add `stockStatus = input<StockStatus | null>(null)` optional input
- [x] 1.5 Add `stockBadge` computed signal mapping `StockStatus` → `{ label, variant }`
- [x] 1.6 Add `NgOptimizedImage` to the component's `imports` array

## 2. Template updates

- [x] 2.1 Wrap `<img>` in `@if (isBrowser())` guard and replace `[src]` with `ngSrc` + `fill` attribute
- [x] 2.2 Add collection name display below product name with `@if (product().collection)` conditional
- [x] 2.3 Add availability badge using `@if (stockBadge())` with the existing `Badge` component

## 3. Tests

- [x] 3.1 Update `product-card.spec.ts` — add test for SSR guard (image not rendered when `isBrowser` is false)
- [x] 3.2 Add test for collection name display (present when collection exists, absent when null)
- [x] 3.3 Add test for availability badge (each StockStatus value maps to correct label, hidden when null)
- [x] 3.4 Verify existing tests still pass (isNew badge, addToBag, price display)

## 4. Verification

- [x] 4.1 Run `npm run lint` — no errors
- [x] 4.2 Run `npm test` — all specs pass
- [x] 4.3 Run `npm run build` — production build succeeds (SSR included)

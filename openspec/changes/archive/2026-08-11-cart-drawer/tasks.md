## 1. Animation & SSR Setup

- [x] 1.1 Add `provideAnimations()` to client app config (`app.config.ts`) and `provideNoopAnimations()` to server app config (`app.config.server.ts`)
- [x] 1.2 Define `slideDrawer` animation trigger: `translateX(100%)` ↔ `translateX(0)`, `duration 300ms ease-in-out`, with `:enter` and `:leave` transitions

## 2. Component Scaffold

- [x] 2.1 Generate `CartDrawerComponent` at `src/app/shared/components/cart-drawer/` with `ng generate component`
- [x] 2.2 Configure component: `OnPush`, `animations: [slideDrawer]`, inject `CartService`, `ShippingService`, `PLATFORM_ID`
- [x] 2.3 Add `isOpen = model(false)` for two-way binding open/close control
- [x] 2.4 Add `checkout = output<void>()` for checkout CTA event

## 3. Template & Styling

- [x] 3.1 Build backdrop overlay: `fixed inset-0 bg-on-surface/30 z-40`, click handler calls `isOpen.set(false)`
- [x] 3.2 Build drawer panel: `fixed right-0 top-0 h-full w-[400px] max-w-[85vw] bg-surface z-50 border-l border-outline-variant`, attach `@slideDrawer` animation
- [x] 3.3 Build drawer header: title (Transloco key), close button
- [x] 3.4 Build cart items list with `@for`: product name, unit price (CurrencyPipe EUR), quantity controls (+/−/remove), line subtotal
- [x] 3.5 Build empty cart state with `@if`: empty message (Transloco key), hide checkout button
- [x] 3.6 Build shipping method selector: radio group from `ShippingService.options`, bind selection to `CartService.setShipping()`
- [x] 3.7 Build totals section: subtotal, shipping cost (or "select shipping" prompt), grand total — all from `computed()` signals
- [x] 3.8 Build checkout button: `bg-on-surface text-surface rounded px-sm py-xs transition-all duration-300`, emits `checkout` output
- [x] 3.9 Add scroll lock: `afterNextRender` + `isPlatformBrowser` guard to toggle `overflow: hidden` on `document.body` when drawer opens/closes

## 4. Translations

- [x] 4.1 Add `cart.*` translation keys to `src/assets/i18n/es.json` (drawer title, empty message, quantity label, subtotal, shipping, total, checkout button, remove, close)
- [x] 4.2 Add matching `cart.*` keys to `src/assets/i18n/en.json`

## 5. Integration

- [x] 5.1 Add `<app-cart-drawer [(isOpen)]="cartOpen" (checkout)="onCheckout()" />` to the parent layout component (app component or shell)
- [x] 5.2 Wire navbar cart icon click to toggle `cartOpen` signal

## 6. Testing

- [x] 6.1 Unit test: drawer opens/closes when `isOpen` signal changes
- [x] 6.2 Unit test: cart items render from CartService stub with correct name, price, quantity
- [x] 6.3 Unit test: increment/decrement/remove call correct CartService methods
- [x] 6.4 Unit test: totals compute correctly (subtotal, shipping, grand total)
- [x] 6.5 Unit test: empty cart shows empty message and hides checkout button
- [x] 6.6 Unit test: checkout button emits output event
- [x] 6.7 Verify SSR build completes without errors (`npm run build`)

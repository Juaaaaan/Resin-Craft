## 1. Directive scaffold

- [x] 1.1 Generate directive with `ng generate directive shared/directives/scroll-reveal/scroll-reveal`
- [x] 1.2 Set attribute selector to `[appScrollReveal]` and configure `ChangeDetectionStrategy.OnPush` context (directive host object)

## 2. Inputs and types

- [x] 2.1 Define `direction` input with type `'up' | 'left' | 'right'` and default `'up'`
- [x] 2.2 Define `delay` input (number, default `0`) for stagger offset in ms
- [x] 2.3 Define `threshold` input (number, default `0.1`) for IntersectionObserver threshold

## 3. Core IntersectionObserver logic

- [x] 3.1 Initialize IntersectionObserver inside `afterNextRender` for SSR safety
- [x] 3.2 Map direction input to initial transform values (`up` → `translateY(20px)`, `left` → `translateX(20px)`, `right` → `translateX(-20px)`)
- [x] 3.3 Apply initial hidden styles via host bindings (opacity: 0, transform, transition properties with 700ms easing)
- [x] 3.4 On intersection: apply `transition-delay` from delay input, set opacity to 1 and transform to none, then unobserve the element

## 4. Reduced-motion support

- [x] 4.1 Use `@media (prefers-reduced-motion: reduce)` to override initial styles — elements start visible with no transition
- [x] 4.2 When reduced-motion is active, skip IntersectionObserver setup entirely (elements already visible)

## 5. Cleanup

- [x] 5.1 Disconnect IntersectionObserver in `destroyRef.onDestroy` callback

## 6. Testing

- [x] 6.1 Write unit test: directive applies initial hidden styles in browser environment
- [x] 6.2 Write unit test: directive reveals element on intersection and unobserves
- [x] 6.3 Write unit test: directive respects delay input (transition-delay applied)
- [x] 6.4 Write unit test: directive does not create IntersectionObserver during SSR
- [x] 6.5 Write unit test: elements visible without animation when reduced-motion is active
- [x] 6.6 Run `npx ng test --include='**/scroll-reveal.directive.spec.ts'` — all tests pass
- [x] 6.7 Run `npm run lint` — no lint errors

## 1. RCA-49 — Featured products staggered reveal

- [x] 1.1 Import `ScrollRevealDirective` in `featured-products.ts`
- [x] 1.2 Add `appScrollReveal direction="up"` with incremental `[delay]` (0, 100, 200) to each `app-product-card` in `featured-products.html`

## 2. RCA-50 — Brand story lateral entry

- [x] 2.1 Import `ScrollRevealDirective` in `brand-story.ts`
- [x] 2.2 Add `appScrollReveal direction="left"` to the text block (order-2/order-1 div) in `brand-story.html`
- [x] 2.3 Add `appScrollReveal direction="right"` to the image block (order-1/order-2 div) in `brand-story.html`

## 3. RCA-51 — Category tabs and remaining sections fade-up

- [x] 3.1 Import `ScrollRevealDirective` in `category-tabs.ts`
- [x] 3.2 Add `appScrollReveal direction="up"` to the title block in `category-tabs.html`
- [x] 3.3 Add `appScrollReveal direction="up"` to the bento grid container in `category-tabs.html`

## 4. Verification

- [x] 4.1 Run `npm run lint` — no lint errors
- [x] 4.2 Run `npm precommit` — all existing tests pass
- [x] 4.3 Start dev server and verify in browser: all sections animate on scroll, hero stays static, reduced-motion respected

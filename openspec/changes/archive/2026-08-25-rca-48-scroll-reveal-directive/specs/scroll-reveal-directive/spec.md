## Purpose

Reusable attribute directive that animates elements into view on scroll, providing configurable direction, delay, and threshold while remaining SSR-safe and accessibility-compliant.

## ADDED Requirements

### Requirement: Scroll-triggered reveal animation

The directive SHALL animate elements from invisible to visible when they enter the viewport. The animation SHALL combine an opacity transition (0→1) with a directional translate, using a duration between 600–800ms and a smooth easing curve.

#### Scenario: Element scrolls into view with direction "up"
- **WHEN** an element with `appScrollReveal direction="up"` enters the viewport
- **THEN** the element SHALL transition from opacity 0 and translated down to opacity 1 at its natural position

#### Scenario: Element scrolls into view with direction "left"
- **WHEN** an element with `appScrollReveal direction="left"` enters the viewport
- **THEN** the element SHALL transition from opacity 0 and translated to the right to opacity 1 at its natural position

#### Scenario: Element scrolls into view with direction "right"
- **WHEN** an element with `appScrollReveal direction="right"` enters the viewport
- **THEN** the element SHALL transition from opacity 0 and translated to the left to opacity 1 at its natural position

### Requirement: Configurable delay for staggering

The directive SHALL accept a `delay` input in milliseconds that staggers the animation start, enabling sequential reveal of sibling elements.

#### Scenario: Multiple elements with incremental delays
- **WHEN** three elements have `appScrollReveal` with delay values of 0, 100, and 200
- **THEN** each element SHALL begin its reveal animation offset by its respective delay after entering the viewport

### Requirement: Configurable intersection threshold

The directive SHALL accept a `threshold` input (0 to 1) controlling how much of the element must be visible before the animation triggers. The default threshold SHALL be 0.1.

#### Scenario: Custom threshold
- **WHEN** an element has `appScrollReveal threshold="0.5"`
- **THEN** the animation SHALL trigger only when 50% of the element is visible in the viewport

### Requirement: One-shot animation

The directive SHALL animate each element only once. After the reveal animation completes, the directive SHALL stop observing the element.

#### Scenario: Element scrolls in and out
- **WHEN** an element has been revealed and the user scrolls it out of view and back in
- **THEN** the element SHALL remain in its revealed state without re-animating

### Requirement: SSR safety

The directive SHALL NOT access browser-only APIs (IntersectionObserver, window, document) during server-side rendering. On the server, elements SHALL be rendered in their final visible state.

#### Scenario: Server-side render
- **WHEN** the page is rendered on the server
- **THEN** all elements with `appScrollReveal` SHALL be visible with no hidden/translated styles applied

#### Scenario: Client hydration
- **WHEN** the client hydrates a server-rendered page
- **THEN** hydration SHALL complete without mismatch errors from the directive

### Requirement: Reduced-motion accessibility

The directive SHALL respect the user's `prefers-reduced-motion: reduce` OS preference. When reduced motion is active, elements SHALL be displayed in their final visible state without any animation.

#### Scenario: User has reduced-motion enabled
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` active
- **THEN** elements with `appScrollReveal` SHALL be immediately visible without opacity or translate transitions

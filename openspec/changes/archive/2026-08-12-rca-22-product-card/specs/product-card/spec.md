## Purpose

Reusable product card component that displays product image, name, collection, price, availability status, and an add-to-bag action, with SSR-safe image rendering via NgOptimizedImage.

## ADDED Requirements

### Requirement: Product image renders SSR-safe

The component SHALL render the product's primary image using `NgOptimizedImage` (`ngSrc`). Image rendering SHALL be gated behind an `isPlatformBrowser` check so the server does not emit an `<img>` tag that causes hydration mismatches. When no image is available, the component SHALL display a placeholder.

#### Scenario: Image renders in browser
- **WHEN** the component renders in the browser with a product that has a primary image
- **THEN** an `<img>` element with `ngSrc` bound to the primary image URL is visible

#### Scenario: Image skipped during SSR
- **WHEN** the component renders on the server
- **THEN** no `<img>` element is emitted for the product image; the placeholder is shown instead

#### Scenario: Product has no images
- **WHEN** the product's `images` array is empty
- **THEN** the component displays a placeholder block instead of an image

### Requirement: Product name is displayed

The component SHALL display the product's `name` as a heading.

#### Scenario: Name visible
- **WHEN** a product with name "Ocean Waves Tray" is provided
- **THEN** the text "Ocean Waves Tray" is rendered in a heading element

### Requirement: Collection name is displayed

The component SHALL display the product's collection name when the product has a collection. When the product has no collection, no collection text SHALL be rendered.

#### Scenario: Product belongs to a collection
- **WHEN** a product with collection name "Ethereal Series" is provided
- **THEN** the text "Ethereal Series" is visible below the product name

#### Scenario: Product has no collection
- **WHEN** a product with `collection: null` is provided
- **THEN** no collection text is rendered

### Requirement: Price is displayed in EUR

The component SHALL display the product's price formatted as EUR currency.

#### Scenario: Price formatting
- **WHEN** a product with price `45.50` is provided
- **THEN** the displayed price is formatted as "45,50 €" (EUR, es locale)

### Requirement: Availability badge reflects stock status

The component SHALL accept an optional `stockStatus` input of type `StockStatus`. When provided, the component SHALL display a badge indicating availability. When not provided, no badge SHALL be rendered.

#### Scenario: Available product
- **WHEN** `stockStatus` is `'available'`
- **THEN** a badge with text "Disponible" is displayed

#### Scenario: Reserved product
- **WHEN** `stockStatus` is `'reserved'`
- **THEN** a badge with text "Reservado" is displayed

#### Scenario: Sold product
- **WHEN** `stockStatus` is `'sold'`
- **THEN** a badge with text "Vendido" is displayed

#### Scenario: No stock status provided
- **WHEN** `stockStatus` input is not provided
- **THEN** no availability badge is rendered

### Requirement: Add-to-bag action

The component SHALL emit an `addToBag` event with the product when the add-to-bag button is clicked. The button SHALL only be visible when `showAddBag` input is `true`. The click event SHALL NOT propagate to parent elements.

#### Scenario: Add to bag emits product
- **WHEN** `showAddBag` is `true` and the user clicks the add-to-bag button
- **THEN** an `addToBag` event is emitted containing the `Product` object, and the click does not propagate

#### Scenario: Add to bag hidden
- **WHEN** `showAddBag` is `false` or not provided
- **THEN** the add-to-bag button is not rendered

### Requirement: NEW badge

The component SHALL display a "NEW" badge when the `isNew` input is `true`.

#### Scenario: New product badge
- **WHEN** `isNew` is `true`
- **THEN** a badge with text "NEW" is displayed on the image area

#### Scenario: Not new product
- **WHEN** `isNew` is `false` or not provided
- **THEN** no "NEW" badge is rendered

### Requirement: OnPush change detection

The component SHALL use `ChangeDetectionStrategy.OnPush`.

#### Scenario: Change detection strategy
- **WHEN** the component is inspected
- **THEN** its `@Component` decorator specifies `changeDetection: ChangeDetectionStrategy.OnPush`

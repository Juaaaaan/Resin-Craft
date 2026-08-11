## Purpose

Slide-in sidebar panel that displays the user's shopping cart contents, allows quantity adjustments, shows computed totals with shipping, and provides access to checkout.

## ADDED Requirements

### Requirement: Drawer visibility control

The cart drawer SHALL be openable and closable via a boolean signal. When open, it SHALL slide in from the right edge of the viewport. When closed, it SHALL slide out and be removed from the visual flow.

#### Scenario: Open drawer
- **WHEN** the open signal is set to true
- **THEN** the drawer panel slides in from the right with an animation (minimum 300ms duration)
- **THEN** a semi-transparent backdrop overlay appears behind the drawer

#### Scenario: Close drawer via backdrop
- **WHEN** the user clicks the backdrop overlay
- **THEN** the drawer slides out to the right with an exit animation
- **THEN** the backdrop disappears
- **THEN** a closed event is emitted

#### Scenario: Close drawer via close button
- **WHEN** the user clicks the close button inside the drawer header
- **THEN** the drawer closes with the same exit animation behavior

### Requirement: Cart items display

The drawer SHALL display all items from CartService's `items` signal. Each item SHALL show product name, unit price, current quantity, and line subtotal.

#### Scenario: Cart with items
- **WHEN** the drawer is open and CartService contains items
- **THEN** each item displays: product name, unit price (EUR formatted), quantity, and line total (price × quantity)

#### Scenario: Empty cart
- **WHEN** the drawer is open and CartService contains no items
- **THEN** a message indicates the cart is empty
- **THEN** the checkout button is not displayed

### Requirement: Quantity editing

The user SHALL be able to increase, decrease, or remove items from the cart directly in the drawer.

#### Scenario: Increase quantity
- **WHEN** the user clicks the increment control on a cart item
- **THEN** CartService.updateQuantity is called with quantity + 1
- **THEN** the line total and cart total update reactively

#### Scenario: Decrease quantity above one
- **WHEN** the user clicks the decrement control on a cart item with quantity > 1
- **THEN** CartService.updateQuantity is called with quantity - 1

#### Scenario: Decrease quantity at one
- **WHEN** the user clicks the decrement control on a cart item with quantity = 1
- **THEN** CartService.removeItem is called for that product

#### Scenario: Remove item explicitly
- **WHEN** the user clicks the remove/delete control on a cart item
- **THEN** CartService.removeItem is called for that product

### Requirement: Totals display

The drawer SHALL display subtotal, shipping cost, and grand total. All values SHALL be computed reactively from CartService and ShippingService signals.

#### Scenario: Totals with shipping
- **WHEN** a shipping method is selected and cart has items
- **THEN** subtotal displays CartService.total
- **THEN** shipping cost displays the calculated shipping amount
- **THEN** grand total displays subtotal + shipping cost

#### Scenario: Totals without shipping
- **WHEN** no shipping method is selected
- **THEN** subtotal displays CartService.total
- **THEN** shipping line shows a prompt to select shipping method
- **THEN** grand total equals subtotal

### Requirement: Shipping method selector

The drawer SHALL allow the user to select a shipping method from ShippingService options.

#### Scenario: Select shipping method
- **WHEN** the user selects a shipping option from the available methods
- **THEN** CartService.setShipping is called with the selected method
- **THEN** shipping cost updates in the totals section

### Requirement: Checkout access

The drawer SHALL provide a button to proceed to checkout.

#### Scenario: Proceed to checkout
- **WHEN** the user clicks the checkout button
- **THEN** a checkout event is emitted (checkout flow handled externally)

### Requirement: Internationalization

All user-facing text in the drawer SHALL use Transloco translation keys. The component SHALL work with both `es` (default) and `en` locales.

#### Scenario: Language switch
- **WHEN** the active locale changes
- **THEN** all drawer labels, messages, and button text update to the new locale

### Requirement: SSR compatibility

The drawer component SHALL not access browser-only APIs (`window`, `document`, `localStorage`) during server-side rendering.

#### Scenario: Server render
- **WHEN** the component renders on the server
- **THEN** no runtime errors occur
- **THEN** animation setup is deferred to the browser via platform checks

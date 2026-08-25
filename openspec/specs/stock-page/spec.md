## Purpose

Displays available stock items in a browsable catalogue grid, allowing visitors to see ready-to-purchase products and discover the custom commission option.

## Requirements

### Requirement: Stock page is accessible at /stock route

The system SHALL serve a stock catalogue page at the `/stock` URL path within the main layout.

#### Scenario: Direct navigation to /stock
- **WHEN** a visitor navigates to `/stock`
- **THEN** the system renders the stock catalogue page inside the site layout (header + footer)

#### Scenario: Route is prerendered for SSR
- **WHEN** the application builds for production
- **THEN** the `/stock` route SHALL be included in the prerender list

### Requirement: Stock page displays available items in a 4-column grid

The system SHALL fetch available stock items from the data source and render them as product cards in a responsive grid that defaults to 4 columns on desktop.

#### Scenario: Items displayed on load
- **WHEN** the stock page loads and available items exist
- **THEN** the system displays each item as a product card in a grid layout with 4 columns on desktop viewports

#### Scenario: Responsive column reduction
- **WHEN** the viewport is narrower than desktop breakpoint
- **THEN** the grid SHALL reduce columns (e.g. 2 on tablet, 1 on mobile) while maintaining readability

#### Scenario: Product card content
- **WHEN** a stock item is rendered
- **THEN** the product card SHALL display the product's primary image, name, and price at minimum

### Requirement: Stock page handles empty inventory

The system SHALL display a meaningful empty state when no stock items are available.

#### Scenario: No available items
- **WHEN** the stock page loads and zero items are available
- **THEN** the system displays an empty-state message indicating no products are currently in stock

### Requirement: Stock page shows loading state

The system SHALL indicate to the user that data is being fetched.

#### Scenario: Data is loading
- **WHEN** the stock page is fetching items from the data source
- **THEN** the system displays a loading indicator

### Requirement: Stock page includes commission CTA

The system SHALL display a call-to-action section after the product grid encouraging visitors to request custom/commission pieces.

#### Scenario: CTA visible below grid
- **WHEN** the stock page renders with or without items
- **THEN** a commission CTA section SHALL appear below the product grid with a heading, descriptive text, and an action button or link

#### Scenario: CTA links to contact
- **WHEN** a visitor interacts with the commission CTA action
- **THEN** the system SHALL navigate to the contact page (`/contacto`) or equivalent commission entry point

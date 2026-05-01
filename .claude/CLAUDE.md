# CLAUDE MD

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Commands

```bash
npm start            # Dev server at http://localhost:4200 (auto-reloads)
npm run build        # Production build → dist/
npm run watch        # Dev build with watch mode
npm test             # Unit tests with Karma/Jasmine
npm run test:coverage  # Unit tests with coverage report
npm run lint         # ESLint (TypeScript + Angular templates)
npm run serve:ssr:Resin-Craft-Art  # Run the built SSR server at http://localhost:4000
```

To run a single test file: `npx ng test --include='**/path/to/file.spec.ts'`

The pre-commit hook runs `npm test` automatically via Husky.

## Architecture

This is an **Angular 21 SSR application** using `@angular/ssr` with an Express server. It uses **zoneless change detection** (`provideZonelessChangeDetection()`).

### Rendering

- `src/main.ts` — client-side bootstrap
- `src/main.server.ts` — server-side bootstrap
- `src/server.ts` — Express server wrapping `AngularNodeAppEngine`; can add REST API routes here under `/api/`
- `src/app/app.routes.server.ts` — controls per-route render mode (currently `RenderMode.Prerender` for all routes)
- `src/app/app.config.server.ts` — merges server config into `appConfig`

### App config

`src/app/app.config.ts` provides:

- `provideZonelessChangeDetection()` — no Zone.js; all reactivity via signals
- `provideClientHydration(withEventReplay())` — hydration with event replay

### Styling

- Global styles: `src/styles.scss`
- Component styles: SCSS (inline style language configured in `angular.json`)
- Prettier is configured with `printWidth: 100` and `singleQuote: true`

### Code generation

Use the Angular CLI schematic defaults (prefix `app`, SCSS, standalone):

```bash
ng generate component path/to/name
ng generate service path/to/name
ng generate pipe path/to/name
```

Components are generated with SCSS by default (set in `angular.json` schematics).

### Linting

ESLint is configured with `angular-eslint` covering both `.ts` and `.html` files. Template accessibility rules are enabled. Run `npm run lint -- --fix` for auto-fixable issues.

## Design System — Artisanal Ether

Brand personality: tactile craftsmanship meets ethereal beauty. Target audience values slow fashion, intentionality, and handmade imperfection. The UI is gallery-like — it recedes to let product photography dominate. Every interaction should feel deliberate and soft, mimicking polished resin. Style blend: **Minimalism + Tactile Sophistication**.

Tailwind v4 tokens are defined in `src/tailwind.css` via `@theme`. Fonts (Noto Serif + Manrope) are loaded via `<link>` in `src/index.html`.

### Colors

Material Design 3 tonal palette. Key roles:

| Role | Token | Use |
|------|-------|-----|
| Page canvas | `bg-surface` | Warm off-white (#fff8f4), main background |
| Card / highlight | `bg-surface-container-lowest` | Pure white, product cards |
| Borders / dividers | `border-outline-variant` | Soft taupe (#d0c4bc), 1px solid |
| Body text | `text-on-surface` | Charcoal-brown (#1f1b18), high contrast |
| Secondary text | `text-on-surface-variant` | Muted brown (#4d453f) |
| CTA / primary action | `bg-primary` | Warm brown (#685c52) |
| Primary text on dark | `text-on-primary` | White |
| Accent / chip fill | `bg-primary-container` | Blush (#f5e4d7) |

Avoid heavy shadows. Use `border border-outline-variant` (1px) to define component boundaries. When elevation is needed (modals, floating cart) use: `shadow-[0_12px_32px_rgba(74,69,65,0.05)]`.

### Typography

| Scale | Tailwind class | Font | Use |
|-------|---------------|------|-----|
| h1 | `text-h1 font-serif tracking-h1` | Noto Serif 48px | Hero headlines |
| h2 | `text-h2 font-serif tracking-h2` | Noto Serif 32px | Section titles |
| h3 | `text-h3 font-serif` | Noto Serif 24px | Sub-sections |
| body-lg | `text-body-lg font-sans` | Manrope 18px | Lead paragraphs |
| body-md | `text-body-md font-sans` | Manrope 16px | Body copy |
| label-sm | `text-label-sm font-sans font-semibold tracking-label uppercase` | Manrope 12px | Chips, field labels, tags |

### Spacing

Named spacing tokens: `xs` (8px), `sm` (16px), `md` (24px), `lg` (48px), `xl` (80px), `gutter` (24px), `margin-safe` (32px). Favor `lg` and `xl` gaps between major sections to achieve the airy, minimalist rhythm.

Layout: 12-column fixed grid, 1200px max-width desktop. Storytelling sections → centered. Shopping/functional UI → left-aligned.

### Components

- **Buttons (primary):** `bg-on-surface text-surface rounded px-sm py-xs transition-all duration-300` — solid dark with white text. Slow 300ms transitions.
- **Buttons (secondary):** Transparent background, `border border-outline-variant rounded`, same slow transition.
- **Input fields:** `border-b border-outline-variant` or full 4-sided border. Labels: `text-label-sm uppercase tracking-label` above the field.
- **Product cards:** `bg-surface-container-lowest rounded-lg` — white fill, no border, separated by whitespace or `bg-primary-container` tint. Generous internal padding.
- **Chips / Tags:** `rounded-full bg-primary-container text-label-sm` — pill-shaped, no border, light fill.
- **Navigation:** Centered persistent header, `bg-surface/80 backdrop-blur-[10px]`.
- **Images:** All product photography uses warm-tone treatment. Always use `NgOptimizedImage`.

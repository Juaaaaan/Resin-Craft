# Resin Craft Art — Copilot Instructions

## Project overview

Resin Craft Art (RCA) is an Angular 21 SSR e-commerce application for handmade resin jewelry.
It uses zoneless change detection, Signals-first state management, Supabase as the backend,
Transloco for i18n, and Tailwind v4 with a custom design system called Artisanal Ether.

## Stack

- **Framework:** Angular 21 with SSR (`@angular/ssr`) and Express
- **Change detection:** Zoneless (`provideZonelessChangeDetection()`). No Zone.js.
- **State:** Signals and `computed()`. No NgRx, no BehaviorSubject for local state.
- **Database:** Supabase (PostgreSQL + Storage + Realtime + RLS)
- **Styling:** Tailwind v4 with custom tokens defined in `src/tailwind.css`
- **i18n:** Transloco with separate browser/SSR loaders
- **Testing:** Karma/Jasmine for unit tests, minimum 80% coverage per file
- **Linting:** ESLint with `angular-eslint` covering `.ts` and `.html`
- **Commits:** Conventional Commits (`feat(rca-XX): description`)
- **Pre-commit hook:** Husky runs `npm test` automatically

## TypeScript conventions

- Strict type checking enabled
- Prefer type inference when the type is obvious
- Never use `any`. Use `unknown` when type is uncertain.

## Angular conventions

- Always use standalone components. Never use NgModules.
- Never set `standalone: true` inside decorators — it is the default.
- Use `input()` and `output()` functions instead of `@Input` and `@Output` decorators.
- Use `inject()` instead of constructor injection.
- Use `computed()` for derived state.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every `@Component`.
- Use native control flow: `@if`, `@for`, `@switch`. Never use `*ngIf`, `*ngFor`, `*ngSwitch`.
- Never use `@HostBinding` or `@HostListener`. Use the `host` object in the decorator instead.
- Never use `ngClass`. Use `class` bindings.
- Never use `ngStyle`. Use `style` bindings.
- Never use `mutate` on signals. Use `update` or `set`.
- Use `NgOptimizedImage` for all static images. Does not work for base64 images.
- Use `providedIn: 'root'` for singleton services.
- Prefer Reactive forms over Template-driven forms.
- Keep templates simple. No complex logic in templates.

## Component generation

```bash
ng generate component path/to/name
ng generate service path/to/name
ng generate pipe path/to/name
```

Components use SCSS by default (configured in `angular.json`). Prefix: `app`.

## Commands

```bash
npm start                          # Dev server at http://localhost:4200
npm run build                      # Production build → dist/
npm run watch                      # Dev build with watch mode
npm test                           # Unit tests with Karma/Jasmine
npm run test:coverage              # Unit tests with coverage report
npm run lint                       # ESLint
npm run lint -- --fix              # ESLint with auto-fix
npm run serve:ssr:Resin-Craft-Art  # SSR server at http://localhost:4000
```

To run a single test file: `npx ng test --include='**/path/to/file.spec.ts'`

## Architecture

- `src/main.ts` — client-side bootstrap
- `src/main.server.ts` — server-side bootstrap
- `src/server.ts` — Express server
- `src/app/app.routes.server.ts` — per-route render mode
- `src/app/app.config.ts` — app providers
- `src/styles.scss` — global styles
- `src/tailwind.css` — Tailwind v4 design tokens

## Design system — Artisanal Ether

Brand: tactile craftsmanship meets ethereal beauty. UI is gallery-like, minimalist, soft.

### Color tokens (Tailwind v4)

| Role             | Token                                 |
| ---------------- | ------------------------------------- |
| Page canvas      | `bg-surface` (#fff8f4)                |
| Card / highlight | `bg-surface-container-lowest` (white) |
| Borders          | `border-outline-variant` (#d0c4bc)    |
| Body text        | `text-on-surface` (#1f1b18)           |
| Secondary text   | `text-on-surface-variant` (#4d453f)   |
| CTA              | `bg-primary` (#685c52)                |
| Accent           | `bg-primary-container` (#f5e4d7)      |

Avoid heavy shadows. Use `border border-outline-variant` (1px) for component boundaries.

### Typography

| Scale    | Class                                                            | Font            | Use             |
| -------- | ---------------------------------------------------------------- | --------------- | --------------- |
| h1       | `text-h1 font-serif tracking-h1`                                 | Noto Serif 48px | Hero            |
| h2       | `text-h2 font-serif tracking-h2`                                 | Noto Serif 32px | Sections        |
| h3       | `text-h3 font-serif`                                             | Noto Serif 24px | Sub-sections    |
| body-lg  | `text-body-lg font-sans`                                         | Manrope 18px    | Lead paragraphs |
| body-md  | `text-body-md font-sans`                                         | Manrope 16px    | Body copy       |
| label-sm | `text-label-sm font-sans font-semibold tracking-label uppercase` | Manrope 12px    | Labels, chips   |

### Spacing tokens

`xs` (8px), `sm` (16px), `md` (24px), `lg` (48px), `xl` (80px), `gutter` (24px), `margin-safe` (32px).

### Component patterns

- **Buttons (primary):** `bg-on-surface text-surface rounded px-sm py-xs transition-all duration-300`
- **Buttons (secondary):** transparent + `border border-outline-variant rounded`
- **Input fields:** `border-b border-outline-variant` — labels use `text-label-sm uppercase tracking-label`
- **Product cards:** `bg-surface-container-lowest rounded-lg` — no border, generous padding
- **Chips:** `rounded-full bg-primary-container text-label-sm`
- **Navigation:** centered persistent header, `bg-surface/80 backdrop-blur-[10px]`

Layout: 12-column fixed grid, 1200px max-width. Favor `lg` and `xl` gaps between sections.

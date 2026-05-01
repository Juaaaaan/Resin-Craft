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

# Reglas Angular — Resin Craft Art

Estas reglas se aplican a **todos los ficheros Angular** del proyecto.
Stack: **Angular 21 · SSR · Zoneless · Signals · Tailwind v4 · SCSS**

---

## Componentes

- Siempre `ChangeDetectionStrategy.OnPush` en `@Component`
- **Nunca** incluir `standalone: true` (es el default en Angular 21)
- Usar `input()` y `output()` — nunca `@Input` / `@Output`
- Usar `model()` para two-way binding cuando sea necesario
- `inject()` para dependencias — nunca constructor injection
- Componentes pequeños y con responsabilidad única
- Templates inline para componentes pequeños (< ~10 líneas de template)
- **Nunca** `ngClass` → usar `[class]` bindings
- **Nunca** `ngStyle` → usar `[style]` bindings
- **Nunca** `@HostBinding` / `@HostListener` → usar el objeto `host` del decorador

```typescript
// ✅ Correcto
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.active]': 'isActive()' },
  template: `...`
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
  private cartService = inject(CartService);
}

// ❌ Incorrecto
@Component({ standalone: true, ... })
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  constructor(private cartService: CartService) {}
}
```

---

## Estado con Signals

- `signal()` para estado local mutable
- `computed()` para estado derivado — nunca calcular en el template
- `effect()` solo cuando es estrictamente necesario (efectos secundarios reales)
- `update()` o `set()` para mutar signals — **nunca** `.mutate()`
- Estado compartido entre componentes → servicio con signals

```typescript
// ✅
const count = signal(0);
count.update((v) => v + 1);
const doubled = computed(() => count() * 2);

// ❌
count.mutate((v) => {
  v++;
}); // mutate eliminado en Angular 17+
```

---

## Templates

- Control flow nativo: `@if`, `@for`, `@switch` — **nunca** `*ngIf`, `*ngFor`, `*ngSwitch`
- `@for` siempre con `track` explícito (usar `id` o índice si no hay otro identificador)
- Lógica de negocio fuera del template; si necesitas más de una expresión, muévelo a `computed()`
- Pipe `async` para observables (o mejor, convertir a signal con `toSignal()`)
- Imágenes estáticas: **siempre** `NgOptimizedImage` (`ngSrc`, no `src`)
  - No funciona con imágenes base64 inline

```html
<!-- ✅ -->
@for (product of products(); track product.id) {
<app-product-card [product]="product" />
} @if (isLoading()) {
<app-skeleton />
} @else {
<app-product-list />
}

<!-- ❌ -->
<app-product-card *ngFor="let p of products" [product]="p" />
```

---

## Servicios

- `providedIn: 'root'` para servicios singleton
- `inject()` para consumir servicios
- Una responsabilidad por servicio
- Estado del servicio expuesto como `signal` o `computed` de solo lectura

---

## Routing y Lazy Loading

- Todas las rutas de features con lazy loading (`loadComponent` o `loadChildren`)
- Render mode definido en `app.routes.server.ts` (`RenderMode.Prerender` por defecto)
- Guards como funciones (`CanActivateFn`) — no clases

---

## SSR — Reglas críticas

- **Nunca** acceder a `window`, `document`, `localStorage` o `navigator` directamente
- Usar `isPlatformBrowser(inject(PLATFORM_ID))` o `afterNextRender(() => {...})`
- No crear efectos secundarios en constructores
- El servidor Express está en `src/server.ts` — rutas API bajo `/api/`

```typescript
// ✅ Acceso seguro al browser
readonly platformId = inject(PLATFORM_ID);

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // código solo browser
  }
}
```

---

## Generación de código

```bash
ng generate component path/to/name   # genera con SCSS y standalone por defecto
ng generate service path/to/name
ng generate pipe path/to/name
```

---

## Scripts disponibles

```bash
npm start                          # Dev server → http://localhost:4200
npm run build                      # Build producción → dist/
npm run watch                      # Build con watch
npm test                           # Unit tests (Karma/Jasmine)
npm run test:coverage              # Tests con cobertura
npm run lint                       # ESLint (TS + templates Angular)
npm run lint -- --fix              # Autofixer
npm run serve:ssr:Resin-Craft-Art  # SSR server → http://localhost:4000
```

Para un único fichero de test:

```bash
npx ng test --include='**/path/to/file.spec.ts'
```

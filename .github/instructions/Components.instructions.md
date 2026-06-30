---
applyTo: '**/*.component.ts'
---

# Component conventions — Resin Craft Art

## Required decorator configuration

Every component must have:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
```

Never omit `OnPush`. Never set `standalone: true` — it is the default in Angular 21.

## Inputs and outputs

Always use the functional API:

```typescript
// ✅ Correct
readonly product = input<Product>();
readonly selected = output<Product>();

// ❌ Wrong
@Input() product: Product;
@Output() selected = new EventEmitter<Product>();
```

## Dependency injection

Always use `inject()`:

```typescript
// ✅ Correct
private readonly productService = inject(ProductService);

// ❌ Wrong
constructor(private productService: ProductService) {}
```

## State management

```typescript
// Local state
readonly count = signal(0);

// Derived state
readonly doubled = computed(() => this.count() * 2);

// Update
this.count.update(c => c + 1);  // ✅
this.count.set(5);               // ✅
this.count.mutate(...);          // ❌ Never use mutate
```

## Template rules

- Use native control flow: `@if`, `@for`, `@switch`
- Never use `*ngIf`, `*ngFor`, `*ngSwitch`
- Never use `ngClass` — use `class` bindings
- Never use `ngStyle` — use `style` bindings
- Keep templates simple — no complex logic

```html
<!-- ✅ Correct -->
@if (product()) {
<span [class.active]="isActive()">{{ product().name }}</span>
}

<!-- ❌ Wrong -->
<span *ngIf="product" [ngClass]="{ active: isActive }">{{ product.name }}</span>
```

## Host bindings

Use the `host` object in the decorator, never `@HostBinding` or `@HostListener`:

```typescript
// ✅ Correct
@Component({
  host: {
    '[class.active]': 'isActive()',
    '(click)': 'onClick()'
  }
})

// ❌ Wrong
@HostBinding('class.active') isActive = false;
@HostListener('click') onClick() {}
```

## Images

Always use `NgOptimizedImage` for static images:

```html
<img ngSrc="/assets/logo.png" width="120" height="40" alt="Resin Craft Art" priority />
```

Never use `<img src="...">` for static images. `NgOptimizedImage` does not work with base64.

## Design system tokens

Always use Artisanal Ether tokens — never hardcode colors or sizes:

```html
<!-- ✅ Correct -->
<div class="bg-surface text-on-surface border border-outline-variant rounded px-sm py-xs">
  <!-- ❌ Wrong -->
  <div style="background: #fff8f4; color: #1f1b18;"></div>
</div>
```

Key tokens: `bg-surface`, `bg-surface-container-lowest`, `bg-primary`, `bg-primary-container`,
`text-on-surface`, `text-on-surface-variant`, `border-outline-variant`,
`px-sm`, `py-xs`, `gap-md`, `text-body-md`, `font-serif`, `font-sans`.

## Services

```typescript
// Always providedIn root for singletons
@Injectable({ providedIn: 'root' })
export class ProductService { ... }
```

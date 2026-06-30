# SPEC.md — Resin Craft Art (RCA)
> Versión: 1.0 · Generado: 2026-06-16 · Fuente: Jira RCA  
> Este documento está optimizado para consumo por IA (Claude Code, Cursor, Copilot, etc.).  
> Léelo completo antes de generar código. No omitas secciones.

---

## 1. Visión del producto

Resin Craft Art es una tienda e-commerce de artesanía en resina epoxi hecha a mano, orientada al mercado español. La cliente es una artesana individual que vende piezas únicas (pendientes, llaveros, marcos, bandejas, etc.) con opción de encargo personalizado.

**Objetivo técnico:** construir una web SSR con Angular 21, rápida, SEO-friendly y fácil de mantener por una sola persona no técnica (la artesana gestiona stock y pedidos desde el Dashboard de Supabase, no hay panel de administración propio).

**Idiomas:** español (es) por defecto, inglés (en) como segundo idioma. Gestión i18n con Transloco.

**Usuarios:**
- **Visitante / Cliente:** navega, añade al carrito, compra o solicita encargo personalizado.
- **Artesana (propietaria):** gestiona stock, ve pedidos y recibe notificaciones por email. No hace login en la web.

---

## 2. Stack técnico

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Frontend | Angular 21 | SSR habilitado, zoneless, Signals-first |
| Estilos | Tailwind CSS v4 | Design tokens en `DESIGN.md` |
| Base de datos | Supabase (PostgreSQL) | RLS activo en todas las tablas |
| Storage | Supabase Storage | Bucket `product-images`, público |
| Realtime | Supabase Realtime | Suscripción a `stock_items` |
| i18n | Transloco | Loaders separados browser/SSR |
| Pagos | Stripe | Tarjeta + Bizum (España) |
| Email | Resend | Emails transaccionales |
| Edge Functions | Supabase Edge Functions | Deno runtime |
| Hosting | Vercel | Build SSR de Angular |
| Calidad | Husky + ESLint + commitlint | Cobertura mínima de tests: 80% |
| Control de versiones | GitHub | Convención: `feat(rca-XX): descripción` |

---

## 3. Arquitectura de la aplicación

### 3.1 Estructura de carpetas

```
src/
├── app/
│   ├── core/                     # Servicios singleton, guards, interceptors
│   │   ├── services/
│   │   │   ├── product.service.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── stock.service.ts
│   │   │   ├── shipping.service.ts
│   │   │   └── custom-order.service.ts
│   │   └── supabase.client.ts
│   ├── shared/
│   │   ├── ui/                   # Componentes primitivos (Fase 2)
│   │   │   ├── app-button/
│   │   │   ├── app-input/
│   │   │   ├── app-textarea/
│   │   │   ├── app-select/
│   │   │   ├── app-radio-group/
│   │   │   ├── app-badge/
│   │   │   └── app-modal/
│   │   └── domain/               # Componentes de dominio
│   │       ├── app-product-card/
│   │       └── app-cart-drawer/
│   ├── layout/
│   │   ├── app-navbar/
│   │   └── app-footer/
│   └── pages/
│       ├── home/                 # /
│       ├── colecciones/          # /colecciones
│       ├── stock/                # /stock
│       ├── personaliza/          # /personaliza
│       ├── cuidados/             # /cuidados
│       └── contacto/             # /contacto
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
supabase/
└── functions/
    ├── create-checkout-session/
    └── stripe-webhook/
```

### 3.2 Principios de arquitectura

- **Signals-first:** todo el estado local usa `signal()` y `computed()`. No usar `BehaviorSubject` para estado nuevo.
- **Zoneless:** `provideExperimentalZonelessChangeDetection()` activo. No usar `NgZone.run()`.
- **SSR-safe:** todo acceso a APIs de browser (`window`, `document`, `localStorage`) debe ir precedido de `isPlatformBrowser(platformId)`. Nunca acceder directamente.
- **Componentes standalone:** todos los componentes son standalone (`standalone: true`). No usar NgModules.
- **OnPush por defecto:** todos los componentes usan `changeDetection: ChangeDetectionStrategy.OnPush`.
- **inject():** usar la función `inject()` en lugar de inyección por constructor donde sea posible.

### 3.3 Convención de nomenclatura de componentes

| Tipo | Prefijo | Ejemplo |
|------|---------|---------|
| UI primitivo | `app-` | `app-button`, `app-modal` |
| Dominio | `app-` | `app-product-card`, `app-cart-drawer` |
| Layout | `app-` | `app-navbar`, `app-footer` |
| Página | (sin prefijo, en carpeta `/pages`) | `home.component.ts` |

---

## 4. Rutas de la aplicación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `HomeComponent` | Hero, categorías destacadas, productos featured, proceso artesanal |
| `/colecciones` | `ColeccionesComponent` | Bento grid asimétrico de colecciones |
| `/stock` | `StockComponent` | Catálogo grid 4 columnas con filtros |
| `/personaliza` | `PersonalizaComponent` | Formulario reactivo de encargo (6 pasos) |
| `/cuidados` | `CuidadosComponent` | Tiempos de curado e instrucciones de cuidado |
| `/contacto` | `ContactoComponent` | Formulario de contacto + links directos (WhatsApp, email) |

Todas las rutas son lazy-loaded. El layout (navbar + footer) se aplica en el componente raíz `AppComponent`.

---

## 5. Modelos de datos

### 5.1 Base de datos Supabase (PostgreSQL)

#### `products`
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
name        text NOT NULL
slug        text UNIQUE NOT NULL        -- URL-friendly, ej: "pendientes-resina-azul"
description text
price       numeric(10,2) NOT NULL
category_id uuid REFERENCES categories(id)
collection  text                        -- nombre de la colección, nullable
is_active   boolean DEFAULT true
created_at  timestamptz DEFAULT now()
```

#### `product_images`
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id  uuid REFERENCES products(id) ON DELETE CASCADE
url         text NOT NULL               -- URL pública de Supabase Storage
alt_text    text
is_primary  boolean DEFAULT false
sort_order  int DEFAULT 0
```

#### `stock_items`
```sql
id          uuid PRIMARY KEY DEFAULT gen_random_uuid()
product_id  uuid REFERENCES products(id) ON DELETE CASCADE UNIQUE
quantity    int NOT NULL DEFAULT 0
updated_at  timestamptz DEFAULT now()
```

#### `categories`
```sql
id    uuid PRIMARY KEY DEFAULT gen_random_uuid()
name  text NOT NULL
slug  text UNIQUE NOT NULL
```

> **RLS:** todas las tablas tienen RLS activo. Los SELECT son públicos (anon key). Los INSERT/UPDATE/DELETE requieren service_role key (solo desde Edge Functions).

### 5.2 Modelos TypeScript

```typescript
// product.model.ts
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  categoryId: string | null;
  collection: string | null;
  isActive: boolean;
  images: ProductImage[];
  stock?: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

// cart.model.ts
export interface CartItem {
  product: Product;
  quantity: number;
}

// shipping.model.ts
export type ShippingMethod = 'ordinary' | 'certified' | 'pickup';

export interface ShippingOption {
  method: ShippingMethod;
  label: string;
  price: number;
  estimatedDays: string;
}

// custom-order.model.ts
export interface CustomOrderForm {
  pieceType: string;
  color: string;
  size: string;
  resinType: string;
  hardware: string;
  description: string;
}
```

### 5.3 Supabase Storage

- **Bucket:** `product-images` (público)
- **Método de upload:** `uploadProductImage(file: File, productId: string): Promise<string>`
- **URL pública:** `https://<project>.supabase.co/storage/v1/object/public/product-images/<path>`
- **Placeholders actuales:** `picsum.photos` — serán reemplazados en Fase 6 (RCA-43)

---

## 6. Servicios principales

### 6.1 `CartService` (RCA-29)

Gestiona el estado del carrito con Signals. Sin persistencia (se resetea al cerrar el navegador).

```typescript
// API esperada
items: Signal<CartItem[]>
total: Signal<number>          // computed: suma de price * quantity
itemCount: Signal<number>      // computed: suma de quantities

addItem(product: Product): void
removeItem(productId: string): void
updateQuantity(productId: string, quantity: number): void
clear(): void
setShipping(method: ShippingMethod): void
shipping: Signal<ShippingMethod | null>
```

### 6.2 `StockService` (RCA-30)

Suscripción en tiempo real a `stock_items` via Supabase Realtime. Actualiza la UI automáticamente cuando el stock cambia.

```typescript
// API esperada
getStock(productId: string): Signal<number>
isAvailable(productId: string): Signal<boolean>
// Suscripción iniciada en el constructor con takeUntilDestroyed()
```

### 6.3 `ShippingService` (RCA-31)

Lógica de costes de envío. El umbral de envío gratuito está pendiente de confirmar con la cliente (RCA-47).

```typescript
// API esperada
options: ShippingOption[]    // Correo ordinario, certificado, recogida en persona
calculateCost(method: ShippingMethod, subtotal: number): number
FREE_SHIPPING_THRESHOLD: number    // pendiente confirmar
```

### 6.4 `ProductService` (RCA-33)

Queries a Supabase para gestión de productos.

```typescript
// API esperada
getProducts(filters?: { categoryId?: string; collection?: string }): Promise<Product[]>
getProductBySlug(slug: string): Promise<Product | null>
getFeaturedProducts(limit?: number): Promise<Product[]>
```

### 6.5 `CustomOrderService` (RCA-32)

Envío del formulario de encargo personalizado. No genera pedido ni cargo. Notifica a la artesana vía Resend.

```typescript
// API esperada
submitOrder(form: CustomOrderForm): Promise<void>
// Internamente llama a la Edge Function o directamente a Resend
```

---

## 7. Componentes UI — primitivos (Fase 2, todos ✅ Listo)

Todos los componentes primitivos están disponibles. Úsalos siempre en lugar de elementos HTML nativos sin estilo.

| Selector | Inputs principales | Notas |
|----------|-------------------|-------|
| `app-button` | `variant: 'primary' \| 'secondary' \| 'ghost'`, `disabled`, `type` | |
| `app-input` | `label`, `placeholder`, `formControlName` | Implementa ControlValueAccessor |
| `app-textarea` | `label`, `placeholder`, `formControlName`, `rows` | Implementa ControlValueAccessor |
| `app-select` | `label`, `options: {value, label}[]`, `formControlName` | Accesible, opciones dinámicas |
| `app-radio-group` | `options: {value, label}[]`, `formControlName` | Reactive forms |
| `app-badge` | `variant: 'default' \| 'success' \| 'warning' \| 'danger'` | Variantes de color |
| `app-modal` | `isOpen`, `title`, `(closed)` | CDK FocusTrap + portal overlay |

---

## 8. Componentes de dominio (Fase 3)

### 8.1 `app-product-card` (RCA-22)

Componente reutilizado en Home, Stock y Colecciones.

```typescript
// Inputs
@Input({ required: true }) product: Product
@Input() showStock = true

// Comportamiento
// - Imagen SSR-safe: usar NgOptimizedImage con placeholder
// - Badge de stock usando app-badge: "Disponible" / "Últimas unidades" / "Agotado"
// - Botón "Añadir al carrito" usa app-button variant="primary"
// - Precio formateado con CurrencyPipe (EUR, locale 'es-ES')
// - OnPush + Signals para reactividad de stock
```

### 8.2 `app-cart-drawer` (RCA-21)

Sidebar deslizante con el carrito. Estado gestionado con Signals desde `CartService`.

```typescript
// Inputs/Outputs
@Input() isOpen = false
@Output() closed = new EventEmitter<void>()

// Comportamiento
// - Lista de CartItems con cantidad editable
// - Subtotal y total calculados como computed()
// - Selector de modalidad de envío (ShippingService)
// - Botón "Finalizar compra" abre CheckoutModalComponent
// - Animación de entrada/salida con @angular/animations
```

### 8.3 `app-navbar` (RCA-20 — en curso)

```typescript
// Comportamiento
// - Logo + navegación principal (Inicio, Colecciones, Stock, Personaliza, Cuidados, Contacto)
// - Icono de carrito con badge de cantidad (CartService.itemCount)
// - Selector de idioma (Transloco)
// - SSR-safe: no acceder a window en init
// - Sticky con scroll shadow via IntersectionObserver (con isBrowser guard)
```

---

## 9. Páginas

### 9.1 Home `/` (RCA-23)

Secciones en orden:
1. **Hero:** imagen a pantalla completa, título, subtítulo, CTA "Ver colección"
2. **Categorías destacadas:** grid 3 columnas con imagen + nombre
3. **Productos destacados:** `app-product-card` en grid 4 columnas (fetched con `getFeaturedProducts(8)`)
4. **Proceso artesanal:** 4 pasos con iconos (diseño → molde → curado → acabado)

### 9.2 Colecciones `/colecciones` (RCA-24)

Bento grid asimétrico con las colecciones. Cada celda: imagen, nombre de colección, número de piezas. Click navega a `/stock?collection=slug`.

### 9.3 Stock `/stock` (RCA-25)

- Grid 4 columnas (responsive: 1 → 2 → 4)
- Filtros: por categoría (chips), por colección (select)
- Cada producto: `app-product-card`
- Loading state con skeleton cards

### 9.4 Personaliza `/personaliza` (RCA-26)

Formulario reactivo de 6 campos (no pasos/wizard, formulario único):
1. Tipo de pieza (select: pendientes, llavero, marco, bandeja, otro)
2. Color principal (input text)
3. Tamaño aproximado (radio-group: pequeño, mediano, grande)
4. Tipo de resina (radio-group: transparente, pigmentada, con inclusiones)
5. Hardware / accesorios (input text, nullable)
6. Descripción libre (textarea)

Submit llama a `CustomOrderService.submitOrder()`. Muestra estado de éxito/error.

### 9.5 Cuidados `/cuidados` (RCA-27)

Página estática con contenido editorial: tiempos de curado, instrucciones de limpieza, qué evitar (calor, luz directa, productos químicos), preguntas frecuentes.

### 9.6 Contacto `/contacto` (RCA-28)

- Formulario reactivo: nombre, email, asunto, mensaje
- Links directos: WhatsApp (número pendiente RCA-47), email directo
- Submit envía notificación a artesana vía Resend

---

## 10. Flujo de pago

### 10.1 Métodos de pago disponibles

| Método | Implementación | Estado |
|--------|---------------|--------|
| Tarjeta de crédito/débito | Stripe Elements | Fase 5 |
| Bizum | Stripe (Bizum España) | Fase 5 |
| Transferencia bancaria | Flujo manual (IBAN pendiente RCA-47) | Fase 5 |

### 10.2 Flujo Stripe (tarjeta y Bizum)

```
Cliente → CheckoutModal → Edge Function: create-checkout-session
       ← client_secret / redirect_url
       → Stripe Payment UI
       → (pago exitoso)
       → Stripe Event: checkout.session.completed
       → Edge Function: stripe-webhook
       → Supabase: actualiza stock_items
       → Resend: email confirmación a cliente + notificación a artesana
```

### 10.3 Flujo transferencia bancaria

```
Cliente → CheckoutModal (selecciona "Transferencia")
       → Muestra IBAN + concepto (número de pedido)
       → Resend: email instrucciones al cliente
       → Resend: notificación a artesana
       → Artesana verifica pago manualmente y envía producto
```

### 10.4 Edge Functions

#### `create-checkout-session`
- **Input:** `{ items: CartItem[], shippingMethod: ShippingMethod, paymentMethod: 'card' | 'bizum' }`
- **Output:** `{ clientSecret: string }` o `{ url: string }` para redirect
- **Runtime:** Deno (Supabase Edge)
- **Vars de entorno:** `STRIPE_SECRET_KEY`, `APP_URL`

#### `stripe-webhook`
- **Eventos escuchados:** `payment_intent.succeeded`, `checkout.session.completed`
- **Acción:** decrementa `stock_items.quantity` para cada producto del pedido
- **Verificación:** `STRIPE_WEBHOOK_SECRET` (stripe.webhooks.constructEvent)
- **Runtime:** Deno (Supabase Edge)

---

## 11. i18n con Transloco

```typescript
// Configuración
TranslocoModule.forRoot({
  config: {
    availableLangs: ['es', 'en'],
    defaultLang: 'es',
    fallbackLang: 'es',
    reRenderOnLangChange: true,
  }
})

// Loaders separados para browser y SSR
// Browser: fetch() a /assets/i18n/{lang}.json
// SSR: readFileSync desde el filesystem

// Uso en plantillas
{{ 'home.hero.title' | transloco }}
// Uso en componentes
translocoService.translate('common.addToCart')
```

Archivos de traducción en `src/assets/i18n/es.json` y `src/assets/i18n/en.json`.

---

## 12. Variables de entorno

### Desarrollo (`.env` local)
```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
STRIPE_PUBLIC_KEY=pk_test_...
APP_URL=http://localhost:4200
```

### Edge Functions (Supabase secrets)
```
STRIPE_SECRET_KEY=sk_test_...       # sk_live_... en producción
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
APP_URL=https://resincraft.art       # dominio pendiente confirmar
```

### Producción (Vercel env vars)
```
SUPABASE_URL
SUPABASE_ANON_KEY
STRIPE_PUBLIC_KEY=pk_live_...
APP_URL
```

---

## 13. Convenciones de código

### Commits
```
feat(rca-XX): descripción corta en imperativo
fix(rca-XX): descripción del fix
chore: descripción de tarea de mantenimiento
```

### Nomenclatura de archivos
```
product.service.ts
product.model.ts
app-product-card.component.ts
app-product-card.component.html
app-product-card.component.scss (si aplica)
```

### Imports de Supabase
```typescript
// Siempre usar el cliente compartido
import { supabase } from '@core/supabase.client';
// Nunca instanciar createClient() directamente en servicios
```

### Guards SSR
```typescript
// Correcto
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

const platformId = inject(PLATFORM_ID);
if (isPlatformBrowser(platformId)) {
  // código que accede a window, document, localStorage
}

// Incorrecto — provoca error en SSR
window.scrollTo(0, 0);
```

### Signals — patrón de servicio
```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();
  readonly total = computed(() =>
    this._items().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );
}
```

---

## 14. SEO (Fase 6 — RCA-42)

Cada página configura sus meta tags en el resolver o en `ngOnInit`:

```typescript
// Patrón a seguir en cada página
this.title.setTitle('Resin Craft Art — Página Colecciones');
this.meta.updateTag({ name: 'description', content: '...' });
this.meta.updateTag({ property: 'og:title', content: '...' });
this.meta.updateTag({ property: 'og:image', content: '...' });
```

Sitemap en `/sitemap.xml` generado estáticamente durante el build.

---

## 15. Datos pendientes de confirmar con cliente (RCA-47)

> ⚠️ No hardcodear estos valores. Usar constantes o variables de entorno hasta confirmar.

| Dato | Estado |
|------|--------|
| Umbral de envío gratuito (€) | Pendiente |
| IBAN para transferencia bancaria | Pendiente |
| Número de WhatsApp (enlace directo) | Pendiente |
| Email para notificaciones de encargos | Pendiente |
| Fotografías reales de productos | Pendiente (actualmente: picsum.photos) |
| Dominio definitivo | Pendiente |

---

## 16. Estado actual del proyecto (2026-06-16)

| Fase | Progreso |
|------|----------|
| Fase 1 — Setup y Fundamentos | ✅ 7/7 tareas completadas |
| Fase 2 — Componentes Primitivos | ✅ 6/6 tareas completadas |
| Fase 3 — Páginas y Componentes | 🟡 1/8 en curso (navbar/footer casi terminado) |
| Fase 4 — Estado y Servicios | 🔵 0/6 iniciadas |
| Fase 5 — Pagos y Notificaciones | 🔵 0/6 iniciadas |
| Fase 6 — Producción y Despliegue | 🔵 0/7 iniciadas |

**Próximo hito:** completar Fase 3 (páginas y componentes de dominio).

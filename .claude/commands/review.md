# Code Review — Resin Craft Art

Realiza una revisión exhaustiva del código indicado o, si no se especifica nada, del diff actual (`git diff HEAD`).

## Qué revisar

### Angular & TypeScript

- [ ] Componentes usan `ChangeDetectionStrategy.OnPush`
- [ ] Estado gestionado con `signal()` y `computed()`, nunca con propiedades mutables directas
- [ ] Se usa `input()` / `output()` en lugar de decoradores `@Input` / `@Output`
- [ ] Se usa `inject()` en lugar de constructor injection
- [ ] No hay uso de `ngClass`, `ngStyle`, `@HostBinding` ni `@HostListener`
- [ ] Control flow usa `@if`, `@for`, `@switch` (no `*ngIf`, `*ngFor`)
- [ ] Imágenes estáticas usan `NgOptimizedImage`
- [ ] Servicios singleton tienen `providedIn: 'root'`
- [ ] No se usa `standalone: true` en decoradores (es el valor por defecto en Angular 21)
- [ ] Lazy loading aplicado en rutas de features
- [ ] No hay uso de `any`; se usa `unknown` cuando el tipo es incierto

### SSR / Hydration

- [ ] No hay acceso directo a `window`, `document` o `localStorage` sin guard de plataforma
- [ ] Se usa `isPlatformBrowser` o `afterNextRender` cuando sea necesario
- [ ] No hay efectos secundarios en constructores que rompan la hidratación
- [ ] `withEventReplay()` no se duplica

### Design System — Artisanal Ether

- [ ] Se usan tokens de Tailwind (`bg-surface`, `text-on-surface`, etc.), no valores hex en línea
- [ ] Tipografía sigue la escala definida (`text-h1 font-serif`, `text-body-md font-sans`, etc.)
- [ ] Botones primarios: `bg-on-surface text-surface rounded px-sm py-xs transition-all duration-300`
- [ ] Bordes usan `border-outline-variant` (nunca sombras pesadas)
- [ ] Espaciado usa tokens (`xs`, `sm`, `md`, `lg`, `xl`, `gutter`) — no valores arbitrarios salvo excepción justificada
- [ ] Fondos de cards: `bg-surface-container-lowest rounded-lg`
- [ ] Chips: `rounded-full bg-primary-container text-label-sm`
- [ ] Transiciones lentas (300ms) en elementos interactivos

### Calidad general

- [ ] Sin console.log ni código de debug
- [ ] Sin TODOs sin ticket asociado
- [ ] Lógica de negocio fuera de templates
- [ ] Tests unitarios cubiertos para lógica nueva (si aplica)

## Formato de salida

Para cada problema encontrado, responde con:

**[NIVEL]** `ruta/al/fichero.ts` — línea X

> Descripción del problema

**Niveles:** `🔴 BLOCKER` | `🟡 WARNING` | `🔵 SUGGESTION`

Al final, incluye un resumen: cuántos blockers, warnings y suggestions, y una valoración global.

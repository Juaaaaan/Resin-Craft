# Fix Issue — Resin Craft Art

Analiza y corrige el problema indicado: $ARGUMENTS

## Proceso que debes seguir

### 1. Entender antes de tocar

- Lee los ficheros relevantes antes de proponer ningún cambio
- Identifica la causa raíz, no solo el síntoma
- Si el issue es ambiguo, pregunta UNA sola cosa antes de continuar

### 2. Planificar

- Describe en 2-3 líneas qué vas a cambiar y por qué
- Indica qué ficheros se verán afectados
- Advierte si el fix puede tener efectos secundarios en SSR o hidratación

### 3. Implementar respetando el stack

- Angular 21 standalone, zoneless (`provideZonelessChangeDetection`)
- Signals para estado: `signal()`, `computed()`, `effect()` cuando sea estrictamente necesario
- `inject()` para dependencias, nunca constructor injection
- `@if` / `@for` nativos en templates, nunca directivas estructurales legacy
- `NgOptimizedImage` para imágenes estáticas
- SCSS para estilos de componente, Tailwind v4 para utilidades

### 4. Verificar

Tras el fix, confirma mentalmente:

- [ ] ¿El cambio rompe algo en SSR (`src/server.ts`, `app.routes.server.ts`)?
- [ ] ¿Se mantiene `OnPush` en los componentes modificados?
- [ ] ¿Los tokens del Design System Artisanal Ether siguen intactos?
- [ ] ¿Hay que actualizar algún test en `*.spec.ts`?
- [ ] ¿El linter (`npm run lint`) pasaría sin errores?

### 5. Resumen del fix

Termina con un bloque así:

---

**Ficheros modificados:** lista
**Causa raíz:** una línea
**Solución aplicada:** una línea
**Cómo verificarlo:** comando o paso manual

---

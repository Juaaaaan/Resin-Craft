# task-rca-20.md — app-navbar y app-footer definitivos

**Issue Jira:** RCA-20
**Épica:** RCA-3 — Páginas y Componentes
**Estado:** 🟡 En curso
**Rama:** `feature/rca-20-navbar-footer-ssr-i18n`

---

## Objetivo

Implementar el `app-navbar` y el `app-footer` definitivos del proyecto Resin Craft Art,
con soporte completo de SSR e i18n mediante Transloco.

---

## Contexto

El navbar y el footer son los componentes de layout base que aparecen en todas las páginas
de la aplicación. Deben funcionar correctamente tanto en el servidor (SSR) como en el cliente,
y mostrar los textos traducidos con Transloco. Son un prerequisito para avanzar con el resto
de páginas (RCA-22, RCA-23).

---

## Funcionalidad esperada

### app-navbar

- Logo de la marca (Resin Craft Art) alineado a la izquierda
- Navegación principal con enlaces a las secciones:
  - Home (`/`)
  - Colecciones (`/colecciones`)
  - Stock (`/stock`)
  - Personaliza (`/personaliza`)
  - Cuidados (`/cuidados`)
  - Contacto (`/contacto`)
- Comportamiento sticky — se mantiene visible al hacer scroll
- Fondo semitransparente con blur: `bg-surface/80 backdrop-blur-[10px]`
- Todos los textos traducibles con Transloco
- Compatible con SSR — no usar `window`, `document` ni APIs de navegador directamente

### app-footer

- Logo o nombre de la marca
- Links secundarios: política de privacidad, términos, contacto
- Texto de copyright con año dinámico
- Todos los textos traducibles con Transloco
- Compatible con SSR

---

## Criterios de aceptación

- [ ] El navbar se renderiza correctamente en SSR (sin errores de hidratación)
- [ ] El footer se renderiza correctamente en SSR (sin errores de hidratación)
- [ ] Los textos del navbar y footer aparecen traducidos en todos los idiomas configurados
- [ ] El navbar es sticky y visible en scroll en todas las páginas
- [ ] Los enlaces de navegación llevan a las rutas correctas
- [ ] El año del copyright en el footer es dinámico
- [ ] Cobertura de tests unitarios ≥ 80% en ambos componentes
- [ ] Sin errores de lint
- [ ] Build de producción sin errores

---

## Convenciones a seguir

- Componentes standalone, sin NgModules
- `ChangeDetectionStrategy.OnPush`
- `inject()` para inyección de dependencias
- Tokens de diseño del sistema Artisanal Ether — no usar colores hardcodeados
- `NgOptimizedImage` para el logo si es una imagen estática
- Control flow nativo: `@if`, `@for` — no usar directivas estructurales

---

## Dependencias

- Transloco configurado con loaders browser/SSR (RCA-10 ✅)
- Layout base con `app-layout` (RCA-12 ✅)
- Design tokens de Tailwind v4 en `src/tailwind.css` (RCA-8 ✅)

---

## Notas técnicas

- Para evitar problemas de hidratación en SSR, no acceder a `window` ni `document` directamente.
  Usar `isPlatformBrowser` o `PLATFORM_ID` si es necesario detectar el entorno.
- El navbar usa `bg-surface/80 backdrop-blur-[10px]` — verificar que Tailwind genera
  correctamente las clases de opacidad con los tokens personalizados.

---

## Comandos de verificación

```bash
npm test                          # Tests unitarios
npm run test:coverage             # Cobertura — mínimo 80% por fichero
npm run lint                      # Linter
npm run build                     # Build de producción
npm run serve:ssr:Resin-Craft-Art # Verificar SSR en http://localhost:4000
```

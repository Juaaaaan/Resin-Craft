# TASK — RCA-28: Página Contacto (`/contacto`)

**Jira:** https://da-ju-ia-talks.atlassian.net/browse/RCA-28
**Especificación completa:** `spec.md` (mismo directorio) — léela entera antes de tocar código, es la fuente de verdad para contenido, validaciones, i18n y criterios de aceptación.
**Diseño visual:** MCP de Stitch, ya conectado en este entorno. Frame de referencia en Figma: `2:470` ("Contacto", 2560×1159px), archivo `Resin Craft Art`.

## Antes de empezar

1. Lee `spec.md` completo.
2. Consulta el diseño vía Stitch MCP para el frame de `/contacto`. Úsalo para confirmar: copy exacto del subtítulo y del botón CTA, opciones exactas del select "Subject", proporciones exactas del split 60/40, y estilo exacto del aside (orden de los links, iconografía).
3. Revisa `.claude/CLAUDE.md` (reglas de Angular/TypeScript del proyecto) y `DESIGN.md` (tokens) — no está permitido usar valores de color/spacing/tipografía que no sean tokens de `@theme`.
4. Mira `src/app/features/customize/customize.component.*` (o el HTML de referencia `personaliza_tu_pieza-code.html` si sigue en el repo) como ejemplo de un formulario ya maquetado en este proyecto con el mismo lenguaje visual (card con sombra, labels uppercase, aviso legal con icono). Reutiliza ese lenguaje, no inventes uno nuevo.
5. Confirma en `app.routes.ts` que la ruta `contacto` ya apunta a `./features/contact/contact.component` — si el archivo no existe todavía, créalo ahí.

## Qué construir

Componente `ContactComponent` (`src/app/features/contact/contact.component.ts`) con:

- Header de página (H1 + subtítulo) centrado, full width.
- Split 60/40: formulario (Full Name, Email, Subject, Message, aviso legal, botón submit) + aside (imagen, link WhatsApp, link email, ubicación del estudio).
- Formulario reactivo (`FormGroup`/`FormControl`) con las validaciones descritas en `spec.md` §8.
- Estados de envío con Signals (`isSubmitting`, `submitStatus`) — sin integración real de backend (eso es Fase 5, ver `spec.md` §7 y §13 para el detalle exacto de qué simular y qué dejar como `TODO`).
- Reutilización estricta de `app-input`, `app-select`, `app-textarea`, `app-button`, `app-navbar`, `app-footer`. Si te falta una prop en alguno de estos componentes (p.ej. `type="email"`, estado de error), amplíalo tú en `shared/components/UI/`, no la dupliques dentro de `contact/`.
- i18n: añade las keys nuevas listadas en `spec.md` §9 a `public/i18n/es.json` y `public/i18n/en.json`. Cero strings hardcodeados en el template.
- Placeholders de contacto (WhatsApp, email, dirección) claramente marcados como pendientes de confirmación con la clienta — nunca datos que parezcan reales. Ver `spec.md` §4.3.
- Tests unitarios (`contact.component.spec.ts`) cubriendo los 4 casos de `spec.md` §12.

## Al terminar, ejecuta y confirma que pasan

```bash
npm run lint
npm run test:coverage
npm run build
```

No des la tarea por terminada si alguno falla o si la cobertura global baja del 80%.

## Checklist final

Usa literalmente el checklist de Definition of Done de `spec.md` §14 antes de marcar la tarea como lista. Si hay algo que no puedas verificar (p.ej. el copy exacto de Stitch no queda claro, o el número de WhatsApp real), **no lo inventes**: déjalo como placeholder con `TODO` y anótalo para que Juan lo revise, no bloquees el resto del ticket por ello.

## Explícitamente fuera de alcance (no lo hagas aunque "de paso" sea fácil)

- Integración real de envío de email (Resend / Edge Function).
- Tabla nueva en Supabase para mensajes de contacto.
- Tocar `/personaliza`, `CustomOrderService`, `app-navbar` o `app-footer` más allá de consumirlos.
- Inventar datos de contacto reales (teléfono, dirección, email).

## Al terminar

Deja un resumen breve de:
- Qué keys de i18n añadiste (y en qué archivos).
- Si ampliaste algún componente `UI/` y qué prop nueva añadiste.
- Cualquier discrepancia entre lo que muestra Stitch/Figma y lo que dice `spec.md`, y qué decisión tomaste al respecto.

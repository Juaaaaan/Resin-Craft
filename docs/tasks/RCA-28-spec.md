# SPEC — Página `/contacto` (RCA-28)

> Especificación técnica y de contenido. Complementa (no sustituye) al diseño visual de Figma/Stitch.
> Cualquier ambigüedad entre este documento y el diseño visual se resuelve a favor del diseño visual — este documento existe para cubrir todo lo que una captura de pantalla NO dice (validaciones, estados, i18n, estructura de archivos, accesibilidad, SSR).

---

## 0. Referencia rápida

| Campo | Valor |
|---|---|
| Jira | [RCA-28](https://da-ju-ia-talks.atlassian.net/browse/RCA-28) — "Página Contacto (/contacto): formulario + links directos" |
| Ruta | `/contacto` |
| Figma frame | `2:470` — 2560 × 1159px (desktop reference) — archivo [Resin Craft Art](https://www.figma.com/design/kAEGwQ9NFWaPwyGqI0s8MT/Resin-Craft-Art) |
| Diseño en Claude Code | MCP de **Stitch** habilitado — úsalo como fuente de verdad visual (colores exactos de imágenes, proporciones, micro-espaciados) antes de dar por cerrado el layout |
| Fase del proyecto | Fase 3 — Páginas y Componentes (🚧 en curso) |
| Componente | `ContactComponent` en `src/app/features/contact/contact.component.ts` |

---

## 1. Objetivo

Construir la página de contacto directo de Resin Craft Art: un formulario de contacto genérico (no confundir con `/personaliza`, que es el formulario de encargo personalizado) más un panel lateral con vías de contacto directas (WhatsApp, email, ubicación del estudio).

**Esta página NO es el flujo de encargo personalizado.** Es un canal para preguntas generales, dudas sobre pedidos existentes, wholesale, prensa, etc. No debe reutilizar el `CustomOrderService` ni sus modelos.

---

## 2. Reglas de negocio aplicables

> ⚠️ **Regla crítica del proyecto** (aplica a todo formulario de contacto/comercial): ningún pedido se inicia, fabrica ni cobra sin conversación directa previa y pago posterior. Este formulario **solo genera un mensaje de contacto**, nunca un pedido. El aviso legal correspondiente (ver §5.2) debe estar presente y ser fiel a esta regla.

- No existe autenticación. No hay "mis mensajes" ni área privada.
- No existe todavía persistencia en Supabase para mensajes de contacto (no hay tabla `contact_messages` en el modelo de datos actual — ver §9, Fuera de alcance).
- El envío real del mensaje (Resend) es Fase 5. Este ticket es solo Fase 3: UI + validación cliente.

---

## 3. Layout general

Split **60/40** (formulario / aside), igual patrón que otras páginas del sitio (ver `/personaliza` como referencia de proporciones invertidas 40/60).

```
┌─────────────────────────────────────────────────────────┐
│  app-navbar (ya existe, reutilizar)                      │
├───────────────────────────────┬───────────────────────────┤
│                                │                             │
│   FORMULARIO (60%)             │   ASIDE (40%)               │
│   - H1 "Let's connect"         │   - Imagen joyería          │
│   - Subtítulo                  │     (445×334px ref.)        │
│   - Full name + Email (fila)   │   - Link WhatsApp (icono →) │
│   - Subject (select)           │   - Link Email (icono →)    │
│   - Message (textarea)         │   - Separador                │
│   - Aviso legal                │   - Studio Location + dirección │
│   - Botón CTA                  │                             │
│                                │                             │
├───────────────────────────────┴───────────────────────────┤
│  app-footer (ya existe, reutilizar)                        │
└─────────────────────────────────────────────────────────┘
```

### Breakpoints

| Breakpoint | Comportamiento |
|---|---|
| `md:` y superior (≥768px) | Split 60/40 en fila (`grid-cols-[3fr_2fr]` o `lg:grid-cols-5` con `lg:col-span-3` / `lg:col-span-2`) |
| Por debajo de `md:` | Una columna. **El formulario va primero, el aside después** (el usuario prioriza escribir; la info de contacto directo es secundaria en mobile) |

Usar el mismo breakpoint (`md`/`lg`) que ya usa `/personaliza` para su split, para mantener consistencia entre páginas de formulario.

---

## 4. Contenido detallado

### 4.1 Header de página (encima del split, full width, centrado — mismo patrón que `/personaliza` y `/cuidados`)

- **H1**: "Let's connect" — clase `text-h1 font-serif tracking-h1`
- **Subtítulo**: copy libre en tono de marca (slow fashion, artesanal). Ejemplo orientativo: algo que invite a escribir sin prisa, en `text-body-lg font-sans text-on-surface-variant`. **Confirmar copy exacto con Stitch/Figma** — si el frame no lo especifica con precisión, usar un subtítulo breve y cálido consistente con el resto del sitio (ver home: "Manifesting your intentions..." como referencia de tono en `/personaliza`).

### 4.2 Formulario (columna izquierda, 60%)

Contenedor: mismo tratamiento que la card de `/personaliza`:
`bg-surface-container-lowest p-lg rounded-xl shadow-[0_12px_32px_rgba(74,69,65,0.05)] border border-outline-variant`

Campos, en este orden:

1. **Full Name** (`app-input`, type `text`, requerido)
   - Label: `FULL NAME` (clase `font-label-sm text-label-sm text-on-surface-variant uppercase`)
   - En fila (`grid grid-cols-1 md:grid-cols-2 gap-gutter`) junto a Email
2. **Email Address** (`app-input`, type `email`, requerido)
   - Label: `EMAIL ADDRESS`
   - Misma fila que Full Name
3. **Subject** (`app-select`, requerido)
   - Label: `SUBJECT`
   - Opciones (a confirmar contra Stitch, usar como base):
     - `Custom Commission` (referido al valor visible en el frame Figma según guía del proyecto)
     - `Order Inquiry`
     - `Wholesale`
     - `Press / Collaboration`
     - `Other`
4. **Message** (`app-textarea`, requerido)
   - Label: `MESSAGE`
   - `rows` suficientes para varias líneas (referencia: 4-6, igual que `/personaliza`)
5. **Aviso legal** (mismo componente visual que `/personaliza`: icono `info` + texto en `bg-surface-container rounded-lg border border-tertiary-fixed-dim/30 p-sm`):
   > "Your order is not confirmed until we talk and payment is received."

   (Aunque este formulario no es de encargo, el aviso es el que especifica el frame Figma de `/contacto`; mantenerlo tal cual aparece en el diseño — es una salvaguarda general de la marca, no solo de `/personaliza`.)

6. **Botón CTA** (`app-button` variant `primary`, `type="submit"`, ancho completo)
   - Texto: `SEND MESSAGE` (o el texto exacto que muestre Stitch)

### 4.3 Aside (columna derecha, 40%)

1. **Imagen de joyería** — usar `NgOptimizedImage`. Placeholder de desarrollo: `https://picsum.photos/seed/contact-jewelry/445/334` (convención ya usada en el proyecto). Sustituir por Supabase Storage cuando haya foto real (Fase 6).
2. **Link directo WhatsApp** — icono + texto + flecha `→`. Debe ser un `<a>` con `href="https://wa.me/<NUMERO>"`. **El número de WhatsApp está pendiente de confirmación con la clienta** (ver `RCA — Preguntas abiertas.md` en Obsidian) → usar un valor placeholder claramente marcado, p. ej. `environment.contact.whatsappNumber` con un `TODO` y un número ficticio (`+34600000000`), **nunca hardcodear** un número real inventado en el componente.
3. **Link directo Email** — `mailto:` con el email de la artesana. **También pendiente de confirmación** → mismo patrón: variable de entorno con placeholder + TODO.
4. **Separador** (`border-t border-outline-variant`)
5. **Studio Location** — eyebrow `STUDIO LOCATION` (`font-label-sm uppercase`) + dirección. Dirección real no confirmada — usar placeholder claramente marcado como tal en el copy (p. ej. "Madrid, Spain" a nivel de ciudad, sin calle inventada) hasta que la clienta la confirme.

> ⚠️ No inventes datos de contacto reales (teléfono, email, dirección exacta). Cualquier dato de contacto en este ticket debe ser un placeholder evidente + variable de entorno + comentario `TODO`, nunca un valor que parezca real y pueda colarse a producción por error.

---

## 5. Componentes a reutilizar (Fase 2, ya existen — NO recrear)

| Selector | Uso en esta página |
|---|---|
| `app-navbar` | Header global |
| `app-footer` | Footer global |
| `app-input` | Full Name, Email |
| `app-select` | Subject |
| `app-textarea` | Message |
| `app-button` | Submit CTA |

Si alguno de estos componentes no soporta aún alguna prop necesaria (p. ej. `type="email"` en `app-input`, o mensaje de error asociado), **ampliar el componente existente en `shared/components/UI/`**, no crear una variante ad-hoc dentro de `contact/`.

No se crean componentes nuevos en `UI/` para esta tarea. Si el aside necesita lógica propia no trivial, puede extraerse como `contact-info/` dentro de `features/contact/components/`, pero por defecto inclúyelo inline en `ContactComponent` (la guía de arquitectura solo prevé subcomponentes para features con lógica compleja, y el aside es principalmente presentacional).

---

## 6. Estructura de archivos esperada

```
src/app/features/contact/
├── contact.component.ts
├── contact.component.html      (o template inline si es corto — decisión del agente)
├── contact.component.scss
└── contact.component.spec.ts
```

Routing: la ruta `'contacto'` **ya está declarada** en `app.routes.ts` apuntando a `./features/contact/contact.component` — verificar que el import/lazy load coincide exactamente con la ruta y nombre de export (`ContactComponent`) antes de dar la tarea por terminada.

---

## 7. Modelo de datos del formulario (cliente, sin persistencia)

```typescript
// features/contact/contact.model.ts (o inline en el componente si se prefiere)
export interface ContactFormData {
  fullName: string;
  email: string;
  subject: 'custom_commission' | 'order_inquiry' | 'wholesale' | 'press' | 'other';
  message: string;
}
```

Usar **Reactive Forms** (`FormGroup` con `FormControl` tipados) según convención del proyecto (`.claude/angular.md`: "Prefer Reactive forms instead of Template-driven ones"), no Signals-only para el formulario en sí (los Signals se reservan para estado derivado, ej. `submitting`, `submitted`).

Estado del componente (Signals):

```typescript
protected readonly isSubmitting = signal(false);
protected readonly submitStatus = signal<'idle' | 'success' | 'error'>('idle');
```

### Envío (submit handler)

**Fuera de alcance de RCA-28 la integración real con Resend/backend** (eso es Fase 5). Para este ticket:

- El botón debe ser funcional a nivel de formulario (valida, deshabilita mientras "envía", muestra estado).
- El submit handler debe llamar a un método `onSubmit()` que:
  1. Marca todos los controles como `touched` si el form es inválido y no continúa.
  2. Si es válido, setea `isSubmitting.set(true)`, y **deja un `TODO` explícito** para la futura llamada real (Fase 5 — Resend / Edge Function), simulando el envío con éxito tras un breve delay o resolviendo inmediatamente a `success`.
  3. Muestra el mensaje de éxito/error usando las keys i18n ya existentes: `contact.success` / `contact.error`.
- No crear ningún servicio nuevo con nombre definitivo tipo `ContactService` que llame a Supabase/Resend de verdad — si se crea un servicio, debe quedar explícitamente como stub (comentario `// TODO Fase 5: integrar Resend`), para no dar una falsa sensación de feature completa.

---

## 8. Validaciones

| Campo | Reglas |
|---|---|
| Full Name | `required`, `minLength(2)` |
| Email | `required`, `Validators.email` |
| Subject | `required` (no permitir el placeholder/opción vacía como válida) |
| Message | `required`, `minLength(10)` |

Mostrar errores solo tras `touched` o intento de submit (patrón estándar Angular), usando el `text-error`/`color-error` token (`#ba1a1a`) definido en `DESIGN.md`. Verificar si `app-input`/`app-textarea`/`app-select` ya soportan mostrar un estado de error (borde rojo + mensaje) — si no, es aceptable ampliarlos (ver §5).

---

## 9. i18n (Transloco)

Namespace existente `contact` en `public/i18n/es.json` / `en.json` ya tiene: `title`, `name`, `email`, `message`, `send`, `success`, `error`.

**Faltan keys que hay que añadir** (mismo patrón, ambos idiomas `es` y `en`):

```json
"contact": {
  "title": "...",            // ya existe
  "subtitle": "",             // NUEVO
  "name": "...",              // ya existe (usar para Full Name)
  "email": "...",             // ya existe
  "subject": "",               // NUEVO — label del select
  "subjectOptions": {          // NUEVO
    "customCommission": "",
    "orderInquiry": "",
    "wholesale": "",
    "press": "",
    "other": ""
  },
  "message": "...",            // ya existe
  "send": "...",               // ya existe
  "success": "...",            // ya existe
  "error": "...",              // ya existe
  "legalNotice": "",           // NUEVO — aviso de que no hay pedido sin conversación+pago
  "whatsapp": "",              // NUEVO — label del link
  "emailLink": "",             // NUEVO — label del link (distinto del campo "email" del form)
  "studioLocation": ""         // NUEVO
}
```

No inventar traducciones al inglés/español de baja calidad sin revisarlas: usar un tono consistente con el resto del copy de marca (cálido, artesanal, ver ejemplos en `es.json`/`en.json` actuales).

---

## 10. Accesibilidad

- Cada `app-input`/`app-select`/`app-textarea` debe tener `label` asociado vía `for`/`id` (ya debería venir resuelto por el propio componente `UI/`, pero verificarlo).
- El botón submit debe reflejar `aria-busy="true"` mientras `isSubmitting()` es `true`.
- El mensaje de éxito/error debe anunciarse con `aria-live="polite"` (no solo cambio visual).
- Los links de WhatsApp/email/dirección deben tener `aria-label` descriptivo además del texto visible (p. ej. "Contact us via WhatsApp").
- Contraste: todos los tokens de color del sistema ya cumplen AA — no introducir colores fuera de `DESIGN.md`.

---

## 11. SSR

- Ningún acceso a `window`/`localStorage`/`navigator` debería ser necesario para esta página. Si se añade algo como "copiar dirección al portapapeles", debe ir detrás de un guard `isBrowser` (patrón ya documentado en la guía del proyecto, `isPlatformBrowser`).
- Las imágenes deben usar `NgOptimizedImage`, no `<img>` plano.

---

## 12. Testing

- `contact.component.spec.ts`: cubrir al menos:
  - Creación del componente.
  - Formulario inválido al enviar vacío (no debe pasar a `isSubmitting`).
  - Formulario válido → `isSubmitting` pasa a `true` y luego el estado final (`success`).
  - Validación de email incorrecto.
- Cobertura mínima del proyecto: **80%** (`npm run test:coverage`), no bajar la media global.

---

## 13. Fuera de alcance (explícitamente, para que el agente no se extienda de más)

- ❌ Integración real de envío de email (Resend) — Fase 5.
- ❌ Persistencia en Supabase de mensajes de contacto (no existe tabla; no crearla en este ticket sin validarlo antes con Juan).
- ❌ Número de WhatsApp / email / dirección reales — son placeholders pendientes de confirmación con la clienta.
- ❌ Cualquier lógica de `CustomOrderService` (eso pertenece a `/personaliza`).
- ❌ Cambios en `app-navbar` / `app-footer` (ya existen, solo se consumen).

---

## 14. Checklist de Definition of Done

- [ ] `ContactComponent` standalone, `ChangeDetectionStrategy.OnPush`, creado en `features/contact/`
- [ ] Ruta `/contacto` renderiza el componente (verificado en `app.routes.ts`, ya declarada)
- [ ] Layout 60/40 responsive (una columna en mobile, formulario primero)
- [ ] Formulario reactivo con las 4 validaciones de §8
- [ ] Reutiliza `app-input`, `app-select`, `app-textarea`, `app-button` (sin duplicar UI)
- [ ] Aviso legal presente y con el texto correcto
- [ ] Aside con imagen (placeholder picsum), WhatsApp, email y ubicación como placeholders claramente marcados con `TODO`
- [ ] i18n: keys nuevas añadidas en `es.json` y `en.json` (§9), sin strings hardcodeados en el template
- [ ] `NgOptimizedImage` para la imagen del aside
- [ ] Sin accesos a browser APIs sin guard `isBrowser`
- [ ] Accesibilidad: labels, `aria-live`, `aria-busy`, `aria-label` en links
- [ ] Tests unitarios cubriendo los 4 casos de §12, cobertura global ≥80%
- [ ] `npm run lint` sin errores
- [ ] Visualmente validado contra el frame Figma `2:470` / Stitch MCP (colores, spacing, tipografía = tokens de `DESIGN.md`, no valores mágicos)

# Design System — Artisanal Ether

Sistema de diseño de **Resin Craft Art**. Todos los ficheros de UI deben respetar estas reglas.
Los tokens están definidos en `src/tailwind.css` vía `@theme`. Las fuentes se cargan en `src/index.html`.

---

## Personalidad de marca

Artesanía táctil + belleza etérea. La UI es **gallery-like**: recede para dejar que la fotografía de producto domine. Todo debe sentirse deliberado y suave, mimando el acabado de la resina pulida.

Estilo: **Minimalismo + Sofisticación Táctil**

---

## Colores — Paleta MD3 Tonal

Usa **siempre los tokens Tailwind**, nunca valores hex en línea.

| Rol                   | Token Tailwind                | Hex       | Uso                              |
| --------------------- | ----------------------------- | --------- | -------------------------------- |
| Fondo principal       | `bg-surface`                  | `#fff8f4` | Canvas de página, warm off-white |
| Cards / highlights    | `bg-surface-container-lowest` | `#ffffff` | Cards de producto, blanco puro   |
| Fondo tenue           | `bg-surface-container-low`    | `#fbf2ec` | Secciones alternadas             |
| Fondo sección         | `bg-surface-container`        | `#f5ece6` | Bloques de contenido             |
| Texto principal       | `text-on-surface`             | `#1f1b18` | Charcoal-brown, máximo contraste |
| Texto secundario      | `text-on-surface-variant`     | `#4d453f` | Muted brown, cuerpo              |
| CTA / acción primaria | `bg-primary`                  | `#685c52` | Botones primarios, warm brown    |
| Texto sobre primario  | `text-on-primary`             | `#ffffff` | Texto en botones primarios       |
| Acento / chip         | `bg-primary-container`        | `#f5e4d7` | Chips, blush fill                |
| Bordes / divisores    | `border-outline-variant`      | `#d0c4bc` | Soft taupe, 1px solid            |
| Bordes fuertes        | `border-outline`              | `#7f756e` | Bordes con más contraste         |
| Error                 | `text-error`                  | `#ba1a1a` | Mensajes de error                |

**Regla de oro:** Evita sombras pesadas. Define límites con `border border-outline-variant` (1px). Para elevación (modals, carrito flotante): `shadow-[0_12px_32px_rgba(74,69,65,0.05)]`.

---

## Tipografía

Fuentes: **Noto Serif** (editorial) + **Manrope** (funcional).

| Escala   | Clase Tailwind                                                   | Fuente     | Tamaño | Uso                    |
| -------- | ---------------------------------------------------------------- | ---------- | ------ | ---------------------- |
| h1       | `text-h1 font-serif tracking-h1`                                 | Noto Serif | 48px   | Hero headlines         |
| h2       | `text-h2 font-serif tracking-h2`                                 | Noto Serif | 32px   | Títulos de sección     |
| h3       | `text-h3 font-serif`                                             | Noto Serif | 24px   | Subsecciones           |
| body-lg  | `text-body-lg font-sans`                                         | Manrope    | 18px   | Párrafos lead          |
| body-md  | `text-body-md font-sans`                                         | Manrope    | 16px   | Cuerpo de texto        |
| label-sm | `text-label-sm font-sans font-semibold tracking-label uppercase` | Manrope    | 12px   | Chips, etiquetas, tags |

```html
<!-- ✅ Correcto -->
<h1 class="text-h1 font-serif tracking-h1 text-on-surface">Bespoke Creations</h1>
<p class="text-body-md font-sans text-on-surface-variant">Descripción de producto</p>
<span
  class="text-label-sm font-sans font-semibold tracking-label uppercase bg-primary-container rounded-full px-sm py-xs"
  >Organic Resin</span
>

<!-- ❌ Incorrecto -->
<h1 style="font-size: 48px; font-family: 'Noto Serif';">...</h1>
<p class="text-gray-500 text-base">...</p>
```

---

## Espaciado

Tokens nombrados definidos en `@theme`. Favorecer gaps `lg` y `xl` entre secciones principales.

| Token         | Valor | Uso                        |
| ------------- | ----- | -------------------------- |
| `xs`          | 8px   | Padding interno mínimo     |
| `sm`          | 16px  | Padding estándar           |
| `md`          | 24px  | Separación entre elementos |
| `lg`          | 48px  | Gap entre secciones        |
| `xl`          | 80px  | Gap entre bloques hero     |
| `gutter`      | 24px  | Gutter de grid             |
| `margin-safe` | 32px  | Margen lateral seguro      |

```html
<!-- ✅ Separación aireada entre secciones -->
<section class="py-xl">...</section>
<div class="gap-lg grid">...</div>

<!-- ❌ Valores arbitrarios sin necesidad -->
<section class="py-[80px]">...</section>
```

---

## Componentes — Patrones

### Botones

```html
<!-- Primario: sólido dark, texto blanco, transición lenta -->
<button
  class="bg-on-surface text-surface rounded px-sm py-xs transition-all duration-300 hover:opacity-90"
>
  INITIATE COMMISSION
</button>

<!-- Secundario: transparente, borde suave -->
<button
  class="border border-outline-variant rounded px-sm py-xs transition-all duration-300 text-on-surface hover:bg-surface-container-low"
>
  VIEW SERIES
</button>
```

### Cards de producto

```html
<div class="bg-surface-container-lowest rounded-lg p-md">
  <!-- Sin borde. Separación por whitespace o fondo tenue -->
</div>
```

### Chips / Tags

```html
<span
  class="rounded-full bg-primary-container text-label-sm font-semibold tracking-label uppercase px-sm py-xs"
>
  Gold Plated
</span>
```

### Campos de input

```html
<!-- Estilo underline minimalista -->
<label class="text-label-sm uppercase tracking-label text-on-surface-variant block mb-xs">
  Email
</label>
<input
  class="border-b border-outline-variant bg-transparent w-full text-body-md font-sans text-on-surface focus:outline-none focus:border-primary transition-colors duration-300"
/>
```

### Navegación

```html
<nav class="bg-surface/80 backdrop-blur-[10px] border-b border-outline-variant sticky top-0 z-50">
  <!-- Header centrado, persistente -->
</nav>
```

---

## Layout

- Grid de 12 columnas, max-width 1200px en desktop
- Secciones de storytelling → centradas
- UI funcional de compra → alineada a la izquierda
- Padding interno generoso en cards y contenedores (mínimo `p-md`)

```html
<div class="max-w-[1200px] mx-auto px-gutter">
  <!-- contenido -->
</div>
```

---

## Shapes (radios de borde)

| Uso               | Clase          | Valor  |
| ----------------- | -------------- | ------ |
| Botones e inputs  | `rounded`      | 4px    |
| Cards pequeñas    | `rounded-md`   | 6px    |
| Cards de producto | `rounded-lg`   | 8px    |
| Chips / pills     | `rounded-full` | 9999px |

---

## Reglas prohibidas

- ❌ Valores hex en línea (`text-[#685c52]`) salvo la sombra de elevación
- ❌ Sombras pesadas (`shadow-lg`, `drop-shadow`)
- ❌ Colores Tailwind genéricos (`text-gray-500`, `bg-white`, `border-gray-200`)
- ❌ Transiciones rápidas (`duration-100`, `duration-150`) — mínimo `duration-300`
- ❌ Fuentes distintas a Noto Serif y Manrope
- ❌ Tamaños de fuente fuera de la escala tipográfica definida

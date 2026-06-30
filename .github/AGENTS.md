# AGENTS.md — Resin Craft Art

Este fichero define cómo debe comportarse el agente cuando trabaja de forma autónoma en el proyecto RCA.
Léelo completo antes de iniciar cualquier tarea.

---

## Antes de tocar cualquier fichero

Antes de escribir o modificar código, el agente debe:

1. **Leer el `task.md`** de la tarea asignada. Si no existe, preguntar antes de continuar.
2. **Analizar la estructura del proyecto** — carpetas, componentes existentes, servicios, rutas.
3. **Comprobar si existe `graphify-out/graph.json`**. Si existe, ejecutar:
   - `graphify query "<pregunta>"` para preguntas sobre el codebase
   - `graphify path "<A>" "<B>"` para entender relaciones entre ficheros
   - `graphify explain "<concepto>"` para conceptos concretos
   - Leer `graphify-out/GRAPH_REPORT.md` solo para revisión de arquitectura general
4. **Revisar si existe `graphify-out/wiki/index.md`** y usarlo para navegación amplia antes de explorar el código directamente.
5. **Leer los ficheros de contexto** relevantes: `CLAUDE.md`, `copilot-instructions.md`, `AGENTS.md`.
6. **Identificar componentes reutilizables** antes de crear nuevos. Si existe un componente que resuelve el problema, reutilizarlo.
7. **Revisar el `task.md`** para entender el objetivo, los criterios de aceptación y las dependencias antes de empezar.

Si hay dudas sobre lógica de negocio entre componentes, **preguntar antes de implementar**.

---

## Durante la implementación

- Seguir todas las convenciones definidas en `copilot-instructions.md` y `CLAUDE.md`.
- No inventar patrones nuevos. Seguir los que ya existen en el proyecto.
- Si un componente ya existe y cubre el caso de uso, reutilizarlo.
- Mantener los componentes pequeños y con una sola responsabilidad.
- No modificar lógica de negocio existente sin confirmar con el usuario.

---

## Antes de dar una tarea por terminada

El agente debe completar los siguientes pasos en orden antes de considerar la tarea finalizada:

### 1. Tests unitarios

```bash
npm run test:coverage
```

La cobertura mínima es del **80% por fichero**. Si no se alcanza, añadir tests antes de continuar.

### 2. Linter

```bash
npm run lint
```

Si hay errores auto-corregibles:

```bash
npm run lint -- --fix
```

No continuar si quedan errores de lint.

### 3. Build de producción

```bash
npm run build
```

El build debe completarse sin errores antes de hacer commit.

### 4. Verificación E2E

Comprobar si Playwright está configurado buscando `playwright.config.*` en la raíz del proyecto.

- Si existe: ejecutar los tests E2E relacionados con la tarea y verificar que el comportamiento descrito en el `task.md` es correcto end-to-end.
- Si no existe: omitir este paso y continuar.

### 5. Gestión de ramas con Gitflow

El proyecto RCA está en desarrollo activo. El flujo de ramas es el siguiente:

- **`main`** — rama de producción. No se mergea directamente. Solo cuando el proyecto salga a producción.
- **`develop`** — rama de integración. Es la rama base para todos los desarrollos.
- Las features van en ramas `feature/` y los fixes en `fix/`, partiendo siempre desde `develop`.

Comprobar si el proyecto tiene Gitflow configurado (`git flow version` o existencia de `.gitflow`). Si está configurado, usarlo. Si no, seguir el flujo manual descrito aquí.

**Convención de nombre de rama:**

```
feature/rca-XX-descripcion-breve
fix/rca-XX-descripcion-breve
```

Ejemplo: `feature/rca-20-navbar-footer-ssr-i18n`

**Flujo de rama:**

1. Partir siempre desde `develop`.
2. Crear la rama de feature o fix.
3. Implementar y verificar todos los pasos anteriores.
4. Mergear a `develop` mediante Pull Request. Nunca merge directo.

### 6. Commit

Seguir la convención de [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
feat(rca-XX): descripción breve en infinitivo
fix(rca-XX): descripción breve en infinitivo
```

Ejemplos:

```
feat(rca-20): implement app-navbar and app-footer with SSR and i18n support
fix(rca-15): correct ControlValueAccessor implementation in app-input
```

El pre-commit hook de Husky ejecutará `npm test` automáticamente. Si falla, no continuar.

### 7. Pull Request

Crear una Pull Request desde la rama de feature/fix hacia **`develop`**.

La PR debe incluir:

- **Título:** siguiendo la convención de commits
- **Descripción:** qué se ha implementado, por qué y cómo verificarlo
- **Referencia al issue de Jira:** mencionar el identificador de la tarea (ej. RCA-20)

---

## Lo que el agente nunca debe hacer

- ❌ Modificar ficheros de contexto: `CLAUDE.md`, `AGENTS.md`, `copilot-instructions.md`
- ❌ Modificar ficheros de estilos globales: `src/styles.scss`, `src/tailwind.css`
- ❌ Modificar el `.gitignore`
- ❌ Actualizar dependencias (`package.json`, `package-lock.json`) sin confirmación explícita
- ❌ Borrar ficheros sin confirmar con el usuario
- ❌ Modificar o eliminar ficheros de configuración: `angular.json`, `tsconfig*.json`, `eslint.config.*`, `karma.conf.js`
- ❌ Hacer commit directamente a `main` o `develop`
- ❌ Tomar decisiones de lógica de negocio sin preguntar al usuario

---

## Ante cualquier duda

Si en algún momento el agente tiene dudas sobre:

- Lógica de negocio entre componentes
- Decisiones de arquitectura no cubiertas por los ficheros de contexto
- Comportamiento esperado no especificado en el `task.md`

**Debe preguntar antes de actuar.** Es preferible una pregunta que una implementación incorrecta.

# Registro de cambios — Página de manual + canvas cursor

**Fecha:** 2026-07-22
**Rama:** `feat/manual-page-and-canvas-cursor` (commit `b01b9e3`) — **sin mergear a `main`, sin push**
**Objetivo:** publicar el manual de uso de POC como página del sitio e instalar el efecto de estela de cursor pedido por el usuario.

## 1. Manual de uso en `/manual.html`

### Cómo llegó aquí (dos intentos)

El primer intento fue un HTML estático en `public/manual.html`. **Fue el trade-off equivocado** y el usuario lo detectó: no compartía el lenguaje visual del sitio. La causa es que Vite sirve `public/` sin procesar, así que ese archivo no podía importar `src/index.css` ni los componentes. Se copiaron los tokens a mano, y copiar tokens da los mismos colores pero no el mismo sistema de diseño: quedaron fuera el material de las tarjetas, el header, el footer y todo el motion.

Se rehízo como **página real de la app usando multipágina nativa de Vite**, sin `react-router` (el bundler ya resuelve esto).

| | Versión estática | Versión integrada |
| --- | --- | --- |
| Tarjetas | Navy sólido, radio 16px | `.glass-card` real: `blur(16px)`, radio 24px |
| Header | Mini-header propio | `<Header />` completo |
| Footer | Franja legal propia | `<Footer />` |
| Motion | Ninguno | Reveals framer-motion + Lenis + glow al cursor |
| Tokens | Duplicados a mano | Importa `src/index.css` |

### Archivos

- `manual.html` (raíz) — segunda entrada de Vite.
- `vite.config.js` — `build.rollupOptions.input` con `main` y `manual`.
- `src/manual.jsx` — monta `Header` + `ManualSection` + `Footer` + `WhatsAppButton` + `CanvasCursor`.
- `src/components/ManualSection.jsx` / `.css` — contenido del manual.
- `src/hooks/useTheme.js` — **extraído de `App.jsx`** para compartir el estado de tema entre ambas páginas. Sin cambio de comportamiento.

### Contenido

Siete bloques: qué recibes · primeros 60 segundos · nivel de agua · limpieza · transporte y guardado · no hagas esto · ficha técnica. Más franja legal (+18, uso responsable, reposición) y botón de imprimir con `@media print`.

El manual se centra en el nivel de agua y el ángulo, que es lo que un usuario acostumbrado a un bong convencional no sabe de un formato de pipa directa.

### Decisiones técnicas

- **`linkBase` en `Header` y `Footer`.** Desde el manual los anchors deben resolver a `/#producto`; en el landing deben seguir siendo `#producto` para no romper el scroll suave de Lenis. Prop con default `''`, no magia por `pathname`.
- **Máximo 2 columnas** en la rejilla de bloques. Con `auto-fit` se abrían 3 en desktop y el orden de lectura de los pasos numerados quedaba 1‑4‑2‑5‑3‑6.
- **Orden secuencial en el DOM** (1→6), no por columnas: en móvil el orden visual es el del DOM.
- **Labels de ficha en `--text-muted`**, igual que `.spec-label` del sitio. El accent sobre la `glass-card` clara daba 3.03:1. Mismo criterio para `.manual-eyebrow` y `.manual-dont h3` en tema claro.
- Se enlazó el manual desde el `Footer`. **Se publica al mergear.**

### Bugs encontrados y corregidos durante el desarrollo

- El glow decorativo desbordaba 220px a la derecha y generaba scroll horizontal en móvil → `overflow-x: clip`.
- El chip `COMPLETAR` usaba accent como color de texto; pasó a `--text` conservando el borde punteado en accent.

## 2. Canvas cursor

Portado de [cursify (ui-layouts)](https://github.com/ui-layouts/cursify) a JS plano. La física (springs, dampening, tension, curvas cuadráticas) es la del original.

- `src/hooks/useCanvasCursor.js`
- `src/components/CanvasCursor.jsx` / `.css`
- Montado en `App.jsx` y `manual.jsx`.

### Defectos del original que hubo que corregir

1. **Color arcoíris.** Usaba `hsla()` con el hue animado por un oscilador (offset 285, amplitud 85): barría de azul a magenta a rojo. Viola el hard NO de la marca sobre colores fuera de paleta. Fijado en `--accent`, que además vale igual en ambos temas.
2. **Bloqueaba el scroll en móvil.** Llamaba `preventDefault()` en cada `touchmove`.
3. **`blur` nunca pausaba.** El handler hacía `ctx.running = true` — casi seguro un typo por `false`. El `requestAnimationFrame` corría indefinidamente aunque la pestaña estuviera oculta.
4. **El cleanup no limpiaba nada.** Quitaba listeners pasando arrow functions nuevas, que son referencias distintas a las registradas.
5. Mezclaba `pageX` táctil con un canvas `position: fixed`, lo que desalinea la estela al scrollear. Todo pasó a `clientX`/`clientY`.

### Anclaje al scroll (pedido explícito del usuario)

Los nodos guardan **coordenadas de documento** y el canvas —que sigue siendo `fixed` y del tamaño del viewport— se traslada por `-scrollY` al dibujar. Un canvas del alto del documento serían decenas de MB de bitmap.

**Detalle no obvio:** derivar la posición de página dentro del `mousemove` no basta. Si se scrollea *sin mover el mouse*, la estela queda clavada a su punto de página y luego cruza la pantalla de un latigazo al mover el cursor. La solución fue guardar el cursor en coordenadas de viewport y recalcular su equivalente en página **en cada frame**: así la cabeza sigue al cursor y solo la cola se ancla al contenido.

### Otras decisiones

- **Solo desktop** (`(hover: hover) and (pointer: fine)`), mismo criterio que el border-glow de `BenefitsSection`. En táctil no hay cursor y el rAF constante es batería. Quitar esa condición en el hook para habilitarlo en móvil.
- **`z-index: 97`**, bajo Header (100), WhatsApp (99) y MobileBuyBar (98): la estela pasa sobre el contenido pero no sobre el chrome, evitando conflictos con su `backdrop-filter`.
- Respeta `prefers-reduced-motion`.
- El composite pasa a `source-over` en tema claro; con `lighter` sobre fondo blanco la estela sería invisible.

## Verificaciones realizadas

- `npm run build` OK. Genera `dist/index.html` y `dist/manual.html`; React y framer-motion quedan en chunk compartido — el manual suma ~10 kB JS + 5 kB CSS.
- **Contraste AA** medido por script en los 14 elementos de texto del manual, en ambos temas: 0 por debajo de 4.5:1 (mínimo 7.46 claro, 5.62 oscuro).
- **Móvil 390px:** `scrollWidth === clientWidth`, rejilla en una columna, sin desborde.
- **Landing intacto:** los anchors del nav siguen siendo locales, las 5 secciones responden, el toggle de tema funciona en ambas páginas.
- **Canvas cursor:** verificado por script que `ctx.translate` es exactamente `-scrollY` en scroll 0 / 250 / 900 / 2000 y de vuelta a 0; que la cabeza cae sobre el cursor estando scrolleado 1500px; y que tras `blur` se pintan 0 píxeles y tras `focus` vuelve a pintar.
- Consola sin errores en ambas páginas.

## Notas de método

Dos mediciones dieron falsos positivos y conviene recordarlo:

- Medir contraste justo después de cambiar `data-theme` por script captura los valores **a mitad de la transición CSS** (`.back` daba 2.29 cuando en realidad es 12.6). Hay que medir cada tema ya asentado, en llamadas separadas.
- Comparar el bounding box de la estela entre dos momentos **no sirve** para verificar el anclaje: la cadena de resortes nunca se congela del todo. La verificación válida fue interceptar `ctx.translate` y comparar su argumento con `window.scrollY`.

## Pendientes que deja esta tanda

- Los **5 `COMPLETAR`** del manual, que son datos de producto que no se pueden inventar:
  1. Nivel de agua (ml o marca de referencia) — es el dato más importante del manual.
  2. Por dónde se llena de agua.
  3. Inclinación máxima al aspirar.
  4. Accesorios incluidos en la caja.
  5. WhatsApp / web de contacto.
- `manual-poc.png` quedó suelto en la raíz, sin fuente (el HTML que lo generaba se eliminó al convertir el manual en página). Regenerable desde `/manual.html` con Imprimir → Guardar como PDF. Decidir si se borra.
- Rehacer el menú para incluir Manual, Quiénes somos y Contacto → ver `Por iniciar/09-rehacer-menu-navegacion.md`.
- `sitemap.xml` no incluye `/manual.html`.

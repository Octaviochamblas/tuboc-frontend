# Registro de cambios — Página /poc.html, menú simplificado y reescritura del manual

**Fecha:** 2026-08-03
**Rama:** `main` (commits directos, sin rama separada)

## 1. Página dedicada `/poc.html`

Se creó una página nueva dedicada a describir POC en detalle, siguiendo el mismo patrón MPA de Vite que `/manual.html` (sin router):

- `poc.html` + `src/poc.jsx` — monta `Header`/`Footer` (`linkBase="/"`) + `CaseSection`, `ProductSection`, `BenefitsSection`, `SpecsSection` (movidas tal cual desde el landing, sin tocar su contenido interno) + `WhatsAppButton` + `CanvasCursor`.
- `vite.config.js` suma la entrada `poc`.
- Orden final de las secciones en `/poc.html`: **Beneficios primero** (a pedido del usuario), luego Carcasa, Portabilidad, Ficha técnica.
- `src/poc.css`: compensa el header fijo (~130px) con `padding-top: 180px` en la primera sección de la página — mismo criterio que `.video-section` en el landing. Sin esto la primera sección quedaba tapada por el header.

### Bug de cascada CSS (preexistente, se replicó al copiar el patrón de `manual.jsx`)

En `manual.jsx` y `poc.jsx`, `index.css` se importaba **al final** del archivo, después de los componentes. Esto invertía el orden de la cascada: la regla genérica `.container { padding: 0 24px }` de `index.css` terminaba ganando sobre `.header-container { padding: 20px 0 }` de `Header.css`, aplastando el header (89.75px en vez de 129.75px). Se corrigió moviendo `import './index.css'` al principio en ambos archivos, igual que ya estaba en `main.jsx`. Afectaba tanto a `/manual.html` como a `/poc.html`.

## 2. Teaser en el landing (`PocTeaserSection`)

`CaseSection`, `ProductSection`, `BenefitsSection` y `SpecsSection` se sacaron de `App.jsx` y se reemplazaron por un componente nuevo, `PocTeaserSection.jsx` (+ css): grid de 4 tarjetas cortas (ícono + título + una línea + "Ver más") que enlazan a `/poc.html#<id>`.

## 3. Menú simplificado a 3 links

A pedido del usuario, el menú principal (`Header.jsx`) pasó de 5 links (Producto/Carcasa/Portabilidad/Beneficios/Preguntas) a **Inicio · POC · Manual**:

- "Inicio" reutiliza la misma expresión que el logo (`linkBase || '#'`).
- "POC" → `/poc.html`, "Manual" → `/manual.html` (ambos absolutos, sin prefijo `linkBase`).
- `Footer.jsx` conserva su lista completa como mapa de sitio, pero "Carcasa"/"Portabilidad"/"Beneficios" ahora apuntan a `/poc.html#<id>` en vez de anclas locales, ya que esas secciones viven ahí.

Esto resuelve de facto el problema de desborde de `Por iniciar/09-rehacer-menu-navegacion.md` (3 links en vez de hasta 8), aunque **no** agrega "Quiénes somos" ni "Contacto" — esos dos puntos de la tarea 09 siguen abiertos si se quieren retomar.

## 4. Reescritura de `ManualSection.jsx`

- Bloque "Primeros 60 segundos" → **"Instrucciones"**; se eliminó el paso "Enjuaga antes del primer uso" (los pasos se renumeran solos, son un `.map`).
- Copy reescrito de "Carga el agua", "Carga la pieza" y "Aspira con calma" con las instrucciones reales de uso.
- Bloque "Nivel de agua": se completó el placeholder `COMPLETAR: inclinación máx.` (dato ya resuelto en el bloque nuevo de abajo) y se reescribió el copy de "de más/de menos" de agua.
- **Bloque nuevo "Modo de uso"** (n="4"): explica el ángulo de uso (30°–60°) y sus dos advertencias (horizontal / hacia arriba). Esto corrió la numeración de los bloques siguientes (Limpieza→5, Transporte→6, No hagas esto→7, Ficha técnica→8) y su patrón alternado de `delay` de columna (el grid es de 2 columnas; el `delay` de framer-motion alterna según si el bloque cae en la columna izq/der).
- "No hagas esto": se eliminó el punto de "agua hirviendo" y se reescribió el de esponjas/cepillos.
- Ficha técnica: "Carcasa" pasó de "Incluida" a las dimensiones reales (Largo: 130mm / Diámetro: 40mm).
- Se eliminó el párrafo de "Soporte y reposición" del aside legal.
- Header del manual (`.manual-lede`): tenía `max-width: 760px` dejando un espacio vacío grande a la derecha en desktop (el usuario lo marcó en una captura). Se convirtió en grid de 2 columnas y se agregó la foto del Hero (POC + carcasa) en la columna derecha.
- Las dos tarjetas de la primera fila del grid ("Qué recibes" / "Instrucciones") no igualaban su altura (`align-items: start`), dejando espacio vacío en la más corta. Se cambió a `align-items: stretch` en `.manual-grid` y `.manual-card` pasó a flex-columna con `justify-content: center`, para que ambas tarjetas de cada fila midan lo mismo y su contenido quede centrado verticalmente.

### Fotos reales en "Nivel de agua" y "Modo de uso"

El usuario adjuntó dos fotos del producto (guardadas en Descargas). Se copiaron a `src/assets/`, se agregaron al pipeline (`scripts/optimize-assets.mjs` → `npm run optimize` → avif/webp/jpg en `src/assets/optimized/`):

- `poc-nivel-agua` — reemplaza el diagrama SVG del nivel de agua. Layout **lado a lado** con el texto (foto 170px de ancho).
- `poc-inclinada` — foto del ángulo de uso, en el bloque "Modo de uso". Layout **apilado** (texto arriba, foto abajo), con una clase modificadora `.manual-water--stacked` que hace que la foto ocupe hasta 380px de ancho (aprovecha el espacio al no compartir fila con el texto).

Nota al reproducir este patrón: `.manual-water` es la clase base (fila, foto+texto lado a lado); `.manual-water--stacked` la vuelve columna. Cada bloque decide cuál usar según el tipo/proporción de la foto (la de nivel de agua es vertical y angosta, encaja bien al lado; la inclinada es más apaisada y se beneficia de más ancho).

## 5. Otros cambios de copy sueltos

- `HeroSection.jsx`: los 3 claims (Portátil/Discreta/Protegida) dejaron de ser acordeón — ahora muestran su descripción siempre visible (se quitó `useState`/`AnimatePresence`/chevron). Título "Conoce POC: ..." → "POC: ...".
- `FAQSection.jsx`: la pregunta "¿Qué color está disponible?" se reemplazó por "¿Qué es POC?".
- `CTASection.jsx`: copy final ahora empieza con "Pipa POC:" y ya no repite "de TUBOC" al final.
- `SpecsSection.jsx` y `TrustSection.jsx`: se agregó un botón `DynamicCTA` ("Consigue tu POC ahora"), igual que en las otras secciones. En `TrustSection`, el botón vive fuera del grid de 2 columnas del panel (`.trust-panel > .dynamic-cta-container { grid-column: 1 / -1 }`) para que quede centrado en todo el ancho del panel y no encajonado en una sola columna.

## Verificaciones realizadas

- `npm run build` OK en cada tanda de cambios (genera `dist/index.html`, `dist/manual.html`, `dist/poc.html`).
- Revisado en el Browser pane (desktop y móvil 375px): sin overflow horizontal en las 3 páginas, sin errores de consola nuevos, alturas de header consistentes entre páginas, fotos cargando (`img.complete === true`), grids colapsando a 1 columna en móvil.

## Pendientes que deja esta tanda

- `Por iniciar/09-rehacer-menu-navegacion.md`: "Quiénes somos" y "Contacto" siguen sin página/sección propia — el menú se simplificó pero esos dos puntos no se resolvieron.
- Los 5 `COMPLETAR` originales del manual bajaron a los que quedan sin dato: por dónde se llena de agua *(ya resuelto: orificio de aspirado)*, accesorios incluidos en la caja, WhatsApp/web de contacto — revisar `Finalizado/registro-manual-y-canvas-cursor.md` para el detalle original.
- `manual-poc.png` sigue suelto en la raíz sin decisión tomada.
- Los 4 originales pesados `Pipa de agua tubular portatil POC TUBOC 1-4.JPG` y las 2 fotos nuevas (`Pipa POC TUBOC inclinada.png`, `Pipa POC TUBOC vertical Nivel de agua.png`) quedan en `src/assets/` sin comprimir junto a sus optimizados — ver `Por iniciar/07-assets-pendientes.md` para el criterio de limpieza (confirmar respaldo externo antes de borrar).

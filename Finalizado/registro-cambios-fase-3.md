# Registro de cambios - Fase 3 TUBOC

**Fecha:** 2026-06-10  
**Objetivo:** ejecutar las tareas viables de `Por iniciar/` sin inventar datos, sin mostrar precios en la landing y sin incorporar dependencias de scroll que puedan romper las animaciones existentes.

## Cambios implementados

### 1. Precio eliminado de la landing
- Se elimino el precio visible del CTA final.
- Se elimino el precio visible de la barra fija mobile.
- La barra mobile ahora comunica `Primera edición` y `Disponible ahora`.
- Se verifico con busqueda en `src` que no queden coincidencias para `64.990`, `precio especial` ni `Lleva el tuyo`.

### 2. Nueva seccion de especificaciones
- Se creo `SpecsSection` con datos confirmados:
  - Material: vidrio borosilicato.
  - Color: azul profundo.
  - Formato: tubular compacto.
  - Incluye: pipa + carcasa.
- No se agregaron dimensiones ni peso porque no estan confirmados.
- La seccion tiene `id="especificaciones"` para enlaces futuros, pero no se agrego al header para evitar desborde.

### 3. Nuevo bloque de confianza
- Se creo `TrustSection` con cuatro senales de compra:
  - +18.
  - Envios a Chile.
  - Pago coordinado.
  - Reposicion por dano en transporte previa revision fotografica.
- El copy se mantuvo consistente con el FAQ existente.

### 4. Orden narrativo actualizado
- El flujo de la pagina quedo:
  `Hero -> Video -> Carcasa -> Producto -> Beneficios -> Especificaciones -> Confianza -> FAQ -> CTA`.
- Se mantuvieron beneficios antes de especificaciones para preservar una narrativa mas emocional antes de la ficha tecnica.

### 5. Sticky-scroll en seccion Carcasa
- Se implemento sticky-scroll con CSS puro usando `position: sticky` en `.case-media`.
- Se elimino `display: contents` del responsive de `CaseSection`, porque era incompatible con el comportamiento sticky.
- En mobile la seccion vuelve a layout apilado normal, sin sticky ni JS adicional.

### 6. FAQ en dos columnas
- Se dividio el FAQ en dos listas renderizadas en grid.
- Se evito `column-count` para no romper la animacion de apertura de acordeones.
- Se preservo accesibilidad con `<button>`, `aria-expanded` y `aria-controls`.
- En mobile vuelve a una columna.

### 7. CTA magnetico sutil
- Se agrego una microinteraccion magnetica al CTA final con Framer Motion.
- Movimiento maximo: 8px.
- Solo actua con puntero fino y se desactiva con `prefers-reduced-motion`.
- El area clickeable se mantiene estable: el anchor envuelve el contenido visual animado.

## Decisiones tecnicas

- **Lenis no se integro en esta fase.** Riesgo detectado: puede descoordinarse con `whileInView` / `useInView` de Framer Motion al virtualizar el scroll. Se deja para una evaluacion futura con estrategia especifica.
- **No se agrego link de Especificaciones al header.** El header ya tiene cinco links y un sexto podria desbordar en desktop medio.
- **No se inventaron specs faltantes.** Dimensiones y peso quedan pendientes hasta tener datos reales.
- **No se eliminaron assets pesados.** Requiere confirmacion de respaldo externo.

## Verificaciones realizadas

- `npm run lint` paso correctamente.
- `npm run build` paso correctamente.
- `rg -n "64\\.990|precio especial|Lleva el tuyo" src` no encontro coincidencias.
- Revision visual con Playwright CLI:
  - Desktop: specs y trust aparecen en el orden correcto; FAQ se ve en dos columnas; CTA no muestra precio.
  - Mobile: barra inferior renderiza `Primera edición | Disponible ahora`; no muestra precio.

## Ajustes post-revisión (Claude Code, 2026-06-10)

- **SpecsSection rediseñada:** el usuario aportó datos reales: largo 95mm, diámetro 32mm, peso 75g, color azul oscuro, material vidrio de borosilicato, carcasa incluida. Se eliminó "Formato tubular portátil" (redundante con el claim del producto).
- **Grid ajustado a 3 columnas:** con 6 specs, `repeat(3, 1fr)` + foto da 2 filas de 3 perfectamente balanceadas (antes 4 cols dejaba huecos).
- **Glow de cursor en spec cards:** se replicó el efecto `::before` con `radial-gradient` y `--mx`/`--my` idéntico a BenefitsSection. Entrada `y: 40→0` con stagger de 0.1s.
- **Foto `tuboc4.jpg`** usada para la sección Specs (muestra las pipas en azul, relevante para las specs de color).

## Pendientes

- Foto real de producto en mano + carcasa cerrada para demostrar visualmente el claim "cabe en tu mano".
- Logo vectorial original en SVG/AI/EPS para reemplazar PNG en header/footer.
- Confirmar respaldo externo antes de eliminar originales pesados no usados:
  - `Tuboc Horizontal 2.mp4`
  - `TUBOC + Carcasa.JPG`
- Revaluar Lenis o smooth scroll solo si se resuelve compatibilidad con Framer Motion.
- Producto 3D queda como fase futura opcional y dependiente de un modelo 3D real.

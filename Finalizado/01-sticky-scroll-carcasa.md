# Sticky-scroll en sección Carcasa / Producto

**Fase:** 3 — Interacciones premium
**Prioridad:** Alta

## Descripción
Convertir la sección de la carcasa (`CaseSection` / sección producto) en un layout sticky-scroll: la imagen queda fija mientras el texto/beneficios hacen scroll a su lado. Patrón típico de landings premium (Apple-style).

## Criterios de aceptación
- [ ] En desktop, la imagen permanece sticky mientras el contenido textual scrollea.
- [ ] En móvil se degrada a layout normal apilado (sin sticky).
- [ ] Respeta `prefers-reduced-motion`.
- [ ] Funciona en ambos temas (dark y light).

## Archivos involucrados
- `src/components/CaseSection.jsx` / `.css`
- Posiblemente `src/components/ProductSection.jsx` si aplica el mismo patrón.

## Notas
- Usar `position: sticky` CSS puro antes que JS; framer-motion `useScroll` solo si se necesita parallax.
- La marca manda: revisar skill `tuboc-brand` antes de estilar.

# FAQ en 2 columnas

**Fase:** 3 — Interacciones premium
**Prioridad:** Media

## Descripción
La lista de FAQ actual es una sola columna larga (10 preguntas). Pasar a layout de 2 columnas en desktop para reducir el alto de la sección y darle aspecto más editorial.

## Criterios de aceptación
- [ ] Desktop: 2 columnas balanceadas (CSS columns o grid; cuidar que el acordeón abierto no rompa el flujo de la otra columna — preferir `grid` con dos listas separadas antes que `column-count`).
- [ ] Móvil: vuelve a 1 columna.
- [ ] Se mantiene la accesibilidad actual (`<button>` + `aria-expanded` + `aria-controls`).
- [ ] Animación de apertura sigue fluida (framer-motion `AnimatePresence`).

## Archivos involucrados
- `src/components/FAQSection.jsx`
- `src/components/FAQSection.css`

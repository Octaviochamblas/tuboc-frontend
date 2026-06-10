# Lenis smooth scroll

**Fase:** 3 — Interacciones premium  
**Estado:** Finalizado  
**Fecha:** 2026-06-10

## Qué se implementó
- Se instaló `lenis`.
- Se creó `src/hooks/useLenis.js` para aislar la integración.
- Se conectó el hook en `src/App.jsx`.
- Se importó `lenis/dist/lenis.css` desde el hook.

## Cómo se resolvió el riesgo con Framer Motion
- Se mantuvo Lenis sobre el `window`/scroll nativo, sin crear wrapper transformado propio.
- No se tocó ningún componente con `whileInView` ni `useInView`.
- Se usó `autoRaf: true` para que Lenis controle su propio loop.
- Se dejó `syncTouch: false` para mantener touch nativo y evitar inestabilidad móvil.
- Se desactiva completamente si `prefers-reduced-motion: reduce` está activo.

## Configuración
- `duration: 1.05`
- `smoothWheel: true`
- `syncTouch: false`
- `stopInertiaOnNavigate: true`
- `anchors` activo con `offset: -96` para compensar el header fijo.
- `prevent` respeta cualquier nodo con `data-lenis-prevent`.

## Verificaciones esperadas
- Anchors del nav siguen funcionando con scroll suave.
- Las animaciones `whileInView` siguen disparándose porque no se cambió la estructura del DOM.
- En usuarios con `prefers-reduced-motion`, Lenis no se crea.

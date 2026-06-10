# Botón magnético en CTA final

**Fase:** 3 — Interacciones premium
**Prioridad:** Baja

## Descripción
El botón principal del CTA final ("Comprar") atrae levemente el cursor cuando se acerca (efecto magnético), con retorno elástico al salir. Detalle de microinteracción premium.

## Criterios de aceptación
- [ ] Solo en desktop con puntero fino (`@media (pointer: fine)`); en touch no hace nada.
- [ ] Desplazamiento sutil (máx ~8–10px) con spring de framer-motion — nada exagerado.
- [ ] Respeta `prefers-reduced-motion`.
- [ ] El área clickeable no se ve afectada.

## Archivos involucrados
- `src/components/CTASection.jsx` / `.css`
- Posible componente reutilizable `src/components/MagneticButton.jsx`

## Notas
- Implementación: `onMouseMove` sobre un wrapper, calcular offset respecto al centro, animar con `useSpring` de framer-motion.

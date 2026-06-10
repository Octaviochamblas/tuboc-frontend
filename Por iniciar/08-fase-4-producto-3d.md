# Fase 4 (opcional): Producto 3D con React Three Fiber

**Fase:** 4 — Opcional, al final de todo
**Prioridad:** Baja (solo si las fases anteriores están cerradas)

## Descripción
Visualización 3D interactiva del producto (rotación con drag / scroll) usando React Three Fiber + drei. Es la fase "wow" final y la más cara en esfuerzo y peso.

## Prerrequisitos
- [ ] Fase 3 completa y desplegada.
- [ ] Modelo 3D del producto (¿existe? preguntar al usuario; si no, habría que modelarlo — evaluar costo/beneficio).
- [ ] Presupuesto de peso: el bundle de three.js es grande; cargarlo lazy (`React.lazy` + `Suspense`) solo cuando la sección entra en viewport.

## Criterios de aceptación
- [ ] El 3D no penaliza el LCP ni el peso inicial de la página.
- [ ] Fallback a imagen estática en móviles de gama baja y con `prefers-reduced-motion`.
- [ ] Iluminación coherente con la estética dark premium (tonos fríos, vidrio).

## Notas
- Decisión de la guía de diseño: premium = restricción. Si el 3D no se ve impecable, mejor no incluirlo.

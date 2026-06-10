# Nueva sección: Bloque de confianza

**Fase:** 3 — Secciones nuevas
**Prioridad:** Alta

## Descripción
Bloque compacto de señales de confianza para reducir fricción de compra. Ítems (basados en las respuestas reales del FAQ):

- **+18** — venta exclusiva a mayores de edad
- **Envíos a todo Chile** — despacho al día siguiente de confirmada la compra
- **Pago** — transferencia bancaria o compra directa
- **Reposición** — si llega dañado en transporte, se repone previa revisión fotográfica

## Criterios de aceptación
- [ ] 4 ítems con ícono (lucide-react) + título corto + línea de detalle.
- [ ] Ubicación sugerida: entre Benefits y FAQ, o justo antes del CTA final (decidir con el usuario o probar ambas).
- [ ] Estilo sobrio: fila horizontal en desktop, grid 2×2 en móvil.
- [ ] Copy consistente con el FAQ (no contradecir plazos ni condiciones).

## Archivos involucrados
- Nuevo: `src/components/TrustSection.jsx` / `.css` (o integrarlo dentro de CTASection)
- `src/App.jsx`

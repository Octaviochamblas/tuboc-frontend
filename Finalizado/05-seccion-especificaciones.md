# Nueva sección: Especificaciones del producto

**Fase:** 3 — Secciones nuevas
**Prioridad:** Alta

## Descripción
Crear una sección de especificaciones técnicas del producto. Hoy el sitio comunica beneficios pero no datos concretos. Contenido tentativo:

- **Material:** vidrio borosilicato (resistencia térmica y mecánica)
- **Color:** azul profundo — primera edición limitada
- **Dimensiones / peso:** PEDIR DATOS REALES AL USUARIO antes de inventar nada
- **Incluye:** pipa + carcasa protectora personalizada

## Criterios de aceptación
- [ ] Datos confirmados por el usuario (no inventar dimensiones ni especificaciones).
- [ ] Diseño sobrio tipo ficha técnica premium: grid de specs con labels Montserrat 600 uppercase tracking + valores destacados.
- [ ] Funciona en ambos temas.
- [ ] Entrada en el nav si corresponde (`#especificaciones`).

## Archivos involucrados
- Nuevo: `src/components/SpecsSection.jsx` / `.css`
- `src/App.jsx` (montar la sección)
- `src/components/Header.jsx` (posible link en nav)

## Notas
- Bloqueada parcialmente: requiere que el usuario entregue dimensiones, peso y cualquier dato técnico real.

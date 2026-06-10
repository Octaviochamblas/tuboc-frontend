# TUBOC — Landing page

Landing de TUBOC: pipas de agua portátiles de vidrio borosilicato con carcasa protectora. Venta solo a +18, Chile. El objetivo del sitio es verse **extremadamente premium, elegante e impactante** (dark premium).

## Stack
- React 19 + Vite 8, framer-motion 12, lucide-react.
- Deploy: Vercel conectado a GitHub `main` (cada push a main publica a producción — confirmar con el usuario antes de push).
- Dev: `npm run dev` (puerto 5173). Optimización de assets: `npm run optimize` (sharp + ffmpeg → `src/assets/optimized/`).

## Sistema de diseño — fuente de verdad
Usar SIEMPRE el skill **`tuboc-brand`** (`.claude/skills/tuboc-brand/SKILL.md`) al tocar UI. Resumen:
- Paleta por roles: `#1C1C1C` fondo · `#21284F` superficie · `#263689` interactivo/CTA · `#6997CF` acento/glow · `#FFFFFF` texto · `#DADADA` texto secundario.
- Tipografía: Montserrat Alternates 900 (display) · Montserrat 800 (títulos) · 400 (cuerpo) · 600 uppercase tracking (labels).
- Tokens semánticos en `src/index.css`: `--bg`, `--surface`, `--interactive`, `--accent`, `--text`, `--text-muted` (+ aliases legacy). **Ambos temas (dark y light) se mantienen** — probar cambios en los dos.
- Premium = restricción: pocas animaciones, sobrias, easing `--ease-premium`. Respetar `prefers-reduced-motion`. No inventar colores ni fuentes.
- El sitio **no muestra precio** en ninguna parte (decisión del usuario).

## Flujo de trabajo (kanban de carpetas)
Al iniciar sesión, revisar estas carpetas en la raíz para contextualizar el estado del proyecto:
- **`Por iniciar/`** — tareas pendientes, un `.md` por tarea con criterios de aceptación.
- **`Desarrollado/`** — tareas en progreso (mover el `.md` aquí al empezarlas, anotar decisiones dentro).
- **`Finalizado/`** — tareas terminadas (incluye el registro de las fases 0–2 ya completadas).

Estado actual (junio 2026): fases 0, 0.5, 1, 2 y 3 completadas. Pendiente: assets (foto en mano, logo SVG, limpieza de originales pesados con respaldo confirmado) y fase 4 opcional (3D).

## Reglas duras
- Confirmar con el usuario antes de `git push` a `main` (es producción).
- No inventar datos del producto (dimensiones, precios, plazos) — pedirlos.
- Accesibilidad: elementos interactivos como `<button>` con aria; no regresar a `div` clickeables.
- Assets nuevos pesados: pasarlos por `npm run optimize` antes de importarlos.
- El usuario habla español; responder en español.

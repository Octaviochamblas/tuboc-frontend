# Fases 0 a 2 — Completadas

Registro de lo ya terminado y desplegado (commits `2d13d21` y `bf04eb5`, junio 2026).

## Fase 0 — Compresión de assets ✓
- Pipeline `npm run optimize` (sharp + ffmpeg-static) → `src/assets/optimized/`.
- ~40 MB de assets reducidos a ~3 MB (AVIF/WebP/JPG + WebM/MP4 + poster).
- Video con lazy-load (`useInView`), imágenes con `<picture>` y fallbacks.

## Fase 0.5 — Limpieza (auditoría Codex) ✓
- Favicon propio de TUBOC (antes apuntaba a `/vite.svg` inexistente).
- `App.css` muerto eliminado; variables CTA faltantes definidas.
- Acordeones convertidos a `<button>` con `aria-expanded`/`aria-controls`.
- Fuente `Outfit` eliminada; `--font-heading` → Montserrat (peso 800 agregado).

## Fase 1 — Sistema de tokens ✓
- `src/index.css` reescrito con tokens semánticos: `--bg`, `--surface`, `--interactive`, `--accent`, `--text`, `--text-muted`.
- Todos los nombres antiguos preservados como aliases → cero ruptura de componentes.
- Ambos temas (dark y light) mantenidos.

## Fase 2 — Rediseño visual ✓
- **Header:** nav horizontal visible en desktop con underline animado; hamburguesa solo móvil. Top bar sin precio.
- **Hero:** reescrito con CSS Grid `grid-template-areas` — orden distinto en desktop (texto izq, foto der) y móvil (título → claims → foto → descripción → CTA). Sin acordeón. Foto `tuboc-carcasa` con badge "Incluye carcasa protectora" + 2 pills.
- **Benefits:** 4 tarjetas siempre visibles, glow de borde que sigue al cursor (`--mx`/`--my`).
- **CTA final:** usa `tuboc4.jpg` para no duplicar la foto del hero. Pulsos eliminados de botones.
- **FAQ:** tarjeta de precio eliminada (el sitio ya no muestra precio en ninguna parte).

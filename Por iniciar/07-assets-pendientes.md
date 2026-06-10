# Assets pendientes

**Fase:** Transversal
**Prioridad:** Media

## Pendientes

### 1. Foto "producto en mano + carcasa cerrada"
El claim principal del hero es "cabe en tu mano", pero ninguna foto actual lo demuestra. Pedir al usuario una foto del producto sostenido en la palma (idealmente con la carcasa cerrada al lado). Al recibirla: pasarla por `npm run optimize` y evaluar usarla en hero o en la sección Portabilidad.

### 2. Logo vectorial (SVG)
El logo actual es `src/assets/logo_v3.png`. Vectorizarlo desde el PNG no da buen resultado — **pedir al usuario el archivo vectorial original** (AI/SVG/EPS). Beneficio: nitidez en pantallas retina y menos peso.

### 3. Limpiar originales pesados sin uso
Siguen en `src/assets/` sin ser importados por ningún componente:
- `Tuboc Horizontal 2.mp4` (~30 MB)
- `TUBOC + Carcasa.JPG` (~10 MB)

Confirmar con el usuario que existen copias fuera del repo y eliminarlos (Vite no los incluye en el build por no estar importados, pero engordan el repositorio git).

## Notas
- Pipeline de optimización: `npm run optimize` (sharp → AVIF/WebP/JPG; ffmpeg → WebM/MP4 + poster). Salida en `src/assets/optimized/`.

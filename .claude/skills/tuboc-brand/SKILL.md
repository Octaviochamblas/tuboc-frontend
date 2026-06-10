---
name: tuboc-brand
description: Sistema de diseño de la marca TUBOC. Úsalo SIEMPRE al construir, rediseñar o estilar cualquier UI del sitio TUBOC (React 19 + Vite + framer-motion) — pipas de agua portátiles de vidrio borosilicato con carcasa. Fija la identidad dark-premium: roles de color de marca (#1C1C1C / #21284F / #263689 / #6997CF), tipografía Montserrat + Montserrat Alternates, movimiento de alto impacto pero restringido, y soporte de tema claro y oscuro. La identidad de marca tiene prioridad sobre cualquier elección genérica.
---

Aplica este skill junto con `frontend-design`. Ese skill aporta el criterio general ("comprométete con una dirección audaz, evita el AI slop, motion de alto impacto"); **este skill fija cuál es esa dirección para TUBOC**. Cuando haya conflicto (p. ej. el skill general sugiere fuentes distintas), **manda la marca**.

## Qué es TUBOC y qué debe transmitir

Pipas de agua portátiles de **vidrio borosilicato** en formato tubular compacto, con **carcasa protectora**. Pilares: **innovación, portabilidad, discreción, protección**. Precio de lanzamiento $64.990 CLP.

Dirección estética fija: **dark premium, frío y limpio.** El héroe es el material — vidrio, transparencia, luz fría, agua. Sensación de objeto caro y discreto, no llamativo. Premium = **restricción**, no saturación. Nunca derivar a oro/bronce/champán ni a un look "cannabis recreativo": esto es producto de diseño industrial sobrio.

## Sistema de color (NO inventar colores)

Paleta de marca cerrada. La clave es **un rol único por color** (el error histórico era usar 3 azules sin jerarquía):

| Color | Rol único | Uso |
| --- | --- | --- |
| `#1C1C1C` | Fondo base | El lienzo de todo (dark) |
| `#21284F` | Superficie elevada | Cards, glass, secciones; estructura, no protagonista |
| `#263689` | Interactivo | **Solo** botones / CTA |
| `#6997CF` | Acento = LUZ | Glow, links, hover, highlights, "luz a través del vidrio". Único color "vivo". |
| `#FFFFFF` | Texto principal | Títulos |
| `#DADADA` | Texto secundario | Párrafos |

Reglas:
- Define estos roles como CSS variables en `src/index.css` con nombres semánticos (`--surface`, `--interactive`, `--accent`, `--text`, `--text-muted`), no como `--c-blue-medium` sueltos.
- `#6997CF` es el acento; el navy `#21284F` es superficie. No usar dos azules para la misma función.
- **Soportar tema claro Y oscuro** (decisión del usuario: conservar ambos). El dark es el primario y más pulido; el light invierte fondo/texto manteniendo `#263689` para interactivo y `#6997CF` para acento.
- Texto sobre fondos de color: usar blanco (`#FFFFFF`) o, sobre `#6997CF`, un tono oscuro de la familia (`#13213a`) — nunca negro puro sobre azul.

## Tipografía (sistema cerrado)

Solo dos familias de marca. **Montserrat Alternates** (geométrica redondeada) es la voz display distintiva — cubre la objeción del skill general sobre fuentes genéricas.

- **Display** → `Montserrat Alternates` 900 — wordmark "TUBOC", precio, números de impacto. Uso escaso, solo momentos clave.
- **Títulos** → `Montserrat` 800.
- **Cuerpo** → `Montserrat` 400, `line-height: 1.7`.
- **Labels / eyebrow** → `Montserrat` 600, `text-transform: uppercase`, `letter-spacing: 3px`.

CSS vars sugeridas: `--font-display`, `--font-heading`, `--font-body`. Escala grande y aireada; dar "aire" con espaciado generoso.

## Lenguaje de movimiento (alto impacto, restringido)

- Easing único premium: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out).
- Entrada cinemática fuerte en el hero (un load bien orquestado con stagger ~80ms) en vez de micro-animaciones dispersas.
- Reveal on-scroll: `opacity` + `translateY(24px)`, con `framer-motion` (`whileInView` / `useInView`).
- Smooth scroll con **Lenis** (recomendado para la sensación premium).
- Acentos: botón magnético en CTA, border-glow que sigue el cursor en cards (desktop).
- **Respetar `prefers-reduced-motion`**: desactivar animaciones no esenciales.
- Regla de oro: si una animación no aporta significado o jerarquía, no va. Saturar abarata.

## Patrones de layout e interacción (decisiones tomadas)

- **Nada de acordeones para la propuesta de valor.** Hero, Beneficios y Case muestran el contenido directo. Acordeón solo es válido en FAQ.
- **Header**: en desktop, links horizontales visibles con underline animado en hover; hamburguesa → overlay full-screen **solo en móvil**; glassmorphism al hacer scroll.
- **Case / Producto**: storytelling con **sticky scroll split** (texto scrollea a la izquierda, visual fija cambia a la derecha) en lugar de clics.
- **Beneficios**: las 4 tarjetas siempre visibles, con border-glow al cursor.
- **FAQ**: acordeón minimalista a 2 columnas, transición de altura fluida.
- Aprovechar el ancho en pantallas grandes (el sitio actual se siente angosto/centrado).

## Convenciones de componentes existentes

- Utilidades `glass` y `glass-card` en `src/index.css` (backdrop-filter blur). Reusarlas para superficies elevadas con `--surface`.
- Iconos: `lucide-react`. Animación: `framer-motion` (ya instalado). NO añadir GSAP.
- Componentes en `src/components/<Nombre>.jsx` + `<Nombre>.css` co-localizados.

## Rendimiento (parte de "premium")

- Imágenes pesadas → `<picture>` con AVIF → WebP → JPG fallback. Video → `<video>` con `<source>` WebM + MP4, `preload="none"`, montaje diferido con `useInView`.
- Pipeline: `npm run optimize` (`scripts/optimize-assets.mjs`, usa sharp + ffmpeg-static) genera assets a `src/assets/optimized/`. Al sumar un asset pesado, optimizarlo antes de importarlo.
- Logo en SVG cuando exista el vectorial (hoy PNG).

## NO hacer (hard NOs)

- ❌ Introducir colores fuera de la paleta de marca.
- ❌ Usar oro/bronce/metálicos cálidos.
- ❌ Fuentes fuera de Montserrat / Montserrat Alternates.
- ❌ Esconder la propuesta de valor tras clics/acordeones (salvo FAQ).
- ❌ Saturar de animaciones; ❌ purple-gradient-on-white u otros clichés de AI slop.
- ❌ Importar imágenes/videos sin optimizar.

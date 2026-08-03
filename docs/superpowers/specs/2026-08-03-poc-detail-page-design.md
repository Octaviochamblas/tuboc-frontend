# Página dedicada POC (`/poc.html`) — diseño

**Fecha:** 2026-08-03
**Estado:** Aprobado por el usuario, pendiente de implementación.

## Objetivo

Crear una página dedicada exclusivamente a describir en detalle la pipa POC, moviendo a ella el contenido que hoy vive en 4 secciones del landing:

1. "Una pipa de agua pensada desde la funcionalidad y el diseño" (`BenefitsSection`)
2. "Menos volumen. Más portabilidad." (`ProductSection`)
3. "Protección y confidencialidad en una sola pieza." (`CaseSection`)
4. Ficha técnica (`SpecsSection`)

El landing conserva teasers cortos de cada bloque con link "Ver más" hacia la página nueva.

## Arquitectura

El sitio es una app multipágina de Vite (sin router), igual patrón que `/manual.html`:

- `poc.html` (raíz del proyecto) — nueva entrada HTML, metadata SEO calcada del patrón de `manual.html` (title, description, OG/Twitter, `canonical: https://www.tuboc.cl/poc.html`), copy adaptado del contenido existente sin inventar datos.
- `src/poc.jsx` — monta la página: `Header` (`linkBase="/"`) + `main` con `CaseSection`, `ProductSection`, `BenefitsSection`, `SpecsSection` (en ese orden) + `Footer` (`linkBase="/"`) + `WhatsAppButton` + `CanvasCursor`, con `useLenis` y `useTheme` igual que `src/manual.jsx`.
- `vite.config.js` — se agrega la entrada `poc: resolve(__dirname, 'poc.html')` a `build.rollupOptions.input`.

Los 4 componentes movidos (`CaseSection.jsx`, `ProductSection.jsx`, `BenefitsSection.jsx`, `SpecsSection.jsx`) **no se modifican internamente**: ya tienen sus propios `id` (`carcasa`, `portabilidad`, `beneficios`, `especificaciones`) y su propio CTA hacia `tuboc.shop`. Solo cambia dónde se renderizan (de `App.jsx` a `poc.jsx`).

## Landing (`App.jsx`)

Se quitan los imports/usos de `CaseSection`, `ProductSection`, `BenefitsSection`, `SpecsSection`. En su lugar, un componente nuevo:

### `PocTeaserSection.jsx` (+ `.css`)

Grid de 4 tarjetas compactas, mismo lenguaje visual `glass-card` que el resto del sitio (sin animación de glow al cursor, eso queda reservado a las secciones completas). Cada tarjeta: ícono (reutilizado de la sección original) + título + una línea de copy recortada del original + link "Ver más" → `/poc.html#<id>`. Sin CTA de compra individual (ya cubierto por el CTA final, WhatsApp y `MobileBuyBar`).

Contenido de las 4 tarjetas:

| Sección origen | id destino | Título | Línea (recortada del copy existente) |
|---|---|---|---|
| CaseSection | `carcasa` | Protección y confidencialidad en una sola pieza. | Acompaña la pieza de vidrio para proteger, transportar y conservarla con discreción. |
| ProductSection | `portabilidad` | Menos volumen. Más portabilidad. | Formato portátil y ergonómico, pensado para transportarse con seguridad y discreción. |
| BenefitsSection | `beneficios` | Una pipa de agua pensada desde la funcionalidad y el diseño | 4 ejes: funcionalidad, portabilidad, discreción y protección. |
| SpecsSection | `especificaciones` | Ficha técnica | Dimensiones, peso, material y color disponible. |

Posición en `App.jsx`: donde estaban las 4 secciones removidas (entre el bloque `intro-backdrop` y `TrustSection`).

## Navegación (`Header.jsx` / `Footer.jsx`)

**Actualizado 2026-08-03 — reemplaza el plan anterior de esta sección.** El usuario pidió simplificar el menú principal a 3 links: **Inicio**, **POC**, **Manual**.

- `Header.jsx`: `navLinks` pasa a `[{ href: '/poc.html', label: 'POC' }, { href: '/manual.html', label: 'Manual' }]`, ambos absolutos (sin prefijo `linkBase`). "Inicio" se renderiza aparte, reutilizando la misma expresión que ya usa el logo (`linkBase || '#'`): scroll-to-top en el landing, vuelve a `/` desde `poc.html`/`manual.html`. Se eliminan del nav "Producto", "Carcasa", "Portabilidad", "Beneficios" y "Preguntas" (siguen existiendo como secciones/anclas, solo salen del menú).
- `Footer.jsx`: mantiene su lista de links tal cual (Producto/Carcasa/Portabilidad/Beneficios/Preguntas/Manual de uso/Contacto), pero "Carcasa", "Portabilidad" y "Beneficios" pasan a apuntar a `/poc.html#carcasa`, `/poc.html#portabilidad`, `/poc.html#beneficios` (absolutos) ya que esas secciones se mudan a la página nueva. El footer sigue funcionando como mapa de sitio completo aunque el header ahora sea minimal.

Esto resuelve de facto el desborde de menú que preocupaba a `Por iniciar/09-rehacer-menu-navegacion.md` (3 links en vez de 5-8), aunque no agrega "Quiénes somos" ni una página de "Contacto" — esa tarea puede cerrarse o reducirse a esos dos puntos pendientes.

## Fuera de alcance

- No se toca `public/sitemap.xml` (ya está flagueado en `Por iniciar/07-assets-pendientes.md` / registro del manual que no incluye `/manual.html` tampoco).
- No se rediseña el menú completo (tarea 09 sigue abierta).
- No se modifican los 4 componentes movidos ni sus CSS.
- No se inventan datos de producto nuevos.

## Verificación

- `npm run build` pasa (genera `dist/poc.html` con chunk compartido de React/framer-motion, igual que `dist/manual.html`).
- Landing: los teasers se ven en ambos temas, cada "Ver más" navega a `/poc.html#<id>` correctamente.
- `/poc.html`: las 4 secciones completas se ven con su contenido íntegro, Lenis hace scroll suave a las anclas internas, tema claro/oscuro funciona, WhatsApp/CanvasCursor montan igual que en el manual.
- Header/Footer: en landing y en `/poc.html`, los links de nav resuelven a las URLs correctas (sin `//` duplicado por `linkBase`).
- Sin errores de consola en ninguna de las dos páginas.

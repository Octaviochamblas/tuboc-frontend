# Rehacer el menú de navegación

**Fase:** 4
**Prioridad:** Alta
**Depende de:** rama `feat/manual-page-and-canvas-cursor` mergeada (ver `Finalizado/registro-manual-y-canvas-cursor.md`)

## Contexto

El header hoy tiene cinco links, todos anclas a secciones del landing:

`Producto · Carcasa · Portabilidad · Beneficios · Preguntas`

Con la nueva página de manual el menú se queda corto, y el registro de la fase 3 ya había anotado que **un sexto link desborda en desktop medio** (por eso Especificaciones nunca se agregó). Sumar tres más no cabe con la estructura actual: hay que rediseñar, no solo añadir.

## Objetivo

Que el menú incluya:

- **Manual** → `/manual.html` (ya existe)
- **Quiénes somos** → no existe, hay que crearla
- **Contacto** → no existe como sección; hoy solo está el link de WhatsApp en el footer

## Criterios de aceptación

- [ ] Los tres destinos son alcanzables desde el header en desktop y en móvil.
- [ ] No hay desborde en desktop medio (~1024–1280px). Verificar midiendo, no a ojo.
- [ ] El scroll suave de Lenis sigue funcionando en los anclas del landing (los links locales deben seguir siendo `#seccion`, no `/#seccion`).
- [ ] Desde `/manual.html` los anclas del landing resuelven con el prefijo `/` — ya resuelto con la prop `linkBase` de `Header`/`Footer`; mantenerla al rediseñar.
- [ ] Ambos temas probados (claro y oscuro).
- [ ] Accesibilidad: `<button>` con `aria-expanded` para cualquier desplegable, navegación por teclado, foco visible.
- [ ] `npm run build` pasa.

## Decisiones pendientes (preguntar al usuario)

1. **Estructura del menú.** Con 8 destinos, las opciones son:
   - Agrupar el landing bajo un desplegable ("Producto ▾" con Carcasa/Portabilidad/Beneficios) y dejar Manual, Quiénes somos, Contacto y Preguntas al mismo nivel.
   - Reducir los anclas del landing a 2–3 y mover el resto al footer.
   - Menú overlay a pantalla completa también en desktop (más audaz, encaja con "premium = restricción").

   El skill `tuboc-brand` fija que el acordeón solo es válido en FAQ, y que en desktop van links horizontales con underline animado. Un desplegable de navegación no es lo mismo que esconder la propuesta de valor, pero conviene confirmarlo.

2. **"Quiénes somos": ¿sección del landing o página propia?**
   Página propia (`/nosotros.html`) es coherente con la infraestructura multipágina ya montada, y no alarga más un landing que ya es largo. Si es sección, el link sería un ancla más.

3. **Contenido de "Quiénes somos".** No se puede inventar. Hace falta al menos: quién está detrás, desde cuándo, y qué los llevó a hacer POC. El FAQ ya dice *"empresa dedicada a la creación de pipas de agua orientadas a la portabilidad y discreción"* y `BenefitsSection` menciona *"años de perfeccionamiento"* — hay que confirmar cuántos.

4. **"Contacto": ¿página, sección o solo WhatsApp?**
   Hoy la venta es 100% por WhatsApp (`wa.me/56976141490`). Si no hay formulario ni correo, "Contacto" puede ser simplemente el link de WhatsApp y no justifica página. Confirmar si quieren correo o formulario.

## Notas

- El header vive en `src/components/Header.jsx` + `Header.css`. La lista de links está en la constante `navLinks`.
- Al agregar páginas nuevas hay que sumarlas a `build.rollupOptions.input` en `vite.config.js`.
- Aprovechar para agregar `/manual.html` (y las páginas nuevas) a `public/sitemap.xml`, que hoy solo lista la home.

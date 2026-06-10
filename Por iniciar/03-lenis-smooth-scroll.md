# Lenis smooth scroll

**Fase:** 3 — Interacciones premium
**Prioridad:** Media

## Descripción
Integrar [Lenis](https://github.com/darkroomengineering/lenis) para scroll suave en todo el sitio — sensación premium al desplazarse.

## Criterios de aceptación
- [ ] `npm install lenis` e inicialización en `App.jsx` (o un hook `useLenis`).
- [ ] Los anchors del nav (`#producto`, `#carcasa`, `#faq`, etc.) siguen funcionando con scroll suave.
- [ ] Se desactiva si el usuario tiene `prefers-reduced-motion: reduce`.
- [ ] No interfiere con los triggers `whileInView` de framer-motion.
- [ ] Verificar rendimiento en móvil (Lenis recomienda dejar touch nativo — opción `syncTouch: false` por defecto).

## Archivos involucrados
- `package.json`
- `src/App.jsx` (o nuevo `src/hooks/useLenis.js`)

## Notas
- Probar bien antes de hacer push: el smooth scroll mal calibrado se siente peor que el scroll nativo. Duración/easing sobrios (la marca pide restricción, no espectáculo).

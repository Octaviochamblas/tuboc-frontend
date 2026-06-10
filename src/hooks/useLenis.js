import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function useLenis() {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis = null;

    const destroyLenis = () => {
      if (!lenis) return;
      lenis.destroy();
      lenis = null;
      delete window.__tubocLenis;
    };

    const createLenis = () => {
      if (reducedMotionQuery.matches || lenis) return;

      // Fuente de verdad compartida con el CSS (--anchor-offset en :root),
      // para que el salto suave y el salto nativo dejen el mismo gap bajo el header.
      const anchorOffset =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'), 10) || 96;

      lenis = new Lenis({
        autoRaf: true,
        duration: 1.05,
        easing,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
        anchors: {
          offset: -anchorOffset,
          duration: 0.95,
          easing,
        },
        prevent: (node) => node.closest('[data-lenis-prevent]') !== null,
      });

      window.__tubocLenis = lenis;
    };

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) {
        destroyLenis();
      } else {
        createLenis();
      }
    };

    createLenis();
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      destroyLenis();
    };
  }, []);
}

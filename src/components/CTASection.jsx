import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import './CTASection.css';
import pipasImg from '../assets/optimized/poc-hero-1.webp';

export default function CTASection() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 });

  const handleMagneticMove = (event) => {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-8, Math.min(8, offsetX * 0.16)));
    y.set(Math.max(-8, Math.min(8, offsetY * 0.16)));
  };

  const resetMagneticButton = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="cta-section" id="comprar">
      <div className="container">
        <div className="cta-grid">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Cómpralo ahora</h2>
            <p>Pipa POC: Disponibilidad limitada de lanzamiento. Diseño portátil, discreto y compacto en vidrio azul oscuro. Incluye carcasa protectora y pertenece a la primera edición limitada.</p>
            
            <a
              href="https://tuboc.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-cta"
              onMouseMove={handleMagneticMove}
              onMouseLeave={resetMagneticButton}
              onBlur={resetMagneticButton}
            >
              <motion.span className="btn-buy-large" style={{ x: springX, y: springY }}>
                Haz click aquí
              </motion.span>
            </a>
          </motion.div>

          <motion.div
            className="cta-image-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="cta-image-container">
              <img src={pipasImg} alt="POC de TUBOC — pipa de agua en vidrio azul profundo" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

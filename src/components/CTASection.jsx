import { motion } from 'framer-motion';
import './CTASection.css';
import pipasImg from '../assets/tuboc4.jpg';

export default function CTASection() {
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
            <p>Disponibilidad limitada de lanzamiento. Diseño portátil, discreto y compacto en vidrio azul oscuro. Incluye carcasa protectora y precio especial de primera edición: <strong>$64.990</strong>.</p>
            
            <a href="https://tuboc.shop" target="_blank" rel="noopener noreferrer" className="btn-buy-large">
              Haz click aquí
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
              <img src={pipasImg} alt="Pipas de agua TUBOC en vidrio azul profundo" loading="lazy" decoding="async" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

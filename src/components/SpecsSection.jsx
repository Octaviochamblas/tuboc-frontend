import { motion } from 'framer-motion';
import './SpecsSection.css';
import specsImg from '../assets/tuboc4.jpg';

const specs = [
  { label: 'Largo aproximado', value: '95 mm' },
  { label: 'Diámetro aproximado', value: '32 mm' },
  { label: 'Peso aproximado', value: '75 g' },
  { label: 'Color disponible', value: 'Azul oscuro' },
  { label: 'Material', value: 'Vidrio de borosilicato' },
  { label: 'Carcasa', value: 'Incluida' },
];

const handleGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const easePremium = [0.16, 1, 0.3, 1];

export default function SpecsSection() {
  return (
    <section className="specs-section" id="especificaciones">
      <div className="container">
        <motion.div
          className="specs-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easePremium }}
        >
          <span className="specs-kicker">Ficha técnica</span>
          <p>Características generales de la pieza.</p>
        </motion.div>

        <div className="specs-inner">
          {specs.map((spec, index) => (
            <motion.div
              className="spec-card glass-card"
              key={spec.label}
              onMouseMove={handleGlow}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.5, ease: easePremium, delay: index * 0.1 }}
            >
              <span className="spec-label">{spec.label}</span>
              <strong className="spec-value">{spec.value}</strong>
            </motion.div>
          ))}

          <motion.div
            className="specs-photo"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.8, ease: easePremium, delay: 0.15 }}
          >
            <img src={specsImg} alt="TUBOC — pipa de agua portátil en vidrio azul" loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

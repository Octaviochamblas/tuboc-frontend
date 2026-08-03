import { motion } from 'framer-motion';
import { CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import DynamicCTA from './DynamicCTA';
import './TrustSection.css';

const trustItems = [
  {
    icon: <ShieldCheck size={24} />,
    title: '+18',
    detail: 'Venta exclusiva para personas adultas.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Envíos a Chile',
    detail: 'Despacho coordinado según ciudad y disponibilidad.',
  },
  {
    icon: <CreditCard size={24} />,
    title: 'Pago coordinado',
    detail: 'Transferencia bancaria o compra directa según modalidad disponible.',
  },
  {
    icon: <RotateCcw size={24} />,
    title: 'Reposición',
    detail: 'Si llega dañado en transporte, se revisa con fotografías del empaque y pieza.',
  },
];

export default function TrustSection() {
  return (
    <section className="trust-section" aria-labelledby="trust-title">
      <div className="container">
        <motion.div
          className="trust-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="trust-heading">
            <span>Compra con claridad</span>
            <h2 id="trust-title">Lo esencial antes de elegir POC.</h2>
          </div>

          <div className="trust-grid">
            {trustItems.map((item) => (
              <article className="trust-item" key={item.title}>
                <span className="trust-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <DynamicCTA text="Consigue tu POC ahora" />
        </motion.div>
      </div>
    </section>
  );
}

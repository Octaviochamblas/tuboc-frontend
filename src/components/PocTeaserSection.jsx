import { motion } from 'framer-motion';
import { Shield, Hand, Layers, Ruler, ArrowRight } from 'lucide-react';
import './PocTeaserSection.css';

const teasers = [
  {
    icon: <Shield size={26} />,
    id: 'carcasa',
    title: 'Protección y confidencialidad en una sola pieza.',
    desc: 'Acompaña la pieza de vidrio para proteger, transportar y conservarla con discreción.',
  },
  {
    icon: <Hand size={26} />,
    id: 'portabilidad',
    title: 'Menos volumen. Más portabilidad.',
    desc: 'Formato portátil y ergonómico, pensado para transportarse con seguridad y discreción.',
  },
  {
    icon: <Layers size={26} />,
    id: 'beneficios',
    title: 'Una pipa de agua pensada desde la funcionalidad y el diseño',
    desc: '4 ejes: funcionalidad, portabilidad, discreción y protección.',
  },
  {
    icon: <Ruler size={26} />,
    id: 'especificaciones',
    title: 'Ficha técnica',
    desc: 'Dimensiones, peso, material y color disponible.',
  },
];

const easePremium = [0.16, 1, 0.3, 1];

export default function PocTeaserSection() {
  return (
    <section className="poc-teaser-section" id="poc-detalle">
      <div className="container">
        <motion.div
          className="poc-teaser-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easePremium }}
        >
          <span className="poc-teaser-kicker">Conoce POC</span>
          <p>Carcasa, portabilidad, beneficios y ficha técnica en detalle.</p>
        </motion.div>

        <div className="poc-teaser-grid">
          {teasers.map((teaser, index) => (
            <motion.a
              key={teaser.id}
              href={`/poc.html#${teaser.id}`}
              className="glass-card poc-teaser-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.5, ease: easePremium, delay: index * 0.1 }}
            >
              <span className="poc-teaser-icon">{teaser.icon}</span>
              <h3 className="poc-teaser-title">{teaser.title}</h3>
              <p className="poc-teaser-desc">{teaser.desc}</p>
              <span className="poc-teaser-link">
                Ver más <ArrowRight size={16} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

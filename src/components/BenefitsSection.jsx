import { motion } from 'framer-motion';
import { Droplets, Hand, EyeOff, ShieldCheck } from 'lucide-react';
import beneficiosImg from '../assets/beneficios.jpg';
import DynamicCTA from './DynamicCTA';
import './BenefitsSection.css';

const benefits = [
  { icon: <Droplets size={28} />, title: "Funcionalidad", desc: "Elevamos la experiencia tradicional incorporando la eficiencia del filtrado de agua en un formato de pipa directa. Una calada más suave y limpia sin la complejidad de los bongs convencionales." },
  { icon: <Hand size={28} />, title: "Portabilidad", desc: "Diseñada para llevarla contigo. Su formato compacto está pensado para encajar perfectamente en la palma de tu mano, ofreciendo una experiencia totalmente portátil sin sacrificar rendimiento." },
  { icon: <EyeOff size={28} />, title: "Discreción", desc: "Su estuche permite un almacenamiento completamente reservado. Una vez guardado, el dispositivo pasa desapercibido, evitando llamar la atención en tu entorno y manteniendo tu privacidad intacta." },
  { icon: <ShieldCheck size={28} />, title: "Protección", desc: "El vidrio está respaldado por su carcasa protectora. Este case a medida absorbe impactos y evita la fricción, convirtiendo a POC en una pieza robusta y segura para el transporte diario." }
];

// Glow de borde que sigue al cursor (solo desktop con hover)
const handleGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

export default function BenefitsSection() {
  return (
    <section className="benefits-section" id="beneficios">
      <div className="container">
        <div className="benefits-layout">
          <div className="benefits-content">
            <motion.div
              className="benefits-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2>
                <span>Una pipa de agua<br/>
                pensada desde</span><br/>
                la funcionalidad<br/>y el diseño
              </h2>
              <p>La filosofía de TUBOC se ha consolidado a través de años de perfeccionamiento, articulando nuestra propuesta de valor sobre 4 ejes:</p>
            </motion.div>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="glass-card benefit-card"
                  onMouseMove={handleGlow}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                >
                  <div className="benefit-card-header">
                    <div className="benefit-icon">{benefit.icon}</div>
                    <h3 className="benefit-card-title">{benefit.title}</h3>
                  </div>
                  <p className="benefit-desc">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="benefits-media glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src={beneficiosImg} alt="TUBOC Beneficios" className="benefits-media-img" />
          </motion.div>
        </div>
        <DynamicCTA text="Experimenta la diferencia con TUBOC" />
      </div>
    </section>
  );
}

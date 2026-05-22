import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Hand, EyeOff, ShieldCheck, ChevronDown } from 'lucide-react';
import beneficiosImg from '../assets/beneficios.jpg';
import DynamicCTA from './DynamicCTA';
import './BenefitsSection.css';

const benefits = [
  { icon: <Droplets size={28} />, title: "Funcionalidad", desc: "Elevamos la experiencia tradicional incorporando la eficiencia del filtrado de agua en un formato de pipa directa. Una calada más suave y limpia sin la complejidad de los bongs convencionales." },
  { icon: <Hand size={28} />, title: "Portabilidad", desc: "Diseñada para llevarla contigo. Su formato compacto está pensado para encajar perfectamente en la palma de tu mano, ofreciendo una experiencia totalmente portátil sin sacrificar rendimiento." },
  { icon: <EyeOff size={28} />, title: "Discreción", desc: "Su estuche permite un almacenamiento completamente reservado. Una vez guardado, el dispositivo pasa desapercibido, evitando llamar la atención en tu entorno y manteniendo tu privacidad intacta." },
  { icon: <ShieldCheck size={28} />, title: "Protección", desc: "El vidrio está respaldado por su carcasa protectora. Este case a medida absorbe impactos y evita la fricción, convirtiendo a TUBOC en una pieza robusta y segura para el transporte diario." }
];

export default function BenefitsSection() {
  const [openIndex, setOpenIndex] = useState(null);

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
              className={`glass-card benefit-card ${openIndex === index ? 'open' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="benefit-card-header">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <ChevronDown className={`benefit-chevron ${openIndex === index ? 'rotated' : ''}`} size={24} />
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="benefit-content"
                  >
                    <p>{benefit.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
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
            <div className="media-placeholder" style={{ padding: 0, overflow: 'hidden', height: '100%', width: '100%' }}>
              <img src={beneficiosImg} alt="TUBOC Beneficios" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
        <DynamicCTA text="Experimenta la diferencia con TUBOC" />
      </div>
    </section>
  );
}

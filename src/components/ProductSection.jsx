import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import productoImg from '../assets/producto.jpg';
import DynamicCTA from './DynamicCTA';
import './ProductSection.css';

const productFeatures = [
  { num: "1", title: "Minimalista", desc: "Diseño sobrio y pequeño de fácil manipulación." },
  { num: "2", title: "Portátil", desc: "Una pipa de agua diseñada para ser llevada contigo donde quieras." },
  { num: "3", title: "Robusto", desc: "Su estructura tubular está libre de puntos frágiles que puedan trizarse o romperse ante una mala maniobra." }
];

export default function ProductSection() {
  const [openFeatureIndex, setOpenFeatureIndex] = useState(null);

  return (
    <section className="product-section" id="portabilidad">
      <div className="container">
        <div className="product-grid">
          
          <motion.div 
            className="product-media glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="media-placeholder product-placeholder" style={{ padding: 0 }}>
              <img src={productoImg} alt="Diseño Tubular" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>

          <motion.div 
            className="product-copy"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="product-kicker">Tubular · Compacto · Robusto</span>
            <h2>Menos volumen.<br/><span>Más portabilidad.</span></h2>
            
            <p style={{marginBottom: '32px', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6'}}>
              Gracias a su formato portátil y ergonómico, puede transportarse con seguridad, comodidad y discreción, adaptándose con naturalidad a distintos contextos y estilos de vida.
            </p>

            <div className="product-features">
              {productFeatures.map((feat, index) => (
                <div 
                  key={index}
                  className={`product-feature ${openFeatureIndex === index ? 'open' : ''}`}
                  onClick={() => setOpenFeatureIndex(openFeatureIndex === index ? null : index)}
                >
                  <div className="feature-header">
                    <div className="feature-number">{feat.num}</div>
                    <strong>{feat.title}</strong>
                    <ChevronDown className="feature-chevron" size={20} />
                  </div>
                  <AnimatePresence>
                    {openFeatureIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="feature-content"
                      >
                        <p>{feat.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
        <DynamicCTA text="Obtén este producto exclusivo" />
      </div>
    </section>
  );
}

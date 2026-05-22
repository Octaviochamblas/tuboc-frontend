import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, Shield, Lock, ChevronDown } from 'lucide-react';
import carcasaImg from '../assets/carcasa_v2.jpg';
import DynamicCTA from './DynamicCTA';
import './CaseSection.css';

const casePoints = [
  { icon: <EyeOff size={20} />, title: "Discreción", desc: "Diseñada bajo un estricto estándar de privacidad, esta solución está pensada para quienes valoran la confidencialidad. Su diseño opaco asegura que el contenido se mantenga completamente reservado frente al entorno." },
  { icon: <Shield size={20} />, title: "Protección", desc: "Estructurada para absorber impactos y tensiones mecánicas, su carcasa resguarda la integridad de la pieza de vidrio, previniendo fisuras o roturas durante el uso cotidiano y el traslado." },
  { icon: <Lock size={20} />, title: "Aislación", desc: "Su estructura confina de manera efectiva el contenido interior, previniendo la filtración de aromas indeseados y garantizando un almacenamiento seguro, higiénico y libre de derrames." }
];

export default function CaseSection() {
  const [openCaseIndex, setOpenCaseIndex] = useState(null);

  return (
    <section className="case-section" id="carcasa">
      <div className="container">
        <div className="case-grid">
          
          <motion.div 
            className="case-copy"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="case-kicker">Carcasa protectora</span>
            <h2>Protección y confidencialidad <span>en una sola pieza.</span></h2>
            <p style={{marginBottom: '16px'}}>La carcasa protectora forma parte esencial de la propuesta TUBOC: acompaña la pieza de vidrio con una solución de guardado pensada para proteger, transportar y conservar el producto de manera más discreta.</p>
            
            <div className="case-points" style={{marginTop: '30px'}}>
              {casePoints.map((point, index) => (
                <div 
                  key={index}
                  className={`case-point ${openCaseIndex === index ? 'open' : ''}`} 
                  onClick={() => setOpenCaseIndex(openCaseIndex === index ? null : index)}
                >
                  <div className="case-point-header">
                    <div className="point-icon">{point.icon}</div>
                    <h3>{point.title}</h3>
                    <ChevronDown className="case-chevron" size={20} />
                  </div>
                  <AnimatePresence>
                    {openCaseIndex === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="case-point-content"
                      >
                        <p>{point.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="case-media glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="media-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={carcasaImg} alt="Carcasa TUBOC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="case-badge">
              <strong>Carcasa protectora</strong>
              <span>Guardado reservado, protección ante traslados y transporte más ordenado en una solución diseñada para acompañar la pieza.</span>
            </div>
          </motion.div>

        </div>
        <DynamicCTA text="Sé de los primeros en comprar el tuyo" />
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronDown } from 'lucide-react';
import tubocImg from '../assets/tuboc4.jpg';
import './HeroSection.css';

export default function HeroSection() {
  const [openSolution, setOpenSolution] = useState(false);

  return (
    <section className="hero-section" id="producto">
      <div className="container">
        <div className="hero-grid">
          
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-tagline">Innovación - Portabilidad - Discreción</span>
            <h1 className="hero-title">
              <span>Innovación</span> <br /> 
              en pipas <br />
              de agua <br />
              <span>portátiles</span>
            </h1>
            <div 
              className={`solution-feature glass-card ${openSolution ? 'open' : ''}`}
              onClick={() => setOpenSolution(!openSolution)}
              style={{marginBottom: '24px', marginTop: '16px', padding: '16px 20px', textAlign: 'left', background: 'var(--hero-card-bg)', borderColor: 'transparent', boxShadow: 'var(--glass-card-shadow)'}}
            >
              <div className="solution-feature-header">
                <div className="solution-icon" style={{width: '28px', height: '28px', minWidth: '28px', fontSize: '0.9rem', color: 'var(--hero-card-icon-text)'}}>✓</div>
                <strong style={{fontSize: '1rem', textAlign: 'left', lineHeight: '1.4', color: 'var(--hero-card-text)'}}>¿Cómo hacer pipas de agua más portables, robustas y discretas sin perder funcionalidad?</strong>
                <ChevronDown className="solution-chevron" style={{color: 'var(--hero-card-text)'}} size={18} />
              </div>
              <AnimatePresence>
                {openSolution && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="solution-content"
                  >
                    <p style={{marginBottom: '10px', fontSize: '0.9rem', paddingLeft: '48px', color: 'var(--hero-card-text)', opacity: 0.8}}>Sintetizamos las prestaciones funcionales del filtrado del humo en el agua, propio de los bongs convencionales, en una pieza portatil y robusta, concebida como una estructura tubular libre de puntos vulnerables.</p>
                    <p style={{fontSize: '0.9rem', paddingLeft: '48px', color: 'var(--hero-card-text)', opacity: 0.8}}>Cada unidad incorpora una carcasa personalizada que resguarda el dispositivo durante su transporte y almacenamiento, aportando protección, discreción y una presencia sobria y refinada.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="hero-description" style={{marginBottom: '40px'}}>
              Ofrecemos bongs portátiles de vidrio borosilicato en formato tubular compacto. Incluyen su carcasa protectora para un transporte seguro y discreto.
            </p>
            
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
          >
            {/* 3D Glass Representation */}
            <motion.div 
              className="pipe-photo-container"
              style={{ width: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
            >
              <img src={tubocImg} alt="Pipas TUBOC" style={{ width: '100%', height: '100%', minHeight: '500px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} />
            </motion.div>

            <div className="hero-actions" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div className="hero-price" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
                $64.990
              </div>
              <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '20px 32px' }}>
                <ShoppingBag size={20} />
                Comprar ahora
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
// Force HMR

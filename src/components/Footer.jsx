import React from 'react';
import logoImg from '../assets/logo_v3.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={logoImg} alt="TUBOC Logo" style={{ height: '48px', width: 'auto', display: 'block', borderRadius: '8px', marginBottom: '16px' }} />
            <p>Innovación en pipas de agua portátiles.</p>
          </div>
          <div className="footer-links">
            <a href="#producto">Producto</a>
            <a href="#carcasa">Carcasa</a>
            <a href="#portabilidad">Portabilidad</a>
            <a href="#beneficios">Beneficios</a>
            <a href="#faq">Preguntas</a>
            <a href="https://wa.me/56976141490" target="_blank" rel="noreferrer">Contacto</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TUBOC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

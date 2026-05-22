import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';
import logoImg from '../assets/logo_v3.png';
import './Header.css';

export default function Header({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="top-bar">
        <span>🔥 Precio especial de lanzamiento $64.990 — ¡Últimas unidades en azul oscuro!</span>
      </div>
      <div className="container header-container">
        <a href="#" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src={logoImg} alt="TUBOC Logo" style={{ height: '52px', width: 'auto', display: 'block', borderRadius: '8px' }} />
        </a>
        
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-buy-nav">
            <ShoppingBag size={18} /> Comprar
          </a>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <nav className={`desktop-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="container nav-links-container">
          <a href="#producto" onClick={() => setMobileMenuOpen(false)}>Producto</a>
          <a href="#carcasa" onClick={() => setMobileMenuOpen(false)}>Carcasa</a>
          <a href="#portabilidad" onClick={() => setMobileMenuOpen(false)}>Portabilidad</a>
          <a href="#beneficios" onClick={() => setMobileMenuOpen(false)}>Beneficios</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>Preguntas</a>
        </div>
      </nav>
    </header>
  );
}

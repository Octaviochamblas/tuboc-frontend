import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react';
import logoImg from '../assets/logo_v3.png';
import './Header.css';

const navLinks = [
  { href: '/poc.html', label: 'POC' },
  { href: '/manual.html', label: 'Manual' },
];

/* linkBase: '' en el landing (anchors locales, los maneja Lenis).
   '/' en páginas como el manual, donde las secciones viven en la home. */
export default function Header({ theme, toggleTheme, linkBase = '' }) {
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
        <span>Primera edición limitada en vidrio azul profundo</span>
      </div>
      <div className="container header-container">
        <a href={linkBase || '#'} className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src={logoImg} alt="TUBOC Logo" />
        </a>

        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href={linkBase || '#'} onClick={() => setMobileMenuOpen(false)}>
            Inicio
          </a>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-buy-nav">
            <ShoppingBag size={18} /> Comprar
          </a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
}

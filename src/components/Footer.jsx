import logoImg from '../assets/logo_v3.png';
import './Footer.css';

/* linkBase: ver Header. '' en el landing, '/' en el manual. */
export default function Footer({ linkBase = '' }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={logoImg} alt="TUBOC Logo" style={{ height: '48px', width: 'auto', display: 'block', borderRadius: '8px', marginBottom: '16px' }} />
            <p>Innovación en pipas de agua portátiles.</p>
          </div>
          <div className="footer-links">
            <a href={`${linkBase}#producto`}>Producto</a>
            <a href={`${linkBase}#carcasa`}>Carcasa</a>
            <a href={`${linkBase}#portabilidad`}>Portabilidad</a>
            <a href={`${linkBase}#beneficios`}>Beneficios</a>
            <a href={`${linkBase}#faq`}>Preguntas</a>
            <a href="/manual.html">Manual de uso</a>
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

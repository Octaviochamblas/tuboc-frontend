import { motion } from 'framer-motion';
import { ShoppingBag, Hand, EyeOff, ShieldCheck } from 'lucide-react';
import heroAvif from '../assets/optimized/tuboc-carcasa.avif';
import heroWebp from '../assets/optimized/tuboc-carcasa.webp';
import heroJpg from '../assets/optimized/tuboc-carcasa.jpg';
import './HeroSection.css';

const claims = [
  { icon: <Hand size={22} />, title: 'Portátil', desc: 'Del tamaño de tu mano: llévala contigo donde quieras.' },
  { icon: <EyeOff size={22} />, title: 'Discreta', desc: 'Su diseño minimalista pasa completamente desapercibido.' },
  { icon: <ShieldCheck size={22} />, title: 'Protegida', desc: 'Su carcasa absorbe golpes y contiene los olores.' },
];

const easePremium = [0.16, 1, 0.3, 1];
const reveal = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: easePremium, delay },
});

export default function HeroSection() {
  return (
    <section className="hero-section" id="producto">
      <div className="container">
        <div className="hero-grid">

          <motion.div className="hero-heading" {...reveal(0)}>
            <span className="hero-tagline">Innovación · Portabilidad · Discreción</span>
            <h1 className="hero-title">
              La pipa de agua portátil <span>que cabe en tu mano</span>
            </h1>
          </motion.div>

          <motion.div className="hero-claims-block" {...reveal(0.15)}>
            <ul className="hero-claims">
              {claims.map((claim) => (
                <li key={claim.title}>
                  <span className="hero-claim-icon">{claim.icon}</span>
                  <p><strong>{claim.title}.</strong> {claim.desc}</p>
                </li>
              ))}
            </ul>
            <p className="hero-positioning">
              Para quienes buscan una experiencia más compacta, sobria y moderna.
            </p>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: easePremium, delay: 0.2 }}
          >
            <div className="hero-photo">
              <picture>
                <source srcSet={heroAvif} type="image/avif" />
                <source srcSet={heroWebp} type="image/webp" />
                <img src={heroJpg} alt="Pipa de agua TUBOC junto a su carcasa protectora" />
              </picture>
              <span className="hero-badge">Incluye carcasa protectora</span>
            </div>
            <div className="hero-pills">
              <span>Formato portátil</span>
              <span>Diseño tubular sin puntos frágiles</span>
            </div>
          </motion.div>

          <motion.p className="hero-description" {...reveal(0.25)}>
            Bong en formato tubular compacto, protegido dentro de su carcasa
            para transportarlo con discreción, sin la estética voluminosa de
            las pipas de agua tradicionales.
          </motion.p>

          <motion.div className="hero-actions" {...reveal(0.3)}>
            <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-primary">
              <ShoppingBag size={20} />
              Comprar ahora
            </a>
            <span className="hero-edition">Primera edición limitada</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

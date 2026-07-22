import { motion } from 'framer-motion';
import './VideoIntroSection.css';
import tubocWebm from '../assets/optimized/tuboc-intro.webm';
import tubocMp4 from '../assets/optimized/tuboc-intro.mp4';
import tubocPoster from '../assets/optimized/tuboc-intro-poster.jpg';

export default function VideoIntroSection() {
  // Al ser la primera sección de la página, el video entra siempre en el
  // viewport inicial: el montaje diferido con useInView que había antes no
  // ahorraba nada. Carga directa y preload="auto" (decisión del usuario:
  // priorizar el impacto visual por sobre el LCP).
  return (
    <section className="video-section">
      <div className="container">
        <motion.div
          className="video-wrapper glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={tubocPoster}
            className="tuboc-video"
          >
            <source src={tubocWebm} type="video/webm" />
            <source src={tubocMp4} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

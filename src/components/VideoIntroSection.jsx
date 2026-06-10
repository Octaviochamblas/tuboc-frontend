import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './VideoIntroSection.css';
import tubocWebm from '../assets/optimized/tuboc-intro.webm';
import tubocMp4 from '../assets/optimized/tuboc-intro.mp4';
import tubocPoster from '../assets/optimized/tuboc-intro-poster.jpg';

export default function VideoIntroSection() {
  const ref = useRef(null);
  // El video solo se monta (y por tanto se descarga) cuando la sección
  // se acerca al viewport. Antes de eso, el degradado del wrapper actúa de placeholder.
  const inView = useInView(ref, { once: true, margin: '200px' });

  return (
    <section className="video-section" ref={ref}>
      <div className="container">
        <motion.div
          className="video-wrapper glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {inView && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster={tubocPoster}
              className="tuboc-video"
            >
              <source src={tubocWebm} type="video/webm" />
              <source src={tubocMp4} type="video/mp4" />
            </video>
          )}
        </motion.div>
      </div>
    </section>
  );
}

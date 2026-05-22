import React from 'react';
import { motion } from 'framer-motion';
import './VideoIntroSection.css';
import tubocVideo from '../assets/Tuboc Horizontal 2.mp4';

export default function VideoIntroSection() {
  return (
    <section className="video-section">
      <div className="container">
        <motion.div 
          className="video-wrapper glass-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <video 
            src={tubocVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="tuboc-video"
          />
        </motion.div>
      </div>
    </section>
  );
}

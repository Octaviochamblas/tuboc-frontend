import React from 'react';
import { ShoppingBag } from 'lucide-react';
import './DynamicCTA.css';

export default function DynamicCTA({ text = "Obtener mi TUBOC ahora" }) {
  return (
    <div className="dynamic-cta-container">
      <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="dynamic-cta-button">
        <span className="shimmer-effect"></span>
        <ShoppingBag size={20} />
        {text}
      </a>
    </div>
  );
}

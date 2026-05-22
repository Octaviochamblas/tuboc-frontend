import React from 'react';
import './MobileBuyBar.css';

export default function MobileBuyBar() {
  return (
    <div className="mobile-buy-bar">
      <div className="mobile-price">
        <span className="price-label">Lleva el tuyo por</span>
        <strong>$64.990</strong>
      </div>
      <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-buy-mobile">
        Comprar Ahora
      </a>
    </div>
  );
}

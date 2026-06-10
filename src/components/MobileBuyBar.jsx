import './MobileBuyBar.css';

export default function MobileBuyBar() {
  return (
    <div className="mobile-buy-bar">
      <div className="mobile-price">
        <span className="price-label">Primera edición</span>
        <strong>Disponible ahora</strong>
      </div>
      <a href="https://tuboc.shop" target="_blank" rel="noreferrer" className="btn-buy-mobile">
        Comprar Ahora
      </a>
    </div>
  );
}

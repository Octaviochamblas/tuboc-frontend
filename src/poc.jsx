import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CaseSection from './components/CaseSection';
import ProductSection from './components/ProductSection';
import BenefitsSection from './components/BenefitsSection';
import SpecsSection from './components/SpecsSection';
import WhatsAppButton from './components/WhatsAppButton';
import CanvasCursor from './components/CanvasCursor';
import useLenis from './hooks/useLenis';
import useTheme from './hooks/useTheme';
import './poc.css';

function PocPage() {
  useLenis();
  const { theme, toggleTheme } = useTheme();

  // linkBase '/': las anclas del landing (Producto, Preguntas) viven en la home.
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} linkBase="/" />
      <main className="poc-page-main">
        <BenefitsSection />
        <CaseSection />
        <ProductSection />
        <SpecsSection />
      </main>
      <Footer linkBase="/" />
      <WhatsAppButton />
      <CanvasCursor />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PocPage />
  </StrictMode>
);

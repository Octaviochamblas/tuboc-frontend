import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import Footer from './components/Footer';
import ManualSection from './components/ManualSection';
import WhatsAppButton from './components/WhatsAppButton';
import CanvasCursor from './components/CanvasCursor';
import useLenis from './hooks/useLenis';
import useTheme from './hooks/useTheme';
import './index.css';

function ManualPage() {
  useLenis();
  const { theme, toggleTheme } = useTheme();

  // linkBase '/': las secciones del menú viven en la home, no en esta página.
  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} linkBase="/" />
      <main>
        <ManualSection />
      </main>
      <Footer linkBase="/" />
      <WhatsAppButton />
      <CanvasCursor />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ManualPage />
  </StrictMode>
);

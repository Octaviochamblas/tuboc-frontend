import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoIntroSection from './components/VideoIntroSection';
import BenefitsSection from './components/BenefitsSection';
import CaseSection from './components/CaseSection';
import ProductSection from './components/ProductSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import SpecsSection from './components/SpecsSection';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBuyBar from './components/MobileBuyBar';
import useLenis from './hooks/useLenis';

function App() {
  useLenis();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('tuboc-theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tuboc-theme', theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <VideoIntroSection />
        <CaseSection />
        <ProductSection />
        <BenefitsSection />
        <SpecsSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBuyBar />
    </>
  );
}

export default App;

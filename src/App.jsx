import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoIntroSection from './components/VideoIntroSection';
import BenefitsSection from './components/BenefitsSection';
import CaseSection from './components/CaseSection';
import ProductSection from './components/ProductSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBuyBar from './components/MobileBuyBar';

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VideoIntroSection />
        <CaseSection />
        <ProductSection />
        <BenefitsSection />
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

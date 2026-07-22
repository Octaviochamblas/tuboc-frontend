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
import CanvasCursor from './components/CanvasCursor';
import useLenis from './hooks/useLenis';
import useTheme from './hooks/useTheme';

function App() {
  useLenis();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        {/* Video y hero comparten un solo fondo continuo: si cada sección
            pintara su propio gradiente, se verían dos manchas y un corte
            de color al scrollear. */}
        <div className="intro-backdrop">
          <VideoIntroSection />
          <HeroSection />
        </div>
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
      <CanvasCursor />
    </>
  );
}

export default App;

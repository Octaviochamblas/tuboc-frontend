import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VideoIntroSection from './components/VideoIntroSection';
import PocTeaserSection from './components/PocTeaserSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
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
        <PocTeaserSection />
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

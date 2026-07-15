import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./sections/HeroSection";
import WhoItsForSection from "./sections/WhoItsForSection";
import PlatformPreviewSection from "./sections/PlatformPreviewSection";

function App() {
  return (
    <>
      <Navbar />

      <main aria-label="Main content">
        <HeroSection />
        <WhoItsForSection />
        <PlatformPreviewSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
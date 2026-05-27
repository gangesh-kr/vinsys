import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import GlobalImpact from './components/GlobalImpact';
import AIInnovation from './components/AIInnovation';
import CaseStudies from './components/CaseStudies';
import Timeline from './components/Timeline';
import Leadership from './components/Leadership';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Cinematic Custom Cursor Follower */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Orchestrated Flow */}
      <main>
        {/* Hero Landing + 3D R3F Globe */}
        <Hero />

        {/* Interactive Constellation Node Grid */}
        <Ecosystem />

        {/* High-Tech Vector Map & Stats */}
        <GlobalImpact />

        {/* AI Innovation & R3F Neural Network */}
        <AIInnovation />

        {/* GSAP Horizontal Scroll success stories */}
        <CaseStudies />

        {/* Vertical Scroll-drawn Timeline */}
        <Timeline />

        {/* Brand Vision Quote Panel */}
        <Leadership />

        {/* intake form & compliance details */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}

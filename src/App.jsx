import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import GlobalImpact from './components/GlobalImpact';
import AIInnovation from './components/AIInnovation';
import CaseStudies from './components/CaseStudies';
import Timeline from './components/Timeline';
import Leadership from './components/Leadership';
import CSRInitiatives from './components/CSRInitiatives';
import CareerBanner from './components/CareerBanner';
import LatestInsights from './components/LatestInsights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquireModal from './components/EnquireModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ctaRef = useRef(null);

  const triggerModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const btnX = rect.left + rect.width / 2;
      const btnY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.hypot(mouseX - btnX, mouseY - btnY);

      if (distance < 120) {
        const x = (mouseX - btnX) * 0.35;
        const y = (mouseY - btnY) * 0.35;
        gsap.to(btn, {
          x: x,
          y: y,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        overwrite: 'auto'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Cinematic Custom Cursor Follower */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar onEnquireClick={triggerModal} />

      {/* Main Orchestrated Flow */}
      <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        {/* Hero Landing + 3D R3F Globe */}
        <Hero onEnquireClick={triggerModal} />

        {/* Group Services Constellation Node Grid */}
        <Ecosystem />

        {/* Global Hubs Map & Client Wall */}
        <GlobalImpact onEnquireClick={triggerModal} />

        {/* AI Innovation & R3F Neural Network */}
        <AIInnovation />

        {/* GSAP Horizontal Scroll success stories */}
        <CaseStudies />

        {/* Vertical Scroll-drawn Timeline */}
        <Timeline />

        {/* Brand Vision Quote Panel */}
        <Leadership />

        {/* CSR Initiatives */}
        <CSRInitiatives />

        {/* Career Gateway Banner */}
        <CareerBanner onEnquire={triggerModal} />

        {/* Latest Insights Press Releases */}
        <LatestInsights />

        {/* Intake form & contact details */}
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer onEnquireClick={triggerModal} />

      {/* Global Enquire Modal */}
      <EnquireModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Floating CTA "Enquire Now" */}
      <button
        ref={ctaRef}
        onClick={triggerModal}
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          zIndex: 999,
          background: 'linear-gradient(135deg, var(--brand-crimson), var(--brand-orange))',
          color: '#ffffff',
          border: 'none',
          padding: '0.9rem 1.8rem',
          borderRadius: '50px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(173, 51, 45, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          transition: 'background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
        }}
        className="floating-enquire-btn"
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            display: 'block'
          }}
          className="ping-dot"
        />
        <span>Enquire Now</span>
      </button>

      <style>{`
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          70% { transform: scale(2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .ping-dot {
          position: relative;
        }
        .ping-dot::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          border-radius: 50%;
          background-color: #ffffff;
          animation: ping 1.5s infinite ease-out;
        }
        .floating-enquire-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 30px rgba(173, 51, 45, 0.45);
        }
      `}</style>
    </>
  );
}

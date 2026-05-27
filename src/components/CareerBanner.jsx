import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, Briefcase } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

export default function CareerBanner({ onEnquire }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current) {
        const flexEl = bannerRef.current.querySelector('.career-banner-flex');
        if (flexEl) {
          gsap.fromTo(flexEl.children,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.8, ease: 'power3.out', stagger: 0.1,
              scrollTrigger: {
                trigger: bannerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      }
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, rgba(173, 51, 45, 0.03) 0%, rgba(246, 147, 32, 0.03) 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(0, 0, 0, 0.04)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
      }}
      id="career"
    >
      {/* Decorative vector grid shapes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(var(--brand-crimson) 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
          className="career-banner-flex"
        >
          {/* Main content area */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1px solid rgba(173, 51, 45, 0.1)',
                width: 'fit-content',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.02)',
              }}
            >
              <Briefcase size={14} style={{ color: 'var(--brand-crimson)' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--brand-crimson)' }}>
                Careers at Vinsys
              </span>
            </div>

            <TypographyReveal
              tag="h2"
              text="Your Gateway to Professional Excellence!"
              animationType="reveal"
              style={{
                fontSize: 'calc(1.8rem + 1vw)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            />

            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                maxWidth: '680px',
                margin: 0,
              }}
            >
              Vinsys, an ISO 9001:2015 certified global training provider, has over 25 years of experience empowering professionals across private and government sectors. Grow your potential with us.
            </p>
          </div>

          {/* Action Area */}
          <div style={{ flexShrink: 0 }} className="career-cta-btn-wrapper">
            <button
              onClick={onEnquire}
              className="btn-primary"
              style={{
                padding: '1rem 2.2rem',
                fontSize: '1.05rem',
                boxShadow: '0 8px 24px rgba(173, 51, 45, 0.15)',
              }}
            >
              <span>Join Our Team</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .career-banner-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2rem !important;
          }
          .career-cta-btn-wrapper {
            width: 100%;
          }
          .career-cta-btn-wrapper button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

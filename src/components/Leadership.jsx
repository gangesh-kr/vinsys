import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Quote, User, Briefcase, Award } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const bentoRef = useRef(null);

  const leaders = [
    {
      id: 0,
      name: 'Karan Patil',
      role: 'Promoter',
      quote: 'Transformation extends beyond learning. It is the integration of digital capabilities, secure environments, and responsive processes that makes a global organization resilient.',
      tagline: 'Vinsys IT Services Ltd',
      color: 'var(--brand-crimson)',
      rgb: '173,51,45',
      metric: '25+ Years Strategy'
    },
    {
      id: 1,
      name: 'Vikrant Patil',
      role: 'Managing Director & Chairman',
      quote: 'Shaping a future where learning is integrated into enterprise systems dynamically. We empower Fortune 500 boards with capabilities to sustain AI acceleration.',
      tagline: 'Vinsys Group Executive Board',
      color: 'var(--brand-orange)',
      rgb: '246,147,32',
      metric: 'NSE-Listed Growth'
    },
    {
      id: 2,
      name: 'Kunal Patil',
      role: 'Director - International Operations',
      quote: 'Expertise in training, consulting, and global delivery allows us to solve complex challenges across diverse ecosystems smoothly.',
      tagline: 'Vinsys International Division',
      color: 'var(--brand-amber)',
      rgb: '255,180,47',
      metric: '5+ Global Continents'
    },
  ];
  useEffect(() => {
    const trigger = triggerRef.current;
    const section = sectionRef.current;
    const bento = bentoRef.current;
    if (!trigger || !section || !bento) return;

    const cards = bento.querySelectorAll('.bento-card');
    const quotes = bento.querySelectorAll('.quote-text-block');
    const indicators = bento.querySelectorAll('.indicator-dot');

    const mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
      // Create master scroll scrub timeline pinning the inner section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=200%', // 3 screens high scroll distance
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Frame 1 is default (0 to 0.3)
      // Transition to Frame 2 (Vikrant Patil MD)
      tl.to(cards[0], { yPercent: -120, scale: 0.9, opacity: 0, rotate: -2, zIndex: 1, ease: 'power2.inOut' }, 0.5)
        .to(cards[1], { yPercent: 0, scale: 1, opacity: 1, rotate: 0, zIndex: 5, ease: 'power2.inOut' }, 0.5)
        .to(quotes[0], { y: -30, opacity: 0, filter: 'blur(4px)', ease: 'power2.inOut' }, 0.5)
        .to(quotes[1], { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'power2.inOut' }, 0.5)
        .to(indicators[0], { scale: 1, opacity: 0.3, ease: 'power2.inOut' }, 0.5)
        .to(indicators[1], { scale: 1.5, opacity: 1, ease: 'power2.inOut' }, 0.5);

      // Transition to Frame 3 (Kunal Patil International)
      tl.to(cards[1], { yPercent: -120, scale: 0.9, opacity: 0, rotate: -2, zIndex: 1, ease: 'power2.inOut' }, 1.5)
        .to(cards[2], { yPercent: 0, scale: 1, opacity: 1, rotate: 0, zIndex: 5, ease: 'power2.inOut' }, 1.5)
        .to(quotes[1], { y: -30, opacity: 0, filter: 'blur(4px)', ease: 'power2.inOut' }, 1.5)
        .to(quotes[2], { y: 0, opacity: 1, filter: 'blur(0px)', ease: 'power2.inOut' }, 1.5)
        .to(indicators[1], { scale: 1, opacity: 0.3, ease: 'power2.inOut' }, 1.5)
        .to(indicators[2], { scale: 1.5, opacity: 1, ease: 'power2.inOut' }, 1.5);
    });

    return () => mm.revert();
  }, []);
  return (
    <div ref={triggerRef} style={{ width: '100%' }}>
      <section
        ref={sectionRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          background: '#fcfcfc',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '4rem 0'
        }}
        id="about"
      >
        {/* Soft atmospheric background glow */}
        <div className="glow-bg glow-purple" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03 }} />

        <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>

          {/* Header */}
          <div style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
            <span className="section-tag" style={{ color: 'var(--brand-crimson)' }}>Governance & Vision</span>
            <TypographyReveal
              tag="h2"
              text="Message From Leadership"
              animationType="tracking"
              className="section-title text-gradient"
              style={{ fontSize: 'clamp(2.2rem, 3vw + 1rem, 3.6rem)', margin: '0.5rem auto 1.2rem' }}
            />
            <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Meet the leaders guiding our global network towards scalable transformation and digital capability excellence.
            </p>
          </div>

          {/* Interactive Pinned Bento Layout */}
          <div
            ref={bentoRef}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: '3rem',
              alignItems: 'center',
              maxWidth: '1200px',
              margin: '0 auto',
              position: 'relative',
              height: '500px'
            }}
            className="leadership-bento-grid"
          >
            {/* 1. Left Side: Active Bento Profile Card */}
            <div style={{ position: 'relative', height: '100%', width: '100%' }} className="bento-cards-stack">
              {leaders.map((leader, index) => {
                const isFirst = index === 0;
                return (
                  <div
                    key={leader.id}
                    className={`bento-card glass-panel ${isFirst ? 'active-first' : ''}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: '2.5rem',
                      background: '#ffffff',
                      borderRadius: '20px',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      boxShadow: '0 15px 45px rgba(0, 0, 0, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      opacity: isFirst ? 1 : 0,
                      zIndex: isFirst ? 5 : 1,
                      overflow: 'hidden'
                    }}
                  >
                    {/* Atmospheric card top accent */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${leader.color}, var(--brand-orange))` }} />

                    {/* Vector/Decorative visual header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '12px',
                          background: `rgba(${leader.rgb}, 0.08)`,
                          color: leader.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid rgba(${leader.rgb}, 0.15)`
                        }}
                      >
                        <User size={26} />
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: leader.color,
                          background: `rgba(${leader.rgb}, 0.05)`,
                          border: `1px solid rgba(${leader.rgb}, 0.15)`,
                          padding: '0.3rem 0.8rem',
                          borderRadius: '20px',
                          letterSpacing: '0.05em'
                        }}
                      >
                        {leader.metric}
                      </span>
                    </div>

                    {/* Core details */}
                    <div>
                      <h3
                        style={{
                          fontSize: '1.8rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '0.4rem',
                          fontFamily: 'var(--font-heading)'
                        }}
                      >
                        {leader.name}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.90rem',
                          fontWeight: 650,
                          color: 'var(--brand-orange)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          display: 'block',
                          marginBottom: '1.2rem'
                        }}
                      >
                        {leader.role}
                      </span>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {leader.tagline}
                      </p>
                      <div className="mobile-quote" style={{ display: 'none', marginTop: '1.25rem', paddingLeft: '1rem', borderLeft: '2px solid var(--brand-crimson)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        "{leader.quote}"
                      </div>
                    </div>

                    {/* Bottom visual elements */}
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '1.2rem' }}>
                      <Briefcase size={16} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Vinsys Corporate Governance Board</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. Right Side: Interactive Quote Showcase */}
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '2rem',
                position: 'relative'
              }}
              className="bento-quote-panel"
            >
              {/* Quote Mark Icon */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--brand-crimson), var(--brand-orange))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(173, 51, 45, 0.15)',
                  marginBottom: '2rem'
                }}
              >
                <Quote size={24} style={{ fill: '#fff' }} />
              </div>

              {/* Quote stack */}
              <div style={{ position: 'relative', minHeight: '180px' }}>
                {leaders.map((leader, index) => {
                  const isFirst = index === 0;
                  return (
                    <div
                      key={`quote-${leader.id}`}
                      className={`quote-text-block ${isFirst ? 'active-first' : ''}`}
                      style={{
                        position: isFirst ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        opacity: isFirst ? 1 : 0
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 'calc(1.25rem + 0.6vw)',
                          fontWeight: 400,
                          lineHeight: 1.6,
                          color: 'var(--text-primary)',
                          fontStyle: 'italic',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        "{leader.quote}"
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic scroll indicator dots */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.8rem',
                  alignItems: 'center',
                  marginTop: '3.5rem'
                }}
                className="scroll-indicator-bar"
              >
                {leaders.map((leader, index) => (
                  <div
                    key={`ind-${leader.id}`}
                    className={`indicator-dot ${index === 0 ? 'active-first' : ''}`}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: leader.color
                    }}
                  />
                ))}
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Scroll to view narrative
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (min-width: 960px) {
          .bento-card {
            transform: translateY(120%) scale(0.9);
          }
          .bento-card.active-first {
            transform: none;
          }
          .quote-text-block {
            transform: translateY(30px);
          }
          .quote-text-block.active-first {
            transform: none;
          }
          .indicator-dot {
            opacity: 0.3;
            transform: scale(1);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .indicator-dot.active-first {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}

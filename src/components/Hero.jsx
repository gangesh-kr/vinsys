import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import { ArrowRight, Play } from 'lucide-react';
import useInView from '../hooks/useInView';

export default function Hero({ onEnquireClick }) {
  const [containerRef, isInView] = useInView();
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const btnGroupRef = useRef(null);
  const statsRef = useRef(null);
  const cursorPosition = useRef({ x: 0, y: 0 });

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordRef = useRef(null);
  const rotatingWords = [
    'Innovative Solution',
    'Possibilities',
    'Technologies',
    'Technologies for Tomorrow'
  ];

  const isFirstRender = useRef(true);

  // Animate in the new word after the state update has rendered
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!wordRef.current) return;

    gsap.fromTo(wordRef.current,
      { opacity: 0, y: 25, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
    );
  }, [currentWordIndex]);

  // Interval to trigger animate out
  useEffect(() => {
    const wordInterval = setInterval(() => {
      if (wordRef.current) {
        gsap.to(wordRef.current, {
          opacity: 0,
          y: -20,
          filter: 'blur(8px)',
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
          }
        });
      }
    }, 3200);
    return () => clearInterval(wordInterval);
  }, []);


  // Parallax cursor tracker for 3D canvas
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const w = window.innerWidth;
    const h = window.innerHeight;
    cursorPosition.current = {
      x: (clientX / w) * 2 - 1,
      y: -(clientY / h) * 2 + 1,
    };
  };

  useEffect(() => {
    // GSAP staggered loading animations
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
      '-=0.6'
    );

    tl.fromTo(descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.0 },
      '-=0.8'
    );

    tl.fromTo(btnGroupRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.8'
    );

    tl.fromTo(statsRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '-=0.6'
    );

    // Subtle number counting simulation
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const isYears = counter.textContent.includes('Yr') || counter.textContent.includes('Decades');
      const suffix = isYears ? ' Decades' : '+';
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: 'power3.out',
        scrollTrigger: counter,
        onUpdate: () => {
          if (isYears) {
            counter.textContent = Math.floor(obj.val) + suffix;
          } else if (target >= 1000000) {
            counter.textContent = (obj.val / 1000000).toFixed(1) + 'M+';
          } else {
            counter.textContent = Math.floor(obj.val).toLocaleString() + suffix;
          }
        }
      });
    });
  }, []);

  const stats = [
    { number: '0+', target: 50, label: 'Countries Served' },
    { number: '0+', target: 5000, label: 'Enterprise Clients' },
    { number: '0M+', target: 1000000, label: 'Professionals Upskilled' },
    { number: '0 Yr', target: 2, label: 'Global Experience' }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 0 4rem 0',
        background: 'var(--bg-dark)',
        overflow: 'hidden',
      }}
      id="hero"
    >
      {/* Video Overlay for Readability and Blend */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Grid background structure */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          opacity: 0.6,
          zIndex: 2
        }}
      />

      {/* Decorative colored glow lights */}
      <div className="glow-bg glow-blue" style={{ width: '600px', height: '600px', top: '10%', left: '-10%', zIndex: 2 }} />
      <div className="glow-bg glow-cyan" style={{ width: '600px', height: '600px', bottom: '10%', right: '-10%', zIndex: 2 }} />

      <div className="container" style={{ position: 'relative', zIndex: 5, maxWidth: '1440px', margin: '0 auto', width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
        <div className="hero-split-grid">
          {/* Left Column: Typography & CTAs */}
          <div className="hero-left-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Floating tech badge */}
            <div
              ref={badgeRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                background: 'rgba(173, 51, 45, 0.05)',
                border: '1px solid rgba(173, 51, 45, 0.2)',
                marginBottom: '2rem',
                boxShadow: '0 0 15px rgba(173, 51, 45, 0.1)',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-crimson)', display: 'block', boxShadow: '0 0 8px var(--brand-crimson)' }} />
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--brand-crimson)' }}>
                AI-POWERED GLOBAL TRANSFORMATION
              </span>
            </div>

            {/* Cinematic Header Text with Rotating Words */}
            <h1
              ref={titleRef}
              className="hero-headline"
              style={{
                fontSize: 'calc(1.8rem + 2.2vw)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                maxWidth: '750px',
                minHeight: '150px', // Prevent height shifts
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 1.5rem auto'
              }}
            >
              <span className="text-gradient">Scaling Enterprise</span>
              <span
                ref={wordRef}
                style={{
                  color: 'var(--brand-crimson)',
                  display: 'inline-block',
                  margin: '0.3rem 0',
                }}
              >
                {rotatingWords[currentWordIndex]}
              </span>
            </h1>

            {/* Lead subtext */}
            <p
              ref={descRef}
              className="hero-desc"
              style={{
                fontSize: 'calc(0.95rem + 0.15vw)',
                color: 'var(--text-secondary)',
                maxWidth: '580px',
                margin: '0 auto 3rem auto',
                lineHeight: 1.6,
              }}
            >
              Delivering smart, future-ready solutions that drive innovation, sustainability, and lasting global impact.
            </p>

            {/* CTA Buttons */}
            <div
              ref={btnGroupRef}
              className="hero-cta-btn-group"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}
            >
              <a href="#about" className="btn-primary">
                <span>Know More About Us</span>
                <ArrowRight size={16} />
              </a>
              <button
                onClick={onEnquireClick}
                className="btn-secondary"
                style={{ border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', background: '#fff' }}
              >
                <span>Enquire Now</span>
                <Play size={14} style={{ fill: 'var(--brand-crimson)', color: 'var(--brand-crimson)' }} />
              </button>
            </div>
          </div>

          {/* Right Column: Globe Canvas container */}
          <div className="hero-globe-container" style={{
            position: 'relative',
            width: '100%',
            height: '480px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            {/* 3D R3F Canvas Sphere */}
            {isInView && <HeroCanvas cursorPosition={cursorPosition} />}
          </div>
        </div>

        {/* Quick statistics row */}
        <div
          ref={statsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            paddingTop: '3rem',
            maxWidth: '1200px',
            margin: '2rem auto 0 auto'
          }}
          className="stats-grid"
        >
          {stats.map((stat, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'center' }}>
              <span
                className="stat-number text-gradient-purple"
                data-target={stat.target}
                style={{
                  fontSize: 'calc(1.6rem + 0.8vw)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  fontWeight: 500
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-split-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }
        @media (min-width: 992px) {
          .hero-split-grid {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 2rem;
          }
          .hero-left-content {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .hero-headline {
            align-items: flex-start !important;
            text-align: left !important;
            margin: 0 0 1.5rem 0 !important;
          }
          .hero-desc {
            margin: 0 0 3rem 0 !important;
            text-align: left !important;
          }
          .hero-cta-btn-group {
            justify-content: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem 1.5rem !important;
          }
          .hero-globe-container {
            height: 360px !important;
          }
        }
      `}</style>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCanvas from './HeroCanvas';
import { ArrowRight, Play } from 'lucide-react';
import useInView from '../hooks/useInView';

export default function Hero() {
  const [containerRef, isInView] = useInView();
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const btnGroupRef = useRef(null);
  const statsRef = useRef(null);
  const cursorPosition = useRef({ x: 0, y: 0 });

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
      const isYears = counter.textContent.includes('Yr');
      const suffix = isYears ? ' Yr' : '+';
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
    { number: '0 Yr', target: 25, label: 'Global Experience' }
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
      {/* 3D R3F Canvas Sphere */}
      {isInView && <HeroCanvas cursorPosition={cursorPosition} />}

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
          opacity: 0.7
        }} 
      />

      {/* Decorative colored glow lights */}
      <div className="glow-bg glow-blue" style={{ width: '600px', height: '600px', top: '10%', left: '-10%' }} />
      <div className="glow-bg glow-cyan" style={{ width: '600px', height: '600px', bottom: '10%', right: '-10%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
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

        {/* Cinematic Header Text */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'calc(2.2rem + 2.5vw)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '1000px',
            margin: '0 auto 1.5rem auto',
          }}
          className="text-gradient"
        >
          Scaling Enterprise Intelligence & Technology Capabilities
        </h1>

        {/* Lead subtext */}
        <p
          ref={descRef}
          style={{
            fontSize: 'calc(1rem + 0.35vw)',
            color: 'var(--text-secondary)',
            maxWidth: '680px',
            margin: '0 auto 3rem auto',
            lineHeight: 1.6,
          }}
        >
          Vinsys orchestrates digital infrastructure, corporate talent networks, cybersecurity defense systems, and AI readiness to accelerate global enterprise growth.
        </p>

        {/* CTA Buttons */}
        <div
          ref={btnGroupRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '6rem'
          }}
        >
          <a href="#solutions" className="btn-primary">
            <span>Explore Solutions</span>
            <ArrowRight size={16} />
          </a>
          <a href="#case-studies" className="btn-secondary">
            <span>Analyze Case Studies</span>
            <Play size={14} style={{ fill: 'var(--brand-crimson)' }} />
          </a>
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
            maxWidth: '1100px',
            margin: '0 auto'
          }}
          className="stats-grid"
        >
          {stats.map((stat, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span
                className="stat-number text-gradient-purple"
                data-target={stat.target}
                style={{
                  fontSize: 'calc(1.8rem + 1vw)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
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
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

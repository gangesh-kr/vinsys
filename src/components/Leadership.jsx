import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Quote, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const quoteRef = useRef(null);

  // Animate quote change with GSAP cross-fade
  const handleTabChange = (index) => {
    if (index === activeTab) return;
    if (quoteRef.current) {
      gsap.to(quoteRef.current, {
        opacity: 0, y: -15, filter: 'blur(4px)',
        duration: 0.25, ease: 'power2.in',
        onComplete: () => {
          setActiveTab(index);
          gsap.fromTo(quoteRef.current,
            { opacity: 0, y: 20, filter: 'blur(4px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
          );
        }
      });
    } else {
      setActiveTab(index);
    }
  };

  // ScrollTrigger section reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 30, filter: 'blur(4px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const leaders = [
    {
      name: 'Karan Patil',
      role: 'Promoter',
      quote: 'Transformation extends beyond learning. It is the integration of digital capabilities, secure environments, and responsive processes that makes a global organization resilient.',
      tagline: 'Vinsys IT Services Ltd',
    },
    {
      name: 'Vikrant Patil',
      role: 'Managing Director & Chairman',
      quote: 'Shaping a future where learning is integrated into enterprise systems dynamically. We empower Fortune 500 boards with capabilities to sustain AI acceleration.',
      tagline: 'Vinsys Group Executive Board',
    },
    {
      name: 'Kunal Patil',
      role: 'Director - International Operations',
      quote: 'Expertise in training, consulting, and global delivery allows us to solve complex challenges across diverse ecosystems smoothly.',
      tagline: 'Vinsys International Division',
    },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '10rem 0',
        background: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="about"
    >
      {/* Subtle Glow backdrop */}
      <div className="glow-bg glow-cyan" style={{ width: '450px', height: '450px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04 }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Section Header */}
        <div className="section-header" ref={headerRef} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-tag">Governance & Vision</span>
          <h2 className="section-title text-gradient">Message From the Leadership</h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Meet the leaders guiding our global network towards scalable transformation and digital capability excellence.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {leaders.map((leader, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              style={{
                padding: '0.8rem 1.6rem',
                borderRadius: '30px',
                border: '1px solid',
                borderColor: activeTab === index ? 'var(--brand-crimson)' : 'rgba(0, 0, 0, 0.06)',
                background: activeTab === index ? 'var(--brand-crimson)' : '#ffffff',
                color: activeTab === index ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                fontWeight: 600,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: activeTab === index ? '0 8px 20px rgba(173, 51, 45, 0.15)' : 'none',
              }}
            >
              <User size={15} />
              <span>{leader.name}</span>
            </button>
          ))}
        </div>

        {/* Carousel Quote Display */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '5rem 4rem',
            textAlign: 'center',
            background: '#ffffff',
            position: 'relative',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            minHeight: '260px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Quote Mark Icon */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-crimson), var(--brand-orange))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 20px rgba(173, 51, 45, 0.2)',
            }}
          >
            <Quote size={24} style={{ fill: '#fff' }} />
          </div>

          <h3
            ref={quoteRef}
            style={{
              fontSize: 'calc(1.2rem + 0.6vw)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              marginBottom: '2.5rem',
              letterSpacing: '-0.01em',
              animation: 'quoteFade 0.4s ease forwards',
            }}
          >
            "{leaders[activeTab].quote}"
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
              }}
            >
              {leaders[activeTab].name}
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--brand-orange)',
                fontWeight: 600,
              }}
            >
              {leaders[activeTab].role}
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 500,
                marginTop: '0.2rem',
              }}
            >
              {leaders[activeTab].tagline}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes quoteFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 576px) {
          .glass-panel {
            padding: 4rem 1.5rem 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

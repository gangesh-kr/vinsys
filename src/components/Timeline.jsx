import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Calendar, Award, Globe, Shield, Cloud, BrainCircuit, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const milestones = [
    {
      year: '1998',
      title: 'Foundation & Roots',
      desc: 'Established in Pune, India, serving national tech sectors with corporate learning ecosystems.',
      icon: <Calendar size={18} />,
      color: 'var(--brand-crimson)'
    },
    {
      year: '2004',
      title: 'International Presence',
      desc: 'Expanded corporate delivery systems overseas, establishing a regional headquarters in Dubai, UAE.',
      icon: <Globe size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2010',
      title: 'Digital Enterprise Core',
      desc: 'Pivoted core competencies to digital systems consulting and enterprise-wide transformation.',
      icon: <Award size={18} />,
      color: 'var(--brand-amber)'
    },
    {
      year: '2016',
      title: 'Security Compliance',
      desc: 'Achieved ISO certification milestones, deploying worldwide corporate defense frameworks.',
      icon: <Shield size={18} />,
      color: 'var(--brand-crimson)'
    },
    {
      year: '2020',
      title: 'Cloud Scaling Phase',
      desc: 'Upskilled over 200,000 corporate developers globally in Kubernetes, AWS, and serverless arrays.',
      icon: <Cloud size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2024',
      title: 'Cognitive Orchestration',
      desc: 'Launched Vinsys Cognitive Advisory, deploying custom RAG tools and prompt coaching portals.',
      icon: <BrainCircuit size={18} />,
      color: 'var(--brand-amber)'
    },
    {
      year: 'Present',
      title: 'Global Ecosystem',
      desc: 'Operating as a full enterprise transformation partner across 50+ nations for Fortune 500 boards.',
      icon: <Rocket size={18} />,
      color: 'var(--brand-orange)'
    }
  ];

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get length of the vertical scroll path
    const length = path.getTotalLength();
    
    // Set up base dashed dashoffset equal to the full path length
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    // GSAP ScrollTrigger to animate path drawing
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 40%',
        end: 'bottom 60%',
        scrub: 0.5,
      }
    });

    // Staggered reveal of each milestone card
    const cards = containerRef.current.querySelectorAll('.timeline-node');
    cards.forEach(card => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      tween.scrollTrigger?.kill(true);
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: '10rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="timeline"
    >
      <div className="glow-bg glow-purple" style={{ width: '450px', height: '450px', top: '40%', left: '-10%', opacity: 0.08 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Corporate Journey</span>
          <h2 className="section-title text-gradient">Chronology of Innovation</h2>
          <p className="section-desc">
            Tracing our expansion from a local upskilling provider to an integrated global enterprise transformation leader.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '4rem auto 0 auto' }} className="timeline-wrapper">
          
          {/* Vertical SVG Line Backdrop */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '4px',
              transform: 'translateX(-50%)',
              zIndex: 1
            }}
            className="timeline-line-container"
          >
            {/* Passive track */}
            <svg style={{ width: '100%', height: '100%', minHeight: '1100px' }}>
              <line
                x1="2" y1="0" x2="2" y2="100%"
                stroke="rgba(0, 0, 0, 0.06)"
                strokeWidth="2"
              />
              {/* Active path */}
              <path
                ref={pathRef}
                d="M 2 0 L 2 1500" // Fallback line length, coordinates will stretch
                stroke="var(--brand-crimson)"
                strokeWidth="2"
                fill="none"
                style={{ filter: 'drop-shadow(0 0 4px var(--brand-crimson))' }}
              />
            </svg>
          </div>

          {/* Timeline Nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', position: 'relative', zIndex: 2 }}>
            {milestones.map((node, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`timeline-node ${isEven ? 'even' : 'odd'}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  {/* Left Column (Content or Spacer) */}
                  <div style={{ width: '45%' }} className="timeline-left">
                    {isEven && (
                      <div
                        className="glass-panel"
                        style={{
                          padding: '2rem',
                          borderTop: `2px solid ${node.color}`,
                          background: '#f7f7f7'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: node.color, display: 'block', marginBottom: '0.5rem' }}>{node.year}</span>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{node.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{node.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot indicator */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: `2px solid ${node.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: node.color,
                      boxShadow: `0 0 10px ${node.color}22`,
                      zIndex: 3
                    }}
                    className="timeline-center-dot"
                  >
                    {node.icon}
                  </div>

                  {/* Right Column (Content or Spacer) */}
                  <div style={{ width: '45%' }} className="timeline-right">
                    {!isEven && (
                      <div
                        className="glass-panel"
                        style={{
                          padding: '2rem',
                          borderTop: `2px solid ${node.color}`,
                          background: '#f7f7f7'
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: node.color, display: 'block', marginBottom: '0.5rem' }}>{node.year}</span>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{node.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{node.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line-container {
            left: 2rem !important;
            transform: none !important;
          }
          .timeline-node {
            flex-direction: row-reverse !important;
            justify-content: flex-end !important;
            gap: 2rem !important;
          }
          .timeline-left {
            display: none !important;
          }
          .timeline-right {
            width: calc(100% - 4rem) !important;
          }
          .timeline-center-dot {
            flex-shrink: 0;
          }
          .timeline-node.even .timeline-left {
            display: block !important;
            width: calc(100% - 4rem) !important;
          }
          .timeline-node.even {
            flex-direction: row-reverse !important;
          }
        }
      `}</style>
    </section>
  );
}

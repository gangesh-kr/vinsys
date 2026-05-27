import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Calendar, Award, Globe, Shield, Cloud, BrainCircuit, BookOpen, Scale, Briefcase, Cpu, Network } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const milestones = [
    {
      year: '1998',
      title: 'Inception of Vinsys',
      desc: 'Established corporate training operations in Pune, India, building foundation skills for emerging tech industries.',
      icon: <Calendar size={18} />,
      color: 'var(--brand-crimson)'
    },
    {
      year: '2003',
      title: 'Software & Support Operations',
      desc: 'Broadened horizons into custom software development, IT support, and enterprise software consultations.',
      icon: <Cpu size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2004',
      title: 'UAE Regional Head Office',
      desc: 'Established international headquarters in Dubai, UAE to drive corporate training across Middle East networks.',
      icon: <Globe size={18} />,
      color: 'var(--brand-amber)'
    },
    {
      year: '2005',
      title: 'Corporate Presence in USA',
      desc: 'Setup local entity and corporate offices in USA to capture global training and resourcing requirements.',
      icon: <Briefcase size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2007',
      title: 'ISO 9001:2000 Certification',
      desc: 'Earned quality management credentials for IT training, digital systems, and infrastructure processes.',
      icon: <Award size={18} />,
      color: 'var(--brand-crimson)'
    },
    {
      year: '2009',
      title: 'Language Services Launch',
      desc: 'Formed a dedicated foreign language translation and localization services division to enable global teams.',
      icon: <BookOpen size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2011',
      title: 'Elite Training Hub in Pune',
      desc: 'Launched a state-of-the-art corporate upskilling facility in Shivajinagar, Pune, supporting hundreds of experts.',
      icon: <Network size={18} />,
      color: 'var(--brand-amber)'
    },
    {
      year: '2013',
      title: 'Custom Digital Learning Platform',
      desc: 'Launched custom e-learning content delivery frameworks and modern enterprise LMS portal solutions.',
      icon: <Cloud size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2015',
      title: 'Government Upskilling Alliances',
      desc: 'Acquired high-profile government agency partnerships for multi-year national workforce upskilling projects.',
      icon: <Scale size={18} />,
      color: 'var(--brand-crimson)'
    },
    {
      year: '2016',
      title: 'ISO 27001 Security Standard',
      desc: 'Achieved ISO 27001:2013 security certification, establishing robust data security management systems.',
      icon: <Shield size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2017',
      title: 'Managed IT Infrastructure',
      desc: 'Expanded managed services division, offering 24/7 security operations (SOC) and server networks support.',
      icon: <Cpu size={18} />,
      color: 'var(--brand-amber)'
    },
    {
      year: '2022',
      title: 'SME Trainer Network Expansion',
      desc: 'Scaled active trainer networks to over 1,000+ certified subject matter experts across five continents.',
      icon: <BrainCircuit size={18} />,
      color: 'var(--brand-orange)'
    },
    {
      year: '2023',
      title: 'Public Listing on NSE Emerge',
      desc: 'Successfully listed as Vinsys IT Services India Limited on NSE Emerge, celebrating 25+ years of legacy.',
      icon: <Award size={18} />,
      color: 'var(--brand-crimson)'
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
          <h2 className="section-title text-gradient">Our Journey</h2>
          <p className="section-desc">
            Tracing our expansion from a local upskilling provider to an NSE-listed global enterprise transformation leader.
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

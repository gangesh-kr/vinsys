import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Brain, Cpu, GraduationCap, Server, Landmark, Code, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP ScrollTrigger stagger reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal section header
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

      // Reveal constellation cards with stagger
      const cards = containerRef.current?.querySelectorAll('.glass-panel');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 0.7, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      tag: 'SoftSol',
      title: 'Software Solution',
      desc: 'Developing bespoke web, mobile, and cloud software architectures engineered to scale global business operations.',
      icon: <Code size={22} />,
      x: 18, y: 15,
      color: 'var(--brand-orange)'
    },
    {
      id: 2,
      tag: 'ITTrain',
      title: 'IT Training & Certifications',
      desc: 'Offering official training and globally-recognized certification programs across cloud, security, and networking.',
      icon: <GraduationCap size={22} />,
      x: 12, y: 50,
      color: 'var(--brand-crimson)'
    },
    {
      id: 3,
      tag: 'AIAcad',
      title: 'AI Academy',
      desc: 'Empowering enterprise workforces with state-of-the-art machine learning capabilities, private LLMs, and RAG architectures.',
      icon: <Brain size={22} />,
      x: 18, y: 85,
      color: 'var(--brand-amber)'
    },
    {
      id: 4,
      tag: 'BizAcad',
      title: 'Business Academy',
      desc: 'Upskilling leaders and executives with strategic training in project management, agile consulting, and business excellence.',
      icon: <Landmark size={22} />,
      x: 82, y: 15,
      color: 'var(--brand-crimson)'
    },
    {
      id: 5,
      tag: 'DigLearn',
      title: 'Digital Learning',
      desc: 'Designing custom learning management systems (LMS) and e-learning courses for asynchronous organizational capability building.',
      icon: <Server size={22} />,
      x: 88, y: 50,
      color: 'var(--brand-orange)'
    },
    {
      id: 6,
      tag: 'ResRec',
      title: 'Resources and Recruitment',
      desc: 'Providing elite, pre-vetted corporate technology resources and recruitment services to bridge digital capability gaps.',
      icon: <Users size={22} />,
      x: 82, y: 85,
      color: 'var(--brand-amber)'
    }
  ];

  return (
    <section
      ref={containerRef}
      style={{
        padding: '8rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="solutions"
    >
      {/* Glow Effects */}
      <div className="glow-bg glow-purple" style={{ width: '400px', height: '400px', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Transformation Ecosystem</span>
          <h2 className="section-title text-gradient">Our Group Services</h2>
          <p className="section-desc">
            Industry-relevant Diverse Range, Customized, Adaptable, Progressive & Economical.
          </p>
        </div>

        {/* Constellation Workspace (Desktop Only) */}
        <div className="constellation-wrapper" style={{ position: 'relative', height: '580px', width: '100%', margin: '0 auto', display: 'block' }}>
          {/* SVG Connection Lines Backdrop */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            {services.map((service) => {
              const isHovered = hoveredNode === service.id;
              return (
                <g key={`path-${service.id}`}>
                  {/* Base passive line */}
                  <line
                    x1="50%"
                    y1="45%"
                    x2={`${service.x}%`}
                    y2={`${service.y}%`}
                    style={{
                      stroke: isHovered ? service.color : 'rgba(0, 0, 0, 0.08)',
                      strokeWidth: isHovered ? 2 : 1,
                      transition: 'all 0.4s ease'
                    }}
                  />
                  {/* Glowing active path */}
                  {isHovered && (
                    <line
                      x1="50%"
                      y1="45%"
                      x2={`${service.x}%`}
                      y2={`${service.y}%`}
                      style={{
                        stroke: service.color,
                        strokeWidth: 4,
                        filter: 'blur(4px)',
                        opacity: 0.6
                      }}
                    />
                  )}
                  {/* Pulsing signal dot moving down path */}
                  {isHovered && (
                    <circle r="4" fill={service.color} style={{ filter: 'drop-shadow(0 0 6px ' + service.color + ')' }}>
                      <animateMotion
                        path={`M 500,261 L ${service.x * 10},${service.y * 5.8}`} // Approximate viewBox mapping (1000x580)
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central Pulsing Core */}
          <div
            style={{
              position: 'absolute',
              top: '45%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(173,51,45,0.08) 0%, rgba(255,255,255,0.98) 75%)',
              border: '1px solid rgba(173, 51, 45, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
              boxShadow: hoveredNode 
                ? `0 0 35px ${services.find(s => s.id === hoveredNode).color}33`
                : '0 0 25px rgba(173, 51, 45, 0.08)',
              transition: 'var(--transition-smooth)',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: hoveredNode ? services.find(s => s.id === hoveredNode).color : 'var(--brand-crimson)',
                animation: 'pulse 2s infinite',
                marginBottom: '8px',
                transition: 'background-color 0.4s ease'
              }}
            />
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}
            >
              Vinsys Core
            </span>
          </div>

          {/* Absolute Service Cards */}
          {services.map((service) => {
            const isHovered = hoveredNode === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredNode(service.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: `${service.y}%`,
                  left: `${service.x}%`,
                  transform: 'translate(-50%, -50%)' + (isHovered ? ' scale(1.05)' : ''),
                  width: '260px',
                  padding: '1.25rem',
                  zIndex: 4,
                  cursor: 'pointer',
                  borderColor: isHovered ? service.color : 'var(--glass-border)',
                  boxShadow: isHovered ? `0 8px 30px ${service.color}15` : 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: isHovered ? service.color : 'rgba(0, 0, 0, 0.03)',
                      color: isHovered ? '#fff' : service.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {service.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      background: 'rgba(0, 0, 0, 0.02)'
                    }}
                  >
                    {service.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', transition: 'color 0.3s ease', color: isHovered ? '#fff' : 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsive Grid Fallback (Mobile/Tablet Only) */}
        <div className="mobile-ecosystem-grid" style={{ display: 'none' }}>
          {services.map((service) => (
            <div
              key={`mob-${service.id}`}
              className="glass-panel"
              style={{
                padding: '1.5rem',
                borderLeft: `4px solid ${service.color}`
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.03)',
                    color: service.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {service.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    border: '1px solid rgba(0, 0, 0, 0.06)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: 'rgba(0, 0, 0, 0.02)'
                  }}
                >
                  {service.tag}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{service.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(173, 51, 45, 0.5);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(173, 51, 45, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(173, 51, 45, 0);
          }
        }
        @media (max-width: 1024px) {
          .constellation-wrapper {
            display: none !important;
          }
          .mobile-ecosystem-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }
        @media (max-width: 600px) {
          .mobile-ecosystem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

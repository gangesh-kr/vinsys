import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Brain, Cpu, GraduationCap, Server, Landmark, Code, Users } from 'lucide-react';
import TypographyReveal from './TypographyReveal';
import EcosystemCanvas from './EcosystemCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cursorPosition = useRef({ x: 0, y: 0 });

  // Handle cursor parallax values
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    cursorPosition.current = { x, y };
  };

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

      // Reveal cards with stagger
      const cards = containerRef.current?.querySelectorAll('.ecosystem-card');
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
      x: 18, y: 12,
      color: '#ad332d' // Brand Crimson
    },
    {
      id: 2,
      tag: 'ITTrain',
      title: 'IT Training & Certifications',
      desc: 'Offering official training and globally-recognized certification programs across cloud, security, and networking.',
      icon: <GraduationCap size={22} />,
      x: 12, y: 48,
      color: '#f69320' // Brand Orange
    },
    {
      id: 3,
      tag: 'AIAcad',
      title: 'AI Academy',
      desc: 'Empowering enterprise workforces with state-of-the-art machine learning capabilities, private LLMs, and RAG architectures.',
      icon: <Brain size={22} />,
      x: 18, y: 84,
      color: '#ffb42f' // Brand Amber
    },
    {
      id: 4,
      tag: 'BizAcad',
      title: 'Business Academy',
      desc: 'Upskilling leaders and executives with strategic training in project management, agile consulting, and business excellence.',
      icon: <Landmark size={22} />,
      x: 82, y: 12,
      color: '#ad332d'
    },
    {
      id: 5,
      tag: 'DigLearn',
      title: 'Digital Learning',
      desc: 'Designing custom learning management systems (LMS) and e-learning courses for asynchronous organizational capability building.',
      icon: <Server size={22} />,
      x: 88, y: 48,
      color: '#f69320'
    },
    {
      id: 6,
      tag: 'ResRec',
      title: 'Resources and Recruitment',
      desc: 'Providing elite, pre-vetted corporate technology resources and recruitment services to bridge digital capability gaps.',
      icon: <Users size={22} />,
      x: 82, y: 84,
      color: '#ffb42f'
    }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        padding: '8rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="solutions"
    >
      {/* Decorative Glow Grid */}
      <div className="glow-bg glow-purple" style={{ width: '450px', height: '450px', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.08 }} />
      <div className="glow-bg glow-blue" style={{ width: '450px', height: '450px', bottom: '15%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.05 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Transformation Ecosystem</span>
          <TypographyReveal
            tag="h2"
            text="Our Group Services"
            animationType="mask"
            className="section-title text-gradient"
          />
          <p className="section-desc">
            Industry-relevant Diverse Range, Customized, Adaptable, Progressive & Economical.
          </p>
        </div>

        {/* Constellation Workspace (Desktop Only) */}
        <div 
          className="constellation-wrapper" 
          style={{ 
            position: 'relative', 
            height: '620px', 
            width: '100%', 
            margin: '0 auto', 
            display: 'block' 
          }}
        >
          {/* Interactive 3D Canvas in center backdrop */}
          <EcosystemCanvas cursorPosition={cursorPosition} hoveredNode={hoveredNode} />

          {/* Absolute Service Cards */}
          {services.map((service) => {
            const isHovered = hoveredNode === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredNode(service.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="ecosystem-card glass-panel"
                style={{
                  position: 'absolute',
                  top: `${service.y}%`,
                  left: `${service.x}%`,
                  transform: 'translate(-50%, -50%)' + (isHovered ? ' translateY(-5px) scale(1.03)' : ''),
                  width: '270px',
                  padding: '1.5rem',
                  zIndex: 4,
                  cursor: 'pointer',
                  background: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(247, 247, 247, 0.75)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: isHovered ? `1px solid ${service.color}` : '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: isHovered 
                    ? `0 12px 35px ${service.color}1c, 0 4px 15px rgba(0, 0, 0, 0.02)` 
                    : '0 4px 20px rgba(0, 0, 0, 0.01)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.25rem'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: isHovered ? service.color : 'rgba(0, 0, 0, 0.03)',
                      color: isHovered ? '#fff' : service.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(0, 0, 0, 0.02)',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {service.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: isHovered ? service.color : 'var(--text-muted)',
                      border: isHovered ? `1px solid ${service.color}33` : '1px solid rgba(0, 0, 0, 0.06)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: isHovered ? `${service.color}0a` : 'rgba(0, 0, 0, 0.02)',
                      letterSpacing: '0.05em',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {service.tag}
                  </span>
                </div>
                
                <h3 
                  style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: '600',
                    marginBottom: '0.5rem', 
                    color: isHovered ? service.color : 'var(--text-primary)',
                    transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                >
                  {service.title}
                </h3>
                
                <p 
                  style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-secondary)', 
                    lineHeight: '1.6',
                    fontWeight: '400' 
                  }}
                >
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Responsive Grid Fallback (Mobile/Tablet Only) */}
        <div className="mobile-ecosystem-wrapper" style={{ display: 'none', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Mini Interactive 3D Canvas card for mobile */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              background: '#f9f9fa',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <EcosystemCanvas cursorPosition={cursorPosition} hoveredNode={hoveredNode} />
            
            {/* Title Badge Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '20px',
                padding: '4px 14px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: hoveredNode ? services.find(s => s.id === hoveredNode).color : 'var(--brand-crimson)', animation: 'pulse 1.5s infinite' }} />
              {hoveredNode ? services.find(s => s.id === hoveredNode).title : 'Interactive Data Hub'}
            </div>
          </div>

          <div className="mobile-ecosystem-grid">
            {services.map((service) => {
              const isHovered = hoveredNode === service.id;
              return (
                <div
                  key={`mob-${service.id}`}
                  className="glass-panel mobile-card"
                  onClick={() => setHoveredNode(hoveredNode === service.id ? null : service.id)}
                  style={{
                    padding: '1.5rem',
                    borderLeft: `4px solid ${service.color}`,
                    background: isHovered ? 'rgba(255, 255, 255, 0.98)' : 'rgba(247, 247, 247, 0.6)',
                    borderColor: isHovered ? service.color : 'rgba(0, 0, 0, 0.05)',
                    boxShadow: isHovered ? `0 8px 24px ${service.color}15` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
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
                        width: '42px',
                        height: '42px',
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
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: isHovered ? service.color : 'var(--text-primary)' }}>{service.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .constellation-wrapper {
            display: none !important;
          }
          .mobile-ecosystem-wrapper {
            display: flex !important;
          }
          .mobile-ecosystem-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }
        @media (max-width: 680px) {
          .mobile-ecosystem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Globe, MapPin, Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function MetricCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef(null);
  const animatedRef = useRef(false);
  
  useEffect(() => {
    if (animatedRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    const animate = () => {
      const match = value.match(/([\d,.]+)/);
      if (!match) return;
      
      const numericStr = match[1];
      const isFloat = numericStr.includes('.');
      const targetVal = parseFloat(numericStr.replace(/,/g, ''));
      
      if (isNaN(targetVal)) return;
      
      const prefix = value.substring(0, match.index);
      const suffix = value.substring(match.index + numericStr.length);
      
      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: targetVal,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          let current = obj.val;
          if (isFloat) {
            current = current.toFixed(numericStr.split('.')[1].length);
          } else {
            current = Math.floor(current);
            if (value.includes(',')) {
              current = current.toLocaleString();
            }
          }
          setDisplayValue(`${prefix}${current}${suffix}`);
        }
      });
    };
    
    return () => {
      observer.disconnect();
    };
  }, [value]);
  
  return <span ref={elementRef}>{displayValue}</span>;
}

export default function GlobalImpact() {
  const [activeHub, setActiveHub] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP ScrollTrigger reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Map and highlights stagger reveal
      const gridItems = sectionRef.current?.querySelectorAll('.glass-panel');
      if (gridItems && gridItems.length > 0) {
        gsap.fromTo(gridItems,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const globalHubs = [
    { id: 'hq', name: 'Pune (Global HQ), India', x: 70, y: 55, details: '500+ experts, Core transformation hub' },
    { id: 'uae', name: 'Dubai, UAE', x: 62, y: 45, details: 'Middle East training & consulting' },
    { id: 'us', name: 'New York, USA', x: 25, y: 35, details: 'Enterprise sales & corporate strategy' },
    { id: 'ksa', name: 'Riyadh, Saudi Arabia', x: 58, y: 46, details: 'Regional hub for upskilling programs' },
    { id: 'qatar', name: 'Doha, Qatar', x: 61, y: 47, details: 'Enterprise consulting office' },
    { id: 'nigeria', name: 'Lagos, Nigeria', x: 48, y: 52, details: 'African talent upskilling center' },
    { id: 'oman', name: 'Muscat, Oman', x: 64, y: 48, details: 'Workforce enablement operations' },
    { id: 'uk', name: 'London, United Kingdom', x: 47, y: 30, details: 'European consulting operations' },
    { id: 'congo', name: 'Brazzaville, Republic of Congo', x: 52, y: 58, details: 'Digital infrastructure delivery center' }
  ];

  const highlights = [
    { title: 'Industry Legacy', val: '2+ Decades', sub: 'Of global enterprise transformation leadership', icon: <Globe size={20} /> },
    { title: 'Expert Delivery', val: '1,000+', sub: 'Certified subject matter experts & trainers', icon: <Users size={20} /> },
    { title: 'Software Execution', val: '100+', sub: 'Enterprise-grade software projects delivered', icon: <Award size={20} /> },
    { title: 'Upskilled Workforce', val: '1 Million+', sub: 'Professionals empowered globally', icon: <MapPin size={20} /> }
  ];

  const partners = [
    'Amazon Web Services', 'Citrix', 'AOSH', 'Autodesk', 'Cisco', 'DevOps Institute',
    'IIBA', 'EC-Council', 'VMware', 'SAP', 'Salesforce', 'Palo Alto Networks',
    'IOSH', 'ISACA', 'CertNexus', 'CompTIA', 'ISC2', 'ISO', 'DASA', 'Microsoft', 'IBM', 'PMI'
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '8rem 0 4rem 0',
        background: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="global-impact"
    >
      <div className="glow-bg glow-cyan" style={{ width: '500px', height: '500px', bottom: '0px', left: '-10%', opacity: 0.04 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Global Impact</span>
          <h2 className="section-title text-gradient">World-Class Footprint</h2>
          <p className="section-desc">
            Vinsys operates a distributed network of training and technology centers, serving multi-national corporations across five continents.
          </p>
        </div>

        {/* Global Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }} className="impact-grid">
          
          {/* 1. Interactive High-Tech SVG Map */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              position: 'relative',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden'
            }}
          >
            {/* Holographic grid scan lines */}
            <div 
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.015) 50%), linear-gradient(90deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.015) 50%)',
                backgroundSize: '4px 4px',
                pointerEvents: 'none'
              }}
            />

            <div style={{ position: 'relative', width: '100%', paddingBottom: '60%', height: 0 }}>
              {/* World Map Backdrop (Abstract Tech Shape) */}
              <svg
                viewBox="0 0 100 60"
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  opacity: 0.7,
                  stroke: 'rgba(0,0,0,0.08)',
                  strokeWidth: 0.5,
                  fill: 'none'
                }}
              >
                {/* Simplified continent coordinates for tech aesthetic */}
                <path d="M10,25 C15,20 25,15 35,22 C40,25 32,35 28,45 C25,50 20,52 15,48 Z" /> {/* Americas L1 */}
                <path d="M38,20 C42,10 50,8 55,12 C58,15 54,25 50,30 C46,35 44,45 42,50" /> {/* Africa/Europe */}
                <path d="M52,15 C60,10 75,12 85,18 C90,22 88,35 80,45 C75,50 68,48 62,40 Z" /> {/* Asia */}
                <path d="M80,45 C84,45 88,48 88,52 C86,56 82,55 80,50 Z" /> {/* Oceania */}
              </svg>

              {/* Connecting lines between HQ and other hubs */}
              <svg
                viewBox="0 0 100 60"
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  pointerEvents: 'none'
                }}
              >
                {globalHubs.filter(h => h.id !== 'hq').map(hub => {
                  const hq = globalHubs.find(h => h.id === 'hq');
                  return (
                    <path
                      key={`line-${hub.id}`}
                      d={`M ${hq.x} ${hq.y} Q ${(hq.x + hub.x)/2} ${(hq.y + hub.y)/2 - 8} ${hub.x} ${hub.y}`}
                      fill="none"
                      stroke={activeHub === hub.id ? 'var(--brand-crimson)' : 'rgba(173, 51, 45, 0.15)'}
                      strokeWidth={activeHub === hub.id ? 2 : 1}
                      strokeDasharray={activeHub === hub.id ? '3,3' : 'none'}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  );
                })}
              </svg>

              {/* Interactive Hub Markers */}
              {globalHubs.map((hub) => {
                const isHQ = hub.id === 'hq';
                const isActive = activeHub === hub.id;
                
                return (
                  <div
                    key={hub.id}
                    onMouseEnter={() => setActiveHub(hub.id)}
                    onMouseLeave={() => setActiveHub(null)}
                    style={{
                      position: 'absolute',
                      left: `${hub.x}%`,
                      top: `${hub.y}%`,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  >
                    {/* Ring Pulse */}
                    <div
                      style={{
                        position: 'absolute',
                        width: isHQ ? '20px' : '14px',
                        height: isHQ ? '20px' : '14px',
                        borderRadius: '50%',
                        border: `1.5px solid ${isHQ ? 'var(--brand-crimson)' : 'var(--brand-orange)'}`,
                        transform: 'scale(1)',
                        animation: 'mapPulse 1.8s infinite ease-out',
                        pointerEvents: 'none'
                      }}
                    />
                    
                    {/* Core Point */}
                    <div
                      style={{
                        width: isHQ ? '10px' : '7px',
                        height: isHQ ? '10px' : '7px',
                        borderRadius: '50%',
                        backgroundColor: isHQ ? 'var(--brand-crimson)' : 'var(--brand-orange)',
                        boxShadow: `0 0 10px ${isHQ ? 'var(--brand-crimson)' : 'var(--brand-orange)'}`,
                        transform: isActive ? 'scale(1.4)' : 'scale(1)',
                        transition: 'transform 0.2s ease'
                      }}
                    />

                    {/* Hover Tooltip */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%) translateY(-8px)',
                        background: 'rgba(8, 12, 28, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        padding: '0.5rem 0.8rem',
                        pointerEvents: 'none',
                        opacity: isActive ? 1 : 0,
                        transformOrigin: 'bottom center',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        width: '180px',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                      }}
                    >
                      <h4 style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '0.15rem' }}>{hub.name}</h4>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{hub.details}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Hover over glowing beacons to explore regional capability offices
            </div>
          </div>

          {/* 2. Capability Highlight Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="highlight-grid">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  position: 'relative'
                }}
              >
                {/* Accent line top */}
                <div style={{ position: 'absolute', top: 0, left: '2rem', right: '2rem', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(173, 51, 45, 0.3), transparent)' }} />
                
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.03)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--brand-crimson)'
                  }}
                >
                  {item.icon}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '2.2rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--text-primary)',
                      lineHeight: '1.1',
                      letterSpacing: '-0.02em',
                      marginBottom: '0.25rem'
                    }}
                  >
                    <MetricCounter value={item.val} />
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{item.title}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Scrolling Partner Logo Wall */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2rem 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem' }}>
            Trusted by Elite Technology & Learning Partners
          </h3>
          <div style={{ display: 'flex', width: '200%' }} className="marquee-wrapper">
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%', flexShrink: 0 }} className="marquee-slide">
              {partners.slice(0, 11).map((p, i) => (
                <span key={`p1-${i}`} style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {p}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%', flexShrink: 0 }} className="marquee-slide">
              {partners.slice(0, 11).map((p, i) => (
                <span key={`p2-${i}`} style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', width: '200%', marginTop: '1.5rem' }} className="marquee-wrapper-reverse">
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%', flexShrink: 0 }} className="marquee-slide-reverse">
              {partners.slice(11).map((p, i) => (
                <span key={`p3-${i}`} style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {p}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%', flexShrink: 0 }} className="marquee-slide-reverse">
              {partners.slice(11).map((p, i) => (
                <span key={`p4-${i}`} style={{ fontSize: '1.05rem', fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes mapPulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .marquee-wrapper {
          overflow: hidden;
        }
        .marquee-slide {
          animation: marquee 25s linear infinite;
        }
        .marquee-slide-reverse {
          animation: marqueeReverse 25s linear infinite;
        }
        @media (max-width: 992px) {
          .impact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 576px) {
          .highlight-grid {
            grid-template-columns: 1fr !important;
          }
          .marquee-slide span, .marquee-slide-reverse span {
            font-size: 0.9rem !important;
            margin: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Globe, MapPin, Award, Users } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

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

/* ─────────────────────────────────────────────────────────────────
   TACTILE DRAGGABLE & SNAPPING Horizontal Partner Cards Loop
───────────────────────────────────────────────────────────────── */
function PartnerCard({ name }) {
  const cardRef = useRef(null);
  
  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Smooth 3D Perspective tilt logic
    const rx = ((x / r.width) - 0.5) * 18;
    const ry = ((y / r.height) - 0.5) * -18;
    
    el.style.transform = `perspective(600px) rotateX(${ry}deg) rotateY(${rx}deg) translateY(-2px) scale(1.05)`;
    el.style.borderColor = 'rgba(246, 147, 32, 0.4)';
    el.style.background = 'rgba(255, 255, 255, 0.98)';
    el.style.boxShadow = '0 12px 28px rgba(246, 147, 32, 0.12), inset 0 1px 0 rgba(255,255,255,0.08)';
  };
  
  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.borderColor = 'rgba(0, 0, 0, 0.06)';
    el.style.background = 'rgba(255, 255, 255, 0.85)';
    el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.04)';
  };
  
  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.82rem 1.8rem',
        borderRadius: '14px',
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        minWidth: '160px',
        height: '56px',
        cursor: 'grab',
        userSelect: 'none',
        fontFamily: 'var(--font-heading, sans-serif)',
        fontSize: '0.88rem',
        fontWeight: 650,
        color: 'var(--text-secondary)',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        margin: '0 0.6rem',
      }}
    >
      <span>{name}</span>
    </div>
  );
}

function PartnerMarquee({ partners }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  
  const scrollX = useRef(0);
  const isDown = useRef(false);
  const startX = useRef(0);
  const prevScrollX = useRef(0);
  const velocity = useRef(0.9); // baseline pixel slide speed per tick
  const dragVelocity = useRef(0);
  const lastTime = useRef(0);
  const lastDragX = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    let lastScrollY = window.scrollY;
    
    const tick = () => {
      // Calculate Scroll Y velocity manually (difference between frames)
      const currentScrollY = window.scrollY;
      const vScrollVel = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      const speedBump = Math.min(5.5, vScrollVel * 0.12);
      
      let speed = velocity.current + speedBump;
      
      if (isDown.current) {
        dragVelocity.current *= 0.85; // Drag friction
      } else {
        if (Math.abs(dragVelocity.current) > 0.08) {
          scrollX.current += dragVelocity.current;
          dragVelocity.current *= 0.94; // Momentum decay
        } else {
          scrollX.current -= speed;
        }
      }
      
      const width = track.scrollWidth / 2; // Midpoint of duplicated items
      
      if (scrollX.current <= -width) {
        scrollX.current = 0;
      } else if (scrollX.current > 0) {
        scrollX.current = -width + 1;
      }
      
      gsap.set(track, { x: scrollX.current });
    };
    
    gsap.ticker.add(tick);
    
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX || e.touches[0].pageX;
    prevScrollX.current = scrollX.current;
    lastDragX.current = startX.current;
    lastTime.current = Date.now();
    dragVelocity.current = 0;
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    const x = e.pageX || e.touches[0].pageX;
    const deltaX = x - startX.current;
    scrollX.current = prevScrollX.current + deltaX;
    
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      dragVelocity.current = (x - lastDragX.current) / (dt * 0.05); // dynamic momentum scale
    }
    lastDragX.current = x;
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        padding: '0.8rem 0',
        cursor: 'grab',
      }}
    >
      {/* Edge Glow Blur Overlays */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(90deg, #f7f7f7 10%, transparent)', zIndex: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', background: 'linear-gradient(270deg, #f7f7f7 10%, transparent)', zIndex: 10, pointerEvents: 'none' }} />
      
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}
      >
        {duplicatedPartners.map((p, i) => (
          <PartnerCard key={i} name={p} />
        ))}
      </div>
    </div>
  );
}

export default function GlobalImpact() {
  const [activeHub, setActiveHub] = useState(null);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

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

  // Video load detection
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    const handlePlay = () => setVideoLoaded(true);
    const handleError = () => setVideoLoaded(false);

    video.addEventListener('playing', handlePlay);
    video.addEventListener('error', handleError);
    video.addEventListener('stalled', handleError);

    if (video.paused) {
      video.play().catch((err) => {
        console.warn('GlobalImpact video autoplay blocked or failed:', err);
      });
    }

    return () => {
      video.removeEventListener('playing', handlePlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('stalled', handleError);
    };
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
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: videoLoaded ? 0.7 : 0,
          transition: 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4" type="video/mp4" />
      </video>

      {/* Clear Video Overlay (Active when video is loaded) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(247,247,247,0.5) 0%, rgba(247,247,247,0.7) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      {/* Fallback Overlay (Active when video fails or is loading) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#f7f7f7',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: videoLoaded ? 0 : 1,
          transition: 'opacity 1s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      <div className="glow-bg glow-cyan" style={{ width: '500px', height: '500px', bottom: '0px', left: '-10%', opacity: 0.04 }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Section Header */}
        <div className="section-header" ref={headerRef}>
          <span className="section-tag">Global Impact</span>
          <TypographyReveal
            tag="h2"
            text="World-Class Footprint"
            animationType="skew"
            className="section-title text-gradient"
          />
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

        {/* Scrolling Partner Logo Wall (Tactile Drag & Snapping Marquee loop) */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '2.5rem 0 1rem 0', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.2rem' }}>
            Trusted by Elite Technology & Learning Partners
          </h3>
          <PartnerMarquee partners={partners} />
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
        }
      `}</style>
    </section>
  );
}

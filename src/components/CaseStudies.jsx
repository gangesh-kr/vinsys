import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
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

export default function CaseStudies() {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);

  const cases = [
    {
      id: 1,
      tag: 'Digital Transformation',
      title: 'Digital Transformation Roadmap for Banking',
      client: 'Middle East Retail Bank',
      challenge: 'Legacy monolithic database systems causing core transaction lags.',
      solution: 'Implemented a modernized microservices container grid and cloud security strategy.',
      impacts: [
        { label: 'Latency Reduced', value: '3.2s to 0.1s' },
        { label: 'Database SLA', value: '100% Uptime' },
        { label: 'Active Hubs', value: '12 Enabled' }
      ]
    },
    {
      id: 2,
      tag: 'AI & ML Academy',
      title: 'AI-First Manufacturing Logistics Upskilling',
      client: 'Global Automotive Leader',
      challenge: 'Heavy assembly line down-times due to slow diagnostic manual inputs.',
      solution: 'Created customized prompt engineering and LLM query courseware for assembly crews.',
      impacts: [
        { label: 'Assembly Crew', value: '800+ Trained' },
        { label: 'Line Downtime', value: '-22% Saved' },
        { label: 'Annual Value', value: '$3.8M ROI' }
      ]
    },
    {
      id: 3,
      tag: 'Digital Learning',
      title: 'LMS Deployment for Healthcare Systems',
      client: 'Multi-hospital Health Group',
      challenge: 'Fragmented clinical certification tracking across multiple remote clinics.',
      solution: 'Built and deployed a unified compliance portal with custom nursing training pathways.',
      impacts: [
        { label: 'Nurses Upskilled', value: '80,000+' },
        { label: 'User Rating', value: '94% Score' },
        { label: 'Compliance Audit', value: '100% Pass' }
      ]
    },
    {
      id: 4,
      tag: 'Software Solution',
      title: 'Enterprise AWS Cloud Architecture Migration',
      client: 'Fortune 100 Telco Operator',
      challenge: 'Unscalable network bandwidth during peak holiday loads.',
      solution: 'Migrated server architectures to automated serverless AWS Kubernetes nodes.',
      impacts: [
        { label: 'Migration Speed', value: '3x Faster' },
        { label: 'Peak Outages', value: '0% Recorded' },
        { label: 'Devs Enabled', value: '1,200+' }
      ]
    },
    {
      id: 5,
      tag: 'IT Services',
      title: 'Cybersecurity Auditing & Threat Management',
      client: 'Global Retail Enterprise',
      challenge: 'Growing ransomware vulnerabilities on public API payment systems.',
      solution: 'Orchestrated unified SIEM dashboards, SOC playbooks, and security reviews.',
      impacts: [
        { label: 'Threat Mitigation', value: '100% Neutral' },
        { label: 'Certifications', value: 'ISO 27001' },
        { label: 'Data Breaches', value: 'Zero Cases' }
      ]
    },
    {
      id: 6,
      tag: 'Managed Services',
      title: 'NOC Infrastructure for Public Sector Agencies',
      client: 'Metropolitan Government',
      challenge: 'Legacy citizen-facing portal outages and lack of proactive server monitoring.',
      solution: 'Established 24/7 NOC server analytics, backup failovers, and remote admin portals.',
      impacts: [
        { label: 'Portal Uptime', value: '99.99%' },
        { label: 'Resolutions', value: '60% Faster' },
        { label: 'Citizens Served', value: '5 Million+' }
      ]
    },
    {
      id: 7,
      tag: 'Business Academy',
      title: 'Agile Project Advisory & Leadership',
      client: 'National Retail Chain',
      challenge: 'Delayed project delivery and disconnect between product managers and devs.',
      solution: 'Conducted agile bootcamp sprints and executive change management frameworks.',
      impacts: [
        { label: 'Delivery Time', value: '-35% Saved' },
        { label: 'Leaders Coached', value: '150+ Agents' },
        { label: 'Project Alignment', value: '98% Score' }
      ]
    },
    {
      id: 8,
      tag: 'Foreign Languages',
      title: 'Global Document Translation & Localization',
      client: 'International Law Firm',
      challenge: 'Slow turnaround times and errors in multilingual legal contracts.',
      solution: 'Deployed professional translation systems and localized cloud document software.',
      impacts: [
        { label: 'Languages Active', value: '12+ Types' },
        { label: 'Contract Turn', value: '5x Faster' },
        { label: 'Translation Acc.', value: '99.8%' }
      ]
    }
  ];

  useEffect(() => {
    const trigger = triggerRef.current;
    const scroll = scrollRef.current;
    const section = sectionRef.current;
    if (!trigger || !scroll || !section) return;

    const cards = scroll.querySelectorAll('.case-card');
    const mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
      // 1. Create the main horizontal scroll tween
      const scrollTween = gsap.to(scroll, {
        x: () => -(scroll.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${(scroll.scrollWidth - window.innerWidth) * 2.2}`, // 2.2x vertical scroll distance for slower, premium feel
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      // 2. Cinematic Card Reveals: Bind entrance animation directly to viewport entry via containerAnimation
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95, rotateY: 8, transformOrigin: 'center center' },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 92%', // starts revealing just as it enters from the right
              end: 'left 55%',   // fully revealed before reaching center stage
              scrub: true
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={triggerRef} style={{ width: '100%' }}>
      {/* ── Desktop Pinned Section ── */}
      <section
        ref={sectionRef}
        style={{
          height: '100vh',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
        id="case-studies"
        className="case-studies-desktop-section"
      >
        {/* Soft atmospheric background glow */}
        <div className="glow-bg glow-cyan" style={{ width: '500px', height: '500px', top: '50%', left: '10%', transform: 'translateY(-50%)', opacity: 0.03 }} />

        {/* Horizontal Moving Scroll Track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            height: '100%',
            width: 'max-content',
            alignItems: 'center',
            paddingLeft: '10vw',
            paddingRight: '15vw',
            position: 'relative',
            willChange: 'transform'
          }}
          className="horizontal-scroll-container"
        >
          {/* Intro Slide */}
          <div
            style={{
              width: '460px',
              marginRight: '6rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              flexShrink: 0
            }}
            className="horizontal-intro-slide"
          >
            <span className="section-tag" style={{ textAlign: 'left', color: 'var(--brand-crimson)' }}>Collaborations</span>
            <TypographyReveal
              tag="h2"
              text="Empowering People & Businesses"
              animationType="skew"
              className="section-title text-gradient"
              style={{ textAlign: 'left', fontSize: '2.5rem', lineHeight: '1.2', margin: 0 }}
            />
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Collaborations with industries globally to build connected, adaptive, and future-ready ecosystems.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-crimson)', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>Scroll vertically to slide</span>
              <ChevronRight size={16} style={{ animation: 'bounceX 1.5s infinite' }} />
            </div>
          </div>

          {/* Case Studies Cards */}
          {cases.map((c) => (
            <div
              key={c.id}
              className="glass-panel case-card"
              style={{
                width: '580px',
                height: '60%',
                maxHeight: '440px',
                padding: '2.25rem 2.5rem',
                marginRight: '3.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                flexShrink: 0,
                background: '#f7f7f7',
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.02)',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) rotateX(1deg) rotateY(-1deg)';
                e.currentTarget.style.borderColor = 'rgba(173, 51, 45, 0.3)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(173, 51, 45, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.02)';
              }}
            >
              {/* Top Row: Client Info & Tag */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.tag}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.client}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '-0.02em', marginTop: '0.25rem', lineHeight: '1.3' }}>{c.title}</h3>
              </div>

              {/* Middle Row: Content */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '1.25rem 0' }} className="case-content-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>The Challenge</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.challenge}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Our Execution</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.solution}</p>
                </div>
              </div>

              {/* Bottom Row: Metrics Grid & CTA */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                  paddingTop: '1.25rem',
                  gap: '1.5rem'
                }}
                className="case-metrics-footer"
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem',
                    flex: 1
                  }}
                  className="case-metrics-grid"
                >
                  {c.impacts.map((metric, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <span className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                        <MetricCounter value={metric.value} />
                      </span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--brand-crimson)',
                    textDecoration: 'none',
                    flexShrink: 0
                  }}
                >
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile Vertical Backup Flow ── */}
      <section
        style={{
          padding: '6rem 0',
          background: '#ffffff',
          display: 'none'
        }}
        className="case-studies-mobile-section"
      >
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag" style={{ color: 'var(--brand-crimson)' }}>Collaborations</span>
            <TypographyReveal
              tag="h2"
              text="Empowering People & Businesses"
              animationType="skew"
              className="section-title text-gradient"
            />
            <p className="section-desc">
              Collaborations with industries globally to build connected, adaptive, and future-ready ecosystems.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {cases.map((c) => (
              <div
                key={`mob-case-${c.id}`}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  background: '#f7f7f7',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--brand-orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.tag}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.client}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', fontWeight: 600, margin: '0.5rem 0' }}>{c.title}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }} className="case-content-grid">
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>The Challenge</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '0.25rem' }}>{c.challenge}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Our Execution</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginTop: '0.25rem' }}>{c.solution}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    {c.impacts.map((metric, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                        <span className="text-gradient" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{metric.value}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--brand-crimson)',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Read More</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .case-studies-desktop-section { display: flex !important; }
        .case-studies-mobile-section  { display: none !important; }

        @media (max-width: 960px) {
          .case-studies-desktop-section { display: none !important; }
          .case-studies-mobile-section  { display: block !important; }
        }
      `}</style>
    </div>
  );
}


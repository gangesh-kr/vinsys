import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Milestone } from 'lucide-react';

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
  const scrollRef = useRef(null);

  useEffect(() => {
    // Only apply horizontal scroll pinning on screens wider than tablet (768px)
    const mediaQuery = window.matchMedia('(min-width: 769px)');
    
    let scrollTween;

    const initScrollTrigger = () => {
      if (!scrollRef.current || !triggerRef.current) return;

      const totalScrollWidth = scrollRef.current.scrollWidth;
      const viewWidth = window.innerWidth;
      const horizontalDistance = totalScrollWidth - viewWidth;

      if (horizontalDistance > 0) {
        scrollTween = gsap.to(scrollRef.current, {
          x: -horizontalDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${horizontalDistance}`,
            invalidateOnRefresh: true,
          }
        });
      }
    };

    if (mediaQuery.matches) {
      // Small timeout to ensure DOM layout is fully rendered before calculations
      const timer = setTimeout(initScrollTrigger, 100);
      return () => {
        clearTimeout(timer);
        if (scrollTween) {
          scrollTween.scrollTrigger?.kill(true);
          scrollTween.kill();
        }
      };
    }

    return undefined;
  }, []);

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

  return (
    <div ref={triggerRef} style={{ background: '#ffffff' }} id="case-studies">
      
      {/* Scroll Pin Wrapper */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          height: '100vh',
          width: 'max-content',
          alignItems: 'center',
          padding: '0 4rem',
          boxSizing: 'border-box'
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
          <span className="section-tag" style={{ textAlign: 'left' }}>Collaborations</span>
          <h2 className="section-title text-gradient" style={{ textAlign: 'left', fontSize: '2.5rem', lineHeight: '1.2', margin: 0 }}>
            Empowering People & Businesses
          </h2>
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
              width: '680px',
              height: '80%',
              maxHeight: '620px',
              padding: '3rem',
              marginRight: '4rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              flexShrink: 0,
              background: '#f7f7f7'
            }}
          >
            {/* Top Row: Client Info & Tag */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-orange)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.tag}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.client}</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>{c.title}</h3>
            </div>

            {/* Middle Row: Content */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', margin: '2rem 0' }} className="case-content-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>The Challenge</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.challenge}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>Our Execution</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.solution}</p>
              </div>
            </div>

            {/* Bottom Row: Metrics Grid & CTA */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                paddingTop: '2rem',
                gap: '2rem'
              }}
              className="case-metrics-footer"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                  flex: 1
                }}
                className="case-metrics-grid"
              >
                {c.impacts.map((metric, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span className="text-gradient" style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                      <MetricCounter value={metric.value} />
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--brand-crimson)',
                  textDecoration: 'none',
                  flexShrink: 0
                }}
              >
                <span>Read More</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .case-card {
          transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
        }
        .case-card:hover {
          border-color: rgba(173, 51, 45, 0.3) !important;
          box-shadow: 0 10px 40px rgba(173, 51, 45, 0.1);
          transform: translateY(-4px);
        }
        @media (max-width: 768px) {
          .horizontal-scroll-container {
            display: flex !important;
            flex-direction: column !important;
            height: auto !important;
            width: 100% !important;
            padding: 6rem 1.5rem !important;
          }
          .horizontal-intro-slide {
            width: 100% !important;
            margin-right: 0 !important;
            margin-bottom: 3rem !important;
          }
          .case-card {
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            margin-right: 0 !important;
            margin-bottom: 2rem !important;
            padding: 2rem !important;
          }
          .case-content-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .case-metrics-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .case-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

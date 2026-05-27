import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Milestone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
      tag: 'Cloud Migration & Upskilling',
      title: 'Global Telecom Giant Scaling AWS',
      client: 'Fortune 100 Telco operator',
      challenge: 'Legacy system downtime and shortage of internal Kubernetes & cloud engineering skills.',
      solution: 'Re-architected monolithic nodes to microservices and trained 1,200+ developers in custom cloud structures.',
      impacts: [
        { label: 'Cloud Core Certified', value: '1,200+ Devs' },
        { label: 'AWS Migration Speed', value: '3x Faster' },
        { label: 'Downtime Reduction', value: '99.9% SLA' }
      ]
    },
    {
      id: 2,
      tag: 'Cybersecurity & Governance',
      title: 'Major Banking Threat Neutralization',
      client: 'Middle East Retail Bank',
      challenge: 'Expanding API endpoint vulnerability surfaces and rising global ransomware threats.',
      solution: 'Established central Security Operations (SOC), engineered SIEM rules, and trained internal security analysts.',
      impacts: [
        { label: 'Audit Score Compliance', value: '100% ISO' },
        { label: 'Threat Mitigation', value: 'Immediate' },
        { label: 'SecOps Staff Upskilled', value: '250+ Agents' }
      ]
    },
    {
      id: 3,
      tag: 'AI-First Automation',
      title: 'Automating Predictive Systems',
      client: 'Global Automotive Leader',
      challenge: 'Heavy factory downtime due to manual diagnostic log reporting delays.',
      solution: 'Custom fine-tuned diagnostic AI models (LLMs) with private RAG databases, upskilling 800+ assembly engineers.',
      impacts: [
        { label: 'Downtime Decreased', value: '22%' },
        { label: 'Annual System Savings', value: '$3.8M' },
        { label: 'Model Accuracy Score', value: '96.2%' }
      ]
    },
    {
      id: 4,
      tag: 'Workforce Ecosystems',
      title: 'Centralized Health Training Core',
      client: 'Multi-hospital Healthcare Group',
      challenge: 'Inconsistent patient service records due to disparate nursing upskilling software structures.',
      solution: 'Deployed unified custom LMS platforms and created standard nursing training workflows across 12 centers.',
      impacts: [
        { label: 'Nurses Onboarded', value: '80k+' },
        { label: 'Operational Errors', value: '-35%' },
        { label: 'Platform Satisfaction', value: '94%' }
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
          <span className="section-tag" style={{ textAlign: 'left' }}>Case Studies</span>
          <h2 className="section-title text-gradient" style={{ textAlign: 'left', fontSize: '3.2rem', lineHeight: '1.1', margin: 0 }}>
            Proven Impact.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Explore how we assist Fortune 500 corporations in executing complex cloud structures, upskilling operations, and implementing cognitive frameworks.
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
              <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>{c.title}</h3>
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

            {/* Bottom Row: Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                paddingTop: '2rem'
              }}
              className="case-metrics-grid"
            >
              {c.impacts.map((metric, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
                    {metric.value}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {metric.label}
                  </span>
                </div>
              ))}
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
          .case-metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}

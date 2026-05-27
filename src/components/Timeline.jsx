import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Calendar, Award, Globe, Shield, Cloud, BrainCircuit, BookOpen, Scale, Briefcase, Cpu, Network } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const triggerRef   = useRef(null);
  const sectionRef   = useRef(null);
  const scrollRef    = useRef(null);
  const connectorRef = useRef(null);

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
    const trigger = triggerRef.current;
    const scroll  = scrollRef.current;
    const section = sectionRef.current;
    if (!trigger || !scroll || !section) return;

    const cards = scroll.querySelectorAll('.milestone-panel-card');
    const bgYears = scroll.querySelectorAll('.panel-bg-year');

    // Create a matchMedia listener to run horizontal slides ONLY on desktop screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 960px)', () => {
      const panelsCount = milestones.length;
      
      // Calculate total translation
      const totalWidth = scroll.scrollWidth - window.innerWidth;

      // Pinned Horizontal Track ScrollTrigger
      const scrubTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scroll.scrollWidth}`,
          anticipatePin: 1
        }
      });

      // Animate track moving left over the entire duration
      scrubTimeline.to(scroll, {
        x: -totalWidth,
        ease: 'none',
        duration: panelsCount
      }, 0);

      // Deep Year Parallax: Animate large years scaling and sliding at a different rate
      bgYears.forEach((bgYear, idx) => {
        scrubTimeline.fromTo(bgYear,
          { xPercent: 30, scale: 0.8, opacity: 0 },
          { xPercent: -20, scale: 1.1, opacity: 0.05, ease: 'none', duration: 1.2 },
          idx
        );
      });

      // Cinematic Card Reveals: Stagger card entry aligned with scroll track
      cards.forEach((card, idx) => {
        scrubTimeline.fromTo(card,
          { opacity: 0, yPercent: 15, scale: 0.95, rotateY: 10 },
          { opacity: 1, yPercent: 0, scale: 1, rotateY: 0, ease: 'power2.out', duration: 0.8 },
          idx
        );
      });

      // Draw the dynamic connector line over the entire duration
      if (connectorRef.current) {
        gsap.set(connectorRef.current, { scaleX: 0, transformOrigin: 'left center' });
        scrubTimeline.to(connectorRef.current, {
          scaleX: 1,
          ease: 'none',
          duration: panelsCount
        }, 0);
      }
    });

    return () => mm.revert();
  }, [milestones.length]);

  return (
    <div ref={triggerRef} style={{ width: '100%' }}>
      {/* ── Desktop Horizontal Slide Layout ── */}
      <section
        ref={sectionRef}
        style={{
          height: '100vh',
          background: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
        id="timeline"
        className="timeline-desktop-section"
      >
        {/* Cinematic Backdrop Glow */}
        <div className="glow-bg glow-purple" style={{ width: '600px', height: '600px', top: '50%', left: '0', transform: 'translateY(-50%)', opacity: 0.03 }} />

        {/* Floating Locked Section Title */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '5rem', 
            left: '5%', 
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <span className="section-tag" style={{ color: 'var(--brand-crimson)' }}>Corporate Journey</span>
          <TypographyReveal
            tag="h2"
            text="Our Journey"
            animationType="reveal"
            className="section-title text-gradient"
            style={{ fontSize: 'clamp(2.2rem, 3vw + 1rem, 3.6rem)', margin: '0.4rem 0' }}
          />
        </div>

        {/* Horizontal Moving Scroll Track */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            paddingLeft: '30vw', // Spacer to start slide beautifully after title
            paddingRight: '15vw',
            position: 'relative',
            width: 'max-content',
            willChange: 'transform'
          }}
        >
          {/* Dynamic glowing connector path running behind all cards */}
          <div 
            ref={connectorRef}
            style={{
              position: 'absolute',
              left: '30vw',
              right: '25vw',
              top: '52%',
              height: '2px',
              background: 'linear-gradient(90deg, var(--brand-crimson), var(--brand-orange), var(--brand-amber))',
              boxShadow: '0 0 10px rgba(173,51,45,0.4)',
              zIndex: 1
            }}
          />

          {milestones.map((node, index) => (
            <div
              key={index}
              style={{
                width: '420px',
                marginRight: '160px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flexShrink: 0
              }}
              className="panel-wrapper"
            >
              {/* Backgorund Parallax Year */}
              <div
                className="panel-bg-year"
                style={{
                  position: 'absolute',
                  fontSize: '12rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-heading)',
                  color: node.color,
                  opacity: 0,
                  pointerEvents: 'none',
                  zIndex: 0,
                  top: '18%',
                  left: '-20%',
                  userSelect: 'none',
                  letterSpacing: '-0.05em'
                }}
              >
                {node.year}
              </div>

              {/* Foreground Card */}
              <div
                className="milestone-panel-card glass-panel"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderTop: `4px solid ${node.color}`,
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.02)',
                  width: '380px',
                  zIndex: 2,
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) rotateX(2deg) rotateY(-2deg)';
                  e.currentTarget.style.borderColor = node.color;
                  e.currentTarget.style.boxShadow = `0 20px 45px ${node.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.02)';
                }}
              >
                {/* Node icon and year row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 850, color: node.color }}>
                    {node.year}
                  </span>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: `${node.color}10`,
                      color: node.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1.5px solid ${node.color}25`
                    }}
                  >
                    {node.icon}
                  </div>
                </div>

                {/* Milestone details */}
                <h4 style={{ fontSize: '1.25rem', fontWeight: 750, color: 'var(--text-primary)', marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' }}>
                  {node.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {node.desc}
                </p>
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
        className="timeline-mobile-section"
      >
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="section-tag" style={{ color: 'var(--brand-crimson)' }}>Corporate Journey</span>
            <TypographyReveal
              tag="h2"
              text="Our Journey"
              animationType="reveal"
              className="section-title text-gradient"
            />
            <p className="section-desc">
              Tracing our expansion from a local upskilling provider to an NSE-listed global enterprise transformation leader.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {milestones.map((node, index) => (
              <div
                key={`mob-${index}`}
                style={{
                  padding: '1.8rem',
                  borderRadius: '16px',
                  background: '#fcfcfc',
                  borderLeft: `4px solid ${node.color}`,
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  borderLeftWidth: '4px'
                }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: node.color, display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-heading)' }}>
                  {node.year}
                </span>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{node.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .timeline-desktop-section { display: flex !important; }
        .timeline-mobile-section  { display: none !important; }

        @media (max-width: 960px) {
          .timeline-desktop-section { display: none !important; }
          .timeline-mobile-section  { display: block !important; }
        }
      `}</style>
    </div>
  );
}

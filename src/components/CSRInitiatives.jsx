import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ShieldCheck, Leaf, HeartPulse, Sparkles, GraduationCap, Landmark, Trophy, HelpCircle } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

gsap.registerPlugin(ScrollTrigger);

export default function CSRInitiatives() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = containerRef.current?.querySelectorAll('.csr-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, ease: 'power3.out', stagger: 0.06,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const initiatives = [
    {
      title: 'Veteran Welfare',
      desc: 'Supporting veterans with transitioning programs, career alignment, and healthcare initiatives.',
      icon: <ShieldCheck size={24} />,
      color: 'var(--brand-crimson)',
    },
    {
      title: 'Environmental Sustainability',
      desc: 'Championing eco-restoration, carbon offset campaigns, and corporate zero-waste initiatives.',
      icon: <Leaf size={24} />,
      color: '#16a34a',
    },
    {
      title: 'Healthcare & Sanitation',
      desc: 'Deploying mobile health vans, conducting cleanliness drives, and developing clean water hubs.',
      icon: <HeartPulse size={24} />,
      color: 'var(--brand-orange)',
    },
    {
      title: 'Women Empowerment',
      desc: 'Leading skill development and entrepreneurship bootcamps to foster financial independence.',
      icon: <Sparkles size={24} />,
      color: '#d946ef',
    },
    {
      title: 'Education for All',
      desc: 'Subsidizing technical certifications, setting up IT labs, and offering career scholarships.',
      icon: <GraduationCap size={24} />,
      color: 'var(--brand-amber)',
    },
    {
      title: 'Cultural Preservation',
      desc: 'Protecting regional historical structures, organizing folk art programs, and supporting heritage.',
      icon: <Landmark size={24} />,
      color: '#8b5cf6',
    },
    {
      title: 'Sports Development',
      desc: 'Funding local training centers, organizing regional athletics, and supporting para-athletes.',
      icon: <Trophy size={24} />,
      color: '#06b6d4',
    },
    {
      title: 'Disaster Relief & Rural Development',
      desc: 'Deploying response units during emergencies, building rural infrastructure, and micro-grid systems.',
      icon: <HelpCircle size={24} />,
      color: '#ef4444',
    },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        padding: '8rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="csr"
    >
      <div className="glow-bg glow-orange" style={{ width: '400px', height: '400px', bottom: '10%', right: '-10%', opacity: 0.05 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef} style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span className="section-tag">Social Responsibility</span>
          <TypographyReveal
            tag="h2"
            text="Our Initiatives"
            animationType="mask"
            className="section-title text-gradient"
          />
          <p className="section-desc" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Our ambitions foster creativeness, help improve communities' quality of life, and provide lasting results by implementing relevant projects and partnerships.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {initiatives.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel csr-card"
              style={{
                padding: '2rem',
                background: '#f7f7f7',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                cursor: 'default',
              }}
            >
              {/* Icon Circle */}
              <div
                className="csr-icon-wrapper"
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  transition: 'all 0.3s ease',
                }}
              >
                {item.icon}
              </div>

              {/* Title & Desc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .csr-card:hover {
          transform: translateY(-5px);
          border-color: rgba(173, 51, 45, 0.2) !important;
          box-shadow: 0 12px 30px rgba(173, 51, 45, 0.08) !important;
          background: #ffffff !important;
        }
        .csr-card:hover .csr-icon-wrapper {
          background: var(--brand-crimson);
          color: #ffffff !important;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}

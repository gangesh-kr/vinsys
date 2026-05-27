import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Calendar, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LatestInsights() {
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

      const cards = containerRef.current?.querySelectorAll('.insight-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 35, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, ease: 'power3.out', stagger: 0.08,
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

  const articles = [
    {
      title: 'Vinsys IT Services and DRI Partner to Deliver Advanced IT Training in Middle East',
      category: 'Strategic Partnership',
      date: 'May 2026',
      desc: 'Collaborating to bring top-tier disaster recovery and business continuity training programs to organizations across the UAE and broader region.',
      link: '#',
    },
    {
      title: 'Vinsys Expands Footprint in Middle East with New Training Center in Saudi Arabia',
      category: 'Global Expansion',
      date: 'April 2026',
      desc: 'Answering the high demand for technology certifications and digital upskilling hubs in Riyadh to support the Vision 2030 corporate initiatives.',
      link: '#',
    },
    {
      title: 'Vinsys IT Services Partners with SAP to Provide Digital Learning Solutions in GCC',
      category: 'Enterprise Integration',
      date: 'March 2026',
      desc: 'Enabling companies in the Gulf Cooperation Council region to seamlessly adopt, deploy, and master SAP cloud modules through verified curriculums.',
      link: '#',
    },
  ];

  return (
    <section
      ref={containerRef}
      style={{
        padding: '8rem 0',
        background: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden',
      }}
      id="insights"
    >
      <div className="glow-bg glow-purple" style={{ width: '400px', height: '400px', top: '10%', left: '-10%', opacity: 0.04 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header" ref={headerRef} style={{ marginBottom: '4.5rem', textAlign: 'center' }}>
          <span className="section-tag">Press & Updates</span>
          <h2 className="section-title text-gradient">Latest Insights</h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Stay updated with our latest press releases, strategic alliances, and expansion milestones globally.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="glass-panel insight-card"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: '16px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Category & Date */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--brand-crimson)',
                  }}
                >
                  {item.category}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Calendar size={13} /> {item.date}
                </span>
              </div>

              {/* Title & Desc */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <h3
                  className="insight-title"
                  style={{
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                    lineHeight: '1.4',
                    color: 'var(--text-primary)',
                    margin: 0,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>

              {/* CTA Link */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  transition: 'color 0.3s ease',
                  marginTop: 'auto',
                }}
                className="insight-cta"
              >
                <span>Read Release</span>
                <ArrowUpRight size={16} className="insight-arrow" style={{ transition: 'transform 0.3s ease' }} />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .insight-card:hover {
          transform: translateY(-6px);
          border-color: rgba(173, 51, 45, 0.25) !important;
          box-shadow: 0 16px 40px rgba(173, 51, 45, 0.08) !important;
        }
        .insight-card:hover .insight-title {
          color: var(--brand-crimson);
        }
        .insight-card:hover .insight-cta {
          color: var(--brand-crimson);
        }
        .insight-card:hover .insight-arrow {
          transform: translate(2px, -2px);
        }
      `}</style>
    </section>
  );
}

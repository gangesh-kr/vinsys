import { Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section
      style={{
        padding: '10rem 0',
        background: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="about"
    >
      {/* Subtle Glow backdrop */}
      <div className="glow-bg glow-cyan" style={{ width: '450px', height: '450px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04 }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '5rem 4rem',
            textAlign: 'center',
            background: '#ffffff',
            position: 'relative'
          }}
        >
          {/* Quote Mark Icon */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand-crimson), var(--brand-orange))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 0 20px rgba(173, 51, 45, 0.2)'
            }}
          >
            <Quote size={24} style={{ fill: '#fff' }} />
          </div>

          <h3
            style={{
              fontSize: 'calc(1.3rem + 0.9vw)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              marginBottom: '2.5rem',
              letterSpacing: '-0.01em'
            }}
          >
            "True enterprise transformation is not merely about updating software or server architectures. It is about aligning human capabilities with cognitive systems to build a resilient, learning-driven global organism."
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                letterSpacing: '0.05em'
              }}
            >
              Board of Directors
            </span>
            <span
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--brand-orange)',
                fontWeight: 500
              }}
            >
              Vinsys IT Services Ltd
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

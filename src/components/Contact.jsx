import { Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Transformation request submitted successfully. A Vinsys enterprise architect will contact you within 12 hours.');
  };

  return (
    <section
      style={{
        padding: '8rem 0 10rem 0',
        background: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="contact"
    >
      <div className="glow-bg glow-blue" style={{ width: '500px', height: '500px', bottom: '0px', right: '-10%', opacity: 0.04 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Connect Hub</span>
          <h2 className="section-title text-gradient">Initiate Transformation</h2>
          <p className="section-desc">
            Consult with our global architects to plan, design, and execute your workforce or infrastructure roadmap.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '5rem', alignItems: 'start' }} className="contact-grid">
          
          {/* Left Column: Direct details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600 }}>Let's Build the Future</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Whether you need to retrain a cohort of 500 cloud developers, consult on cybersecurity compliance standards, or fine-tune LLM networks, Vinsys delivers localized, secure solutions.
              </p>
            </div>

            {/* Direct Details Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-crimson)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>Global Headquarters</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Shivajinagar, Pune, Maharashtra, India</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-crimson)' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>Enterprise Inquiries</h4>
                  <a href="mailto:info@vinsys.com" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }} className="contact-link">info@vinsys.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-crimson)' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>Phone Connectivity</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>+91 20 6744 4444</p>
                </div>
              </div>
            </div>

            {/* Compliance Note */}
            <div
              className="glass-panel"
              style={{
                padding: '1.25rem',
                background: 'rgba(173, 51, 45, 0.02)',
                borderColor: 'rgba(173, 51, 45, 0.15)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <ShieldCheck size={28} style={{ color: 'var(--brand-crimson)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                We adhere to international compliance protocols including GDPR, SOC 2, and ISO 27001 data isolation frameworks.
              </p>
            </div>
          </div>

          {/* Right Column: Glass Form */}
          <form
            onSubmit={handleSubmit}
            className="glass-panel"
            style={{
              padding: '3rem',
              background: '#f7f7f7',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Full Name</label>
                <input required type="text" className="form-input" placeholder="e.g. Sarah Jenkins" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Corporate Email</label>
                <input required type="email" className="form-input" placeholder="e.g. s.jenkins@enterprise.com" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="form-row">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Organization</label>
                <input required type="text" className="form-input" placeholder="e.g. Acme Corp" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Focus Area</label>
                <select className="form-input" style={{ appearance: 'none', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat' }}>
                  <option>AI Upskilling & Academy</option>
                  <option>Digital Infrastructure / Cloud</option>
                  <option>Cybersecurity Deployment</option>
                  <option>Strategic IT Advisory</option>
                  <option>Custom Software Engineering</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>Message / Scope details</label>
              <textarea required rows={4} className="form-input" style={{ resize: 'none' }} placeholder="Briefly describe your transformational goals..." />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <span>Submit Transformation Request</span>
              <ArrowRight size={16} />
            </button>
          </form>

        </div>
      </div>

      <style>{`
        .contact-link {
          transition: var(--transition-fast);
        }
        .contact-link:hover {
          color: var(--brand-crimson) !important;
        }
        .form-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          background: #ffffff;
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition-smooth);
        }
        .form-input:focus {
          border-color: var(--brand-crimson);
          background: #ffffff;
          box-shadow: 0 0 10px rgba(173, 51, 45, 0.15);
        }
        select.form-input option {
          background-color: #ffffff;
          color: var(--text-primary);
        }
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          form {
            padding: 2rem !important;
          }
        }
        @media (max-width: 576px) {
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

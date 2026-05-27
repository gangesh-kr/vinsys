import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ onEnquireClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#141414',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        padding: '6rem 0 3rem 0',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden'
      }}
    >
      {/* Background Video */}
      <video
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
          opacity: 0.35
        }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay to transition from white top edge to dark background, and ensure text contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #ffffff 0%, rgba(26, 26, 26, 0.8) 18%, rgba(20, 20, 20, 0.85) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Decorative Glow Grid */}
      <div 
        className="glow-bg glow-purple" 
        style={{ 
          width: '500px', 
          height: '500px', 
          bottom: '-250px', 
          left: '10%',
          opacity: 0.05,
          zIndex: 2
        }} 
      />
      <div 
        className="glow-bg glow-cyan" 
        style={{ 
          width: '500px', 
          height: '500px', 
          bottom: '-250px', 
          right: '10%',
          opacity: 0.05,
          zIndex: 2
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        {/* Footer Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '4rem' }} className="footer-grid">
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="#" style={{ display: 'inline-block' }}>
              <img 
                src="/logo-new.svg" 
                alt="Vinsys Logo" 
                style={{ height: '48px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.2))' }} 
              />
            </a>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', maxWidth: '360px', lineHeight: '1.6' }}>
              A global leader in enterprise transformation, corporate learning, digital solutions, and AI-enabled talent building. Empowering Fortune 500 organizations worldwide since 1998.
            </p>
            {/* Certifications badges placeholder */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-orange)', border: '1px solid rgba(246, 147, 32, 0.3)', padding: '0.25rem 0.6rem', borderRadius: '4px', background: 'rgba(246, 147, 32, 0.05)' }}>ISO 9001:2015</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-crimson)', border: '1px solid rgba(173, 51, 45, 0.3)', padding: '0.25rem 0.6rem', borderRadius: '4px', background: 'rgba(173, 51, 45, 0.05)' }}>ISO 27001:2013</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fff' }}>Solutions</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', listStyle: 'none', padding: 0 }}>
              <li><a href="#solutions" className="footer-link">Software Solution</a></li>
              <li><a href="#solutions" className="footer-link">IT Training & Certifications</a></li>
              <li><a href="#solutions" className="footer-link">AI Academy</a></li>
              <li><a href="#solutions" className="footer-link">Business Academy</a></li>
              <li><a href="#solutions" className="footer-link">Digital Learning</a></li>
              <li><a href="#solutions" className="footer-link">Resources and Recruitment</a></li>
            </ul>
          </div>

          {/* Company Column -> Important Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fff' }}>Important Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', listStyle: 'none', padding: 0 }}>
              <li><a href="#about" className="footer-link">About Us</a></li>
              <li><a href="#" className="footer-link">Investor</a></li>
              <li><a href="#career" className="footer-link">Career</a></li>
              <li><a href="#csr" className="footer-link">CSR</a></li>
              <li><a href="#insights" className="footer-link">Press Release</a></li>
              <li><button onClick={onEnquireClick} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', font: 'inherit' }} className="footer-link">Contact Us</button></li>
            </ul>
          </div>

          {/* Contact & HQ Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h4 style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: '#fff' }}>Global HQ</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none', padding: 0, fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--brand-orange)', flexShrink: 0, marginTop: '2px' }} />
                <span>Vinsys IT Services Ltd,<br />Shivajinagar, Pune, MH, India</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--brand-orange)' }} />
                <a href="mailto:enquiry@vinsys.com" style={{ color: 'inherit' }} className="footer-link">enquiry@vinsys.com</a>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--brand-orange)' }} />
                <span>+91 2067444700</span>
              </li>
            </ul>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)', margin: '2rem 0' }} />

        {/* Footer Bottom Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            &copy; 1998-2026 Vinsys | All Rights Reserved. Privacy Policy | Terms & Conditions
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            <a href="#" className="footer-link-muted">Privacy Policy</a>
            <a href="#" className="footer-link-muted">Terms of Service</a>
            <a href="#" className="footer-link-muted">GDPR Compliance</a>
          </div>
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
            className="scroll-top-btn"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: rgba(255, 255, 255, 0.65);
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--brand-orange);
          padding-left: 4px;
        }
        .footer-link-muted {
          color: rgba(255, 255, 255, 0.45);
          transition: var(--transition-fast);
        }
        .footer-link-muted:hover {
          color: #fff;
        }
        .social-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          display: flex;
          alignItems: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.65);
          transition: var(--transition-smooth);
        }
        .social-icon-btn:hover {
          background: linear-gradient(135deg, var(--brand-crimson), var(--brand-orange));
          border-color: transparent;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(173, 51, 45, 0.3);
        }
        .scroll-top-btn:hover {
          border-color: var(--brand-crimson);
          background: rgba(173, 51, 45, 0.1);
          color: var(--brand-crimson);
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(173, 51, 45, 0.2);
        }
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'AI Ecosystem', href: '#ai-ecosystem' },
    { name: 'Global Impact', href: '#global-impact' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Timeline', href: '#timeline' }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? '1rem 0' : '1.5rem 0',
          background: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src="/logo-new.svg" 
              alt="Vinsys Logo" 
              style={{ 
                height: '42px', 
                width: 'auto',
                filter: 'none' 
              }} 
            />
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-only">
            <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      position: 'relative',
                      padding: '0.25rem 0',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--brand-crimson)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-only">
            <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem' }}>
              <span>Initiate Transformation</span>
              <ArrowRight size={15} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'none',
              padding: '0.5rem',
              zIndex: 1001
            }}
            className="mobile-toggle-btn"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'all' : 'none',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', listStyle: 'none', textAlign: 'center', padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '2rem' }}>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary"
              style={{ fontSize: '1.1rem' }}
            >
              <span>Initiate Transformation</span>
              <ArrowRight size={18} />
            </a>
          </li>
        </ul>
      </div>

      {/* Responsive Styles Injection */}
      <style>{`
        .desktop-only {
          display: flex;
        }
        .mobile-toggle-btn {
          display: none;
        }
        @media (max-width: 992px) {
          .desktop-only {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

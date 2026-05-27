import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onEnquireClick }) {
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
    { name: 'What we do', href: '#solutions' },
    { name: 'Who We Are', href: '#about' },
    { name: 'Career', href: '#career' },
    { name: 'CSR', href: '#csr' },
    { name: 'Insights', href: '#insights' }
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: isScrolled ? '0.75rem' : '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 3rem)',
          maxWidth: 'var(--container-width)',
          zIndex: 1000,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled ? '0.6rem 2rem' : '1rem 2rem',
          background: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.4)',
          borderRadius: '24px',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.05)' : 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          {/* Logo with pulse glow */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(circle, rgba(173, 51, 45, 0.15) 0%, transparent 70%)',
                zIndex: -1,
                borderRadius: '50%',
                animation: 'logoPulse glow 3s infinite alternate'
              }}
              className="logo-glow"
            />
            <img
              src="/logo-new.svg"
              alt="Vinsys Logo"
              style={{
                height: isScrolled ? '36px' : '42px',
                width: 'auto',
                transition: 'height 0.4s ease',
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
                    className="nav-item-link"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'var(--text-secondary)',
                      position: 'relative',
                      padding: '0.5rem 0',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="desktop-only">
            <button
              onClick={onEnquireClick}
              className="btn-primary"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}
            >
              <span>Initiate Transformation</span>
              <ArrowRight size={15} />
            </button>
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
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onEnquireClick();
              }}
              className="btn-primary"
              style={{ fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}
            >
              <span>Initiate Transformation</span>
              <ArrowRight size={18} />
            </button>
          </li>
        </ul>
      </div>

      {/* Responsive & Hover Styles Injection */}
      <style>{`
        .desktop-only {
          display: flex;
        }
        .mobile-toggle-btn {
          display: none;
        }
        .nav-item-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--brand-crimson);
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .nav-item-link:hover {
          color: var(--brand-crimson) !important;
        }
        .nav-item-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        @keyframes logoPulse {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
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

import { useState, useEffect, useRef } from 'react';
import { Clock, Menu, X, ArrowUpRight } from 'lucide-react';
/* ─────────────────────────────────────────────────────────────────
   Hook: Live London time (HH:MM, updates every second)
───────────────────────────────────────────────────────────────── */
function useLondonTime() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}
/* ─────────────────────────────────────────────────────────────────
   Hook: Animated canvas shader
   Implements Swirl (colorA #fff / colorB #f0f0f0) +
   ChromaFlow (orange #ff5f03 from all 4 edges, momentum=13, radius=3.5)
───────────────────────────────────────────────────────────────── */
function useShaderCanvas(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t = 0;
    let mx = 0.5;
    let my = 0.5;
    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      my = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    };
    window.addEventListener('mousemove', onMove);
    /* Orange accent rgb */
    const OR = 255, OG = 95, OB = 3;
    const tick = () => {
      t += 0.0018;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      /* ── Base fill ── */
      ctx.fillStyle = '#EFEFEF';
      ctx.fillRect(0, 0, w, h);
      /* ── Swirl: 4 rotating radial gradients (white → #f0f0f0)
            detail=1.7 → 4 lobes, slow orbit
      ── */
      const DETAIL = 1.7;
      for (let i = 0; i < 4; i++) {
        const angle = t * 0.14 * DETAIL + (i * Math.PI * 2) / 4;
        const cx = w * 0.5 + Math.cos(angle) * w * 0.22;
        const cy = h * 0.5 + Math.sin(angle * 0.68) * h * 0.19;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.54);
        g.addColorStop(0,    'rgba(255,255,255,0.62)');
        g.addColorStop(0.38, 'rgba(248,248,248,0.26)');
        g.addColorStop(0.72, 'rgba(240,240,240,0.10)');
        g.addColorStop(1,    'rgba(239,239,239,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      /* ── ChromaFlow: momentum=13, radius=3.5 (relative units)
            Orange radial pulses from all 4 edges + center base
      ── */
      const MOMENTUM = 13;
      const RADIUS   = 3.5;
      const ft       = t * MOMENTUM * 0.016; /* flow time */
      const edgeGlows = [
        /* upColor (top edge)    */ { x: w * (0.5 + 0.28 * Math.sin(ft * 1.1)),  y: -h * 0.06,  r: h * RADIUS * 0.20, a: 0.040 },
        /* downColor (btm edge)  */ { x: w * (0.5 - 0.20 * Math.cos(ft * 0.85)), y:  h * 1.06,  r: h * RADIUS * 0.21, a: 0.042 },
        /* leftColor (lft edge)  */ { x: -w * 0.06, y: h * (0.5 + 0.22 * Math.sin(ft * 0.9)),  r: w * RADIUS * 0.19, a: 0.036 },
        /* rightColor (rgt edge) */ { x:  w * 1.06, y: h * (0.5 - 0.16 * Math.cos(ft * 1.15)), r: w * RADIUS * 0.20, a: 0.038 },
        /* baseColor center      */ { x: w * 0.5, y: h * 0.5, r: Math.min(w, h) * RADIUS * 0.12, a: 0.012 },
      ];
      edgeGlows.forEach(({ x, y, r, a }) => {
        const pa = a * (0.80 + 0.20 * Math.sin(ft * 2.8));
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    `rgba(${OR},${OG},${OB},${pa})`);
        g.addColorStop(0.45, `rgba(${OR},${OG},${OB},${(pa * 0.28).toFixed(3)})`);
        g.addColorStop(1,    `rgba(${OR},${OG},${OB},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
      /* Mouse-tracking ChromaFlow glow */
      const mgx = mx * w;
      const mgy = my * h;
      const mSize = Math.min(w, h) * 0.30;
      const mg = ctx.createRadialGradient(mgx, mgy, 0, mgx, mgy, mSize);
      mg.addColorStop(0, `rgba(${OR},${OG},${OB},0.055)`);
      mg.addColorStop(1, `rgba(${OR},${OG},${OB},0)`);
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, w, h);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, [ref]);
}
/* ─────────────────────────────────────────────────────────────────
   Reusable: Text-Roll Button wrapper
   Stacks two copies of children vertically; hover slides up 50%
───────────────────────────────────────────────────────────────── */
function TextRoll({ label, lineH = 20, style = {} }) {
  return (
    <div
      style={{
        overflow: 'hidden',
        height: `${lineH}px`,
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <div
        className="ph-text-roll-inner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 500ms cubic-bezier(0.25,0.1,0.25,1)',
        }}
      >
        <span style={{ height: `${lineH}px`, lineHeight: `${lineH}px`, display: 'block' }}>{label}</span>
        <span style={{ height: `${lineH}px`, lineHeight: `${lineH}px`, display: 'block' }}>{label}</span>
      </div>
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────────
   Reusable: Arrow circle (rotates on parent hover)
───────────────────────────────────────────────────────────────── */
function ArrowCircle({ size = 28, bg = '#ffffff', color = '#111111' }) {
  return (
    <div
      className="ph-arrow-circle"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1)',
      }}
    >
      <ArrowUpRight
        size={size * 0.5}
        style={{ color, transition: 'transform 0.35s cubic-bezier(0.25,0.1,0.25,1)' }}
        className="ph-arrow-icon"
      />
    </div>
  );
}
/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export default function PremiumHero({ onEnquireClick }) {
  const canvasRef  = useRef(null);
  const londonTime = useLondonTime();
  const [menuOpen, setMenuOpen] = useState(false);
  useShaderCanvas(canvasRef);
  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  const navLinks = ['Services', 'About', 'Case Studies', 'Contact'];
  return (
    <>
      {/* ── SVG filter definitions (invisible, referenced by CSS filter) ── */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          {/* FlutedGlass  (aberration 0.61, angle 31, frequency 8, refraction 4, speed 0.15) */}
          <filter id="ph-fluted" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.075"
              numOctaves="2"
              seed="7"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* FilmGrain  (strength 0.05) */}
          <filter id="ph-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.88"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
            <feBlend in="SourceGraphic" in2="mono" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>
      {/* ══════════════════════════════════════════════════════════
          SECTION
      ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#EFEFEF',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* 1. Shader canvas — Swirl + ChromaFlow */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            zIndex: 0,
          }}
        />
        {/* 2. FlutedGlass overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            filter: 'url(#ph-fluted)',
            opacity: 0.13,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.22) 100%)',
          }}
        />
        {/* 3. FilmGrain overlay (strength 0.05) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 11,
            pointerEvents: 'none',
            filter: 'url(#ph-grain)',
            opacity: 0.05,
            mixBlendMode: 'overlay',
            background: '#888',
          }}
        />
        {/* ─────────────────────────────────────────────────────
            NAVIGATION
        ───────────────────────────────────────────────────── */}
        <nav
          style={{
            position: 'relative',
            zIndex: 20,
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            padding: '12px 12px',
            boxSizing: 'border-box',
          }}
        >
          {/* Pill container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ffffff',
              borderRadius: '999px',
              padding: '5px',
              boxShadow:
                '0 2px 20px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.045)',
            }}
          >
            {/* Logo: dark circle */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1,
                }}
              >
                VS
              </span>
            </div>
            {/* Desktop nav links */}
            <div
              className="ph-desktop-links"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginLeft: '28px',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  className="ph-nav-link"
                  style={{
                    fontSize: '14px',
                    color: '#111111',
                    fontFamily: 'var(--font-heading)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            {/* Flex spacer */}
            <div style={{ flex: 1 }} />
            {/* Status text — large screens only */}
            <div
              className="ph-status-text"
              style={{
                fontSize: '13px',
                color: '#6b7280',
                fontFamily: 'var(--font-sans)',
                whiteSpace: 'nowrap',
                marginRight: '20px',
              }}
            >
              Trusted by 2000+ enterprises globally
            </div>
            {/* London time */}
            <div
              className="ph-time-badge"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginRight: '16px',
                flexShrink: 0,
              }}
            >
              <Clock size={14} style={{ color: '#6b7280' }} />
              <span
                style={{
                  fontSize: '13px',
                  color: '#374151',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.01em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {londonTime}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  color: '#9ca3af',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                LON
              </span>
            </div>
            {/* Desktop CTA button — text roll */}
            <button
              onClick={onEnquireClick}
              className="ph-cta-btn ph-desktop-cta"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#111111',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                paddingLeft: '20px',
                paddingRight: '8px',
                paddingTop: '8px',
                paddingBottom: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '13px',
                flexShrink: 0,
              }}
            >
              <TextRoll label="Book a strategy call" lineH={20} />
              <ArrowCircle size={28} bg="#ffffff" color="#111111" />
            </button>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(true)}
              className="ph-mobile-toggle"
              aria-label="Open menu"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '999px',
                background: '#111111',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Menu size={16} style={{ color: '#ffffff' }} />
            </button>
          </div>
        </nav>
        {/* Spacer pushes hero content to bottom */}
        <div style={{ flex: 1 }} />
        {/* ─────────────────────────────────────────────────────
            HERO CONTENT
        ───────────────────────────────────────────────────── */}
        <div
          className="ph-hero-content"
          style={{
            position: 'relative',
            zIndex: 20,
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            padding: '0 48px 80px',
            boxSizing: 'border-box',
          }}
        >
          {/* Small label */}
          <p
            style={{
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: '#374151',
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              textTransform: 'uppercase',
              marginBottom: '28px',
            }}
          >
            Vinsys
          </p>
          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#111111',
              margin: 0,
              fontSize: 'clamp(2.1rem, 4.8vw, 4.2rem)',
              maxWidth: '1060px',
            }}
          >
            We deliver intelligent IT training,{' '}
            <br className="ph-br" />
            cloud transformations and enterprise
            <br className="ph-br" />
            {' '}solutions for organisations ready to{' '}
            <br className="ph-br" />
            <span
              style={{
                background: 'linear-gradient(90deg, #F26522 0%, #ff8c42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              lead their industry.
            </span>
          </h1>
          {/* CTA row */}
          <div
            className="ph-cta-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '48px',
              flexWrap: 'wrap',
            }}
          >
            {/* Primary orange button */}
            <button
              onClick={onEnquireClick}
              className="ph-cta-btn ph-orange-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#F26522',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                paddingLeft: '24px',
                paddingRight: '8px',
                paddingTop: '10px',
                paddingBottom: '10px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'background 0.25s ease',
              }}
            >
              <TextRoll label="Enquire Now" lineH={22} />
              <ArrowCircle size={34} bg="#ffffff" color="#F26522" />
            </button>
            {/* Partner badge */}
            <div
              className="ph-partner-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#ffffff',
                borderRadius: '4px',
                padding: '9px 14px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'default',
                userSelect: 'none',
              }}
            >
              {/* Starburst SVG */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 1L12.0 7.5L18.5 10L12.0 12.5L10 19L8.0 12.5L1.5 10L8.0 7.5L10 1Z"
                  fill="#F26522"
                />
                <circle cx="10" cy="10" r="2.5" fill="#ffffff" />
              </svg>
              <span
                style={{
                  fontSize: '13px',
                  color: '#374151',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 500,
                }}
              >
                Certified Partner
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  background: '#111111',
                  color: '#ffffff',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ══════════════════════════════════════════════════════════
          MOBILE MENU OVERLAY
      ══════════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background: 'rgba(0,0,0,0.60)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="ph-mobile-sheet"
            style={{
              background: '#ffffff',
              borderRadius: '24px 24px 0 0',
              margin: '0 12px 12px',
              padding: '32px 28px 48px',
              boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
            }}
          >
            {/* Close button row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '28px',
              }}
            >
              {/* Time badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#f3f4f6',
                  borderRadius: '999px',
                  padding: '6px 14px',
                }}
              >
                <Clock size={13} style={{ color: '#6b7280' }} />
                <span
                  style={{
                    fontSize: '13px',
                    color: '#374151',
                    fontFamily: 'var(--font-sans)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {londonTime} · London
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} style={{ color: '#374151' }} />
              </button>
            </div>
            {/* Large nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', marginBottom: '32px' }}>
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: '28px',
                    lineHeight: '32px',
                    fontWeight: 500,
                    color: '#111111',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-heading)',
                    padding: '12px 0',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'block',
                    transition: 'color 0.2s ease',
                    letterSpacing: '-0.02em',
                  }}
                  className="ph-mobile-link"
                >
                  {link}
                </a>
              ))}
            </nav>
            {/* "Start a project" button */}
            <button
              onClick={() => { setMenuOpen(false); onEnquireClick?.(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: '#111111',
                color: '#ffffff',
                border: 'none',
                borderRadius: '16px',
                padding: '18px 20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 500,
                fontSize: '17px',
                letterSpacing: '-0.02em',
              }}
            >
              <span>Start a project</span>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowUpRight size={18} style={{ color: '#111' }} />
              </div>
            </button>
          </div>
        </div>
      )}
      {/* ══════════════════════════════════════════════════════════
          SCOPED STYLES
      ══════════════════════════════════════════════════════════ */}
      <style>{`
        /* Nav link hover */
        .ph-nav-link:hover { color: #6b7280 !important; }
        .ph-mobile-link:hover { color: #F26522 !important; }
        /* Text-roll: trigger on parent button hover */
        .ph-cta-btn:hover .ph-text-roll-inner {
          transform: translateY(-50%);
        }
        /* Arrow rotation on hover */
        .ph-cta-btn:hover .ph-arrow-circle {
          transform: rotate(0deg);
        }
        .ph-cta-btn:hover .ph-arrow-icon {
          transform: rotate(-45deg);
        }
        /* Orange button hover tint */
        .ph-orange-btn:hover {
          background: #e05a1a !important;
        }
        /* Partner badge hover shadow */
        .ph-partner-badge:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.07) !important;
        }
        /* Desktop / mobile visibility */
        .ph-desktop-links { display: flex !important; }
        .ph-status-text   { display: block !important; }
        .ph-time-badge    { display: flex !important; }
        .ph-desktop-cta   { display: flex !important; }
        .ph-mobile-toggle { display: none !important; }
        @media (max-width: 1024px) {
          .ph-status-text { display: none !important; }
        }
        @media (max-width: 768px) {
          .ph-desktop-links { display: none !important; }
          .ph-time-badge    { display: none !important; }
          .ph-desktop-cta   { display: none !important; }
          .ph-mobile-toggle { display: flex !important; }
          .ph-hero-content {
            padding: 0 20px 56px !important;
          }
          .ph-cta-row {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .ph-br { display: none; }
        }
        /* Mobile bottom-sheet slide-up */
        .ph-mobile-sheet {
          animation: ph-slide-up 0.5s cubic-bezier(0.32,0.72,0,1) both;
        }
        @keyframes ph-slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        /* Arrow default state (pre-hover) */
        .ph-arrow-icon {
          transform: rotate(0deg);
        }
      `}</style>
    </>
  );
}

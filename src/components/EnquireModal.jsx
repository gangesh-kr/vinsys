import { useState, useEffect } from 'react';
import { X, Mail, Phone, Send, ChevronDown } from 'lucide-react';

export default function EnquireModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ fullName: '', email: '', phone: '', service: '', message: '', consent: false });
        onClose();
      }, 2500);
    }, 1200);
  };

  const serviceOptions = [
    'IT Services',
    'Digital Learning',
    'Business Academy',
    'Training',
    'Foreign Language Services',
    'Resourcing & Recruitment',
  ];

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    background: '#f9f9f9',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--text-muted)',
    marginBottom: '0.4rem',
    display: 'block',
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 9998,
          animation: 'modalFadeIn 0.3s ease',
        }}
      />

      {/* Modal Panel */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '560px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
          animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '1.5rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Enquire Now
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
              Let us help you get started
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.target.style.background = 'rgba(173, 51, 45, 0.1)'; e.target.style.color = 'var(--brand-crimson)'; }}
            onMouseLeave={(e) => { e.target.style.background = 'rgba(0, 0, 0, 0.04)'; e.target.style.color = 'var(--text-secondary)'; }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Contact Info Bar */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            padding: '1rem 2rem',
            background: 'rgba(173, 51, 45, 0.03)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
            flexWrap: 'wrap',
          }}
        >
          <a href="mailto:enquiry@vinsys.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--brand-crimson)', fontWeight: 500 }}>
            <Mail size={14} /> enquiry@vinsys.com
          </a>
          <a href="tel:+912067444700" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--brand-crimson)', fontWeight: 500 }}>
            <Phone size={14} /> +91 2067444700
          </a>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-crimson), var(--brand-orange))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Send size={24} style={{ color: '#fff' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Thank you!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We'll get back to you shortly.</p>
            </div>
          ) : (
            <>
              {/* Full Name & Email Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand-crimson)'; e.target.style.boxShadow = '0 0 0 3px rgba(173,51,45,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Corporate Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand-crimson)'; e.target.style.boxShadow = '0 0 0 3px rgba(173,51,45,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Phone & Service Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand-crimson)'; e.target.style.boxShadow = '0 0 0 3px rgba(173,51,45,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <label style={labelStyle}>Select Service *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                      paddingRight: '2.5rem',
                      color: formData.service ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand-crimson)'; e.target.style.boxShadow = '0 0 0 3px rgba(173,51,45,0.08)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                  >
                    <option value="" disabled>Choose a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '12px', bottom: '14px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    minHeight: '100px',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand-crimson)'; e.target.style.boxShadow = '0 0 0 3px rgba(173,51,45,0.08)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,0,0,0.1)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Privacy Consent */}
              <label
                style={{
                  display: 'flex',
                  gap: '0.65rem',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5',
                }}
              >
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '2px',
                    accentColor: 'var(--brand-crimson)',
                    flexShrink: 0,
                  }}
                />
                I agree to the Privacy Policy and consent to Vinsys processing my data for this enquiry.
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  pointerEvents: isSubmitting ? 'none' : 'auto',
                }}
              >
                <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                {!isSubmitting && <Send size={16} />}
              </button>
            </>
          )}
        </form>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
        @media (max-width: 576px) {
          .enquire-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}

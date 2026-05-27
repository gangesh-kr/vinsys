import { useRef } from 'react';
import NeuralCanvas from './NeuralCanvas';
import { ArrowRight, Sparkles, BrainCircuit, Target, Network } from 'lucide-react';
import TypographyReveal from './TypographyReveal';

export default function AIInnovation() {
  const containerRef = useRef(null);
  const cursorPosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate normalized cursor coordinates within this specific section bounds
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    cursorPosition.current = { x, y };
  };

  const capabilities = [
    {
      title: 'Cognitive Workflow Advisory',
      desc: 'Mapping internal processes, identifying high-impact AI integration vectors, and designing corporate LLM roadmaps.',
      icon: <BrainCircuit size={20} />,
      color: 'var(--brand-amber)'
    },
    {
      title: 'Custom Cognitive Architectures',
      desc: 'Developing specialized agents, private RAG systems, and custom model fine-tuning with strict data privacy firewalls.',
      icon: <Network size={20} />,
      color: 'var(--brand-orange)'
    },
    {
      title: 'AI Engineering Academy',
      desc: 'Upskilling engineering cohorts in prompt orchestration, retrieval optimization, agent structures, and LLM safety.',
      icon: <Target size={20} />,
      color: 'var(--brand-crimson)'
    }
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        padding: '10rem 0',
        background: '#f7f7f7',
        position: 'relative',
        overflow: 'hidden'
      }}
      id="ai-ecosystem"
    >
      {/* Decorative Glow Grid */}
      <div className="glow-bg glow-purple" style={{ width: '500px', height: '500px', top: '10%', right: '-10%', opacity: 0.05 }} />
      <div className="glow-bg glow-blue" style={{ width: '500px', height: '500px', bottom: '10%', left: '-10%', opacity: 0.04 }} />

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>

        {/* Main Content Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '5rem', alignItems: 'center' }} className="ai-layout-grid">

          {/* Left Column: Copywriting */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span className="section-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-orange)' }}>
                <Sparkles size={14} />
                Cognitive Readiness
              </span>
              <TypographyReveal
                tag="h2"
                text="Building AI-Ready Organizations"
                animationType="reveal"
                className="section-title text-gradient-purple"
                style={{ textAlign: 'left', margin: 0 }}
              />
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginTop: '1rem' }}>
                Technology alone is not a strategy. We construct the cognitive pipelines and upskill the engineering workforces required to thrive in an AI-first economy.
              </p>
            </div>

            {/* Capability Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {capabilities.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel capability-card"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    borderColor: 'var(--glass-border)'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                      flexShrink: 0
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <a href="#contact" className="btn-primary">
                <span>Accelerate AI Roadmap</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: R3F Canvas Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              borderRadius: 'var(--radius-lg)',
              background: '#ffffff',
              border: '1px solid rgba(173, 51, 45, 0.15)',
              overflow: 'hidden'
            }}
            className="ai-canvas-container"
          >
            {/* 3D R3F Neural Network */}
            <NeuralCanvas cursorPosition={cursorPosition} />

            {/* Tech details panel overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-crimson)', fontWeight: 600 }}>Active Nodes</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'var(--mono)' }}>45 Matrix Coordinates</span>
              </div>
              <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-orange)', fontWeight: 600 }}>Sync Status</span>
                <span style={{ fontSize: '0.88rem', color: 'var(--brand-orange)', fontFamily: 'var(--mono)' }}>OPTIMIZED (60FPS)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .capability-card {
          transition: var(--transition-smooth);
        }
        .capability-card:hover {
          transform: translateX(6px);
          border-color: rgba(173, 51, 45, 0.3) !important;
          background: var(--bg-card-hover) !important;
        }
        @media (max-width: 992px) {
          .ai-layout-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .ai-canvas-container {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}

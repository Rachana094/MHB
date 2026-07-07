import { useState } from 'react';
import { finalLetterLines, closingSignoff } from '../data';

// ── Permanent close screen ───────────────────────────────────────────────────
function ClosingScreen() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 fade-in px-6 text-center"
      style={{ background: '#0F0A1E' }}
    >
      {/* Decorative gradient glowing orb */}
      <div className="absolute w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Pulsing Star logo */}
      <div
        className="text-6xl mb-10 select-none cursor-default star-pulse"
        style={{ color: '#FFD700', filter: 'drop-shadow(0 0 25px rgba(255,215,0,0.6))' }}
      >
        ✦
      </div>

      <p
        className="max-w-xl leading-relaxed text-white/90"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          letterSpacing: '0.02em',
        }}
      >
        {closingSignoff}
      </p>

      <div
        className="mt-12 text-xs font-semibold tracking-[0.4em] uppercase"
        style={{ color: 'rgba(255,107,157,0.4)' }}
      >
        ✦ ✦ ✦
      </div>
    </div>
  );
}

// ── Main Stage ───────────────────────────────────────────────────────────────
export default function Stage7Letter() {
  const [closing, setClosing] = useState(false);
  const [closed, setClosed] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => setClosed(true), 1500);
  };

  if (closed) return <ClosingScreen />;

  return (
    <div
      className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-16 transition-opacity duration-1000 ${closing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="text-center mb-6">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: '#FF6B9D' }}>
          The Final Letter
        </p>
        <div className="text-3xl star-pulse select-none text-pink-400">✦</div>
      </div>

      {/* Letter card container */}
      <div
        className="w-full max-w-2xl rounded-3xl p-6 md:p-10 relative glass overflow-hidden"
        style={{
          boxShadow: '0 0 80px rgba(255,107,157,0.08)',
        }}
      >
        {/* Subtle corner elements */}
        <span className="absolute top-5 left-5 text-pink-500/30 text-2xl select-none font-light">✦</span>
        <span className="absolute top-5 right-5 text-pink-500/30 text-2xl select-none font-light">✦</span>
        <span className="absolute bottom-5 left-5 text-pink-500/30 text-2xl select-none font-light">✦</span>
        <span className="absolute bottom-5 right-5 text-pink-500/30 text-2xl select-none font-light">✦</span>

        {/* Letter body */}
        <div
          className="space-y-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {finalLetterLines.map((line, i) => {
            if (line === '') return <div key={i} className="h-3" />;
            
            // Highlight first line and signature/closing block
            const isFirst = i === 0;
            const isLastBlock = i >= finalLetterLines.length - 2;

            return (
              <p
                key={i}
                className="leading-relaxed text-base md:text-lg"
                style={{
                  color: isFirst || isLastBlock ? '#C084FC' : 'rgba(255,255,255,0.85)',
                  fontStyle: isFirst || isLastBlock ? 'italic' : 'normal',
                  fontWeight: isFirst || isLastBlock ? '600' : '300',
                }}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div
          className="mx-auto mt-12 mb-10"
          style={{ width: 80, height: 1, background: 'linear-gradient(to right, transparent, rgba(192,132,252,0.4), transparent)' }}
        />

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={handleClose}
            className="px-10 py-4 rounded-full text-xs tracking-[0.25em] uppercase font-bold transition-all duration-500 hover:scale-105"
            style={{
              background: 'transparent',
              border: '2px solid rgba(255,107,157,0.3)',
              color: 'rgba(255,107,157,0.7)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,107,157,0.8)';
              e.currentTarget.style.color = '#FF6B9D';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,157,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,107,157,0.3)';
              e.currentTarget.style.color = 'rgba(255,107,157,0.7)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Close this chapter ✦
          </button>
        </div>
      </div>
    </div>
  );
}

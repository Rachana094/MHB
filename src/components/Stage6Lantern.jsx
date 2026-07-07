import { useState, useRef } from 'react';

// ── Single floating lantern ──────────────────────────────────────────────────
function Lantern({ text, id, onGone }) {
  const hues = [25, 12, 340, 5]; // Orange, peach, rose, gold-red warm tones
  const hue = hues[id % hues.length];
  const leftPct = 15 + (id * 23) % 70; // Drifts evenly across viewport

  return (
    <div
      className="lantern-fly absolute flex flex-col items-center gap-1 select-none pointer-events-none"
      style={{ bottom: 80, left: `${leftPct}%`, transform: 'translateX(-50%)' }}
      onAnimationEnd={onGone}
    >
      {/* Lantern shape */}
      <div
        style={{
          width: 64,
          height: 84,
          borderRadius: '45% 45% 50% 50% / 30% 30% 70% 70%',
          background: `radial-gradient(ellipse at 40% 30%, hsl(${hue},100%,88%) 0%, hsl(${hue},95%,65%) 40%, hsl(${hue},85%,40%) 100%)`,
          boxShadow: `0 0 25px 8px hsla(${hue},90%,60%,0.6), 0 0 60px 25px hsla(${hue},90%,50%,0.3)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
          position: 'relative',
        }}
      >
        {/* Wish text inside lantern */}
        <p
          className="text-center leading-tight font-semibold"
          style={{ fontSize: 8, color: 'rgba(50,15,0,0.88)', maxWidth: 50, wordBreak: 'break-word', fontFamily: "'Inter', sans-serif" }}
        >
          {text.length > 35 ? text.slice(0, 35) + '…' : text}
        </p>
        
        {/* Bottom flame glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -5,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 10,
            height: 16,
            background: 'radial-gradient(circle, #fff 0%, #FFB347 50%, transparent 100%)',
            borderRadius: '50% 50% 0 0',
            filter: 'blur(1px)',
            animation: 'flicker 0.25s infinite alternate',
          }}
        />
      </div>
      {/* Lantern thread / tassel */}
      <div style={{ width: 1, height: 18, background: 'rgba(255,179,71,0.4)' }} />
    </div>
  );
}

export default function Stage6Lantern({ onNext }) {
  const [wish, setWish] = useState('');
  const [lanterns, setLanterns] = useState([]);
  const [released, setReleased] = useState([]);
  const counter = useRef(0);

  const release = () => {
    const text = wish.trim();
    if (!text) return;
    const id = counter.current++;
    setLanterns((prev) => [...prev, { id, text }]);
    setReleased((prev) => [...prev, text]);
    setWish('');
  };

  const removeLantern = (id) => {
    setLanterns((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 md:py-16 overflow-hidden">
      {/* Floating lanterns overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 20 }}>
        {lanterns.map((l) => (
          <Lantern key={l.id} id={l.id} text={l.text} onGone={() => removeLantern(l.id)} />
        ))}
      </div>

      <div className="text-center mb-6 relative z-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: '#FFB347' }}>Chapter Six</p>
        <h2 className="font-display text-3xl md:text-5xl text-white text-center mb-3 leading-tight">
          The Lantern Release
        </h2>
        <p className="text-white/60 text-xs md:text-sm max-w-xs md:max-w-sm mx-auto leading-relaxed font-light">
          Type a wish or a dream for your future.<br />
          Watch it float up into the galaxy.
        </p>
      </div>

      <div className="w-full max-w-md relative z-10 glass p-6 md:p-8" style={{ boxShadow: '0 0 60px rgba(255,179,71,0.06)' }}>
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="I wish for..."
          rows={3}
          className="w-full bg-transparent resize-none text-white/90 placeholder-white/25 text-base leading-relaxed border-b pb-2 mb-5 focus:outline-none"
          style={{
            borderColor: 'rgba(255,179,71,0.3)',
            fontFamily: "'Playfair Display', serif",
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              release();
            }
          }}
        />
        
        <button
          onClick={release}
          disabled={!wish.trim()}
          className="btn-primary w-full text-sm py-3"
          style={{
            background: 'linear-gradient(135deg, #FFB347, #FF6B9D, #C084FC)',
            boxShadow: '0 4px 24px rgba(255,179,71,0.35)',
          }}
        >
          🏮 Release into the Universe
        </button>

        {released.length > 0 && (
          <div className="mt-6 space-y-2">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/40">
              Released Wishes
            </p>
            <div className="max-h-24 overflow-y-auto pr-2 space-y-1.5">
              {released.map((w, i) => (
                <p key={i} className="text-white/70 text-xs md:text-sm italic font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
                  ✦ "{w}"
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={onNext} className="btn-primary mt-10 relative z-10">
        Read the final letter →
      </button>
    </div>
  );
}

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Compass } from 'lucide-react';

const wishInspirations = [
  "For eternal peace, laughter, and endless starlight.",
  "May your future be as bright and beautiful as your smile.",
  "Wishing you health, endless adventures, and quiet joy.",
  "To always finding your way back to your truest self.",
  "May every path you walk lead you to success and warmth.",
];

// ── Sky Lantern Component ───────────────────────────────────────────────────
function Lantern({ text, id, onGone }) {
  const hues = [25, 15, 340, 8, 42]; // Orange, gold, warm rose, peach, yellow
  const hue = hues[id % hues.length];
  const leftPct = 10 + (id * 27) % 80; // Drifts evenly across viewport
  
  // Custom flight duration and delay for natural variance
  const duration = 16 + (id % 5) * 2; 
  const swayDuration = 4 + (id % 3) * 1.5;

  return (
    <div
      className="absolute flex flex-col items-center select-none pointer-events-none z-20"
      style={{
        bottom: -150,
        left: `${leftPct}%`,
        animation: `floatUp ${duration}s linear forwards`,
      }}
      onAnimationEnd={onGone}
    >
      {/* Animated container for swaying and flickering */}
      <div
        className="flex flex-col items-center"
        style={{
          animation: `sway ${swayDuration}s ease-in-out infinite alternate, flicker 0.4s ease-in-out infinite alternate`,
        }}
      >
        {/* Sky Lantern SVG */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 100 130" className="w-28 h-36 drop-shadow-[0_0_25px_rgba(255,179,71,0.9)]">
            <defs>
              <radialGradient id={`flame-${id}`} cx="50%" cy="80%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fff2cc" />
                <stop offset="55%" stopColor={`hsl(${hue}, 100%, 65%)`} />
                <stop offset="100%" stopColor={`hsl(${hue}, 95%, 35%)`} />
              </radialGradient>
            </defs>
            {/* Lantern Outer Body */}
            <path
              d="M20,20 C35,10 65,10 80,20 L75,105 C70,108 30,108 25,105 Z"
              fill={`url(#flame-${id})`}
              opacity="0.96"
            />
            {/* Lantern Inner Glow */}
            <path
              d="M32,32 C42,26 58,26 68,32 L64,98 C60,100 40,100 36,98 Z"
              fill="#ffffff"
              opacity="0.22"
            />
            {/* Base Ring */}
            <path
              d="M24,105 C32,108 68,108 76,105 L75,108 C67,111 33,111 25,108 Z"
              fill="#5c1a00"
            />
          </svg>

          {/* Wish text inside lantern */}
          <div className="absolute inset-x-0 top-6 bottom-8 flex items-center justify-center px-4 py-2 text-center">
            <p
              className="leading-tight font-serif italic font-bold text-[#1f0b02]"
              style={{
                fontSize: '11px',
                maxWidth: '78px',
                wordBreak: 'break-word',
                lineHeight: 1.25,
                textShadow: '0 0.5px 0.5px rgba(255,255,255,0.45)',
              }}
            >
              {text.length > 55 ? text.slice(0, 52) + '…' : text}
            </p>
          </div>
        </div>

        {/* Hanging Thread & Crimson Tassel */}
        <div className="flex flex-col items-center mt-[-3px]">
          <div className="w-[1px] h-8 bg-amber-500/40" />
          <div className="w-2 h-2 rounded-full bg-red-600/80 shadow-[0_0_8px_#ef4444]" />
          <div className="w-[1px] h-5 bg-red-500/60" />
        </div>
      </div>
    </div>
  );
}

// ── Firefly particles component ──────────────────────────────────────────────
function Fireflies() {
  const [flies, setFlies] = useState([]);
  
  useEffect(() => {
    // Populate initial fireflies
    const initialFlies = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 4,
    }));
    setFlies(initialFlies);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-amber-400/70"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            boxShadow: '0 0 10px #f59e0b, 0 0 4px #fbbf24',
            animation: `fireflyFloat ${f.duration}s ease-in-out infinite alternate`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Stage6Lantern({ onNext }) {
  const [wish, setWish] = useState('');
  const [lanterns, setLanterns] = useState([]);
  const [released, setReleased] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const counter = useRef(0);
  const [insIndex, setInsIndex] = useState(0);

  const release = () => {
    const text = wish.trim();
    if (!text) return;
    const id = counter.current++;
    setLanterns((prev) => [...prev, { id, text }]);
    setReleased((prev) => [...prev, text]);
    setWish('');
    
    // Unlocks final navigation after releasing at least one lantern
    if (!showNextButton) {
      setTimeout(() => setShowNextButton(true), 1500);
    }
  };

  const getInspiration = () => {
    setWish(wishInspirations[insIndex]);
    setInsIndex((prev) => (prev + 1) % wishInspirations.length);
  };

  const removeLantern = (id) => {
    setLanterns((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-8 md:py-16 overflow-hidden">
      
      {/* Styles injector for custom celestial effects */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0.65);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(-135vh) scale(1.1);
            opacity: 0;
          }
        }
        @keyframes sway {
          0% { transform: rotate(-3deg) translateX(-8px); }
          100% { transform: rotate(3deg) translateX(8px); }
        }
        @keyframes flicker {
          0% { transform: scale(0.98); opacity: 0.92; }
          100% { transform: scale(1.02); opacity: 1; }
        }
        @keyframes fireflyFloat {
          0% { transform: translateY(0) translateX(0); opacity: 0.2; }
          50% { opacity: 0.9; }
          100% { transform: translateY(-40px) translateX(15px); opacity: 0.2; }
        }
        .custom-textarea::-webkit-scrollbar {
          width: 4px;
        }
        .custom-textarea::-webkit-scrollbar-thumb {
          background: rgba(255,179,71,0.2);
          border-radius: 4px;
        }
      `}</style>

      {/* Magical fireflies and ambient sky decorations */}
      <Fireflies />

      {/* Floating lanterns layer */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {lanterns.map((l) => (
          <Lantern key={l.id} id={l.id} text={l.text} onGone={() => removeLantern(l.id)} />
        ))}
      </div>

      <div className="text-center mb-8 relative z-10 flex-shrink-0">
        <p className="text-xs font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: '#FFB347' }}>Chapter Six</p>
        <h2 className="font-display text-3xl md:text-5xl text-white text-center mb-3 leading-tight">
          The Lantern Release
        </h2>
        <p className="text-white/60 text-xs md:text-sm max-w-xs md:max-w-sm mx-auto leading-relaxed font-light">
          Send your wishes or dreams into the starry skies. Watch them float upward into the galaxy.
        </p>
      </div>

      <div 
        className="w-full max-w-md relative z-10 p-6 md:p-8 rounded-3xl overflow-hidden flex-shrink-0"
        style={{
          background: 'rgba(20, 15, 35, 0.85)',
          border: '1px solid rgba(255,179,71,0.18)',
          boxShadow: '0 0 60px rgba(255,179,71,0.06), inset 0 0 20px rgba(255,255,255,0.02)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <div className="relative">
          <textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Write a wish for the future..."
            rows={3}
            className="w-full bg-transparent resize-none text-white/95 placeholder-white/20 text-base leading-relaxed border-b pb-2 mb-3 focus:outline-none custom-textarea"
            style={{
              borderColor: 'rgba(255,179,71,0.25)',
              fontFamily: "'Playfair Display', serif",
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                release();
              }
            }}
          />
          
          {/* Sparkly inspiration helper button */}
          <button 
            type="button"
            onClick={getInspiration}
            className="flex items-center gap-1.5 text-[10.5px] font-medium tracking-wide text-amber-300/70 hover:text-amber-300 transition-colors mb-5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Need inspiration? Click for an idea
          </button>
        </div>
        
        <button
          onClick={release}
          disabled={!wish.trim()}
          className="btn-primary w-full text-sm py-3.5 cursor-pointer flex items-center justify-center gap-2"
          style={{
            background: wish.trim() 
              ? 'linear-gradient(135deg, #FFB347, #FF6B9D, #C084FC)' 
              : 'rgba(255,255,255,0.04)',
            color: wish.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
            border: wish.trim() ? 'none' : '1px solid rgba(255,255,255,0.05)',
            boxShadow: wish.trim() ? '0 4px 25px rgba(255,179,71,0.3)' : 'none',
          }}
        >
          <span>🏮 Release into the Universe</span>
        </button>

        {released.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/5 space-y-2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500/50">
              Released Wishes
            </p>
            <div className="max-h-24 overflow-y-auto pr-2 space-y-2">
              {released.map((w, i) => (
                <p 
                  key={i} 
                  className="text-white/80 text-xs md:text-sm italic font-light leading-relaxed fade-in" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  ✦ "{w}"
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Elegant Silhouette of Distant Lake & Mountains */}
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-0 overflow-hidden select-none">
        {/* Distant Hills */}
        <svg className="absolute bottom-0 w-full h-16 text-[#040209]" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,150 C280,110 520,170 760,130 C1000,90 1200,160 1440,120 L1440,200 L0,200 Z" />
        </svg>
        {/* Midground Hills */}
        <svg className="absolute bottom-0 w-full h-10 text-[#090514] opacity-90" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,165 C400,140 800,190 1200,150 L1440,175 L1440,200 L0,200 Z" />
        </svg>
        {/* Water reflection glow */}
        <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-amber-500/10 to-transparent blur-md" />
      </div>

      {showNextButton && (
        <button 
          onClick={onNext} 
          className="btn-primary mt-8 relative z-10 fade-in flex items-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <Compass className="w-4 h-4 text-pink-400" />
          <span>Read the final letter →</span>
        </button>
      )}
    </div>
  );
}

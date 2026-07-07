import { useState, useCallback, useRef } from 'react';
import { wishesData } from '../data';

/* ── Confetti burst ────────────────────────────────────────────────────────── */
function spawnConfetti(container) {
  const shapes = ['circle', 'square', 'triangle'];
  const colors = ['#FF6B9D', '#FFD700', '#C084FC', '#38BDF8', '#2DD4BF', '#FF8C00', '#FFF'];
  for (let i = 0; i < 100; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.cssText = `
      position:fixed; pointer-events:none; z-index:999;
      left:${10 + Math.random() * 80}vw; top:-20px;
      width:${size}px; height:${size}px;
      background:${shape !== 'triangle' ? color : 'transparent'};
      border-radius:${shape === 'circle' ? '50%' : shape === 'square' ? '2px' : '0'};
      border-left:${shape === 'triangle' ? `${size / 2}px solid transparent` : 'none'};
      border-right:${shape === 'triangle' ? `${size / 2}px solid transparent` : 'none'};
      border-bottom:${shape === 'triangle' ? `${size}px solid ${color}` : 'none'};
      opacity:${0.6 + Math.random() * 0.4};
      animation:confettiFall ${1.5 + Math.random() * 2.5}s ease ${Math.random() * 0.6}s forwards;
    `;
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

/* ── Animated Cake ─────────────────────────────────────────────────────────── */
function BirthdayCake({ candlesLit }) {
  const candleColors = ['#FF6B9D', '#C084FC', '#38BDF8', '#2DD4BF', '#FFD700'];
  return (
    <div className="flex flex-col items-center select-none my-6">
      {/* Candles */}
      <div className="flex gap-4 items-end mb-1">
        {candleColors.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Flame */}
            <div className={`transition-all duration-500 ${candlesLit ? 'flicker' : 'opacity-0 scale-0'}`}
              style={{
                width: 12, height: candlesLit ? 22 : 0,
                background: `radial-gradient(ellipse at 40% 80%, white 0%, ${c} 40%, rgba(255,140,0,0.6) 80%, transparent 100%)`,
                borderRadius: '50% 50% 20% 20%',
                boxShadow: candlesLit ? `0 0 12px 4px ${c}88` : 'none',
                transformOrigin: 'bottom center',
              }} />
            {/* Wick */}
            <div style={{ width: 2, height: 7, background: '#aaa', borderRadius: 1 }} />
            {/* Candle body */}
            <div style={{
              width: 14, height: 40, borderRadius: 3,
              background: `linear-gradient(180deg, ${c}cc, ${c}66)`,
              boxShadow: candlesLit ? `0 0 10px 2px ${c}66` : 'none',
              transition: 'box-shadow 0.6s ease',
            }} />
          </div>
        ))}
      </div>

      {/* Top tier */}
      <div style={{
        width: 140, height: 40, borderRadius: '12px 12px 0 0',
        background: 'linear-gradient(135deg, #3D0B5E, #7B2FBE)',
        border: '1px solid rgba(192,132,252,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(192,132,252,0.3)',
      }}>
        <span style={{ fontFamily: "'Dancing Script', cursive", color: '#fff', fontSize: 14 }}>Happy</span>
      </div>

      {/* Middle tier */}
      <div style={{
        width: 190, height: 48,
        background: 'linear-gradient(135deg, #8B1A4A, #E8336B)',
        border: '1px solid rgba(255,107,157,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(255,107,157,0.3)',
      }}>
        <span style={{ fontFamily: "'Abril Fatface', cursive", color: '#fff', fontSize: 20, letterSpacing: 3 }}>BIRTHDAY</span>
      </div>

      {/* Bottom tier */}
      <div style={{
        width: 240, height: 60, borderRadius: '0 0 16px 16px',
        background: 'linear-gradient(135deg, #0B3D52, #1A6B8A)',
        border: '1px solid rgba(56,189,248,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 30px rgba(56,189,248,0.25)',
      }}>
        <span style={{ fontFamily: "'Dancing Script', cursive", color: 'rgba(255,255,255,0.7)', fontSize: 16 }}>
          🎉 Make a wish 🎉
        </span>
      </div>

      {/* Plate */}
      <div style={{
        width: 270, height: 12, borderRadius: '0 0 50% 50%',
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        opacity: 0.6, marginTop: 2, boxShadow: '0 4px 12px rgba(255,215,0,0.3)',
      }} />
    </div>
  );
}

/* ── Wish Star ─────────────────────────────────────────────────────────────── */
function WishStar({ wish, index }) {
  const [open, setOpen] = useState(false);
  const colors = [
    { bg: 'linear-gradient(135deg, #FF6B9D, #E8336B)', glow: '#FF6B9D' },
    { bg: 'linear-gradient(135deg, #C084FC, #7C3AED)', glow: '#C084FC' },
    { bg: 'linear-gradient(135deg, #38BDF8, #0284C7)', glow: '#38BDF8' },
  ];
  const col = colors[index % colors.length];

  return (
    <>
      <div className="bob" style={{ animationDelay: `${index * 0.4}s` }}>
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-2 group focus:outline-none"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl relative"
            style={{
              background: col.bg,
              boxShadow: `0 0 25px 6px ${col.glow}66`,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = `0 0 35px 10px ${col.glow}88`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 25px 6px ${col.glow}66`; }}
          >
            {wish.emoji}
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
            {wish.title}
          </span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(15,10,30,0.85)', backdropFilter: 'blur(12px)' }} onClick={() => setOpen(false)}>
          <div
            className="fade-in max-w-sm w-full rounded-3xl p-8 text-center glass"
            style={{ border: `1px solid ${col.glow}55`, boxShadow: `0 0 60px ${col.glow}33` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl"
              style={{ background: col.bg, boxShadow: `0 0 24px ${col.glow}66` }}
            >
              {wish.emoji}
            </div>
            <h3 className="font-display text-2xl mb-4" style={{ color: col.glow }}>{wish.title}</h3>
            <p className="text-white/90 leading-relaxed text-base font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              {wish.text}
            </p>
            <button onClick={() => setOpen(false)} className="mt-6 text-xs tracking-widest uppercase font-bold opacity-50 hover:opacity-100 transition-opacity" style={{ color: col.glow }}>
              close ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Main ──────────────────────────────────────────────────────────────────── */
export default function Stage2Cake({ onNext }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const confettiRef = useRef(null);
  const rafRef = useRef(null);
  const srcRef = useRef(null);
  const ctxRef = useRef(null);

  const blowOut = useCallback(() => {
    if (blown) return;
    setCandlesLit(false);
    setTimeout(() => { setBlown(true); if (confettiRef.current) spawnConfetti(confettiRef.current); }, 700);
  }, [blown]);

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    try { srcRef.current?.disconnect(); ctxRef.current?.close(); } catch (_) {}
    setListening(false);
  }, []);

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      ctxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      const src = ctx.createMediaStreamSource(stream);
      srcRef.current = src;
      src.connect(analyser);
      setListening(true);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const check = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 28) { stopMic(); blowOut(); return; }
        rafRef.current = requestAnimationFrame(check);
      };
      check();
    } catch { setMicError(true); }
  }, [blowOut, stopMic]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-start md:justify-center min-h-screen px-6 py-8 md:py-16" ref={confettiRef}>
      {/* Background Glow orbs */}
      <div className="fixed top-1/2 left-1/3 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.08) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(-50%,-50%)' }} />
      <div className="fixed top-1/2 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(50%,-50%)' }} />

      <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 flex-shrink-0" style={{ color: '#FF6B9D' }}>Chapter Two</p>
      <h2 className="font-display text-3xl md:text-5xl text-white text-center mb-6 leading-tight flex-shrink-0">
        Close your eyes &<br />
        <span className="shimmer-text">make a wish ✨</span>
      </h2>

      <div className="flex-shrink-0">
        <BirthdayCake candlesLit={candlesLit} />
      </div>

      {!blown && (
        <div className="mt-8 flex flex-col items-center gap-4 fade-in flex-shrink-0">
          {!listening && !micError && (
            <button onClick={startMic} className="btn-primary">
              🎤 Blow to extinguish
            </button>
          )}
          {listening && (
            <p className="text-sm font-semibold animate-pulse tracking-[0.15em]" style={{ color: '#C084FC' }}>Listening… blow into your mic 💨</p>
          )}
          {micError && <p className="text-xs font-medium" style={{ color: '#FF6B9D' }}>Mic access denied.</p>}
          <button onClick={blowOut} className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors focus:outline-none">
            {micError ? 'Tap to simulate' : 'or tap to simulate'}
          </button>
        </div>
      )}

      {blown && (
        <div className="w-full max-w-lg mt-8 flex flex-col items-center gap-6 fade-in flex-shrink-0">
          <div className="text-center flex-shrink-0">
            <p className="text-3xl mb-2">🎊</p>
            <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#FFD700' }}>Wishes unlocked — tap each one!</p>
          </div>
          
          {/* Flexbox row instead of absolute positioning to prevent overlap */}
          <div className="flex justify-around items-center w-full gap-4 px-4 py-2 flex-shrink-0">
            {wishesData.map((w, i) => (
              <WishStar key={w.id} wish={w} index={i} />
            ))}
          </div>
        </div>
      )}

      {blown && (
        <button onClick={onNext} className="btn-primary mt-12 fade-in flex-shrink-0" style={{ animationDelay: '0.8s' }}>
          Continue the journey →
        </button>
      )}
    </div>
  );
}

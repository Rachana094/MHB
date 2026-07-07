import { useState, useRef, useEffect, useCallback } from 'react';
import { triviaData } from '../data';

// ── Scratch-card canvas overlay ───────────────────────────────────────────────
function ScratchCard({ gift, onFullyScratched }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const scratchedPixels = useRef(0);
  const totalPixels = useRef(0);
  const revealed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = (entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        
        canvas.width = width;
        canvas.height = height;
        totalPixels.current = width * height;

        // Draw holographic silver layer
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#e5e7eb');
        grad.addColorStop(0.3, '#fbcfe8'); // hint of pink
        grad.addColorStop(0.7, '#bae6fd'); // hint of blue
        grad.addColorStop(1, '#9ca3af');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Hint text
        ctx.fillStyle = 'rgba(75,85,99,0.85)';
        ctx.font = `bold ${Math.max(14, Math.round(width * 0.05))}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.letterSpacing = '3px';
        ctx.fillText('✨ SCRATCH TO REVEAL ✨', width / 2, height / 2);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas.parentElement || canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scratch = useCallback((x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    scratchedPixels.current += 1750; // estimate of scratched area per move
    if (!revealed.current && scratchedPixels.current / totalPixels.current > 0.45) {
      revealed.current = true;
      onFullyScratched();
    }
  }, [onFullyScratched]);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onStart = (e) => { isDrawing.current = true; const p = getPos(e, canvasRef.current); scratch(p.x, p.y); };
  const onMove = (e) => { if (!isDrawing.current) return; e.preventDefault(); const p = getPos(e, canvasRef.current); scratch(p.x, p.y); };
  const onEnd = () => { isDrawing.current = false; };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000"
      style={{ opacity: revealed.current ? 0 : 1, pointerEvents: revealed.current ? 'none' : 'auto' }}
      onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
      onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
    />
  );
}

// ── Gift box ──────────────────────────────────────────────────────────────────
function GiftBox({ gift, locked, onRevealCompleted }) {
  const [fullyScratched, setFullyScratched] = useState(false);

  const handleScratched = () => {
    setFullyScratched(true);
    if (onRevealCompleted) onRevealCompleted();
  };

  return (
    <div
      className="relative rounded-3xl overflow-hidden mt-8 shadow-inner w-full flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #2D0B40, #1A0A2E)', border: '1px solid rgba(192,132,252,0.3)' }}
    >
      <div className="w-full flex flex-col items-center justify-center p-8 md:p-12 gap-5 text-center">
        <div className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>{gift.giftEmoji}</div>
        <p className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: '#C084FC' }}>{gift.giftTitle}</p>
        <p 
          className="text-white/95 text-base md:text-lg leading-relaxed font-light px-6" 
          style={{ fontFamily: "'Playfair Display', serif", whiteSpace: 'normal', wordBreak: 'break-word' }}
        >
          {gift.giftText}
        </p>
      </div>

      {locked && !fullyScratched && (
        <ScratchCard gift={gift} onFullyScratched={handleScratched} />
      )}
    </div>
  );
}

// ── Single trivia card ────────────────────────────────────────────────────────
function TriviaCard({ item, index, onAnsweredCorrectly, isCompleted, onNextQuestion, onNextStage }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const choose = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  const correct = answered && selected === item.correctIndex;

  return (
    <div className="glass p-6 md:p-10 relative overflow-hidden transition-all duration-500 w-full flex-shrink-0"
         style={{ border: `1px solid ${correct ? 'rgba(45,212,191,0.5)' : answered ? 'rgba(255,107,157,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
      
      {/* Decorative background glow for correct answer */}
      {correct && <div className="absolute inset-0 bg-teal-400/5 pointer-events-none" />}

      {/* Question */}
      <div className="flex items-start gap-4 mb-8 relative z-10 flex-shrink-0">
        <span className="text-xs font-bold tracking-widest px-3 py-1.5 rounded-full"
              style={{ background: 'linear-gradient(135deg, #C084FC, #FF6B9D)', color: '#fff', whiteSpace: 'nowrap' }}>
          Q{index + 1}
        </span>
        <p className="text-white text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.question}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full flex-shrink-0">
        {item.options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.03)';
          let border = 'rgba(255,255,255,0.08)';
          let textColor = 'rgba(255,255,255,0.7)';

          if (answered) {
            if (i === item.correctIndex) { bg = 'rgba(45,212,191,0.15)'; border = 'rgba(45,212,191,0.5)'; textColor = '#2DD4BF'; }
            else if (i === selected && selected !== item.correctIndex) { bg = 'rgba(255,107,157,0.1)'; border = 'rgba(255,107,157,0.4)'; textColor = '#FF6B9D'; }
          }

          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className="text-left px-5 py-4 rounded-xl text-sm transition-all duration-300 font-medium flex items-start gap-2.5 w-full flex-shrink-0"
              style={{
                background: bg, border: `1px solid ${border}`, color: textColor,
                cursor: answered ? 'default' : 'pointer',
                transform: !answered ? 'hover:scale-[1.01]' : 'none',
                whiteSpace: 'normal',
                wordBreak: 'break-word'
              }}
            >
              <span className="opacity-50 mr-1.5 font-mono text-xs mt-0.5">{String.fromCharCode(65 + i)}</span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <p className={`mt-6 text-sm font-semibold tracking-wide fade-in flex-shrink-0 ${correct ? 'text-teal-400' : 'text-rose-400'}`}>
          {correct ? '✨ Spot on! Claim your prize below.' : '🤍 Not quite, but you still earn the prize.'}
        </p>
      )}

      {answered && (
        <GiftBox gift={item} locked={true} onRevealCompleted={onAnsweredCorrectly} />
      )}

      {/* Integrated Action Button */}
      {isCompleted && (
        <div className="mt-8 flex justify-center w-full relative z-10 flex-shrink-0 fade-in">
          {index < 2 ? (
            <button onClick={onNextQuestion} className="btn-primary w-full py-4 text-center">
              Next Question →
            </button>
          ) : (
            <button onClick={onNextStage} className="btn-primary w-full py-4 text-center">
              Proceed to Lantern Release →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Stage ────────────────────────────────────────────────────────────────
export default function Stage5Trivia({ onNext }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedStages, setCompletedStages] = useState({ 0: false, 1: false, 2: false });

  const handleReveal = () => {
    setCompletedStages(prev => ({ ...prev, [currentIdx]: true }));
  };

  const nextQuestion = () => {
    if (currentIdx < triviaData.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-start md:justify-center min-h-screen px-6 py-16 md:py-24">
      <div className="text-center mb-8 flex-shrink-0">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3" style={{ color: '#2DD4BF' }}>Chapter Five</p>
        <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
          The Trivia Hunt
        </h2>
        <p className="text-white/50 text-sm mt-2 tracking-wide font-light">Test your memory to unlock your gifts</p>
      </div>

      {/* Question Slider */}
      <div className="w-full max-w-2xl flex flex-col items-center flex-shrink-0">
        {triviaData.map((item, idx) => (
          idx === currentIdx && (
            <div key={item.id} className="w-full fade-in flex-shrink-0">
              <TriviaCard 
                item={item} 
                index={idx} 
                onAnsweredCorrectly={handleReveal} 
                isCompleted={completedStages[idx]}
                onNextQuestion={nextQuestion}
                onNextStage={onNext}
              />
            </div>
          )
        ))}

        {/* Minimal Progress Indicator */}
        <div className="mt-6 flex-shrink-0">
          <span className="text-white/40 text-xs tracking-widest font-mono select-none">
            QUESTION {currentIdx + 1} OF 3
          </span>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { gatekeeperLines, UNLOCK_PASSWORD } from '../data';

export default function Stage1Gatekeeper({ onUnlock }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentLine >= gatekeeperLines.length) { setTimeout(() => setTypingDone(true), 500); return; }
    const line = gatekeeperLines[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setDisplayedLines((p) => { const n = [...p]; n[currentLine] = (n[currentLine] || '') + line[currentChar]; return n; });
        setCurrentChar((c) => c + 1);
      }, 55);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setCurrentLine((l) => l + 1); setCurrentChar(0); }, 650);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  useEffect(() => { if (typingDone && inputRef.current) inputRef.current.focus(); }, [typingDone]);

  const submit = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === UNLOCK_PASSWORD.toLowerCase()) {
      setUnlocking(true);
      setTimeout(onUnlock, 1200);
    } else {
      setError('Hmm, not quite — try again 💫');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
    }
  };

  return (
    <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen px-6 transition-opacity duration-1000 ${unlocking ? 'opacity-0' : 'opacity-100'}`}>

      {/* Decorative gradient orbs */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Emoji badge */}
      <div
        className="mb-8 text-6xl bob select-none"
        style={{ filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))' }}
      >🎂</div>

      {/* Typed lines */}
      <div className="text-center space-y-5 mb-12 max-w-lg">
        {gatekeeperLines.map((line, i) => (
          <p
            key={i}
            className="font-display text-2xl md:text-3xl font-normal leading-snug"
            style={{ color: i === 0 ? '#FF6B9D' : i === 1 ? '#C084FC' : '#38BDF8', textShadow: '0 0 30px currentColor' }}
          >
            {displayedLines[i] || ''}
            {i === currentLine && !typingDone && (
              <span className="cursor-blink ml-1 text-white">|</span>
            )}
          </p>
        ))}
      </div>

      {/* Password gate */}
      <div className={`transition-all duration-700 w-full max-w-sm ${typingDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <p className="text-center text-xs tracking-[0.3em] uppercase font-semibold mb-6" style={{ color: '#C084FC' }}>
          ✦ Enter the secret key to begin ✦
        </p>

        <form onSubmit={submit} className="flex flex-col items-center gap-4">
          <div
            className={`w-full rounded-2xl overflow-hidden transition-transform ${shake ? 'animate-[shake_0.5s_ease]' : ''}`}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(255,107,157,0.7)' : 'rgba(192,132,252,0.3)'}`,
              backdropFilter: 'blur(12px)',
            }}
          >
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="type your key…"
              className="w-full bg-transparent py-4 px-6 text-center text-lg tracking-widest text-white placeholder-white/20 font-light"
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="fade-in text-sm font-medium" style={{ color: '#FF6B9D' }}>{error}</p>
          )}

          <button type="submit" className="btn-primary w-full">
            Open ✦
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-10px)}
          40%{transform:translateX(10px)}
          60%{transform:translateX(-7px)}
          80%{transform:translateX(7px)}
        }
      `}</style>
    </div>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { photoBoothData } from '../data';

const eraGradients = [
  { from: '#3D0B5E', to: '#7B2FBE', accent: '#C084FC', label: '#E9D5FF' },
  { from: '#8B1A4A', to: '#E8336B', accent: '#FF6B9D', label: '#FECDD3' },
  { from: '#0B3D52', to: '#1A6B8A', accent: '#38BDF8', label: '#BAE6FD' },
];

function FilmFrame({ item, index, active }) {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);
  const g = eraGradients[index];

  if (!active) return null;

  return (
    <div className="flex flex-col items-center gap-4 fade-in">
      {/* Perforations top */}
      <div className="flex gap-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm bg-white/10 border border-white/5" />
        ))}
      </div>

      {/* Flip card */}
      <div className="perspective cursor-pointer" style={{ width: 280, height: 380 }} onClick={() => setFlipped((f) => !f)} title="Click to flip">
        <div className={`flip-card w-full h-full ${flipped ? 'flipped' : ''}`}>

          {/* Front */}
          <div
            className="flip-face absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: `linear-gradient(145deg, ${g.from}, ${g.to})`, border: `2px solid ${g.accent}44` }}
          >
            {item.photoUrl && !imgError ? (
              <img 
                src={item.photoUrl} 
                alt={item.photoAlt} 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 text-center" style={{ background: `linear-gradient(145deg, ${g.from}, ${g.to})` }}>
                <div className="text-6xl opacity-40">📸</div>
                <p className="text-sm text-white/90 font-light leading-relaxed font-display">
                  {item.photoAlt || "Memorable Moment"}
                </p>
                <span className="text-xs text-white/40 italic mt-2">(tap to read memory)</span>
              </div>
            )}
            {/* Gradient overlay + labels */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 inset-x-0 p-5">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: g.accent }}>{item.era}</p>
              <p className="text-white/50 text-xs mt-1">{item.year}</p>
            </div>
            <div
              className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: `${g.accent}33`, color: '#fff', border: `1px solid ${g.accent}55` }}
            >flip →</div>
          </div>

          {/* Back */}
          <div
            className="flip-face flip-back absolute inset-0 rounded-2xl p-8 flex flex-col justify-center shadow-2xl"
            style={{ background: `linear-gradient(145deg, #1A1030, #231840)`, border: `2px solid ${g.accent}44` }}
          >
            <div className="w-10 h-1 rounded-full mb-5" style={{ background: g.accent }} />
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-1" style={{ color: g.accent }}>{item.era}</p>
            <p className="text-white/40 text-xs mb-4">{item.year}</p>
            <p className="text-base leading-relaxed text-white/90 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              {item.story}
            </p>
            <p className="mt-5 text-xs italic" style={{ color: g.label, opacity: 0.7 }}>"{item.caption}"</p>
          </div>
        </div>
      </div>

      {/* Perforations bottom */}
      <div className="flex gap-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm bg-white/10 border border-white/5" />
        ))}
      </div>

      <p className="text-white/30 text-xs tracking-[0.2em] font-mono mt-1">FRAME 0{index + 1} OF 0{photoBoothData.length}</p>
    </div>
  );
}

export default function Stage3PhotoBooth({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photoBoothData.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex === photoBoothData.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-start md:justify-center min-h-screen px-4 py-8 md:py-16">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 flex-shrink-0" style={{ color: '#C084FC' }}>Chapter Three</p>
      <h2 className="font-display text-3xl md:text-5xl text-white text-center mb-2 leading-tight flex-shrink-0">
        The Photo Booth
      </h2>
      <p className="text-white/40 text-xs md:text-sm mb-8 tracking-wide text-center flex-shrink-0">Flip the frame to read the memory</p>

      {/* Film strip wrapper */}
      <div className="relative w-full max-w-md flex flex-col items-center flex-shrink-0">
        <div
          className="w-full relative p-4 md:p-6 rounded-3xl overflow-hidden flex justify-center items-center flex-shrink-0"
          style={{
            background: 'rgba(15, 10, 30, 0.97)',
            border: '1px solid rgba(192,132,252,0.2)',
            boxShadow: '0 0 80px rgba(192,132,252,0.08)',
          }}
        >
          {/* Scanlines texture */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 6px)' }} />

          <div className="relative z-10 w-full flex justify-center flex-shrink-0">
            {photoBoothData.map((item, i) => (
              <FilmFrame key={item.id} item={item} index={i} active={i === currentIndex} />
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex gap-6 mt-6 flex-shrink-0">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-white transition-all duration-300 active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="w-4 h-4 text-white/70" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-white transition-all duration-300 active:scale-95 focus:outline-none"
          >
            <ChevronRight className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      <button onClick={onNext} className="btn-primary mt-10 flex-shrink-0">
        Explore our constellation →
      </button>
    </div>
  );
}

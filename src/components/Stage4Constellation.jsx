import { useState } from 'react';
import { constellationData, constellationEdges } from '../data';

function ConstellationSVG({ onNodeClick, activeId }) {
  const W = 600;
  const H = 340;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxWidth: 700, maxHeight: 380 }}>
      {/* Edges */}
      {constellationEdges.map(([a, b], i) => {
        const na = constellationData.find((n) => n.id === a);
        const nb = constellationData.find((n) => n.id === b);
        return (
          <line
            key={i}
            x1={na.x * W / 100} y1={na.y * H / 100}
            x2={nb.x * W / 100} y2={nb.y * H / 100}
            stroke="rgba(192,132,252,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
        );
      })}

      {/* Nodes */}
      {constellationData.map((node) => {
        const cx = node.x * W / 100;
        const cy = node.y * H / 100;
        const active = activeId === node.id;
        const fillCol = active ? '#FF6B9D' : '#38BDF8';
        const strokeCol = active ? '#FF6B9D' : 'rgba(56,189,248,0.5)';

        return (
          <g key={node.id} onClick={() => onNodeClick(node)} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }} className="group">
            {/* Glow ring */}
            <circle
              cx={cx} cy={cy} r={active ? 22 : 14}
              fill="none"
              stroke={strokeCol}
              strokeWidth={active ? 2 : 1}
              opacity={active ? 0.9 : 0.6}
              className="transition-all duration-300 group-hover:r-18"
              style={{ filter: `drop-shadow(0 0 ${active ? 8 : 4}px ${strokeCol})` }}
            />
            {/* Core */}
            <circle cx={cx} cy={cy} r={active ? 8 : 5} fill={fillCol} className="transition-all duration-300" />
            {/* Label */}
            <text
              x={cx} y={cy + 32}
              textAnchor="middle"
              fill={active ? '#FF6B9D' : 'rgba(255,255,255,0.7)'}
              fontSize={active ? 12 : 10}
              fontFamily="'Inter', sans-serif"
              fontWeight="600"
              letterSpacing="2"
              className="transition-all duration-300"
            >
              {node.name.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function NodeOverlay({ node, onClose }) {
  if (!node) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 fade-in" style={{ background: 'rgba(15,10,30,0.85)', backdropFilter: 'blur(12px)' }} onClick={onClose}>
      <div 
        className="max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl glass p-8 md:p-10 text-center relative" 
        style={{ border: '1px solid rgba(192,132,252,0.4)', boxShadow: '0 0 80px rgba(192,132,252,0.15)' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-4xl text-purple-400 select-none block mb-6 animate-pulse">✦</span>
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: '#38BDF8' }}>✦ Memory Unlocked</p>
        <h3 className="font-display text-2xl md:text-3xl mb-6 text-white leading-tight">{node.name}</h3>
        <p className="text-base md:text-lg leading-relaxed text-white/90 font-light mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          {node.story}
        </p>
        <button onClick={onClose} className="mt-2 text-xs font-semibold tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity" style={{ color: '#FF6B9D' }}>
          Close Memory ✕
        </button>
      </div>
    </div>
  );
}

export default function Stage4Constellation({ onNext }) {
  const [active, setActive] = useState(null);

  return (
    <div className="relative z-10 flex flex-col items-center justify-start md:justify-center min-h-screen px-4 py-8 md:py-16">
      <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 flex-shrink-0" style={{ color: '#38BDF8' }}>Chapter Four</p>
      <h2 className="font-display text-3xl md:text-5xl text-white text-center mb-2 leading-tight flex-shrink-0">
        Our Constellation
      </h2>
      <p className="text-white/50 text-xs md:text-sm mb-8 tracking-wide font-light flex-shrink-0">Connect the stars to revisit the past</p>

      {/* Map */}
      <div
        className="w-full max-w-4xl rounded-3xl p-4 md:p-8 relative overflow-hidden glass flex-shrink-0"
        style={{ boxShadow: '0 0 60px rgba(56,189,248,0.1)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(192,132,252,0.1) 0%, transparent 70%)' }} />
        <ConstellationSVG onNodeClick={setActive} activeId={active?.id} />
      </div>

      <NodeOverlay node={active} onClose={() => setActive(null)} />

      <button onClick={onNext} className="btn-primary mt-10 flex-shrink-0">
        Play the trivia hunt →
      </button>
    </div>
  );
}

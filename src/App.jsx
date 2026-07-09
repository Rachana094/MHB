import { useState } from 'react';
import StarField from './components/StarField';
import Stage1Gatekeeper from './components/Stage1Gatekeeper';
import Stage2Cake from './components/Stage2Cake';
import Stage3PhotoBooth from './components/Stage3PhotoBooth';
import Stage4Constellation from './components/Stage4Constellation';
import Stage6Lantern from './components/Stage6Lantern';
import Stage7Letter from './components/Stage7Letter';

const STAGE_LABELS = ['✦', 'Wishes', 'Memories', 'Constellation', 'Lantern', 'Letter'];

const stageBgs = [
  'radial-gradient(ellipse at 20% 80%, #2D0B55 0%, #0F0A1E 60%, #1A0A2E 100%)',
  'radial-gradient(ellipse at 70% 20%, #3D0B2E 0%, #0F0A1E 50%, #1A1030 100%)',
  'radial-gradient(ellipse at 30% 60%, #0B2040 0%, #0F0A1E 50%, #1A1030 100%)',
  'radial-gradient(ellipse at 80% 50%, #0B2D35 0%, #0F0A1E 55%, #1A1030 100%)',
  'radial-gradient(ellipse at 40% 20%, #2D1B05 0%, #0F0A1E 55%, #1A1030 100%)',
  'radial-gradient(ellipse at 50% 50%, #1E0B30 0%, #0F0A1E 60%, #0F0A1E 100%)',
];

function ProgressBar({ stage }) {
  if (stage < 2) return null;
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pt-4 pointer-events-none">
      {/* Stage label */}
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-2"
         style={{ color: '#FF6B9D' }}>
        {STAGE_LABELS[stage - 1]}
      </p>
      {/* Bar */}
      <div className="relative rounded-full overflow-hidden" style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${((stage - 1) / (STAGE_LABELS.length - 1)) * 100}%`, background: 'linear-gradient(to right, #FF6B9D, #C084FC, #38BDF8)' }}
        />
      </div>
      {/* Dots */}
      <div className="flex gap-2 mt-2">
        {STAGE_LABELS.map((_, i) => (
          <div key={i} style={{
            width: i === stage - 1 ? 10 : 6,
            height: i === stage - 1 ? 10 : 6,
            borderRadius: '50%',
            background: stage - 1 >= i ? (i === stage - 1 ? '#FF6B9D' : '#C084FC') : 'rgba(255,255,255,0.1)',
            transition: 'all 0.4s ease',
            boxShadow: i === stage - 1 ? '0 0 8px #FF6B9D' : 'none',
          }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState(1);
  const next = () => setStage((s) => Math.min(s + 1, 6));

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: stageBgs[stage - 1], transition: 'background 1.4s ease' }}>
      <StarField />
      <ProgressBar stage={stage} />
      <div key={stage} className="fade-in min-h-screen">
        {stage === 1 && <Stage1Gatekeeper onUnlock={next} />}
        {stage === 2 && <Stage2Cake onNext={next} />}
        {stage === 3 && <Stage3PhotoBooth onNext={next} />}
        {stage === 4 && <Stage4Constellation onNext={next} />}
        {stage === 5 && <Stage6Lantern onNext={next} />}
        {stage === 6 && <Stage7Letter />}
      </div>
    </div>
  );
}

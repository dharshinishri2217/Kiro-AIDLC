import { useEffect, useState } from 'react';

// Each task has a weight — emotional tasks weigh more
const TASK_WEIGHTS = {
  'emotional-support': 9, 'conflict-resolution': 8, 'mental-health-check': 9,
  'celebration': 6, 'cooking': 7, 'childcare': 10, 'cleaning': 6,
  'elder-care': 9, 'grocery': 5, 'appointments': 7, 'mental-load': 10,
  'social-glue': 7, 'finances': 7, 'work-balance': 9, 'mentoring': 6, 'volunteering': 5,
};

const MAX_SCORE = 100;

function getScore(selectedTasks) {
  const raw = selectedTasks.reduce((sum, id) => sum + (TASK_WEIGHTS[id] || 5), 0);
  return Math.min(Math.round((raw / (16 * 10)) * 100), 100);
}

function getLabel(score) {
  if (score === 0) return { text: 'Select tasks to see the weight she carries', color: '#9ca3af' };
  if (score < 25) return { text: 'Light load — but still invisible', color: '#34d399' };
  if (score < 50) return { text: 'Significant invisible work', color: '#fbbf24' };
  if (score < 75) return { text: 'Heavy emotional & physical burden', color: '#f97316' };
  return { text: 'Overwhelming — this is unsustainable', color: '#ef4444' };
}

export default function ImpactMeter({ selectedTasks }) {
  const [displayScore, setDisplayScore] = useState(0);
  const target = getScore(selectedTasks);
  const { text, color } = getLabel(target);

  useEffect(() => {
    let frame;
    const animate = () => {
      setDisplayScore(prev => {
        if (prev === target) return prev;
        const next = prev + (prev < target ? 1 : -1);
        frame = requestAnimationFrame(animate);
        return next;
      });
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (displayScore / MAX_SCORE) * circumference;

  return (
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-purple-100 flex items-center gap-6">
      {/* Circular gauge */}
      <div className="relative flex-shrink-0">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#f3e8ff" strokeWidth="10" />
          <circle cx="50" cy="50" r="40" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{displayScore}</span>
          <span className="text-xs text-gray-400">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <div>
        <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">Invisible Load Score</p>
        <p className="text-sm font-medium text-gray-700 leading-snug">{text}</p>
        {selectedTasks.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">{selectedTasks.length} responsibilities selected</p>
        )}
      </div>
    </div>
  );
}

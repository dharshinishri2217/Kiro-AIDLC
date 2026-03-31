import { useEffect, useState } from 'react';

const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  emoji: ['💜', '✨', '🌸', '⭐', '💫', '🌺', '🎉', '💐', '🌟', '🦋'][i % 10],
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: `${2 + Math.random() * 3}s`,
  size: `${1 + Math.random() * 1.5}rem`,
}));

const MESSAGES = [
  "You are extraordinary.",
  "Your work holds the world together.",
  "Every task you do is an act of love.",
  "You are seen. You are valued. You matter.",
  "The invisible work you do is the most powerful work there is.",
];

export default function WeeklyCelebration({ user, weeklyHours, onClose }) {
  const [phase, setPhase] = useState(0); // 0=intro, 1=stats, 2=message, 3=done
  const [msgIndex, setMsgIndex] = useState(0);
  const [displayedMsg, setDisplayedMsg] = useState('');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Typewriter for messages
  useEffect(() => {
    if (phase !== 2) return;
    const msg = MESSAGES[msgIndex];
    setDisplayedMsg('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedMsg(msg.slice(0, i));
      if (i >= msg.length) {
        clearInterval(interval);
        if (msgIndex < MESSAGES.length - 1) {
          setTimeout(() => setMsgIndex(m => m + 1), 1800);
        } else {
          setTimeout(() => setPhase(3), 2000);
        }
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase, msgIndex]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 40%, #4a1942 100%)' }}>

      {/* Falling particles */}
      {PARTICLES.map(p => (
        <span key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.left,
            top: '-2rem',
            fontSize: p.size,
            animation: `fall ${p.duration} ${p.delay} linear infinite`,
          }}>
          {p.emoji}
        </span>
      ))}

      {/* Glowing orbs */}
      <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: '#a855f7', top: '10%', left: '10%', animation: 'pulse 3s ease-in-out infinite' }} />
      <div className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl"
        style={{ background: '#ec4899', bottom: '10%', right: '10%', animation: 'pulse 4s ease-in-out infinite reverse' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-lg">

        {/* Phase 0: Crown entrance */}
        <div className={`transition-all duration-1000 ${phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="text-8xl mb-4" style={{ animation: 'bounce 1s ease-in-out infinite' }}>👑</div>
        </div>

        {/* Phase 1: Name + hours */}
        <div className={`transition-all duration-1000 ${phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-3xl font-bold text-white mb-2">
            {user.name}, you are a <span style={{ color: '#f9a8d4' }}>superhero</span>.
          </h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: '#c084fc' }}>{weeklyHours}h</div>
              <div className="text-white/60 text-sm">this week</div>
            </div>
            <div className="text-white/30 text-3xl">·</div>
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: '#f9a8d4' }}>💜</div>
              <div className="text-white/60 text-sm">of invisible work</div>
            </div>
          </div>
        </div>

        {/* Phase 2: Typewriter messages */}
        {phase >= 2 && (
          <div className="mt-6 min-h-16">
            <p className="text-xl font-medium text-white/90 leading-relaxed italic">
              "{displayedMsg}<span className="animate-pulse">|</span>"
            </p>
            <div className="flex justify-center gap-1 mt-4">
              {MESSAGES.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: i <= msgIndex ? '#c084fc' : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: Close button */}
        {phase >= 3 && (
          <div className="mt-8 transition-all duration-700 opacity-100">
            <p className="text-white/70 text-sm mb-4">
              Your dedication this week has been recorded. Rest, you've earned it. 🌙
            </p>
            <button onClick={onClose}
              className="px-8 py-3.5 rounded-2xl font-bold text-purple-900 text-base cursor-pointer transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f9a8d4, #c084fc)' }}>
              Thank you 💜
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-2rem) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

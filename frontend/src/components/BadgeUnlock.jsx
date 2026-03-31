import { useEffect, useState } from 'react';

const BADGES = [
  { id: 'first', emoji: '🌱', label: 'First Step', desc: 'Completed your first simulation', condition: (u) => u.totalSims >= 1 },
  { id: 'emotional', emoji: '💜', label: 'Empathy Explorer', desc: 'Explored emotional support tasks', condition: (_, tasks) => tasks.includes('emotional-support') || tasks.includes('mental-health-check') },
  { id: 'household', emoji: '🏡', label: 'Home Witness', desc: 'Explored household responsibilities', condition: (_, tasks) => tasks.includes('cooking') || tasks.includes('cleaning') || tasks.includes('childcare') },
  { id: 'planner', emoji: '🧠', label: 'Mental Load Aware', desc: 'Explored the mental load', condition: (_, tasks) => tasks.includes('mental-load') },
  { id: 'streak3', emoji: '⚡', label: 'Consistent', desc: '3-day streak achieved', condition: (u) => u.streak >= 3 },
  { id: 'streak7', emoji: '🔥', label: 'Dedicated', desc: '7-day streak achieved', condition: (u) => u.streak >= 7 },
  { id: 'explorer', emoji: '🗺️', label: 'Full Explorer', desc: 'Selected 5+ tasks in one simulation', condition: (_, tasks) => tasks.length >= 5 },
  { id: 'professional', emoji: '💼', label: 'Work-Life Witness', desc: 'Explored professional contributions', condition: (_, tasks) => tasks.includes('work-balance') || tasks.includes('mentoring') },
];

export default function BadgeUnlock({ user, selectedTasks, onClose }) {
  const [visible, setVisible] = useState(false);
  const earned = BADGES.filter(b => b.condition(user, selectedTasks));

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`w-full max-w-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-purple-900 text-base">🏅 Badges Unlocked</h3>
            <p className="text-xs text-purple-400">Earned through your exploration</p>
          </div>
          <span className="text-2xl font-bold text-purple-700">{earned.length}/{BADGES.length}</span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((badge, i) => {
            const isEarned = earned.find(b => b.id === badge.id);
            return (
              <div key={badge.id}
                className={`flex flex-col items-center p-2 rounded-xl text-center transition-all duration-500 ${isEarned ? 'bg-white shadow-md' : 'opacity-30 grayscale'}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-2xl mb-1">{badge.emoji}</span>
                <span className="text-xs font-semibold text-gray-700 leading-tight">{badge.label}</span>
                {isEarned && <span className="text-xs text-purple-400 mt-0.5 leading-tight">{badge.desc}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

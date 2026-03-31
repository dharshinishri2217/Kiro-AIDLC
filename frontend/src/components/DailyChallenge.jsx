const CHALLENGES = [
  { role: 'mother', task: 'childcare', prompt: 'Today, explore what a mother carries for her children every single day.' },
  { role: 'partner', task: 'emotional-support', prompt: 'Today, explore the emotional labor of being someone\'s anchor.' },
  { role: 'caregiver', task: 'elder-care', prompt: 'Today, explore the invisible work of caring for aging family members.' },
  { role: 'planner', task: 'mental-load', prompt: 'Today, explore the mental load — the invisible task of remembering everything.' },
  { role: 'homemaker', task: 'cooking', prompt: 'Today, explore what it means to feed a family, every day, without recognition.' },
  { role: 'friend', task: 'mental-health-check', prompt: 'Today, explore the labor of being the one who always checks in on others.' },
  { role: 'employee', task: 'work-balance', prompt: 'Today, explore what it costs to hold a career and a home simultaneously.' },
  { role: 'mentor', task: 'mentoring', prompt: 'Today, explore the invisible work of guiding others while carrying your own load.' },
];

function getTodayChallenge() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return CHALLENGES[dayOfYear % CHALLENGES.length];
}

export default function DailyChallenge({ onAccept }) {
  const challenge = getTodayChallenge();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const accepted = localStorage.getItem('iss_challenge') === new Date().toDateString();

  const handleAccept = () => {
    localStorage.setItem('iss_challenge', new Date().toDateString());
    onAccept(challenge.role, challenge.task);
  };

  return (
    <div className="w-full max-w-2xl fade-in-up">
      <div className="rounded-2xl overflow-hidden border-2 border-amber-200">
        <div className="px-5 py-3 flex items-center gap-2"
          style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
          <span className="text-lg">🎯</span>
          <div>
            <p className="font-bold text-amber-900 text-sm">Daily Challenge</p>
            <p className="text-xs text-amber-600">{today}</p>
          </div>
          {accepted && <span className="ml-auto text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">✓ Done today</span>}
        </div>
        <div className="bg-white px-5 py-4">
          <p className="text-gray-700 text-sm leading-relaxed mb-4">{challenge.prompt}</p>
          {!accepted ? (
            <button onClick={handleAccept}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white cursor-pointer transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
              Accept Today's Challenge ✨
            </button>
          ) : (
            <p className="text-center text-sm text-green-600 font-medium">
              You completed today's challenge. Come back tomorrow! 🌟
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { motivationalMessages } from '../data';

export default function StreakBar({ user, onLogout }) {
  const msg = motivationalMessages[user.totalSims % motivationalMessages.length];
  const streakEmoji = user.streak >= 7 ? '🔥' : user.streak >= 3 ? '⚡' : '✨';

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center justify-between shadow-sm border border-purple-100">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-700">{streakEmoji} {user.streak}</div>
            <div className="text-xs text-purple-400 leading-none">day streak</div>
          </div>
          <div className="w-px h-8 bg-purple-200" />
          <div className="text-center">
            <div className="text-xl font-bold text-purple-700">💜 {user.totalSims}</div>
            <div className="text-xs text-purple-400 leading-none">simulations</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-purple-200" />
          <p className="hidden sm:block text-xs text-purple-600 italic max-w-xs">{msg}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700 font-medium hidden sm:block">Hi, {user.name} 👋</span>
          <button onClick={onLogout}
            className="text-xs text-purple-400 hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded-lg hover:bg-purple-50">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import WeeklyCelebration from './WeeklyCelebration';

const TRACKABLE_TASKS = [
  { id: 'cooking',    label: 'Cooked a meal',           emoji: '🍳', hours: 1.5, category: 'household' },
  { id: 'childcare',  label: 'Cared for children',      emoji: '👶', hours: 3,   category: 'household' },
  { id: 'cleaning',   label: 'Cleaned the home',        emoji: '🧹', hours: 1,   category: 'household' },
  { id: 'grocery',    label: 'Did grocery / errands',   emoji: '🛒', hours: 1,   category: 'household' },
  { id: 'elder-care', label: 'Cared for elderly',       emoji: '👴', hours: 2,   category: 'household' },
  { id: 'emotional-support', label: 'Supported someone emotionally', emoji: '💬', hours: 1, category: 'emotional' },
  { id: 'mental-health-check', label: 'Checked in on someone', emoji: '🫶', hours: 0.5, category: 'emotional' },
  { id: 'conflict-resolution', label: 'Resolved a conflict', emoji: '🕊️', hours: 1, category: 'emotional' },
  { id: 'appointments', label: 'Managed appointments', emoji: '📅', hours: 0.5, category: 'planning' },
  { id: 'mental-load', label: 'Carried the mental load', emoji: '🧠', hours: 2, category: 'planning' },
  { id: 'finances',   label: 'Managed finances/bills',  emoji: '💰', hours: 1,   category: 'planning' },
  { id: 'work-balance', label: 'Balanced work & home',  emoji: '⚖️', hours: 2,  category: 'professional' },
  { id: 'volunteering', label: 'Volunteered / helped community', emoji: '🏘️', hours: 1.5, category: 'professional' },
  { id: 'social-glue', label: 'Organized family/social event', emoji: '🤝', hours: 1, category: 'planning' },
];

const CATEGORY_COLORS = {
  household: '#f59e0b',
  emotional: '#ec4899',
  planning: '#6366f1',
  professional: '#10b981',
};

const WEEK_THRESHOLD = 35; // hours — triggers celebration

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getTodayKey() {
  return new Date().toDateString();
}

function loadLogs() {
  return JSON.parse(localStorage.getItem('iss_daylogs') || '{}');
}

function saveLogs(logs) {
  localStorage.setItem('iss_daylogs', JSON.stringify(logs));
}

export default function DayTracker({ user, onClose }) {
  const [logs, setLogs] = useState(loadLogs);
  const [todaySelected, setTodaySelected] = useState([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [view, setView] = useState('today'); // 'today' | 'week'

  const todayKey = getTodayKey();
  const weekKey = getWeekKey();
  const todayLog = logs[todayKey] || { tasks: [], note: '', hours: 0 };

  useEffect(() => {
    setTodaySelected(todayLog.tasks || []);
    setNote(todayLog.note || '');
  }, []);

  const toggleTask = (id) => {
    setTodaySelected(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    const hours = todaySelected.reduce((sum, id) => {
      const t = TRACKABLE_TASKS.find(t => t.id === id);
      return sum + (t?.hours || 0);
    }, 0);

    const updated = {
      ...logs,
      [todayKey]: { tasks: todaySelected, note, hours, savedAt: new Date().toISOString() }
    };
    saveLogs(updated);
    setLogs(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    // Check weekly total
    const weekTotal = getWeeklyHours(updated);
    const alreadyCelebrated = localStorage.getItem('iss_celebrated') === weekKey;
    if (weekTotal >= WEEK_THRESHOLD && !alreadyCelebrated) {
      localStorage.setItem('iss_celebrated', weekKey);
      setTimeout(() => setShowCelebration(true), 800);
    }
  };

  const getWeeklyHours = (logsData = logs) => {
    const now = new Date();
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toDateString();
      total += logsData[key]?.hours || 0;
    }
    return Math.round(total * 10) / 10;
  };

  const weeklyHours = getWeeklyHours();
  const weekProgress = Math.min((weeklyHours / WEEK_THRESHOLD) * 100, 100);

  // Build week summary
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toDateString();
    return {
      label: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      hours: logs[key]?.hours || 0,
      tasks: logs[key]?.tasks?.length || 0,
      isToday: key === todayKey,
    };
  });

  const maxDayHours = Math.max(...weekDays.map(d => d.hours), 1);

  return (
    <>
      {showCelebration && (
        <WeeklyCelebration
          user={user}
          weeklyHours={weeklyHours}
          onClose={() => setShowCelebration(false)}
        />
      )}

      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
        <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
            <div>
              <h2 className="text-white font-bold text-lg">My Day Tracker</h2>
              <p className="text-white/70 text-xs">Log what you did today, {user.name}</p>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white text-2xl cursor-pointer">×</button>
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-gray-100 flex-shrink-0">
            {['today', 'week'].map(tab => (
              <button key={tab} onClick={() => setView(tab)}
                className={`flex-1 py-3 text-sm font-semibold transition-all cursor-pointer capitalize
                  ${view === tab ? 'text-purple-700 border-b-2 border-purple-600' : 'text-gray-400 hover:text-gray-600'}`}>
                {tab === 'today' ? "📅 Today's Log" : '📊 This Week'}
              </button>
            ))}
          </div>

          <div className="overflow-y-auto flex-1 px-5 py-4">

            {/* TODAY VIEW */}
            {view === 'today' && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>

                <div className="flex flex-col gap-2">
                  {TRACKABLE_TASKS.map(task => {
                    const selected = todaySelected.includes(task.id);
                    return (
                      <button key={task.id} onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all cursor-pointer
                          ${selected ? 'border-purple-400 bg-purple-50' : 'border-gray-200 bg-white hover:border-purple-200'}`}>
                        <span className="text-xl flex-shrink-0">{task.emoji}</span>
                        <span className={`text-sm flex-1 ${selected ? 'font-semibold text-purple-900' : 'text-gray-700'}`}>
                          {task.label}
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">~{task.hours}h</span>
                        {selected && <span className="text-purple-500 text-xs font-bold">✓</span>}
                      </button>
                    );
                  })}
                </div>

                {todaySelected.length > 0 && (
                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-purple-700 font-bold text-lg">
                      ~{todaySelected.reduce((s, id) => s + (TRACKABLE_TASKS.find(t => t.id === id)?.hours || 0), 0)}h
                    </p>
                    <p className="text-purple-500 text-xs">estimated today</p>
                  </div>
                )}

                <textarea value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Anything else you did today? (optional)"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-400 outline-none text-sm resize-none" />

                <button onClick={handleSave}
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                  {saved ? '✓ Saved!' : 'Save Today\'s Log 💜'}
                </button>
              </div>
            )}

            {/* WEEK VIEW */}
            {view === 'week' && (
              <div className="flex flex-col gap-5">
                {/* Weekly progress */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-purple-900 text-sm">Weekly Total</p>
                    <p className="font-bold text-purple-700">{weeklyHours}h / {WEEK_THRESHOLD}h</p>
                  </div>
                  <div className="h-4 bg-white rounded-full overflow-hidden border border-purple-100">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${weekProgress}%`,
                        background: weekProgress >= 100
                          ? 'linear-gradient(to right, #f59e0b, #ef4444)'
                          : 'linear-gradient(to right, #a855f7, #7c3aed)'
                      }} />
                  </div>
                  <p className="text-xs text-purple-500 mt-2">
                    {weekProgress >= 100
                      ? '🔥 You\'ve done so much this week! You deserve recognition.'
                      : `${WEEK_THRESHOLD - weeklyHours}h more to unlock your weekly celebration`}
                  </p>
                </div>

                {/* Day bars */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Daily Breakdown</p>
                  <div className="flex items-end gap-2 h-28">
                    {weekDays.map(day => (
                      <div key={day.label} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-gray-500">{day.hours > 0 ? `${day.hours}h` : ''}</span>
                        <div className="w-full rounded-t-lg transition-all duration-700 relative"
                          style={{
                            height: `${Math.max((day.hours / maxDayHours) * 80, day.hours > 0 ? 8 : 2)}px`,
                            background: day.isToday
                              ? 'linear-gradient(to top, #7c3aed, #c084fc)'
                              : day.hours > 0
                                ? 'linear-gradient(to top, #a855f7, #ddd6fe)'
                                : '#f3f4f6'
                          }} />
                        <span className={`text-xs font-medium ${day.isToday ? 'text-purple-700' : 'text-gray-400'}`}>
                          {day.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category breakdown */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">By Category This Week</p>
                  {['household', 'emotional', 'planning', 'professional'].map(cat => {
                    const catHours = Object.values(logs)
                      .filter((_, i) => {
                        const keys = Object.keys(logs);
                        const d = new Date(keys[i]);
                        const now = new Date();
                        return (now - d) < 7 * 86400000;
                      })
                      .reduce((sum, log) => {
                        return sum + (log.tasks || []).reduce((s, id) => {
                          const t = TRACKABLE_TASKS.find(t => t.id === id);
                          return s + (t?.category === cat ? t.hours : 0);
                        }, 0);
                      }, 0);

                    const catLabels = { household: '🏡 Household', emotional: '💜 Emotional', planning: '📋 Planning', professional: '💼 Professional' };
                    const maxCat = 20;
                    return (
                      <div key={cat} className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-gray-600 w-28 flex-shrink-0">{catLabels[cat]}</span>
                        <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${Math.min((catHours / maxCat) * 100, 100)}%`, background: CATEGORY_COLORS[cat] }} />
                        </div>
                        <span className="text-xs font-bold text-gray-600 w-8 text-right">{Math.round(catHours * 10) / 10}h</span>
                      </div>
                    );
                  })}
                </div>

                {weekProgress >= 100 && (
                  <button onClick={() => setShowCelebration(true)}
                    className="w-full py-3 rounded-xl font-bold text-white cursor-pointer transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                    🎉 View Your Celebration
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

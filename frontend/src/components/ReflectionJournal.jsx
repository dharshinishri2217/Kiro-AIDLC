import { useState, useEffect } from 'react';

export default function ReflectionJournal({ user, simulationRoles, simulationTasks }) {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [past, setPast] = useState([]);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('iss_journal') || '[]');
    setPast(stored);
  }, []);

  const handleSave = () => {
    if (!entry.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: entry.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      roles: simulationRoles,
      tasks: simulationTasks,
    };
    const updated = [newEntry, ...past].slice(0, 20); // keep last 20
    localStorage.setItem('iss_journal', JSON.stringify(updated));
    setPast(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEntry('');
  };

  return (
    <div className="w-full max-w-2xl fade-in-up">
      <div className="bg-white border-2 border-indigo-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-indigo-50 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, #eef2ff, #e0e7ff)' }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">📝</span>
            <p className="font-bold text-indigo-900 text-sm">Reflection Journal</p>
          </div>
          {past.length > 0 && (
            <button onClick={() => setShowPast(!showPast)}
              className="text-xs text-indigo-500 hover:text-indigo-700 cursor-pointer">
              {showPast ? 'Hide' : `View ${past.length} past entries`}
            </button>
          )}
        </div>

        <div className="p-5">
          <p className="text-xs text-gray-500 mb-3">
            What did this simulation make you feel or realize? Write privately — this stays in your browser.
          </p>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="I never realized how much she carries..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-400 outline-none text-sm text-gray-700 resize-none transition-all"
          />
          <button onClick={handleSave} disabled={!entry.trim()}
            className={`mt-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer
              ${entry.trim() ? 'text-white hover:scale-105' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            style={entry.trim() ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}>
            {saved ? '✓ Saved!' : 'Save Reflection'}
          </button>
        </div>

        {showPast && past.length > 0 && (
          <div className="border-t border-indigo-50 px-5 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
            {past.map(e => (
              <div key={e.id} className="bg-indigo-50 rounded-xl p-3">
                <p className="text-xs text-indigo-400 mb-1">{e.date}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{e.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

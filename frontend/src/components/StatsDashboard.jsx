import { useEffect, useState } from 'react';

const PYTHON_API = 'http://localhost:5001/api/stats';

function Bar({ label, count, max, color }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs text-gray-600 w-40 truncate flex-shrink-0">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 w-6 text-right">{count}</span>
    </div>
  );
}

export default function StatsDashboard({ onClose }) {
  const [overview, setOverview] = useState(null);
  const [topRoles, setTopRoles] = useState([]);
  const [topTasks, setTopTasks] = useState([]);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${PYTHON_API}/overview`).then(r => r.json()),
      fetch(`${PYTHON_API}/top-roles`).then(r => r.json()),
      fetch(`${PYTHON_API}/top-tasks`).then(r => r.json()),
      fetch(`${PYTHON_API}/daily`).then(r => r.json()),
    ])
      .then(([ov, roles, tasks, day]) => {
        setOverview(ov);
        setTopRoles(roles);
        setTopTasks(tasks);
        setDaily(day);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to the stats service. Make sure the Python server is running on port 5001.');
        setLoading(false);
      });
  }, []);

  const maxRole = topRoles[0]?.count || 1;
  const maxTask = topTasks[0]?.count || 1;
  const maxDay = Math.max(...daily.map(d => d.count), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-purple-900">Simulation Stats</h2>
            <p className="text-xs text-purple-400">Powered by Python analytics</p>
          </div>
          <button onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl cursor-pointer leading-none">×</button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-6">
          {loading && (
            <div className="text-center py-10 text-purple-400">Loading stats...</div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Overview cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Total Simulations', value: overview?.totalSimulations ?? 0, emoji: '🔁' },
                  { label: 'Total Users', value: overview?.totalUsers ?? 0, emoji: '👥' },
                  { label: 'Avg Tasks / Sim', value: overview?.avgTasksPerSim ?? 0, emoji: '📊' },
                ].map(card => (
                  <div key={card.label} className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100">
                    <div className="text-2xl mb-1">{card.emoji}</div>
                    <div className="text-2xl font-bold text-purple-800">{card.value}</div>
                    <div className="text-xs text-purple-500 mt-1">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Top Roles */}
              {topRoles.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Most Selected Roles</h3>
                  {topRoles.map(r => (
                    <Bar key={r.id} label={r.role} count={r.count} max={maxRole}
                      color="linear-gradient(to right, #a855f7, #7c3aed)" />
                  ))}
                </div>
              )}

              {/* Top Tasks */}
              {topTasks.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Most Stopped Responsibilities</h3>
                  {topTasks.map(t => (
                    <Bar key={t.id} label={t.task} count={t.count} max={maxTask}
                      color="linear-gradient(to right, #f472b6, #ec4899)" />
                  ))}
                </div>
              )}

              {/* Daily trend */}
              {daily.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Simulations — Last 7 Days</h3>
                  <div className="flex items-end gap-2 h-24">
                    {daily.map(d => (
                      <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg transition-all duration-700"
                          style={{
                            height: `${Math.round((d.count / maxDay) * 80)}px`,
                            minHeight: '4px',
                            background: 'linear-gradient(to top, #7c3aed, #c084fc)'
                          }} />
                        <span className="text-xs text-gray-400">{d.date.slice(5)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {overview?.totalSimulations === 0 && (
                <p className="text-center text-gray-400 text-sm py-4">
                  No simulations yet. Complete a simulation to see stats here.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

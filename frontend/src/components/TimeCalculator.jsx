// Hours per week each task typically takes (research-based estimates)
const TASK_HOURS = {
  'cooking': 10, 'childcare': 20, 'cleaning': 7, 'elder-care': 15,
  'grocery': 3, 'appointments': 2, 'mental-load': 14, 'social-glue': 4,
  'finances': 2, 'emotional-support': 8, 'conflict-resolution': 3,
  'mental-health-check': 4, 'celebration': 1, 'work-balance': 10,
  'mentoring': 3, 'volunteering': 4,
};

export default function TimeCalculator({ selectedTasks }) {
  if (selectedTasks.length === 0) return null;

  const totalHours = selectedTasks.reduce((sum, id) => sum + (TASK_HOURS[id] || 3), 0);
  const totalDays = Math.round((totalHours / 24) * 10) / 10;
  const yearlyHours = totalHours * 52;
  const yearlySalary = Math.round(yearlyHours * 15); // $15/hr minimum wage equivalent

  return (
    <div className="w-full max-w-2xl fade-in-up">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-purple-100">
        <h3 className="font-bold text-purple-900 mb-1 flex items-center gap-2">
          <span>🕐</span> Time She Spends Weekly
        </h3>
        <p className="text-xs text-purple-400 mb-4">Based on selected responsibilities</p>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-purple-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-700">{totalHours}h</div>
            <div className="text-xs text-purple-500 mt-1">per week</div>
          </div>
          <div className="bg-pink-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-pink-700">{totalDays}d</div>
            <div className="text-xs text-pink-500 mt-1">equivalent days</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-amber-700">{yearlyHours}h</div>
            <div className="text-xs text-amber-500 mt-1">per year</div>
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 flex items-center gap-3">
          <span className="text-2xl">💰</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              If paid at minimum wage: <span className="text-purple-700">${yearlySalary.toLocaleString()}/year</span>
            </p>
            <p className="text-xs text-gray-500">This work is unpaid, unrecognized, and invisible.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

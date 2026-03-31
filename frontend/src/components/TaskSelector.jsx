import { taskCategories } from '../data';

const categoryColors = {
  emotional: { border: 'border-pink-300', bg: 'bg-pink-50', selected: 'border-pink-500 bg-pink-100', header: 'text-pink-700 bg-pink-50' },
  household: { border: 'border-amber-300', bg: 'bg-amber-50', selected: 'border-amber-500 bg-amber-100', header: 'text-amber-700 bg-amber-50' },
  planning:  { border: 'border-blue-300',  bg: 'bg-blue-50',  selected: 'border-blue-500 bg-blue-100',  header: 'text-blue-700 bg-blue-50'  },
  professional: { border: 'border-green-300', bg: 'bg-green-50', selected: 'border-green-500 bg-green-100', header: 'text-green-700 bg-green-50' },
};

export default function TaskSelector({ tasks, selectedTasks, onToggle, error }) {
  // Group tasks by category
  const grouped = taskCategories.reduce((acc, cat) => {
    const catTasks = tasks.filter((t) => t.category === cat.id);
    if (catTasks.length > 0) acc.push({ ...cat, tasks: catTasks });
    return acc;
  }, []);

  return (
    <div className="w-full max-w-2xl fade-in-up flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold text-purple-900 mb-1">Select Her Responsibilities</h2>
        <p className="text-sm text-purple-500">What does she do every day that goes unnoticed?</p>
      </div>

      {grouped.map((cat) => {
        const colors = categoryColors[cat.id] || categoryColors.emotional;
        return (
          <div key={cat.id}>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-2 ${colors.header}`}>
              <span className="text-lg">{cat.emoji}</span>
              <span className="font-bold text-sm">{cat.label}</span>
            </div>
            <div className="flex flex-col gap-2">
              {cat.tasks.map((task) => {
                const selected = selectedTasks.includes(task.id);
                return (
                  <button key={task.id} onClick={() => onToggle(task.id)}
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer
                      ${selected ? colors.selected : `${colors.border} bg-white/80 hover:${colors.bg}`}
                    `}>
                    <span className="text-xl flex-shrink-0">{task.emoji}</span>
                    <span className={`font-medium text-sm flex-1 ${selected ? 'text-gray-900' : 'text-gray-700'}`}>{task.label}</span>
                    {selected && <span className="text-xs font-semibold text-purple-500 flex-shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {error && <p className="text-sm text-red-600 font-medium fade-in-up">⚠️ {error}</p>}
    </div>
  );
}
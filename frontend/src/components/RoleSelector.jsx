export default function RoleSelector({ roles, selectedRoles, onToggle, error }) {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-purple-900 mb-1">Select Her Roles</h2>
      <p className="text-sm text-purple-500 mb-4">Choose one or more roles she carries every day</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {roles.map((role) => {
          const selected = selectedRoles.includes(role.id);
          return (
            <button key={role.id} onClick={() => onToggle(role.id)}
              className={`
                p-4 rounded-2xl border-2 text-center transition-all duration-200 cursor-pointer
                hover:scale-105 hover:shadow-md
                ${selected ? 'border-purple-500 bg-purple-100 shadow-md' : 'border-purple-200 bg-white/80 hover:border-purple-400'}
              `}>
              <div className="text-3xl mb-2">{role.emoji}</div>
              <div className="font-semibold text-purple-900 text-xs leading-tight">{role.label}</div>
              {selected && <div className="mt-1 text-purple-500 text-xs">✓</div>}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-3 text-sm text-red-600 font-medium fade-in-up">⚠️ {error}</p>}
    </div>
  );
}
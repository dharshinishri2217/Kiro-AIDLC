export default function SimulationButton({ onClick, disabled, loading }) {
  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`
          px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300
          ${disabled
            ? 'bg-gray-300 cursor-not-allowed text-gray-500'
            : 'bg-purple-600 hover:bg-purple-700 hover:scale-105 active:scale-95 pulse-btn cursor-pointer shadow-lg'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Simulating...
          </span>
        ) : (
          '✋ What if she stopped?'
        )}
      </button>
      {!disabled && !loading && (
        <p className="text-xs text-purple-500">Click to see the impact</p>
      )}
    </div>
  );
}

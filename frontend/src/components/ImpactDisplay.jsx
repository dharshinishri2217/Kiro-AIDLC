import { useEffect, useState } from 'react';

const categoryStyle = {
  emotional:    'border-pink-400 bg-pink-50',
  household:    'border-amber-400 bg-amber-50',
  planning:     'border-blue-400 bg-blue-50',
  professional: 'border-green-400 bg-green-50',
};

function TypewriterText({ text, onDone }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); onDone && onDone(); }
    }, 18);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

export default function ImpactDisplay({ impacts, simulationState, onAllShown }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (visibleCount < impacts.length && typingDone) {
      setTypingDone(false);
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), 300);
      return () => clearTimeout(timer);
    } else if (visibleCount === 0 && impacts.length > 0) {
      setVisibleCount(1);
    } else if (visibleCount >= impacts.length && impacts.length > 0 && typingDone) {
      const timer = setTimeout(onAllShown, 700);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, typingDone, impacts.length, onAllShown]);

  const isChaos = simulationState === 'chaos';

  return (
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <div className="text-center mb-2">
        <h2 className={`text-xl font-bold ${isChaos ? 'text-red-800' : 'text-amber-800'}`}>
          {isChaos ? '🔥 Everything is falling apart...' : '⚠️ The impact begins...'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {visibleCount} of {impacts.length} responsibilities stopped
        </p>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${(visibleCount / impacts.length) * 100}%` }} />
        </div>
      </div>

      {impacts.slice(0, visibleCount).map((impact, i) => {
        const isLast = i === visibleCount - 1;
        const style = isChaos
          ? 'border-red-500 bg-red-50'
          : (categoryStyle[impact.category] || 'border-amber-400 bg-amber-50');
        return (
          <div key={impact.taskId}
            className={`fade-in-up p-4 rounded-xl border-2 ${style} ${isChaos ? 'shake' : ''}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{impact.emoji}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{impact.label} — stopped</p>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {isLast
                    ? <TypewriterText text={impact.message} onDone={() => setTypingDone(true)} />
                    : impact.message}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
import { useState } from 'react';

export default function ShareCard({ user, message }) {
  const [copied, setCopied] = useState(false);

  const shareText = `"${message}"\n\n— Explored on If She Stopped\n#InvisibleWork #IfSheStopped`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Visual share card */}
      <div className="rounded-2xl p-6 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'white', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-3">If She Stopped</p>
          <p className="text-white font-medium text-sm leading-relaxed mb-4 italic">
            "{message.length > 120 ? message.slice(0, 120) + '...' : message}"
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">
              {user.name[0].toUpperCase()}
            </div>
            <span className="text-white/80 text-xs">{user.name} · explored this</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-3">
        <button onClick={handleCopy}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 border-purple-300 text-purple-700 hover:bg-purple-50 transition-all cursor-pointer">
          {copied ? '✓ Copied!' : '📋 Copy Quote'}
        </button>
        <button
          onClick={() => {
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
            window.open(url, '_blank');
          }}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
          🐦 Share on X
        </button>
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { roles, tasks, finalInsights } from './data';
import LoginPage from './components/LoginPage';
import StreakBar from './components/StreakBar';
import RoleSelector from './components/RoleSelector';
import TaskSelector from './components/TaskSelector';
import SimulationButton from './components/SimulationButton';
import ImpactDisplay from './components/ImpactDisplay';
import FinalInsight from './components/FinalInsight';
import StatsDashboard from './components/StatsDashboard';
import ImpactMeter from './components/ImpactMeter';
import BadgeUnlock from './components/BadgeUnlock';
import ShareCard from './components/ShareCard';
import TimeCalculator from './components/TimeCalculator';
import DailyChallenge from './components/DailyChallenge';
import ReflectionJournal from './components/ReflectionJournal';
import DayTracker from './components/DayTracker';

function getFilteredTasks(selectedRoles) {
  return tasks.filter((t) => t.roleIds.some((r) => selectedRoles.includes(r)));
}

function getFinalInsight(selectedRoles) {
  for (const role of selectedRoles) {
    if (finalInsights[role]) return finalInsights[role];
  }
  return finalInsights.default;
}

const bgClass = {
  calm: 'state-calm',
  disruption: 'state-disruption',
  chaos: 'state-chaos',
  reflection: 'state-reflection',
};

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [simulationState, setSimulationState] = useState('calm');
  const [loading, setLoading] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [roleError, setRoleError] = useState('');
  const [taskError, setTaskError] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem('iss_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Update streak for returning user
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      let streak = parsed.streak || 1;
      if (parsed.lastVisit !== today) {
        streak = parsed.lastVisit === yesterday ? streak + 1 : 1;
        const updated = { ...parsed, streak, lastVisit: today };
        localStorage.setItem('iss_user', JSON.stringify(updated));
        setUser(updated);
      } else {
        setUser(parsed);
      }
    }
  }, []);

  const handleLogin = (userData) => setUser(userData);

  const handleLogout = () => {
    setUser(null);
    resetSim();
  };

  const resetSim = () => {
    setSelectedRoles([]);
    setSelectedTasks([]);
    setSimulationState('calm');
    setLoading(false);
    setShowImpact(false);
    setShowInsight(false);
    setRoleError('');
    setTaskError('');
  };

  const toggleRole = (id) => {
    setRoleError('');
    setSelectedRoles((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
    setSelectedTasks([]);
  };

  const toggleTask = (id) => {
    setTaskError('');
    setSelectedTasks((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]);
  };

  const handleSimulate = () => {
    if (selectedRoles.length === 0) { setRoleError('Please select at least one role to continue.'); return; }
    if (selectedTasks.length === 0) { setTaskError('Please select at least one responsibility to simulate.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSimulationState('disruption');
      setShowImpact(true);
    }, 1200);
  };

  const handleAllImpactsShown = useCallback(() => {
    setSimulationState('chaos');
    setTimeout(() => {
      setSimulationState('reflection');
      setShowInsight(true);
      // Update sim count in localStorage
      const saved = JSON.parse(localStorage.getItem('iss_user') || '{}');
      const updated = { ...saved, totalSims: (saved.totalSims || 0) + 1 };
      localStorage.setItem('iss_user', JSON.stringify(updated));
      setUser(updated);
    }, 1500);
  }, []);

  const handleRestart = () => resetSim();

  if (!user) return <LoginPage onLogin={handleLogin} />;

  const filteredTasks = getFilteredTasks(selectedRoles);
  const impactData = selectedTasks.map((id) => {
    const task = tasks.find((t) => t.id === id);
    return { taskId: id, label: task.label, emoji: task.emoji, category: task.category, message: task.impactMessage };
  });

  return (
    <div className={`min-h-screen transition-all duration-1000 ${bgClass[simulationState]}`}>
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center gap-7">

        {/* Streak bar */}
        <StreakBar user={user} onLogout={handleLogout} />

        {/* Header */}
        <header className="text-center fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 leading-tight">
            If She Stopped
          </h1>
          <p className="text-purple-500 mt-1 text-sm">
            Welcome back, <span className="font-semibold">{user.name}</span> — let's explore invisible work
          </p>
          <button
            onClick={() => setShowStats(true)}
            className="mt-3 text-xs px-4 py-1.5 rounded-full border border-purple-300 text-purple-600 hover:bg-purple-50 transition-all cursor-pointer"
          >
            📊 View Simulation Stats
          </button>
          <button
            onClick={() => setShowTracker(true)}
            className="mt-2 text-xs px-4 py-1.5 rounded-full border border-pink-300 text-pink-600 hover:bg-pink-50 transition-all cursor-pointer"
          >
            📅 My Day Tracker
          </button>
        </header>

        {showStats && <StatsDashboard onClose={() => setShowStats(false)} />}
        {showTracker && <DayTracker user={user} onClose={() => setShowTracker(false)} />}

        {/* Pre-simulation */}
        {!showImpact && (
          <>
            <DailyChallenge onAccept={(role, task) => {
              if (!selectedRoles.includes(role)) toggleRole(role);
              setTimeout(() => toggleTask(task), 100);
            }} />

            <RoleSelector roles={roles} selectedRoles={selectedRoles} onToggle={toggleRole} error={roleError} />

            {selectedRoles.length > 0 && filteredTasks.length > 0 && (
              <TaskSelector tasks={filteredTasks} selectedTasks={selectedTasks} onToggle={toggleTask} error={taskError} />
            )}

            {selectedRoles.length > 0 && selectedTasks.length > 0 && (
              <TimeCalculator selectedTasks={selectedTasks} />
            )}

            {selectedRoles.length > 0 && (
              <ImpactMeter selectedTasks={selectedTasks} />
            )}

            {selectedRoles.length > 0 && (
              <SimulationButton onClick={handleSimulate} disabled={selectedTasks.length === 0} loading={loading} />
            )}
          </>
        )}

        {/* Impact */}
        {showImpact && !showInsight && (
          <ImpactDisplay impacts={impactData} simulationState={simulationState} onAllShown={handleAllImpactsShown} />
        )}

        {/* Reflection */}
        {showInsight && (
          <>
            <FinalInsight message={getFinalInsight(selectedRoles)} onRestart={handleRestart} user={user} />
            <BadgeUnlock user={user} selectedTasks={selectedTasks} />
            <ReflectionJournal user={user} simulationRoles={selectedRoles} simulationTasks={selectedTasks} />
            <ShareCard user={user} message={getFinalInsight(selectedRoles)} />
          </>
        )}

      </div>
    </div>
  );
}

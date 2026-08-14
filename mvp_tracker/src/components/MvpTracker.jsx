import { useState, useEffect, useMemo } from "react";
import { Clock, RotateCcw } from "lucide-react";
import { STORAGE_KEY, DEFAULT_MVPS, GROUP_LABELS, DEFAULT_WINDOWS } from "./utility";

// In Claude's artifact sandbox localStorage throws, so kills/config live in
// React state only (resets on refresh). Outside Claude, uncomment the
// localStorage lines below (marked with // LS:) to persist across sessions.
function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { console.error(e) }
  return { mvps: DEFAULT_MVPS.map((m) => ({ ...m, lastKilled: null })) };
}

function persist(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { console.error(e) }
}

function formatDuration(ms) {
  if (ms <= 0) return "0s";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getStatus(mvp, now) {
  if (!mvp.lastKilled) {
    return { label: "Unknown", color: "bg-neutral-400" };
  }
  const minTime = mvp.lastKilled + mvp.minMin * 60000;
  const maxTime = mvp.lastKilled + mvp.maxMin * 60000;
  if (now < minTime) {
    return { label: "Dead", sub: formatDuration(minTime - now), color: "bg-red-500" };
  }
  if (now < maxTime) {
    return { label: "Maybe Up", sub: formatDuration(maxTime - now), color: "bg-amber-500" };
  }
  return { label: "Up", sub: "confirm in-game", color: "bg-green-600" };
}

export default function MvpTracker() {
  const [state, setState] = useState(loadInitialState);
  const [now, setNow] = useState(Date.now());
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    persist(state);
  }, [state]);

  const logKill = (id) => {
    setState((s) => ({
      mvps: s.mvps.map((m) => (m.id === id ? { ...m, lastKilled: Date.now() } : m)),
    }));
  };

  const resetKill = (id) => {
    setState((s) => ({
      mvps: s.mvps.map((m) => (m.id === id ? { ...m, lastKilled: null } : m)),
    }));
  };

  const updateWindow = (id, field, value) => {
    const n = Math.max(1, parseInt(value) || 1);
    setState((s) => ({
      mvps: s.mvps.map((m) => (m.id === id ? { ...m, [field]: n } : m)),
    }));
  };

  const resetWindow = (id) => {
    const def = DEFAULT_WINDOWS[id];
    if (!def) return;
    setState((s) => ({
      mvps: s.mvps.map((m) => (m.id === id ? { ...m, minMin: def.minMin, maxMin: def.maxMin } : m)),
    }));
  };

  const clearAllData = () => {
    if (!window.confirm("This will erase all logged kill times and window edits. Continue?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setState({ mvps: DEFAULT_MVPS.map((m) => ({ ...m, lastKilled: null })) });
  };

  // Build grouped sections, preserving DEFAULT_MVPS order within each group
  // and GROUP_LABELS key order for section order. No auto-sorting.
  const groupedRows = useMemo(() => {
    const withStatus = state.mvps.map((m) => ({ ...m, status: getStatus(m, now) }));
    return Object.keys(GROUP_LABELS).map((groupId) => ({
      groupId,
      label: GROUP_LABELS[groupId],
      items: withStatus.filter((m) => m.group === groupId),
    }));
  }, [state.mvps, now]);

 return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-3">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        {groupedRows.map(
          (grp) =>
            grp.items.length > 0 && (
              <div key={grp.groupId}>
                <h2 className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1 px-0.5">
                  {grp.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {grp.items.map((m) => (
                    <div
                      key={m.id}
                      className="bg-white border border-neutral-200 rounded-md px-2 py-1.5 flex flex-col sm:flex-row sm:items-center gap-1.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold">{m.name}</span>
                          <span
                            className={`text-[10px] leading-none px-1.5 py-[3px] rounded-full text-white ${m.status.color}`}
                          >
                            {m.status.label}
                          </span>
                          {m.status.sub && (
                            <span className="text-xs font-semibold text-neutral-700 flex items-center gap-0.5">
                              <Clock size={11} />
                              {m.status.sub}
                            </span>
                          )}
                          <span className="text-[10px] text-neutral-400">{m.map}</span>
                        </div>

                        {editingId === m.id && (
                          <div className="flex items-center gap-1.5 mt-1 text-[10px]">
                            <label className="text-neutral-500">min</label>
                            <input
                              type="number"
                              value={m.minMin}
                              onChange={(e) => updateWindow(m.id, "minMin", e.target.value)}
                              className="w-12 bg-neutral-100 border border-neutral-300 rounded px-1 py-0.5"
                            />
                            <label className="text-neutral-500">max</label>
                            <input
                              type="number"
                              value={m.maxMin}
                              onChange={(e) => updateWindow(m.id, "maxMin", e.target.value)}
                              className="w-12 bg-neutral-100 border border-neutral-300 rounded px-1 py-0.5"
                            />
                            <span className="text-neutral-400">min</span>
                            <button
                              onClick={() => resetWindow(m.id)}
                              className="text-neutral-400 hover:text-neutral-700 underline ml-1"
                            >
                              reset to default
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setEditingId(editingId === m.id ? null : m.id)}
                          className="text-[10px] text-neutral-500 hover:text-neutral-900 px-1 py-1"
                        >
                          {editingId === m.id ? "Done" : "Edit"}
                        </button>
                        {m.lastKilled && (
                          <button
                            onClick={() => resetKill(m.id)}
                            className="p-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                            title="Reset timer"
                          >
                            <RotateCcw size={11} />
                          </button>
                        )}
                        <button
                          onClick={() => logKill(m.id)}
                          className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-500 text-white text-[11px] font-medium whitespace-nowrap"
                        >
                          Log Kill
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}
        <button
          onClick={clearAllData}
          className="text-[10px] text-neutral-400 hover:text-red-600 underline self-start mt-1"
        >Clear all data</button>
      </div>
    </div>
  );
}
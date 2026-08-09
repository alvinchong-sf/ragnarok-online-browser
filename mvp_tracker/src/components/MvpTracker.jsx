import { useState, useEffect, useMemo } from "react";
import { Clock, RotateCcw } from "lucide-react";

// ---- Group labels -----------------------------------------------------
// Rename these to whatever makes sense for how you actually run routes.
// Order here = display order on the page.
const GROUP_LABELS = {
  g1: "Group 1",
  g2: "Group 2",
  g3: "Group 3",
  g4: "Group 4",
  g5: "Group 5",
  g6: "Group 6 (Bio Lab)",
  g7: "Group 7 (High-Tier)",
  g8: "Group 8",
};

// ---- MVP list -----------------------------------------------------
// minMin / maxMin are the respawn window in MINUTES, tuned to this server.
const DEFAULT_MVPS = [
  // Group 1
  { id: "test", name: "test mvp", map: "pay_dun04", minMin: 0.2, maxMin: 0.5, group: "g1" },
  { id: "moonlight", name: "Moonlight Flower", map: "pay_dun04", minMin: 60, maxMin: 70, group: "g1" },
  { id: "gtb", name: "Golden Thief Bug", map: "prt_sewb4", minMin: 60, maxMin: 70, group: "g1" },
  { id: "stormyknight", name: "Stormy Knight", map: "xmas_dun02", minMin: 60, maxMin: 70, group: "g1" },
  { id: "turtlegeneral", name: "Turtle General", map: "tur_dun04", minMin: 60, maxMin: 70, group: "g1" },
  { id: "dracula", name: "Dracula", map: "gef_dun01", minMin: 60, maxMin: 70, group: "g1" },
  { id: "osiris", name: "Osiris", map: "moc_pryd04", minMin: 60, maxMin: 70, group: "g1" },
  { id: "pharaoh", name: "Pharaoh", map: "in_sphinx5", minMin: 60, maxMin: 70, group: "g1" },
  { id: "amonra", name: "Amon Ra", map: "moc_pryd06", minMin: 60, maxMin: 70, group: "g1" },
  { id: "orchero", name: "Orc Hero", map: "gef_fild14", minMin: 60, maxMin: 70, group: "g1" },

  // Group 2
  { id: "evilsnakelord", name: "Evil Snake Lord", map: "gon_dun03", minMin: 94, maxMin: 104, group: "g2" },
  { id: "samurai", name: "Incantation Samurai", map: "ama_dun03", minMin: 91, maxMin: 101, group: "g2" },

  // Group 3
  { id: "eddga", name: "Eddga", map: "pay_fild11", minMin: 120, maxMin: 130, group: "g3" },
  { id: "garm", name: "Garm", map: "xmas_fild01", minMin: 120, maxMin: 130, group: "g3" },
  { id: "maya", name: "Maya", map: "anthell02", minMin: 120, maxMin: 130, group: "g3" },
  { id: "gopinich", name: "Gopinich", map: "mosk_dun03", minMin: 120, maxMin: 130, group: "g3" },
  { id: "phreeoni", name: "Phreeoni", map: "moc_fild17", minMin: 120, maxMin: 130, group: "g3" },
  { id: "rsx", name: "RSX-0806", map: "ein_dun02", minMin: 125, maxMin: 135, group: "g3" },
  { id: "doppelganger", name: "Doppelganger", map: "gef_dun02", minMin: 120, maxMin: 130, group: "g3" },
  { id: "orclord", name: "Orc Lord", map: "gef_fild10", minMin: 120, maxMin: 130, group: "g3" },
  { id: "lordofdeath", name: "Lord of Death", map: "niflheim", minMin: 133, maxMin: 133, group: "g3" },
  { id: "bacsojin", name: "Bacsojin", map: "lou_dun03", minMin: 117, maxMin: 127, group: "g3" },
  { id: "egnigemcenia", name: "Egnigem Cenia", map: "lhz_dun02", minMin: 120, maxMin: 130, group: "g3" },

  // Group 4
  { id: "atroce1", name: "Atroce 1", map: "ve_fild02", minMin: 360, maxMin: 370, group: "g4" },
  { id: "taogunka", name: "Tao Gunka", map: "beach_dun01", minMin: 300, maxMin: 310, group: "g4" },
  { id: "atroce2", name: "Atroce 2", map: "ve_fild01", minMin: 180, maxMin: 190, group: "g4" },
  { id: "kiel", name: "Kiel D-01", map: "kh_dun02", minMin: 120, maxMin: 180, group: "g4" },
  { id: "atroce3", name: "Atroce 3", map: "ra_fild04", minMin: 300, maxMin: 310, group: "g4" },
  { id: "vesper", name: "Vesper", map: "jupe_core", minMin: 120, maxMin: 130, group: "g4" },
  { id: "atroce4", name: "Atroce 4", map: "ra_fild03", minMin: 180, maxMin: 190, group: "g4" },
  { id: "detale", name: "Detale", map: "abyss_03", minMin: 180, maxMin: 190, group: "g4" },
  { id: "atroce5", name: "Atroce 5", map: "ra_fild02", minMin: 240, maxMin: 250, group: "g4" },

  // Group 5
  { id: "drake", name: "Drake", map: "treasure02", minMin: 120, maxMin: 130, group: "g5" },
  { id: "mistress", name: "Mistress", map: "mjolnir_04", minMin: 120, maxMin: 130, group: "g5" },
  { id: "darklord", name: "Dark Lord", map: "gl_chyard", minMin: 60, maxMin: 70, group: "g5" },
  { id: "baphomet", name: "Baphomet", map: "prt_maze03", minMin: 120, maxMin: 130, group: "g5" },
  { id: "ladytanee", name: "Lady Tanee", map: "ayo_dun02", minMin: 420, maxMin: 430, group: "g5" },

  // Group 6 (Bio Lab)
  { id: "eremes", name: "Assassin Cross Eremes", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },
  { id: "magaretha", name: "High Priest Margaretha", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },
  { id: "katrinn", name: "High Wizard Kathryne", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },
  { id: "seyren", name: "Lord Knight Seyren", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },
  { id: "cecil", name: "Sniper Cecil", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },
  { id: "howard", name: "Whitesmith Howard", map: "lhz_dun03", minMin: 100, maxMin: 130, group: "g6" },

  // Group 7 (High-Tier)
  { id: "ktullanux", name: "Ktullanux", map: "ice_dun03", minMin: 120, maxMin: 130, group: "g7" },
  { id: "thanatos", name: "Thanatos", map: "thana_boss(1)", minMin: 120, maxMin: 120, group: "g7" },
  { id: "beelzebub", name: "Beelzebub", map: "abbey03", minMin: 180, maxMin: 300, group: "g7" },
  { id: "ifrit", name: "Ifrit", map: "thor_v03", minMin: 660, maxMin: 670, group: "g7" },
  { id: "woundedmorocc", name: "Wounded Morocc", map: "moc_fild22", minMin: 720, maxMin: 780, group: "g7" },
  { id: "randgris", name: "Valkyrie Randgris", map: "odin_tem03", minMin: 480, maxMin: 490, group: "g7" },
  { id: "fallenbishop", name: "Fallen Bishop", map: "abbey02", minMin: 120, maxMin: 130, group: "g7" },
  { id: "gloomundernight", name: "Gloom Under Night", map: "ra_san05", minMin: 300, maxMin: 310, group: "g7" },

  // Group 8
  { id: "nydhog", name: "Nidhoggr's Shadow", map: "2@nyd(1)", minMin: 300, maxMin: 300, group: "g8" },
  { id: "boitata", name: "Boitata", map: "bra_dun02", minMin: 120, maxMin: 130, group: "g8" },
];

const STORAGE_KEY = "mvp_tracker_state_v1";

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
      </div>
    </div>
  );
}
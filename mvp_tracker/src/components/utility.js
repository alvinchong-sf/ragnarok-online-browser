// ---- MVP list -----------------------------------------------------
// minMin / maxMin are the respawn window in MINUTES, tuned to this server.
export const DEFAULT_MVPS = [
  // Group 1
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

  // Group 9 (New World Mini Boss)
  { id: "mammoth", name: "Hardrock Mammoth", map: "man_fild03", minMin: 240, maxMin: 240, group: "g9" },
  { id: "tendrillion", name: "Tendrillion", map: "spl_fild03", minMin: 60, maxMin: 60, group: "g9" },
];

// ---- Group labels -----------------------------------------------------
// Rename these to whatever makes sense for how you actually run routes.
// Order here = display order on the page.
export const GROUP_LABELS = {
  g1: "Group 1 (60 min Dash)",
  g2: "Group 2 (1.5 hours)",
  g3: "Group 3 (2 hours)",
  g4: "Group 4 (When there is no MVP left)",
  g5: "Group 5 (Too annoying)",
  g6: "Group 6 (Bio Lab)",
  g7: "Group 7 (High-Tier)",
  g8: "Group 8 (No spawn)",
  g9: "Group 9 (New World Mini Boss)",
};

export const STORAGE_KEY = "mvp_tracker_state_v1";

// Original min/max per MVP, keyed by id - used to power the "Reset to default" button.
export const DEFAULT_WINDOWS = Object.fromEntries(
  DEFAULT_MVPS.map((m) => [m.id, { minMin: m.minMin, maxMin: m.maxMin }])
);
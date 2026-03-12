import { useState } from "react";

// --- Mini-demo 1: Compteur ---
function Compteur() {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  function handleChange(delta: number) {
    setCount((prev) => prev + delta);
    setBump(true);
    setTimeout(() => setBump(false), 200);
  }

  const colorClass =
    count > 0
      ? "text-accent-green"
      : count < 0
        ? "text-accent-red"
        : "text-text-primary";

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        Compteur
      </h3>
      <span
        className={`text-6xl font-black tabular-nums transition-all duration-200 ${colorClass} ${bump ? "scale-125" : "scale-100"}`}
      >
        {count}
      </span>
      <div className="flex gap-3">
        <button
          onClick={() => handleChange(-1)}
          className="w-12 h-12 rounded-xl bg-accent-red/20 text-accent-red font-bold text-xl hover:bg-accent-red/30 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => handleChange(1)}
          className="w-12 h-12 rounded-xl bg-accent-green/20 text-accent-green font-bold text-xl hover:bg-accent-green/30 transition-colors"
        >
          +
        </button>
      </div>
      <p className="text-text-muted text-xs font-mono">useState({count})</p>
    </div>
  );
}

// --- Mini-demo 2: Color Picker ---
const SWATCHES = [
  { color: "#ff6b9d", name: "Rose" },
  { color: "#c084fc", name: "Violet" },
  { color: "#60a5fa", name: "Bleu" },
  { color: "#22d3ee", name: "Cyan" },
  { color: "#4ade80", name: "Vert" },
  { color: "#fb923c", name: "Orange" },
];

function ColorPicker() {
  const [selected, setSelected] = useState(SWATCHES[0]);

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        Couleur
      </h3>
      <div
        className="w-28 h-28 rounded-2xl transition-all duration-300 shadow-lg"
        style={{ backgroundColor: selected.color }}
      />
      <div className="flex gap-2">
        {SWATCHES.map((s) => (
          <button
            key={s.color}
            onClick={() => setSelected(s)}
            className={`w-8 h-8 rounded-lg transition-all hover:scale-110 ${
              selected.color === s.color
                ? "ring-2 ring-white ring-offset-2 ring-offset-bg-card scale-110"
                : ""
            }`}
            style={{ backgroundColor: s.color }}
          />
        ))}
      </div>
      <p className="text-text-muted text-xs font-mono">
        useState("<span style={{ color: selected.color }}>{selected.name}</span>
        ")
      </p>
    </div>
  );
}

// --- Mini-demo 3: Toggle ---
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-text-secondary text-sm font-semibold uppercase tracking-wider">
        Toggle
      </h3>

      {/* Switch */}
      <button
        onClick={() => setIsOn((prev) => !prev)}
        className={`w-16 h-8 rounded-full transition-all duration-300 relative ${
          isOn
            ? "bg-accent-green"
            : "bg-bg-secondary border border-border-subtle"
        }`}
      >
        <span
          className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 shadow-md ${
            isOn ? "left-9" : "left-1"
          }`}
        />
      </button>

      {/* Content block */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 ${
          isOn ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl p-4 text-center">
          <span className="text-accent-green text-sm font-semibold">
            Contenu visible !
          </span>
        </div>
      </div>

      <p className="text-text-muted text-xs font-mono">
        useState(
        <span className={isOn ? "text-accent-green" : "text-accent-red"}>
          {isOn ? "true" : "false"}
        </span>
        )
      </p>
    </div>
  );
}

// --- Main StateDemo ---
export default function StateDemo() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Compteur />
        <ColorPicker />
        <Toggle />
      </div>
    </div>
  );
}

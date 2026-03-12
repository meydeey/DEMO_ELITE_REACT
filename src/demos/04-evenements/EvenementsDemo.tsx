import { useState, type MouseEvent } from "react";

// --- Zone 1: onClick with ripple ---
function ClickZone() {
  const [count, setCount] = useState(0);
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setCount((prev) => prev + 1);
    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-pink text-sm font-semibold uppercase tracking-wider">
        onClick
      </h3>
      <button
        onClick={handleClick}
        className="relative w-32 h-32 rounded-2xl bg-accent-pink/20 border border-accent-pink/40 text-accent-pink font-black text-4xl overflow-hidden hover:bg-accent-pink/30 transition-colors"
      >
        {count}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute w-4 h-4 rounded-full bg-accent-pink/40 animate-ripple pointer-events-none"
            style={{
              left: r.x - 8,
              top: r.y - 8,
            }}
          />
        ))}
      </button>
      <p className="text-text-muted text-xs font-mono">
        onClick={"{"}handler{"}"}
      </p>
    </div>
  );
}

// --- Zone 2: onMouseEnter/Leave ---
function HoverZone() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-cyan text-sm font-semibold uppercase tracking-wider">
        onMouseEnter / Leave
      </h3>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`w-32 h-32 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center cursor-default ${
          hovered
            ? "bg-gradient-to-br from-accent-cyan/30 to-accent-blue/30 border-accent-cyan scale-105"
            : "bg-bg-secondary border-border-subtle"
        }`}
      >
        <span
          className={`text-sm font-semibold transition-all duration-300 ${
            hovered ? "text-accent-cyan" : "text-text-muted"
          }`}
        >
          {hovered ? "Survole !" : "Pas survole"}
        </span>
      </div>
      <p className="text-text-muted text-xs font-mono">
        hover = {hovered ? "true" : "false"}
      </p>
    </div>
  );
}

// --- Zone 3: onChange ---
function ChangeZone() {
  const [text, setText] = useState("");

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-yellow text-sm font-semibold uppercase tracking-wider">
        onChange
      </h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tape quelque chose..."
        maxLength={30}
        className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent-yellow transition-colors text-center"
      />
      <div className="w-full h-20 rounded-xl bg-bg-secondary border border-border-subtle flex items-center justify-center overflow-hidden">
        <span
          className={`font-bold transition-all duration-200 ${
            text ? "text-accent-yellow text-2xl" : "text-text-muted text-sm"
          }`}
        >
          {text || "..."}
        </span>
      </div>
      <p className="text-text-muted text-xs font-mono">
        {text.length}/30 caracteres
      </p>
    </div>
  );
}

// --- Zone 4: onDoubleClick ---
const SHAPES = [
  { name: "Cercle", className: "rounded-full" },
  { name: "Carre", className: "rounded-lg" },
  {
    name: "Triangle",
    className: "rounded-none",
    isTriangle: true,
  },
  { name: "Hexagone", className: "rounded-none", isHexagon: true },
] as const;

function DoubleClickZone() {
  const [shapeIndex, setShapeIndex] = useState(0);

  const shape = SHAPES[shapeIndex];

  function handleDoubleClick() {
    setShapeIndex((prev) => (prev + 1) % SHAPES.length);
  }

  function renderShape() {
    if ("isTriangle" in shape && shape.isTriangle) {
      return (
        <div
          className="w-0 h-0 transition-all duration-300"
          style={{
            borderLeft: "40px solid transparent",
            borderRight: "40px solid transparent",
            borderBottom: "70px solid #c084fc",
          }}
        />
      );
    }

    if ("isHexagon" in shape && shape.isHexagon) {
      return (
        <div className="relative w-20 h-20 transition-all duration-300">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="#c084fc" />
          </svg>
        </div>
      );
    }

    return (
      <div
        className={`w-20 h-20 bg-accent-purple transition-all duration-300 ${shape.className}`}
      />
    );
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-purple text-sm font-semibold uppercase tracking-wider">
        onDoubleClick
      </h3>
      <div
        onDoubleClick={handleDoubleClick}
        className="w-32 h-32 rounded-2xl bg-bg-secondary border border-border-subtle flex items-center justify-center cursor-pointer select-none hover:border-accent-purple/50 transition-colors"
      >
        {renderShape()}
      </div>
      <p className="text-accent-purple text-sm font-semibold">{shape.name}</p>
      <p className="text-text-muted text-xs font-mono">double-clique !</p>
    </div>
  );
}

// --- Main EvenementsDemo ---
export default function EvenementsDemo() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <ClickZone />
        <HoverZone />
        <ChangeZone />
        <DoubleClickZone />
      </div>
    </div>
  );
}

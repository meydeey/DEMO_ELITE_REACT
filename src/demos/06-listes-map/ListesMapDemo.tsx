import { useState } from "react";

interface ListItem {
  id: number;
  text: string;
  color: string;
}

const ACCENT_COLORS = [
  "var(--color-accent-pink)",
  "var(--color-accent-purple)",
  "var(--color-accent-blue)",
  "var(--color-accent-cyan)",
  "var(--color-accent-green)",
  "var(--color-accent-yellow)",
  "var(--color-accent-orange)",
  "var(--color-accent-red)",
];

function pickRandomColor(): string {
  return ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
}

export default function ListesMapDemo() {
  const [items, setItems] = useState<ListItem[]>([
    { id: 1, text: "Premier element", color: ACCENT_COLORS[0] },
    { id: 2, text: "Deuxieme element", color: ACCENT_COLORS[2] },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [nextId, setNextId] = useState(3);
  const [showState, setShowState] = useState(false);

  function handleAdd() {
    const text = inputValue.trim();
    if (!text) return;
    setItems((prev) => [
      ...prev,
      { id: nextId, text, color: pickRandomColor() },
    ]);
    setNextId((prev) => prev + 1);
    setInputValue("");
  }

  function handleDelete(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Item count */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-r from-accent-purple/20 to-accent-blue/20 border border-accent-purple/30 rounded-xl px-5 py-3">
          <span className="text-4xl font-bold text-accent-purple">
            {items.length}
          </span>
          <span className="text-text-secondary text-sm ml-2">
            {items.length <= 1 ? "element" : "elements"}
          </span>
        </div>
      </div>

      {/* Input + Add */}
      <div className="bg-bg-card rounded-2xl border border-border-subtle p-5">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tape quelque chose..."
            className="flex-1 bg-bg-secondary border border-border-subtle rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple/50 transition-all"
          />
          <button
            onClick={handleAdd}
            disabled={!inputValue.trim()}
            className="bg-accent-purple hover:bg-accent-purple/80 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium px-5 py-3 rounded-xl text-sm transition-all"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* List */}
      <div className="bg-bg-card rounded-2xl border border-border-subtle p-5 space-y-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="text-5xl mb-3">🫥</div>
            <p className="text-text-secondary text-sm">
              La liste est vide ! Ajoute des elements 👆
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="animate-slide-up flex items-center gap-3 bg-bg-secondary rounded-xl p-4 border border-border-subtle group hover:bg-bg-card-hover transition-colors"
              style={{ borderLeftWidth: 4, borderLeftColor: item.color }}
            >
              <span className="flex-1 text-text-primary text-sm">
                {item.text}
              </span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: `color-mix(in srgb, ${item.color} 20%, transparent)`,
                  color: item.color,
                }}
              >
                id: {item.id}
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg bg-accent-red/15 text-accent-red hover:bg-accent-red/30 transition-all text-sm"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Voir le state */}
      <div className="bg-bg-card rounded-2xl border border-border-subtle overflow-hidden">
        <button
          onClick={() => setShowState(!showState)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-bg-card-hover transition-colors"
        >
          <span className="text-text-primary font-medium text-sm">
            Voir le state
          </span>
          <span
            className={`text-text-muted text-lg transition-transform duration-300 ${
              showState ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
        {showState && (
          <div className="animate-slide-up border-t border-border-subtle p-5">
            <pre className="bg-bg-secondary rounded-xl p-4 text-xs font-mono text-accent-cyan overflow-x-auto">
              {JSON.stringify(items, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

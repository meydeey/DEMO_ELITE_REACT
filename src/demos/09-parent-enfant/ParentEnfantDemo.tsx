import { useState, useCallback } from "react";

function Enfant({ onIncrement }: { onIncrement: () => void }) {
  return (
    <div className="border-2 border-accent-pink rounded-xl p-4 bg-pink-500/5">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-block w-3 h-3 rounded-full bg-accent-pink" />
        <span className="text-accent-pink font-semibold text-sm font-mono">
          {"<Enfant />"}
        </span>
      </div>

      <button
        onClick={onIncrement}
        className="w-full px-4 py-2.5 bg-accent-pink text-white font-semibold rounded-xl hover:opacity-90 transition-opacity active:scale-95"
      >
        Incrementer +1
      </button>
    </div>
  );
}

function Parent({
  count,
  onIncrement,
  flash,
}: {
  count: number;
  onIncrement: () => void;
  flash: boolean;
}) {
  return (
    <div className="border-2 border-accent-cyan rounded-xl p-5 bg-cyan-500/5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-accent-cyan" />
          <span className="text-accent-cyan font-semibold text-sm font-mono">
            {"<Parent />"}
          </span>
        </div>
        <span className="text-text-secondary text-sm">
          count recu ={" "}
          <span className="text-accent-cyan font-bold">{count}</span>
        </span>
      </div>

      {/* Arrow DOWN: props */}
      <div className="flex items-center gap-2 px-3">
        <div className="flex flex-col items-center">
          <svg
            width="20"
            height="40"
            viewBox="0 0 20 40"
            className={`transition-all duration-300 ${flash ? "text-accent-blue drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "text-accent-blue/50"}`}
          >
            <line
              x1="10"
              y1="2"
              x2="10"
              y2="30"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polygon points="4,28 10,38 16,28" fill="currentColor" />
          </svg>
        </div>
        <span
          className={`text-xs font-mono px-2 py-1 rounded-lg transition-all duration-300 ${
            flash
              ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/40"
              : "bg-bg-card text-text-muted border border-border-subtle"
          }`}
        >
          props: count={count}
        </span>
      </div>

      <Enfant onIncrement={onIncrement} />

      {/* Arrow UP: callback */}
      <div className="flex items-center gap-2 px-3">
        <div className="flex flex-col items-center">
          <svg
            width="20"
            height="40"
            viewBox="0 0 20 40"
            className={`transition-all duration-300 ${flash ? "text-accent-orange drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" : "text-accent-orange/50"}`}
          >
            <polygon points="4,12 10,2 16,12" fill="currentColor" />
            <line
              x1="10"
              y1="10"
              x2="10"
              y2="38"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <span
          className={`text-xs font-mono px-2 py-1 rounded-lg transition-all duration-300 ${
            flash
              ? "bg-accent-orange/20 text-accent-orange border border-accent-orange/40"
              : "bg-bg-card text-text-muted border border-border-subtle"
          }`}
        >
          onIncrement()
        </span>
      </div>
    </div>
  );
}

export default function ParentEnfantDemo() {
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(false);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
    setFlash(true);
    setTimeout(() => setFlash(false), 400);
  }, []);

  function handleReset() {
    setCount(0);
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-xl mx-auto">
      {/* GrandParent */}
      <div className="border-2 border-accent-purple rounded-2xl p-6 bg-purple-500/5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-accent-purple" />
            <span className="text-accent-purple font-semibold text-sm font-mono">
              {"<GrandParent />"}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-1.5 bg-bg-card border border-border-subtle text-text-secondary text-sm font-semibold rounded-xl hover:bg-bg-card-hover transition-colors"
          >
            Reset
          </button>
        </div>

        {/* State display */}
        <div className="flex items-center gap-3 bg-bg-card rounded-xl px-4 py-3 border border-border-subtle">
          <span className="text-text-muted text-sm">State :</span>
          <span className="font-mono text-lg text-accent-purple font-bold">
            count = {count}
          </span>
        </div>

        {/* Arrow DOWN: props from GrandParent to Parent */}
        <div className="flex items-center gap-2 px-3">
          <div className="flex flex-col items-center">
            <svg
              width="20"
              height="40"
              viewBox="0 0 20 40"
              className={`transition-all duration-300 ${flash ? "text-accent-blue drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" : "text-accent-blue/50"}`}
            >
              <line
                x1="10"
                y1="2"
                x2="10"
                y2="30"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polygon points="4,28 10,38 16,28" fill="currentColor" />
            </svg>
          </div>
          <span
            className={`text-xs font-mono px-2 py-1 rounded-lg transition-all duration-300 ${
              flash
                ? "bg-accent-blue/20 text-accent-blue border border-accent-blue/40"
                : "bg-bg-card text-text-muted border border-border-subtle"
            }`}
          >
            props: count={count}, onIncrement
          </span>
        </div>

        <Parent count={count} onIncrement={handleIncrement} flash={flash} />

        {/* Arrow UP: callback from Parent to GrandParent */}
        <div className="flex items-center gap-2 px-3">
          <div className="flex flex-col items-center">
            <svg
              width="20"
              height="40"
              viewBox="0 0 20 40"
              className={`transition-all duration-300 ${flash ? "text-accent-orange drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]" : "text-accent-orange/50"}`}
            >
              <polygon points="4,12 10,2 16,12" fill="currentColor" />
              <line
                x1="10"
                y1="10"
                x2="10"
                y2="38"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span
            className={`text-xs font-mono px-2 py-1 rounded-lg transition-all duration-300 ${
              flash
                ? "bg-accent-orange/20 text-accent-orange border border-accent-orange/40"
                : "bg-bg-card text-text-muted border border-border-subtle"
            }`}
          >
            setCount(prev =&gt; prev + 1)
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 justify-center text-xs text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-accent-blue inline-block rounded" />
          Props (descendent)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-accent-orange inline-block rounded" />
          Callbacks (remontent)
        </span>
      </div>
    </div>
  );
}

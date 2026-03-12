import { useState, useEffect, useRef } from "react";

/* ─── Mini Demo 1: Horloge Live ─── */

function HorlogeLive() {
  const [time, setTime] = useState(new Date());
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [paused]);

  const hh = String(time.getHours()).padStart(2, "0");
  const mm = String(time.getMinutes()).padStart(2, "0");
  const ss = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-cyan font-semibold text-sm font-mono">
        Horloge Live
      </h3>

      <div className="flex items-center gap-1 font-mono text-4xl font-bold text-text-primary tabular-nums">
        <span>{hh}</span>
        <span
          className={
            paused ? "text-text-muted" : "animate-pulse text-accent-cyan"
          }
        >
          :
        </span>
        <span>{mm}</span>
        <span
          className={
            paused ? "text-text-muted" : "animate-pulse text-accent-cyan"
          }
        >
          :
        </span>
        <span>{ss}</span>
      </div>

      <button
        onClick={() => setPaused((p) => !p)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          paused
            ? "bg-accent-green/20 text-accent-green border border-accent-green/40 hover:bg-accent-green/30"
            : "bg-accent-red/20 text-accent-red border border-accent-red/40 hover:bg-accent-red/30"
        }`}
      >
        {paused ? "Reprendre" : "Pause"}
      </button>

      <p className="text-text-muted text-xs text-center font-mono">
        {paused ? "clearInterval() appele" : "setInterval(1000ms) actif"}
      </p>
    </div>
  );
}

/* ─── Mini Demo 2: Compteur Auto ─── */

function CompteurAuto() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => setCount((c) => c + 1), 500);
    return () => clearInterval(id);
  }, [isRunning]);

  function handleReset() {
    setIsRunning(false);
    setCount(0);
  }

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 flex flex-col items-center gap-4">
      <h3 className="text-accent-purple font-semibold text-sm font-mono">
        Compteur Auto
      </h3>

      <div className="text-5xl font-bold font-mono text-text-primary tabular-nums">
        {count}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsRunning((r) => !r)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            isRunning
              ? "bg-accent-red/20 text-accent-red border border-accent-red/40 hover:bg-accent-red/30"
              : "bg-accent-green/20 text-accent-green border border-accent-green/40 hover:bg-accent-green/30"
          }`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-bg-card border border-border-subtle text-text-secondary text-sm font-semibold rounded-xl hover:bg-bg-card-hover transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-text-muted text-xs text-center font-mono">
        dep: [isRunning={String(isRunning)}]
      </p>
    </div>
  );
}

/* ─── Mini Demo 3: Faux API Fetch ─── */

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };

const FAKE_DATA = [
  "React 19 - Server Components",
  "TypeScript 5.4 - NoInfer",
  "Tailwind v4 - CSS-first config",
  "Vite 6 - Environment API",
  "Bun 1.2 - Node compat++",
];

function FauxApiFetch() {
  const [state, setState] = useState<FetchState>({ status: "idle" });
  const abortRef = useRef(false);

  function triggerFetch() {
    abortRef.current = false;
    setState({ status: "loading" });
  }

  useEffect(() => {
    if (state.status !== "loading") return;

    const timer = setTimeout(() => {
      if (abortRef.current) return;

      if (Math.random() < 0.2) {
        setState({
          status: "error",
          message: "Erreur 500 — Serveur indisponible",
        });
      } else {
        const count = 3 + Math.floor(Math.random() * 3);
        const shuffled = [...FAKE_DATA].sort(() => Math.random() - 0.5);
        setState({ status: "success", data: shuffled.slice(0, count) });
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      abortRef.current = true;
    };
  }, [state.status]);

  return (
    <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-accent-orange font-semibold text-sm font-mono text-center">
        Faux API Fetch
      </h3>

      <div className="min-h-[140px] flex flex-col items-center justify-center gap-3">
        {state.status === "idle" && (
          <p className="text-text-muted text-sm text-center">
            Clique pour simuler un appel API
          </p>
        )}

        {state.status === "loading" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-accent-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-accent-orange text-sm font-mono">
              fetch("/api/data")...
            </span>
          </div>
        )}

        {state.status === "success" && (
          <ul className="w-full space-y-2 animate-fade-in">
            {state.data.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 bg-bg-card-hover rounded-lg px-3 py-2 text-sm text-text-primary"
              >
                <span className="text-accent-green text-xs">●</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {state.status === "error" && (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-accent-red/20 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent-red"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <p className="text-accent-red text-sm font-semibold">
              {state.message}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={triggerFetch}
        disabled={state.status === "loading"}
        className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
          state.status === "loading"
            ? "bg-bg-card-hover text-text-muted cursor-not-allowed"
            : "bg-accent-orange/20 text-accent-orange border border-accent-orange/40 hover:bg-accent-orange/30"
        }`}
      >
        {state.status === "idle" && "Charger les donnees"}
        {state.status === "loading" && "Chargement..."}
        {(state.status === "success" || state.status === "error") &&
          "Recharger"}
      </button>

      <p className="text-text-muted text-xs text-center font-mono">
        {state.status === "loading"
          ? "useEffect → setTimeout(2000)"
          : state.status === "error"
            ? "20% chance d'erreur"
            : "cleanup: clearTimeout"}
      </p>
    </div>
  );
}

/* ─── Main Demo ─── */

export default function UseEffectDemo() {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HorlogeLive />
        <CompteurAuto />
        <FauxApiFetch />
      </div>
    </div>
  );
}

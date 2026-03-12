import { useState } from "react";

const POOL: [string, string][] = [
  ["Alice", "\u{1F469}\u200D\u{1F4BB}"],
  ["Bob", "\u{1F9D1}\u200D\u{1F3A8}"],
  ["Charlie", "\u{1F98A}"],
  ["Diana", "\u{1F680}"],
  ["Eve", "\u{1F3B8}"],
  ["Frank", "\u{1F3AF}"],
  ["Grace", "\u{1F31F}"],
  ["Hacker", "\u{1F480}"],
];

const GRADIENTS = [
  "from-pink-500/20 to-purple-500/20",
  "from-blue-500/20 to-cyan-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-orange-500/20 to-yellow-500/20",
  "from-red-500/20 to-pink-500/20",
  "from-violet-500/20 to-indigo-500/20",
  "from-teal-500/20 to-sky-500/20",
  "from-amber-500/20 to-lime-500/20",
];

const BORDER_COLORS = [
  "border-accent-pink",
  "border-accent-blue",
  "border-accent-green",
  "border-accent-orange",
  "border-accent-red",
  "border-accent-purple",
  "border-accent-cyan",
  "border-accent-yellow",
];

interface ProfileCardProps {
  name: string;
  emoji: string;
  gradient: string;
  borderColor: string;
}

function ProfileCard({ name, emoji, gradient, borderColor }: ProfileCardProps) {
  return (
    <div
      className={`animate-bounce-in bg-gradient-to-br ${gradient} border ${borderColor} rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform cursor-default`}
    >
      <span className="text-5xl">{emoji}</span>
      <span className="text-text-primary font-semibold text-lg">{name}</span>
      <span className="text-text-muted text-xs font-mono">
        {"<ProfileCard />"}
      </span>
    </div>
  );
}

export default function ComposantsDemo() {
  const [cards, setCards] = useState<ProfileCardProps[]>([]);
  const [poolIndex, setPoolIndex] = useState(0);

  function addCard() {
    const [name, emoji] = POOL[poolIndex % POOL.length];
    const gradient = GRADIENTS[poolIndex % GRADIENTS.length];
    const borderColor = BORDER_COLORS[poolIndex % BORDER_COLORS.length];
    setCards((prev) => [...prev, { name, emoji, gradient, borderColor }]);
    setPoolIndex((prev) => prev + 1);
  }

  function reset() {
    setCards([]);
    setPoolIndex(0);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          onClick={addCard}
          className="px-5 py-2.5 bg-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          + Ajouter un composant
        </button>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-bg-card border border-border-subtle text-text-secondary font-semibold rounded-xl hover:bg-bg-card-hover transition-colors"
        >
          Reset
        </button>
        <span className="ml-auto text-text-muted text-sm font-mono">
          {cards.length} composant{cards.length !== 1 ? "s" : ""}
        </span>
      </div>

      {cards.length === 0 ? (
        <div className="flex items-center justify-center h-48 border-2 border-dashed border-border-subtle rounded-2xl">
          <p className="text-text-muted text-sm">
            Clique sur "Ajouter" pour creer des composants
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <ProfileCard key={i} {...card} />
          ))}
        </div>
      )}
    </div>
  );
}

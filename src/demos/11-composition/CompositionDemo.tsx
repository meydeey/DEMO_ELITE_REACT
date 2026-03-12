import { useState, type ReactNode } from "react";

type WrapperName = "glow" | "gradient" | "spotlight";
type ContentName = "texte" | "image" | "liste";

function GlowCard({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 bg-bg-card border border-border-subtle"
      style={{
        boxShadow:
          "0 0 15px rgba(168,85,247,0.4), 0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(59,130,246,0.15)",
      }}
    >
      {children}
    </div>
  );
}

function GradientBorder({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl p-[3px] bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500">
      <div className="rounded-[13px] p-6 bg-bg-card">{children}</div>
    </div>
  );
}

function Spotlight({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6 border border-border-subtle"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.25) 0%, rgba(168,85,247,0.1) 40%, rgba(15,15,20,0.95) 80%)",
      }}
    >
      {children}
    </div>
  );
}

const WRAPPERS: { key: WrapperName; label: string; color: string }[] = [
  { key: "glow", label: "GlowCard", color: "bg-accent-purple" },
  { key: "gradient", label: "GradientBorder", color: "bg-accent-pink" },
  { key: "spotlight", label: "Spotlight", color: "bg-accent-blue" },
];

const CONTENTS: { key: ContentName; label: string }[] = [
  { key: "texte", label: "Texte" },
  { key: "image", label: "Image placeholder" },
  { key: "liste", label: "Liste" },
];

function TextContent() {
  return (
    <div className="space-y-2">
      <h3 className="text-text-primary font-bold text-lg">Hello React!</h3>
      <p className="text-text-secondary text-sm">
        Ce contenu est passe via{" "}
        <span className="text-accent-cyan font-mono">children</span>.
      </p>
    </div>
  );
}

function ImageContent() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center text-4xl">
        <span role="img" aria-label="art">
          &#x1F3A8;
        </span>
      </div>
      <span className="text-text-muted text-xs">Image placeholder</span>
    </div>
  );
}

function ListContent() {
  const items = [
    { emoji: "\u26A1", text: "Rapide" },
    { emoji: "\u{1F3A8}", text: "Flexible" },
    { emoji: "\u{1F9E9}", text: "Composable" },
  ];
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-center gap-2 text-text-primary text-sm"
        >
          <span className="text-lg">{item.emoji}</span>
          {item.text}
        </li>
      ))}
    </ul>
  );
}

function CodeHint({ wrapper }: { wrapper: WrapperName }) {
  const names: Record<WrapperName, string> = {
    glow: "GlowCard",
    gradient: "GradientBorder",
    spotlight: "Spotlight",
  };
  return (
    <div className="mt-4 rounded-xl bg-bg-card border border-border-subtle p-3 font-mono text-xs text-text-muted text-center">
      <span className="text-accent-purple">&lt;{names[wrapper]}&gt;</span>
      <span className="text-accent-cyan">{"{children}"}</span>
      <span className="text-accent-purple">&lt;/{names[wrapper]}&gt;</span>
    </div>
  );
}

export default function CompositionDemo() {
  const [activeWrapper, setActiveWrapper] = useState<WrapperName>("glow");
  const [activeContent, setActiveContent] = useState<ContentName>("texte");

  const contentMap: Record<ContentName, ReactNode> = {
    texte: <TextContent />,
    image: <ImageContent />,
    liste: <ListContent />,
  };

  const wrapperMap: Record<WrapperName, (children: ReactNode) => ReactNode> = {
    glow: (children) => <GlowCard>{children}</GlowCard>,
    gradient: (children) => <GradientBorder>{children}</GradientBorder>,
    spotlight: (children) => <Spotlight>{children}</Spotlight>,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Control panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Wrapper selector */}
        <div className="bg-bg-card rounded-2xl border border-border-subtle p-4 space-y-3">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
            Wrapper
          </p>
          <div className="flex flex-wrap gap-2">
            {WRAPPERS.map((w) => (
              <button
                key={w.key}
                onClick={() => setActiveWrapper(w.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeWrapper === w.key
                    ? `${w.color} text-white scale-105`
                    : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content selector */}
        <div className="bg-bg-card rounded-2xl border border-border-subtle p-4 space-y-3">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-wider">
            Contenu (children)
          </p>
          <div className="flex flex-wrap gap-2">
            {CONTENTS.map((c) => (
              <button
                key={c.key}
                onClick={() => setActiveContent(c.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeContent === c.key
                    ? "bg-accent-cyan text-white scale-105"
                    : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="flex justify-center text-text-muted text-2xl animate-bounce-in">
        &#x2193; &#x2193; &#x2193;
      </div>

      {/* Preview area */}
      <div className="flex justify-center">
        <div
          className="w-full max-w-sm animate-bounce-in"
          key={`${activeWrapper}-${activeContent}`}
        >
          {wrapperMap[activeWrapper](contentMap[activeContent])}
        </div>
      </div>

      {/* Code hint */}
      <CodeHint wrapper={activeWrapper} />
    </div>
  );
}

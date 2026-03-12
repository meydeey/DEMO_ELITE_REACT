import { useState } from "react";

type Theme = "sombre" | "clair" | "ocean";
type Langue = "FR" | "EN";
type TaillePolice = "petit" | "moyen" | "grand";

const THEME_STYLES: Record<
  Theme,
  { bg: string; text: string; border: string }
> = {
  sombre: {
    bg: "bg-gray-900",
    text: "text-gray-100",
    border: "border-gray-700",
  },
  clair: {
    bg: "bg-white",
    text: "text-gray-900",
    border: "border-gray-300",
  },
  ocean: {
    bg: "bg-blue-900",
    text: "text-white",
    border: "border-blue-500",
  },
};

const THEME_LABELS: Record<Theme, { emoji: string; label: string }> = {
  sombre: { emoji: "\u{1F31A}", label: "Sombre" },
  clair: { emoji: "\u2600\uFE0F", label: "Clair" },
  ocean: { emoji: "\u{1F30A}", label: "Ocean" },
};

const FONT_SIZES: Record<TaillePolice, { px: string; label: string }> = {
  petit: { px: "14px", label: "Petit" },
  moyen: { px: "16px", label: "Moyen" },
  grand: { px: "20px", label: "Grand" },
};

const TRANSLATIONS: Record<
  Langue,
  {
    headerTitle: string;
    contentText: string;
    footerText: string;
  }
> = {
  FR: {
    headerTitle: "Mon Application",
    contentText:
      "Les trois composants partagent le meme etat. Changez le theme, la langue ou la taille pour voir l'effet en direct !",
    footerText: "\u00A9 2026 React Demo. Tous droits reserves.",
  },
  EN: {
    headerTitle: "My Application",
    contentText:
      "All three components share the same state. Change the theme, language, or size to see the live effect!",
    footerText: "\u00A9 2026 React Demo. All rights reserved.",
  },
};

function HeaderPreview({
  theme,
  langue,
  taille,
}: {
  theme: Theme;
  langue: Langue;
  taille: TaillePolice;
}) {
  const styles = THEME_STYLES[theme];
  const t = TRANSLATIONS[langue];
  return (
    <div
      className={`${styles.bg} ${styles.text} ${styles.border} border rounded-t-xl p-4 transition-all duration-300`}
      style={{ fontSize: FONT_SIZES[taille].px }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold">{t.headerTitle}</span>
        <div className="flex gap-1">
          <span className="w-3 h-3 rounded-full bg-accent-red inline-block" />
          <span className="w-3 h-3 rounded-full bg-accent-yellow inline-block" />
          <span className="w-3 h-3 rounded-full bg-accent-green inline-block" />
        </div>
      </div>
    </div>
  );
}

function ContentPreview({
  theme,
  langue,
  taille,
}: {
  theme: Theme;
  langue: Langue;
  taille: TaillePolice;
}) {
  const styles = THEME_STYLES[theme];
  const t = TRANSLATIONS[langue];
  return (
    <div
      className={`${styles.bg} ${styles.text} ${styles.border} border-x p-5 transition-all duration-300 min-h-[80px]`}
      style={{ fontSize: FONT_SIZES[taille].px }}
    >
      <p className="leading-relaxed">{t.contentText}</p>
    </div>
  );
}

function FooterPreview({
  theme,
  langue,
  taille,
}: {
  theme: Theme;
  langue: Langue;
  taille: TaillePolice;
}) {
  const styles = THEME_STYLES[theme];
  const t = TRANSLATIONS[langue];
  return (
    <div
      className={`${styles.bg} ${styles.text} ${styles.border} border rounded-b-xl p-3 transition-all duration-300 opacity-70`}
      style={{ fontSize: FONT_SIZES[taille].px }}
    >
      <p className="text-center" style={{ fontSize: "0.85em" }}>
        {t.footerText}
      </p>
    </div>
  );
}

export default function EtatPartageDemo() {
  const [theme, setTheme] = useState<Theme>("sombre");
  const [langue, setLangue] = useState<Langue>("FR");
  const [taille, setTaille] = useState<TaillePolice>("moyen");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Control panel */}
      <div className="bg-bg-card rounded-2xl border border-border-subtle p-4 space-y-4">
        <p className="text-text-muted text-xs font-semibold uppercase tracking-wider text-center">
          Etat partage (Parent)
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Theme */}
          <div className="space-y-2">
            <p className="text-text-secondary text-xs font-semibold">Theme</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(THEME_LABELS) as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    theme === t
                      ? "bg-accent-purple text-white scale-105"
                      : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {THEME_LABELS[t].emoji} {THEME_LABELS[t].label}
                </button>
              ))}
            </div>
          </div>

          {/* Langue */}
          <div className="space-y-2">
            <p className="text-text-secondary text-xs font-semibold">Langue</p>
            <div className="flex gap-2">
              {(["FR", "EN"] as Langue[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLangue(l)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    langue === l
                      ? "bg-accent-cyan text-white scale-105"
                      : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {l === "FR" ? "\u{1F1EB}\u{1F1F7}" : "\u{1F1EC}\u{1F1E7}"} {l}
                </button>
              ))}
            </div>
          </div>

          {/* Taille */}
          <div className="space-y-2">
            <p className="text-text-secondary text-xs font-semibold">
              Taille police
            </p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(FONT_SIZES) as TaillePolice[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTaille(t)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    taille === t
                      ? "bg-accent-orange text-white scale-105"
                      : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {FONT_SIZES[t].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animated arrows */}
      <div className="flex justify-around text-text-muted px-8">
        <div className="flex flex-col items-center animate-bounce-in">
          <div className="w-px h-6 bg-accent-purple" />
          <span className="text-accent-purple text-lg">&#x2193;</span>
        </div>
        <div
          className="flex flex-col items-center animate-bounce-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-px h-6 bg-accent-cyan" />
          <span className="text-accent-cyan text-lg">&#x2193;</span>
        </div>
        <div
          className="flex flex-col items-center animate-bounce-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-px h-6 bg-accent-orange" />
          <span className="text-accent-orange text-lg">&#x2193;</span>
        </div>
      </div>

      {/* Sibling components labels */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <span className="text-accent-purple text-xs font-mono">props</span>
        <span className="text-accent-cyan text-xs font-mono">props</span>
        <span className="text-accent-orange text-xs font-mono">props</span>
      </div>

      {/* Preview: 3 sibling components stacked to form a mini app */}
      <div className="rounded-2xl overflow-hidden border border-border-subtle animate-slide-up">
        <div className="grid grid-cols-1">
          {/* Label + Header */}
          <div className="relative">
            <span className="absolute -top-0 right-2 text-accent-pink text-[10px] font-mono bg-bg-card px-2 rounded-b z-10">
              {"<HeaderPreview />"}
            </span>
            <HeaderPreview theme={theme} langue={langue} taille={taille} />
          </div>

          {/* Label + Content */}
          <div className="relative">
            <span className="absolute top-1 right-2 text-accent-green text-[10px] font-mono z-10">
              {"<ContentPreview />"}
            </span>
            <ContentPreview theme={theme} langue={langue} taille={taille} />
          </div>

          {/* Label + Footer */}
          <div className="relative">
            <span className="absolute top-1 right-2 text-accent-yellow text-[10px] font-mono z-10">
              {"<FooterPreview />"}
            </span>
            <FooterPreview theme={theme} langue={langue} taille={taille} />
          </div>
        </div>
      </div>
    </div>
  );
}

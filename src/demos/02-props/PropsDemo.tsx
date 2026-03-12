import { useState } from "react";

type Taille = "sm" | "md" | "lg";

const TAILLE_CLASSES: Record<Taille, string> = {
  sm: "p-4 text-sm max-w-[200px]",
  md: "p-6 text-base max-w-[280px]",
  lg: "p-8 text-lg max-w-[360px]",
};

const COLOR_OPTIONS = [
  { value: "#ff6b9d", label: "Rose" },
  { value: "#c084fc", label: "Violet" },
  { value: "#60a5fa", label: "Bleu" },
  { value: "#22d3ee", label: "Cyan" },
  { value: "#4ade80", label: "Vert" },
  { value: "#fb923c", label: "Orange" },
];

interface PreviewCardProps {
  titre: string;
  description: string;
  couleur: string;
  taille: Taille;
}

function PreviewCard({
  titre,
  description,
  couleur,
  taille,
}: PreviewCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 transition-all duration-300 ${TAILLE_CLASSES[taille]}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${couleur} 15%, transparent)`,
        borderColor: `color-mix(in srgb, ${couleur} 40%, transparent)`,
      }}
    >
      <h3 className="font-bold mb-2 transition-all" style={{ color: couleur }}>
        {titre || "..."}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description || "..."}
      </p>
      <div
        className="mt-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: couleur }}
      />
    </div>
  );
}

export default function PropsDemo() {
  const [titre, setTitre] = useState("Mon Composant");
  const [description, setDescription] = useState("Les props controlent tout !");
  const [couleur, setCouleur] = useState("#c084fc");
  const [taille, setTaille] = useState<Taille>("md");

  const tailles: Taille[] = ["sm", "md", "lg"];

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left panel: form inputs */}
        <div className="space-y-5">
          <div className="bg-bg-card rounded-2xl border border-border-subtle p-5 space-y-5">
            {/* Titre input */}
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-mono flex items-center gap-2">
                titre
                <span className="text-accent-purple">=</span>
              </label>
              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-purple transition-colors"
                placeholder="Titre du composant"
              />
            </div>

            {/* Description input */}
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-mono flex items-center gap-2">
                description
                <span className="text-accent-purple">=</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-bg-secondary border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-purple transition-colors resize-none"
                placeholder="Description"
              />
            </div>

            {/* Color picker */}
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-mono flex items-center gap-2">
                couleur
                <span className="text-accent-purple">=</span>
              </label>
              <div className="flex gap-2 flex-wrap">
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setCouleur(c.value)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all hover:scale-110 ${
                      couleur === c.value
                        ? "border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Taille selector */}
            <div className="space-y-2">
              <label className="text-text-secondary text-sm font-mono flex items-center gap-2">
                taille
                <span className="text-accent-purple">=</span>
              </label>
              <div className="flex gap-2">
                {tailles.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTaille(t)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      taille === t
                        ? "bg-accent-purple text-white"
                        : "bg-bg-secondary text-text-secondary border border-border-subtle hover:bg-bg-card-hover"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Props display */}
          <div className="bg-bg-card rounded-2xl border border-border-subtle p-4">
            <p className="text-text-muted text-xs font-mono leading-relaxed">
              <span className="text-accent-cyan">{"<PreviewCard"}</span>
              <br />
              {"  "}
              <span className="text-accent-yellow">titre</span>
              <span className="text-accent-purple">=</span>
              <span className="text-accent-green">"{titre}"</span>
              <br />
              {"  "}
              <span className="text-accent-yellow">description</span>
              <span className="text-accent-purple">=</span>
              <span className="text-accent-green">"{description}"</span>
              <br />
              {"  "}
              <span className="text-accent-yellow">couleur</span>
              <span className="text-accent-purple">=</span>
              <span className="text-accent-green">"{couleur}"</span>
              <br />
              {"  "}
              <span className="text-accent-yellow">taille</span>
              <span className="text-accent-purple">=</span>
              <span className="text-accent-green">"{taille}"</span>
              <br />
              <span className="text-accent-cyan">{"/>"}</span>
            </p>
          </div>
        </div>

        {/* Right panel: preview */}
        <div className="flex items-center justify-center min-h-[300px] bg-bg-card rounded-2xl border border-border-subtle p-8">
          <div className="animate-fade-in" key={`${couleur}-${taille}`}>
            <PreviewCard
              titre={titre}
              description={description}
              couleur={couleur}
              taille={taille}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

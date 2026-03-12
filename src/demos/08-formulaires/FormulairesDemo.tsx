import { useState } from "react";

type Niveau = "debutant" | "intermediaire" | "expert";

interface FormData {
  nom: string;
  email: string;
  bio: string;
  niveau: Niveau;
  newsletter: boolean;
}

const INITIAL_FORM: FormData = {
  nom: "",
  email: "",
  bio: "",
  niveau: "debutant",
  newsletter: false,
};

const NIVEAU_CONFIG: Record<
  Niveau,
  { label: string; color: string; bg: string }
> = {
  debutant: {
    label: "Debutant",
    color: "text-accent-green",
    bg: "bg-accent-green/20 border-accent-green/40",
  },
  intermediaire: {
    label: "Intermediaire",
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/20 border-accent-yellow/40",
  },
  expert: {
    label: "Expert",
    color: "text-accent-red",
    bg: "bg-accent-red/20 border-accent-red/40",
  },
};

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-text-secondary text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function BusinessCard({ data }: { data: FormData }) {
  const isEmpty = !data.nom && !data.email && !data.bio;
  const niveauCfg = NIVEAU_CONFIG[data.niveau];

  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-accent-purple/30 rounded-2xl p-6 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-pink/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-text-muted text-sm text-center">
            Remplis le formulaire pour voir ta carte
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col gap-3 flex-1">
          {/* Name */}
          <h3 className="text-2xl font-bold text-text-primary break-words">
            {data.nom || "..."}
          </h3>

          {/* Email */}
          {data.email && (
            <div className="flex items-center gap-2 text-accent-cyan text-sm">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="break-all">{data.email}</span>
            </div>
          )}

          {/* Bio */}
          {data.bio && (
            <p className="text-text-secondary text-sm leading-relaxed mt-1 break-words">
              {data.bio}
            </p>
          )}

          {/* Bottom row: badge + newsletter */}
          <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border-subtle">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${niveauCfg.bg} ${niveauCfg.color}`}
            >
              {data.niveau === "debutant" && "🌱"}
              {data.niveau === "intermediaire" && "🔥"}
              {data.niveau === "expert" && "💎"}
              {niveauCfg.label}
            </span>

            {data.newsletter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-accent-blue/20 border-accent-blue/40 text-accent-blue">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                Newsletter
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FormulairesDemo() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [toast, setToast] = useState(false);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }

  function handleReset() {
    setForm(INITIAL_FORM);
  }

  const inputClasses =
    "w-full bg-bg-card border border-border-subtle rounded-xl px-4 py-2.5 text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent-purple/60 focus:ring-1 focus:ring-accent-purple/30 transition-all";

  return (
    <div className="animate-fade-in space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Nom">
            <input
              type="text"
              value={form.nom}
              onChange={(e) => updateField("nom", e.target.value)}
              placeholder="Jean Dupont"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="jean@exemple.com"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Bio">
            <textarea
              value={form.bio}
              onChange={(e) => updateField("bio", e.target.value)}
              placeholder="Quelques mots sur toi..."
              rows={3}
              className={`${inputClasses} resize-none`}
            />
          </FormField>

          <FormField label="Niveau">
            <select
              value={form.niveau}
              onChange={(e) => updateField("niveau", e.target.value as Niveau)}
              className={`${inputClasses} cursor-pointer`}
            >
              <option value="debutant">🌱 Debutant</option>
              <option value="intermediaire">🔥 Intermediaire</option>
              <option value="expert">💎 Expert</option>
            </select>
          </FormField>

          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={form.newsletter}
                onChange={(e) => updateField("newsletter", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-border-subtle rounded-md bg-bg-card peer-checked:bg-accent-purple peer-checked:border-accent-purple transition-all flex items-center justify-center">
                {form.newsletter && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
              S'abonner a la newsletter
            </span>
          </label>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-accent-purple text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Envoyer
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 bg-bg-card border border-border-subtle text-text-secondary font-semibold rounded-xl hover:bg-bg-card-hover transition-colors"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Right: Business Card Preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-text-muted text-xs font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-green animate-pulse-glow" />
            Apercu en temps reel
          </div>
          <BusinessCard data={form} />
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-accent-green/20 border border-accent-green/40 text-accent-green px-5 py-3 rounded-xl flex items-center gap-3 shadow-lg shadow-black/20">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="font-semibold text-sm">
              Formulaire envoye avec succes !
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

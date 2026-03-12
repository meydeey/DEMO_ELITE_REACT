import { useState } from "react";

type Status = "loading" | "success" | "error";

function ToggleCard() {
  return (
    <div className="animate-bounce-in bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 border border-accent-purple/30 rounded-xl p-5">
      <div className="text-4xl mb-3">🦄</div>
      <h4 className="text-text-primary font-bold text-lg mb-1">
        Carte Magique
      </h4>
      <p className="text-text-secondary text-sm">
        Je suis visible grace a <code className="text-accent-purple">&&</code>
      </p>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="animate-slide-up flex items-center gap-4 bg-gradient-to-r from-accent-green/15 to-accent-cyan/15 border border-accent-green/30 rounded-xl p-5">
      <div className="text-5xl">🧑‍💻</div>
      <div>
        <h4 className="text-text-primary font-bold text-lg">Alex Dev</h4>
        <p className="text-accent-green text-sm font-medium">
          Fullstack Engineer
        </p>
        <p className="text-text-muted text-xs mt-1">Connecte depuis 2h</p>
      </div>
    </div>
  );
}

function LoginPlaceholder() {
  return (
    <div className="animate-slide-up flex flex-col items-center gap-3 bg-gradient-to-r from-accent-orange/15 to-accent-red/15 border border-accent-orange/30 rounded-xl p-5">
      <div className="text-4xl">🔒</div>
      <p className="text-text-secondary text-sm text-center">
        Connecte-toi pour voir ton profil
      </p>
      <div className="w-full max-w-[200px] h-9 bg-bg-card rounded-lg border border-border-subtle" />
      <div className="w-full max-w-[200px] h-9 bg-bg-card rounded-lg border border-border-subtle" />
      <div className="w-full max-w-[120px] h-9 bg-accent-orange/30 rounded-lg" />
    </div>
  );
}

function StatusLoading() {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-3 py-4">
      <div className="w-10 h-10 border-3 border-accent-blue border-t-transparent rounded-full animate-spin" />
      <p className="text-accent-blue text-sm font-medium">Chargement...</p>
    </div>
  );
}

function StatusSuccess() {
  return (
    <div className="animate-bounce-in flex flex-col items-center gap-3 py-4">
      <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center text-2xl">
        ✅
      </div>
      <p className="text-accent-green text-sm font-medium">
        Operation reussie !
      </p>
    </div>
  );
}

function StatusError() {
  return (
    <div className="animate-bounce-in flex flex-col items-center gap-3 py-4">
      <div className="w-12 h-12 rounded-full bg-accent-red/20 flex items-center justify-center text-2xl">
        ❌
      </div>
      <p className="text-accent-red text-sm font-medium">Erreur de connexion</p>
    </div>
  );
}

const statusComponents: Record<Status, React.FC> = {
  loading: StatusLoading,
  success: StatusSuccess,
  error: StatusError,
};

export default function RenduConditionnelDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState<Status>("loading");

  const ActiveStatusComponent = statusComponents[status];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section 1: Toggle show/hide */}
      <section className="bg-bg-card rounded-2xl border border-border-subtle p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-text-primary font-bold text-lg">
              Toggle Show/Hide
            </h3>
            <code className="text-accent-pink text-xs">
              {"{ isVisible && <Card /> }"}
            </code>
          </div>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              isVisible ? "bg-accent-purple" : "bg-bg-card-hover"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                isVisible ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="min-h-[120px] flex items-center justify-center">
          {isVisible ? (
            <ToggleCard />
          ) : (
            <p className="text-text-muted text-sm italic">
              Active le toggle pour voir la carte
            </p>
          )}
        </div>
      </section>

      {/* Section 2: Connecte / Deconnecte */}
      <section className="bg-bg-card rounded-2xl border border-border-subtle p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-text-primary font-bold text-lg">
              Connecte / Deconnecte
            </h3>
            <code className="text-accent-cyan text-xs">
              {"{ isLoggedIn ? <Profile /> : <Login /> }"}
            </code>
          </div>
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              isLoggedIn
                ? "bg-accent-red/20 text-accent-red hover:bg-accent-red/30"
                : "bg-accent-green/20 text-accent-green hover:bg-accent-green/30"
            }`}
          >
            {isLoggedIn ? "Se deconnecter" : "Se connecter"}
          </button>
        </div>

        <div className="min-h-[140px]">
          {isLoggedIn ? <ProfileCard /> : <LoginPlaceholder />}
        </div>
      </section>

      {/* Section 3: Status */}
      <section className="bg-bg-card rounded-2xl border border-border-subtle p-6">
        <div className="mb-5">
          <h3 className="text-text-primary font-bold text-lg mb-1">Status</h3>
          <code className="text-accent-yellow text-xs">
            {"statusComponents[status]"}
          </code>
        </div>

        <div className="flex gap-3 mb-5">
          {(["loading", "success", "error"] as Status[]).map((s) => {
            const colorMap: Record<Status, string> = {
              loading: "accent-blue",
              success: "accent-green",
              error: "accent-red",
            };
            const labelMap: Record<Status, string> = {
              loading: "Loading",
              success: "Success",
              error: "Error",
            };
            const color = colorMap[s];
            return (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  status === s
                    ? `bg-${color}/25 text-${color} ring-2 ring-${color}/50`
                    : "bg-bg-card-hover text-text-secondary hover:text-text-primary"
                }`}
              >
                {labelMap[s]}
              </button>
            );
          })}
        </div>

        <div className="bg-bg-secondary rounded-xl border border-border-subtle min-h-[100px] flex items-center justify-center">
          <ActiveStatusComponent key={status} />
        </div>
      </section>
    </div>
  );
}

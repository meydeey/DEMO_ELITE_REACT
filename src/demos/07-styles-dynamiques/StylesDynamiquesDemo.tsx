import { useState } from "react";

interface StyleState {
  rotation: number;
  size: number;
  opacity: number;
  borderRadius: number;
  bgColor: string;
}

const DEFAULT_STATE: StyleState = {
  rotation: 15,
  size: 160,
  opacity: 1,
  borderRadius: 20,
  bgColor: "#c084fc",
};

function randomBetween(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

function randomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 75%, 60%)`;
}

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit: string;
  color: string;
  onChange: (value: number) => void;
}

function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  color,
  onChange,
}: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-text-secondary text-sm">{label}</label>
        <span className="text-sm font-mono" style={{ color }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer bg-bg-secondary"
        style={{
          accentColor: color,
        }}
      />
    </div>
  );
}

export default function StylesDynamiquesDemo() {
  const [styles, setStyles] = useState<StyleState>(DEFAULT_STATE);

  function update<K extends keyof StyleState>(key: K, value: StyleState[K]) {
    setStyles((prev) => ({ ...prev, [key]: value }));
  }

  function randomize() {
    setStyles({
      rotation: randomBetween(0, 360),
      size: randomBetween(80, 280),
      opacity: Number((Math.random() * 0.7 + 0.3).toFixed(1)),
      borderRadius: randomBetween(0, 50),
      bgColor: randomColor(),
    });
  }

  const targetStyle: React.CSSProperties = {
    width: styles.size,
    height: styles.size,
    transform: `rotate(${styles.rotation}deg)`,
    opacity: styles.opacity,
    borderRadius: `${styles.borderRadius}%`,
    backgroundColor: styles.bgColor,
    transition: "all 0.3s ease",
  };

  const cssText = `{
  width: ${styles.size}px;
  height: ${styles.size}px;
  transform: rotate(${styles.rotation}deg);
  opacity: ${styles.opacity};
  border-radius: ${styles.borderRadius}%;
  background-color: ${styles.bgColor};
}`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Target element */}
        <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 flex flex-col items-center justify-center min-h-[360px]">
          <div className="bg-[image:repeating-conic-gradient(rgba(255,255,255,0.03)_0%_25%,transparent_0%_50%)] bg-[size:20px_20px] w-full flex-1 flex items-center justify-center rounded-xl">
            <div style={targetStyle} className="shadow-lg" />
          </div>

          {/* CSS output */}
          <div className="w-full mt-4">
            <pre className="bg-bg-secondary rounded-xl p-4 text-xs font-mono text-accent-cyan overflow-x-auto border border-border-subtle">
              <span className="text-accent-purple">.element</span>
              <span className="text-text-muted"> {cssText}</span>
            </pre>
          </div>
        </div>

        {/* Control panel */}
        <div className="bg-bg-card rounded-2xl border border-border-subtle p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-text-primary font-bold text-lg">Controles</h3>
            <button
              onClick={randomize}
              className="bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium px-4 py-2 rounded-xl text-sm hover:opacity-90 transition-opacity"
            >
              🎲 Random
            </button>
          </div>

          <SliderControl
            label="Rotation"
            value={styles.rotation}
            min={0}
            max={360}
            unit="deg"
            color="var(--color-accent-pink)"
            onChange={(v) => update("rotation", v)}
          />

          <SliderControl
            label="Taille"
            value={styles.size}
            min={50}
            max={300}
            unit="px"
            color="var(--color-accent-purple)"
            onChange={(v) => update("size", v)}
          />

          <SliderControl
            label="Opacite"
            value={styles.opacity}
            min={0}
            max={1}
            step={0.1}
            unit=""
            color="var(--color-accent-blue)"
            onChange={(v) => update("opacity", v)}
          />

          <SliderControl
            label="Border-radius"
            value={styles.borderRadius}
            min={0}
            max={50}
            unit="%"
            color="var(--color-accent-cyan)"
            onChange={(v) => update("borderRadius", v)}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-text-secondary text-sm">Couleur</label>
              <span className="text-sm font-mono text-accent-green">
                {styles.bgColor}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={styles.bgColor}
                onChange={(e) => update("bgColor", e.target.value)}
                className="w-10 h-10 rounded-lg border-none cursor-pointer bg-transparent"
              />
              <div
                className="flex-1 h-10 rounded-lg border border-border-subtle"
                style={{ backgroundColor: styles.bgColor }}
              />
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => setStyles(DEFAULT_STATE)}
            className="w-full bg-bg-secondary hover:bg-bg-card-hover text-text-secondary hover:text-text-primary border border-border-subtle rounded-xl py-2.5 text-sm transition-all"
          >
            Reinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}

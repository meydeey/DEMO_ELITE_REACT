import { categoryMeta } from "@/types/demo";
import type { DemoCategory } from "@/types/demo";

interface DemoHeaderProps {
  title: string;
  description: string;
  icon: string;
  category: DemoCategory;
}

export default function DemoHeader({
  title,
  description,
  icon,
  category,
}: DemoHeaderProps) {
  const meta = categoryMeta[category];

  return (
    <div className="mb-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
          style={{
            backgroundColor: `color-mix(in srgb, ${meta.color} 20%, transparent)`,
            color: meta.color,
          }}
        >
          {meta.label}
        </span>
      </div>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}

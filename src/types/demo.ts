import type { LazyExoticComponent, ComponentType } from "react";

export type DemoCategory = "bases" | "rendu" | "interaction" | "patterns";

export interface DemoItem {
  id: string;
  title: string;
  category: DemoCategory;
  description: string;
  icon: string;
  component: LazyExoticComponent<ComponentType>;
}

export const categoryMeta: Record<
  DemoCategory,
  { label: string; color: string; icon: string }
> = {
  bases: { label: "Les Bases", color: "var(--color-cat-bases)", icon: "🧱" },
  rendu: { label: "Rendu", color: "var(--color-cat-rendu)", icon: "🎨" },
  interaction: {
    label: "Interaction",
    color: "var(--color-cat-interaction)",
    icon: "🎮",
  },
  patterns: {
    label: "Patterns",
    color: "var(--color-cat-patterns)",
    icon: "🧩",
  },
};

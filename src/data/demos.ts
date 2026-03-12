import { lazy } from "react";
import type { DemoItem } from "@/types/demo";

export const demos: DemoItem[] = [
  {
    id: "composants",
    title: "Composants",
    category: "bases",
    description:
      "Un composant = une fonction qui retourne du JSX. Reutilisable a l'infini.",
    icon: "🧩",
    component: lazy(() => import("@/demos/01-composants/ComposantsDemo")),
  },
  {
    id: "props",
    title: "Props",
    category: "bases",
    description: "Les props sont les parametres d'un composant.",
    icon: "📦",
    component: lazy(() => import("@/demos/02-props/PropsDemo")),
  },
  {
    id: "state",
    title: "State (useState)",
    category: "bases",
    description: "Le state est la memoire d'un composant.",
    icon: "🧠",
    component: lazy(() => import("@/demos/03-state/StateDemo")),
  },
  {
    id: "evenements",
    title: "Evenements",
    category: "bases",
    description: "React ecoute les evenements via des props on...",
    icon: "👆",
    component: lazy(() => import("@/demos/04-evenements/EvenementsDemo")),
  },
  {
    id: "rendu-conditionnel",
    title: "Rendu Conditionnel",
    category: "rendu",
    description: "Afficher ou masquer des elements selon une condition.",
    icon: "🔀",
    component: lazy(
      () => import("@/demos/05-rendu-conditionnel/RenduConditionnelDemo"),
    ),
  },
  {
    id: "listes-map",
    title: "Listes & .map()",
    category: "rendu",
    description: "Transformer un tableau en elements JSX.",
    icon: "📋",
    component: lazy(() => import("@/demos/06-listes-map/ListesMapDemo")),
  },
  {
    id: "styles-dynamiques",
    title: "Styles Dynamiques",
    category: "rendu",
    description: "Piloter les styles CSS avec le state React.",
    icon: "🎨",
    component: lazy(
      () => import("@/demos/07-styles-dynamiques/StylesDynamiquesDemo"),
    ),
  },
  {
    id: "formulaires",
    title: "Formulaires",
    category: "interaction",
    description: "Controlled inputs : le state pilote la valeur des champs.",
    icon: "📝",
    component: lazy(() => import("@/demos/08-formulaires/FormulairesDemo")),
  },
  {
    id: "parent-enfant",
    title: "Parent ↔ Enfant",
    category: "interaction",
    description:
      "Les donnees descendent (props), les evenements remontent (callbacks).",
    icon: "🔄",
    component: lazy(() => import("@/demos/09-parent-enfant/ParentEnfantDemo")),
  },
  {
    id: "useeffect",
    title: "useEffect",
    category: "interaction",
    description: "Executer du code en reaction a des changements.",
    icon: "⚡",
    component: lazy(() => import("@/demos/10-useeffect/UseEffectDemo")),
  },
  {
    id: "composition",
    title: "Composition",
    category: "patterns",
    description:
      "Un composant peut recevoir d'autres composants en enfants (children).",
    icon: "🎁",
    component: lazy(() => import("@/demos/11-composition/CompositionDemo")),
  },
  {
    id: "etat-partage",
    title: "Etat Partage",
    category: "patterns",
    description:
      "Partager un state entre composants en le remontant au parent.",
    icon: "🌐",
    component: lazy(() => import("@/demos/12-etat-partage/EtatPartageDemo")),
  },
];

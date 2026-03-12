import { Suspense } from "react";
import { demos } from "@/data/demos";
import DemoHeader from "./DemoHeader";

interface DemoAreaProps {
  activeDemoId: string;
  onToggleSidebar: () => void;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-accent-purple border-t-transparent rounded-full animate-spin" />
        <span className="text-text-muted text-sm">Chargement...</span>
      </div>
    </div>
  );
}

export default function DemoArea({
  activeDemoId,
  onToggleSidebar,
}: DemoAreaProps) {
  const activeDemo = demos.find((d) => d.id === activeDemoId);

  if (!activeDemo) return null;

  const DemoComponent = activeDemo.component;

  return (
    <main className="lg:ml-[280px] min-h-screen bg-bg-primary">
      <div className="sticky top-0 z-30 bg-bg-primary/80 backdrop-blur-md border-b border-border-subtle lg:hidden">
        <button
          onClick={onToggleSidebar}
          className="p-4 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        <DemoHeader
          title={activeDemo.title}
          description={activeDemo.description}
          icon={activeDemo.icon}
          category={activeDemo.category}
        />

        <Suspense fallback={<LoadingFallback />}>
          <DemoComponent />
        </Suspense>
      </div>
    </main>
  );
}

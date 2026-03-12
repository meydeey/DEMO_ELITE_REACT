import { demos } from "@/data/demos";
import { categoryMeta } from "@/types/demo";
import type { DemoCategory } from "@/types/demo";

interface SidebarProps {
  activeDemoId: string;
  onSelectDemo: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories: DemoCategory[] = [
  "bases",
  "rendu",
  "interaction",
  "patterns",
];

export default function Sidebar({
  activeDemoId,
  onSelectDemo,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-bg-sidebar border-r border-border-subtle flex flex-col z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-5 border-b border-border-subtle">
          <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <span className="text-2xl">⚛️</span>
            React Crash Test
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Apprends React en cliquant partout
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {categories.map((cat) => {
            const meta = categoryMeta[cat];
            const catDemos = demos.filter((d) => d.category === cat);

            return (
              <div key={cat} className="mb-4">
                <div
                  className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ color: meta.color }}
                >
                  <span>{meta.icon}</span>
                  {meta.label}
                </div>

                {catDemos.map((demo) => {
                  const isActive = demo.id === activeDemoId;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => {
                        onSelectDemo(demo.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2.5 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "text-text-primary font-medium"
                          : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
                      }`}
                      style={
                        isActive
                          ? {
                              backgroundColor: `color-mix(in srgb, ${meta.color} 15%, transparent)`,
                              boxShadow: `inset 3px 0 0 ${meta.color}`,
                            }
                          : undefined
                      }
                    >
                      <span className="text-base">{demo.icon}</span>
                      {demo.title}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border-subtle text-center">
          <a
            href="https://www.youtube.com/@meydeey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent-pink transition-colors text-sm"
          >
            <span className="text-lg">🎬</span>
            <span>
              Cree par{" "}
              <span className="font-semibold text-text-secondary">MEYDEEY</span>
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}

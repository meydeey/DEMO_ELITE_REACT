import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import DemoArea from "@/components/layout/DemoArea";

export default function App() {
  const [activeDemoId, setActiveDemoId] = useState("composants");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar
        activeDemoId={activeDemoId}
        onSelectDemo={setActiveDemoId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <DemoArea
        activeDemoId={activeDemoId}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
    </div>
  );
}

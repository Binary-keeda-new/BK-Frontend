"use client";

import Sidebar from "@/shared/components/navigation/Sidebar";
import Topbar from "@/shared/components/navigation/Topbar";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-950 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import ActivityCalendar from "@/features/user/dashboard/components/ActivityCalendar";
import Leaderboard from "@/features/user/dashboard/components/Leaderboard";
import PromoCard from "@/features/user/dashboard/components/PromoCard";
import SubmissionsPanel from "@/features/user/dashboard/components/SubmissionsPanel";

export default function DashboardPage() {
  return (
    <main
      className="flex-1 overflow-y-auto p-[22px_24px] grid gap-[18px]"
      style={{
        gridTemplateColumns: "1fr 1fr 300px",
        gridTemplateRows: "auto auto",
        alignContent: "start",
      }}
    >
      {/* Row 1 */}
      <ActivityCalendar />
      <Leaderboard />
      <div style={{ gridColumn: 3, gridRow: 1 }}>
        <PromoCard />
      </div>

      {/* Row 2 — full width */}
      <div style={{ gridColumn: "1 / -1", gridRow: 2 }} className="mt-[16px]">
        <SubmissionsPanel />
      </div>
    </main>
  );
}
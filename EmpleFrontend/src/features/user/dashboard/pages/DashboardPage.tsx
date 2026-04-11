"use client";

import ActivityCalendar from "@/features/user/dashboard/components/ActivityCalendar";
import Leaderboard from "@/features/user/dashboard/components/Leaderboard";
import PromoCard from "@/features/user/dashboard/components/PromoCard";
import SubmissionsPanel from "@/features/user/dashboard/components/SubmissionsPanel";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-[22px_24px]">
      <div
        className="grid gap-[18px]
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-[1fr_1fr_300px]"
      >
        <ActivityCalendar />
        <Leaderboard />

        {/* Sidebar card: full width on mobile/tablet, 3rd col on desktop */}
        <div className="md:col-span-2 xl:col-span-1">
          <PromoCard />
        </div>

        {/* Always full width */}
        <div className="col-span-1 md:col-span-2 xl:col-span-3">
          <SubmissionsPanel />
        </div>
      </div>
    </main>
  );
}
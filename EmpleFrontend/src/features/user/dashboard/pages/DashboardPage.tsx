"use client";
import { useEffect, useState } from "react";
import { useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import ActivityCalendar from "@/features/user/dashboard/components/ActivityCalendar";
import Leaderboard from "@/features/user/dashboard/components/Leaderboard";
import PromoCard from "@/features/user/dashboard/components/PromoCard";
import SubmissionsPanel from "@/features/user/dashboard/components/SubmissionsPanel";

export default function DashboardPage() {

  const { sessionToken, isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 🚫 Not logged in → redirect
    if (!isSessionLoading && !isAuthenticated) {
      router.replace("/auth/login");
      return;
    }

    // ✅ Logged in → fetch user
    const fetchUser = async () => {
      const token = sessionToken;
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log("USER DATA:", data);

      setUser(data.user);
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [sessionToken, isAuthenticated, isSessionLoading, router]);

  // ⏳ Loading state
  if (isSessionLoading || !user) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  // display name
  const displayName =
  user.name ||
  user.email.split("@")[0].charAt(0).toUpperCase() +
    user.email.split("@")[0].slice(1);

  return (
    
  <div className="flex-1 overflow-y-auto p-[22px_24px]">
    
    {/* Welcome text */}
   <h2 className="text-white text-lg font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] mb-4">
  Welcome, <span className="underline decoration-orange-500 underline-offset-4">{displayName}</span>
</h2>

    {/* Grid layout */}
    <main
      className="grid gap-[18px]"
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
  </div>
);
}
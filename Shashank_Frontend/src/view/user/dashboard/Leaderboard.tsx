"use client";

import { useState } from "react";
import { useSession } from "@descope/nextjs-sdk/client";

type Tab = "University" | "Global";

export default function Leaderboard() {
  const [active, setActive] = useState<Tab>("University");
  // const { session } = useSession();
  const { session } = useSession() as any;

  const userName = session?.token?.name || session?.token?.email || "User";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 1);

  return (
    <div className="animated-border">
      <div className="animated-border-inner p-[22px] overflow-hidden">

        <div className="font-syne text-[15px] font-bold mb-[14px]" style={{ color: "var(--text)" }}>
          Leaderboards
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-[25px] p-[3px] gap-[2px] mb-4 w-fit"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          {(["University", "Global"] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="px-[18px] py-[6px] rounded-[22px] text-[12.5px] font-medium
                         cursor-pointer border-none transition-all duration-200"
              style={{
                background: active === tab ? "var(--orange)" : "transparent",
                color: active === tab ? "#fff" : "var(--muted2)",
                boxShadow: active === tab ? "0 2px 10px rgba(241,90,34,0.35)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div
          className="text-center text-[13px] py-4 rounded-[12px] mb-3"
          style={{
            color: "var(--muted)",
            border: "1px dashed var(--border)",
            background: "var(--surface2)",
          }}
        >
          No leaderboard data available.
        </div>

        {/* Your rank */}
        <div
          className="rounded-[14px] overflow-hidden"
          style={{ border: "1px solid var(--orange)", background: "rgba(241,90,34,0.04)" }}
        >
          <div
            className="text-[10.5px] font-bold px-[14px] py-2 uppercase tracking-[0.06em]"
            style={{
              color: "#ff9a5c",
              background: "rgba(241,90,34,0.08)",
              borderBottom: "1px solid rgba(241,90,34,0.15)",
            }}
          >
            ⭐ Your Rank
          </div>
          <div className="flex items-center gap-3 px-[14px] py-3">
            <div
              className="w-[34px] h-[34px] rounded-full flex items-center justify-center
                         font-bold text-[13px] text-white flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #f15a22, #ff9a5c)",
                boxShadow: "0 2px 8px rgba(241,90,34,0.35)",
              }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold" style={{ color: "var(--text)" }}>
                {userName}
              </div>
              <div className="text-[11px]" style={{ color: "var(--muted)" }}>
                Others
              </div>
            </div>
            <div className="text-[13px] font-bold" style={{ color: "#ff9a5c" }}>
              0 pts
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
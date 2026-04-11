"use client";

import { useState } from "react";
import { useSession } from "@descope/nextjs-sdk/client";

type Tab = "University" | "Global";

export default function Leaderboard() {
  const [active, setActive] = useState<Tab>("University");
  const { session } = useSession() as any;

  const userName = session?.token?.name || session?.token?.email || "User";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 1);

  return (
    <div className="animated-border h-full">
      <div
        className="animated-border-inner overflow-hidden h-full flex flex-col"
        style={{ padding: "clamp(14px, 4vw, 22px)" }}
      >

        <div
          className="font-syne font-bold"
          style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "var(--text)", marginBottom: "clamp(10px, 3vw, 14px)" }}
        >
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
              className="rounded-[22px] font-medium cursor-pointer border-none transition-all duration-200"
              style={{
                padding: "clamp(4px, 1.2vw, 6px) clamp(12px, 3.5vw, 18px)",
                fontSize: "clamp(11px, 2.8vw, 12.5px)",
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
          className="text-center rounded-[12px] mb-3"
          style={{
            fontSize: "clamp(11px, 2.8vw, 13px)",
            padding: "clamp(10px, 2.5vw, 16px) 0",
            color: "var(--muted)",
            border: "1px dashed var(--border)",
            background: "var(--surface2)",
          }}
        >
          No leaderboard data available.
        </div>

        {/* Your rank */}
        <div
          className="rounded-[14px] overflow-hidden mt-auto"
          style={{ border: "1px solid var(--orange)", background: "rgba(241,90,34,0.04)" }}
        >
          <div
            className="font-bold uppercase tracking-[0.06em]"
            style={{
              fontSize: "clamp(9px, 2.2vw, 10.5px)",
              padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 3vw, 14px)",
              color: "#ff9a5c",
              background: "rgba(241,90,34,0.08)",
              borderBottom: "1px solid rgba(241,90,34,0.15)",
            }}
          >
            ⭐ Your Rank
          </div>
          <div
            className="flex items-center"
            style={{ gap: "clamp(8px, 2.5vw, 12px)", padding: "clamp(8px, 2vw, 12px) clamp(10px, 3vw, 14px)" }}
          >
            <div
              className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
              style={{
                width: "clamp(28px, 7vw, 34px)",
                height: "clamp(28px, 7vw, 34px)",
                fontSize: "clamp(11px, 2.8vw, 13px)",
                background: "linear-gradient(135deg, #f15a22, #ff9a5c)",
                boxShadow: "0 2px 8px rgba(241,90,34,0.35)",
              }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold truncate"
                style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "var(--text)" }}
              >
                {userName}
              </div>
              <div style={{ fontSize: "clamp(9px, 2.2vw, 11px)", color: "var(--muted)" }}>
                Others
              </div>
            </div>
            <div
              className="font-bold flex-shrink-0"
              style={{ fontSize: "clamp(11px, 2.8vw, 13px)", color: "#ff9a5c" }}
            >
              0 pts
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
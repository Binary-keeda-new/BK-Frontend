"use client";

import { useSession } from "@descope/nextjs-sdk/client";

const leaders = [
  { rank: 2, name: "person 1", points: 31, height: 72 },
  { rank: 1, name: "person 2", points: 42, height: 110 },
  { rank: 3, name: "person 3", points: 24, height: 58 },
];

export default function Leaderboard() {
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
      <div className="animated-border-inner flex h-full flex-col overflow-hidden p-4 sm:p-5">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-syne text-sm font-bold text-[var(--text)]">
            Leaderboard
          </h2>

          <div className="group relative">
            <button
              type="button"
              className="flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] text-[var(--muted2)]"
            >
              i
            </button>

            <div className="absolute right-0 top-7 z-50 hidden w-60 rounded-xl border border-[var(--border)] bg-[rgba(20,20,20,0.96)] p-3 text-[11px] leading-relaxed text-[var(--text)] shadow-2xl group-hover:block">
              <div className="mb-1.5 font-semibold text-[#ff9a5c]">
                How is the leaderboard calculated?
              </div>

              <ul className="list-disc space-y-1 pl-4">
                <li>Rankings are based on your quiz and test performance.</li>
                <li>Higher scores improve your global rank.</li>
                <li>Your position updates as you complete more assessments.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Podium */}
        <div className="mb-4 flex min-h-[165px] items-end justify-center gap-4">
          {leaders.map((leader) => {
            const isFirst = leader.rank === 1;

            return (
              <div
                key={leader.rank}
                className="flex w-[70px] flex-col items-center justify-end"
              >
                <div
                  className={`mb-2 flex items-center justify-center rounded-full font-bold text-white ${
                    isFirst
                      ? "h-10 w-10 border border-orange-500/40 bg-gradient-to-br from-[#f15a22] to-[#ff9a5c] text-[15px] shadow-[0_0_18px_rgba(241,90,34,0.35)]"
                      : "h-[34px] w-[34px] border border-[var(--border)] bg-white/10 text-[13px]"
                  }`}
                >
                  {isFirst ? "👑" : `#${leader.rank}`}
                </div>

                <div className="w-full truncate text-center text-xs font-semibold text-[var(--text)]">
                  {leader.name}
                </div>

                <div className="mb-2 text-[10px] text-[#ff9a5c]">
                  {leader.points} pts
                </div>

                <div
                  className={`flex w-full items-end justify-center rounded-t-xl border pb-2 font-syne font-bold backdrop-blur-xl ${
                    isFirst
                      ? "border-orange-500/40 bg-gradient-to-b from-orange-500/35 to-orange-500/10 text-white shadow-[0_12px_28px_rgba(241,90,34,0.22)]"
                      : "border-[var(--border)] bg-gradient-to-b from-white/10 to-white/5 text-[var(--muted)]"
                  }`}
                  style={{ height: `${leader.height}px` }}
                >
                  #{leader.rank}
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Rank */}
        <div className="mt-auto overflow-hidden rounded-[14px] border border-[var(--orange)] bg-[rgba(241,90,34,0.04)]">
          <div className="border-b border-orange-500/20 bg-orange-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#ff9a5c]">
            ⭐ Your Rank
          </div>

          <div className="flex items-center gap-3 p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f15a22] to-[#ff9a5c] text-sm font-bold text-white shadow-lg shadow-orange-500/30">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-[var(--text)]">
                {userName}
              </div>

              <div className="text-xs text-[var(--muted)]">
                Rank calculating soon
              </div>
            </div>

            <div className="shrink-0 text-sm font-bold text-[#ff9a5c]">
              0 pts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
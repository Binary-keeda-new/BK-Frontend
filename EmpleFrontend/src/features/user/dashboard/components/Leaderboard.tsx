"use client";

import { useSession } from "@descope/nextjs-sdk/client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/shared/utils/api";
import { Trophy, Crown, Medal, User, Info } from "lucide-react";

type Leader = {
  rank: number | string;
  name: string;
  email?: string;
  descopeId?: string;
  points: number;
};

export default function Leaderboard() {
  const { session } = useSession() as any;
  
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [currentUserData, setCurrentUserData] = useState<Leader | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        setLoading(true);
        const result = await apiRequest<any>('/api/v1/leaderboard', { method: 'GET' });
        if (result?.success) {
          setLeaders(result.data.leaderboard);
          setCurrentUserData(result.data.currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const userName = session?.token?.name || session?.token?.email?.split('@')[0] || currentUserData?.name || "User";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const top3 = leaders.slice(0, 3);
  const podiumOrder = [
    top3[1], // Rank 2
    top3[0], // Rank 1
    top3[2], // Rank 3
  ].filter(Boolean);

  const getRankStyles = (rank: number | string) => {
    switch (rank) {
      case 1:
        return {
          bg: "from-[#f15a22]/20 to-[#ff9a5c]/5",
          border: "border-[#f15a22]/40",
          text: "text-[#ff9a5c]",
          shadow: "shadow-[0_0_25px_rgba(241,90,34,0.15)]",
          icon: <Crown className="h-4 w-4 text-[#ff9a5c] drop-shadow-[0_0_8px_rgba(241,90,34,0.5)]" />,
          height: "130px"
        };
      case 2:
        return {
          bg: "from-[#C0C0C0]/20 to-[#A9A9A9]/5",
          border: "border-[#C0C0C0]/40",
          text: "text-[#C0C0C0]",
          shadow: "shadow-[0_0_20px_rgba(192,192,192,0.1)]",
          icon: <Medal className="h-4 w-4 text-[#C0C0C0]" />,
          height: "95px"
        };
      case 3:
        return {
          bg: "from-[#CD7F32]/20 to-[#8B4513]/5",
          border: "border-[#CD7F32]/40",
          text: "text-[#CD7F32]",
          shadow: "shadow-[0_0_20px_rgba(205,127,50,0.1)]",
          icon: <Medal className="h-4 w-4 text-[#CD7F32]" />,
          height: "70px"
        };
      default:
        return {
          bg: "from-white/5 to-white/0",
          border: "border-white/10",
          text: "text-white/60",
          shadow: "",
          icon: null,
          height: "50px"
        };
    }
  };

  return (
    <div className="animated-border h-full">
      <div className="animated-border-inner group relative flex h-full flex-col overflow-hidden p-4 sm:p-5">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="font-syne text-[clamp(13px,3.5vw,15px)] font-bold text-[var(--text)]">
            Leaderboard
          </div>

          <div className="group/tooltip relative">
            <button
              type="button"
              className="inline-flex h-[18px] w-[18px] cursor-help items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface2)] text-[11px] text-[var(--muted2)]"
            >
              i
            </button>

            <div className="absolute right-0 top-7 z-50 hidden w-[220px] rounded-[10px] border border-[var(--border)] bg-[rgba(20,20,20,0.96)] px-3 py-2.5 text-[11px] leading-[1.4] text-[var(--text)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] group-hover/tooltip:block">
              <div className="mb-1.5 font-bold text-orange-400">
                How is the leaderboard calculated?
              </div>
              <ul className="list-disc space-y-1.5 pl-4">
                <li>Rankings are based on your quiz and test performance.</li>
                <li>Higher scores improve your global rank.</li>
                <li>Your position updates as you complete more assessments.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Podium Area */}
        <div className="relative flex min-h-[190px] flex-1 items-end justify-center gap-3 sm:gap-5">
          {loading ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex items-end justify-center gap-4">
                {[2, 1, 3].map((r) => (
                  <div key={r} className={`w-[70px] animate-pulse rounded-t-2xl bg-white/5 ${r === 1 ? 'h-[140px]' : r === 2 ? 'h-[100px]' : 'h-[75px]'}`} />
                ))}
              </div>
            </div>
          ) : podiumOrder.length > 0 ? (
            podiumOrder.map((leader, i) => {
              const styles = getRankStyles(leader.rank);
              const isFirst = leader.rank === 1;

              return (
                <div
                  key={leader.rank}
                  className="group/podium relative flex w-[70px] sm:w-[80px] flex-col items-center justify-end animate-in fade-in slide-in-from-bottom-8 duration-700"
                  style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}
                >
                  <div className="w-full text-center mb-2 transition-all duration-300 group-hover/podium:-translate-y-1 group-hover/podium:scale-105">
                    <div className="w-full truncate text-[11px] font-bold text-white/90">
                      {leader.name !== 'Unknown User' 
                        ? leader.name.split(' ')[0] 
                        : leader.descopeId === session?.token?.sub 
                          ? session?.token?.email?.split('@')[0] || 'Unknown' 
                          : leader.email?.split('@')[0] || 'Unknown'
                      }
                    </div>
                    <div className={`text-[10px] font-semibold ${styles.text}`}>
                      {leader.points.toLocaleString()} <span className="text-[9px] opacity-70">pts</span>
                    </div>
                  </div>

                  <div
                    className={`relative z-10 mb-2 flex items-center justify-center rounded-full border bg-[#1a1d24] font-bold shadow-xl transition-transform duration-300 group-hover/podium:-translate-y-1 ${
                      isFirst
                        ? "h-12 w-12 border-orange-500/50 shadow-orange-500/20"
                        : "h-10 w-10 border-white/10"
                    }`}
                  >
                    {isFirst && (
                      <div className="absolute -inset-1 animate-pulse rounded-full bg-orange-500/20 blur-sm" />
                    )}
                    <span className="relative z-20 text-[11px] text-white">
                      {isFirst ? (
                        <div className="flex flex-col items-center leading-none">
                          <Crown className="mb-0.5 h-3.5 w-3.5 text-orange-400" />
                          <span className="text-[9px] text-orange-400">1st</span>
                        </div>
                      ) : (
                        `#${leader.rank}`
                      )}
                    </span>
                  </div>

                  <div
                    className={`relative flex w-full flex-col items-center justify-start rounded-t-2xl border-l border-r border-t bg-gradient-to-b backdrop-blur-md transition-all duration-500 ease-out group-hover/podium:brightness-125 ${styles.bg} ${styles.border} ${styles.shadow}`}
                    style={{ height: styles.height }}
                  >
                    {/* Inner glowing line */}
                    <div className="absolute top-0 h-px w-[60%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center animate-in fade-in duration-500">
              <p className="text-[13px] font-medium text-white/40">No champions yet.</p>
              <p className="mt-1 text-[11px] text-white/20">Complete a quiz to claim #1!</p>
            </div>
          )}
        </div>

        {/* Your Rank Section */}
        <div className="mt-6 flex-shrink-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="relative overflow-hidden rounded-[14px] border border-[var(--orange)] bg-[rgba(241,90,34,0.04)] p-3 transition duration-300 hover:bg-[rgba(241,90,34,0.08)]">
            
            <div className="flex items-center gap-3.5 relative z-10">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f15a22] to-[#ff9a5c] text-[13px] font-bold tracking-wider text-white shadow-lg shadow-orange-500/30 ring-1 ring-orange-500/20">
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="truncate text-sm font-semibold text-[var(--text)]">
                    {currentUserData?.name || userName}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-extrabold text-[#ff9a5c]">
                      {currentUserData ? currentUserData.points.toLocaleString() : '0'}
                      <span className="ml-1 text-[10px] font-medium opacity-80">PTS</span>
                    </div>
                  </div>
                </div>

                <div className="mt-0.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                    {currentUserData ? `Global Rank #${currentUserData.rank}` : 'Unranked'}
                  </div>
                  
                  {currentUserData && typeof currentUserData.rank === 'number' && currentUserData.rank > 3 && (
                     <div className="text-[10px] font-medium text-[var(--muted2)]">
                       Top {Math.max(1, Math.ceil((currentUserData.rank / (leaders.length || 1)) * 100))}%
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
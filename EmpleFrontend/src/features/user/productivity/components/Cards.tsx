"use client";
import { Flame } from "lucide-react";

type CardsProps = {
  streak: number;
  progress: number;
  weeklyProgress: number;
  monthlyProgress: number;
  yearlyProgress: number;
};

export default function Cards({
  streak,
  progress,
  weeklyProgress , 
  monthlyProgress , 
  yearlyProgress , 
}: CardsProps) {
  const stats = [
    {
      title: "TODAY'S PROGRESS",
      value: `${progress}%`,
      color: "#22c55e",
    },
    {
      title: "CURRENT STREAK",
      value: `${streak}d`,
      color: "#f59e0b",
    },
    {
      title: "WEEKLY PROGRESS",
      value: `${weeklyProgress}%`,
      color: "#3b82f6",
    },
    {
      title: "MONTHLY PROGRESS",
      value: `${monthlyProgress}%`, 
      color: "#8b5cf6",
    },
    {
      title: "YEARLY PROGRESS",
      value: `${yearlyProgress}%`, 
      color: "#ec4899",
    },
    {
      title: "REWARDS",
      value: "10",
      color: "#6366f1",
    },
  ];

  return (
    <div
  className="
    flex
    gap-3
    overflow-x-auto
    overflow-y-visible
    [&::-webkit-scrollbar]:h-[7px]
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-[#3a3d43]
    [&::-webkit-scrollbar-thumb]:rounded-full
    py-2
    px-1
  "
>
      {stats.map((card, index) => (
        <div
        key={index}
        style={{
        "--card-color": card.color,
        } as React.CSSProperties}
        className="
        min-w-[180px]
        h-[100px]
        flex-shrink-0
        relative
        rounded-2xl
        overflow-hidden
        border
        border-[#26324a]
        bg-[#161721]
        p-3
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.02]
        hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]
        hover:border-[var(--card-color)]
        hover:shadow-[0_0_8px_var(--card-color)]
        "
      >
          {/* Left Color Bar */}
           <div
           className="absolute left-0 top-0 h-full w-[4px]"
          style={{ backgroundColor: card.color, }}
          />

          {card.title === "CURRENT STREAK" && (
          <div className="absolute top-3 right-3">
      </div>
    )}

          {/* Title */}
          <p className="text-[10px] tracking-[3px] text-gray-400 mb-2">
            {card.title}
          </p>

          {/* Value */}
           <h2
           className="text-[25px] font-bold leading-none"
           style={{ color: card.color }}
            >
             {card.value}
           </h2>

        </div>
      ))}
    </div>
  );
}
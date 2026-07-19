"use client";

import React from "react";
import { useWallet } from "@/providers/WalletProvider";
import { LogIn, BrainCircuit, CheckSquare, Trophy, Map, Briefcase, FileSearch } from "lucide-react";

export default function CoinEconomyInfo() {
  const { config } = useWallet();

  const earnWays = [
    { label: "Daily Login", amount: config?.LOGIN?.DAILY_REWARD || 1, type: "earn", icon: LogIn, note: "Once per day" },
    { label: "Roadmap Completion", amount: config?.ROADMAP?.COMPLETION_REWARD || 20, type: "earn", icon: Map },
    { label: "Hackathon Submission", amount: config?.HACKATHON?.SUBMISSION_REWARD || 5, type: "earn", icon: Trophy },
    { label: "Todo Milestone", amount: config?.TODO?.MILESTONE_REWARD || 2, type: "earn", icon: CheckSquare, note: "80% completion" },
    { label: "Quiz Completion", amount: "Score Based", type: "earn", icon: BrainCircuit, note: `up to ${config?.QUIZ?.MAX_REWARD || 10} coins` },
  ];

  const spendWays = [
    { label: "Test Attempt", amount: config?.TEST?.ATTEMPT_COST || 30, type: "spend", icon: Briefcase },
    { label: "AI Roadmap Generator", amount: config?.ROADMAP?.GENERATION_COST || 25, type: "spend", icon: Map },
    { label: "AI ATS Scanner", amount: config?.ATS?.AI_COST || 10, type: "spend", icon: FileSearch },
    { label: "Standard ATS Scanner", amount: config?.ATS?.STANDARD_COST || 5, type: "spend", icon: FileSearch },
    { label: "Quiz Attempt", amount: config?.QUIZ?.ATTEMPT_COST || 5, type: "spend", icon: BrainCircuit },
  ];

  return (
    <div className="w-full animated-border">
      <div className="animated-border-inner bg-[rgba(20,20,20,0.96)] p-5 sm:p-6 rounded-xl flex flex-col gap-6">
        <div>
          <h3 className="text-white font-syne text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-[#f15a22]">🪙</span> Ways to Earn Coins
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {earnWays.map((way, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#f15a22]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 text-green-400 rounded-md">
                    <way.icon size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">{way.label}</span>
                    {way.note && <span className="text-xs text-gray-400">{way.note}</span>}
                  </div>
                </div>
                <div className="text-green-400 font-bold text-sm bg-green-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  +{way.amount} {typeof way.amount === "number" ? "Coins" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-white/10" />

        <div>
          <h3 className="text-white font-syne text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-white/50">🛒</span> Ways to Spend Coins
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {spendWays.map((way, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#f15a22]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-400 rounded-md">
                    <way.icon size={18} />
                  </div>
                  <span className="text-white text-sm font-medium">{way.label}</span>
                </div>
                <div className="text-orange-400 font-bold text-sm bg-orange-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  -{way.amount} Coins
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

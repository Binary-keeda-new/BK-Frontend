"use client";

import { useWallet } from "@/providers/WalletProvider";
import { Coins, TrendingUp, TrendingDown, CreditCard, Lock } from "lucide-react";

export default function WalletSummary() {
  const { balance, lifetimeEarned, lifetimeSpent, status, loading, error, openPurchaseModal } = useWallet();

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">
        Failed to load wallet stats.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Current Balance */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-[var(--muted2)]">Current Balance</span>
          <Coins size={18} className="text-yellow-500" />
        </div>
        <div className="text-3xl font-bold text-white flex items-center gap-2">
          {loading ? (
            <span className="animate-pulse bg-white/10 rounded h-8 w-24 inline-block" />
          ) : (
            balance
          )}
          {status === "locked" && (
            <Lock size={16} className="text-red-400 ml-2" title="Wallet is Locked" />
          )}
        </div>
        <div className="absolute right-0 bottom-0 w-24 h-24 bg-yellow-500/5 rounded-tl-[100%] pointer-events-none" />
      </div>

      {/* Lifetime Earned */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-[var(--muted2)]">Lifetime Earned</span>
          <TrendingUp size={18} className="text-green-400" />
        </div>
        <div className="text-2xl font-semibold text-white">
          {loading ? (
            <span className="animate-pulse bg-white/10 rounded h-8 w-16 inline-block" />
          ) : (
            `+${lifetimeEarned}`
          )}
        </div>
      </div>

      {/* Lifetime Spent */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-[var(--muted2)]">Lifetime Spent</span>
          <TrendingDown size={18} className="text-orange-400" />
        </div>
        <div className="text-2xl font-semibold text-white">
          {loading ? (
            <span className="animate-pulse bg-white/10 rounded h-8 w-16 inline-block" />
          ) : (
            `-${lifetimeSpent}`
          )}
        </div>
      </div>
    </div>
  );
}

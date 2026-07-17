"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Coins, ArrowRightLeft, Plus, Lock } from "lucide-react";
import { useWallet } from "@/providers/WalletProvider";

export default function WalletBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { balance, lifetimeEarned, lifetimeSpent, status, loading, error, openPurchaseModal } = useWallet();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Badge Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer
        bg-yellow-400/10 border border-yellow-400/30 text-yellow-400
        hover:bg-yellow-400/20 transition hover:-translate-y-[1px]
        ${status === "locked" ? "opacity-50 grayscale" : ""}
        `}
      >
        <span
          className="w-[22px] h-[22px] flex items-center justify-center rounded-full text-[9px] font-extrabold
          bg-yellow-400 text-yellow-900"
        >
          E
        </span>
        <span className="text-xs font-semibold hidden sm:inline">
          {loading ? (
            <span className="animate-pulse bg-yellow-400/20 rounded h-4 w-8 inline-block" />
          ) : error ? (
            "!"
          ) : (
            balance
          )}
        </span>
      </div>

      {/* Popover */}
      {isOpen && (
        <div
          className="absolute right-0 top-[48px] w-[320px] rounded-xl overflow-hidden z-50
          bg-[var(--surface)] border border-[var(--border)]
          shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          animate-[fadeIn_0.2s_ease]"
        >
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-yellow-500/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Coins size={16} className="text-yellow-500" /> Emple Wallet
              </h3>
              {status === "locked" && (
                <span className="text-xs flex items-center gap-1 text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
                  <Lock size={12} /> Locked
                </span>
              )}
            </div>
            
            <div className="text-3xl font-bold text-white flex items-center gap-2">
              {loading ? (
                 <span className="animate-pulse bg-white/10 rounded h-8 w-24 block" />
              ) : (
                 balance
              )}
              <span className="text-sm font-normal text-[var(--muted2)]">Coins</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-px bg-[var(--border)]">
            <div className="bg-[var(--surface)] p-3 flex flex-col">
              <span className="text-xs text-[var(--muted2)] mb-1">Lifetime Earned</span>
              <span className="text-sm font-semibold text-green-400">+{lifetimeEarned}</span>
            </div>
            <div className="bg-[var(--surface)] p-3 flex flex-col">
              <span className="text-xs text-[var(--muted2)] mb-1">Lifetime Spent</span>
              <span className="text-sm font-semibold text-orange-400">-{lifetimeSpent}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-3 bg-[var(--surface2)] flex gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                openPurchaseModal();
              }}
              disabled={status === "locked"}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold text-white
              transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
            >
              <Plus size={16} /> Buy Coins
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/user/wallet/transactions");
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold
              bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--border)] transition"
            >
              <ArrowRightLeft size={16} /> Ledger
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

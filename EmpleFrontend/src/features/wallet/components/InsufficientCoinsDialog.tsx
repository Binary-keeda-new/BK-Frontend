"use client";

import React, { useEffect, useState } from "react";
import { Coins, X, AlertTriangle, ArrowRight } from "lucide-react";
import { useWallet } from "@/providers/WalletProvider";

interface InsufficientCoinsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  requiredCoins: number;
  onRetry?: () => void;
}

export default function InsufficientCoinsDialog({
  isOpen,
  onClose,
  requiredCoins,
  onRetry,
}: InsufficientCoinsDialogProps) {
  const { balance, openPurchaseModal } = useWallet();
  const isSufficient = balance >= requiredCoins;


  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
        <div
          className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-[var(--surface)] to-red-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Insufficient Coins</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--muted2)] hover:text-white bg-[var(--surface2)] hover:bg-[var(--border)] rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 md:p-8">
            {isSufficient ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-4">
                  <Coins size={32} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Purchase Successful!</h3>
                <p className="text-sm text-[var(--muted)] mb-6">
                  You now have {balance} Emple Coins. You can proceed with your action.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    if (onRetry) onRetry();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
                >
                  Proceed Now <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-[var(--muted)] mb-6">
                  You don't have enough Emple Coins to perform this action.
                </p>

                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-[var(--muted2)] uppercase tracking-wider mb-1">Current Balance</span>
                    <div className="flex items-center gap-1.5 text-xl font-bold text-white">
                      <Coins size={20} className="text-yellow-500" />
                      {balance}
                    </div>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-[var(--muted2)] uppercase tracking-wider mb-1">Required</span>
                    <div className="flex items-center gap-1.5 text-xl font-bold text-red-400">
                      <Coins size={20} className="text-yellow-500" />
                      {requiredCoins}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-[var(--surface2)] hover:bg-[var(--border)] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={openPurchaseModal}
                    className="flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-[0_4px_14px_rgba(241,90,34,0.4)] hover:shadow-[0_6px_20px_rgba(241,90,34,0.6)]"
                    style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
                  >
                    Buy Coins
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

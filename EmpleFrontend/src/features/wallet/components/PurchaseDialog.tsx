"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getCoinPackages, CoinPackage } from "@/features/wallet/api/package.api";
import { usePurchaseFlow } from "@/features/wallet/hooks/usePurchaseFlow";
import { useWallet } from "@/providers/WalletProvider";
import { Coins, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function PurchaseDialog() {
  const { isPurchaseModalOpen, closePurchaseModal } = useWallet();
  const [packages, setPackages] = useState<CoinPackage[]>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const { initiatePurchase, loading, error, success, setError } = usePurchaseFlow();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isPurchaseModalOpen) {
      setPackagesLoading(true);
      getCoinPackages().then(data => {
        setPackages(data);
        setPackagesLoading(false);
      }).catch(err => {
        setError("Failed to load packages");
        setPackagesLoading(false);
      });
      setError(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPurchaseModalOpen, setError]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPurchaseModalOpen && !loading && !success) {
        closePurchaseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPurchaseModalOpen, loading, success, closePurchaseModal]);

  if (!mounted || !isPurchaseModalOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (!loading && !success) {
          closePurchaseModal();
        }
      }}
    >
      <div 
        className="w-full max-w-3xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] overflow-hidden transition-all transform scale-95 animate-[scaleIn_0.2s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-gradient-to-r from-[var(--surface)] to-yellow-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
              <Coins size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Buy Emple Coins</h2>
              <p className="text-sm text-[var(--muted2)]">Unlock premium mock interviews and resources.</p>
            </div>
          </div>
          <button 
            onClick={() => !loading && !success && closePurchaseModal()}
            disabled={loading}
            className="p-2 text-[var(--muted2)] hover:text-white bg-[var(--surface2)] hover:bg-[var(--border)] rounded-full transition disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mb-4 animate-[bounce_1s_ease-in-out]">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
              <p className="text-[var(--muted)] mb-8">Your coins have been credited to your wallet.</p>
              <button
                onClick={closePurchaseModal}
                className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all bg-[var(--surface2)] hover:bg-[var(--border)]"
              >
                Close
              </button>
            </div>
          ) : packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[var(--surface2)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-[var(--border)] mb-4"></div>
                  <div className="h-5 w-32 bg-[var(--border)] rounded mb-2"></div>
                  <div className="h-8 w-24 bg-[var(--border)] rounded mb-4"></div>
                  <div className="h-6 w-20 bg-[var(--border)] rounded mb-6"></div>
                  <div className="h-12 w-full bg-[var(--border)] rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="relative bg-[var(--surface2)] border border-[var(--border)] rounded-2xl p-6 flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(241,90,34,0.15)] hover:border-orange-500/30 group"
                >
                  {pkg.id === "popular" && (
                    <div className="absolute -top-3 inset-x-0 flex justify-center">
                      <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                    <Coins size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
                  <div className="text-3xl font-extrabold text-white mb-4">
                    {pkg.coins} <span className="text-sm font-normal text-[var(--muted2)]">Coins</span>
                  </div>
                  <div className="text-lg font-medium text-orange-400 mb-6">
                    ₹{pkg.amountINR}
                  </div>
                  
                  <button
                    disabled={loading}
                    onClick={() => initiatePurchase(pkg.id, closePurchaseModal)}
                    className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all
                    disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-[0_4px_14px_rgba(241,90,34,0.4)]"
                    style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
                  >
                    {loading ? <Loader2 size={18} className="animate-spin mx-auto" /> : `Buy for ₹${pkg.amountINR}`}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

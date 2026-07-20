"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { fetchWalletBalance, fetchWalletConfig, WalletStats } from "@/features/wallet/api/wallet.api";
import { useSession } from "@descope/nextjs-sdk/client";
import PurchaseDialog from "@/features/wallet/components/PurchaseDialog";
import { useNotification } from "@/providers/NotificationProvider";

interface WalletContextType extends WalletStats {
  config: any;
  loading: boolean;
  error: string | null;
  refreshWallet: () => Promise<void>;
  isPurchaseModalOpen: boolean;
  openPurchaseModal: () => void;
  closePurchaseModal: () => void;
}

const defaultStats: WalletStats = {
  balance: 0,
  lifetimeEarned: 0,
  lifetimeSpent: 0,
  status: "active",
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const [stats, setStats] = useState<WalletStats>(defaultStats);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const { notifyReward } = useNotification();

  const openPurchaseModal = useCallback(() => setIsPurchaseModalOpen(true), []);
  const closePurchaseModal = useCallback(() => setIsPurchaseModalOpen(false), []);

  const fetchTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const fetchPromise = React.useRef<{ resolve: () => void, reject: (err: any) => void }[]>([]);

  const refreshWallet = useCallback(() => {
    if (!isAuthenticated) return Promise.resolve();

    return new Promise<void>((resolve, reject) => {
      fetchPromise.current.push({ resolve, reject });

      if (fetchTimeout.current) {
        clearTimeout(fetchTimeout.current);
      }

      fetchTimeout.current = setTimeout(async () => {
        const queue = fetchPromise.current;
        fetchPromise.current = [];
        fetchTimeout.current = null;

        try {
          setLoading(true);
          setError(null);
          const [data, configData] = await Promise.all([
            fetchWalletBalance(),
            fetchWalletConfig()
          ]);
          setStats(data);
          setConfig(configData);
          queue.forEach(q => q.resolve());
        } catch (err: any) {
          console.error("Failed to refresh wallet:", err.message || "Unknown error");
          setError(err.message || "Failed to load wallet balance");
          queue.forEach(q => q.reject(err));
        } finally {
          setLoading(false);
        }
      }, 50);
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSessionLoading) return;
    
    if (isAuthenticated) {
      refreshWallet();

      if (typeof window !== "undefined" && localStorage.getItem("show_signup_bonus") === "true") {
        localStorage.removeItem("show_signup_bonus");
        setTimeout(() => {
          notifyReward("Signup Bonus", "Welcome to Emple! Your signup bonus has been added.", 100);
        }, 500);
      }
    } else {
      setStats(defaultStats);
      setConfig(null);
      setLoading(false);
    }
  }, [isAuthenticated, isSessionLoading, refreshWallet, notifyReward]);

  return (
    <WalletContext.Provider value={{ ...stats, config, loading, error, refreshWallet, isPurchaseModalOpen, openPurchaseModal, closePurchaseModal }}>
      {children}
      <PurchaseDialog />
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

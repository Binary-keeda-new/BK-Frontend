"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";

export type NotificationType = "reward" | "deduction" | "refund" | "error" | "celebration";

export interface CoinNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  coins?: number;
  transactionId?: string;
  onDismiss?: () => void;
}

interface NotificationContextType {
  notifyReward: (title: string, message: string, coins: number) => void;
  notifyDeduction: (title: string, message: string, coins: number) => void;
  notifyRefund: (title: string, message: string, coins: number) => void;
  notifyError: (title: string, message: string) => void;
  notifyCelebration: (title: string, message: string, coins: number, transactionId?: string, onDismiss?: () => void) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<CoinNotification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<CoinNotification | null>(null);

  // Auto-dismiss current notification and pick next from queue
  useEffect(() => {
    if (currentNotification) {
      if (currentNotification.type === "celebration") {
        // Celebrations are manually dismissed or auto-dismiss after a longer period (e.g., 6 seconds)
        const timer = setTimeout(() => {
          dismissCurrent();
        }, 6000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          dismissCurrent();
        }, 3000);
        return () => clearTimeout(timer);
      }
    } else if (queue.length > 0) {
      // Prioritize celebrations
      const celebrationIndex = queue.findIndex(n => n.type === "celebration");
      if (celebrationIndex !== -1) {
        const next = queue[celebrationIndex];
        setQueue(prev => prev.filter((_, i) => i !== celebrationIndex));
        setCurrentNotification(next);
      } else {
        setCurrentNotification(queue[0]);
        setQueue((prev) => prev.slice(1));
      }
    }
  }, [currentNotification, queue]);

  const dismissCurrent = useCallback(() => {
    if (currentNotification?.onDismiss) {
      currentNotification.onDismiss();
    }
    setCurrentNotification(null);
  }, [currentNotification]);

  const addNotification = useCallback((notification: Omit<CoinNotification, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setQueue((prev) => [...prev, { ...notification, id }]);
  }, []);

  const notifyReward = useCallback((title: string, message: string, coins: number) => {
    addNotification({ type: "reward", title, message, coins });
  }, [addNotification]);

  const notifyDeduction = useCallback((title: string, message: string, coins: number) => {
    addNotification({ type: "deduction", title, message, coins });
  }, [addNotification]);

  const notifyRefund = useCallback((title: string, message: string, coins: number) => {
    addNotification({ type: "refund", title, message, coins });
  }, [addNotification]);

  const notifyError = useCallback((title: string, message: string) => {
    addNotification({ type: "error", title, message });
  }, [addNotification]);

  const notifyCelebration = useCallback((title: string, message: string, coins: number, transactionId?: string, onDismiss?: () => void) => {
    addNotification({ type: "celebration", title, message, coins, transactionId, onDismiss });
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ notifyReward, notifyDeduction, notifyRefund, notifyError, notifyCelebration }}>
      {children}

      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence mode="wait">
          {currentNotification && currentNotification.type !== "celebration" && (
            <ToastItem key={currentNotification.id} notification={currentNotification} />
          )}
        </AnimatePresence>
      </div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {currentNotification && currentNotification.type === "celebration" && (
          <CelebrationPopup key={currentNotification.id} notification={currentNotification} onDismiss={dismissCurrent} />
        )}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
};

const ToastItem = ({ notification }: { notification: CoinNotification }) => {
  const { type, title, message, coins } = notification;

  let bgClass = "bg-[var(--surface,#161820)]";
  let borderClass = "border-[var(--border,rgba(255,255,255,0.07))]";
  let iconColor = "text-green-400";
  let coinPrefix = "+";
  let Icon = Coins;

  switch (type) {
    case "reward":
      bgClass = "bg-[#14532d]"; // dark green
      borderClass = "border-[#22c55e]"; // green
      iconColor = "text-[#4ade80]";
      coinPrefix = "+";
      break;
    case "deduction":
      bgClass = "bg-[#451a03]"; // dark orange/red
      borderClass = "border-[#f15a22]"; // orange
      iconColor = "text-[#f15a22]";
      coinPrefix = "-";
      break;
    case "refund":
      bgClass = "bg-[#164e63]"; // dark cyan
      borderClass = "border-[#06b6d4]"; // cyan
      iconColor = "text-[#22d3ee]";
      coinPrefix = "+";
      Icon = RotateCcw;
      break;
    case "error":
      bgClass = "bg-[#450a0a]"; // dark red
      borderClass = "border-[#ef4444]"; // red
      iconColor = "text-[#f87171]";
      Icon = AlertCircle;
      break;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
      className={`flex flex-col gap-1 p-4 w-[320px] rounded-2xl shadow-xl shadow-black/50 border ${bgClass} ${borderClass} pointer-events-auto backdrop-blur-md`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl bg-black/20 ${iconColor}`}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-white">{title}</span>
          <span className="text-xs text-[var(--muted2,#8a8a9a)]">{message}</span>
        </div>
        {coins !== undefined && (
          <div className={`ml-auto font-black text-lg ${iconColor}`}>
            🪙 {coinPrefix}{coins}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CelebrationPopup = ({ notification, onDismiss }: { notification: CoinNotification, onDismiss: () => void }) => {
  const { title, message, coins } = notification;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: -20, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative flex flex-col items-center gap-4 p-8 w-full max-w-md rounded-3xl shadow-2xl bg-gradient-to-br from-[#161820] to-[#0f1115] border border-[rgba(255,255,255,0.1)] text-center overflow-hidden pointer-events-auto"
      >
        {/* Subtle glow behind icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 blur-[50px] rounded-full pointer-events-none" />
        
        <div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400 mb-2 relative">
          <Coins size={48} className="drop-shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse" />
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          🎉 Congratulations!
        </h2>

        <p className="text-[var(--muted2,#8a8a9a)] text-sm px-2">
          You received
        </p>

        <div className="text-4xl font-black text-emerald-400 drop-shadow-md my-2">
          🪙 +{coins} Emple Coins
        </div>

        <div className="flex flex-col gap-1 w-full bg-black/30 rounded-xl p-4 border border-white/5">
          <div className="text-white font-medium text-lg">{title}</div>
          <div className="text-sm text-gray-400">{message}</div>
        </div>

        <button
          onClick={onDismiss}
          className="mt-4 w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all active:scale-95"
        >
          Awesome!
        </button>
      </motion.div>
    </motion.div>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

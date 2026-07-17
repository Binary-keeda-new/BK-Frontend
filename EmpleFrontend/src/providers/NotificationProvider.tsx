"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Coins, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";

export type NotificationType = "reward" | "deduction" | "refund" | "error";

export interface CoinNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  coins?: number;
}

interface NotificationContextType {
  notifyReward: (title: string, message: string, coins: number) => void;
  notifyDeduction: (title: string, message: string, coins: number) => void;
  notifyRefund: (title: string, message: string, coins: number) => void;
  notifyError: (title: string, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<CoinNotification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<CoinNotification | null>(null);

  // Auto-dismiss current notification and pick next from queue
  useEffect(() => {
    if (currentNotification) {
      const timer = setTimeout(() => {
        setCurrentNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (queue.length > 0) {
      setCurrentNotification(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [currentNotification, queue]);

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

  return (
    <NotificationContext.Provider value={{ notifyReward, notifyDeduction, notifyRefund, notifyError }}>
      {children}

      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence mode="wait">
          {currentNotification && (
            <ToastItem key={currentNotification.id} notification={currentNotification} />
          )}
        </AnimatePresence>
      </div>
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

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

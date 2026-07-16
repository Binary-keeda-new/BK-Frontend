"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { apiRequest } from "@/shared/utils/api";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface HealthStats {
  /** Steps logged today (synced from mobile app) */
  todaySteps: number;
  /** User's daily step goal (from mobile app settings) */
  stepGoal: number;
  /** Sum of health coins earned in the current calendar month */
  monthlyCoins: number;
  /** Lifetime health coins — the running total stored in User.coins */
  lifetimeCoins: number;
}

export interface FinanceSummary {
  /** Monthly budget limit set in mobile app */
  monthlyBudget: number;
  /** Total spending this month (from backend) */
  monthlySpending: number;
  /** Finance coins earned in the current calendar month */
  monthlyCoins: number;
  /** Lifetime finance coins — all-time sum of BudgetReward records */
  lifetimeCoins: number;
}

export interface HealthFinanceState {
  health: HealthStats | null;
  finance: FinanceSummary | null;
  /** True only on the very first fetch — subsequent polls are silent */
  loading: boolean;
  /** Non-null when both endpoints fail simultaneously */
  error: string | null;
}

// ── Constants ──────────────────────────────────────────────────────────────────

/** Poll every 30 s to stay in sync with backend / mobile app */
const POLL_MS = 30_000;

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useHealthFinance(): HealthFinanceState {
  const [health, setHealth]   = useState<HealthStats | null>(null);
  const [finance, setFinance] = useState<FinanceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // Prevent state updates after unmount
  const alive = useRef(true);

  const fetchAll = useCallback(async (initial: boolean) => {
    try {
      const [hr, fr] = await Promise.allSettled([
        apiRequest<{ success: boolean; data: HealthStats }>(
          "/api/v1/health/stats"
        ),
        apiRequest<{ success: boolean; data: FinanceSummary }>(
          "/api/v1/finance/summary"
        ),
      ]);

      if (!alive.current) return;

      // Apply whichever succeeded; keep stale data for the one that failed
      if (hr.status === "fulfilled") {
        setHealth(hr.value.data);
      }
      if (fr.status === "fulfilled") {
        setFinance(fr.value.data);
      }

      // Only surface an error if BOTH calls failed on the initial load
      if (
        initial &&
        hr.status === "rejected" &&
        fr.status === "rejected"
      ) {
        setError("Unable to load health & finance data.");
      } else {
        setError(null);
      }
    } catch {
      // Unexpected error on initial load
      if (initial && alive.current) {
        setError("Unable to load health & finance data.");
      }
    } finally {
      if (initial && alive.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    alive.current = true;

    fetchAll(true);
    const id = setInterval(() => fetchAll(false), POLL_MS);

    return () => {
      alive.current = false;
      clearInterval(id);
    };
  }, [fetchAll]);

  return { health, finance, loading, error };
}

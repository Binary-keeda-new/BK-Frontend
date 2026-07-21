"use client";

import { useEffect, useState } from "react";
import { fetchTransactions, Transaction } from "@/features/wallet/api/wallet.api";
import dayjs from "dayjs";
import { ArrowUpRight, ArrowDownRight, RefreshCcw, Info, Trophy, CalendarCheck, Bot, FileSearch, Route, GraduationCap, CheckSquare, Coins, Gift } from "lucide-react";
import EmptyState from "@/shared/components/ui/EmptyState";

const getCategoryDetails = (category: string, isCredit: boolean) => {
  switch (category) {
    case "signup_bonus":
      return { label: "Signup Bonus", icon: Gift, color: "text-emerald-500" };
    case "dashboard_login_reward":
      return { label: "Daily Login", icon: CalendarCheck, color: "text-blue-400" };
    case "quiz_reward":
      return { label: "Quiz Reward", icon: Trophy, color: "text-yellow-400" };
    case "todo_completion_reward":
      return { label: "Todo Milestone", icon: CheckSquare, color: "text-green-400" };
    case "hackathon_submission_reward":
      return { label: "Hackathon Submission", icon: GraduationCap, color: "text-purple-400" };
    case "roadmap_completion_reward":
      return { label: "Roadmap Completed", icon: Route, color: "text-emerald-400" };
    case "payment_purchase":
      return { label: "Coin Purchase", icon: Coins, color: "text-amber-400" };
    case "quiz_attempt":
      return { label: "Quiz Attempt", icon: Trophy, color: "text-orange-400" };
    case "test_attempt":
      return { label: "Test Attempt", icon: GraduationCap, color: "text-orange-400" };
    case "roadmap_generation":
      return { label: "AI Roadmap Generation", icon: Bot, color: "text-pink-400" };
    case "ats_standard":
      return { label: "ATS Scanner", icon: FileSearch, color: "text-orange-400" };
    case "ats_ai":
      return { label: "AI ATS Scanner", icon: Bot, color: "text-red-400" };
    case "refund_ai_failure":
      return { label: "AI Failure Refund", icon: RefreshCcw, color: "text-green-400" };
    default:
      return {
        label: category.replace(/_/g, " "),
        icon: isCredit ? ArrowUpRight : ArrowDownRight,
        color: isCredit ? "text-green-400" : "text-orange-400"
      };
  }
};

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || "Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  if (error) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <div className="text-red-400 mb-2 font-medium">{error}</div>
        <button
          onClick={loadTransactions}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--surface2)] hover:bg-[var(--border)] border border-[var(--border)] rounded-lg text-sm transition"
        >
          <RefreshCcw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="h-6 w-32 bg-[var(--surface2)] animate-pulse rounded" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex p-4 border-b border-[var(--border)] gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--surface2)] animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-48 bg-[var(--surface2)] animate-pulse rounded" />
              <div className="h-3 w-24 bg-[var(--surface2)] animate-pulse rounded" />
            </div>
            <div className="h-5 w-16 bg-[var(--surface2)] animate-pulse rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <EmptyState
          title="No Transactions"
          description="You have not made any coin transactions yet."
          icon={<Info size={32} />}
        />
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
      <div className="p-5 border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-[var(--surface2)]">
        <h2 className="text-lg font-bold text-white">Financial Ledger</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--surface2)] text-[var(--muted2)] text-xs uppercase tracking-wider">
              <th className="p-4 font-medium border-b border-[var(--border)]">Type</th>
              <th className="p-4 font-medium border-b border-[var(--border)]">Category</th>
              <th className="p-4 font-medium border-b border-[var(--border)]">Amount</th>
              <th className="p-4 font-medium border-b border-[var(--border)]">Balance After</th>
              <th className="p-4 font-medium border-b border-[var(--border)]">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => {
              const isCredit = txn.direction === "credit";
              const { label, icon: CategoryIcon, color } = getCategoryDetails(txn.category, isCredit);
              
              return (
                <tr
                  key={txn._id}
                  className="border-b border-[var(--border)] hover:bg-[var(--surface2)] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCredit ? 'bg-green-500/10' : 'bg-red-500/10'} ${color}`}>
                        <CategoryIcon size={20} />
                      </div>
                      <span className={`text-sm font-medium ${isCredit ? 'text-green-400' : 'text-red-400'} capitalize`}>
                        {isCredit ? "Reward" : "Deduction"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {label}
                      </span>
                      {txn.metadata?.score !== undefined && (
                        <span className="text-xs text-[var(--muted2)] mt-0.5">
                          Score: {txn.metadata.score}
                        </span>
                      )}
                      {txn.referenceId && !txn.metadata?.score && (
                        <span className="text-xs text-[var(--muted2)] mt-0.5 font-mono" title="Reference ID">
                          Ref: {txn.referenceId.slice(0, 8)}...
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-base font-bold ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                      {isCredit ? '+' : '-'}{txn.amount} Coin{txn.amount > 1 ? 's' : ''}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-[var(--muted)]">{txn.balanceAfter} Coins</span>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[var(--muted)]">{dayjs(txn.createdAt).format('MMM D, YYYY')}</span>
                      <span className="text-xs text-[var(--muted2)] mt-0.5">{dayjs(txn.createdAt).format('h:mm A')}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

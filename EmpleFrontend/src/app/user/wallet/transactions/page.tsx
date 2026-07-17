"use client";

import { useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import WalletSummary from "@/features/wallet/components/WalletSummary";
import TransactionTable from "@/features/wallet/components/TransactionTable";
import CoinEconomyInfo from "@/features/wallet/components/CoinEconomyInfo";
import { useWallet } from "@/providers/WalletProvider";
import { CreditCard } from "lucide-react";

function BuyCoinsButton() {
  const { status, loading, openPurchaseModal } = useWallet();
  return (
    <button
      disabled={loading || status === "locked"}
      onClick={openPurchaseModal}
      className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
      style={{ background: "linear-gradient(135deg, #f15a22, #6c63ff)" }}
    >
      <CreditCard size={18} /> Buy Coins
    </button>
  );
}

export default function TransactionsPage() {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      router.push("/landing");
    }
  }, [isSessionLoading, isAuthenticated, router]);

  if (isSessionLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full pb-24">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Wallet & Transactions</h1>
          <p className="text-[var(--muted)]">Manage your coin balance and view your financial history.</p>
        </div>
        <BuyCoinsButton />
      </div>

      <WalletSummary />
      
      <div className="my-8">
        <CoinEconomyInfo />
      </div>

      <TransactionTable />
    </div>
  );
}

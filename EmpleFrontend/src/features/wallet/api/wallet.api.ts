import { apiRequest } from "@/shared/utils/api";

export interface WalletStats {
  balance: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
  status: "active" | "locked";
  hasUnseenRewards?: boolean;
}

export interface Transaction {
  _id: string;
  transactionId: string;
  direction: "credit" | "debit";
  category: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  referenceId?: string;
  referenceType?: string;
  metadata?: Record<string, any>;
  status: string;
  createdAt: string;
}

export const fetchWalletBalance = async (): Promise<WalletStats> => {
  const response = await apiRequest<{ success: boolean; balance: number; lifetimeEarned: number; lifetimeSpent: number; status: "active" | "locked"; hasUnseenRewards?: boolean }>("/api/v1/wallet/balance");
  return {
    balance: response.balance,
    lifetimeEarned: response.lifetimeEarned,
    lifetimeSpent: response.lifetimeSpent,
    status: response.status,
    hasUnseenRewards: response.hasUnseenRewards,
  };
};

export const fetchTransactions = async (limit = 50, skip = 0): Promise<Transaction[]> => {
  const response = await apiRequest<{ success: boolean; count: number; transactions: Transaction[] }>(`/api/v1/wallet/transactions?limit=${limit}&skip=${skip}`);
  return response.transactions;
};

export const fetchWalletConfig = async (): Promise<any> => {
  const response = await apiRequest<{ success: boolean; config: any }>("/api/v1/wallet/config");
  return response.config;
};

export const fetchUnseenRewards = async (): Promise<Transaction[]> => {
  const response = await apiRequest<{ success: boolean; data: Transaction[] }>("/api/v1/wallet/unseen-rewards");
  return response.data;
};

export const acknowledgeTransaction = async (id: string): Promise<void> => {
  await apiRequest(`/api/v1/wallet/transactions/${id}/acknowledge`, {
    method: "PUT"
  });
};

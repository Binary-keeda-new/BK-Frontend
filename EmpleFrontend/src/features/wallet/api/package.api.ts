import { apiRequest } from "@/shared/utils/api";

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  amountINR: number;
}

export const getCoinPackages = async (): Promise<CoinPackage[]> => {
  const response = await apiRequest<{ success: boolean; packages: CoinPackage[] }>("/api/v1/payment/packages", {
    method: "GET",
  });
  return response.packages;
};

import { apiRequest } from "@/shared/utils/api";

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  keyId: string;
  amount: number;
  currency: string;
  packageName: string;
  coins: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  orderId: string;
  status: string;
  coinsCredited: boolean;
  coinsToCredit: number;
  amountINR: number;
}

export const createRazorpayOrder = async (packageId: string): Promise<CreateOrderResponse> => {
  return await apiRequest<CreateOrderResponse>("/api/v1/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ packageId }),
  });
};

export const verifyPaymentStatus = async (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
): Promise<VerifyPaymentResponse> => {
  return await apiRequest<VerifyPaymentResponse>("/api/v1/payment/verify", {
    method: "POST",
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
  });
};

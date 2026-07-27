import { useState, useCallback } from "react";
import { createRazorpayOrder, verifyPaymentStatus } from "@/features/wallet/api/payment.api";
import { useWallet } from "@/providers/WalletProvider";
import { useUser } from "@descope/nextjs-sdk/client";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const usePurchaseFlow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { refreshWallet } = useWallet();
  const { user } = useUser();

  const initiatePurchase = useCallback(async (packageId: string, onClose: () => void) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you offline?");
      }

      // 1. Create order on backend
      const order = await createRazorpayOrder(packageId);

      // 2. Open Razorpay Checkout
      const options = {
        key: order.keyId,
        amount: order.amount.toString(),
        currency: order.currency,
        name: "Emple",
        description: `Purchase ${order.packageName}`,
        order_id: order.orderId,
        handler: async function (response: any) {
          // 3. Payment succeeded on frontend, now verify and fulfill with backend
          setLoading(true);
          try {
            const status = await verifyPaymentStatus(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            if (status.coinsCredited) {
              // 4. Update global wallet state ONLY after backend verification
              await refreshWallet();
              setSuccess(true);
              setTimeout(() => {
                onClose();
              }, 2500);
            } else {
              setError("Payment received, but coins not credited yet. We will update your balance shortly once confirmed.");
            }
          } catch (verifyErr: any) {
            setError(verifyErr.message || "Failed to verify payment. If money was deducted, contact support.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          email: user?.email || "",
          name: user?.name || "",
        },
        theme: {
          color: "#f15a22",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on("payment.failed", function (response: any) {
        setError(`Payment Failed: ${response.error.description}`);
        setLoading(false);
      });

      rzp.open();
    } catch (err: any) {
      setError(err.message || "Failed to initiate purchase.");
      setLoading(false);
    }
  }, [refreshWallet, user]);

  return { initiatePurchase, loading, error, success, setError };
};

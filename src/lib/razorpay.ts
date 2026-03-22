// Razorpay configuration
// Replace these with your real Razorpay keys when you pull the project
export const RAZORPAY_KEY_ID = "rzp_test_9XbJPu0vOzevBn";

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayFailure {
  code?: string;
  description?: string;
  reason?: string;
  source?: string;
  step?: string;
  metadata?: Record<string, unknown>;
}

// Load Razorpay SDK script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (payload?: unknown) => void) => void;
    };
  }
}

interface OpenRazorpayOptions {
  amount: number; // in INR (will be converted to paise)
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure: (error: RazorpayFailure | Error) => void;
}

export const openRazorpayCheckout = ({
  amount,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
}: OpenRazorpayOptions) => {
  const amountInPaise = Math.round(amount * 100);

  if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
    onFailure(new Error("Invalid checkout amount"));
    return;
  }

  if (!window.Razorpay) {
    onFailure(new Error("Razorpay SDK not available"));
    return;
  }

  let settled = false;
  const originalAlert = window.alert.bind(window);

  const restoreAlert = () => {
    window.alert = originalAlert;
  };

  const safeSuccess = (response: RazorpayResponse) => {
    if (settled) return;
    settled = true;
    restoreAlert();
    onSuccess(response);
  };

  const safeFailure = (error: RazorpayFailure | Error) => {
    if (settled) return;
    settled = true;
    restoreAlert();
    onFailure(error);
  };

  window.alert = (message?: string) => {
    const text = String(message ?? "");
    const normalized = text.toLowerCase();

    if (normalized.includes("payment failed") || normalized.includes("something went wrong")) {
      safeFailure({
        reason: "gateway_failure",
        description: text,
      });
      return;
    }

    originalAlert(text);
  };

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amountInPaise,
    currency: "INR",
    name: "NutriX",
    description: "Premium Supplements Order",
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    theme: {
      color: "#22c55e",
    },
    handler: safeSuccess,
    modal: {
      ondismiss: () => {
        safeFailure({
          reason: "cancelled_by_user",
          description: "Payment popup was closed before completion.",
        });
      },
    },
    retry: {
      enabled: true,
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on("payment.failed", (event?: { error?: RazorpayFailure }) => {
    safeFailure(
      event?.error ?? {
        reason: "gateway_failure",
        description: "Payment failed at gateway. Please retry with another method.",
      },
    );
  });
  rzp.open();
};

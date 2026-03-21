// Razorpay configuration
// Replace these with your real Razorpay keys when you pull the project
export const RAZORPAY_KEY_ID = "rzp_test_XXXXXXXXXXXXXXX"; // Your Razorpay Key ID (publishable)

export interface RazorpayOrder {
  id: string;
  amount: number; // in paise
  currency: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Simulates creating a Razorpay order (replace with real API call via backend)
export const createRazorpayOrder = async (amount: number): Promise<RazorpayOrder> => {
  // In production, call your backend endpoint to create a Razorpay order
  // e.g., const res = await fetch("/api/create-order", { method: "POST", body: JSON.stringify({ amount }) });
  // For now, simulate order creation
  return {
    id: `order_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    amount: amount * 100, // Convert to paise
    currency: "INR",
  };
};

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
      on: (event: string, handler: () => void) => void;
    };
  }
}

interface OpenRazorpayOptions {
  order: RazorpayOrder;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure: (error: unknown) => void;
}

export const openRazorpayCheckout = ({
  order,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
}: OpenRazorpayOptions) => {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "NutriX",
    description: "Premium Supplements Order",
    order_id: order.id,
    prefill: {
      name: customerName,
      email: customerEmail,
      contact: customerPhone,
    },
    theme: {
      color: "#22c55e", // primary green
    },
    handler: (response: RazorpayResponse) => {
      onSuccess(response);
    },
    modal: {
      ondismiss: () => {
        onFailure(new Error("Payment cancelled by user"));
      },
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

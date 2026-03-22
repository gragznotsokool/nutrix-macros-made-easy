// Razorpay configuration
// Replace these with your real Razorpay keys when you pull the project
export const RAZORPAY_KEY_ID = "rzp_test_9XbJPu0vOzevBn";

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
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
      on: (event: string, handler: () => void) => void;
    };
  }
}

interface OpenRazorpayOptions {
  amount: number; // in INR (will be converted to paise)
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onSuccess: (response: RazorpayResponse) => void;
  onFailure: (error: unknown) => void;
}

export const openRazorpayCheckout = ({
  amount,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure,
}: OpenRazorpayOptions) => {
  const options = {
    key: RAZORPAY_KEY_ID,
    amount: amount * 100, // Convert INR to paise
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

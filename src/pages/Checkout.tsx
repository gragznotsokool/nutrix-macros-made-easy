import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Truck, CheckCircle2, ShieldCheck, ArrowLeft,
  Package, MapPin, Lock, ChevronRight, IndianRupee, CreditCard
} from "lucide-react";
import {
  loadRazorpayScript,
  openRazorpayCheckout,
  type RazorpayFailure,
} from "@/lib/razorpay";

type Step = "shipping" | "review" | "confirmed";

const ORDERS_KEY = "nutrix-orders";

const getPaymentErrorContent = (error: RazorpayFailure | Error | unknown) => {
  if (error instanceof Error) {
    return {
      title: "Payment Error",
      description: error.message || "Could not process payment.",
    };
  }

  const failure = (error ?? {}) as RazorpayFailure;
  const message =
    failure.description ||
    failure.reason ||
    "Payment could not be completed. Please retry.";

  const isCancelled =
    (failure.reason || "").toLowerCase().includes("cancel") ||
    message.toLowerCase().includes("closed");

  return {
    title: isCancelled ? "Payment Cancelled" : "Payment Failed",
    description: message,
  };
};

const Checkout = () => {
  const { items, total, clearCart, count } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const subtotal = Number(total) || 0;
  const deliveryFee = subtotal >= 1500 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + deliveryFee + tax;

  // Load Razorpay SDK on mount
  useEffect(() => {
    loadRazorpayScript().then(setRazorpayLoaded);
  }, []);

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "shipping", label: "Shipping", icon: <Truck className="w-4 h-4" /> },
    { key: "review", label: "Review & Pay", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "confirmed", label: "Done", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  const stepIndex = steps.findIndex(s => s.key === step);

  const validateShipping = () => {
    const { fullName, email, phone, address, city, state, zip } = shipping;
    if (!fullName || !email || !phone || !address || !city || !state || !zip) {
      toast({ title: "Missing Fields", description: "Please fill all shipping details.", variant: "destructive" });
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email.", variant: "destructive" });
      return false;
    }
    if (phone.length < 10) {
      toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit phone number.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleRazorpayPayment = async () => {
    if (!razorpayLoaded) {
      toast({ title: "Payment Error", description: "Payment gateway is loading. Please try again.", variant: "destructive" });
      return;
    }

    if (grandTotal <= 0) {
      toast({ title: "Invalid Amount", description: "Cart total must be greater than ₹0.", variant: "destructive" });
      return;
    }

    setProcessing(true);

    try {
      openRazorpayCheckout({
        amount: grandTotal,
        customerName: shipping.fullName,
        customerEmail: shipping.email,
        customerPhone: shipping.phone,
        onSuccess: (response) => {
          setPaymentId(response.razorpay_payment_id);
          completeOrder(response.razorpay_payment_id);
        },
        onFailure: (error) => {
          setProcessing(false);
          const { title, description } = getPaymentErrorContent(error);
          toast({ title, description, variant: "destructive" });
        },
      });
    } catch {
      setProcessing(false);
      toast({ title: "Payment Error", description: "Could not initiate payment. Please try again.", variant: "destructive" });
    }
  };

  const completeOrder = (pId: string) => {
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(id);

    const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    const order = {
      id,
      paymentId: pId,
      items: items.map(i => ({ product: { id: i.id, name: i.name, price: i.price, image: i.image }, qty: i.qty })),
      total: grandTotal,
      date: new Date().toLocaleDateString(),
      status: "Confirmed",
      shipping,
    };
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existingOrders]));

    clearCart();
    setStep("confirmed");
    setProcessing(false);
  };

  if (items.length === 0 && step !== "confirmed") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
          <Package className="w-20 h-20 text-muted-foreground/30 mb-4" />
          <h2 className="font-display text-3xl text-foreground mb-2">Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Add some products before checking out.</p>
          <Button onClick={() => navigate("/shop")} className="font-display tracking-wide">
            <ArrowLeft className="w-4 h-4 mr-2" /> BACK TO SHOP
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Stepper */}
          <div className="flex items-center justify-center gap-1 mb-10">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i <= stepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight className={`w-4 h-4 mx-1 ${i < stepIndex ? "text-primary" : "text-muted-foreground/30"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form Area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === "shipping" && (
                  <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <Card className="border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <MapPin className="w-5 h-5 text-primary" />
                          <h2 className="font-display text-2xl text-foreground">SHIPPING DETAILS</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input value={shipping.fullName} onChange={e => setShipping(p => ({ ...p, fullName: e.target.value }))} placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" value={shipping.email} onChange={e => setShipping(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label>Phone</Label>
                            <Input value={shipping.phone} onChange={e => setShipping(p => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="9876543210" />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label>Address</Label>
                            <Input value={shipping.address} onChange={e => setShipping(p => ({ ...p, address: e.target.value }))} placeholder="123 Fitness Street, Apt 4" />
                          </div>
                          <div className="space-y-2">
                            <Label>City</Label>
                            <Input value={shipping.city} onChange={e => setShipping(p => ({ ...p, city: e.target.value }))} placeholder="Mumbai" />
                          </div>
                          <div className="space-y-2">
                            <Label>State</Label>
                            <Input value={shipping.state} onChange={e => setShipping(p => ({ ...p, state: e.target.value }))} placeholder="Maharashtra" />
                          </div>
                          <div className="space-y-2">
                            <Label>PIN Code</Label>
                            <Input value={shipping.zip} onChange={e => setShipping(p => ({ ...p, zip: e.target.value.replace(/\D/g, "").slice(0, 6) }))} placeholder="400001" />
                          </div>
                        </div>
                        <div className="flex justify-between mt-8">
                          <Button variant="outline" onClick={() => navigate("/shop")} className="font-display">
                            <ArrowLeft className="w-4 h-4 mr-2" /> BACK
                          </Button>
                          <Button onClick={() => validateShipping() && setStep("review")} className="font-display tracking-wide">
                            REVIEW ORDER <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === "review" && (
                  <motion.div key="review" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <Card className="border-border bg-card">
                      <CardContent className="p-6 space-y-6">
                        <h2 className="font-display text-2xl text-foreground flex items-center gap-3">
                          <ShieldCheck className="w-5 h-5 text-primary" /> REVIEW & PAY
                        </h2>

                        {/* Shipping summary */}
                        <div className="bg-secondary/50 rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1 font-display tracking-wider">SHIP TO</p>
                          <p className="text-foreground font-medium">{shipping.fullName}</p>
                          <p className="text-sm text-muted-foreground">{shipping.address}, {shipping.city}, {shipping.state} - {shipping.zip}</p>
                          <p className="text-sm text-muted-foreground">{shipping.phone} • {shipping.email}</p>
                        </div>

                        {/* Payment method info */}
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">Pay with Razorpay</p>
                              <p className="text-xs text-muted-foreground">UPI, Cards, Net Banking, Wallets & more</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {["UPI", "Cards", "Net Banking", "Wallets", "EMI"].map(method => (
                              <Badge key={method} variant="secondary" className="text-[10px]">{method}</Badge>
                            ))}
                          </div>
                        </div>

                        {/* Items */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-3 font-display tracking-wider">ITEMS ({count})</p>
                          <div className="space-y-2">
                            {items.map(item => (
                              <div key={item.id} className="flex items-center gap-3">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                <div className="flex-1">
                                  <p className="text-sm text-foreground">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                                </div>
                                <p className="text-sm text-foreground font-medium">₹{item.price * item.qty}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between mt-8">
                          <Button variant="outline" onClick={() => setStep("shipping")} className="font-display">
                            <ArrowLeft className="w-4 h-4 mr-2" /> BACK
                          </Button>
                          <Button
                            onClick={handleRazorpayPayment}
                            disabled={processing}
                            className="font-display tracking-wide min-w-[200px] gap-2"
                          >
                            {processing ? (
                              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                            ) : (
                              <>
                                <IndianRupee className="w-4 h-4" />
                                PAY ₹{grandTotal} WITH RAZORPAY
                                <Lock className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {step === "confirmed" && (
                  <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="border-primary/30 bg-card">
                      <CardContent className="p-10 text-center space-y-4">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                          <CheckCircle2 className="w-20 h-20 text-primary mx-auto" />
                        </motion.div>
                        <h2 className="font-display text-4xl text-foreground">PAYMENT SUCCESSFUL!</h2>
                        <p className="text-muted-foreground">
                          Order <span className="text-primary font-bold">{orderId}</span> confirmed.
                        </p>
                        {paymentId && (
                          <p className="text-xs text-muted-foreground">
                            Payment ID: <span className="font-mono text-foreground">{paymentId}</span>
                          </p>
                        )}
                        <div className="bg-secondary/50 rounded-lg p-4 text-left max-w-sm mx-auto text-sm space-y-1">
                          <p className="text-muted-foreground">Shipping to: <span className="text-foreground">{shipping.fullName}</span></p>
                          <p className="text-muted-foreground">Address: <span className="text-foreground">{shipping.city}, {shipping.state}</span></p>
                          <p className="text-muted-foreground">Total Paid: <span className="text-primary font-bold">₹{grandTotal}</span></p>
                        </div>
                        <div className="flex gap-3 justify-center pt-4">
                          <Button variant="outline" onClick={() => navigate("/shop")} className="font-display">
                            CONTINUE SHOPPING
                          </Button>
                          <Button onClick={() => { navigate("/shop"); setTimeout(() => window.scrollTo(0, 0), 100); }} className="font-display">
                            VIEW ORDERS
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            {step !== "confirmed" && (
              <div className="lg:col-span-1">
                <Card className="border-border bg-card sticky top-28">
                  <CardContent className="p-5 space-y-4">
                    <h3 className="font-display text-xl text-foreground">ORDER SUMMARY</h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {items.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">×{item.qty}</p>
                          </div>
                          <p className="text-sm text-foreground">₹{item.price * item.qty}</p>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span><span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Delivery</span>
                        <span>{deliveryFee === 0 ? <Badge variant="secondary" className="text-[10px]">FREE</Badge> : `₹${deliveryFee}`}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Tax (18% GST)</span><span>₹{tax}</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">Total</span>
                      <span className="font-display text-2xl text-primary">₹{grandTotal}</span>
                    </div>
                    {subtotal < 1500 && (
                      <p className="text-xs text-muted-foreground text-center">
                        Add ₹{1500 - subtotal} more for free delivery!
                      </p>
                    )}

                    {/* Razorpay trust badge */}
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        <span>Secured by Razorpay</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

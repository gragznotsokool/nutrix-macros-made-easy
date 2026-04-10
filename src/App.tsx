import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import MacroCalculator from "./pages/MacroCalculator";
import MealTracker from "./pages/MealTracker";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const ErpDashboard = lazy(() => import("./pages/ErpDashboard"));
const OrderManagement = lazy(() => import("./pages/OrderManagement"));
const CrmDashboard = lazy(() => import("./pages/CrmDashboard"));
const ScmDashboard = lazy(() => import("./pages/ScmDashboard"));
const MarketingDashboard = lazy(() => import("./pages/MarketingDashboard"));
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard"));
const CrmFeedbackDashboard = lazy(() => import("./pages/CrmFeedbackDashboard"));
const TermsPrivacy = lazy(() => import("./pages/TermsPrivacy"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={<LazyFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calculator" element={<MacroCalculator />} />
                <Route path="/meals" element={<MealTracker />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/erp-dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <ErpDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/order-management" element={
                  <ProtectedRoute requireAdmin>
                    <OrderManagement />
                  </ProtectedRoute>
                } />
                <Route path="/crm-dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <CrmDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/scm-dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <ScmDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/marketing-dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <MarketingDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/revenue-dashboard" element={
                  <ProtectedRoute requireAdmin>
                    <RevenueDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/crm-feedback" element={
                  <ProtectedRoute requireAdmin>
                    <CrmFeedbackDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/terms-privacy" element={<TermsPrivacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

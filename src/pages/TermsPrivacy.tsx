import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Users, Globe } from "lucide-react";

const TermsPrivacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              LEGAL & <span className="gradient-text">SECURITY</span>
            </h1>
            <p className="text-muted-foreground text-lg">Terms of Service, Privacy Policy & Security Practices</p>
          </motion.div>

          <div className="space-y-8">
            {/* Security Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-primary/30 rounded-xl p-6 neon-border">
              <h2 className="font-display text-2xl text-foreground flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-primary" /> Security Practices</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Lock, title: "Encrypted Transactions", desc: "All payments processed via Razorpay with PCI-DSS Level 1 compliance. 256-bit SSL encryption on all data in transit." },
                  { icon: Eye, title: "Data Privacy", desc: "We never sell customer data. All personal information is stored securely and accessible only to authorized personnel." },
                  { icon: Users, title: "Role-Based Access", desc: "Admin dashboards (ERP, CRM, SCM) are restricted to authorized admin accounts. Regular users cannot access operational data." },
                  { icon: Globe, title: "FSSAI Compliance", desc: "All products are FSSAI certified. Lab reports available on every product page. ISO 22000 compliant manufacturing." },
                ].map(item => (
                  <div key={item.title} className="p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className="w-4 h-4 text-primary" />
                      <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Terms of Service */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-2xl text-foreground flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-primary" /> Terms of Service</h2>
              <div className="prose prose-invert prose-sm max-w-none space-y-4 text-muted-foreground">
                <h3 className="font-display text-lg text-foreground">1. Acceptance of Terms</h3>
                <p>By accessing and using NutriX ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

                <h3 className="font-display text-lg text-foreground">2. Account Registration</h3>
                <p>Users must provide accurate information during registration. You are responsible for maintaining the confidentiality of your account credentials. Passwords must be at least 6 characters long. Admin accounts are issued only to authorized NutriX personnel.</p>

                <h3 className="font-display text-lg text-foreground">3. Product Information</h3>
                <p>All supplement products are FSSAI certified and manufactured in ISO 22000 compliant facilities. Nutritional information and macro breakdowns are provided on each product page. Lab reports are available upon request.</p>

                <h3 className="font-display text-lg text-foreground">4. Orders & Payments</h3>
                <p>All payments are processed securely through Razorpay. Orders are subject to stock availability. If a product is out of stock after payment, a full refund will be processed within 5-7 business days. Negative quantities are not permitted in orders.</p>

                <h3 className="font-display text-lg text-foreground">5. Subscribe & Save</h3>
                <p>Subscription orders auto-renew monthly at the discounted rate (15-20% off). Subscribers can cancel anytime without penalty. Changes to subscription take effect from the next billing cycle.</p>

                <h3 className="font-display text-lg text-foreground">6. Returns & Refunds</h3>
                <p>Unopened products may be returned within 7 days of delivery. Damaged or incorrect products will be replaced at no additional cost. Refunds are processed to the original payment method.</p>

                <h3 className="font-display text-lg text-foreground">7. Limitation of Liability</h3>
                <p>NutriX supplements are not intended to diagnose, treat, or cure any disease. Consult a healthcare professional before starting any supplement regimen. NutriX is not liable for misuse of products.</p>
              </div>
            </motion.section>

            {/* Privacy Policy */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-display text-2xl text-foreground flex items-center gap-2 mb-4"><Eye className="w-5 h-5 text-primary" /> Privacy Policy</h2>
              <div className="prose prose-invert prose-sm max-w-none space-y-4 text-muted-foreground">
                <h3 className="font-display text-lg text-foreground">1. Information We Collect</h3>
                <p>We collect: Name, email, and contact information during registration. Order history and product preferences for personalized recommendations. Macro calculator inputs (weight, height, activity level) to generate nutrition plans. Payment information is processed by Razorpay and never stored on our servers.</p>

                <h3 className="font-display text-lg text-foreground">2. How We Use Your Data</h3>
                <p>Personal data is used to: Process and fulfill orders. Provide personalized product recommendations via our CRM system. Send order updates and subscription reminders. Improve our services based on aggregated, anonymized feedback analysis.</p>

                <h3 className="font-display text-lg text-foreground">3. Data We Do NOT Collect or Sell</h3>
                <p>We do NOT sell, trade, or rent personal data to third parties. We do NOT store payment card details. We do NOT track users across external websites.</p>

                <h3 className="font-display text-lg text-foreground">4. CRM Data Usage</h3>
                <p>Customer feedback, reviews, and complaints are processed through our automated analysis system to identify and resolve issues. This data is used solely to improve NutriX services. Individual reports are kept confidential and accessible only to authorized support staff.</p>

                <h3 className="font-display text-lg text-foreground">5. Security Measures</h3>
                <p>256-bit SSL encryption for all data transmission. Role-based access control for internal dashboards. Regular security audits and vulnerability assessments. PCI-DSS compliant payment processing via Razorpay.</p>

                <h3 className="font-display text-lg text-foreground">6. Your Rights</h3>
                <p>You have the right to: Access your personal data. Request correction or deletion of your data. Opt out of marketing communications. Export your order history.</p>

                <h3 className="font-display text-lg text-foreground">7. Contact</h3>
                <p>For privacy-related inquiries, contact us at privacy@nutrix.com. We respond to all requests within 48 hours.</p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPrivacy;

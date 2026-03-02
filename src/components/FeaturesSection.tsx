import { motion } from "framer-motion";
import { Shield, FlaskConical, Truck, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: FlaskConical,
    title: "Lab Tested",
    desc: "Every batch is third-party tested for purity, potency, and banned substances.",
  },
  {
    icon: Shield,
    title: "Transparent Labels",
    desc: "Complete macro and ingredient breakdowns — no proprietary blends, no hidden fillers.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Free shipping on all orders above ₹999. Delivered in 2–4 business days.",
  },
  {
    icon: RefreshCcw,
    title: "Subscribe & Save",
    desc: "Get up to 20% off with monthly subscriptions. Cancel anytime, no commitment.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-5xl text-foreground mb-3">
            WHY <span className="gradient-text">NUTRIX</span>?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're committed to quality, transparency, and your results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

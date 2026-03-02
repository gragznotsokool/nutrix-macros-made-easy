import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section id="subscriptions" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-card rounded-2xl border border-border p-12 md:p-16 text-center overflow-hidden neon-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative">
            <h2 className="font-display text-5xl md:text-6xl text-foreground mb-4">
              SUBSCRIBE & SAVE <span className="gradient-text">20%</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
              Never run out of your favorite supplements. Set up a monthly delivery
              and save on every order. Cancel anytime.
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-10 py-4 rounded-lg hover:brightness-110 transition-all text-lg"
            >
              Start Your Subscription
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;

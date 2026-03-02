import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-athlete.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="relative container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-1.5 mb-6"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Macros Made Easy</span>
          </motion.div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.9] mb-6 text-foreground">
            FUEL YOUR
            <br />
            <span className="gradient-text text-glow">PERFORMANCE</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 font-body">
            Premium supplements with transparent macro information.
            Know exactly what goes into your body.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-lg hover:brightness-110 transition-all animate-pulse-glow"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#categories"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 border border-border text-foreground font-semibold px-8 py-3.5 rounded-lg hover:bg-secondary transition-all"
            >
              Explore Categories
            </motion.a>
          </div>

          <div className="flex gap-12 mt-14">
            {[
              { value: "25g+", label: "Protein/Serving" },
              { value: "100%", label: "Lab Tested" },
              { value: "50K+", label: "Happy Athletes" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

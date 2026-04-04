import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Competitive Bodybuilder",
    text: "NutriX's Whey Isolate is the cleanest protein I've ever used. Transparent labels, no fillers — exactly what a serious athlete needs.",
    rating: 5,
    avatar: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Yoga Instructor",
    text: "The macro calculator helped me plan my diet perfectly. I lost 8kg in 3 months while maintaining energy for my classes!",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Vikram Singh",
    role: "CrossFit Athlete",
    text: "Subscribe & Save is a game-changer. My supplements arrive on time every month and I save 20%. Best D2C supplement brand!",
    rating: 5,
    avatar: "VS",
  },
  {
    name: "Sneha Patel",
    role: "Marathon Runner",
    text: "The plant protein blend tastes amazing and digests so well. Finally a vegan option that doesn't compromise on quality.",
    rating: 4,
    avatar: "SP",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-5xl text-foreground mb-3">
            WHAT OUR <span className="gradient-text">ATHLETES</span> SAY
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Trusted by 50,000+ fitness enthusiasts across India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-6 relative hover:border-primary/30 transition-all"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < t.rating ? "text-primary fill-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

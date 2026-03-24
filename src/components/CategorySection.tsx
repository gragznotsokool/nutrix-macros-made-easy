import { motion } from "framer-motion";
import { Dumbbell, FlaskConical, Pill, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { icon: Dumbbell, name: "Whey Protein", count: 8, desc: "Build lean muscle" },
  { icon: FlaskConical, name: "Pre-Workout", count: 3, desc: "Maximize performance" },
  { icon: Pill, name: "Vitamins", count: 1, desc: "Complete nutrition" },
  { icon: HeartPulse, name: "Recovery", count: 8, desc: "Recover faster" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section id="categories" className="py-20 bg-section-gradient">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-5xl text-foreground mb-3">
            SHOP BY <span className="gradient-text">CATEGORY</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find the right supplements for your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative bg-card rounded-xl p-8 border border-border hover:border-primary/50 transition-all cursor-pointer neon-border"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <cat.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-1">{cat.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cat.desc}</p>
              <span className="text-xs font-medium text-primary">{cat.count} Products →</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

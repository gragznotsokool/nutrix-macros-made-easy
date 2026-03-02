import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import productWhey from "@/assets/product-whey.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";

const products = [
  {
    image: productWhey,
    name: "PREMIUM WHEY ISOLATE",
    category: "Protein",
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    protein: "25g",
    servings: "30",
  },
  {
    image: productPreworkout,
    name: "IGNITE PRE-WORKOUT",
    category: "Pre-Workout",
    price: 1299,
    originalPrice: 1799,
    rating: 4.6,
    protein: "—",
    servings: "40",
  },
  {
    image: productBcaa,
    name: "BCAA RECOVERY BLEND",
    category: "Amino Acids",
    price: 999,
    rating: 4.5,
    protein: "7g BCAA",
    servings: "50",
  },
  {
    image: productCreatine,
    name: "CREATINE MONOHYDRATE",
    category: "Performance",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    protein: "—",
    servings: "60",
  },
  {
    image: productVitamins,
    name: "DAILY MULTIVITAMIN",
    category: "Vitamins",
    price: 599,
    rating: 4.7,
    servings: "90",
  },
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14"
        >
          <div>
            <h2 className="font-display text-5xl text-foreground mb-3">
              BEST <span className="gradient-text">SELLERS</span>
            </h2>
            <p className="text-muted-foreground">
              Our most popular supplements, trusted by thousands
            </p>
          </div>
          <a
            href="#"
            className="text-primary text-sm font-medium hover:underline mt-4 sm:mt-0"
          >
            View All Products →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

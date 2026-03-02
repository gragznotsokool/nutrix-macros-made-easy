import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  protein?: string;
  servings?: string;
}

const ProductCard = ({
  image,
  name,
  category,
  price,
  originalPrice,
  rating,
  protein,
  servings,
}: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/40 transition-all"
    >
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {originalPrice && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {category}
        </span>
        <h3 className="font-display text-xl text-foreground mt-1 mb-2">{name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-primary fill-primary" : "text-muted"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{rating}</span>
        </div>

        {(protein || servings) && (
          <div className="flex gap-4 mb-4">
            {protein && (
              <div className="text-xs">
                <span className="text-muted-foreground">Protein: </span>
                <span className="text-foreground font-semibold">{protein}</span>
              </div>
            )}
            {servings && (
              <div className="text-xs">
                <span className="text-muted-foreground">Servings: </span>
                <span className="text-foreground font-semibold">{servings}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-foreground">₹{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:brightness-110 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

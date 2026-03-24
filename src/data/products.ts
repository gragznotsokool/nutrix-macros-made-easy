import productWhey from "@/assets/product-whey.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";
import productPlantProtein from "@/assets/product-plant-protein.jpg";
import productMassGainer from "@/assets/product-mass-gainer.jpg";
import productHydrolyzedWhey from "@/assets/product-hydrolyzed-whey.jpg";
import productCasein from "@/assets/product-casein.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  tags: string[];
  image: string;
}

// UI category keys used for filtering
export const UI_CATEGORIES = [
  "All",
  "Whey Protein",
  "Pre-Workout",
  "Vitamins",
  "Recovery",
] as const;

export type UICategory = (typeof UI_CATEGORIES)[number];

// Map each product's category field to the UI filter category
export const categoryToUI: Record<string, UICategory> = {
  "Whey Protein": "Whey Protein",
  "Plant Protein": "Recovery",
  "Mass Gainer": "Whey Protein",
  "Pre-Workout": "Pre-Workout",
  "Amino Acids": "Recovery",
  Performance: "Pre-Workout",
  Vitamins: "Vitamins",
  Recovery: "Recovery",
};

export const allProducts: Product[] = [
  // ── Whey Protein ──
  {
    id: "whey-isolate-unflavored",
    name: "Whey Protein Isolate (Unflavored)",
    price: 2499,
    stock: 25,
    category: "Whey Protein",
    subCategory: "Isolate",
    tags: ["Muscle Gain", "High Protein"],
    image: productWhey,
  },
  {
    id: "whey-isolate-chocolate",
    name: "Whey Protein Isolate (Chocolate)",
    price: 2599,
    stock: 30,
    category: "Whey Protein",
    subCategory: "Isolate",
    tags: ["Muscle Gain", "Best Seller"],
    image: productWhey,
  },
  {
    id: "whey-isolate-vanilla",
    name: "Whey Protein Isolate (Vanilla)",
    price: 2599,
    stock: 28,
    category: "Whey Protein",
    subCategory: "Isolate",
    tags: ["Muscle Gain"],
    image: productWhey,
  },
  {
    id: "whey-concentrate",
    name: "Whey Protein Concentrate",
    price: 1899,
    stock: 40,
    category: "Whey Protein",
    subCategory: "Concentrate",
    tags: ["Muscle Gain", "Value"],
    image: productWhey,
  },
  {
    id: "whey-blend",
    name: "Whey Protein Blend (Isolate + Concentrate)",
    price: 2199,
    stock: 35,
    category: "Whey Protein",
    subCategory: "Blend",
    tags: ["Muscle Gain"],
    image: productWhey,
  },
  {
    id: "hydrolyzed-whey",
    name: "Hydrolyzed Whey Protein",
    price: 3299,
    stock: 15,
    category: "Whey Protein",
    subCategory: "Hydrolyzed",
    tags: ["Muscle Gain", "Fast Absorbing"],
    image: productHydrolyzedWhey,
  },
  {
    id: "whey-double-chocolate",
    name: "Double Chocolate Whey",
    price: 2699,
    stock: 20,
    category: "Whey Protein",
    subCategory: "Flavored",
    tags: ["Muscle Gain", "Best Seller"],
    image: productWhey,
  },
  {
    id: "whey-cookies-cream",
    name: "Cookies & Cream Whey",
    price: 2699,
    stock: 18,
    category: "Whey Protein",
    subCategory: "Flavored",
    tags: ["Muscle Gain"],
    image: productWhey,
  },

  // ── Plant Protein ──
  {
    id: "pea-protein",
    name: "Pea Protein Isolate",
    price: 1799,
    stock: 30,
    category: "Plant Protein",
    subCategory: "Pea",
    tags: ["Vegan", "Weight Loss"],
    image: productPlantProtein,
  },
  {
    id: "brown-rice-protein",
    name: "Brown Rice Protein",
    price: 1599,
    stock: 25,
    category: "Plant Protein",
    subCategory: "Rice",
    tags: ["Vegan", "Gluten Free"],
    image: productPlantProtein,
  },
  {
    id: "soy-protein",
    name: "Soy Protein Isolate",
    price: 1699,
    stock: 22,
    category: "Plant Protein",
    subCategory: "Soy",
    tags: ["Vegan"],
    image: productPlantProtein,
  },
  {
    id: "vegan-blend",
    name: "Vegan Protein Blend (Pea + Rice)",
    price: 1999,
    stock: 20,
    category: "Plant Protein",
    subCategory: "Blend",
    tags: ["Vegan", "Best Seller"],
    image: productPlantProtein,
  },
  {
    id: "organic-plant",
    name: "Organic Plant Protein (No Additives)",
    price: 2299,
    stock: 15,
    category: "Plant Protein",
    subCategory: "Organic",
    tags: ["Vegan", "Organic"],
    image: productPlantProtein,
  },

  // ── Mass Gainer ──
  {
    id: "mass-gainer-basic",
    name: "Mass Gainer (Basic)",
    price: 2999,
    stock: 20,
    category: "Mass Gainer",
    subCategory: "Standard",
    tags: ["Muscle Gain", "Bulking"],
    image: productMassGainer,
  },
  {
    id: "mass-gainer-high-cal",
    name: "High-Calorie Mass Gainer (1000+ kcal)",
    price: 3499,
    stock: 12,
    category: "Mass Gainer",
    subCategory: "High Calorie",
    tags: ["Muscle Gain", "Bulking"],
    image: productMassGainer,
  },
  {
    id: "lean-mass-gainer",
    name: "Lean Mass Gainer (Low Fat)",
    price: 3199,
    stock: 18,
    category: "Mass Gainer",
    subCategory: "Lean",
    tags: ["Muscle Gain", "Lean Bulk"],
    image: productMassGainer,
  },

  // ── Pre-Workout ──
  {
    id: "preworkout",
    name: "Ignite Pre-Workout",
    price: 1299,
    stock: 40,
    category: "Pre-Workout",
    subCategory: "Stimulant",
    tags: ["Energy", "Performance"],
    image: productPreworkout,
  },

  // ── Performance ──
  {
    id: "creatine",
    name: "Creatine Monohydrate",
    price: 799,
    stock: 50,
    category: "Performance",
    subCategory: "Creatine",
    tags: ["Performance", "Muscle Gain"],
    image: productCreatine,
  },

  // ── Amino Acids / Recovery ──
  {
    id: "bcaa",
    name: "BCAA Recovery Blend",
    price: 999,
    stock: 30,
    category: "Amino Acids",
    subCategory: "BCAA",
    tags: ["Recovery", "Weight Loss"],
    image: productBcaa,
  },
  {
    id: "casein",
    name: "Casein Night Protein",
    price: 2199,
    stock: 10,
    category: "Recovery",
    subCategory: "Casein",
    tags: ["Recovery", "Muscle Gain"],
    image: productCasein,
  },

  // ── Vitamins ──
  {
    id: "vitamins",
    name: "Daily Multivitamin",
    price: 599,
    stock: 60,
    category: "Vitamins",
    subCategory: "Multivitamin",
    tags: ["Health", "Daily"],
    image: productVitamins,
  },
];

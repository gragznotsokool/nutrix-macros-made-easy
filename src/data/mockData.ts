// Mock data layer - structured for future API replacement

export interface CRMCustomer {
  id: string;
  name: string;
  email: string;
  goal: "Weight Loss" | "Muscle Gain" | "Maintenance";
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  loyaltyPoints: number;
  memberSince: string;
  dailyCalorieGoal: number;
  totalOrders: number;
  totalSpent: number;
  currentCartValue: number;
  productPreferences: { name: string; score: number }[];
  recentOrders: { id: string; date: string; total: number; items: string[] }[];
  weeklyActivity: { day: string; value: number }[];
  monthlyPurchases: { month: string; amount: number }[];
}

export interface ERPProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

export interface ERPOrder {
  id: string;
  customerName: string;
  products: string[];
  date: string;
  value: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
}

export const erpProducts: ERPProduct[] = [
  { id: "whey", name: "Premium Whey Isolate", category: "Protein", price: 2499, stock: 25, status: "In Stock" },
  { id: "preworkout", name: "Ignite Pre-Workout", category: "Pre-Workout", price: 1299, stock: 40, status: "In Stock" },
  { id: "bcaa", name: "BCAA Recovery Blend", category: "Amino Acids", price: 999, stock: 30, status: "In Stock" },
  { id: "creatine", name: "Creatine Monohydrate", category: "Performance", price: 799, stock: 50, status: "In Stock" },
  { id: "vitamins", name: "Daily Multivitamin", category: "Vitamins", price: 599, stock: 60, status: "In Stock" },
  { id: "omega3", name: "Omega-3 Fish Oil", category: "Vitamins", price: 699, stock: 5, status: "Low Stock" },
  { id: "glutamine", name: "L-Glutamine Powder", category: "Amino Acids", price: 899, stock: 3, status: "Low Stock" },
  { id: "casein", name: "Casein Night Protein", category: "Protein", price: 2199, stock: 0, status: "Out of Stock" },
];

export const erpOrders: ERPOrder[] = [
  { id: "ORD-1001", customerName: "Arjun Mehta", products: ["Premium Whey Isolate", "Creatine Monohydrate"], date: "2026-03-24", value: 3298, status: "Delivered" },
  { id: "ORD-1002", customerName: "Priya Sharma", products: ["BCAA Recovery Blend"], date: "2026-03-23", value: 999, status: "Shipped" },
  { id: "ORD-1003", customerName: "Rahul Verma", products: ["Ignite Pre-Workout", "Daily Multivitamin"], date: "2026-03-23", value: 1898, status: "Processing" },
  { id: "ORD-1004", customerName: "Sneha Patel", products: ["Premium Whey Isolate"], date: "2026-03-22", value: 2499, status: "Delivered" },
  { id: "ORD-1005", customerName: "Vikram Singh", products: ["Creatine Monohydrate", "BCAA Recovery Blend", "Omega-3 Fish Oil"], date: "2026-03-22", value: 2497, status: "Pending" },
  { id: "ORD-1006", customerName: "Ananya Das", products: ["L-Glutamine Powder"], date: "2026-03-21", value: 899, status: "Delivered" },
  { id: "ORD-1007", customerName: "Karan Joshi", products: ["Premium Whey Isolate", "Ignite Pre-Workout"], date: "2026-03-21", value: 3798, status: "Shipped" },
  { id: "ORD-1008", customerName: "Meera Nair", products: ["Daily Multivitamin", "Omega-3 Fish Oil"], date: "2026-03-20", value: 1298, status: "Delivered" },
];

export const crmCustomers: CRMCustomer[] = [
  {
    id: "cust-1",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    goal: "Muscle Gain",
    membershipTier: "Platinum",
    loyaltyPoints: 4520,
    memberSince: "2024-06-15",
    dailyCalorieGoal: 3200,
    totalOrders: 28,
    totalSpent: 72450,
    currentCartValue: 3298,
    productPreferences: [
      { name: "Protein", score: 92 },
      { name: "Performance", score: 78 },
      { name: "Amino Acids", score: 65 },
      { name: "Pre-Workout", score: 55 },
    ],
    recentOrders: [
      { id: "ORD-1001", date: "2026-03-24", total: 3298, items: ["Whey Isolate", "Creatine"] },
      { id: "ORD-0998", date: "2026-03-18", total: 2499, items: ["Whey Isolate"] },
      { id: "ORD-0990", date: "2026-03-10", total: 1898, items: ["Pre-Workout", "BCAA"] },
    ],
    weeklyActivity: [
      { day: "Mon", value: 85 }, { day: "Tue", value: 72 }, { day: "Wed", value: 90 },
      { day: "Thu", value: 65 }, { day: "Fri", value: 88 }, { day: "Sat", value: 95 }, { day: "Sun", value: 40 },
    ],
    monthlyPurchases: [
      { month: "Oct", amount: 5200 }, { month: "Nov", amount: 7800 }, { month: "Dec", amount: 6400 },
      { month: "Jan", amount: 8900 }, { month: "Feb", amount: 7200 }, { month: "Mar", amount: 9100 },
    ],
  },
  {
    id: "cust-2",
    name: "Priya Sharma",
    email: "priya@example.com",
    goal: "Weight Loss",
    membershipTier: "Gold",
    loyaltyPoints: 2180,
    memberSince: "2025-01-10",
    dailyCalorieGoal: 1800,
    totalOrders: 14,
    totalSpent: 28600,
    currentCartValue: 0,
    productPreferences: [
      { name: "Amino Acids", score: 88 },
      { name: "Vitamins", score: 82 },
      { name: "Protein", score: 60 },
      { name: "Performance", score: 30 },
    ],
    recentOrders: [
      { id: "ORD-1002", date: "2026-03-23", total: 999, items: ["BCAA Recovery"] },
      { id: "ORD-0985", date: "2026-03-05", total: 1298, items: ["Vitamins", "Omega-3"] },
    ],
    weeklyActivity: [
      { day: "Mon", value: 60 }, { day: "Tue", value: 80 }, { day: "Wed", value: 55 },
      { day: "Thu", value: 75 }, { day: "Fri", value: 90 }, { day: "Sat", value: 45 }, { day: "Sun", value: 30 },
    ],
    monthlyPurchases: [
      { month: "Oct", amount: 2100 }, { month: "Nov", amount: 3400 }, { month: "Dec", amount: 2800 },
      { month: "Jan", amount: 4200 }, { month: "Feb", amount: 3600 }, { month: "Mar", amount: 4500 },
    ],
  },
  {
    id: "cust-3",
    name: "Rahul Verma",
    email: "rahul@example.com",
    goal: "Maintenance",
    membershipTier: "Silver",
    loyaltyPoints: 980,
    memberSince: "2025-08-22",
    dailyCalorieGoal: 2500,
    totalOrders: 7,
    totalSpent: 12400,
    currentCartValue: 1898,
    productPreferences: [
      { name: "Pre-Workout", score: 90 },
      { name: "Vitamins", score: 70 },
      { name: "Protein", score: 55 },
      { name: "Amino Acids", score: 40 },
    ],
    recentOrders: [
      { id: "ORD-1003", date: "2026-03-23", total: 1898, items: ["Pre-Workout", "Vitamins"] },
    ],
    weeklyActivity: [
      { day: "Mon", value: 50 }, { day: "Tue", value: 65 }, { day: "Wed", value: 70 },
      { day: "Thu", value: 55 }, { day: "Fri", value: 60 }, { day: "Sat", value: 80 }, { day: "Sun", value: 35 },
    ],
    monthlyPurchases: [
      { month: "Oct", amount: 1800 }, { month: "Nov", amount: 2200 }, { month: "Dec", amount: 1500 },
      { month: "Jan", amount: 2800 }, { month: "Feb", amount: 2100 }, { month: "Mar", amount: 3200 },
    ],
  },
];

// Product recommendations based on goal
export const goalRecommendations: Record<string, { products: string[]; reason: string }> = {
  lose: {
    products: ["BCAA Recovery Blend", "Daily Multivitamin", "Omega-3 Fish Oil"],
    reason: "These support fat loss by preserving muscle, boosting metabolism, and reducing inflammation.",
  },
  maintain: {
    products: ["Premium Whey Isolate", "Daily Multivitamin", "Creatine Monohydrate"],
    reason: "Maintain your current physique with balanced protein intake and essential nutrients.",
  },
  gain: {
    products: ["Premium Whey Isolate", "Creatine Monohydrate", "Ignite Pre-Workout", "L-Glutamine Powder"],
    reason: "Maximize muscle growth with high-quality protein, creatine for strength, and pre-workout for intensity.",
  },
};

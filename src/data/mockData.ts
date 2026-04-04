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
  { id: "ORD-1009", customerName: "Rohan Kapoor", products: ["Premium Whey Isolate", "BCAA Recovery Blend"], date: "2026-03-19", value: 3498, status: "Delivered" },
  { id: "ORD-1010", customerName: "Ishita Gupta", products: ["Daily Multivitamin"], date: "2026-03-18", value: 599, status: "Shipped" },
  { id: "ORD-1011", customerName: "Aditya Rao", products: ["Creatine Monohydrate", "Ignite Pre-Workout"], date: "2026-03-17", value: 2098, status: "Delivered" },
  { id: "ORD-1012", customerName: "Kavya Iyer", products: ["Omega-3 Fish Oil", "L-Glutamine Powder"], date: "2026-03-16", value: 1598, status: "Processing" },
];

export const crmCustomers: CRMCustomer[] = [
  {
    id: "cust-1", name: "Arjun Mehta", email: "arjun@example.com", goal: "Muscle Gain",
    membershipTier: "Platinum", loyaltyPoints: 4520, memberSince: "2024-06-15", dailyCalorieGoal: 3200,
    totalOrders: 28, totalSpent: 72450, currentCartValue: 3298,
    productPreferences: [{ name: "Protein", score: 92 }, { name: "Performance", score: 78 }, { name: "Amino Acids", score: 65 }, { name: "Pre-Workout", score: 55 }],
    recentOrders: [{ id: "ORD-1001", date: "2026-03-24", total: 3298, items: ["Whey Isolate", "Creatine"] }, { id: "ORD-0998", date: "2026-03-18", total: 2499, items: ["Whey Isolate"] }],
    weeklyActivity: [{ day: "Mon", value: 85 }, { day: "Tue", value: 72 }, { day: "Wed", value: 90 }, { day: "Thu", value: 65 }, { day: "Fri", value: 88 }, { day: "Sat", value: 95 }, { day: "Sun", value: 40 }],
    monthlyPurchases: [{ month: "Oct", amount: 5200 }, { month: "Nov", amount: 7800 }, { month: "Dec", amount: 6400 }, { month: "Jan", amount: 8900 }, { month: "Feb", amount: 7200 }, { month: "Mar", amount: 9100 }],
  },
  {
    id: "cust-2", name: "Priya Sharma", email: "priya@example.com", goal: "Weight Loss",
    membershipTier: "Gold", loyaltyPoints: 2180, memberSince: "2025-01-10", dailyCalorieGoal: 1800,
    totalOrders: 14, totalSpent: 28600, currentCartValue: 0,
    productPreferences: [{ name: "Amino Acids", score: 88 }, { name: "Vitamins", score: 82 }, { name: "Protein", score: 60 }, { name: "Performance", score: 30 }],
    recentOrders: [{ id: "ORD-1002", date: "2026-03-23", total: 999, items: ["BCAA Recovery"] }, { id: "ORD-0985", date: "2026-03-05", total: 1298, items: ["Vitamins", "Omega-3"] }],
    weeklyActivity: [{ day: "Mon", value: 60 }, { day: "Tue", value: 80 }, { day: "Wed", value: 55 }, { day: "Thu", value: 75 }, { day: "Fri", value: 90 }, { day: "Sat", value: 45 }, { day: "Sun", value: 30 }],
    monthlyPurchases: [{ month: "Oct", amount: 2100 }, { month: "Nov", amount: 3400 }, { month: "Dec", amount: 2800 }, { month: "Jan", amount: 4200 }, { month: "Feb", amount: 3600 }, { month: "Mar", amount: 4500 }],
  },
  {
    id: "cust-3", name: "Rahul Verma", email: "rahul@example.com", goal: "Maintenance",
    membershipTier: "Silver", loyaltyPoints: 980, memberSince: "2025-08-22", dailyCalorieGoal: 2500,
    totalOrders: 7, totalSpent: 12400, currentCartValue: 1898,
    productPreferences: [{ name: "Pre-Workout", score: 90 }, { name: "Vitamins", score: 70 }, { name: "Protein", score: 55 }, { name: "Amino Acids", score: 40 }],
    recentOrders: [{ id: "ORD-1003", date: "2026-03-23", total: 1898, items: ["Pre-Workout", "Vitamins"] }],
    weeklyActivity: [{ day: "Mon", value: 50 }, { day: "Tue", value: 65 }, { day: "Wed", value: 70 }, { day: "Thu", value: 55 }, { day: "Fri", value: 60 }, { day: "Sat", value: 80 }, { day: "Sun", value: 35 }],
    monthlyPurchases: [{ month: "Oct", amount: 1800 }, { month: "Nov", amount: 2200 }, { month: "Dec", amount: 1500 }, { month: "Jan", amount: 2800 }, { month: "Feb", amount: 2100 }, { month: "Mar", amount: 3200 }],
  },
  {
    id: "cust-4", name: "Sneha Patel", email: "sneha@example.com", goal: "Weight Loss",
    membershipTier: "Gold", loyaltyPoints: 3100, memberSince: "2024-11-05", dailyCalorieGoal: 1600,
    totalOrders: 19, totalSpent: 38200, currentCartValue: 2499,
    productPreferences: [{ name: "Protein", score: 85 }, { name: "Vitamins", score: 78 }, { name: "Amino Acids", score: 62 }, { name: "Pre-Workout", score: 25 }],
    recentOrders: [{ id: "ORD-1004", date: "2026-03-22", total: 2499, items: ["Premium Whey Isolate"] }],
    weeklyActivity: [{ day: "Mon", value: 70 }, { day: "Tue", value: 85 }, { day: "Wed", value: 60 }, { day: "Thu", value: 90 }, { day: "Fri", value: 75 }, { day: "Sat", value: 50 }, { day: "Sun", value: 45 }],
    monthlyPurchases: [{ month: "Oct", amount: 3100 }, { month: "Nov", amount: 4200 }, { month: "Dec", amount: 3800 }, { month: "Jan", amount: 5100 }, { month: "Feb", amount: 4600 }, { month: "Mar", amount: 5500 }],
  },
  {
    id: "cust-5", name: "Vikram Singh", email: "vikram@example.com", goal: "Muscle Gain",
    membershipTier: "Platinum", loyaltyPoints: 5200, memberSince: "2024-03-20", dailyCalorieGoal: 3500,
    totalOrders: 35, totalSpent: 89500, currentCartValue: 2497,
    productPreferences: [{ name: "Protein", score: 95 }, { name: "Performance", score: 88 }, { name: "Pre-Workout", score: 82 }, { name: "Amino Acids", score: 70 }],
    recentOrders: [{ id: "ORD-1005", date: "2026-03-22", total: 2497, items: ["Creatine", "BCAA", "Omega-3"] }, { id: "ORD-0992", date: "2026-03-12", total: 3798, items: ["Whey Isolate", "Pre-Workout"] }],
    weeklyActivity: [{ day: "Mon", value: 95 }, { day: "Tue", value: 88 }, { day: "Wed", value: 92 }, { day: "Thu", value: 80 }, { day: "Fri", value: 90 }, { day: "Sat", value: 98 }, { day: "Sun", value: 55 }],
    monthlyPurchases: [{ month: "Oct", amount: 7200 }, { month: "Nov", amount: 8800 }, { month: "Dec", amount: 7600 }, { month: "Jan", amount: 9800 }, { month: "Feb", amount: 8500 }, { month: "Mar", amount: 10200 }],
  },
  {
    id: "cust-6", name: "Ananya Das", email: "ananya@example.com", goal: "Maintenance",
    membershipTier: "Bronze", loyaltyPoints: 450, memberSince: "2025-12-01", dailyCalorieGoal: 2200,
    totalOrders: 3, totalSpent: 4800, currentCartValue: 0,
    productPreferences: [{ name: "Amino Acids", score: 75 }, { name: "Vitamins", score: 68 }, { name: "Protein", score: 45 }, { name: "Performance", score: 20 }],
    recentOrders: [{ id: "ORD-1006", date: "2026-03-21", total: 899, items: ["L-Glutamine"] }],
    weeklyActivity: [{ day: "Mon", value: 40 }, { day: "Tue", value: 55 }, { day: "Wed", value: 60 }, { day: "Thu", value: 45 }, { day: "Fri", value: 50 }, { day: "Sat", value: 65 }, { day: "Sun", value: 25 }],
    monthlyPurchases: [{ month: "Oct", amount: 0 }, { month: "Nov", amount: 0 }, { month: "Dec", amount: 899 }, { month: "Jan", amount: 1598 }, { month: "Feb", amount: 1200 }, { month: "Mar", amount: 1100 }],
  },
  {
    id: "cust-7", name: "Karan Joshi", email: "karan@example.com", goal: "Muscle Gain",
    membershipTier: "Gold", loyaltyPoints: 2800, memberSince: "2024-09-18", dailyCalorieGoal: 3000,
    totalOrders: 22, totalSpent: 56200, currentCartValue: 3798,
    productPreferences: [{ name: "Protein", score: 90 }, { name: "Pre-Workout", score: 85 }, { name: "Performance", score: 72 }, { name: "Amino Acids", score: 58 }],
    recentOrders: [{ id: "ORD-1007", date: "2026-03-21", total: 3798, items: ["Whey Isolate", "Pre-Workout"] }],
    weeklyActivity: [{ day: "Mon", value: 80 }, { day: "Tue", value: 75 }, { day: "Wed", value: 85 }, { day: "Thu", value: 70 }, { day: "Fri", value: 82 }, { day: "Sat", value: 90 }, { day: "Sun", value: 50 }],
    monthlyPurchases: [{ month: "Oct", amount: 4500 }, { month: "Nov", amount: 5800 }, { month: "Dec", amount: 5200 }, { month: "Jan", amount: 6500 }, { month: "Feb", amount: 5900 }, { month: "Mar", amount: 7100 }],
  },
  {
    id: "cust-8", name: "Meera Nair", email: "meera@example.com", goal: "Weight Loss",
    membershipTier: "Silver", loyaltyPoints: 1350, memberSince: "2025-05-14", dailyCalorieGoal: 1700,
    totalOrders: 10, totalSpent: 18900, currentCartValue: 1298,
    productPreferences: [{ name: "Vitamins", score: 92 }, { name: "Amino Acids", score: 70 }, { name: "Protein", score: 50 }, { name: "Pre-Workout", score: 18 }],
    recentOrders: [{ id: "ORD-1008", date: "2026-03-20", total: 1298, items: ["Vitamins", "Omega-3"] }],
    weeklyActivity: [{ day: "Mon", value: 55 }, { day: "Tue", value: 70 }, { day: "Wed", value: 65 }, { day: "Thu", value: 60 }, { day: "Fri", value: 72 }, { day: "Sat", value: 40 }, { day: "Sun", value: 30 }],
    monthlyPurchases: [{ month: "Oct", amount: 1800 }, { month: "Nov", amount: 2500 }, { month: "Dec", amount: 2200 }, { month: "Jan", amount: 3200 }, { month: "Feb", amount: 2800 }, { month: "Mar", amount: 3500 }],
  },
  {
    id: "cust-9", name: "Rohan Kapoor", email: "rohan@example.com", goal: "Muscle Gain",
    membershipTier: "Gold", loyaltyPoints: 2650, memberSince: "2024-08-10", dailyCalorieGoal: 3100,
    totalOrders: 20, totalSpent: 52800, currentCartValue: 0,
    productPreferences: [{ name: "Protein", score: 94 }, { name: "Performance", score: 80 }, { name: "Amino Acids", score: 68 }, { name: "Pre-Workout", score: 60 }],
    recentOrders: [{ id: "ORD-1009", date: "2026-03-19", total: 3498, items: ["Whey Isolate", "BCAA"] }],
    weeklyActivity: [{ day: "Mon", value: 88 }, { day: "Tue", value: 82 }, { day: "Wed", value: 90 }, { day: "Thu", value: 78 }, { day: "Fri", value: 85 }, { day: "Sat", value: 92 }, { day: "Sun", value: 48 }],
    monthlyPurchases: [{ month: "Oct", amount: 4800 }, { month: "Nov", amount: 6200 }, { month: "Dec", amount: 5500 }, { month: "Jan", amount: 7200 }, { month: "Feb", amount: 6800 }, { month: "Mar", amount: 7800 }],
  },
  {
    id: "cust-10", name: "Ishita Gupta", email: "ishita@example.com", goal: "Weight Loss",
    membershipTier: "Bronze", loyaltyPoints: 320, memberSince: "2026-01-05", dailyCalorieGoal: 1500,
    totalOrders: 2, totalSpent: 3200, currentCartValue: 599,
    productPreferences: [{ name: "Vitamins", score: 80 }, { name: "Amino Acids", score: 45 }, { name: "Protein", score: 35 }, { name: "Performance", score: 10 }],
    recentOrders: [{ id: "ORD-1010", date: "2026-03-18", total: 599, items: ["Daily Multivitamin"] }],
    weeklyActivity: [{ day: "Mon", value: 35 }, { day: "Tue", value: 50 }, { day: "Wed", value: 45 }, { day: "Thu", value: 40 }, { day: "Fri", value: 55 }, { day: "Sat", value: 30 }, { day: "Sun", value: 20 }],
    monthlyPurchases: [{ month: "Oct", amount: 0 }, { month: "Nov", amount: 0 }, { month: "Dec", amount: 0 }, { month: "Jan", amount: 599 }, { month: "Feb", amount: 1200 }, { month: "Mar", amount: 1400 }],
  },
  {
    id: "cust-11", name: "Aditya Rao", email: "aditya@example.com", goal: "Muscle Gain",
    membershipTier: "Silver", loyaltyPoints: 1580, memberSince: "2025-04-28", dailyCalorieGoal: 2900,
    totalOrders: 12, totalSpent: 24600, currentCartValue: 2098,
    productPreferences: [{ name: "Performance", score: 88 }, { name: "Pre-Workout", score: 82 }, { name: "Protein", score: 75 }, { name: "Amino Acids", score: 50 }],
    recentOrders: [{ id: "ORD-1011", date: "2026-03-17", total: 2098, items: ["Creatine", "Pre-Workout"] }],
    weeklyActivity: [{ day: "Mon", value: 72 }, { day: "Tue", value: 68 }, { day: "Wed", value: 80 }, { day: "Thu", value: 65 }, { day: "Fri", value: 78 }, { day: "Sat", value: 85 }, { day: "Sun", value: 42 }],
    monthlyPurchases: [{ month: "Oct", amount: 2200 }, { month: "Nov", amount: 3500 }, { month: "Dec", amount: 3000 }, { month: "Jan", amount: 4200 }, { month: "Feb", amount: 3800 }, { month: "Mar", amount: 4600 }],
  },
  {
    id: "cust-12", name: "Kavya Iyer", email: "kavya@example.com", goal: "Maintenance",
    membershipTier: "Silver", loyaltyPoints: 1100, memberSince: "2025-07-12", dailyCalorieGoal: 2300,
    totalOrders: 8, totalSpent: 15200, currentCartValue: 1598,
    productPreferences: [{ name: "Vitamins", score: 85 }, { name: "Amino Acids", score: 78 }, { name: "Protein", score: 55 }, { name: "Performance", score: 35 }],
    recentOrders: [{ id: "ORD-1012", date: "2026-03-16", total: 1598, items: ["Omega-3", "L-Glutamine"] }],
    weeklyActivity: [{ day: "Mon", value: 58 }, { day: "Tue", value: 62 }, { day: "Wed", value: 70 }, { day: "Thu", value: 55 }, { day: "Fri", value: 68 }, { day: "Sat", value: 75 }, { day: "Sun", value: 38 }],
    monthlyPurchases: [{ month: "Oct", amount: 1500 }, { month: "Nov", amount: 2200 }, { month: "Dec", amount: 1900 }, { month: "Jan", amount: 2800 }, { month: "Feb", amount: 2500 }, { month: "Mar", amount: 3100 }],
  },
  {
    id: "cust-13", name: "Deepak Tiwari", email: "deepak@example.com", goal: "Muscle Gain",
    membershipTier: "Bronze", loyaltyPoints: 680, memberSince: "2025-10-15", dailyCalorieGoal: 3400,
    totalOrders: 5, totalSpent: 9800, currentCartValue: 0,
    productPreferences: [{ name: "Protein", score: 88 }, { name: "Performance", score: 72 }, { name: "Pre-Workout", score: 65 }, { name: "Amino Acids", score: 42 }],
    recentOrders: [{ id: "ORD-0980", date: "2026-03-10", total: 2499, items: ["Premium Whey Isolate"] }],
    weeklyActivity: [{ day: "Mon", value: 65 }, { day: "Tue", value: 58 }, { day: "Wed", value: 72 }, { day: "Thu", value: 60 }, { day: "Fri", value: 70 }, { day: "Sat", value: 78 }, { day: "Sun", value: 35 }],
    monthlyPurchases: [{ month: "Oct", amount: 0 }, { month: "Nov", amount: 1299 }, { month: "Dec", amount: 2499 }, { month: "Jan", amount: 2098 }, { month: "Feb", amount: 1899 }, { month: "Mar", amount: 2000 }],
  },
  {
    id: "cust-14", name: "Nisha Reddy", email: "nisha@example.com", goal: "Weight Loss",
    membershipTier: "Gold", loyaltyPoints: 2400, memberSince: "2024-12-08", dailyCalorieGoal: 1650,
    totalOrders: 16, totalSpent: 32400, currentCartValue: 999,
    productPreferences: [{ name: "Amino Acids", score: 90 }, { name: "Vitamins", score: 85 }, { name: "Protein", score: 58 }, { name: "Performance", score: 22 }],
    recentOrders: [{ id: "ORD-0975", date: "2026-03-08", total: 1698, items: ["BCAA", "Omega-3"] }, { id: "ORD-0960", date: "2026-02-25", total: 2499, items: ["Whey Isolate"] }],
    weeklyActivity: [{ day: "Mon", value: 68 }, { day: "Tue", value: 78 }, { day: "Wed", value: 62 }, { day: "Thu", value: 82 }, { day: "Fri", value: 88 }, { day: "Sat", value: 52 }, { day: "Sun", value: 38 }],
    monthlyPurchases: [{ month: "Oct", amount: 2800 }, { month: "Nov", amount: 3600 }, { month: "Dec", amount: 3200 }, { month: "Jan", amount: 4500 }, { month: "Feb", amount: 4000 }, { month: "Mar", amount: 4800 }],
  },
  {
    id: "cust-15", name: "Siddharth Malhotra", email: "siddharth@example.com", goal: "Maintenance",
    membershipTier: "Platinum", loyaltyPoints: 4100, memberSince: "2024-04-02", dailyCalorieGoal: 2600,
    totalOrders: 30, totalSpent: 78500, currentCartValue: 1898,
    productPreferences: [{ name: "Protein", score: 88 }, { name: "Vitamins", score: 82 }, { name: "Performance", score: 75 }, { name: "Pre-Workout", score: 68 }],
    recentOrders: [{ id: "ORD-0970", date: "2026-03-06", total: 3798, items: ["Whey Isolate", "Pre-Workout"] }, { id: "ORD-0955", date: "2026-02-20", total: 1298, items: ["Vitamins", "Omega-3"] }],
    weeklyActivity: [{ day: "Mon", value: 82 }, { day: "Tue", value: 78 }, { day: "Wed", value: 88 }, { day: "Thu", value: 75 }, { day: "Fri", value: 85 }, { day: "Sat", value: 90 }, { day: "Sun", value: 55 }],
    monthlyPurchases: [{ month: "Oct", amount: 6200 }, { month: "Nov", amount: 7500 }, { month: "Dec", amount: 6800 }, { month: "Jan", amount: 8200 }, { month: "Feb", amount: 7800 }, { month: "Mar", amount: 8800 }],
  },
];

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

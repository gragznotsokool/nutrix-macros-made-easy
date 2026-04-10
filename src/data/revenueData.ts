// Revenue Models mock data — 4 models applicable to NutriX

export interface RevenueStream {
  model: string;
  description: string;
  monthlyRevenue: number;
  percentage: number;
  growth: number; // % month-over-month
  details: string;
}

export const revenueStreams: RevenueStream[] = [
  {
    model: "Sales Revenue",
    description: "Direct product sales via the NutriX web store. One-time purchases of supplements, proteins, and wellness products.",
    monthlyRevenue: 2850000,
    percentage: 52,
    growth: 12,
    details: "Primary revenue driver. Avg order value ₹2,340. 1,218 orders/month. Seasonal spikes during New Year and summer fitness seasons.",
  },
  {
    model: "Subscription Revenue",
    description: "Subscribe & Save recurring orders. Customers auto-receive products monthly at 15-20% discount. Predictable MRR.",
    monthlyRevenue: 1620000,
    percentage: 30,
    growth: 18,
    details: "680 active subscribers. Avg subscription value ₹2,382/month. 92% retention rate. Churn rate 8%. Fastest growing segment.",
  },
  {
    model: "Affiliate Revenue",
    description: "Fitness influencers and gym partners earn commission on referred sales. NutriX pays 8-12% per conversion.",
    monthlyRevenue: 580000,
    percentage: 11,
    growth: 22,
    details: "52 active affiliates. Top 10 affiliates drive 65% of affiliate revenue. Avg commission ₹280/sale. Growing via gym partnerships.",
  },
  {
    model: "Advertising Revenue",
    description: "Brand partnerships and sponsored product placements on the NutriX platform. Featured product spots and newsletter sponsorships.",
    monthlyRevenue: 400000,
    percentage: 7,
    growth: 8,
    details: "3 active brand partners. Newsletter sponsorship ₹50K/issue. Homepage featured spot ₹1.2L/month. Exploring podcast sponsorships.",
  },
];

export const revenueByMonth = [
  { month: "Oct", sales: 2200000, subscription: 1100000, affiliate: 320000, advertising: 280000 },
  { month: "Nov", sales: 2500000, subscription: 1250000, affiliate: 400000, advertising: 320000 },
  { month: "Dec", sales: 2350000, subscription: 1350000, affiliate: 450000, advertising: 350000 },
  { month: "Jan", sales: 2680000, subscription: 1480000, affiliate: 520000, advertising: 380000 },
  { month: "Feb", sales: 2750000, subscription: 1550000, affiliate: 540000, advertising: 390000 },
  { month: "Mar", sales: 2850000, subscription: 1620000, affiliate: 580000, advertising: 400000 },
];

export const revenueKPIs = {
  totalMonthlyRevenue: 5450000,
  totalAnnualProjected: 65400000,
  mrr: 1620000,
  arr: 19440000,
  avgOrderValue: 2340,
  customerLifetimeValue: 28500,
  revenueGrowthRate: 14,
  grossMargin: 62,
};

export const projections = [
  { quarter: "Q1 2026", revenue: 14200000, target: 13500000 },
  { quarter: "Q2 2026", revenue: 16800000, target: 15500000 },
  { quarter: "Q3 2026", revenue: 18500000, target: 17000000 },
  { quarter: "Q4 2026", revenue: 21000000, target: 19500000 },
];

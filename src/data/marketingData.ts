// 7P Marketing Strategy & Campaign mock data

export interface MarketingChannel {
  name: string;
  type: "Social Media" | "Paid Ads" | "Referral" | "Email" | "Influencer";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roi: number;
}

export interface SocialPost {
  platform: string;
  content: string;
  date: string;
  likes: number;
  shares: number;
  comments: number;
  reach: number;
}

export const sevenPStrategy = {
  product: {
    title: "Product",
    description: "Premium supplements with transparent macro information. 22+ SKUs across Whey, Plant Protein, Mass Gainers, Pre-Workout, Vitamins, and Recovery categories.",
    highlights: ["Lab-tested purity", "Transparent labels", "Goal-based formulations"],
  },
  price: {
    title: "Price",
    description: "Competitive D2C pricing eliminating middlemen. Subscribe & Save model offers 15-20% discounts on recurring orders.",
    highlights: ["₹799 — ₹3,499 range", "Subscribe & Save 20% off", "Bulk order discounts"],
  },
  place: {
    title: "Place",
    description: "Direct-to-consumer via NutriX web app. Pan-India delivery with warehouse hubs in Mumbai, Delhi, and Bengaluru.",
    highlights: ["D2C website", "Pan-India shipping", "Same-day dispatch in metro cities"],
  },
  promotion: {
    title: "Promotion",
    description: "Multi-channel strategy combining social media, influencer partnerships, referral programs, and targeted Google/Meta ads.",
    highlights: ["5 active channels", "₹8.5L monthly budget", "22% avg ROI"],
  },
  people: {
    title: "People",
    description: "Certified nutritionists for customer support. Dedicated account managers for wholesale clients. Community-driven brand ambassadors.",
    highlights: ["12 nutritionists on staff", "24/7 chat support", "50+ brand ambassadors"],
  },
  process: {
    title: "Process",
    description: "Streamlined order-to-delivery pipeline. Automated inventory management. AI-powered recommendation engine for personalized shopping.",
    highlights: ["Avg 2.3 day delivery", "Automated reordering", "AI product recommendations"],
  },
  physicalEvidence: {
    title: "Physical Evidence",
    description: "Premium packaging with QR-verified authenticity. Lab reports accessible on every product page. Trust badges and certifications.",
    highlights: ["QR authenticity check", "FSSAI certified", "ISO 22000 compliant"],
  },
};

export const marketingChannels: MarketingChannel[] = [
  { name: "Instagram Ads", type: "Social Media", budget: 250000, spent: 228000, impressions: 1850000, clicks: 74000, conversions: 3700, ctr: 4.0, cpc: 3.08, roi: 24 },
  { name: "Google Search Ads", type: "Paid Ads", budget: 300000, spent: 285000, impressions: 920000, clicks: 55200, conversions: 4416, ctr: 6.0, cpc: 5.16, roi: 28 },
  { name: "Referral Program", type: "Referral", budget: 100000, spent: 82000, impressions: 320000, clicks: 28800, conversions: 2880, ctr: 9.0, cpc: 2.85, roi: 35 },
  { name: "Email Campaigns", type: "Email", budget: 50000, spent: 42000, impressions: 180000, clicks: 21600, conversions: 2160, ctr: 12.0, cpc: 1.94, roi: 42 },
  { name: "Influencer Partnerships", type: "Influencer", budget: 150000, spent: 145000, impressions: 2200000, clicks: 88000, conversions: 3520, ctr: 4.0, cpc: 1.65, roi: 18 },
];

export const socialPosts: SocialPost[] = [
  { platform: "Instagram", content: "🔥 New Drop: Double Chocolate Whey Isolate. Zero sugar. 26g protein per scoop.", date: "2026-04-08", likes: 4200, shares: 890, comments: 312, reach: 85000 },
  { platform: "Twitter/X", content: "Your macros don't lie. Track them with our free calculator 💪 #NutriX #MacrosMadeEasy", date: "2026-04-07", likes: 1800, shares: 520, comments: 145, reach: 42000 },
  { platform: "YouTube", content: "Full Day of Eating with NutriX — featuring @FitVikram", date: "2026-04-05", likes: 8500, shares: 2100, comments: 680, reach: 220000 },
  { platform: "Facebook", content: "Subscribe & Save — Get 20% off every month. No contracts, cancel anytime.", date: "2026-04-03", likes: 2400, shares: 410, comments: 198, reach: 62000 },
];

export const campaignPerformance = [
  { month: "Oct", spend: 520000, revenue: 680000 },
  { month: "Nov", spend: 650000, revenue: 920000 },
  { month: "Dec", spend: 580000, revenue: 850000 },
  { month: "Jan", spend: 720000, revenue: 1050000 },
  { month: "Feb", spend: 680000, revenue: 980000 },
  { month: "Mar", spend: 780000, revenue: 1180000 },
];

export const adEngagementData = [
  { channel: "Instagram", engagement: 4.0 },
  { channel: "Google Ads", engagement: 6.0 },
  { channel: "Referral", engagement: 9.0 },
  { channel: "Email", engagement: 12.0 },
  { channel: "Influencer", engagement: 4.0 },
];

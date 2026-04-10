// CRM Feedback, Reviews, Complaints — automated analysis mock data

export interface CustomerFeedback {
  id: string;
  customerId: string;
  customerName: string;
  type: "Review" | "Complaint" | "Suggestion" | "Praise";
  category: string;
  message: string;
  rating: number; // 1-5
  date: string;
  status: "Open" | "Acknowledged" | "Resolved" | "Escalated";
  sentiment: "Positive" | "Neutral" | "Negative";
}

export interface FeedbackAnalysis {
  totalReports: number;
  positive: number;
  neutral: number;
  negative: number;
  avgRating: number;
  topIssues: { issue: string; count: number; percentage: number; severity: "Critical" | "Major" | "Minor" }[];
  categoryBreakdown: { category: string; count: number }[];
  resolutionRate: number;
  avgResolutionTime: string;
}

export const customerFeedback: CustomerFeedback[] = [
  { id: "FB-001", customerId: "cust-1", customerName: "Arjun Mehta", type: "Review", category: "Product Quality", message: "Whey Isolate is the best I've ever used. Clean taste, mixes easily.", rating: 5, date: "2026-04-08", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-002", customerId: "cust-2", customerName: "Priya Sharma", type: "Complaint", category: "Delivery", message: "Order took 8 days to arrive instead of promised 3 days.", rating: 2, date: "2026-04-07", status: "Resolved", sentiment: "Negative" },
  { id: "FB-003", customerId: "cust-3", customerName: "Rahul Verma", type: "Suggestion", category: "Product Range", message: "Would love to see a caffeine-free pre-workout option.", rating: 4, date: "2026-04-06", status: "Acknowledged", sentiment: "Neutral" },
  { id: "FB-004", customerId: "cust-4", customerName: "Sneha Patel", type: "Complaint", category: "Payment", message: "Razorpay payment failed twice before going through. Very frustrating.", rating: 2, date: "2026-04-05", status: "Escalated", sentiment: "Negative" },
  { id: "FB-005", customerId: "cust-5", customerName: "Vikram Singh", type: "Praise", category: "Product Quality", message: "Creatine monohydrate is lab-grade quality. Highly recommend!", rating: 5, date: "2026-04-05", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-006", customerId: "cust-6", customerName: "Ananya Das", type: "Complaint", category: "Packaging", message: "Received a torn package. Product was leaking.", rating: 1, date: "2026-04-04", status: "Resolved", sentiment: "Negative" },
  { id: "FB-007", customerId: "cust-7", customerName: "Karan Joshi", type: "Review", category: "Product Quality", message: "Pre-workout gives great energy boost without jitters. 4 stars.", rating: 4, date: "2026-04-03", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-008", customerId: "cust-8", customerName: "Meera Nair", type: "Complaint", category: "Delivery", message: "Wrong product delivered. Ordered Omega-3 but received BCAA.", rating: 1, date: "2026-04-02", status: "Escalated", sentiment: "Negative" },
  { id: "FB-009", customerId: "cust-9", customerName: "Rohan Kapoor", type: "Review", category: "Website", message: "The macro calculator is incredibly useful. Love the recommendation engine.", rating: 5, date: "2026-04-01", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-010", customerId: "cust-10", customerName: "Ishita Gupta", type: "Complaint", category: "Payment", message: "Unable to apply coupon code. Says expired but I just received it.", rating: 2, date: "2026-03-31", status: "Resolved", sentiment: "Negative" },
  { id: "FB-011", customerId: "cust-11", customerName: "Aditya Rao", type: "Praise", category: "Customer Support", message: "Support team resolved my issue within 2 hours. Excellent service!", rating: 5, date: "2026-03-30", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-012", customerId: "cust-12", customerName: "Kavya Iyer", type: "Suggestion", category: "Product Range", message: "Please add collagen peptides to your product line.", rating: 3, date: "2026-03-29", status: "Open", sentiment: "Neutral" },
  { id: "FB-013", customerId: "cust-13", customerName: "Deepak Tiwari", type: "Complaint", category: "Delivery", message: "Delivery person was rude and left package outside in rain.", rating: 1, date: "2026-03-28", status: "Resolved", sentiment: "Negative" },
  { id: "FB-014", customerId: "cust-14", customerName: "Nisha Reddy", type: "Review", category: "Product Quality", message: "BCAA blend has great flavors. The watermelon one is my favorite.", rating: 4, date: "2026-03-27", status: "Acknowledged", sentiment: "Positive" },
  { id: "FB-015", customerId: "cust-15", customerName: "Siddharth Malhotra", type: "Praise", category: "Subscribe & Save", message: "Subscribe & Save is the best feature. 20% off every month!", rating: 5, date: "2026-03-26", status: "Acknowledged", sentiment: "Positive" },
];

export const feedbackAnalysis: FeedbackAnalysis = {
  totalReports: 1000,
  positive: 420,
  neutral: 180,
  negative: 400,
  avgRating: 3.6,
  topIssues: [
    { issue: "Delivery delays (>5 days)", count: 280, percentage: 28, severity: "Critical" },
    { issue: "Payment gateway failures", count: 180, percentage: 18, severity: "Critical" },
    { issue: "Wrong product delivered", count: 120, percentage: 12, severity: "Major" },
    { issue: "Packaging damage", count: 95, percentage: 9.5, severity: "Major" },
    { issue: "Coupon/discount not applied", count: 75, percentage: 7.5, severity: "Minor" },
    { issue: "Website performance issues", count: 50, percentage: 5, severity: "Minor" },
  ],
  categoryBreakdown: [
    { category: "Delivery", count: 320 },
    { category: "Payment", count: 210 },
    { category: "Product Quality", count: 180 },
    { category: "Packaging", count: 110 },
    { category: "Customer Support", count: 80 },
    { category: "Website", count: 60 },
    { category: "Product Range", count: 40 },
  ],
  resolutionRate: 78,
  avgResolutionTime: "18 hours",
};

export const sentimentTrend = [
  { month: "Oct", positive: 55, neutral: 20, negative: 25 },
  { month: "Nov", positive: 50, neutral: 22, negative: 28 },
  { month: "Dec", positive: 48, neutral: 18, negative: 34 },
  { month: "Jan", positive: 52, neutral: 20, negative: 28 },
  { month: "Feb", positive: 58, neutral: 17, negative: 25 },
  { month: "Mar", positive: 62, neutral: 15, negative: 23 },
];

export const automatedActions = [
  {
    trigger: "Delivery delay > 5 days",
    action: "Auto-send apology email + ₹100 store credit",
    affected: 280,
    status: "Active",
  },
  {
    trigger: "Payment failure > 2 attempts",
    action: "Flag for manual review + offer alternative payment",
    affected: 180,
    status: "Active",
  },
  {
    trigger: "Wrong product complaint",
    action: "Auto-generate return label + priority re-ship",
    affected: 120,
    status: "Active",
  },
  {
    trigger: "Rating ≤ 2 stars",
    action: "Route to senior support + follow-up within 4 hours",
    affected: 400,
    status: "Active",
  },
  {
    trigger: "3+ complaints from same customer",
    action: "Assign dedicated account manager + retention offer",
    affected: 45,
    status: "Active",
  },
];

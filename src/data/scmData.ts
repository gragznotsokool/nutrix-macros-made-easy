// Supply Chain Management mock data

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  leadTimeDays: number;
  reliabilityScore: number; // 0-100
  status: "Active" | "Under Review" | "Inactive";
  lastDelivery: string;
  totalOrders: number;
  onTimeRate: number;
}

export interface ProcurementOrder {
  id: string;
  supplier: string;
  items: string[];
  quantity: number;
  totalCost: number;
  orderDate: string;
  expectedDelivery: string;
  status: "Ordered" | "In Transit" | "Received" | "Quality Check" | "Approved";
}

export interface WarehouseMetric {
  zone: string;
  capacity: number;
  utilized: number;
  items: number;
}

export const suppliers: Supplier[] = [
  { id: "SUP-001", name: "ProWhey Labs", category: "Raw Protein", location: "Mumbai, MH", leadTimeDays: 5, reliabilityScore: 96, status: "Active", lastDelivery: "2026-04-02", totalOrders: 142, onTimeRate: 94 },
  { id: "SUP-002", name: "VitaSource India", category: "Vitamins & Minerals", location: "Hyderabad, TG", leadTimeDays: 7, reliabilityScore: 91, status: "Active", lastDelivery: "2026-03-28", totalOrders: 98, onTimeRate: 89 },
  { id: "SUP-003", name: "FlavorChem Co.", category: "Flavoring Agents", location: "Pune, MH", leadTimeDays: 3, reliabilityScore: 88, status: "Active", lastDelivery: "2026-04-05", totalOrders: 210, onTimeRate: 92 },
  { id: "SUP-004", name: "PackRight Solutions", category: "Packaging", location: "Ahmedabad, GJ", leadTimeDays: 4, reliabilityScore: 93, status: "Active", lastDelivery: "2026-04-01", totalOrders: 175, onTimeRate: 96 },
  { id: "SUP-005", name: "GreenPlant Extracts", category: "Plant Protein", location: "Bengaluru, KA", leadTimeDays: 6, reliabilityScore: 85, status: "Under Review", lastDelivery: "2026-03-20", totalOrders: 64, onTimeRate: 82 },
  { id: "SUP-006", name: "CreaFuel Pvt Ltd", category: "Performance Compounds", location: "Delhi, DL", leadTimeDays: 8, reliabilityScore: 78, status: "Active", lastDelivery: "2026-03-25", totalOrders: 45, onTimeRate: 76 },
  { id: "SUP-007", name: "AminoTech Labs", category: "Amino Acids", location: "Chennai, TN", leadTimeDays: 5, reliabilityScore: 92, status: "Active", lastDelivery: "2026-04-03", totalOrders: 120, onTimeRate: 91 },
];

export const procurementOrders: ProcurementOrder[] = [
  { id: "PO-3001", supplier: "ProWhey Labs", items: ["Whey Protein Isolate Raw"], quantity: 500, totalCost: 425000, orderDate: "2026-03-25", expectedDelivery: "2026-03-30", status: "Approved" },
  { id: "PO-3002", supplier: "VitaSource India", items: ["Multivitamin Blend", "Omega-3 Concentrate"], quantity: 300, totalCost: 180000, orderDate: "2026-03-28", expectedDelivery: "2026-04-04", status: "Received" },
  { id: "PO-3003", supplier: "FlavorChem Co.", items: ["Chocolate Flavoring", "Vanilla Extract"], quantity: 200, totalCost: 95000, orderDate: "2026-04-01", expectedDelivery: "2026-04-04", status: "Quality Check" },
  { id: "PO-3004", supplier: "PackRight Solutions", items: ["1kg Pouches", "Scoops", "Labels"], quantity: 1000, totalCost: 120000, orderDate: "2026-04-02", expectedDelivery: "2026-04-06", status: "In Transit" },
  { id: "PO-3005", supplier: "GreenPlant Extracts", items: ["Pea Protein Isolate"], quantity: 250, totalCost: 210000, orderDate: "2026-04-03", expectedDelivery: "2026-04-09", status: "Ordered" },
  { id: "PO-3006", supplier: "AminoTech Labs", items: ["BCAA Powder", "L-Glutamine"], quantity: 400, totalCost: 340000, orderDate: "2026-04-05", expectedDelivery: "2026-04-10", status: "In Transit" },
];

export const warehouseMetrics: WarehouseMetric[] = [
  { zone: "Zone A — Proteins", capacity: 5000, utilized: 3800, items: 12 },
  { zone: "Zone B — Pre-Workout", capacity: 3000, utilized: 2100, items: 6 },
  { zone: "Zone C — Vitamins", capacity: 4000, utilized: 3200, items: 8 },
  { zone: "Zone D — Packaging", capacity: 6000, utilized: 4500, items: 15 },
  { zone: "Zone E — Finished Goods", capacity: 8000, utilized: 6200, items: 22 },
];

export const logisticsData = [
  { month: "Oct", inbound: 42, outbound: 38 },
  { month: "Nov", inbound: 55, outbound: 50 },
  { month: "Dec", inbound: 48, outbound: 62 },
  { month: "Jan", inbound: 60, outbound: 55 },
  { month: "Feb", inbound: 52, outbound: 58 },
  { month: "Mar", inbound: 65, outbound: 70 },
];

export const supplyChainKPIs = {
  totalSuppliers: 7,
  activeSuppliers: 6,
  avgLeadTime: 5.4,
  avgReliability: 89,
  pendingPOs: 3,
  totalProcurementValue: 1370000,
  warehouseUtilization: 76,
  onTimeDeliveryRate: 90,
};

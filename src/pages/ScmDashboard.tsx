import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Truck, Package, Factory, Clock, CheckCircle, AlertTriangle, TrendingUp, Warehouse } from "lucide-react";
import { suppliers, procurementOrders, warehouseMetrics, logisticsData, supplyChainKPIs } from "@/data/scmData";

const statusColors: Record<string, string> = {
  Ordered: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Transit": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Received: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Quality Check": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Approved: "bg-primary/20 text-primary border-primary/30",
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Under Review": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Inactive: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ScmDashboard = () => {
  const kpis = [
    { label: "Active Suppliers", value: supplyChainKPIs.activeSuppliers, icon: Factory, color: "text-primary" },
    { label: "Avg Lead Time", value: `${supplyChainKPIs.avgLeadTime} days`, icon: Clock, color: "text-blue-400" },
    { label: "On-Time Delivery", value: `${supplyChainKPIs.onTimeDeliveryRate}%`, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Pending POs", value: supplyChainKPIs.pendingPOs, icon: Package, color: "text-amber-400" },
    { label: "Procurement Value", value: `₹${(supplyChainKPIs.totalProcurementValue / 100000).toFixed(1)}L`, icon: TrendingUp, color: "text-purple-400" },
    { label: "Warehouse Usage", value: `${supplyChainKPIs.warehouseUtilization}%`, icon: Warehouse, color: "text-pink-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              SUPPLY CHAIN <span className="gradient-text">MANAGEMENT</span>
            </h1>
            <p className="text-muted-foreground text-lg">Supplier Performance, Procurement & Logistics</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {kpis.map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 text-center">
                    <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="font-display text-xl text-foreground">{kpi.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Supplier Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <Card className="border-border bg-card">
              <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Factory className="w-4 h-4 text-primary" /> Supplier Performance</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Lead Time</TableHead>
                        <TableHead>Reliability</TableHead>
                        <TableHead>On-Time %</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map(s => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{s.category}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{s.location}</TableCell>
                          <TableCell>{s.leadTimeDays} days</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={s.reliabilityScore} className="h-2 w-16" />
                              <span className="text-xs text-muted-foreground">{s.reliabilityScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell className={s.onTimeRate >= 90 ? "text-emerald-400" : s.onTimeRate >= 80 ? "text-amber-400" : "text-red-400"}>{s.onTimeRate}%</TableCell>
                          <TableCell>{s.totalOrders}</TableCell>
                          <TableCell><Badge variant="outline" className={statusColors[s.status]}>{s.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Logistics Flow</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={logisticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Legend />
                      <Bar dataKey="inbound" fill="hsl(82,85%,50%)" radius={[4, 4, 0, 0]} name="Inbound" />
                      <Bar dataKey="outbound" fill="hsl(200,85%,50%)" radius={[4, 4, 0, 0]} name="Outbound" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Warehouse className="w-4 h-4 text-primary" /> Warehouse Utilization</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {warehouseMetrics.map(w => (
                    <div key={w.zone}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{w.zone}</span>
                        <span className="text-foreground">{Math.round((w.utilized / w.capacity) * 100)}% — {w.items} items</span>
                      </div>
                      <Progress value={(w.utilized / w.capacity) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Procurement Orders */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-border bg-card">
              <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Procurement Orders</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>PO ID</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Expected</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procurementOrders.map(po => (
                        <TableRow key={po.id}>
                          <TableCell className="font-display text-foreground">{po.id}</TableCell>
                          <TableCell className="text-muted-foreground">{po.supplier}</TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{po.items.join(", ")}</TableCell>
                          <TableCell>{po.quantity}</TableCell>
                          <TableCell className="text-primary font-display">₹{(po.totalCost / 1000).toFixed(0)}K</TableCell>
                          <TableCell className="text-sm">{po.orderDate}</TableCell>
                          <TableCell className="text-sm">{po.expectedDelivery}</TableCell>
                          <TableCell><Badge variant="outline" className={statusColors[po.status]}>{po.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScmDashboard;

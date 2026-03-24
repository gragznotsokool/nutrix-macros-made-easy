import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, Truck, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { erpOrders } from "@/data/mockData";

type StatusFilter = "All" | "Pending" | "Processing" | "Shipped" | "Delivered";

const statusColors: Record<string, string> = {
  Pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Shipped: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Delivered: "bg-primary/20 text-primary border-primary/30",
};

const OrderManagement = () => {
  const [filter, setFilter] = useState<StatusFilter>("All");

  const filtered = filter === "All" ? erpOrders : erpOrders.filter(o => o.status === filter);
  const delivered = erpOrders.filter(o => o.status === "Delivered").length;
  const processing = erpOrders.filter(o => o.status === "Processing").length;
  const revenue = erpOrders.reduce((s, o) => s + o.value, 0);

  const summaryCards = [
    { label: "Total Orders", value: erpOrders.length, icon: ShoppingCart, color: "text-primary" },
    { label: "Delivered", value: delivered, icon: CheckCircle2, color: "text-emerald-400" },
    { label: "Processing", value: processing, icon: Clock, color: "text-blue-400" },
    { label: "Revenue", value: `₹${revenue.toLocaleString()}`, icon: DollarSign, color: "text-amber-400" },
  ];

  const filters: StatusFilter[] = ["All", "Pending", "Processing", "Shipped", "Delivered"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              ORDER <span className="gradient-text">MANAGEMENT</span>
            </h1>
            <p className="text-muted-foreground text-lg">Track, filter, and manage all orders</p>
          </motion.div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {summaryCards.map((card, i) => (
              <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 text-center">
                    <card.icon className={`w-5 h-5 mx-auto mb-2 ${card.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                    <p className="font-display text-2xl text-foreground">{card.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap justify-center mb-6">
            {filters.map(f => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="font-display tracking-wide">
                {f === "All" ? `ALL (${erpOrders.length})` : `${f.toUpperCase()} (${erpOrders.filter(o => o.status === f).length})`}
              </Button>
            ))}
          </div>

          {/* Orders Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-display text-foreground">{order.id}</TableCell>
                        <TableCell className="text-foreground">{order.customerName}</TableCell>
                        <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{order.products.join(", ")}</TableCell>
                        <TableCell className="text-muted-foreground">{order.date}</TableCell>
                        <TableCell className="text-right font-display text-foreground">₹{order.value.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={statusColors[order.status]}>{order.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderManagement;

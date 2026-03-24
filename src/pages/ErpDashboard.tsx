import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Package, DollarSign, ShoppingCart, TrendingUp, Archive } from "lucide-react";
import { erpProducts, erpOrders } from "@/data/mockData";

const ErpDashboard = () => {
  const totalInventoryValue = erpProducts.reduce((s, p) => s + p.price * p.stock, 0);
  const totalStockUnits = erpProducts.reduce((s, p) => s + p.stock, 0);
  const totalOrders = erpOrders.length;
  const totalRevenue = erpOrders.reduce((s, o) => s + o.value, 0);
  const productsSold = erpOrders.reduce((s, o) => s + o.products.length, 0);

  const inventoryData = erpProducts.map(p => ({ name: p.name.split(" ").slice(0, 2).join(" "), stock: p.stock, value: p.price * p.stock }));
  const salesTrend = [
    { date: "Mar 18", revenue: 4200 }, { date: "Mar 19", revenue: 3800 },
    { date: "Mar 20", revenue: 5100 }, { date: "Mar 21", revenue: 4697 },
    { date: "Mar 22", revenue: 4996 }, { date: "Mar 23", revenue: 2897 },
    { date: "Mar 24", revenue: 3298 },
  ];

  const kpis = [
    { label: "Inventory Value", value: `₹${totalInventoryValue.toLocaleString()}`, icon: Archive, color: "text-primary" },
    { label: "Stock Units", value: totalStockUnits, icon: Package, color: "text-blue-400" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingCart, color: "text-amber-400" },
    { label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-primary" },
    { label: "Products Sold", value: productsSold, icon: TrendingUp, color: "text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              ERP <span className="gradient-text">DASHBOARD</span>
            </h1>
            <p className="text-muted-foreground text-lg">Operations & Inventory Intelligence</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {kpis.map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border bg-card hover:border-primary/30 transition-all">
                  <CardContent className="p-4 text-center">
                    <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="font-display text-2xl text-foreground">{kpi.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-xl">Inventory Distribution</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={inventoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="name" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Bar dataKey="stock" fill="hsl(82,85%,50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-xl">Sales Trend (7 Days)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="date" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(82,85%,50%)" strokeWidth={2} dot={{ fill: "hsl(82,85%,50%)", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Inventory Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-border bg-card">
              <CardHeader><CardTitle className="font-display text-xl">Inventory Overview</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Stock</TableHead>
                      <TableHead className="text-right">Total Value</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {erpProducts.map(product => (
                      <TableRow key={product.id} className={product.status === "Low Stock" ? "bg-amber-500/5" : product.status === "Out of Stock" ? "bg-destructive/5" : ""}>
                        <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                        <TableCell className="text-right text-muted-foreground">₹{product.price}</TableCell>
                        <TableCell className="text-right text-foreground">{product.stock}</TableCell>
                        <TableCell className="text-right text-foreground">₹{(product.price * product.stock).toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={product.status === "In Stock" ? "default" : product.status === "Low Stock" ? "secondary" : "destructive"} className={product.status === "Low Stock" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : ""}>
                            {product.status}
                          </Badge>
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

export default ErpDashboard;

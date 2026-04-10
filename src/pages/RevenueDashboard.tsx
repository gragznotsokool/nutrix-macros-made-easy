import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, CreditCard, Repeat, Users, Globe, ArrowUpRight } from "lucide-react";
import { revenueStreams, revenueByMonth, revenueKPIs, projections } from "@/data/revenueData";

const MODEL_COLORS = ["hsl(82,85%,50%)", "hsl(200,85%,50%)", "hsl(340,85%,55%)", "hsl(45,95%,55%)"];

const modelIcons = [DollarSign, Repeat, Users, Globe];

const RevenueDashboard = () => {
  const pieData = revenueStreams.map(r => ({ name: r.model, value: r.monthlyRevenue }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              REVENUE <span className="gradient-text">MODELS</span>
            </h1>
            <p className="text-muted-foreground text-lg">Revenue Streams, Projections & Financial Intelligence</p>
          </motion.div>

          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Monthly Revenue", value: `₹${(revenueKPIs.totalMonthlyRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: "text-primary" },
              { label: "MRR (Subscriptions)", value: `₹${(revenueKPIs.mrr / 100000).toFixed(1)}L`, icon: Repeat, color: "text-blue-400" },
              { label: "Avg Order Value", value: `₹${revenueKPIs.avgOrderValue.toLocaleString()}`, icon: CreditCard, color: "text-amber-400" },
              { label: "Gross Margin", value: `${revenueKPIs.grossMargin}%`, icon: TrendingUp, color: "text-emerald-400" },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 text-center">
                    <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="font-display text-2xl text-foreground">{kpi.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Revenue Model Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
            <h2 className="font-display text-2xl text-foreground mb-4">Active Revenue Models</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {revenueStreams.map((stream, i) => {
                const Icon = modelIcons[i];
                return (
                  <Card key={stream.model} className="border-border bg-card hover:border-primary/30 transition-all">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${MODEL_COLORS[i]}20` }}>
                            <Icon className="w-5 h-5" style={{ color: MODEL_COLORS[i] }} />
                          </div>
                          <div>
                            <h3 className="font-display text-lg text-foreground">{stream.model}</h3>
                            <p className="text-xs text-muted-foreground">{stream.percentage}% of total revenue</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" /> {stream.growth}%
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{stream.description}</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Monthly Revenue</span>
                        <span className="font-display text-lg text-foreground">₹{(stream.monthlyRevenue / 100000).toFixed(1)}L</span>
                      </div>
                      <Progress value={stream.percentage} className="h-2 mb-3" />
                      <p className="text-xs text-muted-foreground">{stream.details}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Revenue by Stream (Monthly)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={revenueByMonth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} tickFormatter={(v) => `₹${v / 100000}L`} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
                      <Legend />
                      <Bar dataKey="sales" fill={MODEL_COLORS[0]} name="Sales" stackId="a" />
                      <Bar dataKey="subscription" fill={MODEL_COLORS[1]} name="Subscription" stackId="a" />
                      <Bar dataKey="affiliate" fill={MODEL_COLORS[2]} name="Affiliate" stackId="a" />
                      <Bar dataKey="advertising" fill={MODEL_COLORS[3]} name="Advertising" stackId="a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card className="border-border bg-card h-full">
                <CardHeader><CardTitle className="font-display text-lg">Revenue Split</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={MODEL_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {pieData.map((p, i) => (
                      <div key={p.name} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <span className="w-2 h-2 rounded-full" style={{ background: MODEL_COLORS[i] }} />
                          {p.name}
                        </span>
                        <span className="text-foreground">₹{(p.value / 100000).toFixed(1)}L</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Projections */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-primary/30 bg-card neon-border">
              <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Quarterly Projections vs Targets</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={projections}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                    <XAxis dataKey="quarter" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                    <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000000}M`} />
                    <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(82,85%,50%)" name="Projected Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="hsl(0,0%,35%)" name="Target" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RevenueDashboard;

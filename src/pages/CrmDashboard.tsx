import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { User, ShoppingCart, DollarSign, TrendingUp, Star, Target, Crown, Zap, Gift } from "lucide-react";
import { crmCustomers, goalRecommendations } from "@/data/mockData";

const tierColors: Record<string, string> = {
  Bronze: "bg-amber-700/20 text-amber-600 border-amber-700/30",
  Silver: "bg-gray-400/20 text-gray-300 border-gray-400/30",
  Gold: "bg-amber-400/20 text-amber-400 border-amber-400/30",
  Platinum: "bg-purple-400/20 text-purple-300 border-purple-400/30",
};

const CrmDashboard = () => {
  const [selectedId, setSelectedId] = useState(crmCustomers[0].id);
  const customer = crmCustomers.find(c => c.id === selectedId)!;
  const avgOrderValue = customer.totalOrders > 0 ? Math.round(customer.totalSpent / customer.totalOrders) : 0;

  const goalKey = customer.goal === "Weight Loss" ? "lose" : customer.goal === "Muscle Gain" ? "gain" : "maintain";
  const recommendations = goalRecommendations[goalKey];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              CRM <span className="gradient-text">DASHBOARD</span>
            </h1>
            <p className="text-muted-foreground text-lg">Customer Intelligence & Insights</p>
          </motion.div>

          {/* Customer Selector */}
          <div className="flex justify-center mb-8">
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-72 bg-card border-border">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {crmCustomers.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name} — {c.membershipTier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Profile + Metrics */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-border bg-card h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl text-foreground">{customer.name}</h3>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground text-sm">Goal</span><Badge variant="outline" className="bg-primary/10 text-primary border-primary/30"><Target className="w-3 h-3 mr-1" />{customer.goal}</Badge></div>
                    <div className="flex justify-between"><span className="text-muted-foreground text-sm">Tier</span><Badge variant="outline" className={tierColors[customer.membershipTier]}><Crown className="w-3 h-3 mr-1" />{customer.membershipTier}</Badge></div>
                    <div className="flex justify-between"><span className="text-muted-foreground text-sm">Loyalty Points</span><span className="text-foreground font-display text-lg">{customer.loyaltyPoints.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground text-sm">Member Since</span><span className="text-foreground text-sm">{customer.memberSince}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground text-sm">Daily Cal Goal</span><span className="text-primary font-display text-lg">{customer.dailyCalorieGoal} kcal</span></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Metrics */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="grid grid-cols-2 gap-4 h-full">
                {[
                  { label: "Total Orders", value: customer.totalOrders, icon: ShoppingCart, color: "text-primary" },
                  { label: "Total Spent", value: `₹${customer.totalSpent.toLocaleString()}`, icon: DollarSign, color: "text-amber-400" },
                  { label: "Avg Order", value: `₹${avgOrderValue.toLocaleString()}`, icon: TrendingUp, color: "text-blue-400" },
                  { label: "Cart Value", value: `₹${customer.currentCartValue.toLocaleString()}`, icon: ShoppingCart, color: "text-emerald-400" },
                ].map(m => (
                  <Card key={m.label} className="border-border bg-card">
                    <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                      <m.icon className={`w-5 h-5 mb-2 ${m.color}`} />
                      <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                      <p className="font-display text-xl text-foreground">{m.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Product Preferences */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-border bg-card h-full">
                <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Product Preferences</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {customer.productPreferences.map(pref => (
                    <div key={pref.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{pref.name}</span>
                        <span className="text-foreground">{pref.score}%</span>
                      </div>
                      <Progress value={pref.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Weekly Activity</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={customer.weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Bar dataKey="value" fill="hsl(82,85%,50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Monthly Purchase Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={customer.monthlyPurchases}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Line type="monotone" dataKey="amount" stroke="hsl(82,85%,50%)" strokeWidth={2} dot={{ fill: "hsl(82,85%,50%)", r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Orders + Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Recent Orders</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {customer.recentOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                      <div>
                        <p className="font-display text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date} — {order.items.join(", ")}</p>
                      </div>
                      <span className="font-display text-primary">₹{order.total.toLocaleString()}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="border-primary/30 bg-card neon-border">
                <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Smart Recommendations</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-sm text-primary font-medium mb-1 flex items-center gap-1"><Target className="w-3 h-3" /> Based on Goal: {customer.goal}</p>
                    <p className="text-xs text-muted-foreground">{recommendations.reason}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {recommendations.products.map(p => (
                        <Badge key={p} variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">{p}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-sm text-foreground font-medium mb-1 flex items-center gap-1"><Gift className="w-3 h-3 text-amber-400" /> Loyalty Benefit</p>
                    <p className="text-xs text-muted-foreground">
                      {customer.membershipTier === "Platinum" ? "10% off all orders + Free delivery" :
                       customer.membershipTier === "Gold" ? "7% off all orders" :
                       customer.membershipTier === "Silver" ? "5% off orders above ₹2000" :
                       "Earn 2x points on next purchase"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CrmDashboard;

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Megaphone, Target, TrendingUp, Eye, MousePointerClick, DollarSign, Instagram, Globe, Mail, Users, Share2 } from "lucide-react";
import { sevenPStrategy, marketingChannels, socialPosts, campaignPerformance, adEngagementData } from "@/data/marketingData";

const COLORS = ["hsl(82,85%,50%)", "hsl(200,85%,50%)", "hsl(340,85%,55%)", "hsl(45,95%,55%)", "hsl(280,70%,60%)"];

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="w-4 h-4" />,
  "Twitter/X": <Globe className="w-4 h-4" />,
  YouTube: <Eye className="w-4 h-4" />,
  Facebook: <Users className="w-4 h-4" />,
};

const MarketingDashboard = () => {
  const totalSpend = marketingChannels.reduce((s, c) => s + c.spent, 0);
  const totalConversions = marketingChannels.reduce((s, c) => s + c.conversions, 0);
  const totalImpressions = marketingChannels.reduce((s, c) => s + c.impressions, 0);
  const avgROI = Math.round(marketingChannels.reduce((s, c) => s + c.roi, 0) / marketingChannels.length);

  const pieData = marketingChannels.map(c => ({ name: c.name, value: c.spent }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              MARKETING <span className="gradient-text">STRATEGY</span>
            </h1>
            <p className="text-muted-foreground text-lg">7P Framework & Multi-Channel Campaign Analytics</p>
          </motion.div>

          {/* 7P Strategy Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
            <h2 className="font-display text-2xl text-foreground mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" /> 7P Marketing Mix</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(sevenPStrategy).map((p, i) => (
                <Card key={p.title} className="border-border bg-card hover:border-primary/30 transition-all">
                  <CardHeader className="pb-2"><CardTitle className="font-display text-lg text-primary">{p.title}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.highlights.map(h => (
                        <Badge key={h} variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px]">{h}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Spend", value: `₹${(totalSpend / 100000).toFixed(1)}L`, icon: DollarSign, color: "text-amber-400" },
              { label: "Impressions", value: `${(totalImpressions / 1000000).toFixed(1)}M`, icon: Eye, color: "text-blue-400" },
              { label: "Conversions", value: totalConversions.toLocaleString(), icon: MousePointerClick, color: "text-emerald-400" },
              { label: "Avg ROI", value: `${avgROI}%`, icon: TrendingUp, color: "text-primary" },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
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

          {/* Channel Performance Table + Pie */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Megaphone className="w-4 h-4 text-primary" /> Channel Performance</CardTitle></CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 text-muted-foreground font-medium">Channel</th>
                          <th className="text-right py-2 text-muted-foreground font-medium">Spent</th>
                          <th className="text-right py-2 text-muted-foreground font-medium">CTR</th>
                          <th className="text-right py-2 text-muted-foreground font-medium">CPC</th>
                          <th className="text-right py-2 text-muted-foreground font-medium">Conv.</th>
                          <th className="text-right py-2 text-muted-foreground font-medium">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketingChannels.map((c, i) => (
                          <tr key={c.name} className="border-b border-border/50">
                            <td className="py-3 text-foreground flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                              {c.name}
                            </td>
                            <td className="text-right text-muted-foreground">₹{(c.spent / 1000).toFixed(0)}K</td>
                            <td className="text-right text-muted-foreground">{c.ctr}%</td>
                            <td className="text-right text-muted-foreground">₹{c.cpc}</td>
                            <td className="text-right text-foreground font-display">{c.conversions.toLocaleString()}</td>
                            <td className="text-right"><Badge variant="outline" className={c.roi >= 30 ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : c.roi >= 20 ? "bg-primary/20 text-primary border-primary/30" : "bg-amber-500/20 text-amber-400 border-amber-500/30"}>{c.roi}%</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card className="border-border bg-card h-full">
                <CardHeader><CardTitle className="font-display text-lg">Budget Allocation</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `₹${(v / 1000).toFixed(0)}K`} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pieData.map((p, i) => (
                      <span key={p.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                        {p.name.split(" ")[0]}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Spend vs Revenue + Engagement */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Ad Spend vs Revenue</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={campaignPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} tickFormatter={(v) => `₹${v / 100000}L`} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} />
                      <Legend />
                      <Line type="monotone" dataKey="spend" stroke="hsl(0,70%,55%)" strokeWidth={2} name="Ad Spend" dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(82,85%,50%)" strokeWidth={2} name="Revenue" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Engagement Rate by Channel (%)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={adEngagementData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis type="number" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis dataKey="channel" type="category" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} width={80} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Bar dataKey="engagement" fill="hsl(82,85%,50%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Social Media Posts */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-border bg-card">
              <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Share2 className="w-4 h-4 text-primary" /> Recent Social Media Posts</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {socialPosts.map(post => (
                    <div key={post.date + post.platform} className="p-4 rounded-lg bg-secondary border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        {platformIcons[post.platform]}
                        <span className="text-sm font-medium text-foreground">{post.platform}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{post.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>❤️ {post.likes.toLocaleString()}</span>
                        <span>🔄 {post.shares.toLocaleString()}</span>
                        <span>💬 {post.comments}</span>
                        <span>👁 {(post.reach / 1000).toFixed(0)}K reach</span>
                      </div>
                    </div>
                  ))}
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

export default MarketingDashboard;

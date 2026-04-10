import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MessageSquare, AlertTriangle, Star, ThumbsUp, ThumbsDown, Minus, Zap, CheckCircle, Clock, Flag } from "lucide-react";
import { customerFeedback, feedbackAnalysis, sentimentTrend, automatedActions } from "@/data/crmFeedbackData";

const typeColors: Record<string, string> = {
  Review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Complaint: "bg-red-500/20 text-red-400 border-red-500/30",
  Suggestion: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Praise: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const sentimentIcons: Record<string, React.ReactNode> = {
  Positive: <ThumbsUp className="w-3 h-3 text-emerald-400" />,
  Neutral: <Minus className="w-3 h-3 text-amber-400" />,
  Negative: <ThumbsDown className="w-3 h-3 text-red-400" />,
};

const statusColors: Record<string, string> = {
  Open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Acknowledged: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Resolved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Escalated: "bg-red-500/20 text-red-400 border-red-500/30",
};

const severityColors: Record<string, string> = {
  Critical: "bg-red-500/20 text-red-400 border-red-500/30",
  Major: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Minor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const CrmFeedbackDashboard = () => {
  const [feedbackFilter, setFeedbackFilter] = useState<string>("All");
  const filtered = feedbackFilter === "All" ? customerFeedback : customerFeedback.filter(f => f.type === feedbackFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              CRM <span className="gradient-text">FEEDBACK</span>
            </h1>
            <p className="text-muted-foreground text-lg">Customer Feedback Analysis & Automated Issue Resolution</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Reports", value: feedbackAnalysis.totalReports.toLocaleString(), icon: MessageSquare, color: "text-blue-400" },
              { label: "Positive", value: `${feedbackAnalysis.positive} (${((feedbackAnalysis.positive / feedbackAnalysis.totalReports) * 100).toFixed(0)}%)`, icon: ThumbsUp, color: "text-emerald-400" },
              { label: "Negative", value: `${feedbackAnalysis.negative} (${((feedbackAnalysis.negative / feedbackAnalysis.totalReports) * 100).toFixed(0)}%)`, icon: ThumbsDown, color: "text-red-400" },
              { label: "Resolution Rate", value: `${feedbackAnalysis.resolutionRate}%`, icon: CheckCircle, color: "text-primary" },
              { label: "Avg Resolution", value: feedbackAnalysis.avgResolutionTime, icon: Clock, color: "text-amber-400" },
            ].map((kpi, i) => (
              <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="border-border bg-card">
                  <CardContent className="p-4 text-center">
                    <kpi.icon className={`w-5 h-5 mx-auto mb-2 ${kpi.color}`} />
                    <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                    <p className="font-display text-lg text-foreground">{kpi.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Top Issues (Automated Flagging) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
            <Card className="border-red-500/30 bg-card">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" /> Automated Issue Flagging — Top Issues from 1,000 Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our automated analysis system processed 1,000 customer reports and flagged the following major issues ranked by frequency. This allows the team to prioritize fixes without manually reviewing each report.
                </p>
                <div className="space-y-3">
                  {feedbackAnalysis.topIssues.map(issue => (
                    <div key={issue.issue}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-foreground flex items-center gap-2">
                          <Flag className="w-3 h-3 text-red-400" />
                          {issue.issue}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={severityColors[issue.severity]}>{issue.severity}</Badge>
                          <span className="text-sm font-display text-foreground">{issue.count} reports ({issue.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={issue.percentage * 2.5} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Automated Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8">
            <Card className="border-primary/30 bg-card neon-border">
              <CardHeader>
                <CardTitle className="font-display text-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" /> Automated Response Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on flagged issues, these automated workflows trigger without manual intervention, ensuring rapid response to customer concerns.
                </p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trigger Condition</TableHead>
                        <TableHead>Automated Action</TableHead>
                        <TableHead>Affected</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {automatedActions.map(a => (
                        <TableRow key={a.trigger}>
                          <TableCell className="text-foreground text-sm font-medium">{a.trigger}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{a.action}</TableCell>
                          <TableCell className="font-display text-foreground">{a.affected}</TableCell>
                          <TableCell><Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">{a.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Sentiment Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={sentimentTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Legend />
                      <Line type="monotone" dataKey="positive" stroke="hsl(142,70%,50%)" strokeWidth={2} name="Positive %" />
                      <Line type="monotone" dataKey="neutral" stroke="hsl(45,95%,55%)" strokeWidth={2} name="Neutral %" />
                      <Line type="monotone" dataKey="negative" stroke="hsl(0,70%,55%)" strokeWidth={2} name="Negative %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Card className="border-border bg-card">
                <CardHeader><CardTitle className="font-display text-lg">Feedback by Category</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={feedbackAnalysis.categoryBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,3%,18%)" />
                      <XAxis type="number" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} />
                      <YAxis dataKey="category" type="category" tick={{ fill: "hsl(0,0%,55%)", fontSize: 11 }} width={110} />
                      <Tooltip contentStyle={{ background: "hsl(120,5%,9%)", border: "1px solid hsl(120,3%,18%)", borderRadius: 8, color: "hsl(0,0%,95%)" }} />
                      <Bar dataKey="count" fill="hsl(82,85%,50%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Feedback Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle className="font-display text-lg flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Recent Customer Feedback</CardTitle>
                  <div className="flex gap-2">
                    {["All", "Review", "Complaint", "Suggestion", "Praise"].map(f => (
                      <button key={f} onClick={() => setFeedbackFilter(f)} className={`px-3 py-1 text-xs rounded-full border transition-colors ${feedbackFilter === f ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-muted-foreground border-border hover:text-foreground"}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map(fb => (
                        <TableRow key={fb.id}>
                          <TableCell className="text-foreground text-sm font-medium whitespace-nowrap">{fb.customerName}</TableCell>
                          <TableCell><Badge variant="outline" className={typeColors[fb.type]}>{fb.type}</Badge></TableCell>
                          <TableCell className="text-muted-foreground text-sm">{fb.category}</TableCell>
                          <TableCell className="text-muted-foreground text-sm max-w-[250px] truncate">{fb.message}</TableCell>
                          <TableCell>
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-3 h-3 ${j < fb.rating ? "text-primary fill-primary" : "text-muted"}`} />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell><span className="flex items-center gap-1 text-xs">{sentimentIcons[fb.sentiment]} {fb.sentiment}</span></TableCell>
                          <TableCell><Badge variant="outline" className={statusColors[fb.status]}>{fb.status}</Badge></TableCell>
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

export default CrmFeedbackDashboard;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Apple, Utensils } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
}

const STORAGE_KEY = "nutrix-meals";

const MealTracker = () => {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  }, [meals]);

  const addMeal = () => {
    if (!name || !calories) return;
    const meal: Meal = {
      id: Date.now().toString(),
      name,
      calories: Number(calories),
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMeals(prev => [...prev, meal]);
    setName(""); setCalories(""); setProtein(""); setCarbs(""); setFats("");
  };

  const removeMeal = (id: string) => setMeals(prev => prev.filter(m => m.id !== id));

  const totals = meals.reduce((acc, m) => ({
    calories: acc.calories + m.calories,
    protein: acc.protein + m.protein,
    carbs: acc.carbs + m.carbs,
    fats: acc.fats + m.fats,
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const pieData = [
    { name: "Protein", value: totals.protein * 4, color: "hsl(82, 85%, 50%)" },
    { name: "Carbs", value: totals.carbs * 4, color: "hsl(217, 91%, 60%)" },
    { name: "Fats", value: totals.fats * 9, color: "hsl(38, 92%, 50%)" },
  ].filter(d => d.value > 0);

  const barData = meals.map(m => ({ name: m.name.slice(0, 10), calories: m.calories, protein: m.protein, carbs: m.carbs, fats: m.fats }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              MEAL <span className="gradient-text">TRACKER</span>
            </h1>
            <p className="text-muted-foreground text-lg">Track your daily calorie intake and nutritional values</p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {([
              ["Calories", totals.calories, "kcal", "text-primary"],
              ["Protein", totals.protein, "g", "text-primary"],
              ["Carbs", totals.carbs, "g", "text-blue-400"],
              ["Fats", totals.fats, "g", "text-amber-400"],
            ] as const).map(([label, value, unit, color]) => (
              <Card key={label} className="border-border bg-card">
                <CardContent className="p-4 text-center">
                  <p className="text-muted-foreground text-xs">{label}</p>
                  <p className={`font-display text-3xl ${color}`}>{value}</p>
                  <p className="text-muted-foreground text-xs">{unit}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Add Meal */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-primary" /> Add Meal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder="Meal name" className="bg-secondary border-border" />
                  <Input type="number" value={calories} onChange={e => setCalories(e.target.value)} placeholder="Calories" className="bg-secondary border-border" />
                  <div className="grid grid-cols-3 gap-2">
                    <Input type="number" value={protein} onChange={e => setProtein(e.target.value)} placeholder="Protein (g)" className="bg-secondary border-border text-xs" />
                    <Input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} placeholder="Carbs (g)" className="bg-secondary border-border text-xs" />
                    <Input type="number" value={fats} onChange={e => setFats(e.target.value)} placeholder="Fats (g)" className="bg-secondary border-border text-xs" />
                  </div>
                  <Button onClick={addMeal} className="w-full font-display tracking-wide"><Plus className="w-4 h-4 mr-1" /> ADD MEAL</Button>
                </CardContent>
              </Card>

              {/* Meal List */}
              <div className="mt-4 space-y-2 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence>
                  {meals.map(meal => (
                    <motion.div key={meal.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <Card className="border-border bg-secondary">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Apple className="w-4 h-4 text-primary shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{meal.name}</p>
                              <p className="text-xs text-muted-foreground">{meal.calories} kcal · P:{meal.protein}g C:{meal.carbs}g F:{meal.fats}g · {meal.time}</p>
                            </div>
                          </div>
                          <button onClick={() => removeMeal(meal.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Charts */}
            <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-border bg-card">
                  <CardHeader><CardTitle className="font-display text-lg">Macro Distribution</CardTitle></CardHeader>
                  <CardContent>
                    {pieData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={80} stroke="none">
                            {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No meals logged yet</div>
                    )}
                    <div className="flex justify-center gap-4 mt-2">
                      {pieData.map(d => (
                        <div key={d.name} className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                          {d.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader><CardTitle className="font-display text-lg">Calories by Meal</CardTitle></CardHeader>
                  <CardContent>
                    {barData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(120, 3%, 18%)" />
                          <XAxis dataKey="name" tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 10 }} />
                          <YAxis tick={{ fill: "hsl(0, 0%, 55%)", fontSize: 10 }} />
                          <RechartsTooltip contentStyle={{ background: "hsl(120, 5%, 9%)", border: "1px solid hsl(120, 3%, 18%)", borderRadius: 8, color: "hsl(0, 0%, 95%)" }} />
                          <Bar dataKey="calories" fill="hsl(82, 85%, 50%)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No meals logged yet</div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Nutrient Breakdown Table */}
              {meals.length > 0 && (
                <Card className="border-border bg-card">
                  <CardHeader><CardTitle className="font-display text-lg">Nutrient Breakdown</CardTitle></CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { label: "Protein", val: totals.protein * 4, total: totals.calories, color: "bg-primary" },
                        { label: "Carbs", val: totals.carbs * 4, total: totals.calories, color: "bg-blue-500" },
                        { label: "Fats", val: totals.fats * 9, total: totals.calories, color: "bg-amber-500" },
                      ].map(m => (
                        <div key={m.label}>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{m.label}</span>
                            <span>{m.total > 0 ? Math.round((m.val / m.total) * 100) : 0}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${m.total > 0 ? (m.val / m.total) * 100 : 0}%` }}
                              className={`h-full rounded-full ${m.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MealTracker;

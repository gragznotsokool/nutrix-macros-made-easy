import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Target, Flame, Dumbbell } from "lucide-react";

type Goal = "lose" | "maintain" | "gain";

const MacroCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [result, setResult] = useState<null | { calories: number; protein: number; carbs: number; fats: number }>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;

    // Mifflin-St Jeor
    let bmr = gender === "male"
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    let tdee = bmr * parseFloat(activity);

    const goalMultiplier = { lose: 0.8, maintain: 1, gain: 1.15 };
    const calories = Math.round(tdee * goalMultiplier[goal]);
    const protein = Math.round(w * (goal === "gain" ? 2.2 : 1.8));
    const fats = Math.round((calories * 0.25) / 9);
    const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);

    setResult({ calories, protein, carbs, fats });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              MACRO <span className="gradient-text">CALCULATOR</span>
            </h1>
            <p className="text-muted-foreground text-lg">Calculate your daily protein, carbs & fats based on your goals</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-display text-2xl flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" /> Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Weight (kg)</label>
                      <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className="bg-secondary border-border" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Height (cm)</label>
                      <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className="bg-secondary border-border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Age</label>
                      <Input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25" className="bg-secondary border-border" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">Gender</label>
                      <Select value={gender} onValueChange={(v: "male" | "female") => setGender(v)}>
                        <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Activity Level</label>
                    <Select value={activity} onValueChange={setActivity}>
                      <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">Sedentary</SelectItem>
                        <SelectItem value="1.375">Light Exercise</SelectItem>
                        <SelectItem value="1.55">Moderate Exercise</SelectItem>
                        <SelectItem value="1.725">Heavy Exercise</SelectItem>
                        <SelectItem value="1.9">Athlete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Fitness Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([["lose", "Fat Loss", Flame], ["maintain", "Maintain", Target], ["gain", "Muscle Gain", Dumbbell]] as const).map(([key, label, Icon]) => (
                        <button
                          key={key}
                          onClick={() => setGoal(key)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-all text-sm ${goal === key ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-muted-foreground"}`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button onClick={calculate} className="w-full font-display text-lg tracking-wide">CALCULATE MACROS</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {result ? (
                <div className="space-y-4">
                  <Card className="border-primary/30 bg-card neon-border">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground text-sm mb-1">Daily Calories</p>
                      <p className="font-display text-6xl gradient-text">{result.calories}</p>
                      <p className="text-muted-foreground text-sm">kcal / day</p>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-3 gap-4">
                    {([
                      ["Protein", result.protein, "g", "bg-primary/20 text-primary"],
                      ["Carbs", result.carbs, "g", "bg-blue-500/20 text-blue-400"],
                      ["Fats", result.fats, "g", "bg-amber-500/20 text-amber-400"],
                    ] as const).map(([label, value, unit, color]) => (
                      <Card key={label} className="border-border bg-card">
                        <CardContent className="p-4 text-center">
                          <p className="text-muted-foreground text-xs mb-1">{label}</p>
                          <p className={`font-display text-3xl ${color.split(" ")[1]}`}>{value}</p>
                          <p className="text-muted-foreground text-xs">{unit}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Simple bar visualization */}
                  <Card className="border-border bg-card">
                    <CardContent className="p-6">
                      <p className="text-sm text-muted-foreground mb-4">Macro Distribution</p>
                      {[
                        { label: "Protein", val: result.protein * 4, color: "bg-primary" },
                        { label: "Carbs", val: result.carbs * 4, color: "bg-blue-500" },
                        { label: "Fats", val: result.fats * 9, color: "bg-amber-500" },
                      ].map(m => (
                        <div key={m.label} className="mb-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{m.label}</span>
                            <span>{Math.round((m.val / result.calories) * 100)}%</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(m.val / result.calories) * 100}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                              className={`h-full rounded-full ${m.color}`}
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <Calculator className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">Enter your details and click calculate</p>
                    <p className="text-sm mt-1">to see your personalized macro breakdown</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MacroCalculator;

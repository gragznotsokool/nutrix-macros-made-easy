import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
      return;
    }
    const success = signup(name, email, password);
    if (success) {
      toast({ title: "Account Created! 🎉", description: "Welcome to NutriX." });
      navigate("/");
    } else {
      toast({ title: "Email already registered", description: "Try logging in instead.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl tracking-wider text-foreground">
            NUTRI<span className="gradient-text">X</span>
          </Link>
          <p className="text-muted-foreground mt-2">Create your NutriX account</p>
        </div>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-display text-2xl flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> SIGN UP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="bg-secondary border-border" required />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="bg-secondary border-border" required />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Password</label>
                <div className="relative">
                  <Input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border pr-10" required />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Confirm Password</label>
                <Input type={showPw ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-secondary border-border" required />
              </div>
              <Button type="submit" className="w-full font-display text-lg tracking-wide">CREATE ACCOUNT</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;

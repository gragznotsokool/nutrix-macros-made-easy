import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const success = login(email, password);
    if (success) {
      toast({ title: "Welcome back! 👋", description: "You've been logged in successfully." });
      navigate("/");
    } else {
      toast({ title: "Login Failed", description: "Invalid email or password.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl tracking-wider text-foreground">
            NUTRI<span className="gradient-text">X</span>
          </Link>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-display text-2xl flex items-center gap-2">
              <LogIn className="w-5 h-5 text-primary" /> LOGIN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button type="submit" className="w-full font-display text-lg tracking-wide">SIGN IN</Button>
            </form>
            <div className="bg-secondary/50 rounded-lg p-3 mt-4">
              <p className="text-xs text-muted-foreground text-center mb-1">Admin Login</p>
              <p className="text-xs text-center text-foreground font-mono">admin@nutrix.com / admin123</p>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

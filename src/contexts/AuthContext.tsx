import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const USERS_KEY = "nutrix-users";
const SESSION_KEY = "nutrix-session";

// Admin credentials
const ADMIN_EMAIL = "admin@nutrix.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  const getUsers = (): Record<string, { name: string; password: string; role: "user" | "admin" }> => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : {};
  };

  const signup = (name: string, email: string, password: string): boolean => {
    if (password.length < 6) return false;
    const users = getUsers();
    if (users[email]) return false;
    users[email] = { name, password, role: "user" };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ name, email, role: "user" });
    return true;
  };

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ name: "Admin", email: ADMIN_EMAIL, role: "admin" });
      return true;
    }
    const users = getUsers();
    const found = users[email];
    if (!found || found.password !== password) return false;
    setUser({ name: found.name, email, role: found.role || "user" });
    return true;
  };

  const logout = () => setUser(null);

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

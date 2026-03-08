import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const USERS_KEY = "nutrix-users";
const SESSION_KEY = "nutrix-session";

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

  const getUsers = (): Record<string, { name: string; password: string }> => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : {};
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    if (users[email]) return false;
    users[email] = { name, password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser({ name, email });
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users[email];
    if (!found || found.password !== password) return false;
    setUser({ name: found.name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

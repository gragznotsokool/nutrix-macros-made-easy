import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  clearCart: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const CART_KEY = "nutrix-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved) as Array<Partial<CartItem>>;
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((item) => {
          const id = typeof item.id === "string" ? item.id : "";
          const name = typeof item.name === "string" ? item.name : "";
          const image = typeof item.image === "string" ? item.image : "";
          const price = Number(item.price);
          const stock = Number(item.stock);
          const qty = Number(item.qty);

          if (!id || !name || !image || !Number.isFinite(price) || !Number.isFinite(stock)) {
            return null;
          }

          const normalizedStock = Math.max(1, Math.floor(stock));
          const normalizedQty = Math.min(
            normalizedStock,
            Math.max(1, Number.isFinite(qty) ? Math.floor(qty) : 1),
          );

          return {
            id,
            name,
            image,
            price,
            stock: normalizedStock,
            qty: normalizedQty,
          } satisfies CartItem;
        })
        .filter((item): item is CartItem => item !== null);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        if (existing.qty >= item.stock) return prev;
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(c => c.id !== id));

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(c => {
      if (c.id !== id) return c;
      const newQty = c.qty + delta;
      if (newQty <= 0 || newQty > c.stock) return c;
      return { ...c, qty: newQty };
    }));
  };

  const clearCart = () => setItems([]);

  const count = items.reduce((sum, c) => sum + Number(c.qty || 0), 0);
  const total = items.reduce((sum, c) => sum + Number(c.price || 0) * Number(c.qty || 0), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

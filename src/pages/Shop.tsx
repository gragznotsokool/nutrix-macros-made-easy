import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, CheckCircle2, AlertCircle, Minus, Plus, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import productWhey from "@/assets/product-whey.jpg";
import productPreworkout from "@/assets/product-preworkout.jpg";
import productBcaa from "@/assets/product-bcaa.jpg";
import productCreatine from "@/assets/product-creatine.jpg";
import productVitamins from "@/assets/product-vitamins.jpg";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
}

interface CartItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
}

const INVENTORY_KEY = "nutrix-inventory";
const ORDERS_KEY = "nutrix-orders";

const defaultProducts: Product[] = [
  { id: "whey", name: "Premium Whey Isolate", category: "Protein", price: 2499, image: productWhey, stock: 25 },
  { id: "preworkout", name: "Ignite Pre-Workout", category: "Pre-Workout", price: 1299, image: productPreworkout, stock: 40 },
  { id: "bcaa", name: "BCAA Recovery Blend", category: "Amino Acids", price: 999, image: productBcaa, stock: 30 },
  { id: "creatine", name: "Creatine Monohydrate", category: "Performance", price: 799, image: productCreatine, stock: 50 },
  { id: "vitamins", name: "Daily Multivitamin", category: "Vitamins", price: 599, image: productVitamins, stock: 60 },
];

const Shop = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const globalCart = useCart();
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(INVENTORY_KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [tab, setTab] = useState<"shop" | "orders">("shop");

  useEffect(() => { localStorage.setItem(INVENTORY_KEY, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [orders]);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast({ title: "Out of Stock", description: `${product.name} is currently unavailable.`, variant: "destructive" });
      return;
    }
    setCart(prev => {
      const existing = prev.find(c => c.product.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          toast({ title: "Stock Limit", description: `Only ${product.stock} units available.`, variant: "destructive" });
          return prev;
        }
        return prev.map(c => c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { product, qty: 1 }];
    });
    // Sync to global cart
    globalCart.addItem({ id: product.id, name: product.name, price: product.price, image: product.image, stock: product.stock });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(c => {
      if (c.product.id !== id) return c;
      const newQty = c.qty + delta;
      if (newQty <= 0) return c;
      const product = products.find(p => p.id === id);
      if (product && newQty > product.stock) return c;
      return { ...c, qty: newQty };
    }));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.product.id !== id));

  const goToCheckout = () => {
    if (cart.length === 0) return;
    // Sync all cart items to global cart context
    globalCart.clearCart();
    cart.forEach(item => {
      for (let i = 0; i < item.qty; i++) {
        globalCart.addItem({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          stock: item.product.stock,
        });
      }
    });
    setCartOpen(false);
    navigate("/checkout");
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-6xl text-foreground mb-3">
              ORDER & <span className="gradient-text">INVENTORY</span>
            </h1>
            <p className="text-muted-foreground text-lg">Browse products, place orders, and track inventory in real-time</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 justify-center mb-8">
            {(["shop", "orders"] as const).map(t => (
              <Button key={t} variant={tab === t ? "default" : "outline"} onClick={() => setTab(t)} className="font-display tracking-wide">
                {t === "shop" ? <><Package className="w-4 h-4 mr-1" /> PRODUCTS</> : <><CheckCircle2 className="w-4 h-4 mr-1" /> ORDERS ({orders.length})</>}
              </Button>
            ))}
            <Button variant="outline" className="relative" onClick={() => setCartOpen(!cartOpen)}>
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
            </Button>
          </div>

          {tab === "shop" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {products.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="border-border bg-card overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="aspect-square overflow-hidden bg-secondary">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <CardContent className="p-4 space-y-2">
                      <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
                      <h3 className="font-display text-lg text-foreground leading-tight">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl text-primary">₹{product.price}</span>
                        <span className={`text-xs ${product.stock > 0 ? "text-primary" : "text-destructive"}`}>
                          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </span>
                      </div>
                      <Button size="sm" className="w-full font-display tracking-wide" disabled={product.stock <= 0} onClick={() => addToCart(product)}>
                        {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {orders.length === 0 ? (
                <div className="text-center text-muted-foreground py-20">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p>No orders placed yet</p>
                </div>
              ) : orders.map(order => (
                <motion.div key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card className="border-border bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-display text-lg text-foreground">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> {order.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.product.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{item.product.name} × {item.qty}</span>
                            <span className="text-foreground">₹{item.product.price * item.qty}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border mt-3 pt-3 flex justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total</span>
                        <span className="font-display text-xl text-primary">₹{order.total}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-background/60 z-50" onClick={() => setCartOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 250 }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h2 className="font-display text-2xl text-foreground">CART ({cartCount})</h2>
                <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-10">Your cart is empty</p>
                ) : cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">₹{item.product.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.product.id, -1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center text-foreground"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-medium text-foreground w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, 1)} className="w-6 h-6 rounded bg-muted flex items-center justify-center text-foreground"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="p-5 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-display text-2xl text-primary">₹{cartTotal}</span>
                  </div>
                  <Button onClick={placeOrder} className="w-full font-display text-lg tracking-wide">PLACE ORDER</Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Shop;

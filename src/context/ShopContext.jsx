import React, { createContext, useEffect, useMemo, useState } from "react";

export const ShopContext = createContext(null);

const LS_KEYS = {
  user: "cc_user",
  session: "cc_session",
  cart: "cc_cart",
  tx: "cc_transactions",
};

const readLS = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }) {

  // =============================
  // STATE
  // =============================
  const [user, setUser] = useState(() => readLS(LS_KEYS.user, null));
  const [session, setSession] = useState(() => readLS(LS_KEYS.session, null));
  const [cart, setCart] = useState(() => readLS(LS_KEYS.cart, []));
  const [transactions, setTransactions] = useState(() => readLS(LS_KEYS.tx, []));

  const isLoggedIn = !!session;

  // =============================
  // LOCAL STORAGE SYNC
  // =============================
  useEffect(() => localStorage.setItem(LS_KEYS.user, JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem(LS_KEYS.session, JSON.stringify(session)), [session]);
  useEffect(() => localStorage.setItem(LS_KEYS.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(LS_KEYS.tx, JSON.stringify(transactions)), [transactions]);

  // =============================
  // AUTH FUNCTIONS
  // =============================

  const register = (payload) => {
    // payload: {email,password,name,address,mobile}

    if (!payload.email || !payload.password || !payload.name) {
      return { ok: false, message: "Please fill all required fields." };
    }

    if (payload.password.length < 4) {
      return { ok: false, message: "Password must be at least 4 characters." };
    }

    // Save user
    setUser(payload);

    // Auto login
    const sessionData = {
      email: payload.email,
      name: payload.name,
    };

    setSession(sessionData);

    return { ok: true };
  };

  const login = (email, password) => {
    if (!user) {
      return { ok: false, message: "No account found. Please register." };
    }

    if (email !== user.email || password !== user.password) {
      return { ok: false, message: "Invalid email or password." };
    }

    const sessionData = {
      email: user.email,
      name: user.name,
    };

    setSession(sessionData);

    return { ok: true };
  };

  const logout = () => {
    setSession(null);
  };

  // =============================
  // CART FUNCTIONS
  // =============================

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.id === product.id);

      if (existing) {
        return prev.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + qty } : x
        );
      }

      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((x) =>
          x.id === id ? { ...x, qty: Math.max(1, qty) } : x
        )
        .filter((x) => x.qty > 0)
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((x) => x.id !== id));

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  // =============================
  // CHECKOUT
  // =============================

  const checkout = ({ paymentMethod, fulfillment }) => {
    const now = new Date();

    const tx = {
      id: `TX-${now.getTime()}`,
      date: now.toISOString(),
      items: cart,
      total: cartTotal,
      paymentMethod,
      fulfillment,
      status: "Placed",
      customer: session?.name || "Guest",
    };

    setTransactions((prev) => [tx, ...prev]);
    clearCart();

    return tx;
  };

  // =============================
  // CONTEXT VALUE
  // =============================

  const value = {
    user,
    session,
    isLoggedIn,
    cart,
    cartTotal,
    transactions,

    register,
    login,
    logout,

    addToCart,
    updateQty,
    removeFromCart,
    checkout,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}
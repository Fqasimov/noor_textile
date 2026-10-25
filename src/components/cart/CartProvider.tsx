"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/data/products";

type Line = { slug: string; qty: number };
type CartLine = Line & { product: Product };

type CartState = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  /** Bumps on every add so the header badge can react. */
  pulse: number;
};

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = "noor-cart";

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) setRaw(saved.filter((l) => getProduct(l.slug) && l.qty > 0));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {}
  }, [raw, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setRaw((prev) => {
      const hit = prev.find((l) => l.slug === slug);
      return hit ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...prev, { slug, qty }];
    });
    setPulse((p) => p + 1);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((prev) => (qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartState>(() => {
    const lines = raw.flatMap((l) => {
      const product = getProduct(l.slug);
      return product ? [{ ...l, product }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + (l.product.price ?? 0) * l.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      clear,
      pulse,
    };
  }, [raw, open, add, setQty, clear, pulse]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

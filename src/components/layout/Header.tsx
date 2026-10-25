"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { NoorLogo } from "@/components/logo/NoorLogo";
import { useCart } from "@/components/cart/CartProvider";
import { site } from "@/data/site";

const nav = [
  { href: "/#haqqimizda", label: "Haqqımızda" },
  { href: "/#terefdaslar", label: "Tərəfdaşlar" },
  { href: "/#kataloq", label: "Kataloq" },
  { href: "/#elaqe", label: "Əlaqə" },
];

/** `overlay` starts transparent over the dark hero; `solid` is used on inner pages. */
export function Header({ variant = "solid" }: { variant?: "overlay" | "solid" }) {
  const { count, setOpen, pulse } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  const dark = variant === "overlay" && !scrolled && !menu;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
        dark
          ? "bg-transparent text-paper"
          : "bg-paper/85 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Noor Textile — ana səhifə" className="shrink-0" onClick={() => setMenu(false)}>
          <NoorLogo className="h-8 w-auto sm:h-9" ornamentColor="var(--color-gold)" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Əsas menyu">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow relative py-2 opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/#kataloq"
            onClick={() => setTimeout(() => document.getElementById("catalog-search")?.focus(), 450)}
            aria-label="Axtarış"
            className="grid size-11 place-items-center rounded-full transition-colors hover:bg-current/5"
          >
            <Search className="size-[18px]" strokeWidth={1.6} />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Səbət, ${count} məhsul`}
            className="relative grid size-11 place-items-center rounded-full transition-[transform,background-color] duration-150 hover:bg-current/5 active:scale-95"
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.6} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={pulse}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.35, bounce: 0.35 }}
                  className="absolute right-1 top-1 grid min-w-[18px] place-items-center rounded-full bg-gold px-1 text-[10px] font-bold leading-[18px] text-ink tabular-nums"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={menu}
            className="grid size-11 place-items-center rounded-full lg:hidden"
          >
            {menu ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 bg-paper px-6 pb-10 pt-6 lg:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobil menyu">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenu(false)}
                    className="display block border-b border-line py-4 text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-10 space-y-2 text-sm text-muted">
              <a href={site.phoneHref} className="block">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="block">
                {site.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

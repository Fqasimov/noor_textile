"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { categories, products, type CategoryId } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Sort = "featured" | "price-asc" | "price-desc";

const sorts: { id: Sort; label: string }[] = [
  { id: "featured", label: "Seçilmiş" },
  { id: "price-asc", label: "Ucuzdan bahaya" },
  { id: "price-desc", label: "Bahadan ucuza" },
];

// Azerbaijani-aware, accent-insensitive matching ("sufre" finds "Süfrə").
const fold = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export function Catalog() {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const deferredQuery = useDeferredValue(query);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: products.length };
    for (const p of products) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const visible = useMemo(() => {
    const q = fold(deferredQuery.trim());
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || fold(`${p.name} ${p.color ?? ""} ${p.description}`).includes(q)),
    );
    if (sort === "featured") return list;
    // Price-on-request items always sit at the end.
    return [...list].sort((a, b) => {
      if (a.price === null) return 1;
      if (b.price === null) return -1;
      return sort === "price-asc" ? a.price - b.price : b.price - a.price;
    });
  }, [category, deferredQuery, sort]);

  const tabs = [{ id: "all" as const, short: "Hamısı" }, ...categories];

  return (
    <section id="kataloq" className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-8 lg:pt-32">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-gold-deep">Kataloq</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,5.4vw,4.6rem)]">Bütün kolleksiya</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Səbətə əlavə edin və sifarişi bir toxunuşla WhatsApp-a göndərin. Qiyməti göstərilməyən məhsullar üçün bizə
            yazın.
          </p>
        </Reveal>
      </div>

      {/* Sticky toolbar: categories, search, sort */}
      <div className="sticky top-16 z-30 mt-10 border-y border-line bg-paper/90 backdrop-blur-xl sm:top-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Kateqoriyalar">
            {tabs.map((t) => {
              const active = category === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(t.id)}
                  className={`relative flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition-colors duration-200 ${
                    active ? "text-paper" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="cat-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
                    />
                  )}
                  <span className="relative">{t.short}</span>
                  <span className={`relative text-[11px] tabular-nums ${active ? "text-gold-soft" : "text-muted"}`}>
                    {counts[t.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <label className="relative flex h-10 flex-1 items-center lg:w-64 lg:flex-none">
              <Search className="pointer-events-none absolute left-3.5 size-4 text-muted" strokeWidth={1.6} />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Axtar: süfrə, kilim…"
                className="h-full w-full rounded-full border border-line bg-white pl-10 pr-9 text-[13px] outline-none transition-colors placeholder:text-muted/70 focus:border-gold [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Axtarışı təmizlə"
                  className="absolute right-2 grid size-6 place-items-center rounded-full text-muted hover:bg-mist"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sıralama"
              className="h-10 rounded-full border border-line bg-white px-4 text-[13px] outline-none focus:border-gold"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-28 pt-10 sm:px-8 lg:pb-36">
        <p className="mb-6 text-xs text-muted" aria-live="polite">
          {visible.length} məhsul
        </p>
        <motion.ul layout className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <ProductCard product={p} priority={i < 4} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p className="display text-3xl">Heç nə tapılmadı</p>
            <p className="mt-2 text-sm text-muted">Başqa söz yoxlayın və ya bütün kateqoriyalara baxın.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="btn btn-outline mt-6"
            >
              Filtrləri sıfırla
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

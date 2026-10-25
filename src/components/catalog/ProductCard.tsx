"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, MessageCircle, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { whatsappLink } from "@/data/site";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [first, second] = product.images;
  const onRequest = product.price === null;

  function quickAdd() {
    add(product.slug);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="group relative">
      <Link href={`/kataloq/${product.slug}`} className="block" aria-label={`${product.name}, ${formatPrice(product.price)}`}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
        <Image
          src={first}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
          className={`object-cover transition-[transform,opacity] duration-700 ease-[var(--ease-out-strong)] group-hover:scale-[1.04] ${
            product.cutout ? "object-contain p-[8%] mix-blend-multiply" : ""
          } ${second ? "[@media(hover:hover)]:group-hover:opacity-0" : ""}`}
        />
        {second && (
          <Image
            src={second}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw"
            className="hidden object-cover opacity-0 transition-opacity duration-500 [@media(hover:hover)]:block [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 whitespace-nowrap rounded-full bg-paper/90 px-3 py-1.5 text-[9px] text-ink backdrop-blur">
            {product.badge}
          </span>
        )}

      </div>
      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="display line-clamp-2 text-[1.3rem] leading-tight sm:text-[1.45rem]">{product.name}</h3>
          <p className="mt-1 truncate text-xs text-muted">{[product.size, product.color].filter(Boolean).join(" · ")}</p>
        </div>
        <p className={`shrink-0 text-sm font-semibold tabular-nums sm:pt-1 ${onRequest ? "text-gold-deep" : ""}`}>
          {onRequest ? "Sorğu ilə" : formatPrice(product.price)}
        </p>
      </div>
      </Link>
      <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/5]">
        {onRequest ? (
          <a
            href={whatsappLink(`Salam! «${product.name}» haqqında məlumat almaq istəyirəm.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${product.name} — qiyməti soruş`}
            className="pointer-events-auto absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lg transition-transform duration-150 active:scale-90"
          >
            <MessageCircle className="size-[18px]" strokeWidth={1.6} />
          </a>
        ) : (
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`${product.name} səbətə əlavə et`}
            className="pointer-events-auto absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lg transition-[transform,background-color,color] duration-150 hover:bg-ink hover:text-paper active:scale-90"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                  <Check className="size-[18px]" strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="plus"
                  initial={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 0.5, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                  <Plus className="size-[18px]" strokeWidth={1.6} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
    </div>
  );
}

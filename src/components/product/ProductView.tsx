"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus } from "lucide-react";
import { categories, formatPrice, type Product } from "@/data/products";
import { useCart } from "@/components/cart/CartProvider";
import { whatsappLink } from "@/data/site";

const ease = [0.23, 1, 0.32, 1] as const;

export function ProductView({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const category = categories.find((c) => c.id === product.category);
  const onRequest = product.price === null;

  const ask = whatsappLink(
    onRequest
      ? `Salam! «${product.name}» haqqında məlumat və qiymət almaq istəyirəm.`
      : `Salam! «${product.name}»${product.size ? ` (${product.size})` : ""} × ${qty} sifariş etmək istəyirəm.`,
  );

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[active]}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className={
                  product.cutout && active === 0 ? "object-contain p-[10%] mix-blend-multiply" : "object-cover"
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>
        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Şəkil ${i + 1}`}
                aria-pressed={active === i}
                className={`relative aspect-[4/5] w-20 overflow-hidden rounded-sm bg-mist transition-[opacity,box-shadow] duration-200 ${
                  active === i ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className={product.cutout && i === 0 ? "object-contain p-1 mix-blend-multiply" : "object-cover"}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow text-gold-deep">{category?.label}</p>
          <h1 className="display mt-4 text-[clamp(2.6rem,5vw,4rem)]">{product.name}</h1>
          <p className={`mt-4 text-2xl font-semibold tabular-nums ${onRequest ? "text-gold-deep" : ""}`}>
            {formatPrice(product.price)}
          </p>

          <p className="mt-8 text-[15px] leading-relaxed text-muted">{product.description}</p>

          <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
            {product.size && (
              <div className="flex justify-between py-3.5">
                <dt className="text-muted">Ölçü</dt>
                <dd>{product.size}</dd>
              </div>
            )}
            {product.color && (
              <div className="flex justify-between py-3.5">
                <dt className="text-muted">Rəng</dt>
                <dd>{product.color}</dd>
              </div>
            )}
            <div className="flex justify-between py-3.5">
              <dt className="text-muted">Çatdırılma və ödəniş</dt>
              <dd>Sifarişdə razılaşdırılır</dd>
            </div>
          </dl>

          {onRequest ? (
            <a href={ask} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8 w-full">
              Qiyməti soruş
            </a>
          ) : (
            <div className="mt-8 flex gap-3">
              <div className="flex h-12 items-center rounded-full border border-line bg-white">
                <button
                  type="button"
                  aria-label="Azalt"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid size-12 place-items-center active:scale-90"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-6 text-center tabular-nums">{qty}</span>
                <button
                  type="button"
                  aria-label="Artır"
                  onClick={() => setQty((q) => q + 1)}
                  className="grid size-12 place-items-center active:scale-90"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  add(product.slug, qty);
                  setAdded(true);
                  setTimeout(() => {
                    setAdded(false);
                    setOpen(true);
                  }, 650);
                }}
                className="btn btn-dark flex-1 overflow-hidden"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={added ? "added" : "add"}
                    initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -16, opacity: 0, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.35, bounce: 0 }}
                    className="flex items-center gap-2"
                  >
                    {added ? (
                      <>
                        <Check className="size-4" /> Əlavə olundu
                      </>
                    ) : (
                      "Səbətə əlavə et"
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          )}
          {!onRequest && (
            <a
              href={ask}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-3 w-full"
            >
              WhatsApp ilə dərhal sifariş
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

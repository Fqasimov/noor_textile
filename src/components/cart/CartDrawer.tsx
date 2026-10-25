"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

export function CartDrawer() {
  const { lines, total, open, setOpen, setQty, count } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const hasOnRequest = lines.some((l) => l.product.price === null);

  const message = [
    "Salam! Noor Textile saytından sifariş:",
    "",
    ...lines.map(
      (l, i) =>
        `${i + 1}. ${l.product.name}${l.product.size ? ` (${l.product.size})` : ""} × ${l.qty} — ${
          l.product.price === null ? "qiymət sorğu ilə" : `${l.product.price * l.qty} ₼`
        }`,
    ),
    "",
    `Cəmi: ${total} ₼${hasOnRequest ? " + sorğu ilə olan məhsullar" : ""}`,
    name ? `Ad: ${name}` : null,
    phone ? `Telefon: ${phone}` : null,
    address ? `Ünvan: ${address}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Səbət">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <p className="eyebrow text-gold-deep">Səbət</p>
                <p className="display text-2xl">{count ? `${count} məhsul` : "Səbət boşdur"}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Bağla"
                className="grid size-10 place-items-center rounded-full border border-line transition-transform active:scale-95"
              >
                <X className="size-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <div className="grid size-16 place-items-center rounded-full bg-mist">
                  <ShoppingBag className="size-6 text-gold-deep" strokeWidth={1.4} />
                </div>
                <p className="text-sm text-muted">Kataloqdan bəyəndiyiniz məhsulları əlavə edin.</p>
                <Link href="/#kataloq" onClick={() => setOpen(false)} className="btn btn-dark">
                  Kataloqa bax
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={l.slug}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 24 }}
                        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                        className="flex gap-4 py-5"
                      >
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-mist">
                          <Image
                            src={l.product.images[0]}
                            alt={l.product.name}
                            fill
                            sizes="80px"
                            className={`object-cover ${l.product.cutout ? "mix-blend-multiply" : ""}`}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <Link
                            href={`/kataloq/${l.slug}`}
                            onClick={() => setOpen(false)}
                            className="display truncate text-xl"
                          >
                            {l.product.name}
                          </Link>
                          <p className="text-xs text-muted">{l.product.size ?? l.product.color}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center rounded-full border border-line">
                              <button
                                type="button"
                                aria-label="Azalt"
                                onClick={() => setQty(l.slug, l.qty - 1)}
                                className="grid size-8 place-items-center active:scale-90"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                              <button
                                type="button"
                                aria-label="Artır"
                                onClick={() => setQty(l.slug, l.qty + 1)}
                                className="grid size-8 place-items-center active:scale-90"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold tabular-nums">
                              {l.product.price === null ? formatPrice(null) : `${l.product.price * l.qty} ₼`}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-4 border-t border-line bg-mist/60 px-6 py-5">
                  <div className="grid gap-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız"
                      autoComplete="name"
                      className="h-11 rounded-md border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-gold"
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Telefon"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="h-11 rounded-md border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-gold"
                    />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Çatdırılma ünvanı"
                      autoComplete="street-address"
                      className="h-11 rounded-md border border-line bg-white px-4 text-sm outline-none transition-colors focus:border-gold"
                    />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-muted">Cəmi</span>
                    <span className="display text-3xl tabular-nums">
                      {total} ₼{hasOnRequest && <span className="ml-1 align-middle text-xs text-muted">+ sorğu</span>}
                    </span>
                  </div>
                  <a
                    href={whatsappLink(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold w-full"
                  >
                    WhatsApp ilə sifariş et
                  </a>
                  <p className="text-center text-xs text-muted">
                    Sifarişi təsdiqləmək üçün sizinlə əlaqə saxlayacağıq · {site.phoneDisplay}
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

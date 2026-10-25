"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useIntro } from "@/components/intro/IntroProvider";
import { site } from "@/data/site";

const ease = [0.23, 1, 0.32, 1] as const;

export function Hero() {
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-18%"]);

  const enter = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24, filter: "blur(6px)" },
    animate: done ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.9, delay: 0.08 * i, ease },
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink text-paper"
      style={{ background: "radial-gradient(80% 70% at 70% 40%, #1a2441 0%, #0b1020 70%)" }}
    >
      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-32">
        <div className="relative z-10 max-w-xl">
          <motion.p {...enter(0)} className="eyebrow mb-6 flex items-center gap-3 text-gold-soft">
            <span className="h-px w-8 bg-gold" />
            {site.since}
          </motion.p>
          <motion.h1 {...enter(1)} className="display text-[clamp(3rem,8vw,6.2rem)]">
            Evinizə <em className="font-normal text-gold-soft italic">işıq</em> gətirən tikmələr
          </motion.h1>
          <motion.p {...enter(2)} className="mt-7 max-w-md text-[15px] leading-relaxed text-silver-soft/80">
            Azərbaycan xalçalarının, miniatürlərinin və naxışlarının ruhunu müasir ev tekstilinə köçürürük —
            yastıqlar, süfrələr və uşaq otağı üçün.
          </motion.p>
          <motion.div {...enter(3)} className="mt-10 flex flex-wrap gap-3">
            <Link href="/#kataloq" className="btn btn-gold">
              Kataloqa bax
            </Link>
            <Link href="/#haqqimizda" className="btn btn-ghost-light">
              Haqqımızda
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
          animate={done ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[460px] lg:max-w-none"
        >
          {/* Mihrab arch frame */}
          <div className="relative aspect-[4/5] w-[84%] lg:ml-auto">
            <div className="absolute -inset-3 rounded-t-[999px] border border-gold/40" aria-hidden />
            <div className="absolute inset-0 overflow-hidden rounded-t-[999px] bg-navy">
              <motion.div style={{ y: imageY }} className="absolute -inset-y-[8%] inset-x-0">
                <Image
                  src="/images/lifestyle/xosrov.jpg"
                  alt="«Xosrov və Şirin» tikməli yastıq"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover object-[50%_30%]"
                />
              </motion.div>
            </div>
          </div>
          <motion.div
            style={{ y: smallY }}
            className="absolute -bottom-6 left-0 w-[42%] overflow-hidden rounded-t-[999px] border-4 border-ink shadow-2xl lg:-left-6"
          >
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/products/gollu.jpg"
                alt="«Göllü» məxmər yastıq"
                fill
                sizes="(min-width: 1024px) 18vw, 38vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#haqqimizda"
        aria-label="Aşağı keç"
        initial={{ opacity: 0 }}
        animate={done ? { opacity: 1 } : undefined}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-silver/60 transition-colors hover:text-gold-soft lg:block"
      >
        <ArrowDown className="size-5 animate-bounce [animation-duration:2.4s]" strokeWidth={1.4} />
      </motion.a>
    </section>
  );
}

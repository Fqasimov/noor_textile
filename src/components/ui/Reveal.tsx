"use client";

import { motion, useReducedMotion } from "motion/react";

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "header";
};

/** Fades content up into place once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Comp>
  );
}

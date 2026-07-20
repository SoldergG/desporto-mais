"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Entrada suave quando a secção entra na viewport. Usada com moderação
 * só nos blocos principais de cada secção, nunca em loop nem em elementos
 * individuais de listas longas.
 */
export function RevealOnScroll({ children, delay = 0, className }: RevealOnScrollProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

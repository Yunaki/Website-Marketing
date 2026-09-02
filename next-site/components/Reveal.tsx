"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section";
  className?: string;
  id?: string;
};

export function Reveal({ children, delay = 0, className, id }: Props) {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className={className} id={id}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      id={id}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

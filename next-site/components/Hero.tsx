"use client";

import { motion, useReducedMotion } from "motion/react";

const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className="hero"
      variants={reduced ? undefined : parent}
      initial={reduced ? undefined : "hidden"}
      animate={reduced ? undefined : "show"}
    >
      <motion.h1 variants={reduced ? undefined : item}>
        The operating system <span className="hl">built</span> for{" "}
        <span className="hl">law firms.</span>
      </motion.h1>
      <motion.p className="lead" variants={reduced ? undefined : item}>
        Yunaki runs the case from first call to filing. Intake, documents,
        checks, follow-ups. <strong>Facts come from a deterministic
        engine.</strong> AI drafts. You decide. Your attorneys file.
      </motion.p>
      <motion.div className="hero-ctas" variants={reduced ? undefined : item}>
        <a className="btn btn-solid" href="/contact.html">
          Book a pilot
        </a>
        <a className="btn" href="/how-it-works.html">
          How it works
        </a>
      </motion.div>
    </motion.section>
  );
}

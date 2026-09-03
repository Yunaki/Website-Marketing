"use client";

// "70% less time." A donut, per founder review: the lime sweep is the time
// Yunaki takes off a case, the blue remainder is what your team still
// spends. Numbers ride the legend so nothing depends on color alone.
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

const WITHOUT = 10;
const WITH = 3;
const SAVING = Math.round((1 - WITH / WITHOUT) * 100);
const R = 84;
const CIRC = 2 * Math.PI * R;

function CountUp({ to, on, suffix }: { to: number; on: boolean; suffix?: string }) {
  const reduced = useReducedMotion();
  // Always start at 0 so the server and client render the same text; a
  // reduce-motion client jumps straight to the value in the effect.
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduced) { setV(to); return; }
    if (!on) return;
    const c = animate(0, to, { duration: 1.3, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [on, reduced, to]);
  return <>{v}{suffix}</>;
}

export function CaseWeekChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const grown = reduced || inView;
  const sweep = (SAVING / 100) * CIRC;

  return (
    <div className="cwk" ref={ref}>
      <div className="cwk-donutwrap" role="img"
        aria-label={`Donut chart. Without Yunaki a case takes about ${WITHOUT} staff hours. With Yunaki about ${WITH}. ${SAVING} percent less of your team's time.`}>
        <div className="cwk-donut">
          <svg viewBox="0 0 220 220" aria-hidden="true">
            <circle cx="110" cy="110" r={R} fill="none" stroke="#5f8fd6" strokeWidth="26" />
            <circle
              cx="110" cy="110" r={R} fill="none" stroke="#7fa32a" strokeWidth="26"
              strokeLinecap="round"
              strokeDasharray={`${CIRC}`}
              strokeDashoffset={grown ? CIRC - sweep : CIRC}
              transform="rotate(-90 110 110)"
              style={{ transition: reduced ? "none" : "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
          </svg>
          <div className="cwk-center">
            <span className="cwk-centernum"><CountUp to={SAVING} on={inView} suffix="%" /></span>
            <span className="cwk-centerword">less time</span>
          </div>
        </div>
        <div className="cwk-side">
          <div className="cwk-title">Your team&apos;s hours, per case</div>
          <div className="cwk-keys">
            <span><span className="cwk-swatch cwk-team"></span>Without Yunaki, {WITHOUT} hrs</span>
            <span><span className="cwk-swatch cwk-os"></span>With Yunaki, {WITH} hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

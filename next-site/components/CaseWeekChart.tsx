"use client";

// "70% less time per case." Two bars, one number. The comparison the
// founders asked for: staff hours on a case with and without Yunaki,
// drawn from the pilot case the film above tells.
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

const WITHOUT = 10;
const WITH = 3;
const SAVING = Math.round((1 - WITH / WITHOUT) * 100);

function CountUp({ to, on, suffix }: { to: number; on: boolean; suffix?: string }) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!on) return;
    if (reduced) { setV(to); return; }
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

  return (
    <div className="cwk" ref={ref}>
      <div className="cwk-head">
        <div>
          <div className="cwk-title">Your team&apos;s hours, per case</div>
          <div className="cwk-sub">the pilot case above, timed</div>
        </div>
        <div className="cwk-big" aria-hidden="true">
          <CountUp to={SAVING} on={inView} suffix="%" />
          <span className="cwk-bigword">less time</span>
        </div>
      </div>

      <div className="cwk-compare" role="img"
        aria-label={`Bar comparison. Without Yunaki, about ${WITHOUT} staff hours per case. With Yunaki, about ${WITH}. ${SAVING} percent less time.`}>
        <div className="cwk-row">
          <span className="cwk-rowlabel">Without Yunaki</span>
          <div className="cwk-track">
            <div className="cwk-fill cwk-team" style={{ width: grown ? "100%" : "2%" }} />
          </div>
          <span className="cwk-rowval">{WITHOUT} hrs</span>
        </div>
        <div className="cwk-row">
          <span className="cwk-rowlabel">With Yunaki</span>
          <div className="cwk-track">
            <div className="cwk-fill cwk-os" style={{ width: grown ? `${(WITH / WITHOUT) * 100}%` : "2%", transitionDelay: "0.25s" }} />
          </div>
          <span className="cwk-rowval">{WITH} hrs</span>
        </div>
      </div>
    </div>
  );
}

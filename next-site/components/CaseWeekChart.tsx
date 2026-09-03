"use client";

// "One case, one week" — what the OS did versus what the team did, day by
// day, from the demo case the film above tells. Grouped bars grow in on
// view; hover or focus a day for its numbers; a table view sits behind a
// disclosure. Palette validated for the dark surface (#7fa32a / #5f8fd6).
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "motion/react";

const DAYS = [
  { day: "Mon", os: 6, team: 1, note: "case opened, intake drafted, link out" },
  { day: "Tue", os: 0, team: 0, note: "quiet" },
  { day: "Wed", os: 0, team: 0, note: "quiet" },
  { day: "Thu", os: 2, team: 0, note: "silence noticed, follow-up sent" },
  { day: "Fri", os: 28, team: 1, note: "9 documents read, case checked, draft approved" },
  { day: "Mon", os: 3, team: 1, note: "ready for review, filed, receipt recorded" },
];
const MAX = 28;
const OS_TOTAL = DAYS.reduce((a, d) => a + d.os, 0);
const TEAM_TOTAL = DAYS.reduce((a, d) => a + d.team, 0);

function CountUp({ to, on }: { to: number; on: boolean }) {
  const reduced = useReducedMotion();
  const [v, setV] = useState(reduced ? to : 0);
  useEffect(() => {
    if (!on) return;
    if (reduced) { setV(to); return; }
    const c = animate(0, to, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [on, reduced, to]);
  return <>{v}</>;
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
          <div className="cwk-title">One case, one week</div>
          <div className="cwk-sub">the case the film above tells, counted</div>
        </div>
        <div className="cwk-heroes">
          <div className="cwk-hero">
            <span className="cwk-swatch cwk-os" aria-hidden="true"></span>
            <span className="cwk-num"><CountUp to={OS_TOTAL} on={inView} /></span>
            <span className="cwk-who">actions by Yunaki</span>
          </div>
          <div className="cwk-hero">
            <span className="cwk-swatch cwk-team" aria-hidden="true"></span>
            <span className="cwk-num"><CountUp to={TEAM_TOTAL} on={inView} /></span>
            <span className="cwk-who">touches by your team</span>
          </div>
        </div>
      </div>

      <div className="cwk-plot" role="img"
        aria-label={`Grouped bar chart, six days of one case. Yunaki acted ${OS_TOTAL} times, the team ${TEAM_TOTAL}. Busiest day Friday with 28 actions by Yunaki and one by the team.`}>
        {DAYS.map((d, i) => (
          <div key={i} className="cwk-day" tabIndex={0}>
            <div className="cwk-bars">
              <div
                className="cwk-bar cwk-os"
                style={{
                  height: grown ? `${Math.max(d.os / MAX, 0.012) * 100}%` : "1.2%",
                  transitionDelay: `${0.15 + i * 0.09}s`,
                }}
              />
              <div
                className="cwk-bar cwk-team"
                style={{
                  height: grown ? `${Math.max(d.team / MAX, 0.012) * 100}%` : "1.2%",
                  transitionDelay: `${0.2 + i * 0.09}s`,
                }}
              />
            </div>
            <div className="cwk-x">{d.day}</div>
            <div className="cwk-tip" role="tooltip">
              <strong>{d.day}</strong> · Yunaki {d.os} · team {d.team}
              <span>{d.note}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="cwk-legend" aria-hidden="true">
        <span><span className="cwk-swatch cwk-os"></span>Yunaki</span>
        <span><span className="cwk-swatch cwk-team"></span>Your team</span>
      </div>

      <details className="cwk-table">
        <summary>The numbers</summary>
        <table>
          <thead><tr><th scope="col">Day</th><th scope="col">Yunaki</th><th scope="col">Your team</th><th scope="col">What happened</th></tr></thead>
          <tbody>
            {DAYS.map((d, i) => (
              <tr key={i}><td>{d.day}</td><td>{d.os}</td><td>{d.team}</td><td>{d.note}</td></tr>
            ))}
            <tr><td>Total</td><td>{OS_TOTAL}</td><td>{TEAM_TOTAL}</td><td></td></tr>
          </tbody>
        </table>
      </details>
    </div>
  );
}

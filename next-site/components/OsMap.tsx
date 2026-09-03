"use client";

// The workflow film. The system map plays itself like the Desk above it:
// one case token travels the wires stage by stage while the surface it is
// on lights up. No captions, no controls. Honors prefers-reduced-motion by
// holding a fully drawn, fully lit frame.
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type Pt = [number, number];
const POLY: Record<string, Pt[]> = {
  "edge-intake": [[245, 144], [320, 144], [320, 262], [395, 262]],
  "edge-gmail": [[245, 420], [320, 420], [320, 324], [395, 324]],
  "edge-slack": [[650, 258], [715, 258], [715, 114], [790, 114]],
  "edge-approve": [[900, 162], [900, 268]],
  "edge-follow": [[650, 293], [720, 293], [720, 316], [790, 316]],
  "edge-filing": [[650, 328], [720, 328], [720, 510], [790, 510]],
};
const EDGE_PATHS = Object.entries(POLY).map(([id, pts]) => ({
  id,
  d: pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" "),
}));

// The story: in from the clients, checked in the core, approved in Slack,
// out through the gate, filed by the attorney.
const STAGES: { edge: string | null; nodes: string[]; dur: number }[] = [
  { edge: "edge-intake", nodes: ["intake", "core"], dur: 2.2 },
  { edge: "edge-gmail", nodes: ["gmail", "core"], dur: 2.2 },
  { edge: null, nodes: ["core"], dur: 1.6 },
  { edge: "edge-slack", nodes: ["core", "slack"], dur: 2.2 },
  { edge: "edge-approve", nodes: ["slack", "follow"], dur: 1.8 },
  { edge: "edge-follow", nodes: ["core", "follow"], dur: 2.2 },
  { edge: "edge-filing", nodes: ["core", "filing"], dur: 2.4 },
  { edge: null, nodes: ["intake", "gmail", "core", "slack", "follow", "filing"], dur: 1.6 },
];
const CYCLE = STAGES.reduce((a, s) => a + s.dur, 0);

function pointAt(poly: Pt[], t: number): Pt {
  const lens: number[] = [];
  let total = 0;
  for (let i = 1; i < poly.length; i++) {
    const l = Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    lens.push(l);
    total += l;
  }
  let d = Math.min(1, Math.max(0, t)) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const f = lens[i] === 0 ? 0 : d / lens[i];
      const a = poly[i], b = poly[i + 1];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
    }
    d -= lens[i];
  }
  return poly[poly.length - 1];
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type NodeSpec = {
  id: string; x: number; y: number; w: number; h: number;
  title: string; sub: string[]; gold?: boolean; stamp?: string; core?: boolean;
};
const NODES: NodeSpec[] = [
  { id: "intake", x: 30, y: 96, w: 215, h: 96, title: "Client intake", sub: ["answers + documents"] },
  { id: "gmail", x: 30, y: 372, w: 215, h: 96, title: "Gmail", sub: ["email matched to the case"] },
  { id: "core", x: 395, y: 218, w: 255, h: 150, title: "YUNAKI", sub: ["reads, checks, drafts", "never guesses"], core: true },
  { id: "slack", x: 790, y: 66, w: 220, h: 96, title: "Slack", sub: ["ask and approve"] },
  { id: "follow", x: 790, y: 268, w: 220, h: 96, title: "Follow-ups", sub: ["written for you, you send"] },
  { id: "filing", x: 790, y: 462, w: 220, h: 96, title: "Filing", sub: ["your attorney signs + files"], gold: true, stamp: "HUMAN" },
];

export function OsMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-80px" });
  const reduced = useReducedMotion();
  const [T, setT] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start == null) start = now;
      setT(((now - start) / 1000) % CYCLE);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, inView]);

  // Which stage are we in, and how far through it?
  let stage = STAGES[STAGES.length - 1], p = 1, acc = 0;
  if (!reduced) {
    for (const s of STAGES) {
      if (T < acc + s.dur) { stage = s; p = (T - acc) / s.dur; break; }
      acc += s.dur;
    }
  }
  const litNodes = new Set(stage.nodes);
  const litEdge = stage.edge;
  const dot = litEdge ? pointAt(POLY[litEdge], ease(p)) : null;
  const corePulse = 1 + (litNodes.has("core") ? 0.008 * Math.sin(T * 4) : 0);

  return (
    <div ref={wrapRef} className="osmap-scroll">
      <svg
        className="osmap"
        viewBox="0 0 1040 580"
        role="img"
        aria-label="The workflow, playing on a loop: client intake and Gmail flow into the Yunaki core, Slack approves, follow-ups go out through the approval gate, and the attorney files."
      >
        <text className="oshdr" x="30" y="76">YOUR CLIENTS</text>
        <text className="oshdr" x="395" y="200">THE OS</text>
        <text className="oshdr" x="790" y="48">YOUR FIRM</text>

        {EDGE_PATHS.map((e, i) => (
          <motion.path
            key={e.id}
            d={e.d}
            className={`osedge${litEdge === e.id ? " lit" : ""}`}
            initial={reduced ? undefined : { pathLength: 0 }}
            animate={reduced ? undefined : inView ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: "easeOut" }}
          />
        ))}

        <line className="osgate" x1="745" y1="225" x2="745" y2="575" />
        <text className="osgate-label" transform="rotate(-90 764 400)" x="764" y="400" textAnchor="middle">
          NOTHING SENDS WITHOUT YOU
        </text>

        {dot && <circle className="osdot" r="5" cx={dot[0]} cy={dot[1]} />}

        {NODES.map((n, i) => (
          <motion.g
            key={n.id}
            className={`osnode${n.gold ? " gold" : ""}${litNodes.has(n.id) ? " lit" : ""}`}
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: 0.12 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            style={n.core ? { transform: `scale(${corePulse})`, transformOrigin: "522px 293px" } : undefined}
          >
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={1} />
            <text
              className={n.core ? "oscore-title" : "osnode-title"}
              x={n.x + (n.core ? 27 : 20)}
              y={n.y + (n.core ? 67 : 40)}
            >
              {n.title}
            </text>
            {n.sub.map((s, j) => (
              <text key={s} className="osnode-sub" x={n.x + (n.core ? 27 : 20)} y={n.y + (n.core ? 97 : 66) + j * 22}>
                {s}
              </text>
            ))}
            {n.stamp && (
              <text className="osstamp" x={n.x + 158} y={n.y + 24}>{n.stamp}</text>
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}

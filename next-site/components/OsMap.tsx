"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type NodeId = "intake" | "gmail" | "core" | "slack" | "follow" | "filing";

const CAPTIONS: Record<NodeId, { title: string; text: string }> = {
  intake: {
    title: "Client intake.",
    text: "Clients answer and upload through one secure link — every answer lands checked, not retyped.",
  },
  gmail: {
    title: "Gmail.",
    text: "A client email arrives. Yunaki matches it to the case and drafts the reply.",
  },
  core: {
    title: "The OS.",
    text: "Reads the documents, checks every answer, finds what's missing. It never guesses.",
  },
  slack: {
    title: "Slack.",
    text: "Ask @yunaki anything about a case. Approve its drafts right in the thread.",
  },
  follow: {
    title: "Follow-ups.",
    text: "The email to the client is already written. You read it, you press send.",
  },
  filing: {
    title: "Filing.",
    text: "Forms prepped and checked. Your attorney signs and files — always a human.",
  },
};

const EDGES: Record<NodeId, string[]> = {
  intake: ["edge-intake"],
  gmail: ["edge-gmail"],
  core: ["edge-intake", "edge-gmail", "edge-slack", "edge-follow", "edge-filing"],
  slack: ["edge-slack", "edge-approve"],
  follow: ["edge-follow", "edge-approve"],
  filing: ["edge-filing"],
};

const TOUR: NodeId[] = ["intake", "gmail", "core", "slack", "follow", "filing"];

const EDGE_PATHS: { id: string; d: string }[] = [
  { id: "edge-intake", d: "M245,144 H320 V262 H395" },
  { id: "edge-gmail", d: "M245,420 H320 V324 H395" },
  { id: "edge-slack", d: "M650,258 H715 V114 H790" },
  { id: "edge-follow", d: "M650,293 H720 V316 H790" },
  { id: "edge-filing", d: "M650,328 H720 V510 H790" },
  { id: "edge-approve", d: "M900,162 V268" },
];

const DOTS: { path: string; dur: string; begin?: string }[] = [
  { path: "#edge-intake", dur: "3.6s" },
  { path: "#edge-gmail", dur: "4.4s", begin: "0.9s" },
  { path: "#edge-slack", dur: "3.8s", begin: "1.6s" },
  { path: "#edge-follow", dur: "4.1s", begin: "2.4s" },
  { path: "#edge-filing", dur: "4.8s", begin: "3.1s" },
  { path: "#edge-approve", dur: "2.6s", begin: "1.2s" },
];

type NodeSpec = {
  id: NodeId;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string[];
  gold?: boolean;
  stamp?: string;
  core?: boolean;
};

const NODES: NodeSpec[] = [
  { id: "intake", x: 30, y: 96, w: 215, h: 96, title: "Client intake", sub: ["answers + documents"] },
  { id: "gmail", x: 30, y: 372, w: 215, h: 96, title: "Gmail", sub: ["email matched to the case"] },
  { id: "core", x: 395, y: 218, w: 255, h: 150, title: "YUNAKI", sub: ["reads · checks · drafts", "never guesses"], core: true },
  { id: "slack", x: 790, y: 66, w: 220, h: 96, title: "Slack", sub: ["ask @yunaki · approve"] },
  { id: "follow", x: 790, y: 268, w: 220, h: 96, title: "Follow-ups", sub: ["written for you · you send"] },
  { id: "filing", x: 790, y: 462, w: 220, h: 96, title: "Filing", sub: ["your attorney signs + files"], gold: true, stamp: "HUMAN" },
];

export function OsMap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const [active, setActive] = useState<NodeId | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (reduced || touched || !inView) return;
    let step = 0;
    const id = setInterval(() => {
      setActive(TOUR[step]);
      step = (step + 1) % TOUR.length;
    }, 3200);
    return () => clearInterval(id);
  }, [reduced, touched, inView]);

  const pick = (n: NodeId) => {
    setTouched(true);
    setActive(n);
  };

  const litEdges = active ? EDGES[active] : [];
  const cap = active ? CAPTIONS[active] : null;

  return (
    <figure className="fig" ref={wrapRef}>
      <div className="osmap-scroll">
        <svg
          className="osmap"
          viewBox="0 0 1040 580"
          role="group"
          aria-label="Interactive map of the Yunaki system: client intake and Gmail flow into the Yunaki core, which connects to Slack, drafted follow-ups, and attorney filing. A dashed approval gate sits before anything leaves."
        >
          <text className="oshdr" x="30" y="76">YOUR CLIENTS</text>
          <text className="oshdr" x="395" y="200">THE AGENTIC OS</text>
          <text className="oshdr" x="790" y="48">YOUR FIRM</text>

          {EDGE_PATHS.map((e, i) => (
            <motion.path
              key={e.id}
              id={e.id}
              d={e.d}
              className={`osedge${litEdges.includes(e.id) ? " lit" : ""}`}
              initial={reduced ? undefined : { pathLength: 0 }}
              animate={reduced ? undefined : inView ? { pathLength: 1 } : undefined}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.14, ease: "easeOut" }}
            />
          ))}

          <line className="osgate" x1="745" y1="225" x2="745" y2="575" />
          <text
            className="osgate-label"
            transform="rotate(-90 764 400)"
            x="764"
            y="400"
            textAnchor="middle"
          >
            NOTHING SENDS WITHOUT YOU
          </text>

          {!reduced &&
            DOTS.map((d) => (
              <circle key={d.path} className="osdot" r="4">
                <animateMotion dur={d.dur} begin={d.begin} repeatCount="indefinite">
                  <mpath href={d.path} />
                </animateMotion>
              </circle>
            ))}

          {NODES.map((n, i) => (
            <motion.g
              key={n.id}
              className={`osnode${n.gold ? " gold" : ""}${active === n.id ? " lit" : ""}`}
              tabIndex={0}
              role="button"
              aria-label={n.title}
              onPointerEnter={() => pick(n.id)}
              onFocus={() => pick(n.id)}
              onClick={() => pick(n.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  pick(n.id);
                }
              }}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              animate={reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
                <text
                  key={s}
                  className="osnode-sub"
                  x={n.x + (n.core ? 27 : 20)}
                  y={n.y + (n.core ? 97 : 66) + j * 22}
                >
                  {s}
                </text>
              ))}
              {n.stamp && (
                <text className="osstamp" x={n.x + 158} y={n.y + 24}>
                  {n.stamp}
                </text>
              )}
            </motion.g>
          ))}
        </svg>
      </div>
      <figcaption className="osmap-cap" aria-live="polite">
        <motion.span
          key={active ?? "default"}
          initial={reduced ? undefined : { opacity: 0, y: 5 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: "block" }}
        >
          {cap ? (
            <>
              <strong>{cap.title}</strong> {cap.text}
            </>
          ) : (
            <>
              <strong>Fig. 1 · The Yunaki OS.</strong> Tap any part of the
              system — or just watch a case move.
            </>
          )}
        </motion.span>
      </figcaption>
    </figure>
  );
}

"use client";

// "The Desk" — one workspace, four real surfaces, a moving camera.
// Ported from the design handoff. The whole piece is a pure function of one
// authored clock T; the only state here is the clock and the stage scale.
import { useEffect, useRef, useState } from "react";
import { C, CUES, TOTAL, Easing, clamp, M } from "./tokens";
import { Slack, Phone, GmailWin, Cursor } from "./surfaces-left";
import { AppWin } from "./surfaces-app";
import { FormSheet, EFile } from "./surfaces-filing";

type Shot = { t: number; x: number; y: number; s: number; o?: number; d?: number; f: string | null; hdr?: boolean; chrome?: boolean };

function Piece({ T }: { T: number }) {
  const Q = CUES;
  const fade = 1 - M.step(T, TOTAL - 0.7, 0.7);
  const shots: Shot[] = [
    { t: 0, x: 1050, y: 600, s: 0.605, f: null },
    { t: Q.Ask, x: 400, y: 600, s: 1.24, o: -0.7, f: "slack" },
    { t: Q.Open, x: 1250, y: 390, s: 0.9, o: -0.2, d: 1.2, f: "app", hdr: true },
    { t: Q.Share, x: 600, y: 780, s: 1.0, o: 0.15, d: 1.1, f: "phone" },
    { t: Q.Silence, x: 1060, y: 880, s: 1.1, o: 0.1, f: "gmail" },
    { t: Q.Client, x: 400, y: 900, s: 1.3, f: "phone" },
    { t: Q.Read, x: 1180, y: 430, s: 1.2, f: "app", hdr: true },
    { t: Q.Check, x: 1640, y: 440, s: 1.28, f: "app", hdr: true },
    { t: Q.Draft, x: 520, y: 500, s: 1.2, o: 0.2, d: 1.1, f: "slack" },
    { t: Q.Approve, x: 540, y: 520, s: 1.15, f: "slack" },
    { t: Q.Forms, x: 1180, y: 330, s: 1.0, o: -0.5, d: 1.2, f: "app", hdr: true },
    { t: Q.Packet, x: 1430, y: 340, s: 1.05, o: 0.15, d: 1.15, f: "pdf" },
    { t: Q.Page5, x: 1430, y: 480, s: 1.15, o: -0.3, d: 1.1, f: "pdf", chrome: true },
    { t: Q.EFile, x: 540, y: 860, s: 1.12, o: -0.3, d: 1.2, f: "efile" },
    { t: Q.Land, x: 1050, y: 600, s: 0.605, o: -0.4, d: 1.4, f: null },
  ];
  const w = (f: string | null, name: string) => (f == null || f === name ? 1 : 0.42);
  // Frame guards: a shot that names a region derives its cap from its own zoom
  // on both axes, so changing a zoom can never push the region out of frame.
  shots.forEach((sh) => {
    if (sh.hdr) { sh.x = Math.min(sh.x, 860 + 640 / sh.s); sh.y = Math.min(sh.y, 85 + 360 / sh.s); }
    if (sh.chrome) { sh.x = Math.min(sh.x, 1080 + 640 / sh.s); sh.y = Math.min(sh.y, 95 + 360 / sh.s); }
  });
  let cam: { x: number; y: number; s: number; f?: string | null; dof?: (n: string) => number } = shots[0];
  for (let i = 1; i < shots.length; i++) {
    const a = shots[i - 1], b = shots[i];
    const st = b.t + (b.o == null ? -0.8 : b.o), en = st + (b.d || 1.1);
    if (T >= en) { cam = b; continue; }
    const p = Easing.easeInOutCubic(clamp((T - st) / (en - st), 0, 1));
    cam = { x: a.x + (b.x - a.x) * p, y: a.y + (b.y - a.y) * p, s: a.s + (b.s - a.s) * p,
      dof: (n) => w(a.f, n) + (w(b.f, n) - w(a.f, n)) * p };
    break;
  }
  if (!cam.dof) { const f = cam.f ?? null; cam.dof = (n) => w(f, n); }
  const dof = (n: string) => {
    const d = cam.dof!(n);
    return { opacity: d, filter: d < 0.99 ? `blur(${(1 - d) * 3.4}px)` : "none" };
  };
  const drift = Math.sin(T * 0.38) * 5;
  return (
    <div style={{ position: "absolute", inset: 0, background: C.canvas, overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: -160, filter: "blur(70px)", opacity: 0.8, pointerEvents: "none", backgroundImage:
        "radial-gradient(420px 380px at 14% 12%, #b9e4cf 0%, rgba(185,228,207,0) 68%), radial-gradient(520px 420px at 82% 8%, #cbcdf1 0%, rgba(203,205,241,0) 66%), radial-gradient(460px 400px at 92% 74%, #f4c7c0 0%, rgba(244,199,192,0) 66%), radial-gradient(560px 460px at 34% 88%, #bfd9f0 0%, rgba(191,217,240,0) 68%)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 2100, height: 1180, transformOrigin: "0 0", opacity: fade,
        transform: `translate(${640 - cam.x * cam.s + drift}px, ${360 - cam.y * cam.s}px) scale(${cam.s})` }}>
        <div style={{ position: "absolute", inset: 0, ...dof("slack") }}><Slack T={T} Q={CUES} /></div>
        <div style={{ position: "absolute", inset: 0, ...dof("app") }}><AppWin T={T} Q={CUES} /></div>
        <div style={{ position: "absolute", inset: 0, ...dof("phone") }}><Phone T={T} Q={CUES} /></div>
        <div style={{ position: "absolute", inset: 0, ...dof("gmail") }}><GmailWin T={T} Q={CUES} /></div>
        <div style={{ position: "absolute", inset: 0, ...dof("pdf") }}><FormSheet T={T} Q={CUES} /></div>
        <div style={{ position: "absolute", inset: 0, ...dof("efile") }}><EFile T={T} Q={CUES} /></div>
        <Cursor T={T} Q={CUES} />
      </div>
    </div>
  );
}

// Static hold used for reduced motion and small screens: the wide Land frame
// with the day's status on screen.
const HOLD_T = CUES.Land + 2.2;

export function YunakiDesk() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [running, setRunning] = useState(false);
  const [T, setT] = useState(HOLD_T);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // Phones get a fixed readable scale inside a horizontal swipe; larger
    // screens fit the stage to the container.
    // Phones get the handoff's "cropped vertical cut": a fixed window at
    // half scale, centered on the frame center where the film's camera pins
    // its subject; the frame edges crop cinematically.
    const compute = () => {
      const w = el.clientWidth;
      setScale(w < 640 ? 0.46 : w / 1280);
    };
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    compute();
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) { setRunning(true); }
  }, []);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start == null) start = now;
      setT(((now - start) / 1000) % TOTAL);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div ref={wrapRef} className="desk-wrap" role="img"
      aria-label="Animation: one immigration case travels across Slack, the Yunaki workspace, the client portal and Gmail. The case check finds a conflict, the attorney approves the follow-up, the forms fill from the case, and the attorney reviews and submits the filing.">
      <div className="desk-size" style={{ height: 720 * scale }}>
        <div
          className="desk-stage"
          style={{ transform: `scale(${scale})`, left: "50%", marginLeft: -640 * scale }}
        >
          <Piece T={T} />
        </div>
      </div>
    </div>
  );
}

"use client";

// Testimonials in the dithered-portrait style the founders pointed at:
// a horizontal band of big rounded cards, a halftone dot portrait on a warm
// tile, the quote beside it, attribution in mono caps. The portraits are
// generative silhouettes (no real likeness), drawn on canvas with a gentle
// shimmer wave; they stand still under reduced motion and offscreen, and
// they become dithered real photos the day the founders supply them.
import { useEffect, useRef } from "react";

type Person = { name: string; role: string; quote: string; seed: number };

const PEOPLE: Person[] = [
  { name: "Allison Yew", role: "Senior attorney", quote: "[ Allison's words go here ]", seed: 7 },
  { name: "Isaiah", role: "Paralegal", quote: "[ Isaiah's words go here ]", seed: 23 },
];

function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Head-and-shoulders density mask in unit space.
function silhouette(x: number, y: number, tiltX: number, hair: number) {
  const hx = 0.5 + tiltX, hy = 0.34;
  const head = Math.hypot((x - hx) / 0.185, (y - hy) / 0.23);
  const bun = Math.hypot((x - hx - 0.14) / (0.09 * hair), (y - hy + 0.14) / (0.1 * hair));
  const sh = Math.hypot((x - 0.5) / 0.44, (y - 1.06) / 0.5);
  let d = 0;
  if (head < 1) d = Math.max(d, 1 - head * 0.55);
  if (hair > 0 && bun < 1) d = Math.max(d, 1 - bun * 0.5);
  if (sh < 1 && y > 0.62) d = Math.max(d, 1 - sh * 0.45);
  return d;
}

function DotPortrait({ seed }: { seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 240, Hh = 300, dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = Hh * dpr;
    ctx.scale(dpr, dpr);
    const rnd = mulberry(seed);
    const tiltX = (rnd() - 0.5) * 0.1;
    const hair = rnd() > 0.5 ? 1 : 0;
    const GRID = 7;
    const dots: { x: number; y: number; s: number; plus: boolean; ph: number }[] = [];
    for (let gy = GRID / 2; gy < Hh; gy += GRID) {
      for (let gx = GRID / 2; gx < W; gx += GRID) {
        const d = silhouette(gx / W, gy / Hh, tiltX, hair);
        const jitter = rnd() * 0.3;
        if (d - jitter > 0.12) {
          dots.push({ x: gx, y: gy, s: Math.min(2.6, (d - jitter) * 4.6), plus: rnd() < 0.16, ph: (gx + gy) * 0.045 });
        }
      }
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, running = false;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, Hh);
      ctx.fillStyle = "#27354b";
      ctx.strokeStyle = "#27354b";
      ctx.lineWidth = 1.1;
      for (const p of dots) {
        const s = p.s * (reduced ? 1 : 1 + 0.2 * Math.sin(t / 640 + p.ph));
        if (s <= 0.3) continue;
        if (p.plus) {
          ctx.beginPath();
          ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y);
          ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, s, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!reduced && running) raf = requestAnimationFrame(draw);
    };
    draw(0);
    if (!reduced) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(draw); }
        else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
      }, { rootMargin: "60px" });
      io.observe(canvas);
      return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); };
    }
  }, [seed]);
  return <canvas ref={ref} className="quote-canvas" style={{ width: 240, height: 300 }} aria-hidden="true" />;
}

export function Testimonials() {
  return (
    <div className="quotes" role="list">
      {PEOPLE.map((p) => (
        <article className="quote" role="listitem" key={p.name}>
          <div className="quote-tile"><DotPortrait seed={p.seed} /></div>
          <div className="quote-body">
            <p className="quote-text">&ldquo;{p.quote}&rdquo;</p>
            <div className="quote-attr">{p.name.toUpperCase()}, {p.role.toUpperCase()}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

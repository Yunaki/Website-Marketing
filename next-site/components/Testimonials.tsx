"use client";

// Testimonials in the living-halftone style: each tile re-dithers a
// processed photo frame in real time, so the dot field plays like quiet
// video — a breathing zoom, a slow drift, per-dot shimmer, and a blink
// every few seconds. Sources are AI-generated faces of people who do not
// exist (public/portraits/stage-*.png, produced by scripts/halftone.py);
// rerun that script on Allison's and Isaiah's real photos to replace them.
// Reduced motion gets one still frame; offscreen tiles pause.
import { useEffect, useRef } from "react";

type Person = { name: string; role: string; quote: string; img: string; eyeY: number };

const PEOPLE: Person[] = [
  { name: "Allison Yew", role: "Senior attorney", quote: "[ Allison's words go here ]", img: "/portraits/stage-a.png", eyeY: 0.46 },
  { name: "Isaiah", role: "Paralegal", quote: "[ Isaiah's words go here ]", img: "/portraits/stage-b.png", eyeY: 0.44 },
];

const SW = 480, SH = 600;      // stage source size
const W = 240, H = 300;        // rendered size
const CELL = 4.5;              // grid pitch at render size (9px at stage scale)
const INK = "#27354b";

export function DitherPortrait({ src, eyeY }: { src: string; eyeY: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    let lum: Uint8ClampedArray | null = null;
    let bg = 245;
    const img = new Image();
    img.src = src;

    const sample = (x: number, y: number) => {
      // bilinear sample of the stage luminance, x/y in stage pixels
      if (!lum) return 245;
      const cx = Math.max(0, Math.min(SW - 2, x)), cy = Math.max(0, Math.min(SH - 2, y));
      const x0 = cx | 0, y0 = cy | 0, fx = cx - x0, fy = cy - y0;
      const i = y0 * SW + x0;
      const a = lum[i], b = lum[i + 1], c = lum[i + SW], d = lum[i + SW + 1];
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, running = false, blinkAt = 2600 + Math.random() * 2400;

    const draw = (t: number) => {
      if (!lum) { raf = requestAnimationFrame(draw); return; }
      // the "camera": breathing zoom and a slow drift
      const zoom = reduced ? 1 : 1 + 0.016 * Math.sin(t / 4200);
      const dx = reduced ? 0 : 5 * Math.sin(t / 5100);
      const dy = reduced ? 0 : 3.5 * Math.cos(t / 6300);
      // the blink: a brief dimming band over the eyes
      let blink = 0;
      if (!reduced) {
        const since = t - blinkAt;
        if (since > 0 && since < 150) blink = Math.sin((since / 150) * Math.PI);
        if (since > 150) blinkAt = t + 2800 + Math.random() * 2600;
      }
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = INK;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 0.8;
      for (let gy = CELL / 2; gy < H; gy += CELL) {
        for (let gx = CELL / 2; gx < W; gx += CELL) {
          const sx = (gx - W / 2) * (2 / zoom) + SW / 2 + dx;
          const sy = (gy - H / 2) * (2 / zoom) + SH / 2 + dy;
          const v = sample(sx, sy) / 255;
          let dens = 1 - v;
          if (Math.abs(v * 255 - bg) < 26) dens *= 0.25;
          const ex = (gx / W - 0.5) / 0.44, ey = (gy / H - 0.62) / 0.58;
          const e = ex * ex + ey * ey;
          if (e > 1.35) continue;
          if (e > 0.75) dens *= Math.max(0, (1.35 - e) / 0.6);
          dens = Math.max(0, (dens - 0.2) / 0.8) ** 1.15;
          if (blink > 0 && Math.abs(gy / H - eyeY) < 0.035) dens *= 1 - 0.6 * blink;
          if (dens < 0.12) continue;
          const ph = (gx * 7 + gy * 13) * 0.11;
          const s = dens * 2.2 * (reduced ? 1 : 1 + 0.11 * Math.sin(t / 480 + ph));
          if (s <= 0.22) continue;
          if (dens > 0.22 && dens < 0.42 && ((gx * 73 + gy * 19) | 0) % 7 === 0) {
            const p = Math.max(0.8, s * 1.25);
            ctx.beginPath();
            ctx.moveTo(gx - p, gy); ctx.lineTo(gx + p, gy);
            ctx.moveTo(gx, gy - p); ctx.lineTo(gx, gy + p);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(gx, gy, s, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    img.onload = () => {
      const off = document.createElement("canvas");
      off.width = SW; off.height = SH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, SW, SH);
      const data = octx.getImageData(0, 0, SW, SH).data;
      lum = new Uint8ClampedArray(SW * SH);
      for (let i = 0; i < SW * SH; i++) lum[i] = data[i * 4];
      let sum = 0, n = 0;
      for (let y = 0; y < 40; y += 8) for (const x of [0, 8, 16, 24, 32, SW - 40, SW - 32, SW - 24, SW - 16, SW - 8]) { sum += lum[y * SW + x]; n++; }
      bg = sum / n;
      draw(0);
    };

    if (!reduced) {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting && !running) { running = true; raf = requestAnimationFrame(draw); }
        else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
      }, { rootMargin: "80px" });
      io.observe(canvas);
      return () => { running = false; cancelAnimationFrame(raf); io.disconnect(); };
    }
  }, [src, eyeY]);
  return <canvas ref={ref} className="quote-canvas" style={{ width: W, height: H }} aria-hidden="true" />;
}

export function Testimonials() {
  return (
    <div className="quotes" role="list">
      {PEOPLE.map((p) => (
        <article className="quote" role="listitem" key={p.name}>
          <div className="quote-tile"><DitherPortrait src={p.img} eyeY={p.eyeY} /></div>
          <div className="quote-body">
            <p className="quote-text">&ldquo;{p.quote}&rdquo;</p>
            <div className="quote-attr">{p.name.toUpperCase()}, {p.role.toUpperCase()}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

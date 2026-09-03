// "The Desk" — shared tokens, easing, cues, marks and primitives.
// Ported from the design handoff (design/yunaki-desk.jsx). Every colour,
// radius and shadow is lifted from the Yunaki product source; do not re-derive.
import type { CSSProperties, ReactNode } from "react";

export const F = "Manrope, Inter, system-ui, sans-serif";
export const MO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export const C = {
  canvas: "#e9eef3", white: "#fff", chrome: "#ebf0f5",
  ink: "#081b39", soft: "#33455e", faint: "#4a5b73",
  line: "rgba(13,39,80,0.12)", lineS: "rgba(13,39,80,0.22)", fill: "rgba(13,39,80,0.05)",
  navy: "#27354B", accent: "#0d2750", accentW: "#e7edf5", accentL: "#d3deeb", lime: "#B6D552",
  ok: "#047857", okW: "#ecfdf5", okL: "#a7f3d0",
  warn: "#a94e08", warnW: "#fffbeb", warnL: "#fde68a",
  bad: "#8e2c21", badW: "#f8e2de", badL: "#eec6bf",
  info: "#0369a1", infoW: "#f0f9ff", infoL: "#bae6fd",
};
export const SH = "-10px -10px 24px rgba(255,255,255,0.72), 12px 12px 28px rgba(13,39,80,0.14), inset 0 1px 0 rgba(255,255,255,0.9)";
export const RAISED = "-10px -10px 22px rgba(255,255,255,0.95), 10px 10px 24px rgba(13,39,80,0.15)";
export const PRESSED = "inset -5px -5px 11px rgba(255,255,255,0.95), inset 5px 5px 11px rgba(13,39,80,0.16)";

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const Easing = {
  easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutBack: (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

export const M = {
  in: (T: number, at: number, d = 0.55) => Easing.easeOutCubic(clamp((T - at) / d, 0, 1)),
  pop: (T: number, at: number, d = 0.45) => 0.72 + 0.28 * Easing.easeOutBack(clamp((T - at) / d, 0, 1)),
  step: (T: number, at: number, d = 0.8) => Easing.easeInOutCubic(clamp((T - at) / d, 0, 1)),
};

export type Tone = "neutral" | "accent" | "success" | "warn" | "danger" | "info";
export const TONE: Record<Tone, [string, string, string]> = {
  neutral: [C.fill, C.soft, C.lineS], accent: [C.accentW, C.accent, C.accentL],
  success: [C.okW, C.ok, C.okL], warn: [C.warnW, C.warn, C.warnL],
  danger: [C.badW, C.bad, C.badL], info: [C.infoW, C.info, C.infoL],
};

// Cues: running sum of the scene durations in the handoff's OM_SCENES.
const SCENES: [string, number][] = [
  ["Wide", 1.8], ["Ask", 3.2], ["Open", 3.2], ["Share", 2.8], ["Silence", 3.0],
  ["Client", 3.4], ["Read", 3.6], ["Check", 3.8], ["Draft", 3.2], ["Approve", 3.2],
  ["Forms", 3.4], ["Packet", 4.2], ["Page5", 3.4], ["EFile", 4.4], ["Land", 4.0],
];
export type Cues = Record<string, number>;
export const CUES: Cues = (() => {
  const q: Cues = {};
  let t = 0;
  for (const [name, dur] of SCENES) { q[name] = t; t += dur; }
  return q;
})();
export const TOTAL = SCENES.reduce((a, [, d]) => a + d, 0);

// ----------------------------------------------------------------- marks
export function Crane({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <g transform="translate(32 32) rotate(-16) scale(0.6) translate(-48 -27.5)">
        <g fill="none" stroke={C.navy} strokeWidth="4.6" strokeLinejoin="miter" strokeMiterlimit="12">
          <polygon points="45,39 60,34 60,48" fill={C.lime} />
          <path d="M4 1 L60 34" /><path d="M15 39 L73 13" /><path d="M4 1 L15 39" />
          <polygon points="0,54 45,39 60,48 29,54" />
          <polygon points="60,34 73,13 71,23 60,48" />
          <polygon points="73,13 96,22 71,23" />
        </g>
      </g>
    </svg>
  );
}
export function SlackLogo({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 122.8 122.8" width={size} height={size} aria-hidden="true">
      <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A" />
      <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0" />
      <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D" />
      <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E" />
    </svg>
  );
}
export function GmailLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 52 40" width={size} height={(size * 40) / 52} aria-hidden="true">
      <path fill="#4285f4" d="M3.64 40h9.09V18.18L0 8.51v27.85C0 38.36 1.64 40 3.64 40z" />
      <path fill="#34a853" d="M39.27 40h9.09c2.01 0 3.64-1.64 3.64-3.64V8.51L39.27 18.18V40z" />
      <path fill="#fbbc04" d="M39.27 3.64v14.54L52 8.51V5.45c0-3.37-3.85-5.29-6.55-3.27l-6.18 1.46z" />
      <path fill="#ea4335" d="M12.73 18.18V3.64L26 13.59l13.27-9.95v14.54L26 28.13z" />
      <path fill="#c5221f" d="M0 5.45v3.06l12.73 9.67V3.64L6.55 2.18C3.85.16 0 2.08 0 5.45z" />
    </svg>
  );
}
// Geometry copied from yunaki_staging ui/icons.tsx (adapted from Lucide, ISC).
export function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
      strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ flexShrink: 0 }}>{children}</svg>
  );
}
export const NAV_GLYPH: Record<string, ReactNode> = {
  dash: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  cases: <><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect x="2" y="6" width="20" height="14" rx="2.5" /></>,
  forms: <><path d="M4 4v16" /><path d="M8 8v12" /><path d="M12 6v14" /><path d="m16 6 4 14" /></>,
  intake: <><path d="M13.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l5 5v3" /><path d="M13 2v5h5" /><path d="M21.3 12.7a1.7 1.7 0 0 0-2.4 0l-5 5-.9 3.3 3.3-.9 5-5a1.7 1.7 0 0 0 0-2.4Z" /></>,
  appr: <><path d="M3.7 3.05a.5.5 0 0 0-.68.63l2.84 7.62a2 2 0 0 1 0 1.4l-2.84 7.62a.5.5 0 0 0 .68.63l18-8.5a.5.5 0 0 0 0-.9Z" /><path d="M6 12h16" /></>,
  setup: <><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></>,
};

// ------------------------------------------------------------ primitives
type PillProps = { T: number; at: number; until?: number; text: string; tone?: Tone; dot?: boolean; size?: "sm" | "md" };
export function Pill({ T, at, until, text, tone = "neutral", dot, size = "sm" }: PillProps) {
  if (T < at) return null;
  let o = Math.min(1, (T - at) / 0.16);
  if (until != null) { const f = clamp((T - until) / 0.24, 0, 1); if (f >= 1) return null; o *= 1 - f; }
  const [bg, fg, bd] = TONE[tone];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: fg, border: `1px solid ${bd}`,
      borderRadius: 999, fontFamily: F, fontWeight: 600, fontSize: size === "md" ? 15 : 12.5, padding: size === "md" ? "5px 13px" : "4px 10px",
      whiteSpace: "nowrap", opacity: o, transform: `scale(${M.pop(T, at)})`, transformOrigin: "left center" }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 3, background: "currentColor" }} />}{text}
    </span>
  );
}
export function Dots({ T, color = C.faint }: { T: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 5, height: 5, borderRadius: 3, background: color, opacity: 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(T * 5.5 - i)) }} />
      ))}
    </span>
  );
}
export function Win({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", background: C.white, borderRadius: 26,
      border: "1px solid rgba(255,255,255,0.78)", boxShadow: SH, overflow: "hidden", ...style }}>{children}</div>
  );
}

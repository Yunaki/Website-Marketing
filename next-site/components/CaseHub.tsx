"use client";

// The case hub, round three per founder review. Communication is its own
// cluster: Slack, Teams, Gmail and the rest feed it, and it alone talks to
// the firm portal. The portal fans out to case management, validation,
// e-filing, follow-ups and the intake form, and the intake form hands off
// to the client portal. Pills carry a mark and a name, nothing else.

const T = { title: "#081b39", sub: "#4a5b73", lime: "#7fa32a" };

function SlackMark({ s = 20 }: { s?: number }) {
  return (
    <g transform={`scale(${s / 122.8})`}>
      <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#E01E5A" />
      <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36C5F0" />
      <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2EB67D" />
      <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ECB22E" />
    </g>
  );
}
function GmailMark({ s = 22 }: { s?: number }) {
  return (
    <g transform={`scale(${s / 52})`}>
      <path fill="#4285f4" d="M3.64 40h9.09V18.18L0 8.51v27.85C0 38.36 1.64 40 3.64 40z" />
      <path fill="#34a853" d="M39.27 40h9.09c2.01 0 3.64-1.64 3.64-3.64V8.51L39.27 18.18V40z" />
      <path fill="#fbbc04" d="M39.27 3.64v14.54L52 8.51V5.45c0-3.37-3.85-5.29-6.55-3.27l-6.18 1.46z" />
      <path fill="#ea4335" d="M12.73 18.18V3.64L26 13.59l13.27-9.95v14.54L26 28.13z" />
      <path fill="#c5221f" d="M0 5.45v3.06l12.73 9.67V3.64L6.55 2.18C3.85.16 0 2.08 0 5.45z" />
    </g>
  );
}
function TeamsMark({ s = 22 }: { s?: number }) {
  return (
    <g transform={`scale(${s / 24})`}>
      <circle cx="17.5" cy="7" r="3.1" fill="#7B83EB" />
      <circle cx="10" cy="6" r="4" fill="#5059C9" />
      <rect x="1" y="9" width="13" height="12.5" rx="2.6" fill="#4B53BC" />
      <path d="M4.4 12.6h6.2v1.9H8.6v5.6H6.8v-5.6H4.4z" fill="#fff" />
      <path d="M15 10.5h6.4c.9 0 1.6.7 1.6 1.6v4.9c0 2.6-2.1 4.7-4.7 4.7H15z" fill="#7B83EB" opacity="0.9" />
    </g>
  );
}

const CX = 660, CY = 400, R = 160;
const H = 56;

type Pill = {
  id: string; x: number; y: number; w: number; title: string;
  mark?: "slack" | "gmail" | "teams"; mono?: string; monoBg?: string; monoColor?: string;
};

// Communication cluster, left.
const COMM = { x: 268, y: 372, w: 224, h: H };
const FEEDS: Pill[] = [
  { id: "slack", x: 40, y: 196, w: 150, title: "Slack", mark: "slack" },
  { id: "teams", x: 28, y: 288, w: 156, title: "Teams", mark: "teams" },
  { id: "gmail", x: 28, y: 428, w: 150, title: "Gmail", mark: "gmail" },
  { id: "others", x: 40, y: 520, w: 150, title: "Others", mono: "+", monoBg: "#e7edf5", monoColor: "#4a5b73" },
];
// The portal's own limbs.
const LIMBS: Pill[] = [
  { id: "intake", x: 600, y: 56, w: 196, title: "Intake form", mono: "I", monoBg: "#b6d552", monoColor: "#16210c" },
  { id: "portal", x: 892, y: 56, w: 200, title: "Client portal", mono: "C", monoBg: "#b6d552", monoColor: "#16210c" },
  { id: "cm", x: 924, y: 300, w: 232, title: "Case management", mono: "CM", monoBg: "#e7edf5", monoColor: "#0d2750" },
  { id: "validation", x: 940, y: 500, w: 176, title: "Validation", mono: "V", monoBg: "#e7edf5", monoColor: "#0d2750" },
  { id: "efile", x: 680, y: 664, w: 154, title: "E-filing", mono: "E", monoBg: "#e7edf5", monoColor: "#0d2750" },
  { id: "follow", x: 380, y: 620, w: 186, title: "Follow-ups", mono: "F", monoBg: "#e7edf5", monoColor: "#0d2750" },
];

function rim(px: number, py: number) {
  const dx = CX - px, dy = CY - py;
  const d = Math.hypot(dx, dy);
  return [CX - (dx / d) * (R + 6), CY - (dy / d) * (R + 6)];
}

function PillCard({ n }: { n: Pill }) {
  return (
    <g>
      <rect className="hub-card" x={n.x} y={n.y} width={n.w} height={H} rx={H / 2} />
      {n.mark === "slack" && <g transform={`translate(${n.x + 17} ${n.y + 18})`}><SlackMark s={20} /></g>}
      {n.mark === "gmail" && <g transform={`translate(${n.x + 16} ${n.y + 20})`}><GmailMark s={22} /></g>}
      {n.mark === "teams" && <g transform={`translate(${n.x + 15} ${n.y + 16})`}><TeamsMark s={23} /></g>}
      {n.mono && (
        <>
          <circle cx={n.x + 28} cy={n.y + H / 2} r={14} fill={n.monoBg} />
          <text x={n.x + 28} y={n.y + H / 2 + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={n.monoColor} fontFamily="'Bricolage Grotesque', sans-serif">{n.mono}</text>
        </>
      )}
      <text x={n.x + 50} y={n.y + H / 2 + 6} fontSize={16.5} fontWeight={700} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">{n.title}</text>
    </g>
  );
}

export function CaseHub() {
  const stats: [string, string, number, number][] = [
    ["9", "DOCUMENTS", 594, 396],
    ["14", "FIELDS READ", 728, 396],
    ["3", "ISSUES CAUGHT", 594, 466],
    ["1", "APPROVAL", 728, 466],
  ];
  const commRight: [number, number] = [COMM.x + COMM.w, COMM.y + COMM.h / 2];
  const commRim = rim(commRight[0], commRight[1]);
  return (
    <div className="hub-wrap">
      <div className="hub-scroll">
        <svg
          className="hub"
          viewBox="0 0 1160 760"
          role="img"
          aria-label="Slack, Teams, Gmail and other channels feed one Communication point, which talks to the firm portal. The portal drives the intake form, which reaches the client portal, plus case management, validation, e-filing and follow-ups."
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="46%" r="60%">
              <stop offset="0%" stopColor="#b6d552" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#b6d552" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#b6d552" stopOpacity="0" />
            </radialGradient>
            <marker id="hubArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7fa32a" />
            </marker>
          </defs>

          {/* channels into Communication */}
          {FEEDS.map((n) => {
            const sx = n.x + n.w, sy = n.y + H / 2;
            const tx = COMM.x - 4, ty = COMM.y + COMM.h / 2 + (sy < COMM.y ? -12 : sy > COMM.y + COMM.h ? 12 : 0);
            const mx = (sx + tx) / 2, my = (sy + ty) / 2;
            return <path key={n.id} className="hub-flow" d={`M${sx},${sy} Q${mx + 10},${sy} ${mx},${my} T${tx},${ty}`} markerEnd="url(#hubArrow)" />;
          })}

          {/* Communication into the portal */}
          <path className="hub-flow" d={`M${commRight[0]},${commRight[1]} L${commRim[0]},${commRim[1]}`} markerEnd="url(#hubArrow)" />

          {/* the portal's limbs */}
          {LIMBS.filter((n) => n.id !== "portal").map((n) => {
            const cyS = n.y + H / 2;
            const nearMid = Math.abs(cyS - CY) < 90;
            const px = nearMid ? n.x : n.x + n.w / 2;
            const py = nearMid ? cyS : cyS < CY ? n.y + H : n.y;
            const [ex, ey] = rim(px, py);
            const mx = (px + ex) / 2 + (py < CY ? -12 : 12);
            const my = (py + ey) / 2 + (px < CX ? 10 : -10);
            return <path key={n.id} className="hub-flow" d={`M${ex},${ey} Q${mx},${my} ${px},${py}`} markerEnd="url(#hubArrow)" />;
          })}

          {/* intake form hands off to the client portal */}
          <path className="hub-flow" d={`M${600 + 196},${56 + H / 2} H${892 - 6}`} markerEnd="url(#hubArrow)" />

          {/* Communication node */}
          <rect className="hub-card" x={COMM.x} y={COMM.y} width={COMM.w} height={COMM.h} rx={COMM.h / 2} />
          <text x={COMM.x + COMM.w / 2} y={COMM.y + COMM.h / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={700} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">Communication</text>

          {/* the core */}
          <circle cx={CX} cy={CY} r={R} fill="#ffffff" stroke="rgba(13,39,80,0.12)" strokeWidth="1" />
          <circle className="hub-glowrect" cx={CX} cy={CY} r={R} fill="url(#hubGlow)" />
          <text x={CX} y={314} textAnchor="middle" fontSize={12} letterSpacing="0.12em" fill={T.lime} fontFamily="'Martian Mono', ui-monospace, monospace">THE FIRM PORTAL</text>
          {stats.map(([n, l, sx, sy]) => (
            <g key={l}>
              <text x={sx} y={sy} textAnchor="middle" fontSize={32} fontWeight={800} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">{n}</text>
              <text x={sx} y={sy + 23} textAnchor="middle" fontSize={9} letterSpacing="0.08em" fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">{l}</text>
            </g>
          ))}

          {FEEDS.map((n) => <PillCard key={n.id} n={n} />)}
          {LIMBS.map((n) => <PillCard key={n.id} n={n} />)}
        </svg>
      </div>
    </div>
  );
}

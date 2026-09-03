"use client";

// The case hub, round two per founder review: a circular firm-portal core
// with its stats, satellites orbiting it with official marks and no
// sublines, clean curved lime connectors, no dotted frames.

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

type Sat = {
  id: string; x: number; y: number; w: number;
  title: string; mark?: "slack" | "gmail" | "teams"; mono?: string; monoBg?: string; monoColor?: string;
  out?: boolean;
};

const R = 175;
const CX = 580, CY = 385;
const H = 58;

const SATS: Sat[] = [
  { id: "intake", x: 470, y: 42, w: 200, title: "Intake form", mono: "I", monoBg: "#b6d552", monoColor: "#16210c" },
  { id: "slack", x: 128, y: 150, w: 160, title: "Slack", mark: "slack" },
  { id: "teams", x: 76, y: 328, w: 168, title: "Teams", mark: "teams" },
  { id: "others", x: 128, y: 506, w: 168, title: "Others", mono: "+", monoBg: "#e7edf5", monoColor: "#4a5b73" },
  { id: "cm", x: 300, y: 650, w: 236, title: "Case management", mono: "CM", monoBg: "#e7edf5", monoColor: "#0d2750" },
  { id: "gmail", x: 872, y: 150, w: 160, title: "Gmail", mark: "gmail" },
  { id: "follow", x: 916, y: 360, w: 190, title: "Follow-ups", mono: "F", monoBg: "#e7edf5", monoColor: "#0d2750", out: true },
  { id: "efile", x: 850, y: 560, w: 160, title: "E-filing", mono: "E", monoBg: "#e7edf5", monoColor: "#0d2750", out: true },
  { id: "validation", x: 596, y: 660, w: 180, title: "Validation", mono: "V", monoBg: "#e7edf5", monoColor: "#0d2750", out: true },
];

function edgePoint(sx: number, sy: number) {
  const dx = CX - sx, dy = CY - sy;
  const d = Math.hypot(dx, dy);
  return [CX - (dx / d) * (R + 6), CY - (dy / d) * (R + 6)];
}

export function CaseHub() {
  const stats: [string, string, number, number][] = [
    ["9", "DOCUMENTS", 512, 385],
    ["14", "FIELDS READ", 650, 385],
    ["3", "ISSUES CAUGHT", 512, 455],
    ["1", "APPROVAL", 650, 455],
  ];
  return (
    <div className="hub-wrap">
      <div className="hub-scroll">
        <svg
          className="hub"
          viewBox="0 0 1160 740"
          role="img"
          aria-label="The firm portal at the center, as a circle. Intake, Slack, Teams, other channels, Gmail and case management flow in; follow-ups, e-filing and validation flow out."
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

          {/* connectors: gentle curves between each satellite and the rim */}
          {SATS.map((n) => {
            const cyS = n.y + H / 2;
            const nearMid = Math.abs(cyS - CY) < 90;
            const useX = nearMid ? (n.x + n.w / 2 < CX ? n.x + n.w : n.x) : n.x + n.w / 2;
            const useY = nearMid ? cyS : cyS < CY ? n.y + H : n.y;
            const [ex, ey] = edgePoint(useX, useY);
            const mx = (useX + ex) / 2 + (useY < CY ? 12 : -12);
            const my = (useY + ey) / 2 + (useX < CX ? -10 : 10);
            const d = n.out
              ? `M${ex},${ey} Q${mx},${my} ${useX},${useY}`
              : `M${useX},${useY} Q${mx},${my} ${ex},${ey}`;
            return <path key={n.id} className="hub-flow" d={d} markerEnd="url(#hubArrow)" />;
          })}

          {/* the core */}
          <circle cx={CX} cy={CY} r={R} fill="#ffffff" stroke="rgba(13,39,80,0.12)" strokeWidth="1" />
          <circle className="hub-glowrect" cx={CX} cy={CY} r={R} fill="url(#hubGlow)" />
          <text x={CX} y={296} textAnchor="middle" fontSize={12} letterSpacing="0.12em" fill={T.lime} fontFamily="'Martian Mono', ui-monospace, monospace">THE FIRM PORTAL</text>
          {stats.map(([n, l, sx, sy]) => (
            <g key={l}>
              <text x={sx} y={sy} textAnchor="middle" fontSize={34} fontWeight={800} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">{n}</text>
              <text x={sx} y={sy + 24} textAnchor="middle" fontSize={9} letterSpacing="0.08em" fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">{l}</text>
            </g>
          ))}

          {/* satellites: a mark and a name, nothing else */}
          {SATS.map((n) => (
            <g key={n.id}>
              <rect className="hub-card" x={n.x} y={n.y} width={n.w} height={H} rx={H / 2} />
              {n.mark === "slack" && <g transform={`translate(${n.x + 18} ${n.y + 19})`}><SlackMark s={20} /></g>}
              {n.mark === "gmail" && <g transform={`translate(${n.x + 17} ${n.y + 21})`}><GmailMark s={22} /></g>}
              {n.mark === "teams" && <g transform={`translate(${n.x + 16} ${n.y + 17})`}><TeamsMark s={23} /></g>}
              {n.mono && (
                <>
                  <circle cx={n.x + 29} cy={n.y + H / 2} r={15} fill={n.monoBg} />
                  <text x={n.x + 29} y={n.y + H / 2 + 4.5} textAnchor="middle" fontSize={13} fontWeight={800} fill={n.monoColor} fontFamily="'Bricolage Grotesque', sans-serif">{n.mono}</text>
                </>
              )}
              <text x={n.x + 52} y={n.y + H / 2 + 6} fontSize={17} fontWeight={700} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">{n.title}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

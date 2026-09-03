"use client";

// The case hub: everything orbits one case file. Dark panel with the lime
// core, built from the founder's design. Connectors carry a slow lime flow;
// the core glow breathes. All motion is CSS, off under reduced motion.

const T = { title: "#081b39", sub: "#4a5b73", label: "#4a5b73", lime: "#7fa32a" };

function Card({ x, y, w, h, icon, iconBg, iconColor, title, sub }: {
  x: number; y: number; w: number; h: number;
  icon: string; iconBg: string; iconColor: string; title: string; sub: string;
}) {
  return (
    <g>
      <rect className="hub-card" x={x} y={y} width={w} height={h} rx={26} />
      <circle cx={x + 38} cy={y + h / 2} r={16} fill={iconBg} />
      <text x={x + 38} y={y + h / 2 + 5} textAnchor="middle" fontSize={15} fontWeight={800} fill={iconColor} fontFamily="'Bricolage Grotesque', sans-serif">{icon}</text>
      <text x={x + 66} y={y + h / 2 - 4} fontSize={17} fontWeight={700} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">{title}</text>
      <text x={x + 66} y={y + h / 2 + 17} fontSize={10} fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">{sub}</text>
    </g>
  );
}

function GroupFrame({ x, y, w, h, label, labelY }: { x: number; y: number; w: number; h: number; label: string; labelY: number }) {
  return (
    <g>
      <rect className="hub-group" x={x} y={y} width={w} height={h} rx={18} />
      <text className="hub-label" x={x + 14} y={labelY}>{label}</text>
    </g>
  );
}

export function CaseHub() {
  const stats: [string, string, number, number][] = [
    ["9", "DOCUMENTS", 620, 470],
    ["14", "FIELDS READ", 760, 470],
    ["3", "ISSUES CAUGHT", 620, 540],
    ["1", "APPROVAL", 760, 540],
  ];
  return (
    <div className="hub-wrap">
      <div className="hub-scroll">
        <svg
          className="hub"
          viewBox="0 0 1160 870"
          role="img"
          aria-label="Everything orbits one case file. The client portal and intake feed it, the firm asks through Slack and other channels, Gmail feeds it matched client mail, case management stays synced both ways, and it drives e-filing across 30 forms, validation, and drafted follow-ups."
        >
          <defs>
            <radialGradient id="hubGlow" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#b6d552" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#b6d552" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#b6d552" stopOpacity="0" />
            </radialGradient>
            <marker id="hubArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7fa32a" />
            </marker>
            <marker id="hubArrowDim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa8bc" />
            </marker>
          </defs>

          {/* client group, top */}
          <GroupFrame x={440} y={56} w={660} h={152} label="WHAT YOUR CLIENT SEES" labelY={44} />
          <Card x={465} y={82} w={290} h={100} icon="I" iconBg="#b6d552" iconColor="#16210c" title="Intake form" sub="42 questions" />
          <Card x={790} y={82} w={285} h={100} icon="C" iconBg="#b6d552" iconColor="#16210c" title="Client portal" sub="one secure link" />
          <path className="hub-dashline" d="M755,132 H782" markerEnd="url(#hubArrowDim)" />

          {/* firm group, left */}
          <GroupFrame x={28} y={286} w={630} h={296} label="WHERE YOUR FIRM TALKS" labelY={274} />
          <Card x={52} y={310} w={230} h={72} icon="S" iconBg="#3d2b45" iconColor="#fff" title="Slack" sub="live" />
          <Card x={52} y={398} w={230} h={72} icon="T" iconBg="#33406e" iconColor="#fff" title="Teams" sub="next" />
          <Card x={52} y={486} w={230} h={72} icon="+" iconBg="#e7edf5" iconColor="#4a5b73" title="Others" sub="on ask" />
          <rect className="hub-group" x={308} y={374} width={184} height={120} rx={34} />
          <text x={400} y={428} textAnchor="middle" fontSize={17.5} fontWeight={800} fill={T.title} fontFamily="'Bricolage Grotesque', sans-serif">Communication</text>
          <text x={400} y={452} textAnchor="middle" fontSize={9.5} fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">one place to ask</text>
          <path className="hub-dashline" d="M282,346 H296 V408 H304" markerEnd="url(#hubArrowDim)" />
          <path className="hub-dashline" d="M282,434 H304" markerEnd="url(#hubArrowDim)" />
          <path className="hub-dashline" d="M282,522 H296 V460 H304" markerEnd="url(#hubArrowDim)" />

          {/* gmail, right */}
          <Card x={930} y={392} w={215} h={92} icon="M" iconBg="#c8322a" iconColor="#fff" title="Gmail" sub="client mail, matched" />

          {/* case management, firm side */}
          <Card x={52} y={620} w={230} h={72} icon="CM" iconBg="#e7edf5" iconColor="#0d2750" title="Case management" sub="synced both ways" />
          <path className="hub-flow" d="M282,656 H440 V560 H501" markerEnd="url(#hubArrow)" />

          {/* the core */}
          <rect x={505} y={300} width={390} height={330} rx={36} fill="#ffffff" stroke="rgba(13,39,80,0.12)" strokeWidth="1" />
          <rect className="hub-glowrect" x={505} y={300} width={390} height={330} rx={36} fill="url(#hubGlow)" />
          <text x={700} y={352} textAnchor="middle" fontSize={11} letterSpacing="0.1em" fill={T.lime} fontFamily="'Martian Mono', ui-monospace, monospace">THE FIRM PORTAL</text>
          <text x={700} y={396} textAnchor="middle" fontSize={34} fontWeight={800} fill="#081b39" fontFamily="'Bricolage Grotesque', sans-serif" letterSpacing="-0.02em">One case file</text>
          <text x={700} y={424} textAnchor="middle" fontSize={11} letterSpacing="0.06em" fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">YK-2041 · I-130 · SPOUSE</text>
          {stats.map(([n, l, sx, sy]) => (
            <g key={l}>
              <text x={sx} y={sy} textAnchor="middle" fontSize={30} fontWeight={800} fill={T.lime} fontFamily="'Bricolage Grotesque', sans-serif">{n}</text>
              <text x={sx} y={sy + 22} textAnchor="middle" fontSize={9} letterSpacing="0.08em" fill={T.sub} fontFamily="'Martian Mono', ui-monospace, monospace">{l}</text>
            </g>
          ))}

          {/* lime connectors into the core */}
          <path className="hub-flow" d="M660,300 V252 Q660,230 638,220 Q614,210 610,190" markerEnd="url(#hubArrow)" />
          <path className="hub-flow" d="M492,434 H509" markerEnd="url(#hubArrow)" />
          <path className="hub-flow" d="M930,438 H899" markerEnd="url(#hubArrow)" />

          {/* bottom group */}
          <path className="hub-flow" d="M700,630 V654" />
          <GroupFrame x={430} y={672} w={680} h={158} label="WHAT IT DOES WITH THE CASE" labelY={856} />
          <path className="hub-dashline" d="M700,656 H557 V700" markerEnd="url(#hubArrowDim)" />
          <path className="hub-dashline" d="M700,656 H787 V700" markerEnd="url(#hubArrowDim)" />
          <path className="hub-dashline" d="M700,656 H1025 V700" markerEnd="url(#hubArrowDim)" />
          <Card x={455} y={706} w={205} h={92} icon="E" iconBg="#e7edf5" iconColor="#0d2750" title="E-filing" sub="30 forms" />
          <Card x={685} y={706} w={205} h={92} icon="V" iconBg="#e7edf5" iconColor="#0d2750" title="Validation" sub="14 checks" />
          <Card x={915} y={706} w={220} h={92} icon="F" iconBg="#e7edf5" iconColor="#0d2750" title="Follow-ups" sub="drafted and chased" />
        </svg>
      </div>
    </div>
  );
}

// "The Desk" — the Yunaki workspace window: sidebar, case list, case detail,
// case check, forms library. Ported from the design handoff.
import type { ReactNode } from "react";
import { C, F, MO, M, RAISED, PRESSED, TONE, Pill, Dots, Win, Crane, SlackLogo, GmailLogo, Glyph, NAV_GLYPH, type Cues, type Tone } from "./tokens";

function NavRow({ label, icon, active, badge }: { label: string; icon: ReactNode; active?: boolean; badge?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, borderRadius: 21, padding: "9px 12px",
      background: active ? C.chrome : "transparent", boxShadow: active ? PRESSED : "none",
      fontFamily: F, fontWeight: active ? 800 : 600, fontSize: 13, color: active ? C.ink : C.soft }}>
      <Glyph>{icon}</Glyph>
      {label}
      {badge != null && <span style={{ marginLeft: "auto", fontFamily: MO, fontSize: 10.5, fontWeight: 700, background: C.accent, color: "#fff", borderRadius: 999, padding: "1px 7px" }}>{badge}</span>}
    </div>
  );
}

type FieldRowProps = { T: number; at: number; label: string; value: string; ev?: string; blank?: boolean; conflict?: string; cAt?: number };
function FieldRow({ T, at, label, value, ev, blank, conflict, cAt = 0 }: FieldRowProps) {
  if (T < at) return null;
  const e = M.in(T, at, 0.4);
  const flag = Boolean(conflict) && T >= cAt;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 14, alignItems: "center", padding: "9px 0", borderTop: `1px solid ${C.line}`, opacity: e }}>
      <div style={{ fontFamily: F, fontWeight: 600, fontSize: 13.5, color: C.faint }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "nowrap" }}>
        <span style={{ fontFamily: MO, fontSize: 14.5, color: blank ? C.faint : flag ? C.bad : C.ink, fontStyle: blank ? "italic" : "normal", fontWeight: flag ? 700 : 400,
          background: flag ? C.badW : "transparent", border: `1px solid ${flag ? C.badL : "transparent"}`, borderRadius: 7, padding: "2px 8px" }}>{value}</span>
        {ev && !blank && <span style={{ fontFamily: MO, fontSize: 10.5, letterSpacing: "0.04em", color: C.faint, background: C.fill, borderRadius: 5, padding: "2px 7px" }}>{ev}</span>}
        {conflict && <Pill T={T} at={cAt} text={conflict} tone="danger" />}
      </div>
    </div>
  );
}

function Finding({ T, at, tone, text, note }: { T: number; at: number; tone: Tone; text: string; note?: string }) {
  if (T < at) return null;
  const e = M.in(T, at, 0.4);
  const [bg, fg, bd] = TONE[tone];
  return (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start", padding: "10px 12px", borderRadius: 14, background: bg, border: `1px solid ${bd}`,
      opacity: e, transform: `translateY(${(1 - e) * 6}px)` }}>
      <span style={{ width: 7, height: 7, borderRadius: 4, background: fg, marginTop: 6, flexShrink: 0 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13.5, color: fg }}>{text}</span>
        {note && <span style={{ fontFamily: MO, fontSize: 11, color: fg, opacity: 0.75 }}>{note}</span>}
      </div>
    </div>
  );
}

// Columns and vocabulary from components/matters/MattersTable.tsx.
const CASELIST: [string, string | null, string, string, string, string][] = [
  ["Santos, Mariela", "SANTOS-2024-03", "Family", "I-485", "YK-1998", "14 Aug 2026"],
  ["Nguyen, Thu", "NGUYEN-NAT", "Naturalization", "N-400", "YK-2007", "19 Aug 2026"],
  ["Okonkwo, Adaeze", "OKONKWO-EMP", "Employment", "I-129", "YK-2019", "24 Aug 2026"],
  ["Haddad, Samir", "HADDAD-FAM", "Family", "I-130", "YK-2028", "28 Aug 2026"],
  ["Reyes, Camila", null, "Family", "I-751", "YK-2034", "31 Aug 2026"],
];

function CaseList({ T, o }: { T: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "22px 30px 18px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 25, letterSpacing: "-0.02em", color: C.ink }}>Cases</span>
        <span style={{ fontFamily: MO, fontSize: 12.5, color: C.faint }}>31 open</span>
        <span style={{ marginLeft: "auto", fontFamily: F, fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 14, background: C.chrome, boxShadow: RAISED, color: C.ink }}>New case</span>
      </div>
      <div style={{ padding: "4px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr 0.8fr 0.8fr", gap: 16, padding: "10px 0" }}>
          {["Case", "Type", "Case number", "Opened"].map((h) => (
            <span key={h} style={{ fontFamily: F, fontWeight: 700, fontSize: 11.5, letterSpacing: "0.06em", textTransform: "uppercase", color: C.faint }}>{h}</span>
          ))}
        </div>
        {CASELIST.map(([title, ref, type, visa, num, opened]) => (
          <div key={num} style={{ display: "grid", gridTemplateColumns: "1.5fr 1.1fr 0.8fr 0.8fr", alignItems: "center", gap: 16, padding: "13px 0", borderTop: `1px solid ${C.line}` }}>
            <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontFamily: F, fontSize: 15.5, color: C.ink }}>{title}</span>
              {ref && <span style={{ fontFamily: F, fontSize: 11.5, color: C.faint }}>{ref}</span>}
            </span>
            <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <Pill T={T} at={0} text={type} />
              <span style={{ display: "inline-flex", alignItems: "center", background: C.fill, color: C.soft, border: `1px solid ${C.lineS}`,
                borderRadius: 999, fontFamily: MO, fontSize: 12, padding: "4px 10px" }}>{visa}</span>
            </span>
            <span style={{ fontFamily: MO, fontSize: 13, color: C.soft }}>{num}</span>
            <span style={{ fontFamily: F, fontSize: 13.5, color: C.soft }}>{opened}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const FORMSET: [string, string, string, Tone, string, boolean][] = [
  ["I-130", "Petition for Alien Relative", "Petitioner", "accent", "ed. 04/01/24", true],
  ["I-130A", "Supplemental Information for Spouse Beneficiary", "Beneficiary", "info", "ed. 04/01/24", true],
  ["G-28", "Notice of Entry of Appearance as Attorney", "Attorney", "neutral", "ed. 05/05/23", true],
  ["I-864", "Affidavit of Support", "Petitioner", "accent", "ed. 07/15/24", false],
];

function FormsView({ T, Q, o }: { T: number; Q: Cues; o: number }) {
  if (o <= 0.01) return null;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: o, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "22px 30px 18px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "flex-end", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <span style={{ fontFamily: F, fontWeight: 800, fontSize: 25, letterSpacing: "-0.02em", color: C.ink }}>Forms library</span>
          <div style={{ width: 300, height: 34, borderRadius: 12, background: C.white, border: `1px solid ${C.line}`, boxShadow: PRESSED,
            display: "flex", alignItems: "center", padding: "0 12px", fontFamily: F, fontSize: 13, color: C.ink }}>
            I-130{T < Q.Packet && <span style={{ display: "inline-block", width: 2, height: 14, background: C.ink, marginLeft: 2, opacity: Math.round(T * 3) % 2 }} />}
          </div>
        </div>
        <span style={{ marginLeft: "auto", fontFamily: F, fontSize: 12, color: C.faint }}>Editions verified against uscis.gov on 12 Aug 2026</span>
      </div>
      <div style={{ padding: "16px 30px" }}>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", background: C.chrome, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: MO, fontWeight: 700, fontSize: 14, color: C.ink }}>I-130</span>
            <span style={{ fontFamily: F, fontSize: 13.5, color: C.soft }}>Spouse of a U.S. citizen</span>
            <span style={{ marginLeft: "auto", fontFamily: F, fontWeight: 700, fontSize: 12.5, color: C.soft }}>3 of 4 forms fillable today</span>
          </div>
          {FORMSET.map(([id, title, role, tone, ed, fillable], i) => (
            <div key={id} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr 0.6fr 0.7fr", gap: 14, alignItems: "center",
              padding: "12px 20px", borderTop: `1px solid ${C.line}`, opacity: M.in(T, Q.Forms + 0.5 + i * 0.2, 0.4) }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <span style={{ fontFamily: MO, fontWeight: 700, fontSize: 13, color: C.ink }}>{id}</span>
                <span style={{ fontFamily: F, fontSize: 12.5, color: C.soft }}>{title}</span>
              </div>
              <span><Pill T={T} at={0} text={role} tone={tone} /></span>
              <span style={{ fontFamily: MO, fontSize: 11.5, color: C.faint }}>{ed}</span>
              <span><Pill T={T} at={0} text={fillable ? "Fillable" : "No map yet"} tone={fillable ? "success" : "neutral"} /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type PillSpec = { at: number; until?: number; text: string; tone?: Tone; dot?: boolean };

export function AppWin({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, 0.4, 0.8);
  const forms = M.in(T, Q.Forms, 0.6);
  const detail = M.in(T, Q.Open, 0.7) * (1 - forms);
  const rows: { at: number; k: string; pills: PillSpec[] }[] = [
    { at: Q.Open + 0.9, k: "Case type", pills: [{ at: Q.Open + 1.0, text: "I-130 · ed. 04/01/24", tone: "accent" }, { at: Q.Open + 1.2, text: "9 documents required", tone: "neutral" }] },
    { at: Q.Share + 0.15, k: "Client intake", pills: [
      { at: Q.Share + 0.3, until: Q.Silence + 0.3, text: "Awaiting client", tone: "warn", dot: true },
      { at: Q.Silence + 0.3, until: Q.Client + 1.2, text: "Reminded once", tone: "neutral" },
      { at: Q.Client + 1.2, text: "22 of 22 answered", tone: "success" }] },
    { at: Q.Client + 1.6, k: "Documents", pills: [
      { at: Q.Client + 1.8, until: Q.Read + 1.9, text: "9 received", tone: "neutral" },
      { at: Q.Read + 1.9, text: "14 fields read · 1 not on file", tone: "success" }] },
    { at: Q.Check + 0.1, k: "Case check", pills: [
      { at: Q.Check + 0.2, until: Q.Check + 1.3, text: "running", tone: "neutral" },
      { at: Q.Check + 1.3, text: "1 critical", tone: "danger" }, { at: Q.Check + 1.6, text: "1 warning", tone: "warn" }, { at: Q.Check + 1.9, text: "1 red flag", tone: "danger" }] },
  ];
  return (
    <Win style={{ left: 600, top: 70, width: 1460, height: 720, opacity: app, transform: `translateY(${(1 - app) * 22}px)`, display: "flex" }}>
      <div style={{ width: 240, flexShrink: 0, background: C.chrome, borderRight: `1px solid ${C.line}`, padding: "22px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px 4px" }}>
          <Crane size={30} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em", color: C.ink }}>Yunaki</span>
            <span style={{ fontFamily: F, fontSize: 11.5, color: C.faint }}>Okafor Law</span>
          </div>
        </div>
        <div style={{ fontFamily: MO, fontSize: 10, letterSpacing: "0.1em", color: C.faint, padding: "0 6px 12px", borderBottom: `1px dashed ${C.lineS}`, marginBottom: 8 }}>YK · ATTORNEY</div>
        <NavRow label="Dashboard" icon={NAV_GLYPH.dash} />
        <NavRow label="Cases" icon={NAV_GLYPH.cases} active={forms < 0.5} />
        <NavRow label="Forms library" icon={NAV_GLYPH.forms} active={forms >= 0.5} />
        <NavRow label="Intake forms" icon={NAV_GLYPH.intake} />
        <NavRow label="Approvals" icon={NAV_GLYPH.appr} badge={T >= Q.Draft + 0.4 ? (T >= Q.Approve + 1.3 ? 3 : 4) : 3} />
        <NavRow label="Setup" icon={NAV_GLYPH.setup} />
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 7, paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SlackLogo size={15} /><span style={{ fontFamily: F, fontSize: 11.5, color: C.soft }}>Slack connected</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><GmailLogo size={15} /><span style={{ fontFamily: F, fontSize: 11.5, color: C.soft }}>Gmail connected</span></div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
        <CaseList T={T} o={(1 - detail) * (1 - forms)} />
        <FormsView T={T} Q={Q} o={forms} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", opacity: detail }}>
          <div style={{ padding: "22px 30px 20px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 54, height: 54, borderRadius: 18, background: C.fill, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 800, fontSize: 19, color: C.ink }}>AP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: 1 }}>
              <div style={{ fontFamily: F, fontWeight: 800, fontSize: 27, letterSpacing: "-0.02em", color: C.ink, lineHeight: 1 }}>Anjali Patel</div>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <Pill T={T} at={Q.Open + 0.35} text="Spouse of U.S. citizen" />
                <Pill T={T} at={Q.Open + 0.5} text="Petitioner M. Patel" />
                <Pill T={T} at={Q.Open + 0.65} text="Attorney R. Okafor" />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Pill T={T} at={Q.Approve + 1.5} text="Ready for attorney review" tone="success" size="md" dot />
              <span style={{ fontFamily: MO, fontSize: 12.5, letterSpacing: "0.1em", color: C.faint }}>YK-2041</span>
            </div>
          </div>

          <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.32fr 1fr", minHeight: 0 }}>
            <div style={{ padding: "14px 30px 24px", display: "flex", flexDirection: "column" }}>
              {rows.map((r, i) => T < r.at ? null : (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 14, alignItems: "center", padding: "11px 0", borderTop: i ? `1px solid ${C.line}` : "none", opacity: M.in(T, r.at, 0.45) }}>
                  <div style={{ fontFamily: F, fontWeight: 700, fontSize: 15, color: C.ink }}>{r.k}</div>
                  <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>{r.pills.map((p, j) => <Pill key={j} T={T} {...p} />)}</div>
                </div>
              ))}
              <div style={{ marginTop: 14, opacity: M.in(T, Q.Read + 0.5, 0.5) }}>
                <div style={{ fontFamily: MO, fontSize: 10.5, letterSpacing: "0.14em", color: C.faint, marginBottom: 4 }}>READ FROM THE DOCUMENTS</div>
                <FieldRow T={T} at={Q.Read + 0.6} label="Passport number" value="Z4128866" ev="passport · MRZ" />
                <FieldRow T={T} at={Q.Read + 0.9} label="Date of marriage" value="14 Jun 2021" ev="marriage cert · p.1" />
                <FieldRow T={T} at={Q.Read + 1.2} label="Last entry (I-94)" value="09 Mar 2024" ev="i-94 · admission" />
                <FieldRow T={T} at={Q.Read + 1.5} label="Passport expiry · on form" value="02 / 2028" ev="intake answer" conflict="passport shows 02 / 2027" cAt={Q.Check + 1.3} />
                <FieldRow T={T} at={Q.Read + 1.8} label="Petitioner's certificate no." value="not on file" blank />
              </div>
            </div>

            <div style={{ padding: "14px 26px 24px", borderLeft: `1px solid ${C.line}`, background: "#fbfcfd", display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: MO, fontSize: 10.5, letterSpacing: "0.14em", color: C.faint }}>CASE CHECK</span>
                {T >= Q.Check + 0.2 && T < Q.Check + 1.3 && <Dots T={T} />}
              </div>
              <Finding T={T} at={Q.Check + 1.3} tone="danger" text="Passport expiry disagrees with the form" note="critical · intake answer vs passport MRZ" />
              <Finding T={T} at={Q.Check + 1.6} tone="warn" text="Joint lease not on file" note="warning · evidence of shared residence" />
              <Finding T={T} at={Q.Check + 2.2} tone="danger" text="Prior denial disclosed" note="red flag · routed to attorney review" />
              <Finding T={T} at={Q.Check + 2.6} tone="info" text="Marriage date confirmed by certificate" note="info · 2 sources agree" />
              <div style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${C.line}`, display: "flex", flexDirection: "column", gap: 7, opacity: M.in(T, Q.Draft + 0.2, 0.5) }}>
                <div style={{ fontFamily: MO, fontSize: 10.5, letterSpacing: "0.14em", color: C.faint }}>DEADLINE</div>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Pill T={T} at={Q.Draft + 0.3} text="14 days left" tone="warn" />
                  <span style={{ fontFamily: F, fontSize: 13, color: C.soft }}>Evidence window closes 26 Sep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Win>
  );
}

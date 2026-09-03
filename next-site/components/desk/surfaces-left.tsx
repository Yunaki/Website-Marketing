// "The Desk" — Slack, the client portal phone, and Gmail.
// Ported from the design handoff. Copy is verbatim; timings keyed to CUES.
import { C, F, MO, M, clamp, Pill, Dots, Win, Crane, SlackLogo, GmailLogo, type Cues, type Tone } from "./tokens";

function ToolTrace({ T, at, names }: { T: number; at: number; names: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 4, paddingLeft: 2 }}>
      {names.map((n, i) => {
        const s = at + i * 0.34, done = T >= s + 0.5;
        if (T < s) return null;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: 8, opacity: M.in(T, s, 0.3) }}>
            <span style={{ width: 13, display: "flex", justifyContent: "center" }}><span style={{ width: 6, height: 6, borderRadius: 3, background: done ? C.ok : C.lineS }} /></span>
            <span style={{ fontFamily: MO, fontSize: 12.5, color: done ? C.soft : C.faint, background: C.fill, borderRadius: 6, padding: "2px 7px" }}>{n}</span>
            {!done && <Dots T={T} />}
          </div>
        );
      })}
    </div>
  );
}

function ApprovalCard({ T, Q }: { T: number; Q: Cues }) {
  const at = Q.Draft + 0.35;
  if (T < at) return null;
  const e = M.in(T, at, 0.6);
  const pressed = T >= Q.Approve + 1.25;
  return (
    <div style={{ border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.accent}`, borderRadius: 14, background: "#fcfdfe",
      padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9, opacity: e, transform: `translateY(${(1 - e) * 8}px)` }}>
      <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14.5, color: C.ink }}>Intake incomplete, documents still needed</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {([["TO", "Anjali Patel  anjali.patel@gmail.com"], ["SUBJECT", "Two fixes before we file your I-130"]] as const).map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 9, alignItems: "baseline" }}>
            <span style={{ fontFamily: MO, fontSize: 9.5, letterSpacing: "0.12em", color: C.faint, width: 52 }}>{k}</span>
            <span style={{ fontFamily: MO, fontSize: 11.5, color: C.soft }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: F, fontSize: 13.5, lineHeight: 1.5, color: C.soft }}>
        Hi Anjali, thank you for the documents. Two things before Rita reviews the file.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontFamily: MO, fontSize: 9.5, letterSpacing: "0.12em", color: C.faint }}>MISSING ITEMS</div>
        {["Passport expiry reads 02/2028 on the form and 02/2027 in the passport", "Joint lease or a utility bill in both names"].map((s, i) => (
          <div key={i} style={{ fontFamily: F, fontSize: 12.5, color: C.soft, display: "flex", gap: 7, opacity: M.in(T, at + 0.5 + i * 0.25, 0.35) }}>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: C.lineS, marginTop: 6, flexShrink: 0 }} />{s}
          </div>
        ))}
      </div>
      {pressed ? (
        <div style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.ok, opacity: M.in(T, Q.Approve + 1.25, 0.3) }}>Approved and sent</div>
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, padding: "8px 15px", borderRadius: 10, background: "#007a5a", color: "#fff" }}>Approve</span>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, padding: "8px 15px", borderRadius: 10, border: `1px solid ${C.lineS}`, color: C.ink }}>Edit</span>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13, padding: "8px 15px", borderRadius: 10, border: `1px solid ${C.badL}`, color: C.bad }}>Reject</span>
        </div>
      )}
    </div>
  );
}

function StatusReply({ T, Q }: { T: number; Q: Cues }) {
  const at = Q.Land + 0.6;
  if (T < at) return null;
  const e = M.in(T, at, 0.6);
  const rows: [string, string][] = [["Open cases", "31"], ["Drafts awaiting approval", "4"], ["Deadlines inside 14 days", "6"]];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, opacity: e, transform: `translateY(${(1 - e) * 8}px)` }}>
      <div style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.ink }}>The firm&apos;s day</div>
      {rows.map(([k, v], i) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, borderBottom: `1px solid ${C.line}`, paddingBottom: 5, opacity: M.in(T, at + 0.25 + i * 0.22, 0.35) }}>
          <span style={{ fontFamily: F, fontSize: 13.5, color: C.soft }}>{k}</span>
          <span style={{ fontFamily: MO, fontWeight: 700, fontSize: 16, color: C.ink }}>{v}</span>
        </div>
      ))}
      <div style={{ fontFamily: F, fontSize: 12, fontStyle: "italic", color: C.faint, lineHeight: 1.5 }}>
        Counts only. Nothing has been filed or sent. An attorney reviews everything before it leaves the firm.
      </div>
    </div>
  );
}

type Msg = {
  at: number; who?: string; ini?: string; bot?: boolean; time: string; body: string;
  caret?: boolean; slash?: boolean; reply?: boolean; card?: boolean;
  tools?: { at: number; names: string[] };
  pills?: { at: number; text: string; tone: Tone }[];
};

export function Slack({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, 0.15, 0.8);
  const typed = "@yunaki create a case for Anjali Patel, I-130, spouse of a U.S. citizen";
  const tp = M.step(T, Q.Ask + 0.15, 2.0);
  const msgs: Msg[] = [
    { at: 0.5, who: "Dana Muir", ini: "DM", time: "11:02 AM", body: "Santos I-485 is signed and out the door" },
    { at: 0.7, bot: true, time: "11:04 AM", body: "Recorded on YK-1998. Two deadlines left inside 14 days." },
    { at: Q.Ask + 0.15, who: "Rita Okafor", ini: "RO", time: "2:14 PM", body: typed.slice(0, Math.ceil(tp * typed.length)), caret: tp < 1 },
    { at: Q.Open + 0.1, bot: true, time: "2:14 PM", body: "Case YK-2041 opened. Intake drafted from the I-130 playbook.",
      tools: { at: Q.Open + 0.35, names: ["find_matter", "form_readiness", "create_intake"] },
      pills: [{ at: Q.Share + 0.35, text: "Portal link shared", tone: "success" }] },
    { at: Q.Silence + 0.2, bot: true, time: "Thu 9:00 AM", body: "Intake untouched 3 days. Follow-up sent from intake@okafor.law." },
    { at: Q.Read + 0.15, bot: true, time: "Fri 4:32 PM", body: "All 9 documents in. Reading them now.",
      tools: { at: Q.Read + 0.4, names: ["list_matter_docs", "read_extraction", "run_case_check"] } },
    { at: Q.Draft + 0.1, bot: true, time: "Fri 4:41 PM", body: "The case check found 1 conflict, 1 missing document and 1 red flag. A draft is ready for you.", card: true },
    { at: Q.Land + 0.15, who: "Rita Okafor", ini: "RO", time: "Mon 8:05 AM", body: "/yunaki status", slash: true, reply: true },
  ];
  return (
    <Win style={{ left: 40, top: 70, width: 500, height: 620, opacity: app, transform: `translateY(${(1 - app) * 18}px)` }}>
      <div style={{ position: "relative", zIndex: 2, padding: "16px 22px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12, background: "#fbfcfd" }}>
        <SlackLogo size={21} />
        <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: C.ink }}>#immigration-cases</span>
        <span style={{ marginLeft: "auto", fontFamily: MO, fontSize: 10.5, letterSpacing: "0.1em", color: C.faint }}>OKAFOR LAW</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 57, bottom: 0, padding: "16px 22px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 17, overflow: "hidden" }}>
        {msgs.map((m, i) => {
          if (T < m.at) return null;
          const e = M.in(T, m.at, 0.5);
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 12, opacity: e, transform: `translateY(${(1 - e) * 7}px)` }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: m.bot ? C.white : C.navy, border: m.bot ? `1px solid ${C.line}` : "none",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: F, fontWeight: 800, fontSize: 12.5 }}>
                {m.bot ? <Crane size={24} /> : m.ini}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
                  <span style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.ink }}>{m.bot ? "yunaki" : m.who}</span>
                  {m.bot && <span style={{ fontFamily: F, fontWeight: 700, fontSize: 9.5, letterSpacing: "0.08em", padding: "2px 5px", borderRadius: 5, background: C.fill, color: C.faint }}>APP</span>}
                  <span style={{ fontFamily: MO, fontSize: 10.5, color: C.faint }}>{m.time}</span>
                </div>
                <div style={{ fontFamily: m.slash ? MO : F, fontSize: m.slash ? 14 : 14.5, lineHeight: 1.45, color: C.ink }}>
                  {m.slash
                    ? <span style={{ background: C.accentW, color: C.accent, borderRadius: 5, padding: "2px 6px", fontWeight: 700 }}>{m.body}</span>
                    : m.body.split(/(@yunaki)/g).map((p, j) => p === "@yunaki"
                      ? <span key={j} style={{ color: C.accent, fontWeight: 700, background: C.accentW, borderRadius: 4, padding: "0 3px" }}>{p}</span>
                      : <span key={j}>{p}</span>)}
                  {m.caret && <span style={{ display: "inline-block", width: 2, height: 15, background: C.ink, marginLeft: 2, verticalAlign: -2, opacity: Math.round(T * 3) % 2 }} />}
                </div>
                {m.tools && <ToolTrace T={T} at={m.tools.at} names={m.tools.names} />}
                {m.pills && <div style={{ display: "flex", gap: 7 }}>{m.pills.map((p, j) => <Pill key={j} T={T} {...p} />)}</div>}
                {m.card && <ApprovalCard T={T} Q={Q} />}
                {m.reply && <StatusReply T={T} Q={Q} />}
              </div>
            </div>
          );
        })}
      </div>
    </Win>
  );
}

export function Phone({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, Q.Share - 0.1, 0.7);
  if (app <= 0) return null;
  const answering = M.step(T, Q.Client + 0.15, 1.3);
  const answered = T < Q.Client ? 0 : Math.round(7 + 15 * answering);
  const step = T >= Q.Client + 0.9 ? 5 : T >= Q.Client + 0.2 ? 3 : 1;
  const titles = ["You", "Marriage", "Documents", "History", "Review"];
  const upl: [string, number][] = [["Passport", 0], ["Marriage certificate", 0.35], ["I-94", 0.7], ["Photos (2)", 1.05], ["Tax transcript", 1.4]];
  return (
    <div style={{ position: "absolute", left: 90, top: 730, width: 330, height: 430, opacity: app, transform: `translateY(${(1 - app) * 40}px)` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "34px 34px 0 0", background: "#0b1220", padding: 10, boxShadow: "0 30px 60px -26px rgba(13,39,80,0.45)" }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: "26px 26px 0 0", background: "#fdfcfa", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 18px 10px", display: "flex", alignItems: "center", gap: 9, borderBottom: "1px solid #ece7de" }}>
            <Crane size={22} />
            <span style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: "#18181b" }}>Okafor Law</span>
            <span style={{ marginLeft: "auto", fontFamily: MO, fontSize: 9.5, letterSpacing: "0.1em", color: "#a1a1aa" }}>SECURE LINK</span>
          </div>
          <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {titles.map((t, i) => (
                <div key={t} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? "#4f46e5" : "#e4e4e7" }} />
              ))}
            </div>
            <div style={{ fontFamily: F, fontSize: 12, color: "#52525b" }}>Step {step} of 5 · {titles[step - 1]}</div>
            <div style={{ height: 6, borderRadius: 3, background: "#e4e4e7", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(answered / 22) * 100}%`, background: "#4f46e5", borderRadius: 3 }} />
            </div>
            <div style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: "#18181b" }}>{answered} of 22 answered</div>
          </div>
          <div style={{ padding: "4px 18px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
            {step >= 3 ? upl.map(([name, d]) => {
              const at = Q.Client + 0.5 + d;
              const done = T >= at + 0.4;
              return (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 9, opacity: M.in(T, at, 0.3) }}>
                  <span style={{ width: 16, height: 16, borderRadius: 5, background: done ? "#ecfdf5" : "#f4f4f5", border: `1px solid ${done ? "#a7f3d0" : "#e4e4e7"}`,
                    display: "flex", alignItems: "center", justifyContent: "center" }}>{done ? <span style={{ width: 6, height: 6, borderRadius: 3, background: "#047857" }} /> : null}</span>
                  <span style={{ fontFamily: F, fontSize: 12.5, color: "#18181b" }}>{name}</span>
                  {!done && <span style={{ marginLeft: "auto" }}><Dots T={T} color="#a1a1aa" /></span>}
                </div>
              );
            }) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Full legal name", "Date of birth", "Country of birth"].map((q) => (
                  <div key={q} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <span style={{ fontFamily: F, fontWeight: 600, fontSize: 11.5, color: "#52525b" }}>{q}</span>
                    <div style={{ height: 30, borderRadius: 10, background: "#fff", border: "1px solid #e4e4e7" }} />
                  </div>
                ))}
              </div>
            )}
            {T >= Q.Client + 1.5 && <div style={{ fontFamily: F, fontSize: 11.5, color: "#047857", fontWeight: 700, opacity: M.in(T, Q.Client + 1.5, 0.3) }}>Saved</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GmailWin({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, Q.Silence - 0.1, 0.7);
  if (app <= 0) return null;
  const second = T >= Q.Draft;
  return (
    <Win style={{ left: 700, top: 840, width: 720, height: 300, opacity: app, transform: `translateY(${(1 - app) * 40}px)` }}>
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12, background: "#fbfcfd" }}>
        <GmailLogo size={22} />
        <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14.5, color: C.ink }}>intake@okafor.law</span>
        <span style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
          <Pill T={T} at={Q.Silence + 0.5} until={Q.Draft} text="sent by gmail agent" tone="success" />
          <Pill T={T} at={Q.Draft + 0.2} until={Q.Approve + 1.35} text="held for approval" tone="warn" />
          <Pill T={T} at={Q.Approve + 1.35} text="sent" tone="success" />
        </span>
      </div>
      <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 13 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span style={{ fontFamily: F, fontWeight: 800, fontSize: 16.5, color: C.ink }}>{second ? "Two fixes before we file your I-130" : "Your intake is still open, Anjali"}</span>
          <span style={{ marginLeft: "auto", fontFamily: MO, fontSize: 11, color: C.faint }}>to anjali.patel@gmail.com</span>
        </div>
        {second ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: F, fontSize: 14.5, color: C.ink }}>
              <span style={{ fontFamily: MO, fontWeight: 700, color: C.bad }}>1</span> <span>Passport expiry reads</span>
              <span style={{ fontFamily: MO, background: C.badW, color: C.bad, border: `1px solid ${C.badL}`, borderRadius: 7, padding: "2px 8px" }}>02/2028</span>
              <span style={{ color: C.faint }}>on the form and</span>
              <span style={{ fontFamily: MO, fontWeight: 700 }}>02/2027</span>
              <span style={{ color: C.faint }}>in the passport. Which is right?</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: F, fontSize: 14.5, color: C.ink }}>
              <span style={{ fontFamily: MO, fontWeight: 700, color: C.warn }}>2</span> A joint lease, or a utility bill in both names.
            </div>
            <div style={{ fontFamily: F, fontSize: 13.5, color: C.faint, marginTop: 2 }}>Drafted by Yunaki, reviewed and approved by R. Okafor</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ fontFamily: F, fontSize: 14.5, color: C.soft, lineHeight: 1.5 }}>Your answers are saved as you go, so you can finish on your phone whenever suits you.</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: F, fontWeight: 700, fontSize: 13.5, padding: "9px 16px", borderRadius: 12, background: C.accent, color: "#fff" }}>Continue my intake</span>
              <span style={{ fontFamily: MO, fontSize: 11.5, color: C.faint }}>3 days since last activity</span>
            </div>
          </div>
        )}
      </div>
    </Win>
  );
}

export function Cursor({ T, Q }: { T: number; Q: Cues }) {
  const moves = [
    { a: Q.Approve + 0.15, b: Q.Approve + 1.25, from: [1180, 430], to: [196, 556] },
    { a: Q.Forms - 0.6, b: Q.Forms + 0.35, from: [260, 560], to: [700, 302] },
  ];
  const mv = moves.find((m) => T >= m.a - 0.35 && T <= m.b + 1.1);
  if (!mv) return null;
  const { a, b } = mv;
  const p = (() => { const t = clamp((T - a) / (b - a), 0, 1); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; })();
  const x = mv.from[0] + (mv.to[0] - mv.from[0]) * p, y = mv.from[1] + (mv.to[1] - mv.from[1]) * p;
  const click = clamp((T - b) / 0.32, 0, 1);
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity: clamp((T - a + 0.35) / 0.3, 0, 1) * (1 - clamp((T - b - 0.7) / 0.4, 0, 1)) }}>
      {click > 0 && click < 1 && <div style={{ position: "absolute", left: -17, top: -17, width: 34, height: 34, borderRadius: 17, border: `2px solid ${C.accent}`, opacity: 1 - click, transform: `scale(${0.4 + click * 1.3})` }} />}
      <svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 2l14 11-6 1 3.5 7-2.6 1.2-3.5-7L5 19z" fill={C.ink} stroke="#fff" strokeWidth="1.4" /></svg>
    </div>
  );
}

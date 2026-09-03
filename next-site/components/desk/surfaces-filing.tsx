// "The Desk" — the I-130 PDF viewer and the my.uscis.gov review browser.
// Government form wording is reproduced verbatim from the published Form I-130
// (uscis.gov, Edition 04/01/24, OMB No. 1615-0012) — it is a quoted artifact.
import { C, F, MO, M, Pill, Win, type Cues } from "./tokens";

const INK = "#111111";
const RULE = "#111111";

type BoxProps = { T: number; n?: string; label: string; value: string | null; at: number; wide?: number; mono?: boolean; flag?: boolean };
function Box({ T, n, label, value, at, wide, mono = true, flag }: BoxProps) {
  const filled = value != null && T >= at;
  const e = filled ? M.in(T, at, 0.28) : 0;
  return (
    <div style={{ flex: wide || 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
      <div style={{ display: "flex", gap: 5, alignItems: "baseline" }}>
        {n && <span style={{ fontFamily: F, fontWeight: 700, fontSize: 7.5, color: INK }}>{n}</span>}
        <span style={{ fontFamily: F, fontSize: 7.5, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
      </div>
      <div style={{ height: 17, border: `0.8px solid ${RULE}`, background: flag && filled ? "#fdf2f0" : "#fff", display: "flex", alignItems: "center", padding: "0 5px", overflow: "hidden" }}>
        <span style={{ fontFamily: mono ? MO : F, fontSize: 10, color: INK, opacity: e, transform: `translateY(${(1 - e) * 4}px)` }}>{filled ? value : ""}</span>
      </div>
    </div>
  );
}

function Tick({ on, label, at, T }: { on?: boolean; label: string; at: number; T: number }) {
  const marked = on && T >= at;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 10, height: 10, border: `0.8px solid ${RULE}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {marked && <span style={{ width: 6, height: 6, background: INK, transform: `scale(${M.pop(T, at, 0.3)})` }} />}
      </span>
      <span style={{ fontFamily: F, fontSize: 8, color: INK }}>{label}</span>
    </div>
  );
}

function PartBar({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#d9d9d9", border: `0.8px solid ${RULE}`, padding: "3px 6px", fontFamily: F, fontWeight: 800, fontSize: 9, color: INK, marginTop: 8 }}>{children}</div>
  );
}

export function FormSheet({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, Q.Packet + 0.1, 0.7);
  if (app <= 0) return null;
  const P = Q.Packet;
  const turn = M.step(T, Q.Page5, 0.7);
  const signed = T >= Q.EFile + 1.9;
  return (
    <div style={{ position: "absolute", left: 1090, top: 90, width: 700, height: 900, opacity: app,
      transform: `translateY(${(1 - app) * 30}px)`, background: "#3a3f47", borderRadius: 16,
      border: "1px solid rgba(0,0,0,0.25)", boxShadow: "0 44px 100px -36px rgba(13,39,80,0.55)", overflow: "hidden" }}>
      <div style={{ height: 40, background: "#2b3038", borderBottom: "1px solid rgba(0,0,0,0.4)", display: "flex", alignItems: "center", gap: 14, padding: "0 14px" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 15, height: 18, borderRadius: 2, background: "#c8322a", display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: F, fontWeight: 800, fontSize: 7, color: "#fff" }}>PDF</span>
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12.5, color: "rgba(255,255,255,0.92)" }}>i-130-YK-2041.pdf</span>
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12, fontFamily: MO, fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>
          <span>{turn > 0.5 ? "5" : "1"} of 12</span>
          <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
          <span>100%</span>
          <span style={{ width: 1, height: 14, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: F, fontWeight: 600, fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>Download</span>
        </span>
      </div>
      <div style={{ position: "absolute", left: 40, top: 58, width: 620, height: 802, background: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.45)", overflow: "hidden" }}>

        {/* page 1 */}
        <div style={{ position: "absolute", inset: 0, padding: "20px 26px", opacity: 1 - turn, transform: `translateY(${turn * -26}px)` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
            <div>
              <div style={{ fontFamily: F, fontWeight: 800, fontSize: 15, color: INK }}>Petition for Alien Relative</div>
              <div style={{ fontFamily: F, fontSize: 8.5, color: INK, marginTop: 2 }}>Department of Homeland Security</div>
              <div style={{ fontFamily: F, fontSize: 8.5, color: INK }}>U.S. Citizenship and Immigration Services</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: F, fontWeight: 800, fontSize: 9.5, color: INK }}>USCIS</div>
              <div style={{ fontFamily: F, fontWeight: 800, fontSize: 9.5, color: INK }}>Form I-130</div>
              <div style={{ fontFamily: F, fontSize: 8, color: INK, marginTop: 2 }}>OMB No. 1615-0012</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <div style={{ flex: 1, border: `0.8px solid ${RULE}` }}>
              <div style={{ background: "#d9d9d9", borderBottom: `0.8px solid ${RULE}`, padding: "2px 5px", fontFamily: F, fontWeight: 800, fontSize: 8, color: INK }}>For USCIS Use Only</div>
              <div style={{ display: "flex" }}>
                {["Returned", "Receipt", "Reloc Sent", "Action Block"].map((k, n) => (
                  <div key={k} style={{ flex: 1, borderLeft: n ? `0.8px solid ${RULE}` : "none", padding: "3px 4px", height: 44 }}>
                    <span style={{ fontFamily: F, fontSize: 7, color: INK }}>{k}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width: 210, border: `0.8px solid ${RULE}`, padding: "4px 6px", display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 7.5, color: INK, lineHeight: 1.3 }}>To be completed by an attorney or accredited representative (if any).</span>
              <Tick on label="Select this box if Form G-28 is attached." at={P + 0.5} T={T} />
            </div>
          </div>

          <div style={{ marginTop: 9, borderTop: `1.6px solid ${RULE}`, borderBottom: `0.8px solid ${RULE}`, padding: "4px 0", fontFamily: F, fontWeight: 800, fontSize: 8.5, color: INK }}>
            START HERE  Type or print in black ink.
          </div>

          <PartBar>Part 1.  Relationship (You are the Petitioner. Your relative is the Beneficiary)</PartBar>
          <div style={{ border: `0.8px solid ${RULE}`, borderTop: "none", padding: "7px 8px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: F, fontSize: 8, color: INK }}>1.  I am filing this petition for my (Select only one box):</span>
            <div style={{ display: "flex", gap: 20, paddingLeft: 12 }}>
              <Tick on label="Spouse" at={P + 0.8} T={T} />
              <Tick label="Parent" at={0} T={T} />
              <Tick label="Brother/Sister" at={0} T={T} />
              <Tick label="Child" at={0} T={T} />
            </div>
          </div>

          <PartBar>Part 2.  Information About You (Petitioner)</PartBar>
          <div style={{ border: `0.8px solid ${RULE}`, borderTop: "none", padding: "8px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="1." label="Alien Registration Number (A-Number) (if any)" value="" at={P + 1.0} />
              <Box T={T} n="2." label="USCIS Online Account Number (if any)" value="" at={P + 1.0} />
              <Box T={T} n="3." label="U.S. Social Security Number (if any)" value="381 44 9027" at={P + 1.1} />
            </div>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 8, color: INK }}>Your Full Name</span>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="4.a." label="Family Name (Last Name)" value="PATEL" at={P + 1.3} />
              <Box T={T} n="4.b." label="Given Name (First Name)" value="MEHUL" at={P + 1.5} />
              <Box T={T} n="4.c." label="Middle Name" value="" at={P + 1.6} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="6.a." label="City or Town" value="CHICAGO" at={P + 1.8} />
              <Box T={T} n="6.b." label="State" value="IL" at={P + 1.9} wide={0.4} />
              <Box T={T} n="6.c." label="Country of Birth" value="UNITED STATES" at={P + 2.0} />
            </div>
          </div>

          <div style={{ position: "absolute", left: 26, right: 26, bottom: 14, display: "flex", justifyContent: "space-between", fontFamily: F, fontSize: 7.5, color: INK }}>
            <span>Form I-130  Edition 04/01/24</span><span>Page 1 of 12</span>
          </div>
        </div>

        {/* page 5, where the corrected value lands */}
        <div style={{ position: "absolute", inset: 0, padding: "20px 26px", opacity: turn, transform: `translateY(${(1 - turn) * 26}px)` }}>
          <PartBar>Part 4.  Information About Beneficiary</PartBar>
          <div style={{ border: `0.8px solid ${RULE}`, borderTop: "none", padding: "8px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="1." label="Alien Registration Number (A-Number) (if any)" value="" at={Q.Page5 + 0.2} />
              <Box T={T} n="3." label="U.S. Social Security Number (if any)" value="" at={Q.Page5 + 0.2} />
            </div>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 8, color: INK }}>Beneficiary&rsquo;s Full Name</span>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="4.a." label="Family Name (Last Name)" value="PATEL" at={Q.Page5 + 0.4} />
              <Box T={T} n="4.b." label="Given Name (First Name)" value="ANJALI" at={Q.Page5 + 0.55} />
              <Box T={T} n="4.c." label="Middle Name" value="" at={Q.Page5 + 0.6} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="9." label="Date of Birth (mm/dd/yyyy)" value="11/04/1993" at={Q.Page5 + 0.7} />
              <Box T={T} n="10." label="City or Town of Birth" value="AHMEDABAD" at={Q.Page5 + 0.8} />
              <Box T={T} n="12." label="Country of Birth" value="INDIA" at={Q.Page5 + 0.9} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="44." label="Passport Number" value="Z4128866" at={Q.Page5 + 1.05} />
              <Box T={T} n="45." label="Travel Document Expiration Date (mm/dd/yyyy)" value="02/28/2027" at={Q.Page5 + 1.2} flag />
              <Box T={T} n="46.a." label="Date of Last Arrival (mm/dd/yyyy)" value="03/09/2024" at={Q.Page5 + 1.3} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Box T={T} n="55." label="Date of Marriage (mm/dd/yyyy)" value="06/14/2021" at={Q.Page5 + 1.45} />
              <Box T={T} n="56." label="Place of Marriage, City or Town" value="CHICAGO" at={Q.Page5 + 1.55} />
              <Box T={T} n="57." label="Place of Marriage, State" value="IL" at={Q.Page5 + 1.6} wide={0.4} />
            </div>
          </div>

          <div style={{ marginTop: 9, border: `0.8px solid ${RULE}`, padding: "7px 8px", display: "flex", alignItems: "center", gap: 10, background: "#f7f9fb" }}>
            <span style={{ fontFamily: F, fontSize: 8, color: INK, lineHeight: 1.4 }}>
              Item 45 was corrected from 02/28/2028 after the passport was read. Source recorded on the case file.
            </span>
          </div>

          <PartBar>Part 6.  Petitioner&rsquo;s Statement, Contact Information, Declaration, and Signature</PartBar>
          <div style={{ border: `0.8px solid ${RULE}`, borderTop: "none", padding: "8px", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <div style={{ flex: 1.4, display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontFamily: F, fontSize: 7.5, color: INK }}>7.a.  Petitioner&rsquo;s Signature</span>
                <div style={{ height: 26, border: `0.8px solid ${RULE}`, display: "flex", alignItems: "center", padding: "0 6px" }}>
                  <span style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontStyle: "italic", fontSize: 15, color: "#1b2a4a",
                    opacity: signed ? M.in(T, Q.EFile + 1.9, 0.5) : 0 }}>Mehul Patel</span>
                </div>
              </div>
              <Box T={T} n="7.b." label="Date of Signature (mm/dd/yyyy)" value="09/02/2026" at={signed ? Q.EFile + 2.1 : 1e9} />
            </div>
          </div>

          <div style={{ position: "absolute", left: 26, right: 26, bottom: 14, display: "flex", justifyContent: "space-between", fontFamily: F, fontSize: 7.5, color: INK }}>
            <span>Form I-130  Edition 04/01/24</span><span>Page 5 of 12</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EFile({ T, Q }: { T: number; Q: Cues }) {
  const app = M.in(T, Q.EFile - 0.1, 0.7);
  if (app <= 0) return null;
  const submitted = T >= Q.EFile + 2.4;
  const items: [string, string][] = [
    ["Form I-130", "Petition for Alien Relative"],
    ["Form I-130A", "Supplemental Information for Spouse Beneficiary"],
    ["Form G-28", "Notice of Entry of Appearance as Attorney"],
    ["Evidence", "9 documents, 14 fields verified"],
  ];
  return (
    <Win style={{ left: 120, top: 620, width: 840, height: 500, opacity: app, transform: `translateY(${(1 - app) * 34}px)`, borderRadius: 18 }}>
      <div style={{ padding: "11px 16px", background: C.chrome, borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ display: "flex", gap: 6 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: 5, background: C.lineS }} />)}</span>
        <span style={{ flex: 1, height: 24, borderRadius: 999, background: C.white, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", padding: "0 12px",
          fontFamily: MO, fontSize: 11.5, color: C.soft }}>my.uscis.gov/addperson/review</span>
      </div>
      <div style={{ padding: "20px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontFamily: F, fontWeight: 800, fontSize: 21, color: C.ink }}>Review and submit</span>
          <span style={{ fontFamily: F, fontSize: 13, color: C.faint }}>Filed by R. Okafor, attorney of record</span>
        </div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          {items.map(([id, title], i) => (
            <div key={id} style={{ display: "grid", gridTemplateColumns: "150px 1fr 90px", gap: 14, alignItems: "center", padding: "11px 16px",
              borderTop: i ? `1px solid ${C.line}` : "none", opacity: M.in(T, Q.EFile + 0.4 + i * 0.22, 0.4) }}>
              <span style={{ fontFamily: MO, fontWeight: 700, fontSize: 12.5, color: C.ink }}>{id}</span>
              <span style={{ fontFamily: F, fontSize: 13, color: C.soft }}>{title}</span>
              <span><Pill T={T} at={Q.EFile + 0.6 + i * 0.22} text="Attached" tone="success" /></span>
            </div>
          ))}
        </div>
        {submitted ? (
          <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: M.in(T, Q.EFile + 2.4, 0.5) }}>
            <Pill T={T} at={Q.EFile + 2.4} text="Submitted to USCIS" tone="success" size="md" dot />
            <span style={{ fontFamily: MO, fontSize: 14, color: C.ink }}>Receipt IOE0912345678</span>
            <span style={{ fontFamily: F, fontSize: 13, color: C.faint }}>recorded on YK-2041</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontFamily: F, fontWeight: 700, fontSize: 14, padding: "11px 22px", borderRadius: 14, background: C.accent, color: "#fff", boxShadow: "0 4px 10px rgba(13,39,80,0.22)" }}>Submit petition</span>
            <span style={{ fontFamily: F, fontSize: 13, color: C.faint }}>Yunaki prepared this filing. Only the attorney can submit it.</span>
          </div>
        )}
      </div>
    </Win>
  );
}

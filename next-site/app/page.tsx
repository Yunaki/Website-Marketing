import { Topbar, Footer } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { OsMap } from "@/components/OsMap";
import { Reveal } from "@/components/Reveal";
import { StatNum } from "@/components/StatNum";

const TICKER = [
  "SSDI initial denials: 64% (FY 2025)",
  "I-130 denials: 28.4% → 41.6% in one year",
  "48% of Chapter 13 filings dismissed",
  "workers comp: 40% initial claim error rate",
  "one immigration RFE = $3,000 to $8,000 attorney time",
  "$262B in healthcare claims denied annually",
  "65% of SSDI denials are preventable",
  "LLMs wrong on immigration facts ~35% of the time",
  "missed RFE deadline = automatic denial, no refund",
];

const TODAY = [
  { title: "Client intake", text: "Clients answer and upload through one secure link. No email ping-pong." },
  { title: "Document reading", text: "Passports, green cards, I-94s — read field by field. Unreadable stays blank, never made up." },
  { title: "The case check", text: "One click: is this case complete? Conflicts flagged, follow-ups already written." },
  { title: "USCIS requirements", text: "30 visa types: forms, editions, documents, where to file. Verified and dated." },
  { title: "Slack assistant", text: "“What's the status on the Patel case?” Ask @yunaki, get it from the file." },
  { title: "You approve every email", text: "Yunaki writes. You send. Always. Everything on the record." },
];

const PRACTICES = [
  { title: "Immigration", chip: "Pilots open", live: true, text: <><strong>Live today:</strong> intake, document reading, and case checks across 30 visa types. I-130 denials jumped 28.4% → 41.6% in FY 2025 — checking beats redoing.</> },
  { title: "SSDI / SSI Disability", chip: "In development", text: <><strong>64% of ~2M annual claims are denied initially.</strong> 65% of those are preventable.</> },
  { title: "Bankruptcy", chip: "Roadmap", text: <><strong>48% of Chapter 13 cases get dismissed</strong> — often on pure arithmetic.</> },
  { title: "Workers Compensation", chip: "Roadmap", text: <><strong>40% of initial claims contain errors.</strong> No dedicated tool exists.</> },
  { title: "Personal Injury / MVA", chip: "Roadmap", text: <><strong>Every fact in the demand package</strong> — dates, bills, chronologies — verified.</> },
  { title: "Healthcare Claims", chip: "Roadmap", text: <><strong>$262B in claims denied annually.</strong> 85% preventable.</> },
];

const CASE_FILES = [
  { id: "cf-01", tag: "CF-01 · IMMIGRATION", title: "The $8,000 letter", text: "One RFE burns 10 to 15 attorney hours and adds months of delay. Miss the deadline and the case is denied." },
  { id: "cf-03", tag: "CF-03 · DISABILITY", title: "The 64% wall", text: "Two million SSDI claims a year. 64% denied at first pass. 65% of those denials were preventable." },
  { id: "cf-04", tag: "CF-04 · BANKRUPTCY", title: "Dismissed on arithmetic", text: "48% of Chapter 13 cases are thrown out. Means-test math and mismatched schedules do most of the damage." },
];

export default function Home() {
  return (
    <div className="frame">
      <Topbar />
      <Hero />

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="split" id="problem">
        <Reveal>
          <div className="seclabel">§01 · the problem</div>
          <h2>Legal paperwork fails at industrial scale.</h2>
          <div className="prose">
            <ul className="list">
              <li>The same client data is retyped into 5 to 15 forms. No tool checks that it matches.</li>
              <li>When an attorney leaves, the knowledge of what worked leaves too.</li>
              <li>Most errors are deterministic: wrong edition, bad math, mismatched dates.</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="statrow">
            <StatNum value={64} unit="%" label="SSDI claims denied at initial level (FY 2025)" />
            <StatNum value={48} unit="%" label="Chapter 13 filings dismissed outright" />
            <div className="stat">
              <div className="num">$3-8<span className="unit">K</span></div>
              <div className="lbl">attorney cost of one immigration RFE</div>
            </div>
          </div>
          <p className="stat-note">
            sources: SSA.gov FY2025 · US courts 2025 · AILA / USCIS.{" "}
            <strong>most of it is preventable.</strong>
          </p>
        </Reveal>
      </section>

      <section className="sec-pad" id="how">
        <Reveal>
          <div className="seclabel">§02 · the system</div>
          <h2>One OS. Everything connected.</h2>
          <div className="prose">
            <p>Tap any part — or just watch a case move.</p>
          </div>
        </Reveal>
        <OsMap />
        <div className="after-fig-cta">
          <a className="btn btn-solid" href="/case-files.html">See the case files →</a>
          <a className="btn" href="/how-it-works.html">Read the full architecture</a>
        </div>
      </section>

      <section className="sec-pad" id="today">
        <Reveal>
          <div className="seclabel">§03 · in the product today</div>
          <h2>What pilot firms are working with now.</h2>
          <div className="prose">
            <p>Not a roadmap. These run on live immigration cases during the pilot.</p>
          </div>
        </Reveal>
        <div className="practices">
          {TODAY.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.1} className="practice">
              <div className="practice-head">
                <h3>{c.title}</h3>
                <span className="chip chip-live">Live</span>
              </div>
              <p>{c.text}</p>
            </Reveal>
          ))}
          <div className="practice-foot">
            the rule: <strong>Yunaki can read, check, and draft — it can never send, sign, or file.</strong>{" "}
            <a href="/security.html">read the guardrails →</a>
          </div>
        </div>
      </section>

      <section className="sec-pad" id="practices">
        <Reveal>
          <div className="seclabel">§04 · practice areas</div>
          <h2>One OS. Every paperwork-heavy practice.</h2>
          <div className="prose">
            <p>Same failure pattern everywhere: high-volume forms, deterministic rules, brutal penalties for small errors.</p>
          </div>
        </Reveal>
        <div className="practices">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="practice">
              <div className="practice-head">
                <h3>{p.title}</h3>
                <span className={`chip${p.live ? " chip-live" : ""}`}>{p.chip}</span>
              </div>
              <p>{p.text}</p>
            </Reveal>
          ))}
          <div className="practice-foot">
            one OS: <strong>deterministic checks + firm memory.</strong> a new
            practice area is a playbook away, not a new product.
          </div>
        </div>
      </section>

      <section className="sec-pad" id="proof">
        <Reveal>
          <div className="seclabel">§05 · proof</div>
          <h2>Case files, not testimonials.</h2>
          <div className="prose">
            <p>No invented clients. Every number is public and sourced.</p>
          </div>
        </Reveal>
        <div className="cf-grid">
          {CASE_FILES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.1}>
              <a className="cf-card" href={`/case-files.html#${c.id}`}>
                <span className="cf-id">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="cf-go">Read case file →</span>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="after-fig-cta">
          <a className="btn" href="/case-files.html">All five case files →</a>
        </div>
      </section>

      <section className="cta-band" id="pilot">
        <Reveal>
          <div className="seclabel">§06 · pilots</div>
          <h2>We&apos;re onboarding five pilot firms.</h2>
          <p className="lead">
            Immigration first. Client intake, document reading, and case checks
            on your live cases — free during the pilot. Everything it builds
            stays yours.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-solid" href="/contact.html">Book a pilot ↗</a>
            <a className="btn" href="/case-files.html">Read the case files</a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}

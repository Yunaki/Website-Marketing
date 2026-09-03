import { Topbar, Footer } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { CaseHub } from "@/components/CaseHub";
import { CaseWeekChart } from "@/components/CaseWeekChart";
import { Reveal } from "@/components/Reveal";
import { YunakiDesk } from "@/components/desk/YunakiDesk";

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
  { title: "Intake that runs itself", text: "One link. Clients answer and upload from their phone. Done." },
  { title: "Every document read", text: "Passports, green cards, I-94s. Field by field, and it never guesses." },
  { title: "Mistakes caught early", text: "Conflicts and gaps flagged before USCIS ever sees them." },
  { title: "Always the right form", text: "Editions, documents, and filing rules for 30 visa types." },
  { title: "Answers in Slack", text: "Ask about any case. Get the file, not a search." },
  { title: "Clients never go quiet", text: "Silence gets a follow-up. Written, sent, chased." },
];

const PRACTICES = [
  { title: "Immigration", chip: "Pilots open", live: true, text: <><strong>Live today:</strong> intake, document reading, and case checks across 30 visa types. I-130 denials jumped 28.4% to 41.6% in FY 2025. Checking beats redoing.</> },
  { title: "SSDI / SSI Disability", chip: "In development", text: <><strong>64% of ~2M annual claims are denied initially.</strong> 65% of those are preventable.</> },
  { title: "Bankruptcy", chip: "Roadmap", text: <><strong>48% of Chapter 13 cases get dismissed</strong>, often on pure arithmetic.</> },
  { title: "Workers Compensation", chip: "Roadmap", text: <><strong>40% of initial claims contain errors.</strong> No dedicated tool exists.</> },
  { title: "Personal Injury / MVA", chip: "Roadmap", text: <><strong>Every fact in the demand package</strong> verified. Dates, bills, chronologies.</> },
  { title: "Healthcare Claims", chip: "Roadmap", text: <><strong>$262B in claims denied annually.</strong> 85% preventable.</> },
];

export default function Home() {
  return (
    <div className="frame">
      <Topbar />
      <Hero />

      <section className="sec-pad" id="watch" style={{ paddingTop: 0 }}>
        <figure className="fig" style={{ marginTop: 24 }}>
          <YunakiDesk />
        </figure>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="hub-band" id="how">
        <Reveal>
          <div className="seclabel">the os</div>
          <h2>Everything orbits one case file.</h2>
          <div className="prose">
            <p>Your clients, your inbox, your channels, your filings. One record runs them all.</p>
          </div>
        </Reveal>
        <CaseHub />
        <CaseWeekChart />
      </section>

      <section className="sec-pad" id="today">
        <Reveal>
          <div className="seclabel">in the product today</div>
          <h2>What pilot firms run today.</h2>
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
            Under all of it, walls a bank would envy.{" "}
            <a href="/security.html">The guardrails</a>
          </div>
        </div>
      </section>

      <section className="sec-pad" id="practices">
        <Reveal>
          <div className="seclabel">practice areas</div>
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
        </div>
      </section>

      <section className="sec-pad" id="proof">
        <Reveal>
          <div className="seclabel">from the pilot</div>
          <h2>The people running it.</h2>
        </Reveal>
        <div className="quotes">
          <Reveal className="quote">
            <span className="quote-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <p className="quote-text">[ Allison&apos;s words go here ]</p>
            <div className="quote-who">
              <span className="quote-name">Allison Yew</span>
              <span className="quote-role">Senior attorney</span>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="quote">
            <span className="quote-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <p className="quote-text">[ Isaiah&apos;s words go here ]</p>
            <div className="quote-who">
              <span className="quote-name">Isaiah</span>
              <span className="quote-role">Paralegal</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-band" id="pilot">
        <Reveal>
          <div className="seclabel">pilots</div>
          <h2>We&apos;re onboarding immigration firms.</h2>
          <p className="lead">
            Client intake, document reading, and case checks on your live
            cases, free during the pilot. Everything it builds stays yours.
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

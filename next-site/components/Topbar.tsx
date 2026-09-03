export function Topbar() {
  return (
    <header className="topbar">
      <a className="brand" href="/">
        YUNAKI <span>/ the operating system for law firms</span>
      </a>
      <nav className="topnav">
        <a href="/how-it-works.html">How it works</a>
        <a href="/case-files.html">Case files</a>
        <a href="/#practices">Practice areas</a>
        <a href="/contact.html">Contact</a>
        <a className="btn btn-solid" href="/contact.html">
          Book a pilot ↗
        </a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="fcol">
        <strong>YUNAKI</strong> · © 2026
      </div>
      <div className="fcol">your cases · your rules · your memory</div>
      <div className="fcol">
        <a href="/how-it-works.html">how it works</a> ·{" "}
        <a href="/security.html">guardrails</a> ·{" "}
        <a href="/case-files.html">case files</a> ·{" "}
        <a href="/contact.html">book a pilot</a>
      </div>
    </footer>
  );
}

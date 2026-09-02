import { Topbar, Footer } from "@/components/Topbar";

export default function NotFound() {
  return (
    <div className="frame">
      <Topbar />
      <div className="page-head">
        <div className="seclabel">§ 404 · not on file</div>
        <h2>This page isn&apos;t in the record.</h2>
        <div className="prose">
          <p>
            The address may have changed, or it never existed. Either way, we
            don&apos;t guess — here are the pages that do exist.
          </p>
        </div>
        <div className="hero-ctas" style={{ marginTop: 28 }}>
          <a className="btn btn-solid" href="/">Back to the home page →</a>
          <a className="btn" href="/how-it-works.html">How it works</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

"use client";

// Founder review mode: loads the SimpleCommenter widget ONLY when the page
// is opened with ?review in the URL (remembered for the tab via
// sessionStorage). Ordinary visitors never load the third-party script.
import { useEffect } from "react";

const SRC = "https://simplecommenter.com/js/comments.min.js?id=sc_89bdf9fee6ccd44b";

export function ReviewComments() {
  useEffect(() => {
    let want = false;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.has("review")) {
        want = true;
        sessionStorage.setItem("yn-review", "1");
      } else {
        want = sessionStorage.getItem("yn-review") === "1";
      }
    } catch {
      return;
    }
    if (!want) return;
    if (document.querySelector("script[data-sc]")) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.defer = true;
    s.setAttribute("data-sc", "1");
    document.body.appendChild(s);
  }, []);
  return null;
}

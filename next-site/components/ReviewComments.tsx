"use client";

// Founder review mode: loads the SimpleCommenter widget ONLY when the page is
// opened with ?review=<token> (remembered for the tab via sessionStorage), so
// a bare guessable query string can't be used to make a visitor's browser pull
// third-party script. The loader is deliberately NOT integrity-pinned: the
// vendor rotates the file at will, and a pin silently kills the founders'
// commenting session each time. The token gate is the containment.
import { useEffect } from "react";

const SRC = "https://www.simplecommenter.com/js/comments.min.js?id=sc_89bdf9fee6ccd44b";
const TOKEN = "yk-ed5dc935";

export function ReviewComments() {
  useEffect(() => {
    let want = false;
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("review") === "off") {
        localStorage.removeItem("yn-review");
      } else if (params.get("review") === TOKEN) {
        want = true;
        localStorage.setItem("yn-review", TOKEN);
      } else {
        want = localStorage.getItem("yn-review") === TOKEN;
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

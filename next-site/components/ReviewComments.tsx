"use client";

// Founder review mode: loads the SimpleCommenter widget ONLY when the page is
// opened with ?review=<token> (remembered for the tab via sessionStorage), so
// a bare guessable query string can't be used to make a visitor's browser pull
// third-party script. The script is SRI-pinned to the exact file we audited;
// if the vendor ships a new version, the widget stops loading (fail closed)
// until the hash here is refreshed.
import { useEffect } from "react";

const SRC = "https://www.simplecommenter.com/js/comments.min.js?id=sc_89bdf9fee6ccd44b";
const SRI = "sha384-GTf9gnTD2n8HZfbGnQigAGG2AKOhLMqoCy1rjS6WebfSOujo+0sPhCFBckTVI3L6";
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
    s.integrity = SRI;
    s.crossOrigin = "anonymous";
    s.defer = true;
    s.setAttribute("data-sc", "1");
    document.body.appendChild(s);
  }, []);
  return null;
}

// Testimonials: the pilot's own people, words only. Newsreader carries the
// quote, mono caps carry the name. (scripts/halftone.py remains in the repo
// if dithered portraits ever return.)

type Person = { name: string; role: string; quote: string };

const PEOPLE: Person[] = [
  {
    name: "Allison Yew",
    role: "Senior attorney",
    quote:
      "My clients are tech savvy, but they still email me about case status. And some don't submit their intake forms even after weeks, so I had to follow up with every one personally. With Yunaki, the most hectic part of my work is done with ease. The follow-ups and client replies happen automatically.",
  },
  {
    name: "Isaiah",
    role: "Paralegal",
    quote:
      "The most hectic part of my job was re-entering every client detail by hand, from intake forms into case management. We run Cerenade and MyCase. With Yunaki I finally get a one-stop solution.",
  },
];

export function Testimonials() {
  return (
    <div className="quotes" role="list">
      {PEOPLE.map((p) => (
        <article className="quote" role="listitem" key={p.name}>
          <p className="quote-text">&ldquo;{p.quote}&rdquo;</p>
          <div className="quote-attr">{p.name.toUpperCase()}, {p.role.toUpperCase()}</div>
        </article>
      ))}
    </div>
  );
}

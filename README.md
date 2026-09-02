# Yunaki — marketing site

Static marketing site for Yunaki (AI automation for law firms).
Plain HTML and CSS, no build step. Deployed via GitHub Pages.

## Pages
- `index.html` — home
- `how-it-works.html` — architecture
- `security.html` — guardrails
- `case-files.html` — data-backed case studies
- `contact.html` — book-a-pilot form (posts to FormSubmit)
- `404.html` — not-found page (GitHub Pages picks it up by name)
- `style.css` — design system

SEO plumbing: `robots.txt`, `sitemap.xml`, `favicon.svg`, and OG images
under `assets/`. The OG card and touch icon are rendered from small HTML
templates; regenerate with any 1200×630 / 180×180 screenshot tool if the
brand changes.

## Local preview
```
python3 -m http.server 4173
```
Then open http://localhost:4173

## Deploy
Served by GitHub Pages from the root of this repo. The `CNAME` file holds
the custom domain; `.nojekyll` disables Jekyll processing.

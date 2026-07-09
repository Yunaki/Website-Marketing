# Yunaki — marketing site

Static marketing site for Yunaki (AI automation for law firms).
Plain HTML and CSS, no build step. Deployed via GitHub Pages.

## Pages
- `index.html` — home
- `how-it-works.html` — architecture
- `case-files.html` — data-backed case studies
- `contact.html` — book-a-pilot form (posts to FormSubmit)
- `style.css` — design system

## Local preview
```
python3 -m http.server 4173
```
Then open http://localhost:4173

## Deploy
Served by GitHub Pages from the root of this repo. The `CNAME` file holds
the custom domain; `.nojekyll` disables Jekyll processing.

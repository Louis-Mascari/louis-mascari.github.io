# Louis Mascari — Personal Website

A hand-built portfolio for a full-stack software engineer.
Design theme: a dark, amber-phosphor "instrument" aesthetic — the hero frames a
MangoWave demo like a screen readout.

Live: [louis-mascari.com](https://louis-mascari.com/)

## Features

- **MangoWave hero**: the flagship project's demo video framed as an instrument
  panel, with a poster frame for instant first paint and a click-to-unmute control.
- **Dark-committed design system**: OKLCH color tokens, fluid `clamp()` type scale.
- **Fully responsive**: single-column reflow on tablet and mobile.
- **Zero dependencies**: no frameworks, no icon webfont — icons are inline SVG.
- **Accessible**: skip link, semantic landmarks, visible focus, reduced-motion support.
- **Progressive enhancement**: content is fully visible without JavaScript; reveals
  only activate when JS is present.
- **SEO**: meta/OG/Twitter tags, canonical URL, sitemap, robots.txt.

## Tech

- **HTML5** — semantic markup
- **CSS3** — custom properties (OKLCH), Grid, Flexbox, `clamp()`
- **Vanilla JavaScript** — IntersectionObserver, no build step
- **Fonts** — Schibsted Grotesk (display/body) + IBM Plex Mono (instrument readouts), via Google Fonts

## Structure

- `index.html` — the site (hero, selected work, stack, more projects, about, contact)
- `assets/css/modern.css` — design system + all component styles
- `assets/js/modern.js` — nav, mobile menu, scroll reveals, click-to-unmute
- `404.html` — themed not-found page
- `mango.html` — a small easter egg

## Run locally

Open `index.html` in a browser, or serve the folder (e.g. `python3 -m http.server`).
Hosted on GitHub Pages.

## Contact

[LouisMascari@gmail.com](mailto:LouisMascari@gmail.com)

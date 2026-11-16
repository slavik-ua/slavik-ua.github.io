# Viacheslav-Illia Detsyk — portfolio

Local redesign of the portfolio at https://slavik-ua.github.io/. This version is being reviewed locally; do not publish until approved.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

## Design and content

The page opens on a full-viewport orbit scene with the headline and navigation. Scrolling reveals a separate introduction with the original portrait: full-viewport on desktop and sized to its content on mobile. Projects, skills, the kernel contribution, and contact follow in the document flow. The opening animation stops when that scene is offscreen. Profile effects begin when the introduction enters view. Navigation and résumé links let visitors jump directly to the information they need.

- `index.html`: semantic portfolio content, the supplied portrait, project descriptions and repository links, and a short internship availability ticker. The average is omitted from the page and plain-text profile.
- `styles.css`: responsive grid, type hierarchy, frame decoration, and dark/light themes.
- `script.js`: themes, clipboard controls, a short profile reveal, a secondary typewriter line, and brief scramble on link hover/focus.
- `ascii-enhancements.js`: background canvas rendering. Reduced motion is respected; the background stops while its scene is offscreen or the tab is hidden.
- `assets/ascii/edge-orbit.js`: locally transpiled Edge Orbit from [bas3line/ascii](https://github.com/bas3line/ascii), under the MIT license in `assets/ascii/LICENSE.txt`.
- `assets/ascii/orbit-poster.webp`: locally rendered still for progressive enhancement.
- `llms.txt`: factual text profile copied by the header action.
- `assets/viacheslav-illia-detsyk-resume.pdf`: downloadable résumé compiled from `../basic-resume/main.typ`.

The interaction styles take inspiration from ascii.rest. Skills are grouped into Languages, Backend, and Tools. Desktop menu items show single-letter W/S/O/A/C shortcuts, with T returning to the top. Up and down arrow keys move between sections in page order. Shortcuts ignore text inputs and modifier combinations, and can be disabled in the footer. The ticker pauses on hover, while offscreen, and while the tab is hidden; reduced motion shows its sentence without scrolling. The site uses plain HTML, CSS, and JavaScript, with no framework, external fonts, or external runtime requests. Core content and navigation work without JavaScript. Animation is decorative and does not carry essential information.

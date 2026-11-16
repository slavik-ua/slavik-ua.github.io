# Viacheslav-Illia Detsyk — portfolio

Local redesign of https://slavik-ua.github.io/. Review locally before publishing.

## Preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173/.

## Design and content

The opening uses a full-viewport orbit image, followed by the supplied portrait and introduction. The introduction fits its content on mobile. Projects retain repository buttons and native expandable engineering notes. Skills are grouped into Languages, Backend, and Tools. The internship ticker sits below the navigation; reduced motion shows the sentence without scrolling.

- `index.html`: semantic content, local SVG icons, project links, and CV downloads.
- `styles.css`: responsive layout and dark/light themes.
- `script.js`: persistent theme controls, clipboard actions, and dismissible copy confirmations.
- `llms.txt`: factual text profile copied by the header action. The average is omitted from this profile and the page.
- `assets/portrait.webp`: supplied portrait.
- `assets/ascii/orbit-poster.webp`: locally rendered still based on Edge Orbit from [bas3line/ascii](https://github.com/bas3line/ascii), under the MIT license in `assets/ascii/LICENSE.txt`.
- `assets/viacheslav-illia-detsyk-resume.pdf`: downloadable CV compiled from `../basic-resume/main.typ`.

The site uses plain HTML, CSS, and JavaScript with no framework, external fonts, or external runtime requests. Core content and navigation work without JavaScript.

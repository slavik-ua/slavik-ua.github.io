# Viacheslav-Illia Detsyk — personal site

A buildless portfolio for backend and systems internships. Plain HTML, CSS, and JavaScript; published on GitHub Pages at **https://slavik-ua.github.io/**. No framework, external fonts, icon package, or runtime dependencies.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. There are no dependencies or build steps.

## Publish

The repository must be named `slavik-ua.github.io` under the `slavik-ua` account. In **Settings → Pages**, select **Deploy from a branch**, `main`, and `/(root)`. The empty `.nojekyll` file disables Jekyll processing.

Push changes to `main` to update the site. GitHub can take up to ten minutes to publish changes.

## Update content

- `index.html`: portfolio content, metadata, project links, inline SVG icon sprite, and a tiny script that applies the theme before paint.
- `styles.css`: responsive layout, colors, and reduced-motion styles.
- `script.js`: theme selection, mobile navigation, and email/profile clipboard enhancement. The first visit follows the system theme; an explicit choice is saved locally and synchronized across tabs. Storage failures do not prevent theme switching.
- `assets/viacheslav-illia-detsyk-resume.pdf`: current résumé. Recompile `../basic-resume/main.typ` and replace this copy when updating it from the résumé workspace.
- `assets/obminnik-depth.webp`: optimized actual screenshot from the OBMINNIK project.
- `assets/portrait.webp`: optimized user-supplied portrait, shown beside the introduction with text and rectangular corner markers.
- `llms.txt`: a factual plain-text profile copied by the “Copy profile for AI” button. Update it alongside visible copy when facts change.
- `PLAN.md`: content, design, implementation, and verification plan.

All core content and links are available without JavaScript, including the native expandable engineering notes. Without JavaScript the theme follows the system preference. Images use explicit dimensions; there are no decorative diagrams or animation loops.

The hero portrait is loaded eagerly with high fetch priority; the project screenshot is lazy-loaded. Main page assets (HTML, CSS, JavaScript, favicon, portrait, and dashboard screenshot) total approximately 115 KB before compression. The résumé and social preview image are separate resources.

## Validation

Verified in Chrome on 14 November 2026:

- Both themes at twelve widths from 320 to 1440 pixels, with no page overflow.
- Theme restoration, system preference changes, cross-tab synchronization, and blocked-storage fallback.
- Profile/email copying, three-second profile confirmation dismissal, outside-click/Escape dismissal, project and résumé links, mobile navigation, and expandable notes.
- JavaScript-disabled content and navigation, and reduced-motion behavior.
- Automated accessibility scans on desktop and mobile in both themes: zero reported WCAG A/AA violations.
- No external runtime requests or browser errors.

The design uses original layout and graphics with an orange infrastructure-inspired palette. This is a personal portfolio, with no affiliation with Cloudflare.

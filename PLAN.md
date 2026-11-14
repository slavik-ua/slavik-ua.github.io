# Personal portfolio plan

## Purpose and audience

Give backend and systems internship reviewers a quick introduction and concrete evidence of implementation work. The audience includes Cloudflare and other networking, infrastructure, and backend teams. The site is a portfolio of student and personal work, with one merged upstream kernel contribution; it must not imply professional employment or affiliation with Cloudflare.

## Content, in visitor order

1. **Introduction:** Viacheslav-Illia Detsyk; third-year FEUP student in Porto seeking a backend internship. Lead with Go, network protocols, and backend systems. Make selected work and the résumé easy to reach.
2. **Portrait-led opening:** headline and introduction on the left; the user's portrait on the right, with a restrained CSS grid, orange accents, and a fine frame inspired by the supplied reference. Stack the portrait below the introduction on mobile. Omit decorative project diagrams.
3. **Selected work:** one featured OBMINNIK presentation with its real dashboard screenshot and engineering notes; compact BitTorrent and HTTP/1.1 projects with concrete implementation and testing details. Link directly to source repositories.
4. **Open source:** the Linux AMD ACP6x DMI quirk for the Acer Nitro AN16-41, merged in November 2026. Include the exact small diff and commit link, without exaggerating scope.
5. **About and education:** FEUP, degree in progress, expected January 2028 graduation, current average 16/20 in regular type; relevant languages and tools. Keep the biography focused on current work; omit current age and starting age as requested.
6. **Contact:** email, GitHub, LinkedIn, and the current downloadable résumé. No nonfunctional form, invented writing, testimonials, or availability dates.

## Visual direction

- Dark theme: background `#0A0A0C`, surface `#141417`, primary `#F15A29`, secondary `#DC2626`, muted text `#9898A3`, text `#F4F4F5`. Provide a complementary warm light theme, following system preference until a visitor makes a persistent choice.
- Large, readable headings; compact monospace labels; generous whitespace; clear hierarchy rather than a repeated wall of cards.
- Use a small inline SVG icon sprite, an optimized real project screenshot, and the user's optimized portrait. No icon library, external fonts, or runtime dependencies. No decorative project diagrams, Cloudflare logos, or copied marketing copy.
- Offer a small “Copy profile for AI” utility and a public `llms.txt` containing only factual profile content and source links. This is a convenience for visitors; it has no AI backend and makes no promises about indexing or hiring outcomes.
- Use small transitions only when reduced motion is not requested.
- Responsive navigation, accessible keyboard interaction, clear focus states, semantic headings, and readable contrast.

## Implementation and hosting

- Buildless HTML, CSS, and a small progressive-enhancement JavaScript file.
- All content, navigation, résumé, plain-text profile, and source links remain available without JavaScript. JavaScript adds a remembered theme choice, mobile menu, and email/profile copying. A tiny head script applies the preferred theme before paint; storage failures must not break the site.
- Use relative asset paths and an empty `.nojekyll` file for GitHub Pages.
- Target repository and URL: `slavik-ua/slavik-ua.github.io`, `https://slavik-ua.github.io/`.
- Preserve the existing résumé source and PDF. Copy the current PDF into the site's assets.
- GitHub Pages is the requested host; Sites hosting and registration are not needed.
- Publishing requires authenticated access to `slavik-ua`. The user signed in during implementation, and ownership and repository write access were verified.

## Validation and completion

1. Verify copy and claims against the résumé, public READMEs/source, and the kernel commit.
2. Run JavaScript syntax and HTML/local-link checks.
3. Preview both themes and inspect desktop and narrow mobile layouts in Chrome. Check overflow, navigation, theme persistence and system preference, résumé download, email copying, keyboard focus, reduced motion, and JavaScript-disabled access. Run contrast/accessibility checks in both themes.
4. Confirm that the downloadable PDF is the current one-page résumé.
5. When the correct account is available, push a dedicated repository and enable branch-based Pages publishing. Check the public deployment. Otherwise deliver the validated source and exact publication instructions, clearly stating it is not live.

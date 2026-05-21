# Project Overview
- K3 is a single-page Russian landing site for the research and strategy agency "К3".
- The page presents positioning, client problem, methods, services, specializations, deliverables, process, team, and contact form.
- Tech stack is static HTML (`index.html`), CSS (`styles.css`), and vanilla browser JavaScript (`script.js`).
- Visual assets are inline CSS/SVG-style primitives plus `favicon.svg` and `social-preview.svg`; local Unbounded font files live under `src/fonts/Unbounded/`.
- There is no package manager manifest, build step, CMS, or backend in the repository. The contact form builds a mailto request in the browser.
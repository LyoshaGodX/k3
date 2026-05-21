# Suggested Commands
- List files: `rg --files`
- Search code: `rg -n "pattern" index.html styles.css script.js`
- Check git state: `git status --short`
- Validate JavaScript syntax: `node --check script.js`
- Open the site directly in a browser from `index.html` for normal local viewing; no dev server is required.
- Mobile screenshot with installed Edge via Playwright CLI: `npx playwright screenshot --browser=chromium --channel=msedge --viewport-size="320,900" "file:///C:/path/to/k3/index.html" output.png`
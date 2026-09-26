const fs = require('fs');
const content = `
## 23.3 Subpage Hero Design Requirements
Every subpage (e.g., \`/products\`, \`/frames\`, etc.) must implement a consistent hero section with the following exact specifications:
- **Layout:** Centered text over a full-width background image.
- **Top/Bottom Borders:** A full-width \`strandply\` primary color (\`var(--color-primary-base)\`) bottom margin/border, mirroring the footer's top margin.
- **Typography & Animation:** Important keywords in the page title must use the \`strandply\` color effect and character-reveal animation (using \`renderStrandplyText\` and IntersectionObserver), identical to the home page sections.
`;
fs.appendFileSync('MICASA-rules-v2.md', content);

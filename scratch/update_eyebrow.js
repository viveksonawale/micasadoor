const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all tsx files
const files = execSync('find app/ -type f -name "*.tsx"').toString().trim().split('\n');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('SectionEyebrow')) {
    content = content.replace(/SectionEyebrow/g, 'NewSectionEyebrow');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}

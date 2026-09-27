const fs = require('fs');
const path = require('path');

const files = [
  "app/contact/page.module.css",
  "app/fire-rated/page.module.css",
  "app/frames/page.module.css",
  "app/frames/[slug]/page.module.css",
  "app/resources/page.module.css",
  "app/about/page.module.css",
  "app/manufacturing/page.module.css",
  "app/products/page.module.css",
  "app/projects/page.module.css",
  "app/doors/page.module.css",
  "app/doors/[slug]/page.module.css"
];

files.forEach(file => {
  const filePath = path.join('/home/duck/projects/micasadoor', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove opacity from .heroImage
    content = content.replace(/\.heroImage\s*\{[^}]*?\}/g, (match) => {
      return match.replace(/opacity:\s*0\.\d+;/, '');
    });

    // Remove background gradient from .heroOverlay or just hide it
    content = content.replace(/\.heroOverlay\s*\{[^}]*?\}/g, (match) => {
      // Just replace the background property with transparent, or just add display: none;
      if (!match.includes('display: none;')) {
        return match.replace(/z-index:\s*1;/, 'z-index: 1;\n  display: none;');
      }
      return match;
    });

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});

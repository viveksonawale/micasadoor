const fs = require('fs');
const path = require('path');

const cssFiles = [
  'app/not-found.module.css',
  'app/contact/page.module.css',
  'app/components/WhatsAppButton.module.css',
  'app/components/StatsSection.module.css',
  'app/components/ProjectsSection.module.css',
  'app/components/ProductRangeSection.module.css',
  'app/components/Navbar.module.css',
  'app/components/HowWeWorkSection.module.css',
  'app/components/CustomDoorsSection.module.css',
  'app/components/CallToActionSection.module.css',
  'app/about/page.module.css'
];

const basePath = 'f:/Company/Micasa-Door Project/micasadoor';

cssFiles.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace all border-radius lines with 0, except for 50% which are usually circles (like buttons/icons)
    content = content.replace(/border-radius:\s*(?!50%|0(?:\s*!important)?\s*;)[^;]+;/g, 'border-radius: 0;');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Successfully updated ${file}`);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});

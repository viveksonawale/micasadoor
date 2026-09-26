const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'ref-micasa/frontend/src/data/products.js');
const destDir = path.join(__dirname, 'app/data');
const destFile = path.join(destDir, 'products.ts');

let code = fs.readFileSync(srcFile, 'utf8');

// Remove IMG imports
code = code.replace(/import\s+\{.*\}\s+from\s+["'].*["'];\n/g, '');

// Replace image: IMG.xyz, with image: "",
code = code.replace(/image:\s*IMG\.[a-zA-Z0-9]+,?/g, 'image: "",');

fs.mkdirSync(destDir, { recursive: true });
fs.writeFileSync(destFile, code);
console.log("Successfully copied products data!");

const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if(file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.jsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('/home/duck/projects/micasadoor/app');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace font-weight: 700; with font-weight: 900;
    content = content.replace(/font-weight:\s*700\s*;/g, 'font-weight: 900;');
    
    // Replace font-weight: 600; with font-weight: 800;
    content = content.replace(/font-weight:\s*600\s*;/g, 'font-weight: 800;');
    
    // Replace font-weight: 500; with font-weight: 700;
    // content = content.replace(/font-weight:\s*500\s*;/g, 'font-weight: 700;');

    if(content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/styles\.css\?v=[0-9.]+/g, 'styles.css?v=9.1');
html = html.replace(/script\.js\?v=[0-9.]+/g, 'script.js?v=9.1');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Bumped cache version to v=9.1');

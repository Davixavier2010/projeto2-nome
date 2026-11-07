const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('hero-subtitle');
console.log(JSON.stringify(html.substring(idx - 30, idx + 150)));

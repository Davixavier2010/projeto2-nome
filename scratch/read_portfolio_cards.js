const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('mobile-only-showcase');
console.log('=== MOBILE ONLY SHOWCASE ===');
console.log(html.substring(start, start + 4000));

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('id="portfolio"');
console.log('=== PORTFOLIO HTML (chars ' + start + ' - ' + (start + 3500) + ') ===');
console.log(html.substring(start, start + 3500));

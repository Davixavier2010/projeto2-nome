const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('id="como-funciona"');
const end = html.indexOf('</section>', start);
console.log(html.slice(start, end + 10));

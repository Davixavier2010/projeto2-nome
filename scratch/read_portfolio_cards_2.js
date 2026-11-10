const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('modelo-personalizado');
console.log('=== REST OF MOBILE SHOWCASE ===');
console.log(html.substring(start, start + 4000));

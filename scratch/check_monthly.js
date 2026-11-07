const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const idx = html.indexOf('monthly-includes');
console.log(JSON.stringify(html.substring(idx - 50, idx + 200)));

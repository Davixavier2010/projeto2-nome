const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const footerIdx = html.indexOf('id="contato"');
console.log(html.slice(footerIdx, footerIdx + 2500));

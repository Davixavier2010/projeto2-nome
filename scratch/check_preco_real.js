const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const idx = html.indexOf('id="preco"');
console.log(html.substring(idx, idx + 1800));

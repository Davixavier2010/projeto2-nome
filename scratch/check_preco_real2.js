const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
const idx = html.indexOf('com tudo aprovado por você');
console.log(html.substring(idx, idx + 1000));

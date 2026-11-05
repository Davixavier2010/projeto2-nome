const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const hubIdx = html.indexOf('id="mais-informacoes"');
console.log(html.slice(hubIdx, hubIdx + 1500));


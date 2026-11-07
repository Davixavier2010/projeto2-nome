const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('id="mais-informacoes"');
const end = html.indexOf('<!-- Painéis Expansíveis', start);
console.log(html.slice(start, end));

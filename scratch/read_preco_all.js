const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const precoIdx = html.indexOf('id="preco"');
const precoEnd = html.indexOf('</section>', precoIdx);
console.log(html.slice(precoIdx, precoEnd + 10));

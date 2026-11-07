const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const precoStart = html.indexOf('id="preco"');
const precoEnd = html.indexOf('</section>', precoStart);
console.log(html.slice(precoStart, precoStart + 3500));

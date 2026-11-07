const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const promIdx = html.indexOf('id="promessa"');
const promEnd = html.indexOf('</section>', promIdx);
console.log(html.slice(promIdx, promEnd + 10));

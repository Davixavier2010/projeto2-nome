const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const cIdx = html.indexOf('id="categoryDropdownList"');
console.log(html.substring(cIdx - 200, cIdx + 1200));

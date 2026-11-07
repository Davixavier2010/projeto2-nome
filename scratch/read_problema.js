const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const probIdx = html.indexOf('id="problema"');
const probEnd = html.indexOf('</section>', probIdx);
console.log(html.slice(probIdx, probEnd + 10));

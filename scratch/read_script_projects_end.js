const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const pIdx = js.indexOf('{ id: \'jornalismo\'');
console.log(js.substring(pIdx, pIdx + 1500));

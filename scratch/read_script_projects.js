const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const pIdx = js.indexOf('const projects =');
console.log(js.substring(pIdx, pIdx + 3000));

const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const pIdx = js.indexOf('id: "jornalismo"') !== -1 ? js.indexOf('id: "jornalismo"') : js.indexOf("id: 'jornalismo'");
console.log('Index:', pIdx);
if (pIdx !== -1) {
  console.log(js.substring(pIdx - 20, pIdx + 1200));
}

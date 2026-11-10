const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const pIdx = js.indexOf("id: 'tenis'");
console.log(js.substring(pIdx - 20, pIdx + 1000));

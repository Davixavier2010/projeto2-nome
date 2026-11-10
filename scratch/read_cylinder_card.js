const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const cIdx = js.indexOf('card.className = "gallery-cylinder-card"');
console.log(js.substring(cIdx - 50, cIdx + 1500));

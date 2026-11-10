const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const bIdx = js.indexOf("id: 'bistro'");
console.log(js.substring(bIdx - 50, bIdx + 1500));

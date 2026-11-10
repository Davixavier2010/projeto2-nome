const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const mIdx = js.indexOf('function initMathiasGallery');
console.log(js.substring(mIdx, mIdx + 3000));

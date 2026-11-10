const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const renderIdx = js.indexOf('function buildCylinder()');
console.log(js.substring(renderIdx, renderIdx + 2500));

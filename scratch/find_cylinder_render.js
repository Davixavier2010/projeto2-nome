const fs = require('fs');
const js = fs.readFileSync('script.js', 'utf8');

const matches = js.match(/cylinder\.innerHTML[^;]+;/g);
console.log('Cylinder innerHTML:', matches);

const buildIdx = js.indexOf('function renderCylinder()') !== -1 ? js.indexOf('function renderCylinder()') : js.indexOf('function updateCylinder()');
console.log('Build/Update index:', buildIdx);
if (buildIdx !== -1) {
  console.log(js.substring(buildIdx, buildIdx + 1500));
} else {
  // search for mathiasCylinder
  const mIdx = js.indexOf('mathiasCylinder');
  console.log('mathiasCylinder index:', mIdx);
  console.log(js.substring(mIdx - 100, mIdx + 1200));
}

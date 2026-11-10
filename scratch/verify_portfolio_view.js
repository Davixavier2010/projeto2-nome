const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outPath = path.resolve('scratch/verify_mobile_portfolio.png');

try {
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=430,1200 --screenshot="${outPath}" http://localhost:3000/#portfolio`);
  console.log('Mobile screenshot taken at:', outPath);
} catch (e) {
  console.error('Error capturing screenshot:', e.message);
}

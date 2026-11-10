const http = require('http');

// Let's test if we can use puppeteer or if edge has a delay flag
// In Edge headless CLI, `--virtual-time-budget=5000` allows JS timers to advance!
const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outPath = path.resolve('scratch/verify_mobile_portfolio_loaded.png');

try {
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=430,2200 --screenshot="${outPath}" http://localhost:3000/#portfolio`);
  console.log('Mobile screenshot taken with virtual time budget at:', outPath);
} catch (e) {
  console.error('Error:', e.message);
}

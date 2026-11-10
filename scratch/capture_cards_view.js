const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const outPath1 = path.resolve('scratch/verify_cafeteria_card.png');
const outPath2 = path.resolve('scratch/verify_tenis_card.png');

try {
  // We can use a test HTML wrapper or scroll via a small page or virtual-time
  // Actually, we can use window-size to capture the full page or scroll to element
  // Or run a small script via puppeteer if available, or capture with a taller window size!
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=430,6000 --screenshot="${path.resolve('scratch/verify_full_mobile.png')}" http://localhost:3000/#portfolio`);
  console.log('Full mobile screenshot taken');
} catch (e) {
  console.error('Error:', e.message);
}

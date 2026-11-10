const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outPath = path.resolve('scratch/verify_sorveteria_full_mobile.png');

try {
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=430,7200 --screenshot="${outPath}" http://localhost:3000/#portfolio`);
  console.log('[OK] Full mobile screenshot with sorveteria captured');
} catch (e) {
  console.error('Error:', e.message);
}

const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const desktopOut = path.resolve('assets/images/gallery/site-sorveteria.jpg');
const mobileOut = path.resolve('assets/images/mockup-sorveteria.png');

try {
  // Capture desktop screenshot for 3D gallery
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=1280,800 --screenshot="${desktopOut}" https://rida-sorveteria.vercel.app/`);
  console.log('[OK] Desktop screenshot captured:', desktopOut);

  // Capture mobile screenshot for mobile mockup card
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=390,844 --screenshot="${mobileOut}" https://rida-sorveteria.vercel.app/`);
  console.log('[OK] Mobile screenshot captured:', mobileOut);
} catch (e) {
  console.error('Error:', e.message);
}

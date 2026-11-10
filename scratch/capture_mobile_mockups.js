const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const imagesDir = path.resolve('assets/images');
const bistroMockup = path.join(imagesDir, 'mockup-cafeteria.png');
const tenisMockup = path.join(imagesDir, 'mockup-tenis.png');

console.log('Capturing mobile screenshot of cafeteria...');
try {
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=430,860 --screenshot="${bistroMockup}" https://rida-cafeteria.vercel.app/`, { stdio: 'pipe' });
  console.log('Captured:', bistroMockup, fs.statSync(bistroMockup).size, 'bytes');
} catch (e) {
  console.error('Error cafeteria mobile:', e.message);
}

console.log('Capturing mobile screenshot of tenis...');
try {
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=430,860 --screenshot="${tenisMockup}" https://rida-tenis.vercel.app/`, { stdio: 'pipe' });
  console.log('Captured:', tenisMockup, fs.statSync(tenisMockup).size, 'bytes');
} catch (e) {
  console.error('Error tenis mobile:', e.message);
}

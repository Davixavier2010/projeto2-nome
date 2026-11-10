const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const galleryDir = path.resolve('assets/images/gallery');
const bistroJpg = path.join(galleryDir, 'site-bistro.jpg');
const tenisJpg = path.join(galleryDir, 'site-tenis.jpg');

console.log('Capturing screenshot of cafeteria...');
try {
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=1200,800 --screenshot="${bistroJpg}" https://rida-cafeteria.vercel.app/`, { stdio: 'pipe' });
  console.log('Captured:', bistroJpg, fs.statSync(bistroJpg).size, 'bytes');
} catch (e) {
  console.error('Error cafeteria:', e.message);
}

console.log('Capturing screenshot of tenis...');
try {
  execSync(`"${edgePath}" --headless --disable-gpu --window-size=1200,800 --screenshot="${tenisJpg}" https://rida-tenis.vercel.app/`, { stdio: 'pipe' });
  console.log('Captured:', tenisJpg, fs.statSync(tenisJpg).size, 'bytes');
} catch (e) {
  console.error('Error tenis:', e.message);
}

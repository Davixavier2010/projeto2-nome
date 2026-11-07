const { execSync } = require('child_process');

const screenshotPath = 'C:\\Users\\davix\\.gemini\\antigravity\\brain\\a8fe456c-e461-4da0-b4d2-f5596bcaac55\\pricing-fixed.png';

try {
  execSync(`"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe" --headless --disable-gpu --window-size=1200,900 --screenshot="${screenshotPath}" http://localhost:3000/`, { stdio: 'pipe' });
  console.log('Screenshot taken successfully at:', screenshotPath);
} catch (e) {
  console.error('Error taking screenshot:', e.message);
}

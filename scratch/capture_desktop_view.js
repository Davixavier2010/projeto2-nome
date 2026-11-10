const { execSync } = require('child_process');
const path = require('path');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const script = `
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const btn = document.getElementById('btnOpenMathiasGallery');
      if (btn) btn.click();
    }, 2000);
  });
`;

// Let's write a small verification test that opens the page on desktop (1440x900)
try {
  execSync(`"${edgePath}" --headless --disable-gpu --virtual-time-budget=4000 --window-size=1440,900 --screenshot="${path.resolve('scratch/verify_desktop_portfolio.png')}" http://localhost:3000/#portfolio`);
  console.log('Desktop screenshot taken');
} catch (e) {
  console.error('Error:', e.message);
}

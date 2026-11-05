const fs = require('fs');

// Copy logo to artifact directory so we can reference it if needed
const src = 'assets/images/logo-rida.png';
const dest = 'C:/Users/davix/.gemini/antigravity/brain/a8fe456c-e461-4da0-b4d2-f5596bcaac55/logo-preview.png';
fs.copyFileSync(src, dest);
console.log('Copied logo to artifact directory');

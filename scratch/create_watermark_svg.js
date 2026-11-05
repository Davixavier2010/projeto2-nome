const fs = require('fs');

// Read the white logo as base64 to inline it into SVG
const whiteLogoB64 = fs.readFileSync('assets/images/logo-rida-white.png').toString('base64');
const dataUri = `data:image/png;base64,${whiteLogoB64}`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130">
  <!-- Staggered diagonal diamond pattern -->
  <image href="${dataUri}" x="16" y="16" width="32" height="36"/>
  <image href="${dataUri}" x="81" y="81" width="32" height="36"/>
</svg>`;

fs.writeFileSync('assets/images/pattern-logo-watermark.svg', svgContent, 'utf8');
console.log('Saved pattern-logo-watermark.svg, size:', svgContent.length);

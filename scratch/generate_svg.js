const fs = require('fs');

// We can construct the 6-blade aperture in SVG
// Center: (150, 150), Radius: R = 120
// Inner opening: r = 32
// 6 blades rotated around center

function generateApertureSvg(color = '#0F2942', shadowColor = '#081726', strokeColor = '#FAF6EE') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" fill="none">
  <defs>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.2)"/>
    </filter>
  </defs>
  <g transform="translate(150, 150)">
    <!-- 6 Petals with 60 deg rotation -->
    ${[0, 60, 120, 180, 240, 300].map((angle, idx) => `
      <g transform="rotate(${angle})">
        <!-- Main Petal -->
        <path d="M 0,-40 
                 C 25,-40 50,-55 80,-70
                 C 100,-80 115,-65 110,-40
                 C 105,-15 105,15 95,45
                 C 88,68 75,75 55,65
                 C 35,55 15,25 0,0 
                 Z" 
              fill="${idx === 1 || idx === 4 ? shadowColor : color}" 
              stroke="${strokeColor}" 
              stroke-width="3"
              stroke-linejoin="round"/>
      </g>
    `).join('\n')}
  </g>
</svg>`;
}

fs.writeFileSync('scratch/test_logo.svg', generateApertureSvg());
console.log('Generated test_logo.svg');

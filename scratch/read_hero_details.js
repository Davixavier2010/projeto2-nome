const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const heroIdx = html.indexOf('<section class="hero-section" id="inicio">');
console.log(html.slice(heroIdx, heroIdx + 1600));
